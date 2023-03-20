import React, { FunctionComponent, useState } from 'react';
import { Button, Nav, PriceChart3, Skeleton, Image, Badge } from 'components';
import { IcEmty, IcShorting, illusMarket, illusMarket2 } from 'assets';
import { useMarket, useNewsFetch, useScrollUp } from 'hooks';
import { localeDate, renderCurrencyIcon } from 'helpers';
import { IntlProps } from 'index';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

const rows = 3;
type Props = IntlProps;

const MarketFC = ({ intl }: Props) => {
   useScrollUp();
   const {
      isLoading,
      filterMarkets,
      markets,
      currentBidUnitsList,
      currentBidUnit,
      setCurrentBidUnit,
      handleRedirectToTrading,
      handleToSetFavorites,
   } = useMarket();
   // const [tabMarket, setTabMarket] = useState<number>(0);
   const { newsLoadig, news } = useNewsFetch(25, 'news');
   const [more, setMore] = useState<number>(rows);

   const translate = (id: string) => intl.formatMessage({ id });

   return (
      <>
         <div className="relative min-h-auto bg-secondary5 pt-16 dark:bg-shade1 md:min-h-[692px] md:pt-[156px] md:pb-28">
            <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg:px-20">
               <div className="relative z-3 mb-[143px] max-w-[545px]">
                  <div className="mb-4 font-dm text-4.5xl font-bold leading-12 tracking-custom md:mb-8 md:text-64">
                     Today’s Cryptocurrency prices
                  </div>
                  <div className="text-base leading-custom2 tracking-custom1 text-neutral3 dark:text-neutral5 md:text-2xl">
                     The global crypto market cap is
                     <strong className="font-semibold">$1.86T</strong>
                  </div>
               </div>
               <div className="pointer-events-none static top-0 right-[calc(50%-820px)] -mr-17 mb-6 -ml-7.5 w-auto md:absolute md:m-0 md:w-[780px] lg2:right-[calc(50%-760px)]">
                  <img
                     className="w-full"
                     srcSet={`${illusMarket2} 2x`}
                     src={illusMarket}
                     alt="Card"
                  />
               </div>
            </div>
         </div>
         <div className="relative -mt-[137px] mb-[72px]">
            <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg:px-20">
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
                           const klinesData: number[][] = market?.kline!;
                           let labels: number[];
                           let data: number[];
                           labels = klinesData?.map(e => e[0]);
                           data = klinesData?.map(e => e[2]);
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
                                    <PriceChart3
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
                  <div className="block items-center justify-between border-t border-neutral6 py-8.5 px-8 dark:border-neutral2 md:flex">
                     {/* <div className="flex space-x-3">
                        <Nav
                           title="Cryptocurrencies"
                           isActive={tabMarket === 0}
                           onClick={() => setTabMarket(0)}
                        />
                        <Nav
                           title="DeFi"
                           isActive={tabMarket === 1}
                           onClick={() => setTabMarket(1)}
                        />
                        <Nav
                           title="Innovation"
                           isActive={tabMarket === 2}
                           onClick={() => setTabMarket(2)}
                        />
                        <Nav
                           title="POS"
                           isActive={tabMarket === 3}
                           onClick={() => setTabMarket(3)}
                        />
                        <Nav
                           title="NFT"
                           isActive={tabMarket === 4}
                           onClick={() => setTabMarket(4)}
                        />
                        <Nav
                           title="POW"
                           isActive={tabMarket === 5}
                           onClick={() => setTabMarket(5)}
                        />
                     </div> */}
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
            </div>
         </div>
         <div className="relative mb-16 md:mb-28 lg2:mb-34">
            <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg:px-20">
               <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                     <thead>
                        <tr>
                           <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center space-x-1">
                                 <div>#</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center space-x-1">
                                 <div>Name</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center justify-end space-x-1">
                                 <div>Price</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div>24h %</div>
                           </th>
                           <th className="hidden border-b border-neutral6 px-4 pb-8 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div>7d %</div>
                           </th>
                           <th className="hidden border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center justify-end space-x-1">
                                 <div>Marketcap</div>
                                 <svg className="h-5 w-5 fill-neutral4">
                                    <use xlinkHref="#icon-coin" />
                                 </svg>
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center justify-end space-x-1">
                                 <div>Volume (24h)</div>
                                 <svg className="h-5 w-5 fill-neutral4">
                                    <use xlinkHref="#icon-chart" />
                                 </svg>
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div>Chart</div>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {isLoading ? (
                           <>
                              <tr>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                                 <td className="p-4">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                    />
                                 </td>
                              </tr>
                           </>
                        ) : filterMarkets?.length ? (
                           filterMarkets?.map(market => {
                              const klinesData: number[][] = market?.kline!;
                              let labels: number[];
                              let data: number[];
                              labels = klinesData?.map(e => e[0]);
                              data = klinesData?.map(e => e[2]);
                              return (
                                 <tr
                                    key={market?.id}
                                    style={{ transition: 'background .2s' }}
                                    className="group relative">
                                    <td className="rounded-l-xl p-4 align-middle text-xs font-semibold leading-custom4 text-neutral4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div className="flex items-center space-x-2">
                                          <svg
                                             onClick={e =>
                                                handleToSetFavorites(
                                                   e,
                                                   String(market?.id)
                                                )
                                             }
                                             className={`h-4 w-4 ${
                                                market?.isFav
                                                   ? 'fill-secondary3'
                                                   : 'fill-neutral4 hover:fill-secondary3'
                                             } transition-all duration-300`}>
                                             <use
                                                xlinkHref={`#icon-star${
                                                   market?.isFav
                                                      ? ''
                                                      : '-outline'
                                                }`}
                                             />
                                          </svg>
                                          <div>{market?.no}</div>
                                       </div>
                                    </td>
                                    <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div className="flex items-center space-x-3">
                                          <div className="w-8 shrink-0">
                                             <img
                                                src={renderCurrencyIcon(
                                                   market?.base_unit,
                                                   market?.logo_url
                                                )}
                                                className={`w-full ${
                                                   renderCurrencyIcon(
                                                      market?.base_unit,
                                                      market?.logo_url
                                                   )?.includes('http')
                                                      ? 'polygon bg-neutral8 object-cover'
                                                      : ''
                                                }`}
                                                alt=""
                                             />
                                          </div>
                                          <div className="flex items-center space-x-1">
                                             <div>{market?.fullname}</div>
                                             <div className="font-normal uppercase text-neutral4">
                                                {market?.quote_unit}
                                             </div>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="p-4 text-right align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div>{market?.last}</div>
                                    </td>
                                    <td className="p-4 text-right align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div
                                          className={
                                             market?.price_change_percent?.includes(
                                                '+'
                                             )
                                                ? 'text-primary5 dark:text-chart1'
                                                : 'text-primary4'
                                          }>
                                          {market?.price_change_percent}
                                       </div>
                                    </td>
                                    <td className="hidden p-4 text-right align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div className="text-primary4">
                                          -2.02%
                                       </div>
                                    </td>
                                    <td className="hidden p-4 text-right align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div>$328,564,656,654</div>
                                    </td>
                                    <td className="p-4 text-right align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div>{market?.volume}</div>
                                    </td>
                                    <td className="rounded-r-xl p-4 text-right align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div className="-my-1.25 ml-auto w-25 group-hover:hidden">
                                          <PriceChart3
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
                                       <div className="ml-auto hidden w-24 group-hover:block">
                                          <Button
                                             text="Buy"
                                             size="normal"
                                             onClick={() =>
                                                handleRedirectToTrading(
                                                   market?.id
                                                )
                                             }
                                          />
                                       </div>
                                    </td>
                                 </tr>
                              );
                           })
                        ) : (
                           <tr>
                              <td colSpan={8}>
                                 <div className="flex min-h-c-screen-462 flex-col items-center justify-center space-y-3">
                                    <IcEmty />
                                    <div className="text-xs font-semibold text-neutral4">
                                       {translate('noResultFound')}
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <div className="relative mb-16 md:mb-28 lg2:mb-34">
            <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg:px-20">
               <div className="mx-auto mb-12 max-w-[455px] text-center lg2:mb-16">
                  <div className="mb-5 font-dm text-5xl font-bold leading-custom1 tracking-custom">
                     Learn and earn
                  </div>
                  <div className="text-base text-neutral3 dark:text-neutral5">
                     Stacks is a production-ready library of stackable content
                     blocks built in React Native
                  </div>
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
                                 className="absolute top-0 left-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-125"
                                 src={e.feature_image}
                                 alt={e.title}
                                 title={e.title}
                                 height={200.63}
                                 width={252}
                                 classNameParent="h-full w-full"
                              />
                              {false && (
                                 <button className="group absolute top-1/2 left-1/2 z-3 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neutral8 shadow-play">
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
            </div>
            {more < news?.length && (
               <div className="mt-9 text-center md:mt-12">
                  <Button
                     text="Load more"
                     variant="outline"
                     size="normal"
                     icLeft={
                        <div className="dark:animate-loader-white mr-4 ml-[5px] h-[1em] w-[1em] scale-[0.8] animate-loader rounded-full -indent-[9999em] text-[4px]" />
                     }
                     onClick={() => setMore(more + rows)}
                     width="noFull"
                  />
               </div>
            )}
         </div>
      </>
   );
};

export const Market = compose(
   injectIntl,
   injectIntl,
   connect(null, null)
)(MarketFC) as FunctionComponent;
