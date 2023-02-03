import React from 'react'
import {
   Image,
   Skeleton,
} from 'components'
import { useMarket } from 'hooks';
import { renderCurrencyIcon } from 'helpers';

export const StaticticCurrency = () => {
   const { marketsData, handleRedirectToTrading, isLoading } = useMarket();
   return (
      <div className="grid grid-cols-4 md:gap-x-8 p-6 mt-4 md:mt-20 lg2:mt-[143px] rounded-3xl bg-neutral7 dark:bg-neutral2">
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
                     src={String(renderCurrencyIcon(market.base_unit))}
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
   )
}
