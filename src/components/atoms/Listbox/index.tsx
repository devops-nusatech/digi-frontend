import { Listbox as List } from '@headlessui/react';
import React from 'react';

type ObjectKey = {
   [key: string]: any;
};

interface ListboxProps<T> {
   label?: string;
   objectKey: string;
   list: T;
   lists: T[];
   onChange(e?: any): void;
   info?: string;
}

export const Listbox = <T extends ObjectKey>({
   label,
   objectKey,
   list,
   lists,
   onChange,
   info,
}: ListboxProps<T>) => (
   <List
      value={list}
      onChange={onChange}>
      <div className="relative">
         <div className="space-y-2.5">
            {label && (
               <div className="text-xs font-bold uppercase leading-none text-neutral5">
                  {label}
               </div>
            )}
            <List.Button
               className={({ open }) =>
                  `relative h-12 w-full pl-4 pr-12 shadow-input outline-none ${
                     open ? 'shadow-dropdown-1' : 'dark:shadow-border-dark'
                  } before:icon-arrow rounded-xl border-none bg-neutral8 text-left font-medium leading-12 transition-shadow duration-200 before:absolute before:top-1/2 before:right-2 before:h-6 before:w-6 before:-translate-y-1/2 before:rounded-full before:transition-transform before:duration-200 before:content-[''] dark:bg-neutral2 ${
                     open ? 'before:rotate-180' : ''
                  }`
               }>
               <span className="block truncate font-medium">
                  {list[objectKey]}
               </span>
            </List.Button>
            {info && (
               <div
                  className={`text-x font-medium leading-relaxed text-primary4`}>
                  {info}
               </div>
            )}
         </div>
         <List.Options
            className={({ open }) =>
               `absolute z-[9] mt-0.5 max-h-40 w-full overflow-auto rounded-xl border-2 border-neutral6 bg-neutral8 shadow-dropdown-2 outline-none dark:border-neutral3 dark:bg-neutral1 dark:shadow-dropdown-3 ${
                  open
                     ? 'visible translate-y-0 scale-100 opacity-100'
                     : 'invisible -translate-y-20 scale-75 opacity-0'
               } transition-all duration-200`
            }
            style={{ transformOrigin: '50% 0' }}>
            {lists.map((value, index) => (
               <List.Option
                  key={index}
                  className="px-3.5 py-2.5 font-medium leading-[1.4] transition-all duration-200 hover:bg-neutral7 hover:dark:bg-neutral2"
                  value={value}>
                  {({ selected }) => (
                     <span
                        className={`block truncate ${
                           selected ? 'text-primary1' : ''
                        }`}>
                        {value[objectKey]}
                     </span>
                  )}
               </List.Option>
            ))}
         </List.Options>
      </div>
   </List>
);
