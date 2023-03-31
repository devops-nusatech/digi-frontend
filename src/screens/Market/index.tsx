import React, { FunctionComponent, useState } from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { IntlProps } from 'index';
import {
   Button,
   Nav,
   PriceChart2,
   Skeleton,
   Image,
   Badge,
   Container,
   Section,
   TextBase,
   Heading2,
   TableMarkets,
} from 'components';
import { illusMarket, illusMarket2 } from 'assets';
import { useMarket, useNewsFetch, useScrollUp } from 'hooks';
import { localeDate, renderCurrencyIcon } from 'helpers';

const rows = 3;
type Props = IntlProps;

const MarketFC = ({ intl }: Props) => {
   useScrollUp();
   const {
      isLoading,
      markets,
      filterMarkets,
      currentBidUnitsList,
      currentBidUnit,
      setCurrentBidUnit,
      handleRedirectToTrading,
      handleToSetFavorites,
   } = useMarket();
   const { newsLoadig, news } = useNewsFetch(25, 'news');
   const [more, setMore] = useState(rows);

   const translate = (id: string) => intl.formatMessage({ id });

   return (
      <>
         <Section className="min-h-auto bg-secondary5 pt-16 dark:bg-shade1 md:min-h-[692px] md:pb-28 md:pt-[156px]">
            <Container>
               <div className="relative z-3 mb-[143px] max-w-[545px]">
                  <div className="mb-4 font-dm text-4.5xl leading-12 tracking-custom md:mb-8 md:text-64">
                     Today’s Cryptocurrency prices
                  </div>
                  <div className="text-base leading-custom2 tracking-custom1 text-neutral3 dark:text-neutral5 md:text-2xl">
                     The global crypto market cap is
                     <strong className="font-semibold">$1.86T</strong>
                  </div>
               </div>
               <div className="pointer-events-none static right-[calc(50%-820px)] top-0 -ml-7.5 -mr-17 mb-6 w-auto md:absolute md:m-0 md:w-[780px] lg2:right-[calc(50%-760px)]">
                  <img
                     className="w-full"
                     srcSet={`${illusMarket2} 2x`}
                     src={illusMarket}
                     alt="Card"
                  />
               </div>
            </Container>
         </Section>
         <Section className="-mt-[137px] mb-[72px]">
            <Container>
               <div className="-mx-4 mb-8 rounded-3xl border border-neutral7 bg-neutral8 shadow-card2 dark:border-neutral2 dark:bg-shade1 md:m-0">
                  <div className="hide-scroll flex space-x-4.5 overflow-x-scroll">
                     {isLoading ? (
                        <>
                           <Skeleton
                              className="col-span-4 sm:col-span-2 lg:col-span-1"
                              height={87.99}
                              isWithFull
                              rounded="2xl"
                           />
                           <Skeleton
                              className="col-span-4 sm:col-span-2 lg:col-span-1"
                              height={87.99}
                              isWithFull
                              rounded="2xl"
                           />
                           <Skeleton
                              className="col-span-4 sm:col-span-2 lg:col-span-1"
                              height={87.99}
                              isWithFull
                              rounded="2xl"
                           />
                        </>
                     ) : markets?.length ? (
                        markets?.slice(0, 3)?.map(market => {
                           const klinesData = market?.kline!;
                           let labels: number[];
                           let data: number[];
                           labels = klinesData.map(e => e[0]);
                           data = klinesData.map(e => e[2]);
                           return (
                              <div
                                 key={market?.id}
                                 className="group flex w-1/3 p-6"
                                 onClick={() =>
                                    handleRedirectToTrading(market?.id)
                                 }>
                                 <div className="mr-4 w-10 shrink-0">
                                    <Image
                                       src={renderCurrencyIcon(
                                          market.base_unit
                                       )}
                                       alt={market.name}
                                       title={market.name}
                                       width={40}
                                       height={40}
                                    />
                                 </div>
                                 <div className="space-y-1">
                                    <div className="flex items-center space-x-3">
                                       <div className="text-xs font-semibold leading-custom4 text-neutral4">
                                          {market?.name}
                                       </div>
                                       <Badge
                                          variant={
                                             market?.price_change_percent?.includes(
                                                '+'
                                             )
                                                ? 'green'
                                                : 'orange'
                                          }
                                          text={market?.price_change_percent}
                                          rounded="3xl"
                                       />
                                    </div>
                                    <div className="text-2xl font-semibold leading-custom2 tracking-custom1 transition-colors duration-300 group-hover:text-primary1">
                                       {market?.last}
                                    </div>
                                    <div>{market?.volume}</div>
                                 </div>
                                 <div className="ml-4 hidden w-25 lg2:block">
                                    <PriceChart2
                                       id={market?.id}
                                       theme={
                                          market?.price_change_percent.includes(
                                             '+'
                                          )
                                             ? 'positive'
                                             : 'negative'
                                       }
                                       labels={labels}
                                       data={data}
                                    />
                                 </div>
                              </div>
                           );
                        })
                     ) : (
                        <div className="">Market not found</div>
                     )}
                  </div>
                  <div className="block items-center justify-between border-t border-neutral6 px-8 py-8.5 dark:border-neutral2 md:flex">
                     <div className="flex space-x-3">
                        {currentBidUnitsList.map((e, index) => (
                           <Nav
                              key={index}
                              title={
                                 e
                                    ? e.toUpperCase()
                                    : translate(
                                         'page.body.marketsTable.filter.all'
                                      )
                              }
                              onClick={() => setCurrentBidUnit(e)}
                              isActive={e === currentBidUnit}
                           />
                        ))}
                     </div>
                     <Button
                        text="Trade"
                        variant="outline"
                        size="normal"
                        width="noFull"
                        onClick={() =>
                           handleRedirectToTrading(filterMarkets[0]?.id)
                        }
                     />
                  </div>
               </div>
            </Container>
         </Section>
         <Section>
            <Container>
               <TableMarkets
                  markets={filterMarkets}
                  isLoading={isLoading}
                  handleToSetFavorites={handleToSetFavorites}
                  handleRedirectToTrading={handleRedirectToTrading}
                  translate={translate}
               />
            </Container>
         </Section>
         <Section>
            <Container>
               <div className="mx-auto mb-12 max-w-[455px] text-center lg2:mb-16">
                  <Heading2
                     className="mb-5"
                     text="Learn and earn"
                  />
                  <TextBase
                     text="You can study the following article"
                     font="normal"
                     className="text-neutral3 dark:text-neutral5"
                  />
               </div>
               <div className="block flex-wrap space-y-8 md:-mx-4 md:-mt-4 md:flex md:space-y-0">
                  {newsLoadig ? (
                     <>
                        <div className="flex w-full flex-col items-start p-4 transition-colors duration-300 md:w-1/2 lg:w-1/3">
                           <Skeleton
                              height={200}
                              isWithFull
                              rounded="2xl"
                              className="mb-8 md:mb-12"
                           />
                           <Skeleton
                              height={26}
                              className="mb-4"
                              width="50%"
                           />
                           <Skeleton
                              height={30}
                              width="80%"
                           />
                        </div>
                        <div className="flex w-full flex-col items-start p-4 transition-colors duration-300 md:w-1/2 lg:w-1/3">
                           <Skeleton
                              height={200}
                              isWithFull
                              rounded="2xl"
                              className="mb-8 md:mb-12"
                           />
                           <Skeleton
                              height={26}
                              className="mb-4"
                              width="50%"
                           />
                           <Skeleton
                              height={30}
                              width="80%"
                           />
                        </div>
                        <div className="flex w-full flex-col items-start p-4 transition-colors duration-300 md:w-1/2 lg:w-1/3">
                           <Skeleton
                              height={200}
                              isWithFull
                              rounded="2xl"
                              className="mb-8 md:mb-12"
                           />
                           <Skeleton
                              height={26}
                              className="mb-4"
                              width="50%"
                           />
                           <Skeleton
                              height={30}
                              width="80%"
                           />
                        </div>
                     </>
                  ) : (
                     news?.slice(0, more).map(e => (
                        <div
                           key={e.uuid}
                           className="group relative flex w-full flex-col items-start p-4 transition-colors duration-300 md:w-1/2 lg:w-1/3">
                           <div className="relative mb-8 w-full overflow-hidden rounded-xl before:block before:pb-[75%] before:content-[''] md:mb-12 lg2:before:pb-[57%]">
                              <Image
                                 className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-125"
                                 src={e.feature_image}
                                 alt={e.title}
                                 title={e.title}
                                 height={200.63}
                                 width={252}
                                 classNameParent="h-full w-full"
                              />
                              {false && (
                                 <button
                                    type="button"
                                    className="group absolute left-1/2 top-1/2 z-3 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neutral8 shadow-play">
                                    <svg className="h-3 w-3 fill-neutral4 transition-all duration-300 group-hover:scale-125 group-hover:fill-primary1">
                                       <use xlinkHref="#icon-play" />
                                    </svg>
                                 </button>
                              )}
                           </div>
                           <Badge
                              text={e.meta_title}
                              className="mb-4 max-w-full truncate"
                              variant={
                                 e.slug.split('-').length > 4
                                    ? 'green'
                                    : e.slug.split('-').length < 8
                                    ? 'ungu'
                                    : e.slug.split('-').length > 12
                                    ? 'primary'
                                    : 'orange'
                              }
                           />
                           <div className="mb-8 text-2xl font-semibold leading-custom2 tracking-custom1 transition-all duration-300 group-hover:text-primary1 md:mb-12">
                              {e.title}
                           </div>
                           <div className="mt-auto flex w-full flex-wrap justify-between font-medium text-neutral4">
                              <div className="mr-4 flex items-center space-x-3">
                                 <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-primary5" />
                                 <div>Admin</div>
                              </div>
                              <div>{localeDate(e.created_at, 'shortDate')}</div>
                           </div>
                           <div className="mt-0 h-0.5 w-full rounded-md bg-none md:mt-12 md:bg-neutral6 dark:md:bg-neutral3" />
                           <a
                              href={e.url}
                              rel="noopener noreferrer"
                              className="absolute inset-0"
                              target="_blank"
                           />
                        </div>
                     ))
                  )}
               </div>
            </Container>
            {more < news?.length && (
               <div className="mt-9 text-center md:mt-12">
                  <Button
                     text="Load more"
                     variant="outline"
                     size="normal"
                     icLeft={
                        <div className="dark:animate-loader-white ml-[5px] mr-4 h-[1em] w-[1em] scale-[0.8] animate-loader rounded-full -indent-[9999em] text-[4px]" />
                     }
                     onClick={() => setMore(more + rows)}
                     width="noFull"
                  />
               </div>
            )}
         </Section>
      </>
   );
};

export const Market = compose(
   injectIntl,
   injectIntl,
   connect(null, null)
)(MarketFC) as FunctionComponent;
