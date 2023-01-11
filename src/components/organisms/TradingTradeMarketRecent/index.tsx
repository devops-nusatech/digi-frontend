import React, { useCallback } from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { injectIntl } from 'react-intl';
import { IntlProps } from '../../..';
import {
   Market,
   PublicTrade,
   RootState,
   selectCurrentColorTheme,
   selectCurrentMarket,
   selectCurrentPrice,
   selectLastRecentTrade,
   selectOpenOrdersList,
   selectRecentTrades,
   selectRecentTradesLoading,
   setCurrentPrice,
   Ticker,
} from 'modules';
import { OrderCommon } from 'modules/types';
import { IcShorting } from 'assets';
import { localeDate } from 'helpers';
import { Decimal } from 'components';

interface ReduxProps {
   colorTheme: string;
   currentMarket?: Market;
   currentPrice?: number;
   lastRecentTrade?: PublicTrade;
   openOrdersList: OrderCommon[];
   recentTrades?: PublicTrade[];
   isLoading?: boolean;
}

interface DispatchProps {
   setCurrentPrice: typeof setCurrentPrice;
}

interface OwnProps {
   marketTickers: {
      [key: string]: Ticker;
   };
   forceLarge?: boolean;
   size: number;
}

type Props = ReduxProps & DispatchProps & OwnProps & IntlProps;

const TradingTradeMarketRecentContainer = (props: Props) => {
   const { recentTrades, currentMarket, isLoading } = props;
   const renderRecentTrades = useCallback((item: PublicTrade) => {
      return (
         <div className="table-row font-urw-din-500" key={item.id}>
            <div className="text-xs leading-relaxed font-medium table-cell p-1.5 pl-0 text-neutral4">
               {
                  String(localeDate(item.created_at, 'time'))
               }
            </div>
            <div className={`text-xs leading-relaxed font-medium table-cell p-1.5 ${item.taker_type === 'sell' ? 'text-primary4' : 'text-primary5'}`}>
               {
                  Decimal.format(item.price, Number(currentMarket?.price_precision), ',')
               }
            </div>
            <div className="text-xs leading-relaxed font-medium table-cell p-1.5">
               {
                  Decimal.format(item.amount, Number(currentMarket?.amount_precision), ',')
               }
            </div>
            <div className="text-xs leading-relaxed font-medium table-cell p-1.5 pr-0 text-right">
               {
                  Decimal.format(Math.round(Number(item.price) * Number(item.amount)), Number(currentMarket?.price_precision), ',')
               }
            </div>
         </div>
      )
   }, []);

   return (
      <>
         <div className="table w-full">
            <div className="table-row">
               <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed pb-[10px] p-1.5 pl-0">
                  <div className="relative inline-block pr-4 cursor-pointer">
                     Time
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed pb-[10px] p-1.5">
                  <div className="relative inline-block pr-4 cursor-pointer">
                     Price (USDT)
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed pb-[10px] p-1.5">
                  <div className="relative inline-block pr-4 cursor-pointer">
                     Amount (BTC)
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed pb-[10px] p-1.5 pr-0 text-right">
                  <div className="relative inline-block pr-4 cursor-pointer">
                     Total (USDT)
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="h-[305px] overflow-y-scroll">
            <div className="table w-full">
               {
                  isLoading ? (
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
                        </div>
                     </>
                  ) : (recentTrades && recentTrades?.length > 0) ? recentTrades?.map(renderRecentTrades) : (
                     <div className="table-row">
                        <div className="table-cell">&nbsp;</div>
                        <div className="table-cell">&nbsp;</div>
                        <div className="table-cell">&nbsp;</div>
                        <div className="table-cell absolute left-0 w-full text-xs leading-relaxed font-medium p-1.5 pl-0 text-neutral4 text-center animate-bounce">
                           Market trades not found...
                        </div>
                     </div>
                  )
               }
            </div>
         </div>
      </>
   )
}

const mapStateToProps = (state: RootState) => ({
   colorTheme: selectCurrentColorTheme(state),
   currentMarket: selectCurrentMarket(state),
   currentPrice: selectCurrentPrice(state),
   lastRecentTrade: selectLastRecentTrade(state),
   openOrdersList: selectOpenOrdersList(state),
   recentTrades: selectRecentTrades(state),
   isLoading: selectRecentTradesLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});

export const TradingTradeMarketRecent =
   injectIntl(
      connect(
         mapStateToProps,
         mapDispatchToProps
      )(
         TradingTradeMarketRecentContainer
      )
   ) as any;
