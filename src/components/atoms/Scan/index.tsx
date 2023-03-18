import React, { FC, ReactNode } from 'react';

interface ScanProps {
   childrenButton?: ReactNode;
}

export const Scan: FC<ScanProps> = ({ children, childrenButton }) => {
   return (
      <div className="flex rounded-2xl bg-neutral7 dark:bg-neutral2">
         <div className="mx-auto mt-16 max-w-64 rounded-t-5xl bg-neutral8 py-8 px-12 dark:bg-neutral3">
            <div className="rounded-lg border-2 border-dashed border-primary1 p-5">
               {children}
            </div>
            <div className="mt-12">{childrenButton}</div>
         </div>
      </div>
   );
};
