import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
   Market,
   PublicTrade,
   Ticker,
   depthFetch,
   selectAmount,
   selectCurrentPrice,
   selectDepthAsks,
   selectDepthBids,
   selectDepthLoading,
   selectOrderBookLoading,
} from 'modules';
import { Skeleton, Decimal, FlexCenter, Empty } from 'components';
import { useReduxSelector } from 'hooks';
import {
   DEFAULT_CCY_PRECISION,
   DEFAULT_FIAT_PRECISION,
   DEFAULT_TICKER,
} from '../../../constants';
import { accumulateVolume, calcMaxVolume, classNames } from 'helpers';
import { incrementalOrderBook } from 'api';
import {
   CurrentMarket,
   IsDisplay,
   MarketTicker,
   SetCurrentPrice,
   Translate,
} from 'types';

type CurrenctTab = 'all' | 'asks' | 'bids';

interface TradingOrderBookProps
   extends CurrentMarket,
      Translate,
      IsDisplay,
      MarketTicker,
      SetCurrentPrice {
   lastRecentTrade: PublicTrade;
   setCurrentAmount: (amount: string) => void;
}

export const TradingOrderBook = memo(function TradingOrderBook({
   currentMarket,
   setCurrenPrice,
   lastRecentTrade,
   setCurrentAmount,
   marketTickers,
   translate,
   display,
}: TradingOrderBookProps) {
   const dispatch = useDispatch();
   const orderBookLoading = useReduxSelector(
      selectOrderBookLoading || selectDepthLoading
   );
   const currentPrice = useReduxSelector(selectCurrentPrice)!;
   const currentAmount = useReduxSelector(selectAmount)!;
   const asks = useReduxSelector(selectDepthAsks);
   const bids = useReduxSelector(selectDepthBids);

   const [currentTab, setCurrentTab] = useState<CurrenctTab>('all');

   const handleSelectAsk = useCallback(
      (index: number) => {
         const priceToSet = asks[index] && Number(asks[index][0]);
         let tempAmount = 0;
         for (let i = index; i >= 0; i--) {
            tempAmount += Number(asks[i][1]);
         }
         const amount = Decimal.format(
            tempAmount,
            currentMarket?.amount_precision,
            ','
         );
         if (currentPrice !== priceToSet) {
            setCurrenPrice(priceToSet);
            setCurrentAmount(amount);
         }
      },
      [
         asks,
         currentMarket?.amount_precision,
         currentPrice,
         setCurrenPrice,
         setCurrentAmount,
      ]
   );
   const handleSelectBid = useCallback(
      (index: number) => {
         const priceToSet = bids[index] && Number(bids[index][0]);
         let tempAmount = 0;
         for (let i = 0; i <= index; i++) {
            tempAmount += Number(bids[i][1]);
         }
         const amount = Decimal.format(
            tempAmount,
            currentMarket?.amount_precision,
            ','
         );
         if (currentPrice !== priceToSet) {
            setCurrenPrice(priceToSet);
            setCurrentAmount(amount);
         }
      },
      [
         bids,
         currentMarket?.amount_precision,
         currentPrice,
         setCurrenPrice,
         setCurrentAmount,
      ]
   );

   useEffect(() => {
      console.table([[currentPrice, currentAmount]]);
   }, [currentAmount, currentPrice]);

   useEffect(() => {
      if (currentMarket && !incrementalOrderBook()) {
         dispatch(depthFetch(currentMarket));
      }
   }, [currentMarket, dispatch]);

   const baseUnit = useMemo(
      () =>
         (currentMarket && currentMarket?.base_unit.toUpperCase()) || (
            <Skeleton
               height={20}
               width={40}
            />
         ),
      [currentMarket]
   );
   const quoteUnit = useMemo(
      () =>
         (currentMarket && currentMarket?.quote_unit.toUpperCase()) || (
            <Skeleton
               height={20}
               width={40}
            />
         ),
      [currentMarket]
   );
   const amountFixed = useMemo(
      () =>
         (currentMarket && currentMarket?.amount_precision) ||
         DEFAULT_CCY_PRECISION,
      [currentMarket]
   );
   const priceFixed = useMemo(
      () =>
         (currentMarket && currentMarket?.price_precision) ||
         DEFAULT_FIAT_PRECISION,
      [currentMarket]
   );

   const mapValues = useCallback(
      (maxVolume?: number, data?: number[]) =>
         data && maxVolume && data.length
            ? data.map(currentVolume => (currentVolume / maxVolume) * 100)
            : [],
      []
   );

   const bgWidthAsks = useMemo(
      () =>
         mapValues(
            calcMaxVolume(bids, asks.slice(0).reverse()),
            accumulateVolume(asks.slice(0).reverse(), false)
         ),
      [mapValues, asks, bids]
   );
   const bgWidthBids = useMemo(
      () => mapValues(calcMaxVolume(bids, asks), accumulateVolume(bids, false)),
      [mapValues, asks, bids]
   );

   const getTickerValue = useCallback(
      (currentMarket: Market, tickers: { [key: string]: Ticker }) => {
         return tickers[currentMarket.id] || DEFAULT_TICKER;
      },
      []
   );

   const lastPrice = useMemo(() => {
      if (currentMarket) {
         let lastPrice = '';
         let entryPriceChange: '' | 'positive' | 'negative' = '';

         const lastTicker =
            currentMarket && getTickerValue(currentMarket, marketTickers).last;
         const openTicker =
            currentMarket && getTickerValue(currentMarket, marketTickers).open;

         if (lastRecentTrade?.market === currentMarket.id) {
            lastPrice = String(lastRecentTrade && lastRecentTrade?.price);

            if (Number(lastRecentTrade && lastRecentTrade?.price_change) > 0) {
               entryPriceChange = 'positive';
            } else if (
               Number(lastRecentTrade && lastRecentTrade?.price_change) < 0
            ) {
               entryPriceChange = 'negative';
            }
         } else {
            const currentTicker =
               currentMarket && getTickerValue(currentMarket, marketTickers);
            lastPrice = currentTicker.last;

            if (currentTicker.price_change_percent.includes('+')) {
               entryPriceChange = 'positive';
            } else if (currentTicker.price_change_percent.includes('-')) {
               entryPriceChange = 'negative';
            }
         }

         return orderBookLoading ? (
            <div className="flex justify-between gap-4">
               <Skeleton
                  height={20}
                  width={50}
               />
               <Skeleton
                  height={20}
                  width={50}
               />
               <Skeleton
                  height={20}
                  width={50}
               />
            </div>
         ) : (
            <>
               <div
                  className={`text-base font-semibold leading-normal tracking-wider ${
                     entryPriceChange === 'positive'
                        ? 'text-primary5'
                        : 'text-primary4'
                  }`}>
                  {Decimal.format(lastPrice, priceFixed, ',')}
               </div>
               <svg
                  className={`h-4 w-4 fill-primary1 ${
                     entryPriceChange === 'positive'
                        ? 'rotate-0 fill-primary5'
                        : 'rotate-180 fill-primary4'
                  }`}>
                  <use xlinkHref="#icon-arrow-top" />
               </svg>
               <div
                  className={`text-base font-medium leading-normal tracking-wider ${
                     entryPriceChange === 'positive'
                        ? 'text-primary5'
                        : 'text-primary4'
                  }`}>
                  {Decimal.format(+lastTicker - +openTicker, priceFixed, ',')}
               </div>
            </>
         );
      }
      return (
         <>
            <span className="text-primary4">0</span>
            <span>{translate('page.body.trade.orderbook.lastMarket')}</span>
         </>
      );
   }, [
      currentMarket,
      getTickerValue,
      lastRecentTrade,
      marketTickers,
      orderBookLoading,
      priceFixed,
      translate,
   ]);

   return (
      <div
         className={classNames(
            `w-64 lg:!block lg2:shrink-0 lg-max:float-none lg-max:mb-0 ${
               display ? '' : 'lg-max:hidden'
            }  lg-max:w-full lg2-max:float-left lg2-max:mb-1`
         )}>
         <div className="rounded bg-neutral8 py-4 dark:bg-shade2">
            <FlexCenter className="gap-3 px-4">
               <button
                  type="button"
                  onClick={() => setCurrentTab('all')}
                  className={`flex h-8 w-8 shrink-0 flex-col items-center justify-center space-y-0.5 rounded ${
                     currentTab === 'all'
                        ? 'bg-shade4 dark:bg-neutral2'
                        : 'hover:bg-shade4 dark:hover:bg-neutral2'
                  } transition-all duration-300`}>
                  <span className="h-0.5 w-3 bg-primary4" />
                  <span className="h-0.5 w-3 bg-neutral5" />
                  <span className="h-0.5 w-3 bg-primary5 dark:bg-chart1" />
               </button>
               <button
                  type="button"
                  onClick={() => setCurrentTab('bids')}
                  className={`flex h-8 w-8 shrink-0 flex-col items-center justify-center space-y-0.5 rounded ${
                     currentTab === 'bids'
                        ? 'bg-shade4 dark:bg-neutral2'
                        : 'hover:bg-shade4 dark:hover:bg-neutral2'
                  } transition-all duration-300`}>
                  <span className="h-0.5 w-3 bg-neutral5" />
                  <span className="h-0.5 w-3 bg-neutral5" />
                  <span className="h-0.5 w-3 bg-primary5 dark:bg-chart1" />
               </button>
               <button
                  type="button"
                  onClick={() => setCurrentTab('asks')}
                  className={`flex h-8 w-8 shrink-0 flex-col items-center justify-center space-y-0.5 rounded ${
                     currentTab === 'asks'
                        ? 'bg-shade4 dark:bg-neutral2'
                        : 'hover:bg-shade4 dark:hover:bg-neutral2'
                  } transition-all duration-200`}>
                  <span className="h-0.5 w-3 bg-primary4" />
                  <span className="h-0.5 w-3 bg-neutral5" />
                  <span className="h-0.5 w-3 bg-neutral5" />
               </button>
            </FlexCenter>
            <div className="grid grid-cols-3 gap-1 p-4 pb-2 text-xs font-semibold text-neutral4">
               <div>
                  {translate('page.body.trade.orderbook.header.price')} (
                  {quoteUnit})
               </div>
               <div className="text-right">
                  {translate('page.body.trade.orderbook.header.amount')} (
                  {baseUnit})
               </div>
               <div className="text-right">
                  {translate('page.body.trade.orderbook.header.volume')}
               </div>
            </div>
            <div
               className={`relative ${
                  currentTab !== 'bids'
                     ? 'visible opacity-100'
                     : 'invisible h-0 opacity-0'
               } overflow-x-hidden transition-all duration-300 ease-in-out`}>
               <div
                  className={`scrollbar-hide flex ${
                     currentTab === 'asks' ? 'h-793' : 'h-[396.5px]'
                  } flex-col-reverse overflow-y-scroll transition-all duration-300 ${
                     orderBookLoading ? 'space-y-3' : 'space-y-1'
                  }`}>
                  {orderBookLoading ? (
                     <>
                        <Skeleton isWithFull />
                        <Skeleton isWithFull />
                        <Skeleton isWithFull />
                     </>
                  ) : asks.length ? (
                     asks
                        .map(e => e.map(Number))
                        .map(([price, volume], index) => (
                           <div
                              key={index}
                              onClick={() => handleSelectAsk(index)}
                              className="relative grid grid-cols-3 gap-1 px-4 text-right font-roboto-flex text-xs font-medium">
                              <div className="z-1 py-1 text-left font-semibold text-primary4">
                                 {Decimal.format(price, priceFixed, ',')}
                              </div>
                              <div className="z-1 py-1">
                                 {Decimal.format(volume, amountFixed, ',')}
                              </div>
                              <div className="z-1 py-1">
                                 {Decimal.format(
                                    price * volume,
                                    amountFixed,
                                    ','
                                 )}
                              </div>
                              <div
                                 className="bg-primary4/15 absolute right-0 top-px z-0 ml-auto h-6.5 dark:bg-primary4/30"
                                 style={{
                                    width: `${bgWidthAsks[index] * 5}%`,
                                 }}
                              />
                           </div>
                        ))
                  ) : (
                     <Empty />
                  )}
               </div>
            </div>
            <div className="my-3 flex items-center justify-between border-y border-neutral6 px-4 py-3 text-base font-medium dark:border-neutral2">
               {lastPrice}
            </div>
            <div
               className={classNames(
                  `relative ${
                     currentTab !== 'asks'
                        ? 'visible opacity-100'
                        : 'invisible h-0 opacity-0'
                  } transition-all duration-300 ease-in-out`
               )}>
               <div
                  className={`scrollbar-hide flex ${
                     currentTab === 'bids' ? 'h-793' : 'h-[396.5px]'
                  } flex-col overflow-y-scroll transition-all duration-300 ${
                     orderBookLoading ? 'space-y-3' : 'space-y-1'
                  }`}>
                  {orderBookLoading ? (
                     <>
                        <Skeleton isWithFull />
                        <Skeleton isWithFull />
                        <Skeleton isWithFull />
                     </>
                  ) : bids.length ? (
                     bids
                        .map(e => e.map(Number))
                        .map(([price, volume], index) => (
                           <div
                              key={index}
                              onClick={() => handleSelectBid(index)}
                              className="relative grid grid-cols-3 gap-1 px-4 text-right font-roboto-flex text-xs font-medium">
                              <div className="z-1 py-1 text-left font-semibold text-primary5 dark:text-chart1">
                                 {Decimal.format(price, priceFixed, ',')}
                              </div>
                              <div className="z-1 py-1">
                                 {Decimal.format(volume, amountFixed, ',')}
                              </div>
                              <div className="z-1 py-1">
                                 {Decimal.format(
                                    price * volume,
                                    amountFixed,
                                    ','
                                 )}
                              </div>
                              <div
                                 className="bg-primary5/15 absolute right-0 top-px z-0 ml-auto h-6.5 dark:bg-chart1/30"
                                 style={{
                                    width: `${bgWidthBids[index] * 5}%`,
                                 }}
                              />
                           </div>
                        ))
                  ) : (
                     <Empty />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
});
