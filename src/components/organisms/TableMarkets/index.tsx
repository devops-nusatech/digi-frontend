/* eslint-disable no-restricted-globals */
import React, {
   MouseEvent,
   ReactElement,
   memo,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { IcEmty } from 'assets';
import {
   AdibDropdown,
   Button,
   InputGroup,
   Paginations,
   PriceChart2,
   Skeleton,
   TextXs,
   ThSort,
} from 'components';
import { renderCurrencyIcon } from 'helpers';
import { useSortable, useTable } from 'hooks';
import { Market, Ticker } from 'modules';
import { IsLoading, Translate } from 'types';

interface MarketTicker extends Market, Ticker {
   no: number;
   change: string;
   isFav: boolean;
}

interface TableMarketsProps extends Translate, IsLoading {
   markets: MarketTicker[];
   handleToSetFavorites: (
      e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
      id: string
   ) => void;
   handleRedirectToTrading: (id: string) => void;
}

const show = [5, 10, 20, 30, 40, 50, 75, 100];

export const TableMarkets = memo(function TableMarkets({
   isLoading,
   markets,
   handleToSetFavorites,
   handleRedirectToTrading,
   translate,
}: TableMarketsProps) {
   const [q, setQ] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(show[0]);

   const { range, slice } = useTable(markets, currentPage, rowsPerPage);
   const [items, requestSort, classNameFor] = useSortable(slice);

   let formatMarkets = useMemo(() => items, [items]);
   const searchMarkets = useMemo(
      () =>
         formatMarkets.filter(e =>
            e.fullname.toLowerCase().includes(q.toLowerCase())
         ),
      [formatMarkets, q]
   );
   if (q) {
      formatMarkets = searchMarkets;
   }

   useEffect(() => {
      if (currentPage && !formatMarkets.length) {
         setCurrentPage(1);
      }
   }, [currentPage, formatMarkets.length]);

   const renderSkeleton = useMemo(() => {
      const items1: ReactElement[] = [];
      for (let e = 0; e < 8; e++) {
         items1.push(
            <td
               key={e}
               className="p-4">
               <Skeleton
                  height={20}
                  isWithFull
               />
            </td>
         );
      }

      const items: ReactElement[] = [];
      for (let i = 0; i < 3; i++) {
         items.push(<tr key={i}>{items1}</tr>);
      }

      return items;
   }, [isLoading]);

   return (
      <div className="space-y-8 overflow-x-auto">
         <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-3">
               <TextXs
                  font="semibold"
                  text="Show"
               />
               <AdibDropdown
                  size="normal"
                  data={show.map(String)}
                  onChange={setRowsPerPage}
               />
            </div>
            <InputGroup
               autoFocus
               parentClassName="w-69"
               size="normal"
               placeholder="Search assets..."
               withIconSearch
               onChange={setQ}
            />
         </div>
         <table className="w-full table-auto">
            <thead>
               <tr>
                  <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <ThSort
                        title="#"
                        onClick={() => requestSort('no')}
                        classNameFor={classNameFor('no')}
                     />
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <ThSort
                        title="Name"
                        onClick={() => requestSort('fullname')}
                        classNameFor={classNameFor('fullname')}
                     />
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-8 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <ThSort
                        title="Price"
                        onClick={() => requestSort('last')}
                        classNameFor={classNameFor('last')}
                     />
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-8 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <div>24h %</div>
                  </th>
                  <th className="hidden border-b border-neutral6 px-4 pb-8 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <div>7d %</div>
                  </th>
                  <th className="hidden border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <div className="flex cursor-pointer items-center justify-end gap-1">
                        <div>Marketcap</div>
                        <svg className="h-5 w-5 fill-neutral4">
                           <use xlinkHref="#icon-coin" />
                        </svg>
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <div className="flex cursor-pointer items-center justify-end gap-1">
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
                  renderSkeleton
               ) : formatMarkets?.length ? (
                  formatMarkets?.map(market => {
                     const klinesData = market?.kline!;
                     const labels = klinesData?.map(e => e[0]);
                     const data = klinesData?.map(e => e[2]);
                     return (
                        <tr
                           key={market?.id}
                           style={{ transition: 'background .2s' }}
                           className="group relative">
                           <td className="rounded-l-xl p-4 align-middle text-xs font-semibold leading-custom4 text-neutral4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div className="flex items-center space-x-2">
                                 <svg
                                    onClick={e =>
                                       handleToSetFavorites(e, market?.id)
                                    }
                                    className={`h-4 w-4 cursor-pointer ${
                                       market?.isFav
                                          ? 'fill-secondary3'
                                          : 'fill-neutral4 hover:fill-secondary3'
                                    } transition-all duration-300`}>
                                    <use
                                       xlinkHref={`#icon-star${
                                          market?.isFav ? '' : '-outline'
                                       }`}
                                    />
                                 </svg>
                                 <div>{market?.no}</div>
                              </div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div className="inline-flex items-center space-x-3">
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
                                 <div className="flex items-center gap-1">
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
                                    /\+/.test(market?.price_change_percent)
                                       ? 'text-primary5 dark:text-chart1'
                                       : 'text-primary4'
                                 }>
                                 {market?.price_change_percent}
                              </div>
                           </td>
                           <td className="hidden p-4 text-right align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div className="text-primary4">-2.02%</div>
                           </td>
                           <td className="hidden p-4 text-right align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div>$328,564,656,654</div>
                           </td>
                           <td className="p-4 text-right align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div>{market?.volume}</div>
                           </td>
                           <td className="rounded-r-xl p-4 text-right align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div className="-my-1.25 ml-auto w-25 group-hover:hidden">
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
                              <div className="ml-auto hidden w-24 group-hover:block">
                                 <Button
                                    text="Buy"
                                    size="normal"
                                    onClick={() =>
                                       handleRedirectToTrading(market?.id)
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
                           <TextXs
                              text={translate('noResultFound')}
                              font="semibold"
                           />
                        </div>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
         <div className="flex items-center justify-between">
            <TextXs
               text={`Showing ${formatMarkets.map(e => e.no).shift() || 0} to ${
                  formatMarkets.map(e => e.no).pop() || 0
               } of ${markets.length} results`}
            />
            <Paginations
               currentPage={currentPage}
               lastPage={range.length}
               setCurrentPage={setCurrentPage}
            />
         </div>
      </div>
   );
});
