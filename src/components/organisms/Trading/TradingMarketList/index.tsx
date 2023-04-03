/* eslint-disable react/no-unescaped-entities */
import React, { memo, useRef } from 'react';
import { useMarket } from 'hooks';
import { Nav, TableMarketTrades } from 'components';
import { IsDisplay, Translate } from 'types';
// import { truncateMiddle } from 'helpers';

interface TradingMarketListProps extends Translate, IsDisplay {}

export const TradingMarketList = memo(
   ({ translate, display }: TradingMarketListProps) => {
      const {
         currentBidUnit,
         setCurrentBidUnit,
         currentBidUnitsList,
         filterMarkets,
         handleRedirectToTrading,
         handleSearchMarket,
         isLoading,
         handleToSetFavorites,
         currentMarket,
      } = useMarket();

      const Ref = useRef<HTMLDivElement>(null);
      const handleNextBid = () => {
         if (Ref.current) {
            Ref.current.scrollLeft += 80;
         }
      };

      const handleLocalStorageChange = (
         e: React.MouseEvent<SVGSVGElement, MouseEvent>,
         id: string
      ) => {
         e.stopPropagation();
         handleToSetFavorites(e, id);
      };

      return (
         <div
            className={`w-64 space-y-1 lg:!block lg2:shrink-0 lg-max:float-none ${
               display ? '' : 'lg-max:hidden'
            } lg-max:w-full lg2-max:float-left`}>
            <div className="h-full space-y-1">
               <div className="relative h-1/2 rounded bg-neutral8 p-4 dark:bg-shade2">
                  <div
                     className="absolute right-1.5 top-4.5"
                     onClick={handleNextBid}>
                     <svg className="h-6 w-6 cursor-pointer fill-neutral4 transition-all duration-300">
                        <use xlinkHref="#icon-arrow-right" />
                     </svg>
                  </div>
                  <div
                     ref={Ref}
                     className="!-pb-4 flex items-center space-x-2 overflow-x-auto scroll-smooth"
                     id="list-pair-market">
                     {currentBidUnitsList.length > 2 ? (
                        currentBidUnitsList.map((bid, index) => (
                           <Nav
                              key={index}
                              title={
                                 bid
                                    ? bid.toUpperCase()
                                    : translate(
                                         'page.body.marketsTable.filter.all'
                                      )
                              }
                              isActive={bid === currentBidUnit}
                              onClick={() => setCurrentBidUnit(bid)}
                              theme="grey"
                           />
                        ))
                     ) : (
                        <Nav
                           title="Reload Page"
                           isActive
                           onClick={() => window.location.reload()}
                           theme="grey"
                        />
                     )}
                  </div>
                  <form className="relative my-3">
                     <input
                        type="search"
                        onChange={handleSearchMarket}
                        placeholder="Search"
                        className="h-10 w-full appearance-none rounded-lg border-2 border-neutral6 bg-transparent bg-none py-0 pl-3.5 pr-10 text-xs shadow-none outline-none transition-colors duration-200 dark:border-neutral3 dark:text-neutral8"
                     />
                     <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center">
                        <svg className="h-5 w-5 fill-neutral4 transition-all duration-200">
                           <use xlinkHref="#icon-search" />
                        </svg>
                     </button>
                  </form>
                  <div className="hide-scroll block max-h-97 overflow-x-auto overflow-y-auto">
                     <table className="w-full table-auto">
                        <thead className="sticky top-0 bg-neutral8 dark:bg-shade2">
                           <tr>
                              <th className="p-1 pb-3 pl-0 text-left text-xs font-semibold leading-custom4 text-neutral4">
                                 {translate(
                                    'page.body.trade.header.markets.content.pair'
                                 )}
                                 {/* <div className='flex space-x-1 items-center'>
                                 <div className='cursor-pointer'>
                                 </div>
                                 <IcShorting className='fill-neutral4 cursor-pointer' />
                              </div> */}
                              </th>
                              <th className="p-1 pb-3 text-right text-xs font-semibold leading-custom4 text-neutral4">
                                 {translate(
                                    'page.body.trade.header.markets.content.price'
                                 )}
                                 {/* <div className='flex space-x-1 items-center justify-end'>
                                 <div className='cursor-pointer'>
                                 </div>
                                 <IcShorting className='fill-neutral4 cursor-pointer' />
                              </div> */}
                              </th>
                              <th className="p-1 pb-3 pr-0 text-right text-xs font-semibold leading-custom4 text-neutral4">
                                 %
                                 {/* <div className='flex space-x-1 items-center justify-end'>
                                 <div className='cursor-pointer'>
                                 </div>
                                 <IcShorting className='fill-neutral4 cursor-pointer' />
                              </div> */}
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {isLoading ? (
                              <>
                                 <tr>
                                    <td
                                       colSpan={3}
                                       className="p-1 pl-0 align-middle text-xs font-medium leading-custom4 transition-all duration-300">
                                       <div className="h-6 w-full animate-pulse rounded-xl bg-neutral6 dark:bg-neutral3" />
                                    </td>
                                 </tr>
                                 <tr>
                                    <td
                                       colSpan={3}
                                       className="p-1 pl-0 align-middle text-xs font-medium leading-custom4 transition-all duration-300">
                                       <div className="h-6 w-full animate-pulse rounded-xl bg-neutral6 dark:bg-neutral3" />
                                    </td>
                                 </tr>
                                 <tr>
                                    <td
                                       colSpan={3}
                                       className="p-1 pl-0 align-middle text-xs font-medium leading-custom4 transition-all duration-300">
                                       <div className="h-6 w-full animate-pulse rounded-xl bg-neutral6 dark:bg-neutral3" />
                                    </td>
                                 </tr>
                              </>
                           ) : filterMarkets && filterMarkets.length ? (
                              filterMarkets.map(
                                 ({
                                    id,
                                    name,
                                    last,
                                    price_change_percent,
                                    isFav,
                                 }) => (
                                    <tr
                                       key={id}
                                       onClick={() =>
                                          handleRedirectToTrading(id)
                                       }
                                       style={{ transition: 'background .2s' }}
                                       className="group font-urw-din-500">
                                       <td
                                          className={`cursor-pointer rounded-l-sm p-1 pl-0 align-middle text-xs font-medium leading-custom4 ${
                                             currentMarket?.id === id
                                                ? 'bg-primary1 bg-opacity-20'
                                                : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'
                                          } transition-all duration-300`}>
                                          <div className="flex items-center space-x-1">
                                             <svg
                                                className={`h-4 w-4 ${
                                                   isFav
                                                      ? 'fill-secondary3'
                                                      : 'fill-neutral4 hover:fill-secondary3'
                                                } transition-all duration-300`}
                                                onClick={e =>
                                                   handleLocalStorageChange(
                                                      e,
                                                      id
                                                   )
                                                }>
                                                <use
                                                   xlinkHref={`${
                                                      isFav
                                                         ? '#icon-star'
                                                         : '#icon-star-outline'
                                                   }`}
                                                />
                                             </svg>
                                             <div className="whitespace-nowrap">
                                                {name?.split('/').shift()}
                                                <span className="text-neutral4">
                                                   {' '}
                                                   /{name?.split('/').pop()}
                                                </span>
                                             </div>
                                          </div>
                                       </td>
                                       <td
                                          className={`cursor-pointer p-1 align-middle text-xs font-medium leading-custom4 ${
                                             currentMarket?.id === id
                                                ? 'bg-primary1 bg-opacity-20'
                                                : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'
                                          } transition-all duration-300`}>
                                          <div
                                             className={`
                                          text-right
                                          ${
                                             price_change_percent.includes('+')
                                                ? 'text-primary5'
                                                : 'text-primary4'
                                          }`}>
                                             {last}
                                             {/* {Number(String(last).split('.').pop()?.length) > 3 ? truncateMiddle(last, 5) : last} */}
                                          </div>
                                       </td>
                                       <td
                                          className={`cursor-pointer rounded-r-sm p-1 pr-0 align-middle text-xs font-medium leading-custom4 ${
                                             currentMarket?.id === id
                                                ? 'bg-primary1 bg-opacity-20'
                                                : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'
                                          } transition-all duration-300`}>
                                          <div
                                             className={`
                                          text-right
                                          ${
                                             price_change_percent.includes('+')
                                                ? 'text-primary5'
                                                : 'text-primary4'
                                          }`}>
                                             {price_change_percent}
                                          </div>
                                       </td>
                                    </tr>
                                 )
                              )
                           ) : (
                              <tr>
                                 <td
                                    colSpan={3}
                                    className="p-1 pl-0 align-middle text-xs font-medium leading-custom4 transition-all duration-300">
                                    <div className="text-center">
                                       Market can't be found..
                                    </div>
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
               <div className="h-1/2 rounded bg-neutral8 p-4 dark:bg-shade2">
                  <Nav
                     title="Market trades"
                     theme="grey"
                     isActive
                  />
                  <div className="hide-scroll mt-3 h-97 overflow-auto">
                     <TableMarketTrades />
                  </div>
               </div>
            </div>
         </div>
      );
   }
);
