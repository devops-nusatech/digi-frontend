import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav } from 'components';
import {
   illusDiscover,
   illusReleases,
   illusReleases2,
   illusReleases21,
   illusReleases22,
   illusReleases31,
   illusReleases32,
} from 'assets';

export const LearnCrypto = memo(() => {
   const [learnCategory, setLearnCategory] = useState<number>(0);

   return (
      <>
         <div className="relative mb-16 pt-16 md:mb-28 md:pt-20 lg2:mb-34">
            <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg:px-20">
               <div className="mx-auto mb-20 max-w-2.5xl text-center">
                  <div className="mb-4 font-dm text-5xl font-bold leading-custom1 tracking-custom md:text-64 md:leading-none">
                     Blockchain & Crypto
                  </div>
                  <div className="mb-8 text-base leading-custom2 tracking-custom1 text-neutral4 md:text-2xl">
                     A Beginner’s Guide to TradingView
                  </div>
                  <div className="flex justify-center space-x-4">
                     <Button
                        text="Learn now"
                        width="noFull"
                     />
                     <Button
                        text="Video tutorial"
                        variant="outline"
                        width="noFull"
                     />
                  </div>
               </div>
               <div className="relative overflow-hidden rounded-2xl">
                  <img
                     className="w-full"
                     src={illusDiscover}
                     alt="Video"
                  />
                  <button className="group absolute left-1/2 top-1/2 z-3 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neutral8 shadow-play">
                     <svg className="h-6 w-6 fill-neutral4 transition-all duration-300 group-hover:scale-125 group-hover:fill-primary1">
                        <use xlinkHref="#icon-play" />
                     </svg>
                  </button>
               </div>
            </div>
         </div>
         <div className="relative bg-neutral7 py-16 dark:bg-shade1 md:py-28 lg2:py-34">
            <div
               id="releases"
               className="absolute inset-x-0 top-12"
            />
            <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg:px-20">
               <div className="mb-12 block lg:mb-20 lg:flex">
                  <div className="mb-5 w-full text-xs font-bold uppercase leading-none text-neutral4 lg:mb-4 lg:w-82">
                     Our Blog
                  </div>
                  <div className="ml-auto w-full shrink-0 lg:w-500 lg2:w-640">
                     <div className="mb-5 font-dm text-4.5xl leading-1.2 tracking-custom1 md:text-5xl md:leading-custom1 md:tracking-custom">
                        Latest Releases
                     </div>
                     <div className="mb-16 max-w-md-2 text-base leading-normal text-neutral3 dark:text-neutral6">
                        Stacks is a production-ready library of stackable
                        content blocks built in React Native.
                     </div>
                     <div className="flex space-x-3">
                        <Nav
                           title="Bitcoin"
                           isActive={learnCategory === 0}
                           onClick={() => setLearnCategory(0)}
                        />
                        <Nav
                           title="Blockchain"
                           isActive={learnCategory === 1}
                           onClick={() => setLearnCategory(1)}
                        />
                        <Nav
                           title="Tutorials"
                           isActive={learnCategory === 2}
                           onClick={() => setLearnCategory(2)}
                        />
                     </div>
                     {/* Let's code nice select mobile */}
                  </div>
               </div>
               <div className="space-y-20">
                  {learnCategory === 0 && (
                     <>
                        <Link
                           to="/learn-crypto"
                           className="group relative block flex-row-reverse transition-colors duration-200 lg:flex">
                           <div className="mb-8 ml-auto w-full shrink-0 lg:mb-0 lg:w-500 lg2:w-640">
                              <img
                                 className="min-h-[240px] w-full rounded-2xl object-cover lg:min-h-auto lg:object-none"
                                 srcSet={`${illusReleases2} 2x`}
                                 src={illusReleases}
                                 alt=""
                              />
                           </div>
                           <div className="flex w-auto flex-col items-start pr-0 lg:pr-32 lg2:w-82 lg2:pr-0">
                              <div className="mb-auto inline-block rounded bg-primary4 px-2 pb-1.5 pt-2 text-xs font-bold uppercase leading-none text-neutral8">
                                 New
                              </div>
                              <div className="mb-2 mt-4 font-dm text-3.5xl leading-tight tracking-custom1 transition-all duration-300 group-hover:text-primary1 lg:mt-6">
                                 A Beginner's Guide to TradingView
                              </div>
                              <div className="mb-5 text-base leading-normal text-neutral3 dark:text-neutral5">
                                 Ethereum
                              </div>
                              <div className="mb-auto text-neutral4">
                                 A fully-featured landing page kit, including
                                 design files, and beautiful 3D illustrations
                                 editable.
                              </div>
                           </div>
                           <div className="static left-0 top-[calc(100%+14px)] mt-4 h-6 w-6 transition-transform duration-300 lg:absolute lg:mt-0">
                              <svg className="h-3.5 w-3.5 fill-neutral4 transition-all duration-1000 group-hover:translate-x-4">
                                 <use xlinkHref="#icon-arrow-next" />
                              </svg>
                           </div>
                        </Link>
                        <Link
                           to="/learn-crypto"
                           className="group relative block flex-row-reverse transition-colors duration-200 lg:flex">
                           <div className="mb-8 ml-auto w-full shrink-0 lg:mb-0 lg:w-500 lg2:w-640">
                              <img
                                 className="min-h-[240px] w-full rounded-2xl object-cover lg:min-h-auto lg:object-none"
                                 srcSet={`${illusReleases22} 2x`}
                                 src={illusReleases21}
                                 alt=""
                              />
                           </div>
                           <div className="flex w-auto flex-col items-start pr-0 lg:pr-32 lg2:w-82 lg2:pr-0">
                              <div className="mb-auto inline-block rounded bg-primary5 px-2 pb-1.5 pt-2 text-xs font-bold uppercase leading-none text-neutral8">
                                 Beginner
                              </div>
                              <div className="mb-2 mt-4 font-dm text-3.5xl leading-tight tracking-custom1 transition-all duration-300 group-hover:text-primary1 lg:mt-6">
                                 What Is Crypto Market Sentiment?
                              </div>
                              <div className="mb-5 text-base leading-normal text-neutral3 dark:text-neutral5">
                                 Ethereum
                              </div>
                              <div className="mb-auto text-neutral4">
                                 A fully-featured landing page kit, including
                                 design files, and beautiful 3D illustrations
                                 editable.
                              </div>
                           </div>
                           <div className="static left-0 top-[calc(100%+14px)] mt-4 h-6 w-6 transition-transform duration-300 lg:absolute lg:mt-0">
                              <svg className="h-3.5 w-3.5 fill-neutral4 transition-all duration-1000 group-hover:translate-x-4">
                                 <use xlinkHref="#icon-arrow-next" />
                              </svg>
                           </div>
                        </Link>
                        <Link
                           to="/learn-crypto"
                           className="group relative block flex-row-reverse transition-colors duration-200 lg:flex">
                           <div className="mb-8 ml-auto w-full shrink-0 lg:mb-0 lg:w-500 lg2:w-640">
                              <img
                                 className="min-h-[240px] w-full rounded-2xl object-cover lg:min-h-auto lg:object-none"
                                 srcSet={`${illusReleases32} 2x`}
                                 src={illusReleases31}
                                 alt=""
                              />
                           </div>
                           <div className="flex w-auto flex-col items-start pr-0 lg:pr-32 lg2:w-82 lg2:pr-0">
                              <div className="mb-auto inline-block rounded bg-primary4 px-2 pb-1.5 pt-2 text-xs font-bold uppercase leading-none text-neutral8">
                                 New
                              </div>
                              <div className="mb-2 mt-4 font-dm text-3.5xl leading-tight tracking-custom1 transition-all duration-300 group-hover:text-primary1 lg:mt-6">
                                 What Is the Ethereum Hard Fork?
                              </div>
                              <div className="mb-5 text-base leading-normal text-neutral3 dark:text-neutral5">
                                 Ethereum
                              </div>
                              <div className="mb-auto text-neutral4">
                                 A fully-featured landing page kit, including
                                 design files, and beautiful 3D illustrations
                                 editable.
                              </div>
                           </div>
                           <div className="static left-0 top-[calc(100%+14px)] mt-4 h-6 w-6 transition-transform duration-300 lg:absolute lg:mt-0">
                              <svg className="h-3.5 w-3.5 fill-neutral4 transition-all duration-1000 group-hover:translate-x-4">
                                 <use xlinkHref="#icon-arrow-next" />
                              </svg>
                           </div>
                        </Link>
                     </>
                  )}
               </div>
            </div>
         </div>
      </>
   );
});
