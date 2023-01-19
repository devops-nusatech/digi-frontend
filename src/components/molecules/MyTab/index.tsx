// import React from 'react';
// import PropTypes from 'prop-types';
// // import { Tab as MyTab } from '@headlessui/react';

// interface TabProps {
//    titles: string[];
//    isActive: boolean;
// }

// export const MyTab = ({ titles, isActive }: TabProps) => {
//    return (
//       <div className="nav">
//          {
//             titles?.map((title, index) => (
//                <button key={index} className={`nav__link ${isActive}`}>{title}</button>
//             ))
//          }
//       </div>
//    )
// }

// MyTab.propTypes = {
//    titles: PropTypes.string.isRequired,
//    isActive: PropTypes.bool.isRequired,
// }

import React, { ReactNode } from 'react';
import { Tab } from '@headlessui/react';
import PropTypes from 'prop-types';

interface TabProps {
   titles: Array<ReactNode>;
   children?: JSX.Element | JSX.Element[];
}

export const MyTab = ({ titles, children }: TabProps) => {
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

MyTab.propTypes = {
   titles: PropTypes.string.isRequired,
}
