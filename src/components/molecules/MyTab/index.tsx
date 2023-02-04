import React, { FC } from 'react';
import { Tab } from '@headlessui/react';
interface TabProps {
   titles: Array<string>;
}

export const MyTab: FC<TabProps> = ({ titles, children }) => {
   return (
      <Tab.Group>
         <Tab.List className="flex space-x-6 items-start mb-20">
            {titles.map((title, index) => (
               <Tab key={index} className={({ selected }) => `flex py-1.5 px-3 rounded-1xl font-dm text-sm font-bold cursor-pointer outline-none transition-all duration-300  ${selected ? 'bg-neutral2 text-neutral8' : 'text-neutral4 hover:text-neutral3 dark:hover:text-neutral5 bg-none'}`}>
                  {title}
               </Tab>
            ))}
         </Tab.List>
         <Tab.Panels as={React.Fragment}>
            {children}
         </Tab.Panels>
      </Tab.Group>
   );
};
