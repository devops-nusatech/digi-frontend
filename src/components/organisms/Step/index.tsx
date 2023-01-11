import React from 'react';
import {
   illusStep11,
   illusStep12,
   illusStep21,
   illusStep22,
   illusStep31,
   illusStep32,
   illusStep41,
   illusStep42
} from 'assets';

export const Step = () => {
   return (
      <section className="relative mb-16 lg:mb-28 lg2:mb-34">
         <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="max-w-sm mt-0 mb-12 md:mb-16 lg:mb-20 mx-auto text-center">
               <div className="mb-5 text-5xl font-dm font-bold leading-custom1 tracking-custom">
                  How it works
               </div>
               <div className="text-neutral3 dark:text-neutral6">
                  Stacks is a production-ready library of stackable content blocks built in React Native.
               </div>
            </div>
            <div className="grid grid-cols-4 gap-8">
               <div className="relative col-span-4 md:col-span-1 transition-all duration-500 cursor-pointer text-center step-dot-after">
                  <div className="relative flex justify-center items-center w-24 h-24 mt-0 mx-auto mb-20 after:absolute after:content-[''] after:top-1/2 after:-right-6 after:w-3 after:h-3 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-neutral5">
                     <img className="w-full" srcSet={`${illusStep12} 2x`} src={illusStep11} alt="Step 1" />
                  </div>
                  <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                     Step 1
                  </div>
                  <div className="mb-4 text-base font-medium">
                     Download
                  </div>
                  <div className="text-neutral3 dark:text-neutral6">
                     Stacks is a production-ready library of stackable content blocks built in React Native.
                  </div>
               </div>
               <div className="relative col-span-4 md:col-span-1 transition-all duration-500 cursor-pointer text-center step-dot-after">
                  <div className="relative flex justify-center items-center w-24 h-24 mt-0 mx-auto mb-20 step-dot-before after:absolute after:content-[''] after:top-1/2 after:-right-6 after:w-3 after:h-3 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-neutral5">
                     <img className="w-full" srcSet={`${illusStep22} 2x`} src={illusStep21} alt="Step 1" />
                  </div>
                  <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                     Step 2
                  </div>
                  <div className="mb-4 text-base font-medium">
                     Connect wallet
                  </div>
                  <div className="text-neutral3 dark:text-neutral6">
                     Stacks is a production-ready library of stackable content blocks built in React Native.
                  </div>
               </div>
               <div className="relative col-span-4 md:col-span-1 transition-all duration-500 cursor-pointer text-center step-dot-after">
                  <div className="relative flex justify-center items-center w-24 h-24 mt-0 mx-auto mb-20 step-dot-before after:absolute after:content-[''] after:top-1/2 after:-right-6 after:w-3 after:h-3 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-neutral5">
                     <img className="w-full" srcSet={`${illusStep32} 2x`} src={illusStep31} alt="Step 1" />
                  </div>
                  <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                     Step 3
                  </div>
                  <div className="mb-4 text-base font-medium">
                     Start trading
                  </div>
                  <div className="text-neutral3 dark:text-neutral6">
                     Stacks is a production-ready library of stackable content blocks built in React Native.
                  </div>
               </div>
               <div className="relative col-span-4 md:col-span-1 transition-all duration-500 cursor-pointer text-center">
                  <div className="relative flex justify-center items-center w-24 h-24 mt-0 mx-auto mb-20 step-dot-before">
                     <img className="w-full" srcSet={`${illusStep42} 2x`} src={illusStep41} alt="Step 1" />
                  </div>
                  <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                     Step 4
                  </div>
                  <div className="mb-4 text-base font-medium">
                     Earn money
                  </div>
                  <div className="text-neutral3 dark:text-neutral6">
                     Stacks is a production-ready library of stackable content blocks built in React Native.
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};
