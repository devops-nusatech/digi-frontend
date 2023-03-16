import React from 'react';
import { icApple, icGp, illusDownloadApp11, illusDownloadApp12 } from 'assets';

export const Download = () => (
   <section className="flex items-center py-16 md:min-h-908 lg:py-28 lg2:py-34">
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20">
         <div className="grid grid-cols-2">
            <div className="col-span-2 select-none md:col-span-1">
               <div className="whitespace-normal font-dm text-4.5xl font-bold leading-custom1 tracking-custom md:text-5xl">
                  Trade anywhere
               </div>
               <div className="mt-4 mb-16 text-base text-neutral4">
                  Anytime, anywhere. Trade crypto on your terms.
               </div>
               <div className="flex flex-col lg:max-w-sm">
                  <div className="group relative mb-4 flex cursor-pointer items-center space-x-6 border-b border-neutral6 pb-4 dark:border-neutral3 md:mb-8 md:pb-8">
                     <div className="download__icon relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral2 group-hover:after:visible group-hover:after:opacity-100">
                        <img
                           className="max-w-[1.5rem]"
                           src={icApple}
                           alt="Logo"
                        />
                     </div>
                     <div className="grow">
                        <div className="text-neutral4">Download from</div>
                        <div className="text-2xl leading-custom2 tracking-custom1">
                           Appstore
                        </div>
                     </div>
                     <a
                        href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0"
                        title="Download app"
                     />
                  </div>
                  <div className="group relative mb-4 flex cursor-pointer items-center space-x-6 border-b border-neutral6 pb-4 dark:border-neutral3 md:mb-8 md:pb-8">
                     <div className="download__icon relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral2 group-hover:after:visible group-hover:after:opacity-100">
                        <img
                           className="max-w-[1.5rem]"
                           src={icGp}
                           alt="Google Play"
                        />
                     </div>
                     <div className="grow">
                        <div className="text-neutral4">Download from</div>
                        <div className="text-2xl leading-custom2 tracking-custom1">
                           Google play
                        </div>
                     </div>
                     <a
                        href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0"
                        title="Download app"
                     />
                  </div>
                  <div className="group relative flex cursor-pointer items-center space-x-6">
                     <div className="download__icon relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral2 group-hover:after:visible group-hover:after:opacity-100">
                        <img
                           className="max-w-[1.5rem]"
                           src={icApple}
                           alt="Logo"
                        />
                     </div>
                     <div className="grow">
                        <div className="text-neutral4">Download from</div>
                        <div className="text-2xl leading-custom2 tracking-custom1">
                           Mac OS
                        </div>
                     </div>
                     <a
                        href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0"
                        title="Download app"
                     />
                  </div>
               </div>
            </div>
            <div className="col-span-2 md:col-span-1">
               <div className="pointer-events-none absolute -right-6 lg:-top-56">
                  <img
                     className="hidden md:block md:w-[500px] lg:w-[700px] xl:w-auto"
                     srcSet={`${illusDownloadApp12} 2x`}
                     src={illusDownloadApp11}
                     alt="Hero"
                  />
               </div>
            </div>
         </div>
      </div>
   </section>
);
