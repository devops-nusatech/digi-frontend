import React from 'react';

type CellDetailProps = {
   title: string;
   value: string;
   rightAlt?: string;
};

export const CellDetail = ({ title, value, rightAlt }: CellDetailProps) => (
   <div className="flex items-center justify-between gap-3">
      <div className="text-neutral4">{title}</div>
      <div className="truncate text-base font-medium uppercase">
         {value} <span className="text-neutral4">{rightAlt}</span>
      </div>
   </div>
);
