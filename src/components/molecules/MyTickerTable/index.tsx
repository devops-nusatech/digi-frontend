import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Market } from 'modules';
import { Button, Decimal } from 'components';
// import jQuery from 'jquery';
import {
   icBitcoin,
   icDash,
   icEthereum,
   icRipple,
   // icBitcoinCash,
   // icChainlink,
   // icEthereum,
   // icRipple
} from 'assets';
// import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { useTable, usePagination, useSortBy } from 'react-table';
import { useHistory } from 'react-router';
import { removeClass } from 'helpers';
// import styled from 'styled-components'

interface Props {
   currentBidUnit: string;
   currentBidUnitsList: string[];
   markets: Market[];
   redirectToTrading: (key: string) => void;
   setCurrentBidUnit: (key: string) => void;
}

const optionsPositive = {
   chart: {
      renderTo: null,
      defaultSeriesType: 'column',
      type: 'areaspline',
      height: 70,
      width: 136,
      backgroundColor: 'none',
   },
   title: {
      text: null,
   },
   legend: false,
   credits: false,
   xAxis: {
      visible: false,
   },
   yAxis: {
      visible: false,
   },
   tooltip: {
      backgroundColor: '#a3a3a3',
      borderColor: 'none',
      borderWidth: 0,
      shadow: false,
      // crosshairs: false,
      // enabled: false,
      outside: 'none',
      borderRadius: 30,
      style: {
         color: '#fcfcf5',
         fontSize: 16,
         whiteSpace: 'nowrap',
      },
   },
   plotOptions: {
      areaspline: {
         lineWidth: 2,
         states: {
            hover: {
               lineWidth: 2,
            },
         },
         marker: false,
         fillColor: {
            linearGradient: [0, 0, 0, '80%'],
            stops: [
               [0, Highcharts.color('#58BD7D').setOpacity(0.4).get('rgba')],
               [1, Highcharts.color('#58BD7D').setOpacity(0).get('rgba')],
            ],
         },
      },
   },
   series: [
      {
         data: [3, 4, 3, 5, 4, 10, 12, 6, 3],
         color: '#58BD7D',
      },
   ],
};

const optionsNegative = {
   chart: {
      renderTo: null,
      defaultSeriesType: 'column',
      type: 'areaspline',
      height: 70,
      width: 136,
      backgroundColor: 'none',
   },
   title: {
      text: null,
   },
   legend: false,
   credits: false,
   xAxis: {
      visible: false,
   },
   yAxis: {
      visible: false,
   },
   tooltip: {
      backgroundColor: '#a3a3a3',
      borderColor: 'none',
      borderWidth: 0,
      shadow: false,
      // crosshairs: false,
      // enabled: false,
      outside: 'none',
      borderRadius: 30,
      style: {
         color: '#fcfcf5',
         fontSize: 16,
         whiteSpace: 'nowrap',
      },
   },
   plotOptions: {
      areaspline: {
         lineWidth: 2,
         states: {
            hover: {
               lineWidth: 2,
            },
         },
         marker: false,
         fillColor: {
            linearGradient: [0, 0, 0, '80%'],
            stops: [
               [0, Highcharts.color('#FF6838').setOpacity(0.4).get('rgba')],
               [1, Highcharts.color('#FF6838').setOpacity(0).get('rgba')],
            ],
         },
      },
   },
   series: [
      {
         data: [4, 5, 6, 3, 3, 4, 3, 5, 4],
         color: '#FF6838',
      },
   ],
};

// const Styles = styled.div`
//   padding: 1rem;
//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `;

