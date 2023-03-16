import React, { useState } from 'react';
import {
   useTable,
   useFilters,
   useGlobalFilter,
   useAsyncDebounce,
   useSortBy,
   usePagination,
} from 'react-table';
import {
   ChevronDoubleLeftIcon,
   ChevronLeftIcon,
   ChevronRightIcon,
   ChevronDoubleRightIcon,
} from '@heroicons/react/solid';
import { Button, PageButton } from './Button';
import { SortIcon, SortUpIcon, SortDownIcon } from 'assets';

// Define a default UI for filtering
function GlobalFilter({
   preGlobalFilteredRows,
   globalFilter,
   setGlobalFilter,
}) {
   const count = preGlobalFilteredRows.length;
   const [value, setValue] = useState(globalFilter);
   const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined);
   }, 200);

   return (
      <label className="flex items-baseline gap-x-2">
         <span className="text-gray-700">Search: </span>
         <input
            type="text"
            className="h-9 w-full rounded-2xl border-2 border-neutral6 bg-none px-4 leading-custom outline-none transition-colors duration-300 focus-within:border-neutral4 dark:text-neutral8"
            value={value || ''}
            onChange={e => {
               setValue(e.target.value);
               onChange(e.target.value);
            }}
            placeholder={`${count} markets...`}
         />
      </label>
   );
}

export function Cuk({ columns, data }) {
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

      state,
      preGlobalFilteredRows,
      setGlobalFilter,
   } = useTable(
      {
         columns,
         data,
      },
      useFilters, // useFilters!
      useGlobalFilter,
      useSortBy,
      usePagination // new
   );

   // Render the UI for your table
   return (
      <>
         <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-x-2">
               <div>Show</div>
               <select
                  className="mt-1 block w-full rounded-md border-gray-300 py-1 px-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={state.pageSize}
                  onChange={e => {
                     setPageSize(Number(e.target.value));
                  }}>
                  {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                     pageSize => (
                        <option
                           key={pageSize}
                           value={pageSize}>
                           {pageSize}
                        </option>
                     )
                  )}
               </select>
            </div>
            <div className="sm:flex sm:gap-x-2">
               <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
               />
               {headerGroups.map(headerGroup =>
                  headerGroup.headers.map(column =>
                     column.Filter ? (
                        <div
                           className="mt-2 sm:mt-0"
                           key={column.id}>
                           {column.render('Filter')}
                        </div>
                     ) : null
                  )
               )}
            </div>
         </div>
         <table
            {...getTableProps()}
            className="w-full table-auto border-collapse">
            <thead className="shadow-header dark:shadow-none">
               {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map(column => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th
                           scope="col"
                           className="group relative px-2 py-5 text-start align-middle font-normal text-neutral4"
                           {...column.getHeaderProps(
                              column.getSortByToggleProps()
                           )}>
                           <div className="flex items-center justify-between">
                              {column.render('Header')}
                              {/* Add a sort direction indicator */}
                              <span>
                                 {column.isSorted ? (
                                    column.isSortedDesc ? (
                                       <SortDownIcon className="h-4 w-4 text-gray-400" />
                                    ) : (
                                       <SortUpIcon className="h-4 w-4 text-gray-400" />
                                    )
                                 ) : (
                                    <SortIcon className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                 )}
                              </span>
                           </div>
                        </th>
                     ))}
                  </tr>
               ))}
            </thead>
            <tbody {...getTableBodyProps()}>
               {page.length > 0 ? (
                  page.map((row, i) => {
                     // new
                     prepareRow(row);
                     return (
                        <tr {...row.getRowProps()}>
                           {row.cells.map(cell => {
                              return (
                                 <td
                                    {...cell.getCellProps()}
                                    className="px-4 py-5 align-middle text-base font-medium"
                                    role="cell">
                                    {cell.column.Cell.name ===
                                    'defaultRenderer' ? (
                                       <div>{cell.render('Cell')}</div>
                                    ) : (
                                       cell.render('Cell')
                                    )}
                                 </td>
                              );
                           })}
                        </tr>
                     );
                  })
               ) : (
                  <tr>
                     <td
                        colSpan={9}
                        className="px-2 pt-4 pb-3 text-center align-middle text-base font-medium">
                        <div className="animate-bounce">Item not found...</div>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
         <div className="flex items-center justify-between py-3">
            <div className="flex flex-1 justify-between sm:hidden">
               <Button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}>
                  Previous
               </Button>
               <Button
                  onClick={() => nextPage()}
                  disabled={!canNextPage}>
                  Next
               </Button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
               <div className="flex items-baseline gap-x-2">
                  <span className="text-sm text-gray-700">
                     Page{' '}
                     <span className="font-medium">{state.pageIndex + 1}</span>{' '}
                     of{' '}
                     <span className="font-medium">{pageOptions.length}</span>
                  </span>
                  {/* <label>
                     <span className="sr-only">Items Per Page</span>
                     <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={state.pageSize}
                        onChange={e => {
                           setPageSize(Number(e.target.value))
                        }}
                     >
                        {[5, 10, 20].map(pageSize => (
                           <option key={pageSize} value={pageSize}>
                              Show {pageSize}
                           </option>
                        ))}
                     </select>
                  </label> */}
               </div>
               <div>
                  <nav
                     className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                     aria-label="Pagination">
                     <PageButton
                        className="rounded-l-md disabled:bg-neutral7"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}>
                        <span className="sr-only">First</span>
                        <ChevronDoubleLeftIcon
                           className="h-5 w-5 text-gray-400"
                           aria-hidden="true"
                        />
                     </PageButton>
                     <PageButton
                        className="disabled:bg-neutral7 dark:disabled:bg-neutral3"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}>
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                           className="h-5 w-5 text-gray-400"
                           aria-hidden="true"
                        />
                     </PageButton>
                     <PageButton
                        className="disabled:bg-neutral7 dark:disabled:bg-neutral3"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}>
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                           className="h-5 w-5 text-gray-400"
                           aria-hidden="true"
                        />
                     </PageButton>
                     <PageButton
                        className="rounded-r-md disabled:bg-neutral7 dark:disabled:bg-neutral3"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}>
                        <span className="sr-only">Last</span>
                        <ChevronDoubleRightIcon
                           className="h-5 w-5 text-gray-400"
                           aria-hidden="true"
                        />
                     </PageButton>
                  </nav>
               </div>
            </div>
         </div>
      </>
   );
}
