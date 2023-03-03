import React from 'react'
import { icApple, icGp, illusDownloadApp11, illusDownloadApp12 } from 'assets';

export const Download = () => (
   <section className="flex items-center md:min-h-908 py-16 lg:py-28 lg2:py-34">
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
         <div className="grid grid-cols-2">
            <div className="col-span-2 md:col-span-1 select-none">
               <div className="whitespace-normal text-4.5xl md:text-5xl font-dm font-bold tracking-custom leading-custom1">
                  Trade anywhere
               </div>
               <div className="mt-4 mb-16 text-base text-neutral4">
                  Anytime, anywhere. Trade crypto on your terms.
               </div>
               <div className="flex flex-col lg:max-w-sm">
                  <div className="relative flex space-x-6 items-center mb-4 md:mb-8 pb-4 md:pb-8 border-b border-neutral6 dark:border-neutral3 cursor-pointer group">
                     <div className="relative flex justify-center items-center shrink-0 h-14 w-14 rounded-full bg-neutral2 download__icon group-hover:after:visible group-hover:after:opacity-100">
                        <img className="max-w-[1.5rem]" src={icApple} alt="Logo" />
                     </div>
                     <div className="grow">
                        <div className="text-neutral4">Download from</div>
                        <div className="text-2xl leading-custom2 tracking-custom1">Appstore</div>
                     </div>
                     <a
                        href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0"
                        title="Download app"
                     />
                  </div>
                  <div className="relative flex space-x-6 items-center mb-4 md:mb-8 pb-4 md:pb-8 border-b border-neutral6 dark:border-neutral3 cursor-pointer group">
                     <div className="relative flex justify-center items-center shrink-0 h-14 w-14 rounded-full bg-neutral2 download__icon group-hover:after:visible group-hover:after:opacity-100">
                        <img className="max-w-[1.5rem]" src={icGp} alt="Google Play" />
                     </div>
                     <div className="grow">
                        <div className="text-neutral4">Download from</div>
                        <div className="text-2xl leading-custom2 tracking-custom1">Google play</div>
                     </div>
                     <a
                        href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0"
                        title="Download app"
                     />
                  </div>
                  <div className="relative flex space-x-6 items-center cursor-pointer group">
                     <div className="relative flex justify-center items-center shrink-0 h-14 w-14 rounded-full bg-neutral2 download__icon group-hover:after:visible group-hover:after:opacity-100">
                        <img className="max-w-[1.5rem]" src={icApple} alt="Logo" />
                     </div>
                     <div className="grow">
                        <div className="text-neutral4">Download from</div>
                        <div className="text-2xl leading-custom2 tracking-custom1">Mac OS</div>
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
               <div
                  className="absolute lg:-top-56 -right-6 pointer-events-none"
               >
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
