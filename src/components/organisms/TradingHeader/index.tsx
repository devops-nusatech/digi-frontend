import React, { FC, memo } from 'react';
import { Decimal } from 'components';
import {
   Market,
   Ticker
} from 'modules';
import {
   CurrencyDollarIcon,
   ClockIcon,
   ArrowCircleUpIcon,
   ArrowCircleDownIcon,
   ChartBarIcon
} from '@heroicons/react/outline';

interface TradingHeaderProps {
   currentMarket?: Market;
   marketTickers: {
      [key: string]: Ticker,
   };
   translate(id: string): string;
}

export const TradingHeader: FC<TradingHeaderProps> = memo(({
   currentMarket,
   marketTickers,
   translate,
}) => {
   const defaultTicker: Ticker = {
      avg_price: '0',
      high: '0',
      last: '0',
      low: '0',
      open: '0',
      price_change_percent: '+0.00%',
      volume: '0',
      amount: '0'
   }

   const getTickerValue = (value: string) => {
      return currentMarket && (marketTickers[currentMarket.id] || defaultTicker)[value];
   };

   const isPositive = currentMarket && /\+/.test(getTickerValue('price_change_percent'));

   const bidUnit = currentMarket && currentMarket.quote_unit.toUpperCase();
   const name = currentMarket?.name.split('/').shift();

   const pricePrecision = currentMarket?.price_precision;

   return (
      <div className="block lg:flex items-center p-5 bg-neutral8 dark:bg-shade2 rounded-[4px]">
         <div className="flex flex-col md:flex-row md:space-x-8 md:items-center">
            <div className="flex flex-col space-y-1">
               <div className="flex items-center space-x-1">
                  <div className="text-2xl leading-custom2 font-semibold text-neutral1 dark:text-neutral8 tracking-custom1">
                     {currentMarket?.name ?? 'Market name'}
                  </div>
                  <div className={`py-1 px-2 rounded-xl ${isPositive ? 'bg-chart1' : 'bg-primary4'} inline-block text-xs font-bold uppercase text-neutral8`}>
                     {currentMarket && (marketTickers[currentMarket.id] || defaultTicker).price_change_percent}
                  </div>
               </div>
               <div className="text-xs font-semibold leading-custom1 text-neutral4">
                  {
                     name === 'BTC' ? 'Bitcoin' :
                        name === 'ETH' ? 'Ethereum' :
                           name ?? 'Market name'
                  }
               </div>
            </div>
            <div className="flex flex-col space-y-1">
               <div className="text-2xl leading-custom2 font-semibold text-primary4 tracking-custom1">
                  {(currentMarket && Decimal.format(Number(getTickerValue('last')), Number(pricePrecision), ',')) ?? defaultTicker.last}
               </div>
               <div className="flex items-center text-xs font-semibold leading-custom1 text-neutral4">
                  <CurrencyDollarIcon className="w-4 h-4 stroke-neutral4 mr-1" />
                  {currentMarket && Decimal.format(Number(getTickerValue('last')) - Number(getTickerValue('open')), Number(pricePrecision), ',') || 0}
               </div>
            </div>
         </div>
         <div className="flex space-x-6 justify-between items-center ml-auto mt-5 lg:mt-0">
            <div className="grow-0 shrink-0 basis-auto lg2:basis-40 w-auto lg2:w-40 space-y-1 pr-6 border-r border-neutral6 dark:border-neutral2">
               <div className="flex items-center space-y-1 text-xs leading-custom1 text-neutral4">
                  <ClockIcon className="w-4 h-4 stroke-neutral4 mr-1" />
                  24h {translate('page.body.trade.toolBar.change')}
               </div>
               <div className="font-medium text-neutral1 dark:text-neutral8">
                  {currentMarket && (marketTickers[currentMarket.id] || defaultTicker).price_change_percent || defaultTicker.price_change_percent}
               </div>
            </div>
            <div className="grow-0 shrink-0 basis-auto lg2:basis-40 w-auto lg2:w-40 space-y-1 pr-6 border-r border-neutral6 dark:border-neutral2">
               <div className="flex items-center space-y-1 text-xs leading-custom1 text-neutral4">
                  <ArrowCircleUpIcon className="w-4 h-4 stroke-neutral4 mr-1" />
                  {translate('page.body.trade.toolBar.lowest')}
               </div>
               <div className="font-medium text-neutral1 dark:text-neutral8">
                  {currentMarket && Decimal.format(Number(getTickerValue('low')), Number(pricePrecision), ',') || defaultTicker.low} {bidUnit}
               </div>
            </div>
            <div className="grow-0 shrink-0 basis-auto lg2:basis-40 w-auto lg2:w-40 space-y-1 pr-6 border-r border-neutral6 dark:border-neutral2">
               <div className="flex items-center space-y-1 text-xs leading-custom1 text-neutral4">
                  <ArrowCircleDownIcon className="w-4 h-4 stroke-neutral4 mr-1" />
                  {translate('page.body.trade.toolBar.highest')}
               </div>
               <div className="font-medium text-neutral1 dark:text-neutral8">
                  {currentMarket && Decimal.format(Number(getTickerValue('high')), Number(pricePrecision), ',') || defaultTicker.high} {bidUnit}
               </div>
            </div>
            <div className="grow-0 shrink-0 basis-auto lg2:basis-40 w-auto lg2:w-40 space-y-1 pr-6 ">
               <div className="flex items-center space-y-1 text-xs leading-custom1 text-neutral4">
                  <ChartBarIcon className="w-4 h-4 stroke-neutral4 mr-1" />
                  {translate('page.body.trade.toolBar.volume')}
               </div>
               <div className="font-medium text-neutral1 dark:text-neutral8">
                  {currentMarket && Decimal.format(Number(getTickerValue('volume')), Number(pricePrecision), ',') || defaultTicker.volume} {bidUnit ?? 'IDR/USDT'}
               </div>
            </div>
         </div>
      </div>
   );
});
