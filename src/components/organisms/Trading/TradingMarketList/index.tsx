import React, { FC, memo, useRef } from 'react';
import { useMarket } from 'hooks';
import { Nav, TableMarketTrades } from 'components';
import { IcShorting } from 'assets';

interface TradingMarketListProps {
   translate: (id: string) => string;
}

export const TradingMarketList: FC<TradingMarketListProps> = memo(({ translate }) => {
   const {
      currentBidUnit,
      setCurrentBidUnit,
      currentBidUnitsList,
      marketsData,
      handleRedirectToTrading,
      handleSearchMarket,
      isLoading,
      handleToSetFavorites,
      currentMarket
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
      handleToSetFavorites(id);
   };

   // type Data = typeof marketsData;

   // type SortKeys = keyof Data[0];

   // type SortOrder = 'ascn' | 'desc';

   // function sortData({
   //    tableData,
   //    sortKey,
   //    reverse,
   // }: {
   //    tableData: Data;
   //    sortKey: SortKeys;
   //    reverse: boolean;
   // }) {
   //    if (!sortKey) return tableData;

   //    const sortedData = marketsData.sort((a, b) => {
   //       return a[sortKey] > b[sortKey] ? 1 : -1;
   //    });

   //    if (reverse) {
   //       return sortedData.reverse();
   //    }

   //    return sortedData;
   // }

   // function SortButton({
   //    sortOrder,
   //    columnKey,
   //    sortKey,
   //    onClick,
   // }: {
   //    sortOrder: SortOrder;
   //    columnKey: SortKeys;
   //    sortKey: SortKeys;
   //    onClick: MouseEventHandler<HTMLButtonElement>;
   // }) {
   //    return (
   //       <button
   //          onClick={onClick}
   //          className={`${sortKey === columnKey && sortOrder === "desc"
   //             ? "sort-button sort-reverse"
   //             : "sort-button"
   //             }`}
   //       >
   //          ▲
   //       </button>
   //    );
   // }

   // const [sortKey, setSortKey] = useState<SortKeys>('position');
   // const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');

   // const headers: { key: SortKeys; label: string }[] = [
   //    { key: 'name', label: translate('page.body.trade.header.markets.content.pair') },
   //    { key: 'last', label: translate('page.body.trade.header.markets.content.price') },
   //    { key: 'price_change_percent', label: translate('page.body.trade.header.markets.content.change') },
   // ];

   // const sortedData = useCallback(() => sortData({
   //    tableData: marketsData,
   //    sortKey,
   //    reverse: sortOrder === 'desc'
   // }), [
   //    marketsData,
   //    sortKey,
   //    sortOrder
   // ]);

   // function changeSort(key: SortKeys) {
   //    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
   //    setSortKey(key);
   // }


   return (
      <div className='bg-neutral7 lg:block float-none lg2:float-left shrink-0 w-full lg:w-64'>
         <div className="h-full space-y-1">
            <div className="h-1/2 relative bg-neutral8 dark:bg-shade2 p-4 rounded">
               <div
                  className="absolute top-[1px] right-1.5"
                  onClick={handleNextBid}
               >
                  <svg className="w-6 h-6 fill-neutral4 transition-all duration-300 cursor-pointer">
                     <use xlinkHref="#icon-arrow-right" />
                  </svg>
               </div>
               <div
                  ref={Ref}
                  className='flex items-center space-x-2 !-pb-4 overflow-x-auto scroll-smooth'
                  id='list-pair-market'
               >
                  {currentBidUnitsList.length > 2 ? (
                     currentBidUnitsList.map((bid, index) => (
                        <Nav
                           key={index}
                           title={
                              bid
                                 ? bid.toUpperCase()
                                 : translate('page.body.marketsTable.filter.all')
                           }
                           isActive={bid === currentBidUnit}
                           onClick={() => setCurrentBidUnit(bid)}
                           theme='grey'
                        />
                     ))) : (
                     <Nav
                        title="Reload Page"
                        isActive
                        onClick={() => window.location.reload()}
                        theme='grey'
                     />
                  )}
               </div>
               <form className='relative my-3'>
                  <input
                     type="search"
                     onChange={handleSearchMarket}
                     placeholder="Search"
                     className='w-full h-10 py-0 pl-3.5 pr-10 rounded-lg bg-none border-2 border-neutral6 dark:border-neutral3 bg-transparent text-xs appearance-none shadow-none outline-none transition-colors duration-200 dark:text-neutral8'
                  />
                  <button
                     type="button"
                     className='absolute inset-y-0 right-0 w-10 flex justify-center items-center'
                  >
                     <svg className='w-5 h-5 fill-neutral4 transition-all duration-200'>
                        <use xlinkHref='#icon-search' />
                     </svg>
                  </button>
               </form>
               <div className='overflow-x-auto block max-h-97 overflow-y-auto hide-scroll'>
                  <table className='w-full table-auto'>
                     <thead className='sticky top-0 bg-neutral8 dark:bg-shade2'>
                        <tr>
                           <th className='p-1 pb-3 pl-0 text-xs leading-custom4 font-semibold text-neutral4'>
                              <div className='flex space-x-1 items-center'>
                                 <div className='cursor-pointer'>
                                    {translate('page.body.trade.header.markets.content.pair')}
                                 </div>
                                 <IcShorting className='fill-neutral4 cursor-pointer' />
                              </div>
                           </th>
                           <th className='p-1 pb-3 text-xs leading-custom4 font-semibold text-neutral4'>
                              <div className='flex space-x-1 items-center justify-end'>
                                 <div className='cursor-pointer'>
                                    {translate('page.body.trade.header.markets.content.price')}
                                 </div>
                                 <IcShorting className='fill-neutral4 cursor-pointer' />
                              </div>
                           </th>
                           <th className='p-1 pb-3 pr-0 text-xs leading-custom4 font-semibold text-neutral4'>
                              <div className='flex space-x-1 items-center justify-end'>
                                 <div className='cursor-pointer'>
                                    {translate('page.body.trade.header.markets.content.change')}
                                 </div>
                                 <IcShorting className='fill-neutral4 cursor-pointer' />
                              </div>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {isLoading ? (
                           <>
                              <tr>
                                 <td
                                    colSpan={3}
                                    className='align-middle font-medium text-xs p-1 pl-0 leading-custom4 transition-all duration-300'
                                 >
                                    <div className='h-6 rounded-xl bg-neutral6 dark:bg-neutral3 animate-pulse w-full' />
                                 </td>
                              </tr>
                              <tr>
                                 <td
                                    colSpan={3}
                                    className='align-middle font-medium text-xs p-1 pl-0 leading-custom4 transition-all duration-300'
                                 >
                                    <div className='h-6 rounded-xl bg-neutral6 dark:bg-neutral3 animate-pulse w-full' />
                                 </td>
                              </tr>
                              <tr>
                                 <td
                                    colSpan={3}
                                    className='align-middle font-medium text-xs p-1 pl-0 leading-custom4 transition-all duration-300'
                                 >
                                    <div className='h-6 rounded-xl bg-neutral6 dark:bg-neutral3 animate-pulse w-full' />
                                 </td>
                              </tr>
                           </>
                        ) : marketsData && marketsData.length ? (
                           marketsData.map(
                              ({ id, name, last, price_change_percent, isFav }) => (
                                 <tr
                                    key={id}
                                    onClick={() => handleRedirectToTrading(id)}
                                    style={{ transition: 'background .2s' }}
                                    className='group'
                                 >
                                    <td className={`cursor-pointer rounded-l-sm align-middle font-medium text-xs p-1 pl-0 leading-custom4 ${currentMarket?.id === id ? 'bg-primary1 bg-opacity-20' : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'} transition-all duration-300`}>
                                       <div className='flex space-x-1 items-center'>
                                          <svg
                                             className={`w-4 h-4 ${isFav
                                                ? 'fill-secondary3'
                                                : 'fill-neutral4 hover:fill-secondary3'
                                                } transition-all duration-300`}
                                             onClick={e => handleLocalStorageChange(e, id)}
                                          >
                                             <use xlinkHref={`${isFav ? '#icon-star' : '#icon-star-outline'}`} />
                                          </svg>
                                          <div className="whitespace-nowrap">
                                             {name?.split('/').shift()}
                                             <span className='text-neutral4'>
                                                {' '}
                                                /{name?.split('/').pop()}
                                             </span>
                                          </div>
                                       </div>
                                    </td>
                                    <td className={`cursor-pointer align-middle font-medium text-xs p-1 leading-custom4 ${currentMarket?.id === id ? 'bg-primary1 bg-opacity-20' : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'} transition-all duration-300`}>
                                       <div
                                          className={`
                                          text-right
                                          ${price_change_percent.includes('+')
                                                ? 'text-primary5'
                                                : 'text-primary4'
                                             }`}
                                       >
                                          {last}
                                       </div>
                                    </td>
                                    <td className={`cursor-pointer rounded-r-sm align-middle font-medium text-xs p-1 pr-0 leading-custom4 ${currentMarket?.id === id ? 'bg-primary1 bg-opacity-20' : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'} transition-all duration-300`}>
                                       <div
                                          className={`
                                          text-right
                                          ${price_change_percent.includes('+')
                                                ? 'text-primary5'
                                                : 'text-primary4'
                                             }`}
                                       >
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
                                 className='align-middle font-medium text-xs p-1 pl-0 leading-custom4 transition-all duration-300'
                              >
                                 <div className='text-center'>Market can't be found..</div>
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
            <div className="h-1/2 bg-neutral8 dark:bg-shade2 p-4 rounded">
               <Nav
                  title="Market trades"
                  theme="grey"
                  isActive
               />
               <div className="overflow-auto h-97 hide-scroll mt-3">
                  <TableMarketTrades />
               </div>
            </div>
         </div>
      </div>
   );
});
{/* <div className="overflow-x-auto block max-h-830 overflow-y-auto hide-scroll">
            <table className="w-full table-auto">
               <thead className="sticky top-0 bg-neutral8 dark:bg-shade2">
                  <tr>
                     {headers.map((row, index) => {
                        return (
                           <th
                              key={index}
                              className="p-1 pb-3 pl-0 text-xs leading-custom4 font-semibold text-neutral4"
                           >
                              {row.label}{" "}
                              <SortButton
                                 columnKey={row.key}
                                 onClick={() => changeSort(row.key)}
                                 {...{
                                    sortOrder,
                                    sortKey,
                                 }}
                              />
                           </th>
                        );
                     })}
                  </tr>
               </thead>

               <tbody>
                  {sortedData().map(({ id, name, last, price_change_percent, isFav }) => {
                     return (
                        <tr
                           key={id}
                           onClick={() => handleRedirectToTrading(id)}
                           style={{ transition: 'background .2s' }}
                           className='group'
                        >
                           <td className={`cursor-pointer rounded-l-sm align-middle font-medium text-xs p-1 pl-0 leading-custom4 ${currentMarket?.id === id ? 'bg-primary1 bg-opacity-20' : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'} transition-all duration-300`}>
                              <div className='flex space-x-1 items-center'>
                                 <svg
                                    className={`w-4 h-4 ${isFav
                                       ? 'fill-secondary3'
                                       : 'fill-neutral4 hover:fill-secondary3'
                                       } transition-all duration-300`}
                                    onClick={e => handleLocalStorageChange(e, id)}
                                 >
                                    <use xlinkHref={`${isFav ? '#icon-star' : '#icon-star-outline'}`} />
                                 </svg>
                                 <div className="whitespace-nowrap">
                                    {name.split('/').shift()}
                                    <span className='text-neutral4'>
                                       {' '}
                                       /{name.split('/').pop()}
                                    </span>
                                 </div>
                              </div>
                           </td>
                           <td className={`cursor-pointer align-middle font-medium text-xs p-1 leading-custom4 ${currentMarket?.id === id ? 'bg-primary1 bg-opacity-20' : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'} transition-all duration-300`}>
                              <div
                                 className={`
                                          text-right
                                          ${price_change_percent.includes('+')
                                       ? 'text-primary5'
                                       : 'text-primary4'
                                    }`}
                              >
                                 {last}
                              </div>
                           </td>
                           <td className={`cursor-pointer rounded-r-sm align-middle font-medium text-xs p-1 pr-0 leading-custom4 ${currentMarket?.id === id ? 'bg-primary1 bg-opacity-20' : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'} transition-all duration-300`}>
                              <div
                                 className={`
                                          text-right
                                          ${price_change_percent.includes('+')
                                       ? 'text-primary5'
                                       : 'text-primary4'
                                    }`}
                              >
                                 {price_change_percent}
                              </div>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div> */}


// export const TradingMarketList: FC<TradingMarketListProps> = memo(({ translate }) => {
//    const {
//       currentBidUnit,
//       setCurrentBidUnit,
//       currentBidUnitsList,
//       marketsData,
//       handleRedirectToTrading,
//       handleSearchMarket,
//       isLoading,
//       handleToSetFavorites,
//       currentMarket
//    } = useMarket();

//    const Ref = useRef<HTMLDivElement>(null);
//    const handleNextBid = () => {
//       if (Ref.current) {
//          Ref.current.scrollLeft += 80;
//       }
//    };

//    const handleLocalStorageChange = (
//       e: React.MouseEvent<SVGSVGElement, MouseEvent>,
//       id: string
//    ) => {
//       e.stopPropagation();
//       handleToSetFavorites(id);
//    };

//    return (
//       <div className='float-none lg2:float-left shrink-0 w-full lg:w-64'>
//          <div className="h-1/2 bg-neutral8 dark:bg-shade2 p-4 rounded relative">
//             <div
//                className="absolute top-[1px] right-1.5"
//                onClick={handleNextBid}
//             >
//                <svg className="w-6 h-6 fill-neutral4 transition-all duration-300 cursor-pointer">
//                   <use xlinkHref="#icon-arrow-right" />
//                </svg>
//             </div>
//             <div
//                ref={Ref}
//                className='flex items-center space-x-2 !-pb-4 overflow-x-auto scroll-smooth'
//                id='list-pair-market'
//             >
//                {currentBidUnitsList.length > 2 ? (
//                   currentBidUnitsList.map((bid, index) => (
//                      <Nav
//                         key={index}
//                         title={
//                            bid
//                               ? bid.toUpperCase()
//                               : translate('page.body.marketsTable.filter.all')
//                         }
//                         isActive={bid === currentBidUnit}
//                         onClick={() => setCurrentBidUnit(bid)}
//                         theme='grey'
//                      />
//                   ))) : (
//                   <Nav
//                      title="Reload Page"
//                      isActive
//                      onClick={() => window.location.reload()}
//                      theme='grey'
//                   />
//                )}
//             </div>
//             <form className='relative my-3'>
//                <input
//                   type="search"
//                   onChange={handleSearchMarket}
//                   placeholder="Search"
//                   className='w-full h-10 py-0 pl-3.5 pr-10 rounded-lg bg-none border-2 border-neutral6 dark:border-neutral3 bg-transparent text-xs appearance-none shadow-none outline-none transition-colors duration-200 dark:text-neutral8'
//                />
//                <button
//                   type="button"
//                   className='absolute inset-y-0 right-0 w-10 flex justify-center items-center'
//                >
//                   <svg className='w-5 h-5 fill-neutral4 transition-all duration-200'>
//                      <use xlinkHref='#icon-search' />
//                   </svg>
//                </button>
//             </form>
//             <div className='overflow-x-auto block max-h-830 overflow-y-auto hide-scroll'>
//                <table className='w-full table-auto'>
//                   <thead className='sticky top-0 bg-neutral8 dark:bg-shade2'>
//                      <tr>
//                         <th className='p-1 pb-3 pl-0 text-xs leading-custom4 font-semibold text-neutral4'>
//                            <div className='flex space-x-1 items-center'>
//                               <div className='cursor-pointer'>
//                                  {translate('page.body.trade.header.markets.content.pair')}
//                               </div>
//                               <IcShorting className='fill-neutral4 cursor-pointer' />
//                            </div>
//                         </th>
//                         <th className='p-1 pb-3 text-xs leading-custom4 font-semibold text-neutral4'>
//                            <div className='flex space-x-1 items-center justify-end'>
//                               <div className='cursor-pointer'>
//                                  {translate('page.body.trade.header.markets.content.price')}
//                               </div>
//                               <IcShorting className='fill-neutral4 cursor-pointer' />
//                            </div>
//                         </th>
//                         <th className='p-1 pb-3 pr-0 text-xs leading-custom4 font-semibold text-neutral4'>
//                            <div className='flex space-x-1 items-center justify-end'>
//                               <div className='cursor-pointer'>
//                                  {translate('page.body.trade.header.markets.content.change')}
//                               </div>
//                               <IcShorting className='fill-neutral4 cursor-pointer' />
//                            </div>
//                         </th>
//                      </tr>
//                   </thead>
//                   <tbody>
//                      {isLoading ? (
//                         <>
//                            <tr>
//                               <td
//                                  colSpan={3}
//                                  className='align-middle font-medium text-xs p-1 pl-0 leading-custom4 transition-all duration-300'
//                               >
//                                  <div className='h-6 rounded-xl bg-neutral6 dark:bg-neutral3 animate-pulse w-full' />
//                               </td>
//                            </tr>
//                            <tr>
//                               <td
//                                  colSpan={3}
//                                  className='align-middle font-medium text-xs p-1 pl-0 leading-custom4 transition-all duration-300'
//                               >
//                                  <div className='h-6 rounded-xl bg-neutral6 dark:bg-neutral3 animate-pulse w-full' />
//                               </td>
//                            </tr>
//                            <tr>
//                               <td
//                                  colSpan={3}
//                                  className='align-middle font-medium text-xs p-1 pl-0 leading-custom4 transition-all duration-300'
//                               >
//                                  <div className='h-6 rounded-xl bg-neutral6 dark:bg-neutral3 animate-pulse w-full' />
//                               </td>
//                            </tr>
//                         </>
//                      ) : marketsData && marketsData.length ? (
//                         marketsData.map(
//                            ({ id, name, last, price_change_percent, isFav }) => (
//                               <tr
//                                  key={id}
//                                  onClick={() => handleRedirectToTrading(id)}
//                                  style={{ transition: 'background .2s' }}
//                                  className='group'
//                               >
//                                  <td className={`cursor-pointer rounded-l-sm align-middle font-medium text-xs p-1 pl-0 leading-custom4 ${currentMarket?.id === id ? 'bg-primary1 bg-opacity-20' : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'} transition-all duration-300`}>
//                                     <div className='flex space-x-1 items-center'>
//                                        <svg
//                                           className={`w-4 h-4 ${isFav
//                                              ? 'fill-secondary3'
//                                              : 'fill-neutral4 hover:fill-secondary3'
//                                              } transition-all duration-300`}
//                                           onClick={e => handleLocalStorageChange(e, id)}
//                                        >
//                                           <use xlinkHref={`${isFav ? '#icon-star' : '#icon-star-outline'}`} />
//                                        </svg>
//                                        <div className="whitespace-nowrap">
//                                           {name?.split('/').shift()}
//                                           <span className='text-neutral4'>
//                                              {' '}
//                                              /{name?.split('/').pop()}
//                                           </span>
//                                        </div>
//                                     </div>
//                                  </td>
//                                  <td className={`cursor-pointer align-middle font-medium text-xs p-1 leading-custom4 ${currentMarket?.id === id ? 'bg-primary1 bg-opacity-20' : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'} transition-all duration-300`}>
//                                     <div
//                                        className={`
//                                           text-right
//                                           ${price_change_percent.includes('+')
//                                              ? 'text-primary5'
//                                              : 'text-primary4'
//                                           }`}
//                                     >
//                                        {last}
//                                     </div>
//                                  </td>
//                                  <td className={`cursor-pointer rounded-r-sm align-middle font-medium text-xs p-1 pr-0 leading-custom4 ${currentMarket?.id === id ? 'bg-primary1 bg-opacity-20' : 'group-hover:bg-neutral7 dark:group-hover:bg-neutral2'} transition-all duration-300`}>
//                                     <div
//                                        className={`
//                                           text-right
//                                           ${price_change_percent.includes('+')
//                                              ? 'text-primary5'
//                                              : 'text-primary4'
//                                           }`}
//                                     >
//                                        {price_change_percent}
//                                     </div>
//                                  </td>
//                               </tr>
//                            )
//                         )
//                      ) : (
//                         <tr>
//                            <td
//                               colSpan={3}
//                               className='align-middle font-medium text-xs p-1 pl-0 leading-custom4 transition-all duration-300'
//                            >
//                               <div className='text-center'>Market can't be found..</div>
//                            </td>
//                         </tr>
//                      )}
//                   </tbody>
//                </table>
//             </div>
//          </div>
//          <div className="h-1/2 bg-neutral8 dark:bg-shade2 p-4 rounded mt-1 space-y-3">
//             <Nav
//                title="Market trades"
//                theme="grey"
//                isActive
//             />
//             <TableMarketTrades />
//          </div>
//       </div>
//    );
// });
