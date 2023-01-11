import React from 'react';

interface Props {
   length?: number[];
}

export const LoadingTable = ({ length }: Props) => {
   console.log('length :>> ', length);
   return (
      <div className="table-row">
         {
            length?.map((e, i) => (
               <div key={i} className="table-cell pb-[10px] p-1.5 pl-0">
                  <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
               </div>
            ))
         }
      </div>
   )
}

LoadingTable.defaultProps = {
   length: 4
}
