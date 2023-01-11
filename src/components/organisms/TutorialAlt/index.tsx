import React from 'react';
import { Button } from 'components';
import {
   illusStep21,
   illusStep22,
   illusStep31,
   illusStep32
} from 'assets'

export const TutorialAlt = () => (
   <div className="flex flex-nowrap md:flex-wrap mt-0 md:-mt-8 -mx-8 md:-mx-4 overflow-auto">
      <div className="flex flex-col lg:flex-row lg:space-x-8 shrink-0 grow-0 basis-54.5 md:basis-c-1/2-8 w-54.5 md:w-c-1/2-8 mt-0 md:mt-8 mx-0 md:mx-4">
         <div className="flex justify-center items-center shrink-0 mb-6 lg:mb-0 w-full lg:w-32 h-36 p-3 rounded-2xl bg-secondary2">
            <img className="max-w-full" srcSet={`${illusStep32} 2x`} src={illusStep31} alt="Post" />
         </div>
         <div className="flex flex-col items-start grow">
            <div className="mb-2 text-base md:text-2xl font-semibold leading-custom2 tracking-custom1">
               Bank deposit
            </div>
            <div className="mb-4 text-neutral4">
               Deposit crypto or cash currency to your wallet and start trading on the world largest exchange!
            </div>
            <Button
               text="Bank deposit"
               variant="outline"
               size="normal"
               className="mt-auto"
               width="noFull"
            />
         </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-8 shrink-0 grow-0 basis-54.5 md:basis-c-1/2-8 w-54.5 md:w-c-1/2-8 mt-0 md:mt-8 mx-0 md:mx-4">
         <div className="flex justify-center items-center shrink-0 mb-6 lg:mb-0 w-full lg:w-32 h-36 p-3 rounded-2xl bg-secondary4">
            <img className="max-w-full" srcSet={`${illusStep22} 2x`} src={illusStep21} alt="Post" />
         </div>
         <div className="flex flex-col items-start grow">
            <div className="mb-2 text-base md:text-2xl font-semibold leading-custom2 tracking-custom1">
               Transfer
            </div>
            <div className="mb-4 text-neutral4">
               Internal transfers are free on Digiasset.
            </div>
            <Button
               text="Transfer coin"
               variant="outline"
               size="normal"
               className="mt-auto"
               width="noFull"
            />
         </div>
      </div>
   </div>
)
