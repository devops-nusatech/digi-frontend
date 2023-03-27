import React, { FC } from 'react';
import { Tab } from '@headlessui/react';
interface TabProps {
   titles: Array<string>;
}

export const MyTab: FC<TabProps> = ({ titles, children }) => {
   return (
      <Tab.Group>
         <Tab.List className="mb-20 flex items-start space-x-6">
            {titles.map((title, index) => (
               <Tab
                  key={index}
                  className={({ selected }) =>
                     `flex cursor-pointer rounded-1xl py-1.5 px-3 font-dm text-sm font-bold outline-none transition-all duration-300  ${
                        selected
                           ? 'bg-neutral2 text-neutral8'
                           : 'bg-none text-neutral4 hover:text-neutral3 dark:hover:text-neutral5'
                     }`
                  }>
                  {title}
               </Tab>
            ))}
         </Tab.List>
         <Tab.Panels as={React.Fragment}>{children}</Tab.Panels>
      </Tab.Group>
   );
};
