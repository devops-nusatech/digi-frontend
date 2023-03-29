import React from 'react';
import {
   illusStep11,
   illusStep12,
   illusStep21,
   illusStep22,
   illusStep31,
   illusStep32,
   illusStep41,
   illusStep42,
} from 'assets';
import {
   Container,
   Grid,
   Heading2,
   Section,
   TextBase,
   TextXs,
} from 'components';

export const Step = () => (
   <Section>
      <Container>
         <div className="mx-auto mt-0 mb-12 max-w-sm text-center md:mb-16 lg:mb-20">
            <Heading2
               text="How it works"
               className="mb-5"
            />
            <div className="text-neutral3 dark:text-neutral6">
               Trade quickly and easily with our user-friendly platform.
            </div>
         </div>
         <Grid className="grid-cols-4 gap-8">
            <div className="step-line-after relative col-span-4 cursor-pointer text-center transition-all duration-500 md:col-span-1">
               <div className="step-dot-before relative mx-auto mt-0 mb-20 flex h-24 w-24 items-center justify-center after:absolute after:top-1/2 after:-right-6 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-neutral5 after:content-['']">
                  <img
                     className="w-full"
                     srcSet={`${illusStep12} 2x`}
                     src={illusStep11}
                     alt="Step 1"
                  />
               </div>
               <TextXs
                  text="Step 1"
                  font="semibold"
                  className="mb-8"
               />
               <TextBase
                  text="Register"
                  className="mb-4"
               />
               <div className="text-neutral3 dark:text-neutral6">
                  Verify your identity now for a safe and secure trading
                  experience on our platform.
               </div>
            </div>
            <div className="step-line-after relative col-span-4 cursor-pointer text-center transition-all duration-500 md:col-span-1">
               <div className="step-dot-before relative mx-auto mt-0 mb-20 flex h-24 w-24 items-center justify-center after:absolute after:top-1/2 after:-right-6 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-neutral5 after:content-['']">
                  <img
                     className="w-full"
                     srcSet={`${illusStep22} 2x`}
                     src={illusStep21}
                     alt="Step 1"
                  />
               </div>
               <TextXs
                  text="Step 2"
                  font="semibold"
                  className="mb-8"
               />
               <TextBase
                  text="Deposit wallet"
                  className="mb-4"
               />
               <div className="text-neutral3 dark:text-neutral6">
                  Enjoy a deposit process that is easy, fast and certainly safe
                  guaranteed by our system
               </div>
            </div>
            <div className="step-line-after relative col-span-4 cursor-pointer text-center transition-all duration-500 md:col-span-1">
               <div className="step-dot-before relative mx-auto mt-0 mb-20 flex h-24 w-24 items-center justify-center after:absolute after:top-1/2 after:-right-6 after:h-3 after:w-3 after:-translate-y-1/2 after:rounded-full after:border-2 after:border-neutral5 after:content-['']">
                  <img
                     className="w-full"
                     srcSet={`${illusStep32} 2x`}
                     src={illusStep31}
                     alt="Step 1"
                  />
               </div>
               <TextXs
                  text="Step 3"
                  font="semibold"
                  className="mb-8"
               />
               <TextBase
                  text="Buy Cryptocurrency"
                  className="mb-4"
               />
               <div className="text-neutral3 dark:text-neutral6">
                  Buy your first cryptocurrency with a variety of payment
                  methods including credit card, bank transfer, and more!
               </div>
            </div>
            <div className="step-line-after relative col-span-4 cursor-pointer text-center transition-all duration-500 md:col-span-1">
               <div className="step-dot-before relative mx-auto mt-0 mb-20 flex h-24 w-24 items-center justify-center">
                  <img
                     className="w-full"
                     srcSet={`${illusStep42} 2x`}
                     src={illusStep41}
                     alt="Step 1"
                  />
               </div>
               <TextXs
                  text="Step 4"
                  font="semibold"
                  className="mb-8"
               />
               <TextBase
                  text="Grow Your Cryptocurrency Portfolio"
                  className="mb-4"
               />
               <div className="text-neutral3 dark:text-neutral6">
                  Earn high returns on your investment by trading in the most
                  profitable cryptocurrencies on the spot with low fees.
               </div>
            </div>
         </Grid>
      </Container>
   </Section>
);