function Table({ columns, data }) {
   // Use the state and functions returned from useTable to build your UI
   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page

      // The rest of these things are super handy, too ;)
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
   } = useTable(
      {
         columns,
         data,
      },
      useSortBy,
      usePagination
   );

   // Render the UI for your table
   return (
      <>
         <pre>
            <code>
               {JSON.stringify(
                  {
                     pageIndex,
                     pageSize,
                     pageCount,
                     canNextPage,
                     canPreviousPage,
                  },
                  null,
                  2
               )}
            </code>
         </pre>
         <table
            {...getTableProps()}
            className="w-full table-auto border-collapse">
            <thead className="shadow-header dark:shadow-none">
               {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map(column => (
                        <th
                           {...column.getHeaderProps(
                              column.getSortByToggleProps()
                           )}
                           className="px-2 py-5 text-start align-middle font-normal text-neutral4">
                           {column.render('Header')}
                           {/* Add a sort direction indicator */}
                           <span>
                              {column.isSorted
                                 ? column.isSortedDesc
                                    ? ' 🔽'
                                    : ' 🔼'
                                 : ''}
                           </span>
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody {...getTableBodyProps()}>
               {page.map((row, i) => {
                  prepareRow(row);
                  return (
                     <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                           return (
                              <td
                                 {...cell.getCellProps()}
                                 className="px-2 align-middle text-base font-medium">
                                 {cell.render('Cell')}
                              </td>
                           );
                        })}
                     </tr>
                  );
               })}
            </tbody>
         </table>
         {/*
         Pagination can be built however you'd like.
         This is just a very basic UI implementation:
       */}
         <div className="pagination">
            <button
               onClick={() => gotoPage(0)}
               disabled={!canPreviousPage}>
               {'<<'}
            </button>{' '}
            <button
               onClick={() => previousPage()}
               disabled={!canPreviousPage}>
               {'<'}
            </button>{' '}
            <button
               onClick={() => nextPage()}
               disabled={!canNextPage}>
               {'>'}
            </button>{' '}
            <button
               onClick={() => gotoPage(pageCount - 1)}
               disabled={!canNextPage}>
               {'>>'}
            </button>{' '}
            <span>
               Page{' '}
               <strong>
                  {pageIndex + 1} of {pageOptions.length}
               </strong>{' '}
            </span>
            <span>
               | Go to page:{' '}
               <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={e => {
                     const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                     gotoPage(page);
                  }}
                  style={{ width: '100px' }}
               />
            </span>{' '}
            <select
               value={pageSize}
               onChange={e => {
                  setPageSize(Number(e.target.value));
               }}>
               {[10, 20, 30, 40, 50].map(pageSize => (
                  <option
                     key={pageSize}
                     value={pageSize}>
                     Show {pageSize}
                  </option>
               ))}
            </select>
         </div>
      </>
   );
}

