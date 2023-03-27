import React from 'react';

interface Props {
   length?: number[];
}

export const LoadingTable = ({ length }: Props) => {
   console.log('length :>> ', length);
   return (
      <div className="table-row">
         {length?.map((e, i) => (
            <div
               key={i}
               className="table-cell p-1.5 pb-[10px] pl-0">
               <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
            </div>
         ))}
      </div>
   );
};

LoadingTable.defaultProps = {
   length: 4,
};
