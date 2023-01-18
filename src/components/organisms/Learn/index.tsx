import React, { memo, FC } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import { Button, MyTab, Image, Skeleton } from 'components';
import {
   illusLearn11,
   illusLearn12,
   illusLearn21,
   illusLearn22,
   illusLearn31,
   illusLearn32,
   illusLearn41,
   illusLearn42
} from 'assets';
import { selectNewsLoading, selectNews } from 'modules';
import { useNewsFetch } from 'hooks';
import { useHistory } from 'react-router';

const LearnMemo: FC = () => {
   const { push } = useHistory();
   useNewsFetch();
   const newsLoadig = useSelector(selectNewsLoading);
   const news = useSelector(selectNews);

   return (
      <section className="relative lg:mb-28 lg2:mb-33">
         <div className="absolute inset-x-0 -top-8" id="learn"></div>
         <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="flex justify-between mb-10">
               <div className="whitespace-normal text-4.5xl md:text-5xl font-dm">Learn crypto</div>
               <Button
                  text="View more"
                  onClick={() => push('learn-crypto')}
                  variant="outline"
                  width="noFull"
               />
            </div>
            <MyTab titles={['All', 'Bitcoin', 'Blockchain', 'Tutorial']}>
               <>
                  <Tab.Panel>
                     <div className="mt-0 lg:-mt-8 -mx-3 lg:-mx-4.5 after:content-[''] after:table after:clear-both">
                        <div className="">
                           <div className="float-left block mt-0 lg:mt-8 mx-3 lg:mx-4.5 w-[calc(50%-36px)] cursor-pointer">
                              <div className="relative overflow-hidden mb-10 rounded-[20px] group">
                                 <img className="w-full transition-transform duration-1000 group-hover:scale-125" srcSet={`${illusLearn12} 2x`} src={illusLearn11} alt="Images" />
                              </div>
                              <div className="flex justify-between">
                                 <div className="grow">
                                    <div className="mb-4 font-dm text-[32px] leading-10 font-bold tracking-custom1 hover:text-primary1 transition-colors duration-500">
                                       Leveraged tokens now available
                                    </div>
                                    <div className="text-base text-neutral4">
                                       Good things come in 3s. Get 3x Leveraged tokens now.
                                    </div>
                                 </div>
                                 <Button
                                    text="Learn more"
                                    onClick={() => push('learn-crypto')}
                                    variant="outline"
                                    width="noFull"
                                    icRight={
                                       <svg className="w-4 h-4 fill-neutral4 group-hover:fill-neutral8">
                                          <use xlinkHref="#icon-arrow-right" />
                                       </svg>
                                    }
                                 />
                              </div>
                           </div>
                           <div className="float-right flex flex-row-reverse pl-15 mt-0 lg:mt-8 mx-3 lg:mx-4.5 w-[calc(50%-36px)]">
                              <div className="relative overflow-hidden grow-0 shrink-0 basis-[45.65%] rounded-2xl group">
                                 <img className="w-full transition-transform duration-1000 group-hover:scale-125" srcSet={`${illusLearn22} 2x`} src={illusLearn21} alt="Images" />
                              </div>
                              <div className="flex flex-col grow-1 pr-4 group">
                                 <div className="mb-4 text-base font-medium group-hover:text-primary1 transition-colors duration-300">Leveraged tokens now available</div>
                                 <div className="mb-auto text-neutral4">Good things come in 3s. Get 3x Leveraged tokens now.</div>
                                 <div className="mt-6 text-neutral4">Jun 1, 2021</div>
                              </div>
                           </div>
                           <div className="float-right flex flex-row-reverse pl-15 mt-0 lg:mt-8 mx-3 lg:mx-4.5 w-[calc(50%-36px)]">
                              <div className="relative overflow-hidden grow-0 shrink-0 basis-[45.65%] rounded-2xl">
                                 <img className="w-full transition-transform duration-1000 hover:scale-125" srcSet={`${illusLearn42} 2x`} src={illusLearn41} alt="Images" />
                                 <div className="absolute top-1/2 left-1/2 z-3 w-12 h-12 -translate-y-1/2 -translate-x-1/2 shadow-play rounded-full bg-neutral8 group">
                                    <svg className="absolute top-1/2 left-1/2 z-3 w-3 h-3 -translate-y-1/2 -translate-x-1/2 align-middle fill-neutral4 group-hover:fill-primary1 group-hover:scale-110 transition-all duration-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path
                                          d="M2.46655 2.92407C2.46655 1.35705 4.18688 0.398733 5.51926 1.22354L13.7195 6.2999C14.9826 7.0818 14.9826 8.91907 13.7195 9.70096L5.51926 14.7773C4.18688 15.6021 2.46655 14.6438 2.46655 13.0768V2.92407Z" />
                                    </svg>
                                 </div>
                              </div>
                              <div className="flex flex-col grow-1 pr-4 group">
                                 <div className="mb-4 text-base font-medium group-hover:text-primary1 transition-colors duration-300">Leveraged tokens now available</div>
                                 <div className="mb-auto text-neutral4">Good things come in 3s. Get 3x Leveraged tokens now.</div>
                                 <div className="mt-6 text-neutral4">Jun 1, 2021</div>
                              </div>
                           </div>
                           <div className="float-right flex flex-row-reverse pl-15 mt-0 lg:mt-8 mx-3 lg:mx-4.5 w-[calc(50%-36px)]">
                              <div className="relative overflow-hidden grow-0 shrink-0 basis-[45.65%] rounded-2xl group">
                                 <img className="w-full transition-transform duration-1000 group-hover:scale-125" srcSet={`${illusLearn32} 2x`} src={illusLearn31} alt="Images" />
                              </div>
                              <div className="flex flex-col grow-1 pr-4 group">
                                 <div className="mb-4 text-base font-medium group-hover:text-primary1 transition-colors duration-300">Leveraged tokens now available</div>
                                 <div className="mb-auto text-neutral4">Good things come in 3s. Get 3x Leveraged tokens now.</div>
                                 <div className="mt-6 text-neutral4">Jun 1, 2021</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </Tab.Panel>
                  <Tab.Panel className="flex flex-wrap min-h-full -mx-3">
                     {
                        newsLoadig ? (
                           <>
                              <div className="w-full md:w-1/2 lg:w-1/3 p-3">
                                 <Skeleton height={230} />
                              </div>
                              <div className="w-full md:w-1/2 lg:w-1/3 p-3">
                                 <Skeleton height={230} />
                              </div>
                              <div className="w-full md:w-1/2 lg:w-1/3 p-3">
                                 <Skeleton height={230} />
                              </div>
                           </>
                        ) : news?.length ?
                           news?.map(e => (
                              <div
                                 key={e.uuid}
                                 className="w-full md:w-1/2 lg:w-1/3 p-3"
                              >
                                 <div>
                                    <div className="group relative h-full w-full p-3 hover:p-0 rounded-xl overflow-hidden shadow hover:shadow-lg hover:-translate-y-2 hover:scale-105 cursor-pointer transition-all duration-500">
                                       <Image
                                          className="object-cover w-full h-full rounded-lg transition ease-in-out duration-700 group-hover:scale-110"
                                          src={e.feature_image}
                                          alt={e.title}
                                          title={e.title}
                                          height={205.99}
                                          width={333.33}
                                       />
                                       <div className="absolute inset-0 group-hover:bg-gradient-to-r group-hover:from-primary2 group-hover:bg-primary3 group-hover:opacity-75" />
                                       <svg className="absolute left-[45%] top-[45%] text-center h-10 w-10 opacity-0 group-hover:opacity-100 transition-all duration-[1300ms] fill-primary4 p-2 bg-neutral6 rounded-full group-hover:animate-bounce" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http:www.w3.org/2000/svg">
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                             d="M12.0001 18.0039C16.1256 18.0039 19.0593 15.4115 20.7773 13.2526C21.3732 12.5037 21.3732 11.5041 20.7773 10.7553C19.0593 8.59629 16.1256 6.00391 12.0001 6.00391C7.87457 6.00391 4.94086 8.59629 3.2228 10.7553C2.6269 11.5041 2.6269 12.5037 3.2228 13.2526C4.94086 15.4115 7.87457 18.0039 12.0001 18.0039ZM22.3423 14.4979C23.5182 13.0202 23.5182 10.9877 22.3423 9.50991C20.474 7.16216 17.0266 4.00391 12.0001 4.00391C6.97353 4.00391 3.52612 7.16216 1.65785 9.50991C0.481891 10.9876 0.48189 13.0202 1.65784 14.4979C3.52612 16.8456 6.97353 20.0039 12.0001 20.0039C17.0266 20.0039 20.474 16.8456 22.3423 14.4979Z" />
                                          <path fill-rule="evenodd" clip-rule="evenodd"
                                             d="M14 12.0039C14 13.1085 13.1046 14.0039 12 14.0039C10.8954 14.0039 10 13.1085 10 12.0039C10 11.9755 10.0006 11.9473 10.0018 11.9192C10.1577 11.9741 10.3253 12.0039 10.5 12.0039C11.3284 12.0039 12 11.3323 12 10.5039C12 10.3292 11.9701 10.1616 11.9153 10.0057C11.9434 10.0045 11.9716 10.0039 12 10.0039C13.1046 10.0039 14 10.8993 14 12.0039ZM16 12.0039C16 14.213 14.2091 16.0039 12 16.0039C9.79086 16.0039 8 14.213 8 12.0039C8 9.79477 9.79086 8.00391 12 8.00391C14.2091 8.00391 16 9.79477 16 12.0039Z" />
                                       </svg>
                                       <a href={`https://news.digiassetindo.com/${e.slug}`} className="absolute inset-0" target="_blank" rel="noopener noereferrer" />
                                    </div>
                                    <div className="p-2">
                                       <div className="">{e.title}</div>
                                    </div>
                                 </div>
                              </div>
                           )) : (
                              <div className="">
                                 News Not found
                              </div>
                           )
                     }
                  </Tab.Panel>
                  <Tab.Panel>
                     Blockchain
                  </Tab.Panel>
                  <Tab.Panel>
                     Tutorial
                  </Tab.Panel>
               </>
            </MyTab>
         </div>
      </section>
   );
};

export const Learn = memo(LearnMemo);
