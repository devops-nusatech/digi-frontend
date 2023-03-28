import React, { ReactNode } from 'react';
import { FlexCenter } from '../FlexCenter';

export type IRowItem = {
   left: ReactNode;
   right: ReactNode;
   icRight?: ReactNode;
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
               <div className="text-neutral4">
                  {typeof item.left !== 'undefined' ? item.left : ''}
               </div>
               <FlexCenter className="gap-3">
                  <div className="font-medium">
                     {typeof item.right !== 'undefined' ? item.right : ''}
                  </div>
                  {item.icRight && (
                     <svg className="h-6 w-6 fill-neutral4 transition-colors duration-300">
                        <use xlinkHref={`#icon-${item.icRight}`} />
                     </svg>
                  )}
               </FlexCenter>
            </div>
         ))}
      </div>
   );
};
