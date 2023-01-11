import React, { useEffect, FunctionComponent, useCallback, useMemo } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from '../../../';
import { Decimal } from 'components';
import { localeDate } from 'helpers';
import {
   Market,
   openOrdersCancelFetch,
   ordersCancelAllFetch,
   RootState,
   selectCancelOpenOrdersFetching,
   selectCurrentMarket,
   selectOpenOrdersFetching,
   selectOpenOrdersList,
   selectUserLoggedIn,
   userOpenOrdersFetch,
} from 'modules';
import { OrderCommon } from 'modules/types';
import { IcShorting } from 'assets';
import { XIcon } from '@heroicons/react/outline';

interface ReduxProps {
   currentMarket: Market | undefined;
   list: OrderCommon[];
   fetching: boolean;
   cancelFetching: boolean;
   userLoggedIn: boolean;
}

interface DispatchProps {
   userOpenOrdersFetch: typeof userOpenOrdersFetch;
   openOrdersCancelFetch: typeof openOrdersCancelFetch;
   ordersCancelAll: typeof ordersCancelAllFetch;
}

type Props = ReduxProps & DispatchProps & IntlProps;

const TradingTradeOpenOrderContainer = (props: Props) => {
   const {
      currentMarket,
      list,
      fetching,
      userLoggedIn,
      userOpenOrdersFetch,
      openOrdersCancelFetch,
      ordersCancelAll,
      intl
   } = props;

   useMemo(() => {
      const { userLoggedIn: prevUserLoggedIn, currentMarket: prevCurrentMarket } = props;
      if (!prevUserLoggedIn && userLoggedIn && currentMarket) {
         userOpenOrdersFetch({ market: currentMarket });
      } else if (userLoggedIn && currentMarket && prevCurrentMarket !== currentMarket) {
         userOpenOrdersFetch({ market: currentMarket });
      }
   }, []);

   useEffect(() => {
      if (userLoggedIn && currentMarket)
         userOpenOrdersFetch({ market: currentMarket });
   }, []);

   const translate = (id: string) => intl.formatMessage({ id });

   const handleCancelById = (order: OrderCommon) => {
      openOrdersCancelFetch({ order, list });
      setTimeout(() => {
         if (userLoggedIn && currentMarket) {
            userOpenOrdersFetch({ market: currentMarket });
         }
      }, 1000);
   }

   const handleCancelAll = () => {
      currentMarket && ordersCancelAll({ market: currentMarket.id });
      setTimeout(() => {
         if (userLoggedIn && currentMarket) {
            userOpenOrdersFetch({ market: currentMarket });
         }
      }, 1000);
   }


   const renderOpenOrders = useCallback((item: OrderCommon) => {
      const { id, price, created_at, remaining_volume, origin_volume, side } = item;
      const executedVolume = Number(origin_volume) - Number(remaining_volume);
      const remainingAmount = Number(remaining_volume);
      const total = Number(origin_volume) * Number(price);
      const filled = ((executedVolume / Number(origin_volume)) * 100).toFixed(2);
      const priceFixed = currentMarket ? currentMarket.price_precision : 0;
      const amountFixed = currentMarket ? currentMarket.amount_precision : 0;

      return (
         <div className="table-row font-urw-din-500" key={id}>
            <div className="text-xs leading-relaxed font-medium table-cell p-1.5 pl-0 text-neutral4">
               {
                  String(localeDate(created_at, 'fullDate'))
               }
            </div>
            <div className={`text-xs leading-relaxed font-medium table-cell p-1.5 ${side === 'sell' ? 'text-primary4' : 'text-primary5'}`}>
               {
                  Decimal.format(price, priceFixed, ',')
               }
            </div>
            <div className="text-xs leading-relaxed font-medium table-cell p-1.5">
               {
                  Decimal.format(remainingAmount, amountFixed, ',')
               }
            </div>
            <div className="text-xs leading-relaxed font-medium table-cell p-1.5">
               {
                  Decimal.format(total, amountFixed, ',')
               }
            </div>
            <div className={`text-xs leading-relaxed font-medium table-cell p-1.5 ${side === 'sell' ? 'text-primary4' : 'text-primary5'}`}>
               {
                  filled
               } %
            </div>
            <div className="text-xs leading-relaxed font-medium table-cell p-1.5 pr-0 text-right align-middle">
               <XIcon
                  onClick={() => handleCancelById(item)}
                  className="h-5 w-5 float-right stroke-neutral4 hover:stroke-neutral2 hover:scale-125 cursor-pointer transition-all duration-300"
               />
            </div>
         </div>
      )
   }, []);

   const currentAskUnit = currentMarket ? ` (${currentMarket.base_unit.toUpperCase()})` : '';
   const currentBidUnit = currentMarket ? ` (${currentMarket.quote_unit.toUpperCase()})` : '';

   return (
      <>
         <div className="float-right -mt-11">
            <div className="cursor-pointer flex py-1.5 px-3 rounded-1xl font-dm font-bold leading-custom3 outline-none transition-all duration-300 bg-neutral6 hover:bg-neutral7 dark:bg-neutral3" onClick={handleCancelAll}>
               <FormattedMessage id="page.body.openOrders.header.button.cancelAll" />
            </div>
         </div>
         <div className="table w-full">
            <div className="table-row">
               <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed whitespace-nowrap pb-[10px] p-1.5 pl-0">
                  <div className="relative inline-block pr-4 cursor-pointer">
                     {
                        translate('page.body.trade.header.openOrders.content.date')
                     }
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed whitespace-nowrap pb-[10px] p-1.5">
                  <div className="relative inline-block pr-4 cursor-pointer">
                     {
                        translate('page.body.trade.header.openOrders.content.price').concat(currentBidUnit)
                     }
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed whitespace-nowrap pb-[10px] p-1.5">
                  <div className="relative inline-block pr-4 cursor-pointer">
                     {
                        translate('page.body.trade.header.openOrders.content.amount').concat(currentAskUnit)
                     }
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed whitespace-nowrap pb-[10px] p-1.5">
                  <div className="relative inline-block pr-4 cursor-pointer">
                     {
                        translate('page.body.trade.header.openOrders.content.total').concat(currentBidUnit)
                     }
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed whitespace-nowrap pb-[10px] p-1.5">
                  <div className="relative inline-block pr-4 cursor-pointer">
                     {
                        translate('page.body.trade.header.openOrders.content.filled')
                     }
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed whitespace-nowrap pb-[10px] p-1.5 pr-0 text-right">
                  Cancel
               </div>
            </div>
            {
               fetching ? (
                  <>
                     <div className="table-row">
                        <div className="table-cell pb-[10px] p-1.5 pl-0">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5 pr-0">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                     </div>
                     <div className="table-row">
                        <div className="table-cell pb-[10px] p-1.5 pl-0">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5 pr-0">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                     </div>
                     <div className="table-row">
                        <div className="table-cell pb-[10px] p-1.5 pl-0">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                        <div className="table-cell pb-[10px] p-1.5 pr-0">
                           <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                        </div>
                     </div>
                  </>
               ) : list?.length > 0 ? list?.map(renderOpenOrders) : (
                  <div className="table-row">
                     <div className="table-cell">&nbsp;</div>
                     <div className="table-cell">&nbsp;</div>
                     <div className="table-cell">&nbsp;</div>
                     <div className="table-cell">&nbsp;</div>
                     <div className="table-cell">&nbsp;</div>
                     <div className="table-cell absolute left-0 w-full text-xs leading-relaxed font-medium p-1.5 pl-0 text-neutral4 text-center animate-bounce">
                        Open orders not found...
                     </div>
                  </div>
               )
            }
         </div>
      </>
   )
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   currentMarket: selectCurrentMarket(state),
   list: selectOpenOrdersList(state),
   fetching: selectOpenOrdersFetching(state),
   cancelFetching: selectCancelOpenOrdersFetching(state),
   userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   userOpenOrdersFetch: payload => dispatch(userOpenOrdersFetch(payload)),
   openOrdersCancelFetch: payload => dispatch(openOrdersCancelFetch(payload)),
   ordersCancelAll: payload => dispatch(ordersCancelAllFetch(payload)),
});

export type TradingTradeOpenOrderProps = ReduxProps;

export const TradingTradeOpenOrder = injectIntl(
   connect(
      mapStateToProps,
      mapDispatchToProps,
   )(TradingTradeOpenOrderContainer),
) as FunctionComponent;