export const MyTickerTable: FC<Props> = ({
   currentBidUnit,
   markets,
   setCurrentBidUnit,
   currentBidUnitsList,
   redirectToTrading,
}) => {
   useEffect(() => {
      removeClass('sc-dmRaPn');
      removeClass('gelpCx');
      removeClass('sc-fLlhyt');
      removeClass('ifOHjV');
      removeClass('sc-bczRLJ');
      removeClass('eSTlnH');
      removeClass('rdt_Table');
      removeClass('sc-gsnTZi');
      removeClass('idPHNo');
      removeClass('rdt_TableHead');
      removeClass('sc-dkzDqf');
      removeClass('gZWIKX');
      removeClass('rdt_TableHeadRow');
   }, []);
   const { formatMessage } = useIntl();
   const { push } = useHistory();
   const myColumns = useMemo(
      () => [
         {
            Header: '#',
            accessor: (markets, index) => index + 1,
         },
         {
            Header: formatMessage({ id: 'page.body.marketsTable.header.pair' }),
            accessor: ({ name }) => (
               <div className="flex items-center space-x-5">
                  <div className="w-10 shrink-0">
                     <img
                        className="max-w-full"
                        src={
                           name.split('/').shift() === 'DASH'
                              ? icDash
                              : name.split('/').shift() === 'ETH'
                              ? icEthereum
                              : name.split('/').shift() === 'BTC'
                              ? icBitcoin
                              : icRipple
                        }
                        alt={name.split('/').shift()}
                     />
                  </div>
                  <div className="flex space-x-3">
                     <div>{name.split('/').shift()}</div>
                     <div className="text-neutral5">
                        {name.split('/').pop()}
                     </div>
                  </div>
               </div>
            ),
         },
         {
            Header: formatMessage({
               id: 'page.body.marketsTable.header.lastPrice',
            }),
            accessor: ({ last, price_precision }) =>
               Decimal.format(last, price_precision, ','),
         },
         {
            Header: formatMessage({
               id: 'page.body.marketsTable.header.change',
            }),
            accessor: ({ change, price_change_percent }) => (
               <span
                  className={
                     +(change || 0) < 0 ? 'text-primary4' : 'text-chart1'
                  }>
                  {price_change_percent}
               </span>
            ),
         },
         {
            Header: formatMessage({ id: 'page.body.marketsTable.header.high' }),
            accessor: ({ high, price_precision }) =>
               Decimal.format(high, price_precision, ','),
         },
         {
            Header: formatMessage({ id: 'page.body.marketsTable.header.low' }),
            accessor: ({ low, price_precision }) =>
               Decimal.format(low, price_precision, ','),
         },
         {
            Header: formatMessage({
               id: 'page.body.marketsTable.header.volume',
            }),
            accessor: ({ low, price_precision }) =>
               Decimal.format(low, price_precision, ','),
         },
         {
            Header: 'Chart',
            accessor: ({ change }) => (
               <HighchartsReact
                  highcharts={Highcharts}
                  options={
                     +(change || 0) < 0 ? optionsNegative : optionsPositive
                  }
               />
            ),
         },
         {
            Header: 'Trade',
            accessor: ({ id }) => (
               <div
                  onClick={() => redirectToTrading(id)}
                  className="inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-20 bg-none py-0 px-4 font-dm shadow-border transition-all duration-300 hover:-translate-y-1 hover:bg-neutral2 hover:text-neutral8 hover:shadow-sm dark:border-2 dark:border-solid dark:border-neutral4 dark:text-neutral8 dark:shadow-none">
                  Trade
               </div>
            ),
         },
      ],
      []
   );
   let no = 1;
   const columns = [
      {
         name: '#',
         selector: row => no++,
         sortable: true,
      },
      {
         name: formatMessage({ id: 'page.body.marketsTable.header.pair' }),
         selector: row => row.name,
         sortable: true,
      },
      {
         name: formatMessage({ id: 'page.body.marketsTable.header.lastPrice' }),
         selector: row => Decimal.format(row.last, row.price_precision, ','),
         sortable: true,
      },
      {
         name: formatMessage({ id: 'page.body.marketsTable.header.change' }),
         selector: row => row.price_change_percent,
         sortable: true,
      },
      {
         name: formatMessage({ id: 'page.body.marketsTable.header.high' }),
         selector: row => Decimal.format(row.high, row.price_precision, ','),
         sortable: true,
      },
      {
         name: formatMessage({ id: 'page.body.marketsTable.header.low' }),
         selector: row => Decimal.format(row.low, row.price_precision, ','),
         sortable: true,
      },
      {
         name: formatMessage({ id: 'page.body.marketsTable.header.volume' }),
         selector: row => Decimal.format(row.volume, row.price_precision, ','),
         sortable: true,
      },
      {
         name: 'Chart',
         selector: row => (
            <HighchartsReact
               highcharts={Highcharts}
               options={
                  +(row.change || 0) < 0 ? optionsNegative : optionsPositive
               }
            />
         ),
         sortable: false,
      },
      {
         name: 'Trade',
         selector: row => (
            <td className="px-2 align-middle text-base font-medium">
               <div
                  onClick={() => redirectToTrading(row.id)}
                  className="inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-20 bg-none py-0 px-4 font-dm shadow-border transition-all duration-300 hover:-translate-y-1 hover:bg-neutral2 hover:text-neutral8 hover:shadow-sm dark:border-2 dark:border-solid dark:border-neutral4 dark:text-neutral8 dark:shadow-none">
                  Trade
               </div>
            </td>
         ),
         sortable: false,
      },
   ];
   const renderBody = useCallback(
      (market, index: number) => {
         const marketChangeColor =
            +(market.change || 0) < 0 ? 'text-primary4' : 'text-chart1';
         const marketChangeChart =
            +(market.change || 0) < 0 ? optionsNegative : optionsPositive;
         const marketChangeIcon = market.name.split('/').shift();
         return (
            <>
               <tr key={index}>
                  <td className="px-2 text-center align-middle text-base font-medium text-neutral4">
                     {index + 1}
                  </td>
                  <td className="px-2 align-middle text-base font-medium">
                     <div className="flex items-center space-x-5">
                        <div className="w-10 shrink-0">
                           <img
                              className="max-w-full"
                              src={
                                 marketChangeIcon === 'DASH'
                                    ? icDash
                                    : marketChangeIcon === 'ETH'
                                    ? icEthereum
                                    : marketChangeIcon === 'BTC'
                                    ? icBitcoin
                                    : icRipple
                              }
                              alt={market && market.name.split('/').shift()}
                           />
                        </div>
                        <div className="flex space-x-3">
                           <div>{market && market.name.split('/').shift()}</div>
                           <div className="text-neutral5">
                              {market && market.name.split('/').pop()}
                           </div>
                        </div>
                     </div>
                  </td>
                  <td className="px-2 align-middle text-base font-medium">
                     <Decimal
                        fixed={market?.price_precision}
                        thousSep=",">
                        {market?.last}
                     </Decimal>
                  </td>
                  <td
                     className={`px-2 align-middle text-base font-medium ${marketChangeColor}`}>
                     {market.price_change_percent}
                  </td>
                  <td className="px-2 align-middle text-base font-medium">
                     <Decimal
                        fixed={market.price_precision}
                        thousSep=",">
                        {market.high}
                     </Decimal>
                  </td>
                  <td className="px-2 align-middle text-base font-medium">
                     <Decimal
                        fixed={market.price_precision}
                        thousSep=",">
                        {market.low}
                     </Decimal>
                  </td>
                  <td className="px-2 align-middle text-base font-medium">
                     <Decimal
                        fixed={market.price_precision}
                        thousSep=",">
                        {market.volume}
                     </Decimal>
                  </td>
                  <td className="px-2 align-middle text-base font-medium">
                     <HighchartsReact
                        highcharts={Highcharts}
                        options={marketChangeChart}
                     />
                  </td>
                  <td className="px-2 align-middle text-base font-medium">
                     <div
                        onClick={() => redirectToTrading(market.id)}
                        className="inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-20 bg-none py-0 px-4 font-dm shadow-border transition-all duration-300 hover:-translate-y-1 hover:bg-neutral2 hover:text-neutral8 hover:shadow-sm dark:border-2 dark:border-solid dark:border-neutral4 dark:text-neutral8 dark:shadow-none">
                        Trade
                     </div>
                  </td>
               </tr>
            </>
         );
      },
      [redirectToTrading]
   );

   return (
      <section className="relative lg:mb-28 lg2:mb-34">
         <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20">
            <div className="mb-10 flex justify-between">
               <div className="whitespace-normal font-dm text-4.5xl font-bold md:text-5xl">
                  Market trend
               </div>

               <Button
                  text="View more"
                  onClick={() => push('/markets')}
                  variant="outline"
                  width="noFull"
               />
            </div>
            <div className="mb-[70px] flex items-start space-x-6">
               {currentBidUnitsList.map((item, index) => (
                  <button
                     key={index}
                     className={`flex cursor-pointer rounded-1xl py-1.5 px-3 font-dm text-sm font-bold outline-none transition-all duration-300 ${
                        item === currentBidUnit
                           ? 'bg-neutral2 text-neutral8'
                           : 'bg-none text-neutral4 hover:text-neutral3 dark:hover:text-neutral5'
                     }`}
                     onClick={() => setCurrentBidUnit(item)}>
                     {item
                        ? item.toUpperCase()
                        : formatMessage({
                             id: 'page.body.marketsTable.filter.all',
                          })}
                  </button>
               ))}
            </div>
            <div className="block w-full overflow-x-auto whitespace-nowrap">
               <table className="w-full table-auto border-collapse">
                  <thead className="shadow-header dark:shadow-none">
                     <tr>
                        <th className="px-2 py-5 text-start align-middle font-normal text-neutral4">
                           #
                        </th>
                        <th className="px-2 py-5 text-start align-middle font-normal text-neutral4">
                           {formatMessage({
                              id: 'page.body.marketsTable.header.pair',
                           })}
                        </th>
                        <th className="px-2 py-5 text-start align-middle font-normal text-neutral4">
                           {formatMessage({
                              id: 'page.body.marketsTable.header.lastPrice',
                           })}
                        </th>
                        <th className="px-2 py-5 text-start align-middle font-normal text-neutral4">
                           {formatMessage({
                              id: 'page.body.marketsTable.header.change',
                           })}
                        </th>
                        <th className="px-2 py-5 text-start align-middle font-normal text-neutral4">
                           {formatMessage({
                              id: 'page.body.marketsTable.header.high',
                           })}
                        </th>
                        <th className="px-2 py-5 text-start align-middle font-normal text-neutral4">
                           {formatMessage({
                              id: 'page.body.marketsTable.header.low',
                           })}
                        </th>
                        <th className="px-2 py-5 text-start align-middle font-normal text-neutral4">
                           {formatMessage({
                              id: 'page.body.marketsTable.header.volume',
                           })}
                        </th>
                        <th className="px-2 py-5 text-start align-middle font-normal text-neutral4">
                           Chart
                        </th>
                        <th className="px-2 py-5 text-start align-middle font-normal text-neutral4">
                           Trade
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {markets[0] ? (
                        markets.map(renderBody)
                     ) : (
                        <tr>
                           <td
                              className="px-2 text-center align-middle text-base font-medium text-neutral4"
                              colSpan={12}>
                              <div>
                                 {formatMessage({ id: 'page.noDataToShow' })}
                              </div>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
               <Table
                  columns={myColumns}
                  data={markets}
               />
               {/* <ReactPaginate
                     pageCount={Math.min(10, 5)}
                     className="flex justify-end space-x-3 mt-5"
                     previousLabel="<="
                     nextLabel="=>"
                     activeLinkClassName="p-active"
                     pageLinkClassName="p-initial"
                     breakLinkClassName="p-initial"
                     nextLinkClassName="p-initial"
                     previousLinkClassName="p-initial"
                     disabledLinkClassName="p-disabled"
                  /> */}
            </div>
            <DataTable
               noDataComponent={true}
               className="block whitespace-nowrap"
               columns={columns}
               data={markets}
               pagination
            />
         </div>
      </section>
   );
};
