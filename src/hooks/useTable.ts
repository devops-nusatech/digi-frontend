import { useState, useEffect, useCallback } from 'react';

type ReturnType<T> = {
   slice: Array<T>;
   range: Array<number>;
};

export const useTable = <T>(
   data: Array<T>,
   page: number,
   rowsPerPage: number
): ReturnType<T> => {
   const [range, setRange] = useState<Array<number>>([]);
   const [slice, setSlice] = useState<Array<T>>([]);

   const calculateRange = useCallback(
      (data: Array<T>, rowsPerPage: number): Array<number> => {
         const range: Array<number> = [];
         const pageNum = Math.ceil(data.length / rowsPerPage);
         for (let i = 1; i <= pageNum; i++) {
            range.push(i);
         }
         return range;
      },
      []
   );

   const sliceData = useCallback(
      (data: Array<T>, page: number, rowsPerPage: number): Array<T> => {
         return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
      },
      []
   );

   useEffect(() => {
      const range = calculateRange(data, rowsPerPage);
      setRange([...range]);

      const slice = sliceData(data, page, rowsPerPage);
      setSlice([...slice]);
   }, [data, setRange, page, setSlice, rowsPerPage, calculateRange, sliceData]);

   return { slice, range };
};
