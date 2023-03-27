import React, { memo, FC } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import { Button, MyTab, Image, Skeleton } from 'components';
import // illusLearn11,
// illusLearn12,
// illusLearn21,
// illusLearn22,
// illusLearn31,
// illusLearn32,
// illusLearn41,
// illusLearn42
'assets';
import { selectNewsLoading, selectNews } from 'modules';
import { useNewsFetch } from 'hooks';
import { useHistory } from 'react-router';
import { localeDate, openInNewTab } from 'helpers';

const LearnMemo: FC = () => {
   const { push } = useHistory();
   useNewsFetch(25, 'digiassetnews');
   const newsLoadig = useSelector(selectNewsLoading);
   const news = useSelector(selectNews);

   return (
      <section className="relative lg:mb-28 lg2:mb-33">
         <div
            className="absolute inset-x-0 -top-8"
            id="learn"></div>
         <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20">
            <div className="mb-10 flex justify-between">
               <div className="whitespace-normal font-dm text-4.5xl md:text-5xl">
                  Learn crypto
               </div>
               <Button
                  text="View more"
                  onClick={() =>
                     openInNewTab('https://www.digiassetindo.com/blog/')
                  }
                  variant="outline"
                  width="noFull"
               />
            </div>
            <MyTab titles={['All', 'Bitcoin', 'Blockchain', 'Tutorial']}>
               <>
                  <Tab.Panel as={React.Fragment}>
                     <div className="-mx-4 after:clear-both after:table after:content-[''] lg2:-mx-4.5 lg2:-mt-8">
                        <div className="lg2-max:visible lg2-max:relative lg2-max:box-border lg2-max:block lg2-max:touch-pan-y lg2-max:select-none lg2-max:pb-[72px]">
                           <div className="group relative float-left mx-3 mt-0 block w-[calc(50%-36px)] cursor-pointer lg:mx-4.5 lg:mt-8 lg2-max:hidden">
                              <div className="group relative mb-10 h-[510px] w-[542px] overflow-hidden rounded-[20px]">
                                 <Image
                                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-125"
                                    src={news[0]?.feature_image}
                                    alt={news[0]?.title}
                                    title={news[0]?.title}
                                    height={510}
                                    width={542}
                                    classNameParent="h-full w-full"
                                 />
                              </div>
                              <div className="flex justify-between">
                                 <div className="grow">
                                    <div className="mb-4 font-dm text-[32px] font-bold leading-10 tracking-custom1 transition-colors duration-500 hover:text-primary1">
                                       {news[0]?.title}
                                    </div>
                                    <div className="text-base text-neutral4">
                                       {news[0]?.meta_description}
                                    </div>
                                 </div>
                                 <Button
                                    text="Learn more"
                                    onClick={() => push('learn-crypto')}
                                    variant="outline"
                                    width="noFull"
                                    icRight={
                                       <svg className="h-4 w-4 fill-neutral4 group-hover:fill-neutral8">
                                          <use xlinkHref="#icon-arrow-right" />
                                       </svg>
                                    }
                                 />
                              </div>
                              <a
                                 href={news[0]?.url}
                                 className="absolute inset-0"
                                 target="_blank"
                                 rel="noopener noereferrer"
                              />
                           </div>
                           {news.slice(1, 4).map(e => (
                              <div
                                 key={e.id}
                                 className="group relative float-right mx-3 mt-0 flex w-[calc(50%-36px)] cursor-pointer flex-row-reverse pl-15 lg:mx-4.5 lg:mt-8 lg2-max:hidden">
                                 <div className="group relative shrink-0 grow-0 basis-[45.65%] overflow-hidden rounded-2xl">
                                    <Image
                                       className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-125"
                                       src={e.feature_image}
                                       alt={e.title}
                                       title={e.title}
                                       height={220}
                                       width={208}
                                       classNameParent="h-full w-full"
                                    />
                                 </div>
                                 <div className="grow-1 group flex flex-col pr-4">
                                    <div className="mb-4 text-base font-medium transition-colors duration-300 group-hover:text-primary1">
                                       {e.meta_title}
                                    </div>
                                    <div className="mb-auto text-neutral4">
                                       {e.meta_description}
                                    </div>
                                    <div className="mt-6 text-neutral4">
                                       {localeDate(e.created_at, 'shortDate')}
                                    </div>
                                 </div>
                                 <a
                                    href={e.url}
                                    className="absolute inset-0"
                                    target="_blank"
                                    rel="noopener noereferrer"
                                 />
                              </div>
                           ))}
                           <button className="lg:hidden lg2-max:absolute lg2-max:bottom-0 lg2-max:left-4 lg2-max:z-2 lg2-max:flex lg2-max:h-10 lg2-max:w-10 lg2-max:items-center lg2-max:justify-center lg2-max:rounded-full lg2-max:text-none lg2-max:transition-all lg2-max:duration-200 lg2-max:hover:shadow-border lg2-max:hover:dark:shadow-border-dark">
                              <svg className="h-4 w-4 fill-neutral4 transition-all duration-200">
                                 <use xlinkHref="#icon-arrow-prev" />
                              </svg>
                           </button>
                           <div className="lg:hidden lg2-max:relative lg2-max:m-0 lg2-max:block lg2-max:translate-x-0 lg2-max:overflow-visible lg2-max:p-0"></div>
                           <button className="lg:hidden lg2-max:absolute lg2-max:bottom-0 lg2-max:left-16 lg2-max:z-2 lg2-max:flex lg2-max:h-10 lg2-max:w-10 lg2-max:items-center lg2-max:justify-center lg2-max:rounded-full lg2-max:text-none lg2-max:transition-all lg2-max:duration-200 lg2-max:hover:shadow-border lg2-max:hover:dark:shadow-border-dark">
                              <svg className="h-4 w-4 fill-neutral4 transition-all duration-200">
                                 <use xlinkHref="#icon-arrow-next" />
                              </svg>
                           </button>
                        </div>
                     </div>
                  </Tab.Panel>
                  <Tab.Panel className="-mx-3 flex min-h-full flex-wrap">
                     {newsLoadig ? (
                        <>
                           <div className="w-full p-3 md:w-1/2 lg:w-1/3">
                              <Skeleton height={230} />
                           </div>
                           <div className="w-full p-3 md:w-1/2 lg:w-1/3">
                              <Skeleton height={230} />
                           </div>
                           <div className="w-full p-3 md:w-1/2 lg:w-1/3">
                              <Skeleton height={230} />
                           </div>
                        </>
                     ) : news?.length ? (
                        news?.map(e => (
                           <div
                              key={e.uuid}
                              className="w-full p-3 md:w-1/2 lg:w-1/3">
                              <div>
                                 <div className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl p-3 shadow transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:p-0 hover:shadow-lg">
                                    <Image
                                       className="h-full w-full rounded-lg object-cover transition duration-700 ease-in-out group-hover:scale-110"
                                       src={e.feature_image}
                                       alt={e.title}
                                       title={e.title}
                                       height={205.99}
                                       width={333.33}
                                    />
                                    <div className="absolute inset-0 group-hover:bg-primary3 group-hover:bg-gradient-to-r group-hover:from-primary2 group-hover:opacity-75" />
                                    <svg
                                       className="absolute left-[45%] top-[45%] h-10 w-10 rounded-full bg-neutral6 fill-primary4 p-2 text-center opacity-0 transition-all duration-[1300ms] group-hover:animate-bounce group-hover:opacity-100"
                                       width="24"
                                       height="25"
                                       viewBox="0 0 24 25"
                                       fill="none"
                                       xmlns="http:www.w3.org/2000/svg">
                                       <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M12.0001 18.0039C16.1256 18.0039 19.0593 15.4115 20.7773 13.2526C21.3732 12.5037 21.3732 11.5041 20.7773 10.7553C19.0593 8.59629 16.1256 6.00391 12.0001 6.00391C7.87457 6.00391 4.94086 8.59629 3.2228 10.7553C2.6269 11.5041 2.6269 12.5037 3.2228 13.2526C4.94086 15.4115 7.87457 18.0039 12.0001 18.0039ZM22.3423 14.4979C23.5182 13.0202 23.5182 10.9877 22.3423 9.50991C20.474 7.16216 17.0266 4.00391 12.0001 4.00391C6.97353 4.00391 3.52612 7.16216 1.65785 9.50991C0.481891 10.9876 0.48189 13.0202 1.65784 14.4979C3.52612 16.8456 6.97353 20.0039 12.0001 20.0039C17.0266 20.0039 20.474 16.8456 22.3423 14.4979Z"
                                       />
                                       <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M14 12.0039C14 13.1085 13.1046 14.0039 12 14.0039C10.8954 14.0039 10 13.1085 10 12.0039C10 11.9755 10.0006 11.9473 10.0018 11.9192C10.1577 11.9741 10.3253 12.0039 10.5 12.0039C11.3284 12.0039 12 11.3323 12 10.5039C12 10.3292 11.9701 10.1616 11.9153 10.0057C11.9434 10.0045 11.9716 10.0039 12 10.0039C13.1046 10.0039 14 10.8993 14 12.0039ZM16 12.0039C16 14.213 14.2091 16.0039 12 16.0039C9.79086 16.0039 8 14.213 8 12.0039C8 9.79477 9.79086 8.00391 12 8.00391C14.2091 8.00391 16 9.79477 16 12.0039Z"
                                       />
                                    </svg>
                                    <a
                                       href={news[0]?.url}
                                       className="absolute inset-0"
                                       target="_blank"
                                       rel="noopener noereferrer"
                                    />
                                 </div>
                                 <div className="p-2">
                                    <div className="">{e.title}</div>
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <div className="">News Not found</div>
                     )}
                  </Tab.Panel>
                  <Tab.Panel>Blockchain</Tab.Panel>
                  <Tab.Panel>Tutorial</Tab.Panel>
               </>
            </MyTab>
         </div>
      </section>
   );
};

export const Learn = memo(LearnMemo);
