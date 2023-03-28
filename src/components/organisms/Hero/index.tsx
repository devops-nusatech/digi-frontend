import React, { useCallback, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { illusCard, illusCard2 } from 'assets';
import {
   Button,
   Skeleton,
   Image,
   Section,
   Container,
   Info,
   TextXs,
   Heading1,
   TextBase,
   ScrollLine,
   FlexCenter,
   Text2xl,
} from 'components';
import { renderCurrencyIcon } from 'helpers';
import { useMarket } from 'hooks';

export const Hero = () => {
   const history = useHistory();
   const { markets, handleRedirectToTrading, isLoading } = useMarket();

   const renderSkeleton = useCallback(
      (length: number) => {
         const items: ReactElement[] = [];
         for (let i = 0; i < length; i++) {
            items.push(
               <Skeleton
                  key={i}
                  className="col-span-4 sm:col-span-2 lg:col-span-1"
                  height={196}
                  width={244}
                  rounded="2xl"
               />
            );
         }
         return items;
      },
      [isLoading]
   );

   return (
      <Section className="overflow-hidden pt-8 lg:pt-20 lg2:pt-40">
         <Container className="relative">
            <div className="mb-4 grid grid-cols-2 md:mb-20 lg2:mb-[143px]">
               <div className="col-span-2 select-none md:col-span-1">
                  <Heading1
                     text={
                        <>
                           <span className="transition-all duration-300 hover:bg-gradient-to-tr hover:from-primary1 hover:to-primary5 hover:bg-clip-text hover:text-transparent">
                              Buy & sell
                           </span>
                           <br />
                           crypto in minutes
                        </>
                     }
                  />
                  <TextBase
                     text="Trade Bitcoin, Ethereum, USDT, and the top altcoins on the legendary crypto asset exchange."
                     className="mb-8 w-2/3 text-neutral4 sm:w-3/4 md:w-full"
                     font="normal"
                  />
                  <div className="flex flex-row items-start justify-between md:flex-col">
                     <Button
                        text="Get started now"
                        className="mb-20"
                        width="noFull"
                        onClick={() => history.push('/markets')}
                     />
                     <ScrollLine target="learn" />
                  </div>
               </div>
               <div className="col-span-2 md:col-span-1">
                  <div className="pointer-events-none absolute lg2:-top-[305px] lg2:-right-[110px]">
                     <img
                        className="hidden md:block md:w-[500px] lg:w-[700px] xl:w-auto"
                        srcSet={`${illusCard2} 2x`}
                        src={illusCard}
                        alt="Hero"
                        title="Hero"
                     />
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-4 rounded-3xl bg-neutral7 p-6 dark:bg-neutral2 md:mt-8 md:gap-x-8">
               {isLoading ? (
                  renderSkeleton(4)
               ) : markets?.length ? (
                  markets
                     ?.slice(0, 4)
                     ?.map(
                        ({
                           id,
                           name,
                           base_unit,
                           logo_url,
                           price_change_percent,
                           last,
                           volume,
                        }) => (
                           <div
                              key={id}
                              onClick={() => handleRedirectToTrading(id)}
                              className="col-span-4 cursor-pointer rounded-2xl px-6 py-4 transition-all duration-300 hover:bg-neutral8 hover:shadow-card dark:text-neutral8 dark:hover:bg-neutral3 sm:col-span-2 md:p-8 lg:col-span-1">
                              <div className="flex flex-row items-start space-x-4 md:flex-col md:space-x-0">
                                 <Image
                                    src={renderCurrencyIcon(
                                       base_unit,
                                       logo_url
                                    )}
                                    alt={name}
                                    title={name}
                                    width={40}
                                    height={40}
                                 />
                                 <div className="space-y-1 md:mt-4">
                                    <FlexCenter className="gap-3">
                                       <TextXs
                                          text={name}
                                          className="font-semibold"
                                       />
                                       <Info
                                          text={price_change_percent}
                                          theme={
                                             price_change_percent?.includes('-')
                                                ? 'negative'
                                                : 'positive'
                                          }
                                       />
                                    </FlexCenter>
                                    <Text2xl text={last} />
                                    <TextXs
                                       text={volume}
                                       withColorDefault={false}
                                    />
                                 </div>
                              </div>
                           </div>
                        )
                     )
               ) : (
                  <div className="col-span-4 cursor-pointer rounded-2xl px-6 py-4 transition-all duration-300 hover:bg-neutral8 hover:shadow-card dark:text-neutral8 dark:hover:bg-neutral3 md:p-8">
                     <FlexCenter className="justify-center">
                        <Text2xl text="Market not found" />
                     </FlexCenter>
                  </div>
               )}
            </div>
         </Container>
      </Section>
   );
};
