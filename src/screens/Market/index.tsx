import React, { FunctionComponent, useState } from 'react';
import { Button, Nav, PriceChart3, Skeleton, Image, Badge } from 'components';
import { IcEmty, IcShorting, illusMarket, illusMarket2 } from 'assets';
import { useMarket, useNewsFetch } from 'hooks';
import { localeDate, renderCurrencyIcon } from 'helpers';
import { IntlProps } from 'index';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

const rows = 3;
type Props = IntlProps;

const MarketFC = ({ intl }: Props) => {
   const {
      isLoading,
      marketsData,
      otherMarkets,
      currentBidUnitsList,
      currentBidUnit,
      setCurrentBidUnit,
      handleRedirectToTrading,
      handleToSetFavorites
   } = useMarket();
   // const [tabMarket, setTabMarket] = useState<number>(0);
   const {
      newsLoadig,
      news
   } = useNewsFetch();
   const [more, setMore] = useState<number>(rows);

   const translate = (id: string) => intl.formatMessage({ id });

   return (
      <>
         <div className="relative pt-16 md:pt-[156px] md:pb-28 min-h-auto md:min-h-[692px] bg-secondary5 dark:bg-shade1">
            <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
               <div className="relative z-3 max-w-[545px] mb-[143px]">
                  <div className="mb-4 md:mb-8 text-4.5xl leading-12 md:text-64 tracking-custom font-dm font-bold">
                     Today’s Cryptocurrency prices
                  </div>
                  <div className="text-base md:text-2xl leading-custom2 tracking-custom1 text-neutral3 dark:text-neutral5">
                     The global crypto market cap is
                     <strong className="font-semibold">$1.86T</strong>
                  </div>
               </div>
               <div className="static md:absolute top-0 right-[calc(50%-820px)] lg2:right-[calc(50%-760px)] w-auto md:w-[780px] -mr-17 mb-6 -ml-7.5 md:m-0 pointer-events-none">
                  <img className="w-full" srcSet={`${illusMarket2} 2x`} src={illusMarket} alt="Card" />
               </div>
            </div>
         </div>
         <div className="relative -mt-[137px] mb-[72px]">
            <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
               <div className="rounded-3xl shadow-card2 bg-neutral8 dark:bg-shade1 border border-neutral7 dark:border-neutral2 -mx-4 mb-8 md:m-0">
                  <div className="flex space-x-4.5">
                     {isLoading ? (
                        <>
                           <Skeleton className="col-span-4 sm:col-span-2 lg:col-span-1" height={87.99} isWithFull rounded="2xl" />
                           <Skeleton className="col-span-4 sm:col-span-2 lg:col-span-1" height={87.99} isWithFull rounded="2xl" />
                           <Skeleton className="col-span-4 sm:col-span-2 lg:col-span-1" height={87.99} isWithFull rounded="2xl" />
                        </>
                     ) : otherMarkets?.length ? otherMarkets?.slice(0, 3)?.map(market => {
                        const klinesData: number[] = market?.kline;
                        let labels: number[], data: number[];
                        labels = klinesData.map(e => e[0]);
                        data = klinesData.map(e => e[2]);
                        return (
                           <div
                              key={market?.id}
                              className="group flex w-1/3 p-6"
                              onClick={() => handleRedirectToTrading(market?.id)}
                           >
                              <div className="shrink-0 w-10 mr-4">
                                 <Image
                                    src={renderCurrencyIcon(market.base_unit)}
                                    alt={market.name}
                                    title={market.name}
                                    width={40}
                                    height={40}
                                 />
                              </div>
                              <div className="space-y-1">
                                 <div className="flex items-center space-x-3">
                                    <div className="text-xs font-semibold text-neutral4 leading-custom4">
                                       {market?.name}
                                    </div>
                                    <Badge
                                       variant={market?.price_change_percent?.includes('+') ? 'green' : 'orange'}
                                       text={market?.price_change_percent}
                                       rounded="3xl"
                                    />
                                 </div>
                                 <div className="text-2xl leading-custom2 font-semibold tracking-custom1 group-hover:text-primary1 transition-colors duration-300">
                                    {market?.last}
                                 </div>
                                 <div>{market?.volume}</div>
                              </div>
                              <div className="w-25 ml-4 hidden lg2:block">
                                 <PriceChart3
                                    id={market?.id}
                                    theme={market?.price_change_percent.includes('+') ? 'positive' : 'negative'}
                                    labels={labels}
                                    data={data}
                                 />
                              </div>
                           </div>
                        )
                     }) : (
                        <div className="">
                           Market not found
                        </div>
                     )}
                  </div>
                  <div className="block md:flex justify-between items-center py-8.5 px-8 border-t border-neutral6 dark:border-neutral2">
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
                              title={e ? e.toUpperCase() : translate('page.body.marketsTable.filter.all')}
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
                        onClick={() => handleRedirectToTrading(marketsData[0]?.id)}
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="relative mb-16 md:mb-28 lg2:mb-34">
            <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
               <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                     <thead>
                        <tr>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                              <div className="flex items-center space-x-1 cursor-pointer">
                                 <div>#</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                              <div className="flex items-center space-x-1 cursor-pointer">
                                 <div>Name</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                              <div className="flex items-center space-x-1 cursor-pointer justify-end">
                                 <div>Price</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                              <div>24h %</div>
                           </th>
                           <th className="hidden px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                              <div>7d %</div>
                           </th>
                           <th className="hidden px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                              <div className="flex items-center space-x-1 cursor-pointer justify-end">
                                 <div>Marketcap</div>
                                 <svg className="w-5 h-5 fill-neutral4">
                                    <use xlinkHref="#icon-coin" />
                                 </svg>
                              </div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                              <div className="flex items-center space-x-1 cursor-pointer justify-end">
                                 <div>Volume (24h)</div>
                                 <svg className="w-5 h-5 fill-neutral4">
                                    <use xlinkHref="#icon-chart" />
                                 </svg>
                              </div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                              <div>Chart</div>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {isLoading ? (
                           <>
                              <tr>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                              </tr>
                              <tr>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                              </tr>
                              <tr>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                                 <td className="p-4"><Skeleton height={20} isWithFull /></td>
                              </tr>
                           </>
                        ) : marketsData?.length ? marketsData?.map(market => {
                           const klinesData: number[] = market?.kline;
                           let labels: number[], data: number[];
                           labels = klinesData.map(e => e[0]);
                           data = klinesData.map(e => e[2]);
                           return (
                              <tr key={market?.id} style={{ transition: 'background .2s' }} className="group relative">
                                 <td
                                    onClick={() => handleToSetFavorites(String(market?.id))}
                                    className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs p-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2"
                                 >
                                    <div className="flex space-x-2 items-center">
                                       <svg className={`w-4 h-4 ${market?.isFav ? 'fill-secondary3' : 'fill-neutral4 hover:fill-secondary3'} transition-all duration-300`}>
                                          <use xlinkHref={`#icon-star${market?.isFav ? '' : '-outline'}`}></use>
                                       </svg>
                                       <div>{market?.no}</div>
                                    </div>
                                 </td>
                                 <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                    <div className="flex space-x-3 items-center">
                                       <div className="shrink-0 w-8">
                                          <img
                                             src={renderCurrencyIcon(market?.curency_data?.id, market?.curency_data?.icon_url)}
                                             className={`w-full ${renderCurrencyIcon(market?.curency_data?.id, market?.curency_data?.icon_url)?.includes('http') ? 'object-cover bg-neutral8 polygon' : ''}`}
                                             alt=""
                                          />
                                       </div>
                                       <div className="flex items-center space-x-1">
                                          <div>{market?.curency_data?.name}</div>
                                          <div className="font-normal text-neutral4 uppercase">{market?.quote_unit}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right">
                                    <div>{market?.last}</div>
                                 </td>
                                 <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right">
                                    <div className={market?.price_change_percent?.includes('+') ? 'text-primary5 dark:text-chart1' : 'text-primary4'}>
                                       {market?.price_change_percent}
                                    </div>
                                 </td>
                                 <td className="hidden p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right">
                                    <div className="text-primary4">-2.02%</div>
                                 </td>
                                 <td className="hidden p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right">
                                    <div>$328,564,656,654</div>
                                 </td>
                                 <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right">
                                    <div>{market?.volume}</div>
                                 </td>
                                 <td className="rounded-r-xl p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right">
                                    <div className="w-25 -my-1.25 ml-auto group-hover:hidden">
                                       <PriceChart3
                                          id={market?.id}
                                          theme={market?.price_change_percent.includes('+') ? 'positive' : 'negative'}
                                          labels={labels}
                                          data={data}
                                       />
                                    </div>
                                    <div className="w-24 ml-auto hidden group-hover:block">
                                       <Button
                                          text="Buy"
                                          size="normal"
                                          onClick={() => handleRedirectToTrading(market?.id)}
                                       />
                                    </div>
                                 </td>
                              </tr>
                           )
                        }) : (
                           <tr>
                              <td colSpan={8}>
                                 <div className="min-h-c-screen-462 flex flex-col items-center justify-center space-y-3">
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
            <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
               <div className="max-w-[455px] mx-auto mb-12 lg2:mb-16 text-center">
                  <div className="mb-5 text-5xl leading-custom1 tracking-custom font-dm font-bold">
                     Learn and earn
                  </div>
                  <div className="text-base text-neutral3 dark:text-neutral5">
                     Stacks is a production-ready library of stackable content blocks built in React Native
                  </div>
               </div>
               <div className="block md:flex flex-wrap md:-mx-4 md:-mt-4 space-y-8 md:space-y-0">
                  {newsLoadig ? (
                     <>
                        <div className="p-4 w-full md:w-1/2 lg:w-1/3 flex flex-col items-start transition-colors duration-300">
                           <Skeleton
                              height={200}
                              isWithFull
                              rounded="2xl"
                              className="mb-8 md:mb-12"
                           />
                           <Skeleton height={26} className="mb-4" width={'50%'} />
                           <Skeleton height={30} width={'80%'} />
                        </div>
                        <div className="p-4 w-full md:w-1/2 lg:w-1/3 flex flex-col items-start transition-colors duration-300">
                           <Skeleton
                              height={200}
                              isWithFull
                              rounded="2xl"
                              className="mb-8 md:mb-12"
                           />
                           <Skeleton height={26} className="mb-4" width={'50%'} />
                           <Skeleton height={30} width={'80%'} />
                        </div>
                        <div className="p-4 w-full md:w-1/2 lg:w-1/3 flex flex-col items-start transition-colors duration-300">
                           <Skeleton
                              height={200}
                              isWithFull
                              rounded="2xl"
                              className="mb-8 md:mb-12"
                           />
                           <Skeleton height={26} className="mb-4" width={'50%'} />
                           <Skeleton height={30} width={'80%'} />
                        </div>
                     </>
                  ) : news?.slice(0, more).map(e => (
                     <div key={e.uuid} className="relative group p-4 w-full md:w-1/2 lg:w-1/3 flex flex-col items-start transition-colors duration-300">
                        <div className="relative overflow-hidden w-full mb-8 md:mb-12 rounded-xl before:content-[''] before:pb-[75%] lg2:before:pb-[57%] before:block">
                           <Image
                              className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000"
                              src={e.feature_image}
                              alt={e.title}
                              title={e.title}
                              height={200.63}
                              width={252}
                              classNameParent="h-full w-full"
                           />
                           {false && (
                              <button className="group flex justify-center items-center w-12 h-12 absolute top-1/2 left-1/2 z-3 rounded-full bg-neutral8 shadow-play -translate-x-1/2 -translate-y-1/2">
                                 <svg className="w-3 h-3 fill-neutral4 group-hover:fill-primary1 group-hover:scale-125 transition-all duration-300">
                                    <use xlinkHref="#icon-play" />
                                 </svg>
                              </button>
                           )}
                        </div>
                        <Badge
                           text={e.meta_title}
                           className="mb-4 truncate max-w-full"
                           variant={e.slug.split('-').length > 4 ? 'green' : e.slug.split('-').length < 8 ? 'ungu' : e.slug.split('-').length > 12 ? 'primary' : 'orange'}
                        />
                        <div className="mb-8 md:mb-12 text-2xl leading-custom2 font-semibold tracking-custom1 group-hover:text-primary1 transition-all duration-300">
                           {e.title}
                        </div>
                        <div className="flex flex-wrap justify-between w-full mt-auto font-medium text-neutral4">
                           <div className="flex space-x-3 items-center mr-4">
                              <div className="shrink-0 w-6 h-6 rounded-full overflow-hidden bg-primary5" />
                              <div>Admin</div>
                           </div>
                           <div>{localeDate(e.created_at, 'shortDate')}</div>
                        </div>
                        <div className="mt-0 md:mt-12 bg-none rounded-md md:bg-neutral6 dark:md:bg-neutral3 h-0.5 w-full" />
                        <a
                           href={e.url}
                           rel="noopener noreferrer"
                           className="absolute inset-0"
                           target="_blank"
                        />
                     </div>
                  ))}
               </div>
            </div>
            {more < news?.length && (
               <div className="mt-9 md:mt-12 text-center">
                  <Button
                     text="Load more"
                     variant="outline"
                     size="normal"
                     icLeft={
                        <div className="mr-4 ml-[5px] scale-[0.8] w-[1em] h-[1em] rounded-full text-[4px] -indent-[9999em] animate-loader dark:animate-loader-white" />
                     }
                     onClick={() => setMore(more + rows)}
                     width="noFull"
                  />
               </div>
            )}
         </div>
      </>
   )
}

export const Market = compose(
   injectIntl,
   injectIntl,
   connect(null, null)
)(MarketFC) as FunctionComponent;
