import React from 'react';
import {
   TableFinance,
   TutorialAlt
} from 'components';

export const Activity = () => {
   return (
      <div className="py-8 bg-neutral7 dark:bg-neutral1">
         <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg2:px-20">
            <div className="p-0 lg:p-6 lg2:p-10 rounded-lg bg-transparent lg:bg-neutral8 dark:lg:bg-shade1">
               <TableFinance title="Activity" />
            </div>
            <div className="mt-14 lg:mt-4 p-0 lg:p-8 rounded-lg bg-none lg:bg-neutral8 dark:lg:bg-shade1">
               <TutorialAlt />
            </div>
         </div>
      </div>
   );
};
