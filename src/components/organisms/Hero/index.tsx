import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import {
   illusCard,
   illusCard2
} from 'assets';
import { useMarket } from 'hooks';
import { Button, Skeleton, Image } from 'components';
import { renderCurrencyIcon } from 'helpers';

export const Hero: FC = (props: any) => {
   const history = useHistory();
   const { marketsData, handleRedirectToTrading, isLoading } = useMarket();

   const handleScroll = (e: any, id: string) => {
      e.preventDefault();
      let hero = document.getElementById(id);
      hero && hero.scrollIntoView({
         behavior: 'smooth',
      });
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
                        onClick={() => history.push('/markets')}
                     />
                     <a href="#learn" onClick={e => handleScroll(e, 'learn')} className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-none border-2 border-solid border-neutral6 dark:border-neutral4 hover:border-neutral2 dark:hover:border-neutral6 transition-colors duration-300">
                        <div className="flex flex-col space-y-8 -translate-y-[27px] animate-down group">
                           <svg className="w-6 h-6 fill-neutral4 dark:fill-neutral6 group-hover:fill-neutral2 dark:group-hover:fill-neutral6 transition-all duration-300">
                              <use xlinkHref="#icon-arrow-bottom" />
                           </svg>
                           <svg className="w-6 h-6 fill-neutral4 dark:fill-neutral6 group-hover:fill-neutral2 dark:group-hover:fill-neutral6 transition-all duration-300">
                              <use xlinkHref="#icon-arrow-bottom" />
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
                        title="Hero"
                     />
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-4 md:gap-x-8 p-6 md:mt-8 rounded-3xl bg-neutral7 dark:bg-neutral2">
               {isLoading ? (
                  <>
                     <Skeleton className="col-span-4 sm:col-span-2 lg:col-span-1" height={196} width={244} rounded="2xl" />
                     <Skeleton className="col-span-4 sm:col-span-2 lg:col-span-1" height={196} width={244} rounded="2xl" />
                     <Skeleton className="col-span-4 sm:col-span-2 lg:col-span-1" height={196} width={244} rounded="2xl" />
                     <Skeleton className="col-span-4 sm:col-span-2 lg:col-span-1" height={196} width={244} rounded="2xl" />
                  </>
               ) : marketsData?.length ? marketsData?.slice(0, 4)?.map(market => (
                  <div
                     key={market.id}
                     onClick={() => handleRedirectToTrading(market.id)}
                     className="col-span-4 sm:col-span-2 lg:col-span-1 px-6 py-4 md:p-8 dark:text-neutral8 rounded-2xl hover:bg-neutral8 dark:hover:bg-neutral3 hover:shadow-card cursor-pointer transition-all duration-300"
                  >
                     <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 items-start">
                        <Image
                           src={renderCurrencyIcon(market.base_unit)}
                           alt={market.name}
                           title={market.name}
                           width={40}
                           height={40}
                        />
                        <div className="md:mt-4">
                           <div className="flex space-x-3 items-center mb-1 text-xs font-semibold">
                              <div className="text-neutral4">{market.name}</div>
                              <div className={`${market.price_change_percent?.includes('-') ? 'bg-primary4' : 'bg-chart1'} rounded-3xl inline-block py-[2px] px-2 text-neutral8`}>{market.price_change_percent}</div>
                           </div>
                           <div className="my-1 text-2xl font-semibold">{market.last}</div>
                           <div className="text-xs font-normal">{market.volume}</div>
                        </div>
                     </div>
                  </div>
               )) : (
                  <div className="col-span-4 px-6 py-4 md:p-8 dark:text-neutral8 rounded-2xl hover:bg-neutral8 dark:hover:bg-neutral3 hover:shadow-card cursor-pointer transition-all duration-300">
                     <div className="flex flex-row md:flex-col space-x-4 md:space-x-0 items-center">
                        <div className="text-2xl font-semibold text-center">Market null</div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
};
