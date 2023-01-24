import React from 'react';

type CellDetailProps = {
   title: string;
   value: string;
   rightAlt?: string;
}

export const CellDetail = ({ title, value, rightAlt }: CellDetailProps) => (
   <div className="flex items-center gap-5 justify-between">
      <div className="text-neutral4">
         {title}
      </div>
      <div className="text-base font-medium uppercase truncate">
         {value} <span className="text-neutral4">{rightAlt}</span>
      </div>
   </div>
)
