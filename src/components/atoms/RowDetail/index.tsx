import React from 'react';

export type IRowItem = {
   left: string;
   right: string;
   icRight?: string;
};

type RowDetailProps = {
   items: Array<IRowItem>;
};

export const RowDetail = ({ items }: RowDetailProps) => {
   return (
      <div className="space-y-3 divide-y divide-neutral6 dark:divide-neutral3">
         {items.map((item, index) => (
            <div
               key={index}
               className="flex flex-wrap items-center justify-between gap-3 [&:not(:first-child)]:pt-3">
               <div className="text-neutral4">{item.left}</div>
               <div className="flex items-center gap-3">
                  <div className="font-medium">{item.right}</div>
                  {item.icRight && (
                     <svg className="h-6 w-6 fill-neutral4 transition-colors duration-300">
                        <use xlinkHref={`#icon-${item.icRight}`} />
                     </svg>
                  )}
               </div>
            </div>
         ))}
      </div>
   );
};
