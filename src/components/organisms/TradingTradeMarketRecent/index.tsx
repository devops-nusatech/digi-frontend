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
         <div
            className="table-row font-urw-din-500"
            key={item.id}>
            <div className="table-cell p-1.5 pl-0 text-xs font-medium leading-relaxed text-neutral4">
               {String(localeDate(item.created_at, 'time'))}
            </div>
            <div
               className={`table-cell p-1.5 text-xs font-medium leading-relaxed ${
                  item.taker_type === 'sell' ? 'text-primary4' : 'text-primary5'
               }`}>
               {Decimal.format(
                  item.price,
                  Number(currentMarket?.price_precision),
                  ','
               )}
            </div>
            <div className="table-cell p-1.5 text-xs font-medium leading-relaxed">
               {Decimal.format(
                  item.amount,
                  Number(currentMarket?.amount_precision),
                  ','
               )}
            </div>
            <div className="table-cell p-1.5 pr-0 text-right text-xs font-medium leading-relaxed">
               {Decimal.format(
                  Math.round(Number(item.price) * Number(item.amount)),
                  Number(currentMarket?.price_precision),
                  ','
               )}
            </div>
         </div>
      );
   }, []);

   return (
      <>
         <div className="table w-full">
            <div className="table-row">
               <div className="table-cell p-1.5 pb-[10px] pl-0 text-xs font-semibold leading-relaxed text-neutral4">
                  <div className="relative inline-block cursor-pointer pr-4">
                     Time
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell p-1.5 pb-[10px] text-xs font-semibold leading-relaxed text-neutral4">
                  <div className="relative inline-block cursor-pointer pr-4">
                     Price (USDT)
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell p-1.5 pb-[10px] text-xs font-semibold leading-relaxed text-neutral4">
                  <div className="relative inline-block cursor-pointer pr-4">
                     Amount (BTC)
                     <div className="absolute top-0 -right-2">
                        <IcShorting />
                     </div>
                  </div>
               </div>
               <div className="table-cell p-1.5 pb-[10px] pr-0 text-right text-xs font-semibold leading-relaxed text-neutral4">
                  <div className="relative inline-block cursor-pointer pr-4">
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
               {isLoading ? (
                  <>
                     <div className="table-row">
                        <div className="table-cell p-1.5 pb-[10px] pl-0">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                     </div>
                     <div className="table-row">
                        <div className="table-cell p-1.5 pb-[10px] pl-0">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                     </div>
                     <div className="table-row">
                        <div className="table-cell p-1.5 pb-[10px] pl-0">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                     </div>
                  </>
               ) : recentTrades && recentTrades?.length > 0 ? (
                  recentTrades?.map(renderRecentTrades)
               ) : (
                  <div className="table-row">
                     <div className="table-cell">&nbsp;</div>
                     <div className="table-cell">&nbsp;</div>
                     <div className="table-cell">&nbsp;</div>
                     <div className="absolute left-0 table-cell w-full animate-bounce p-1.5 pl-0 text-center text-xs font-medium leading-relaxed text-neutral4">
                        Market trades not found...
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

const mapStateToProps = (state: RootState) => ({
   colorTheme: selectCurrentColorTheme(state),
   currentMarket: selectCurrentMarket(state),
   currentPrice: selectCurrentPrice(state),
   lastRecentTrade: selectLastRecentTrade(state),
   openOrdersList: selectOpenOrdersList(state),
   recentTrades: selectRecentTrades(state),
   isLoading: selectRecentTradesLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});

export const TradingTradeMarketRecent = injectIntl(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(TradingTradeMarketRecentContainer)
) as any;
