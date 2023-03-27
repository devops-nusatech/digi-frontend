import React from 'react';
import { TableFinance, TutorialAlt } from 'components';

export const Activity = () => {
   return (
      <div className="bg-neutral7 py-8 dark:bg-neutral1">
         <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg2:px-20">
            <div className="rounded-lg bg-transparent p-0 lg:bg-neutral8 lg:p-6 dark:lg:bg-shade1 lg2:p-10">
               <TableFinance title="Activity" />
            </div>
            <div className="mt-14 rounded-lg bg-none p-0 lg:mt-4 lg:bg-neutral8 lg:p-8 dark:lg:bg-shade1">
               <TutorialAlt />
            </div>
         </div>
      </div>
   );
};
