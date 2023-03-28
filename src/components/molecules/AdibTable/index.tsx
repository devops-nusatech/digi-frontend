import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { classNames } from 'helpers';

const classes = {
   withDivider: 'divide-y divide-neutral6 dark:divide-neutral2',
};

type AdibTableProps<T> = {
   data: Array<T>;
   columns: Array<string>;
   withDivider?: boolean;
};

export const AdibTable = <T,>({
   columns,
   data,
   withDivider,
}: AdibTableProps<T>): ReactElement => {
   const [sortColumn, setSortColumn] = useState('');
   const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('');

   const handleSort = useCallback(
      (column: string) => {
         setSortColumn(column);
         setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      },
      [sortDirection]
   );

   const sortedData = useMemo(
      () =>
         [...data].sort((a, b) => {
            if (sortDirection === 'asc') {
               return a[sortColumn] > b[sortColumn] ? 1 : -1;
            }
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
         }),
      [data, sortColumn, sortDirection]
   );

   const renderHeader = useMemo(
      () =>
         columns.map((column, index) => (
            <th
               key={index}
               onClick={() => handleSort(column)}>
               {column}
               {sortColumn === column &&
                  (sortDirection === 'asc' ? ' ▲' : ' ▼')}
            </th>
         )),
      [columns, handleSort, sortColumn, sortDirection]
   );

   const renderBody = useMemo(
      () =>
         sortedData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
               {columns.map(column => (
                  <td key={`${rowIndex}-${column}`}>{rowData[column]}</td>
               ))}
            </tr>
         )),
      [columns, sortedData]
   );

   return (
      <div className="overflow-x-auto">
         <table className="w-full table-auto">
            <thead
               className={classNames(
                  `border-b border-neutral7 dark:border-neutral2`
               )}>
               <tr>{renderHeader}</tr>
            </thead>
            <tbody
               className={classNames(
                  `${withDivider ? classes.withDivider : ''}`
               )}>
               {renderBody}
            </tbody>
         </table>
      </div>
   );
};

AdibTable.defaultProps = {
   withDivider: true,
};

// import React, { useEffect, useState } from 'react';

// type TableProps = {
//    data: Array<any>;
//    columns: Array<string>;
// };

// export const AdibTable: React.FC<TableProps> = ({ data, columns }) => {
//    const [sortColumn, setSortColumn] = useState<string>('');
//    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

//    const handleSort = (columnName: string) => {
//       setSortColumn(columnName);
//       setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
//    };

//    const sortedData = [...data].sort((a, b) => {
//       if (sortDirection === 'asc') {
//          return a[sortColumn] > b[sortColumn] ? 1 : -1;
//       }
//       return a[sortColumn] < b[sortColumn] ? 1 : -1;
//    });

//    useEffect(() => {
//       console.log('sortedData', sortedData);
//    }, [sortedData]);

//    return (
//       <table>
//          <thead>
//             <tr>
//                {columns.map(column => (
//                   <th
//                      key={column}
//                      onClick={() => handleSort(column)}>
//                      {column}
//                      {sortColumn === column &&
//                         (sortDirection === 'asc' ? ' ▲' : ' ▼')}
//                   </th>
//                ))}
//             </tr>
//          </thead>
//          <tbody>
//             {sortedData.map((rowData, rowIndex) => (
//                <tr key={rowIndex}>
//                   {columns.map(column => (
//                      <td key={`${rowIndex}-${column}`}>{rowData[column]}</td>
//                   ))}
//                </tr>
//             ))}
//          </tbody>
//       </table>
//    );
// };
