import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
   illusCard,
   illusCard2
} from 'assets';
import { useMarketsFetch, useMarketsTickersFetch } from 'hooks';
import { Market, selectMarkets, selectMarketTickers, setCurrentMarket } from 'modules';
import { Decimal } from 'components/Decimal';
import { Button } from 'components';
import { renderCurrencyIcon } from 'helpers';

const defaultTicker = {
   amount: '0.0',
   last: '0.0',
   high: '0.0',
   open: '0.0',
   low: '0.0',
   price_change_percent: '+0.00%',
   volume: '0.0',
};

export const Hero: FC = (props: any) => {
   useMarketsFetch();
   useMarketsTickersFetch();
   const markets = useSelector(selectMarkets);
   const marketTickers = useSelector(selectMarketTickers);

   const formatFilteredMarkets = (list: string[], market: Market) => {
      if (!list.includes(market.quote_unit)) {
         list.push(market.quote_unit);
      }
      return list;
   };

   let currentBidUnitsList: string[] = [''];

   if (markets.length > 0) {
      currentBidUnitsList = markets.reduce(formatFilteredMarkets, currentBidUnitsList);
   }

   let currentBidUnitMarkets = props.markets || markets;

   const formattedMarkets = currentBidUnitMarkets.length ? currentBidUnitMarkets.map(market =>
   ({
      ...market,
      last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
      open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
      price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
      high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), market.amount_precision),
      low: Decimal.format(Number((marketTickers[market.id] || defaultTicker).low), market.amount_precision),
      volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.amount_precision),
   }),
   ).map(market =>
   ({
      ...market,
      change: Decimal.format((+market.last - +market.open)
         .toFixed(market.price_precision), market.price_precision),
   }),
   ) : [];

   const handleScroll = (e: any, id: string) => {
      e.preventDefault();
      let hero = document.getElementById(id);
      hero && hero.scrollIntoView({
         behavior: 'smooth',
      });
   }

   const history = useHistory();
   const dispatch = useDispatch();
   const handleRedirectToTrading = (id: string) => {
      const currentMarket: Market | undefined = markets.find(market => market.id === id);
      if (currentMarket) {
         dispatch(setCurrentMarket(currentMarket));
         history.push(`/trading/${currentMarket?.id}`);
      }
   }

   return (
      <section className="relative overflow-hidden pt-8 lg:pt-20 lg2:pt-40 mb-34">
         <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-2 mb-4 md:mb-20 lg2:mb-[143px]">
               <div className="col-span-2 md:col-span-1 select-none">
                  <div className="mb-5 text-5xl md:text-64 tracking-custom font-dm font-bold">
                     <span className="hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-tr hover:from-primary1 hover:to-primary5 transition-all duration-300">
                        Buy & sell
                     </span>
                     <br />
                     crypto in minutes
                  </div>
                  <div className="mb-8 text-base text-neutral4 font-normal w-2/3 sm:w-3/4 md:w-full">
                     Trade Bitcoin, Ethereum, USDT, and the top altcoins on the legendary crypto asset exchange.
                  </div>
                  <div className="flex flex-row md:flex-col items-start justify-between">
                     <Button
                        text="Get started now"
                        className="mb-20"
                        width="noFull"
                     />
                     <a href="#learn" onClick={e => handleScroll(e, 'learn')} className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-none border-2 border-solid border-neutral6 dark:border-neutral4 hover:border-neutral2 dark:hover:border-neutral6 transition-colors duration-300">
                        <div className="flex flex-col -translate-y-[27px] animate-down group">
                           <svg className="mb-8 w-6 h-6 fill-neutral4 dark:fill-neutral6 group-hover:fill-neutral2 dark:group-hover:fill-neutral6 transition-all duration-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd"
                                 d="M16.7348 14.0909C17.1094 14.4968 17.0841 15.1294 16.6783 15.504L13.1783 18.7348C12.7953 19.0884 12.2048 19.0884 11.8218 18.7348L8.32172 15.504C7.91589 15.1294 7.89058 14.4968 8.26519 14.091C8.63979 13.6851 9.27245 13.6598 9.67827 14.0344L11.5 15.716L11.5 6C11.5 5.44771 11.9477 5 12.5 5C13.0523 5 13.5 5.44771 13.5 6L13.5 15.716L15.3217 14.0344C15.7275 13.6598 16.3602 13.6851 16.7348 14.0909Z" />
                           </svg>
                           <svg className="w-6 h-6 fill-neutral4 dark:fill-neutral6 group-hover:fill-neutral2 dark:group-hover:fill-neutral6 transition-all duration-300" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd"
                                 d="M16.7348 14.0909C17.1094 14.4968 17.0841 15.1294 16.6783 15.504L13.1783 18.7348C12.7953 19.0884 12.2048 19.0884 11.8218 18.7348L8.32172 15.504C7.91589 15.1294 7.89058 14.4968 8.26519 14.091C8.63979 13.6851 9.27245 13.6598 9.67827 14.0344L11.5 15.716L11.5 6C11.5 5.44771 11.9477 5 12.5 5C13.0523 5 13.5 5.44771 13.5 6L13.5 15.716L15.3217 14.0344C15.7275 13.6598 16.3602 13.6851 16.7348 14.0909Z" />
                           </svg>
                        </div>
                     </a>
                  </div>
               </div>
               <div className="col-span-2 md:col-span-1">
                  <div
                     className="absolute -top-20 lg2:-top-36 -right-6 pointer-events-none"
                  >
                     <img
                        className="hidden md:block md:w-[500px] lg:w-[700px] xl:w-auto"
                        srcSet={`${illusCard2} 2x`}
                        src={illusCard}
                        alt="Hero"
                     />
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-4 md:gap-x-8 p-6 md:mt-8 rounded-3xl bg-neutral7 dark:bg-neutral2">
               {
                  formattedMarkets?.length > 0 ? formattedMarkets?.slice(0, 4)?.map(market => (
                     <div
                        onClick={() => handleRedirectToTrading(market.id)}
                        className="col-span-4 sm:col-span-2 lg:col-span-1 px-6 py-4 md:p-8 dark:text-neutral8 rounded-2xl hover:bg-neutral8 dark:hover:bg-neutral3 hover:shadow-card cursor-pointer transition-all duration-300">
                        <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 items-start">
                           <img src={renderCurrencyIcon(market.base_unit)} alt="Bitcoin" />
                           <div className="md:mt-4">
                              <div className="flex space-x-3 items-center mb-1 text-xs font-semibold">
                                 <div className="text-neutral4">{market.name}</div>
                                 <div className={`${+(market.change || 0) < 0 ? 'bg-primary4' : 'bg-chart1'} rounded-3xl inline-block py-[2px] px-2 text-neutral8`}>{market.price_change_percent}</div>
                              </div>
                              <div className="my-1 text-2xl font-semibold">{Decimal.format(market.last, market.price_precision, ',')}</div>
                              <div className="text-xs font-normal">{Decimal.format(market.volume, market.price_precision, ',')}</div>
                           </div>
                        </div>
                     </div>
                  )) : (
                     <div className="col-span-4 px-6 py-4 md:p-8 dark:text-neutral8 rounded-2xl hover:bg-neutral8 dark:hover:bg-neutral3 hover:shadow-card cursor-pointer transition-all duration-300">
                        <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 items-center">
                           <div className="text-2xl font-semibold text-center">Market null</div>
                        </div>
                     </div>
                  )
               }
            </div>
         </div>
      </section>
   );
};
