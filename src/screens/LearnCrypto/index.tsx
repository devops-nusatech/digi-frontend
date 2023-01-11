import React, { memo, useState } from 'react'
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
         <div className="relative pt-16 md:pt-20 mb-16 md:mb-28 lg2:mb-34">
            <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
               <div className="max-w-2.5xl mx-auto mb-20 text-center">
                  <div className="mb-4 text-5xl md:text-64 leading-custom1 md:leading-none tracking-custom font-dm font-bold">
                     Blockchain & Crypto
                  </div>
                  <div className="mb-8 text-base md:text-2xl tracking-custom1 leading-custom2 text-neutral4">
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
               <div className="relative rounded-2xl overflow-hidden">
                  <img className="w-full" src={illusDiscover} alt="Video" />
                  <button className="group flex justify-center items-center w-20 h-20 absolute top-1/2 left-1/2 z-3 rounded-full bg-neutral8 shadow-play -translate-x-1/2 -translate-y-1/2">
                     <svg className="w-6 h-6 fill-neutral4 group-hover:fill-primary1 group-hover:scale-125 transition-all duration-300">
                        <use xlinkHref="#icon-play" />
                     </svg>
                  </button>
               </div>
            </div>
         </div>
         <div className="relative py-16 md:py-28 lg2:py-34 bg-neutral7">
            <div id="releases" className="absolute top-12 inset-x-0" />
            <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
               <div className="block lg:flex mb-12 lg:mb-20">
                  <div className="w-full lg:w-82 text-xs leading-none mb-5 lg:mb-4 font-bold uppercase text-neutral4">
                     Our Blog
                  </div>
                  <div className="shrink-0 w-full lg:w-500 lg2:w-640 ml-auto">
                     <div className="mb-5 text-4.5xl md:text-5xl leading-1.2 md:leading-custom1 tracking-custom1 md:tracking-custom font-dm font-bold">
                        Latest Releases
                     </div>
                     <div className="max-w-md-2 mb-16 text-base leading-normal text-neutral3 dark:text-neutral6">
                        Stacks is a production-ready library of stackable content blocks built in React Native.
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
                  {
                     learnCategory === 0 && (
                        <>
                           <Link to="/learn-crypto" className="relative group block lg:flex flex-row-reverse transition-colors duration-200">
                              <div className="shrink-0 w-full lg:w-500 lg2:w-640 mb-8 lg:mb-0 ml-auto">
                                 <img className="w-full object-cover lg:object-none min-h-[240px] lg:min-h-auto rounded-2xl" srcSet={`${illusReleases2} 2x`} src={illusReleases} alt="" />
                              </div>
                              <div className="flex flex-col items-start w-auto lg2:w-82 pr-0 lg:pr-32 lg2:pr-0">
                                 <div className="mb-auto bg-primary4 inline-block pt-2 pb-1.5 px-2 rounded text-xs leading-none font-bold uppercase text-neutral8">
                                    New
                                 </div>
                                 <div className="mt-4 lg:mt-6 mb-2 text-3.5xl leading-tight tracking-custom1 font-dm font-bold group-hover:text-primary1 transition-all duration-300">
                                    A Beginner's Guide to TradingView
                                 </div>
                                 <div className="mb-5 text-base leading-normal text-neutral3">
                                    Ethereum
                                 </div>
                                 <div className="mb-auto text-neutral4">
                                    A fully-featured landing page kit, including design files, and beautiful 3D illustrations editable.
                                 </div>
                              </div>
                              <div className="static lg:absolute top-[calc(100%+14px)] left-0 w-6 h-6 mt-4 lg:mt-0 transition-transform duration-300">
                                 <svg className="w-3.5 h-3.5 fill-neutral4 group-hover:translate-x-4 transition-all duration-1000">
                                    <use xlinkHref="#icon-arrow-next" />
                                 </svg>
                              </div>
                           </Link>
                           <Link to="/learn-crypto" className="relative group block lg:flex flex-row-reverse transition-colors duration-200">
                              <div className="shrink-0 w-full lg:w-500 lg2:w-640 mb-8 lg:mb-0 ml-auto">
                                 <img
                                    className="w-full object-cover lg:object-none min-h-[240px] lg:min-h-auto rounded-2xl"
                                    srcSet={`${illusReleases22} 2x`}
                                    src={illusReleases21}
                                    alt=""
                                 />
                              </div>
                              <div className="flex flex-col items-start w-auto lg2:w-82 pr-0 lg:pr-32 lg2:pr-0">
                                 <div className="mb-auto bg-primary5 inline-block pt-2 pb-1.5 px-2 rounded text-xs leading-none font-bold uppercase text-neutral8">
                                    Beginner
                                 </div>
                                 <div className="mt-4 lg:mt-6 mb-2 text-3.5xl leading-tight tracking-custom1 font-dm font-bold group-hover:text-primary1 transition-all duration-300">
                                    What Is Crypto Market Sentiment?
                                 </div>
                                 <div className="mb-5 text-base leading-normal text-neutral3">
                                    Ethereum
                                 </div>
                                 <div className="mb-auto text-neutral4">
                                    A fully-featured landing page kit, including design files, and beautiful 3D illustrations editable.
                                 </div>
                              </div>
                              <div className="static lg:absolute top-[calc(100%+14px)] left-0 w-6 h-6 mt-4 lg:mt-0 transition-transform duration-300">
                                 <svg className="w-3.5 h-3.5 fill-neutral4 group-hover:translate-x-4 transition-all duration-1000">
                                    <use xlinkHref="#icon-arrow-next" />
                                 </svg>
                              </div>
                           </Link>
                           <Link to="/learn-crypto" className="relative group block lg:flex flex-row-reverse transition-colors duration-200">
                              <div className="shrink-0 w-full lg:w-500 lg2:w-640 mb-8 lg:mb-0 ml-auto">
                                 <img
                                    className="w-full object-cover lg:object-none min-h-[240px] lg:min-h-auto rounded-2xl"
                                    srcSet={`${illusReleases32} 2x`}
                                    src={illusReleases31}
                                    alt=""
                                 />
                              </div>
                              <div className="flex flex-col items-start w-auto lg2:w-82 pr-0 lg:pr-32 lg2:pr-0">
                                 <div className="mb-auto bg-primary4 inline-block pt-2 pb-1.5 px-2 rounded text-xs leading-none font-bold uppercase text-neutral8">
                                    New
                                 </div>
                                 <div className="mt-4 lg:mt-6 mb-2 text-3.5xl leading-tight tracking-custom1 font-dm font-bold group-hover:text-primary1 transition-all duration-300">
                                    What Is the Ethereum Hard Fork?
                                 </div>
                                 <div className="mb-5 text-base leading-normal text-neutral3">
                                    Ethereum
                                 </div>
                                 <div className="mb-auto text-neutral4">
                                    A fully-featured landing page kit, including design files, and beautiful 3D illustrations editable.
                                 </div>
                              </div>
                              <div className="static lg:absolute top-[calc(100%+14px)] left-0 w-6 h-6 mt-4 lg:mt-0 transition-transform duration-300">
                                 <svg className="w-3.5 h-3.5 fill-neutral4 group-hover:translate-x-4 transition-all duration-1000">
                                    <use xlinkHref="#icon-arrow-next" />
                                 </svg>
                              </div>
                           </Link>
                        </>
                     )
                  }
               </div>
            </div>
         </div>
      </>
   );
});
