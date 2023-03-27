import React from 'react';
import {
   illusStep11,
   illusStep12,
   illusStep21,
   illusStep22,
   illusStep31,
   illusStep32,
   // illusStep41,
   // illusStep42
} from 'assets';

export const Step = () => {
   return (
      <section className="relative mb-16 lg:mb-28 lg2:mb-34">
         <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20">
            <div className="mx-auto mt-0 mb-12 max-w-sm text-center md:mb-16 lg:mb-20">
               <div className="mb-5 font-dm text-5xl font-bold leading-custom1 tracking-custom">
                  Start your crypto journey now
               </div>
               <div className="text-neutral3 dark:text-neutral6">
                  Trade quickly and easily with our user-friendly platform.
               </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
               <div className="step-dot-after relative col-span-3 cursor-pointer text-center transition-all duration-500 md:col-span-1">
                  <div className="relative mx-auto mt-0 mb-20 flex h-24 w-24 items-center justify-center after:absolute after:top-1/2 after:-right-6 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-neutral5 after:content-['']">
                     <img
                        className="w-full"
                        srcSet={`${illusStep12} 2x`}
                        src={illusStep11}
                        alt="Step 1"
                     />
                  </div>
                  <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                     Step 1
                  </div>
                  <div className="mb-4 text-base font-medium">Register</div>
                  <div className="text-neutral3 dark:text-neutral6">
                     Verify your identity now for a safe and secure trading
                     experience on our platform.
                  </div>
               </div>
               <div className="step-dot-after relative col-span-3 cursor-pointer text-center transition-all duration-500 md:col-span-1">
                  <div className="step-dot-before relative mx-auto mt-0 mb-20 flex h-24 w-24 items-center justify-center after:absolute after:top-1/2 after:-right-6 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-neutral5 after:content-['']">
                     <img
                        className="w-full"
                        srcSet={`${illusStep22} 2x`}
                        src={illusStep21}
                        alt="Step 1"
                     />
                  </div>
                  <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                     Step 2
                  </div>
                  <div className="mb-4 text-base font-medium">
                     Buy Cryptocurrency
                  </div>
                  <div className="text-neutral3 dark:text-neutral6">
                     Buy your first cryptocurrency with a variety of payment
                     methods including credit card, bank transfer, and more!
                  </div>
               </div>
               <div className="relative col-span-3 cursor-pointer text-center transition-all duration-500 md:col-span-1">
                  <div className="step-dot-before relative mx-auto mt-0 mb-20 flex h-24 w-24 items-center justify-center">
                     <img
                        className="w-full"
                        srcSet={`${illusStep32} 2x`}
                        src={illusStep31}
                        alt="Step 1"
                     />
                  </div>
                  <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                     Step 3
                  </div>
                  <div className="mb-4 text-base font-medium">
                     Grow Your Cryptocurrency Portfolio
                  </div>
                  <div className="text-neutral3 dark:text-neutral6">
                     Earn high returns on your investment by trading in the most
                     profitable cryptocurrencies on the spot with low fees.
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};
