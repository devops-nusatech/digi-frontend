import React from 'react';
import { Button } from 'components';
import { illusStep21, illusStep22, illusStep31, illusStep32 } from 'assets';
import { openInNewTab } from 'helpers';

export const TutorialAlt = () => (
   <div className="-mx-8 mt-0 flex flex-nowrap overflow-auto md:-mx-4 md:-mt-8 md:flex-wrap">
      <div className="mx-0 mt-0 flex w-54.5 shrink-0 grow-0 basis-54.5 flex-col md:mx-4 md:mt-8 md:w-c-1/2-8 md:basis-c-1/2-8 lg:flex-row lg:space-x-8">
         <div className="mb-6 flex h-36 w-full shrink-0 items-center justify-center rounded-2xl bg-secondary2 p-3 lg:mb-0 lg:w-32">
            <img
               className="max-w-full"
               srcSet={`${illusStep32} 2x`}
               src={illusStep31}
               alt="Post"
            />
         </div>
         <div className="flex grow flex-col items-start">
            <div className="mb-2 text-base font-semibold leading-custom2 tracking-custom1 md:text-2xl">
               Withdraw
            </div>
            <div className="mb-4 text-neutral4">
               The steps to withdraw crypto from Digiasset to your other wallet
            </div>
            <Button
               text="View tutorial"
               variant="outline"
               size="normal"
               className="mt-auto"
               width="noFull"
               onClick={() =>
                  openInNewTab(
                     'https://www.digiassetindo.com/blog/how-to-withdraw-your-crypto-to-another-wallet'
                  )
               }
            />
         </div>
      </div>
      <div className="mx-0 mt-0 flex w-54.5 shrink-0 grow-0 basis-54.5 flex-col md:mx-4 md:mt-8 md:w-c-1/2-8 md:basis-c-1/2-8 lg:flex-row lg:space-x-8">
         <div className="mb-6 flex h-36 w-full shrink-0 items-center justify-center rounded-2xl bg-secondary4 p-3 lg:mb-0 lg:w-32">
            <img
               className="max-w-full"
               srcSet={`${illusStep22} 2x`}
               src={illusStep21}
               alt="Post"
            />
         </div>
         <div className="flex grow flex-col items-start">
            <div className="mb-2 text-base font-semibold leading-custom2 tracking-custom1 md:text-2xl">
               Deposit
            </div>
            <div className="mb-4 text-neutral4">
               Deposit crypto or cash currency to your wallet and start trading
               on the world largest exchange!
            </div>
            <Button
               text="View tutorial"
               variant="outline"
               size="normal"
               className="mt-auto"
               width="noFull"
               onClick={() =>
                  openInNewTab(
                     'https://www.digiassetindo.com/blog/how-to-deposit-cryptocurrency-to-your-digiasset-wallet'
                  )
               }
            />
         </div>
      </div>
   </div>
);
