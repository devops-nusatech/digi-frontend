import React, { FC, memo } from 'react';
import { Decimal } from 'components';
import { Market, Ticker } from 'modules';
import {
   CurrencyDollarIcon,
   ClockIcon,
   ArrowCircleUpIcon,
   ArrowCircleDownIcon,
   ChartBarIcon,
} from '@heroicons/react/outline';

interface TradingHeaderProps {
   currentMarket?: Market;
   marketTickers: {
      [key: string]: Ticker;
   };
   translate(id: string): string;
}

export const TradingHeader: FC<TradingHeaderProps> = memo(
   ({ currentMarket, marketTickers, translate }) => {
      const defaultTicker: Ticker = {
         avg_price: '0',
         high: '0',
         last: '0',
         low: '0',
         open: '0',
         price_change_percent: '+0.00%',
         volume: '0',
         amount: '0',
      };

      const getTickerValue = (value: string) => {
         return (
            currentMarket &&
            (marketTickers[currentMarket.id] || defaultTicker)[value]
         );
      };

      const isPositive =
         currentMarket && /\+/.test(getTickerValue('price_change_percent'));

      const bidUnit = currentMarket && currentMarket.quote_unit.toUpperCase();
      const name = currentMarket?.name.split('/').shift();

      const pricePrecision = currentMarket?.price_precision;

      return (
         <div className="block items-center rounded-[4px] bg-neutral8 p-5 dark:bg-shade2 lg:flex">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
               <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-1">
                     <div className="text-2xl font-semibold leading-custom2 tracking-custom1 text-neutral1 dark:text-neutral8">
                        {currentMarket?.name ?? 'Market name'}
                     </div>
                     <div
                        className={`rounded-xl py-1 px-2 ${
                           isPositive ? 'bg-chart1' : 'bg-primary4'
                        } inline-block text-xs font-bold uppercase text-neutral8`}>
                        {currentMarket &&
                           (marketTickers[currentMarket.id] || defaultTicker)
                              .price_change_percent}
                     </div>
                  </div>
                  <div className="text-xs font-semibold leading-custom1 text-neutral4">
                     {name === 'BTC'
                        ? 'Bitcoin'
                        : name === 'ETH'
                        ? 'Ethereum'
                        : name ?? 'Market name'}
                  </div>
               </div>
               <div className="flex flex-col space-y-1">
                  <div className="text-2xl font-semibold leading-custom2 tracking-custom1 text-primary4">
                     {(currentMarket &&
                        Decimal.format(
                           Number(getTickerValue('last')),
                           Number(pricePrecision),
                           ','
                        )) ??
                        defaultTicker.last}
                  </div>
                  <div className="flex items-center text-xs font-semibold leading-custom1 text-neutral4">
                     <CurrencyDollarIcon className="mr-1 h-4 w-4 stroke-neutral4" />
                     {(currentMarket &&
                        Decimal.format(
                           Number(getTickerValue('last')) -
                              Number(getTickerValue('open')),
                           Number(pricePrecision),
                           ','
                        )) ||
                        0}
                  </div>
               </div>
            </div>
            <div className="ml-auto mt-5 flex items-center justify-between space-x-6 lg:mt-0">
               <div className="w-auto shrink-0 grow-0 basis-auto space-y-1 border-r border-neutral6 pr-6 dark:border-neutral2 lg2:w-40 lg2:basis-40">
                  <div className="flex items-center space-y-1 text-xs leading-custom1 text-neutral4">
                     <ClockIcon className="mr-1 h-4 w-4 stroke-neutral4" />
                     24h {translate('page.body.trade.toolBar.change')}
                  </div>
                  <div className="font-medium text-neutral1 dark:text-neutral8">
                     {(currentMarket &&
                        (marketTickers[currentMarket.id] || defaultTicker)
                           .price_change_percent) ||
                        defaultTicker.price_change_percent}
                  </div>
               </div>
               <div className="w-auto shrink-0 grow-0 basis-auto space-y-1 border-r border-neutral6 pr-6 dark:border-neutral2 lg2:w-40 lg2:basis-40">
                  <div className="flex items-center space-y-1 text-xs leading-custom1 text-neutral4">
                     <ArrowCircleUpIcon className="mr-1 h-4 w-4 stroke-neutral4" />
                     {translate('page.body.trade.toolBar.lowest')}
                  </div>
                  <div className="font-medium text-neutral1 dark:text-neutral8">
                     {(currentMarket &&
                        Decimal.format(
                           Number(getTickerValue('low')),
                           Number(pricePrecision),
                           ','
                        )) ||
                        defaultTicker.low}{' '}
                     {bidUnit}
                  </div>
               </div>
               <div className="w-auto shrink-0 grow-0 basis-auto space-y-1 border-r border-neutral6 pr-6 dark:border-neutral2 lg2:w-40 lg2:basis-40">
                  <div className="flex items-center space-y-1 text-xs leading-custom1 text-neutral4">
                     <ArrowCircleDownIcon className="mr-1 h-4 w-4 stroke-neutral4" />
                     {translate('page.body.trade.toolBar.highest')}
                  </div>
                  <div className="font-medium text-neutral1 dark:text-neutral8">
                     {(currentMarket &&
                        Decimal.format(
                           Number(getTickerValue('high')),
                           Number(pricePrecision),
                           ','
                        )) ||
                        defaultTicker.high}{' '}
                     {bidUnit}
                  </div>
               </div>
               <div className="w-auto shrink-0 grow-0 basis-auto space-y-1 pr-6 lg2:w-40 lg2:basis-40 ">
                  <div className="flex items-center space-y-1 text-xs leading-custom1 text-neutral4">
                     <ChartBarIcon className="mr-1 h-4 w-4 stroke-neutral4" />
                     {translate('page.body.trade.toolBar.volume')}
                  </div>
                  <div className="font-medium text-neutral1 dark:text-neutral8">
                     {(currentMarket &&
                        Decimal.format(
                           Number(getTickerValue('volume')),
                           Number(pricePrecision),
                           ','
                        )) ||
                        defaultTicker.volume}{' '}
                     {bidUnit ?? 'IDR/USDT'}
                  </div>
               </div>
            </div>
         </div>
      );
   }
);
