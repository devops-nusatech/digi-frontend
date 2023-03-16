import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { illusCard, illusCard2 } from 'assets';
import { useMarket } from 'hooks';
import { Button, Skeleton, Image } from 'components';
import { renderCurrencyIcon } from 'helpers';

export const Hero: FC = (props: any) => {
   const history = useHistory();
   const { marketsData, handleRedirectToTrading, isLoading } = useMarket();

   const handleScroll = (e: any, id: string) => {
      e.preventDefault();
      let hero = document.getElementById(id);
      hero &&
         hero.scrollIntoView({
            behavior: 'smooth',
         });
   };

   return (
      <section className="mb-34 overflow-hidden pt-8 lg:pt-20 lg2:pt-40">
         <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20">
            <div className="mb-4 grid grid-cols-2 md:mb-20 lg2:mb-[143px]">
               <div className="col-span-2 select-none md:col-span-1">
                  <div className="mb-5 font-dm text-5xl font-bold tracking-custom md:text-64">
                     <span className="transition-all duration-300 hover:bg-gradient-to-tr hover:from-primary1 hover:to-primary5 hover:bg-clip-text hover:text-transparent">
                        Buy & sell
                     </span>
                     <br />
                     crypto in minutes
                  </div>
                  <div className="mb-8 w-2/3 text-base font-normal text-neutral4 sm:w-3/4 md:w-full">
                     Trade Bitcoin, Ethereum, USDT, and the top altcoins on the
                     legendary crypto asset exchange.
                  </div>
                  <div className="flex flex-row items-start justify-between md:flex-col">
                     <Button
                        text="Get started now"
                        className="mb-20"
                        width="noFull"
                        onClick={() => history.push('/markets')}
                     />
                     <a
                        href="#learn"
                        onClick={e => handleScroll(e, 'learn')}
                        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-solid border-neutral6 bg-none transition-colors duration-300 hover:border-neutral2 dark:border-neutral4 dark:hover:border-neutral6">
                        <div className="group flex -translate-y-[27px] animate-down flex-col space-y-8">
                           <svg className="h-6 w-6 fill-neutral4 transition-all duration-300 group-hover:fill-neutral2 dark:fill-neutral6 dark:group-hover:fill-neutral6">
                              <use xlinkHref="#icon-arrow-bottom" />
                           </svg>
                           <svg className="h-6 w-6 fill-neutral4 transition-all duration-300 group-hover:fill-neutral2 dark:fill-neutral6 dark:group-hover:fill-neutral6">
                              <use xlinkHref="#icon-arrow-bottom" />
                           </svg>
                        </div>
                     </a>
                  </div>
               </div>
               <div className="col-span-2 md:col-span-1">
                  <div className="pointer-events-none absolute -top-40 -right-28 lg2:-top-76">
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
            <div className="grid grid-cols-4 rounded-3xl bg-neutral7 p-6 dark:bg-neutral2 md:mt-8 md:gap-x-8">
               {isLoading ? (
                  <>
                     <Skeleton
                        className="col-span-4 sm:col-span-2 lg:col-span-1"
                        height={196}
                        width={244}
                        rounded="2xl"
                     />
                     <Skeleton
                        className="col-span-4 sm:col-span-2 lg:col-span-1"
                        height={196}
                        width={244}
                        rounded="2xl"
                     />
                     <Skeleton
                        className="col-span-4 sm:col-span-2 lg:col-span-1"
                        height={196}
                        width={244}
                        rounded="2xl"
                     />
                     <Skeleton
                        className="col-span-4 sm:col-span-2 lg:col-span-1"
                        height={196}
                        width={244}
                        rounded="2xl"
                     />
                  </>
               ) : marketsData?.length ? (
                  marketsData?.slice(0, 4)?.map(market => (
                     <div
                        key={market.id}
                        onClick={() => handleRedirectToTrading(market.id)}
                        className="col-span-4 cursor-pointer rounded-2xl px-6 py-4 transition-all duration-300 hover:bg-neutral8 hover:shadow-card dark:text-neutral8 dark:hover:bg-neutral3 sm:col-span-2 md:p-8 lg:col-span-1">
                        <div className="flex flex-row items-start space-x-4 md:flex-col md:space-x-0">
                           <Image
                              src={String(renderCurrencyIcon(market.base_unit))}
                              alt={market.name}
                              title={market.name}
                              width={40}
                              height={40}
                           />
                           <div className="md:mt-4">
                              <div className="mb-1 flex items-center space-x-3 text-xs font-semibold">
                                 <div className="text-neutral4">
                                    {market.name}
                                 </div>
                                 <div
                                    className={`${
                                       market.price_change_percent?.includes(
                                          '-'
                                       )
                                          ? 'bg-primary4'
                                          : 'bg-chart1'
                                    } inline-block rounded-3xl py-[2px] px-2 text-neutral8`}>
                                    {market.price_change_percent}
                                 </div>
                              </div>
                              <div className="my-1 text-2xl font-semibold">
                                 {market.last}
                              </div>
                              <div className="text-xs font-normal">
                                 {market.volume}
                              </div>
                           </div>
                        </div>
                     </div>
                  ))
               ) : (
                  <div className="col-span-4 cursor-pointer rounded-2xl px-6 py-4 transition-all duration-300 hover:bg-neutral8 hover:shadow-card dark:text-neutral8 dark:hover:bg-neutral3 md:p-8">
                     <div className="flex flex-row items-center space-x-4 md:flex-col md:space-x-0">
                        <div className="text-center text-2xl font-semibold">
                           Market null
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
};
