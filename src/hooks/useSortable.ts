import { useCallback, useMemo, useState } from 'react';
import { Direction } from 'types';

type Config = {
   key: string;
   direction: Direction;
};

type ReturnType<T> = [T[], (key: string) => void, (key: string) => Direction];

/**
 * @example const [items, requestSort, classNameFor] = useSortable<Item[]>(items);
 */
export const useSortable = <T>(
   items: T[],
   config: Config | null = null
): ReturnType<T> => {
   const [sortConfig, setSortConfig] = useState<Config>(config!);

   const sortedItems = useMemo(() => {
      if (!items?.length) {
         return [];
      }
      let sortableItems = [...items];
      if (sortConfig !== null) {
         sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
               return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
               return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
         });
      }
      return sortableItems;
   }, [items, sortConfig]);

   const requestSort = useCallback(
      (key: string) => {
         if (!items?.length) {
            return;
         }
         let direction: Direction = 'ascending';
         if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
         ) {
            direction = 'descending';
         }
         setSortConfig({ key, direction });
      },
      [items?.length, sortConfig]
   );

   const classNameFor = useCallback(
      (key: string) => {
         if (!sortConfig) {
            return '';
         }
         return sortConfig.key === key ? sortConfig.direction : '';
      },
      [sortConfig]
   );

   return [sortedItems, requestSort, classNameFor];
};
