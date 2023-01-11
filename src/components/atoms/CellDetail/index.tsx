import React from 'react';

type CellDetailProps = {
   title: string;
   value: string;
}

export const CellDetail = ({ title, value }: CellDetailProps) => (
   <div className="flex items-center justify-between">
      <div className="text-neutral4">
         {title}
      </div>
      <div className="text-base font-medium uppercase">
         {value}
      </div>
   </div>
)
