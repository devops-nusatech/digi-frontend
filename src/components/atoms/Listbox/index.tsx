import { Listbox as List } from '@headlessui/react'
import React from 'react'

type ObjectKey = {
   [key: string]: any;
}

interface ListboxProps<T> {
   label?: string;
   objectKey: string;
   list: T;
   lists: T[];
   onChange(e?: any): void;
}

export const Listbox = <T extends ObjectKey>({ label, objectKey, list, lists, onChange }: ListboxProps<T>) => (
   <List
      value={list}
      onChange={onChange}
   >
      <div className="relative">
         <div className="space-y-2.5">
            {label && (
               <div className="text-xs text-neutral5 leading-none font-bold uppercase">
                  {label}
               </div>
            )}
            <List.Button className={({ open }) => `relative w-full h-12 pl-4 pr-12 shadow-input outline-none ${open ? 'shadow-dropdown-1' : 'dark:shadow-border-dark'} bg-neutral8 dark:bg-neutral2 rounded-xl border-none font-medium leading-12 text-left transition-shadow duration-200 before:content-[''] before:absolute before:top-1/2 before:right-2 before:h-6 before:w-6 before:-translate-y-1/2 before:rounded-full before:transition-transform before:duration-200 before:icon-arrow ${open ? 'before:rotate-180' : ''}`}>
               <span className="block truncate font-medium">
                  {list[objectKey]}
               </span>
            </List.Button>
         </div>
         <List.Options className={({ open }) => `absolute max-h-40 w-full overflow-auto z-[9] mt-0.5 rounded-xl outline-none bg-neutral8 dark:bg-neutral1 border-2 border-neutral6 dark:border-neutral1 shadow-dropdown-2 dark:shadow-dropdown-3 ${open ? 'opacity-100 visible scale-100 translate-y-0' : 'opacity-0 invisible scale-75 -translate-y-20'} transition-all duration-200`} style={{ transformOrigin: '50% 0' }}>
            {lists.map((value, index) => (
               <List.Option
                  key={index}
                  className="px-3.5 py-2.5 leading-[1.4] font-medium hover:bg-neutral7 hover:dark:bg-neutral2 transition-all duration-200"
                  value={value}
               >
                  {({ selected }) => (
                     <span className={`block truncate ${selected ? 'text-primary1' : ''}`}>
                        {value[objectKey]}
                     </span>
                  )}
               </List.Option>
            ))}
         </List.Options>
      </div>
   </List>
);
