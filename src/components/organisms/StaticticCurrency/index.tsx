import React from 'react';
import { Image, Skeleton } from 'components';
import { useMarket } from 'hooks';
import { renderCurrencyIcon } from 'helpers';

export const StaticticCurrency = () => {
   const { markets, handleRedirectToTrading, isLoading } = useMarket();
   return (
      <div className="mt-4 grid grid-cols-4 rounded-3xl bg-neutral7 p-6 dark:bg-neutral2 md:mt-20 md:gap-x-8 lg2:mt-[143px]">
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
         ) : markets?.length ? (
            markets?.slice(0, 4)?.map(market => (
               <div
                  key={market.id}
                  onClick={() => handleRedirectToTrading(market.id)}
                  className="col-span-4 cursor-pointer rounded-2xl px-6 py-4 transition-all duration-300 hover:bg-neutral8 hover:shadow-card dark:text-neutral8 dark:hover:bg-neutral3 sm:col-span-2 md:p-8 lg:col-span-1">
                  <div className="flex flex-row items-start space-x-4 md:flex-col md:space-x-0">
                     <Image
                        classNameParent="w-10 shrink-0"
                        src={renderCurrencyIcon(market.base_unit)}
                        alt={market.name}
                        title={market.name}
                        className="w-full"
                        width={40}
                        height={40}
                     />
                     <div className="md:mt-4">
                        <div className="mb-1 flex items-center space-x-3 text-xs font-semibold">
                           <div className="text-neutral4">{market.name}</div>
                           <div
                              className={`${
                                 market.price_change_percent?.includes('-')
                                    ? 'bg-primary4'
                                    : 'bg-chart1'
                              } inline-block rounded-3xl px-2 py-[2px] text-neutral8`}>
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
   );
};
