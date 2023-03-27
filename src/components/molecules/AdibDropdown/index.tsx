import React, { useCallback, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Label, Size } from 'components';
import { classNames } from 'helpers';

const classes = {
   disabled:
      'cursor-not-allowed disabled:bg-neutral7 dark:disabled:bg-neutral2',
   size: {
      small: 'h-8 pr-6 rounded-md before:right-0.5',
      normal: 'h-10 pr-8 rounded-lg before:right-1',
      large: 'h-12 pr-12 rounded-xl before:right-2',
   },
   withError: '!border-primary4',
};

interface AdibDropdownProps {
   /**
    * Label.
    */
   label?: string;
   /**
    * This data wajib array of string
    */
   data: string[];
   /**
    * onChange: return argument string
    */
   onChange?: (value: any) => void;
   /**
    * default value (optional)
    */
   defaultValue?: string;
   /**
    * this optional info in bottom input
    */
   info?: string;
   size?: Size;
   disabled?: boolean;
   withError?: boolean;
}

export const AdibDropdown = ({
   label,
   data,
   onChange,
   defaultValue,
   info,
   size,
   disabled,
   withError,
}: AdibDropdownProps) => {
   const [value, setValue] = useState(
      defaultValue?.length ? defaultValue : data[0]
   );

   const handleChange = useCallback(
      (e: string) => {
         setValue(e);
         onChange && onChange(e);
      },
      [onChange]
   );

   return (
      <Listbox
         value={value}
         onChange={handleChange}>
         <div className="relative">
            <div className="space-y-2.5">
               {label && <Label label={label!} />}
               <Listbox.Button
                  className={({ open }) =>
                     classNames(`relative w-full pl-4 shadow-input ${
                        open ? 'shadow-dropdown-1' : 'dark:shadow-border-dark'
                     } before:icon-arrow inline-flex items-center border-none bg-neutral8 text-left font-medium leading-12 transition-shadow duration-200 before:absolute before:top-1/2 before:h-6 before:w-6 before:-translate-y-1/2 before:rounded-full before:transition-transform before:duration-200 before:content-[''] dark:bg-neutral2 ${
                        open ? 'before:rotate-180' : ''
                     } ${classes.size[size!]} ${
                        disabled ? classes.disabled : ''
                     }
                     ${withError ? classes.withError : ''}`)
                  }>
                  <div className="block truncate font-medium capitalize">
                     {value}
                  </div>
               </Listbox.Button>
               {info && (
                  <div className="text-x font-medium capitalize leading-relaxed text-primary4">
                     {info}
                  </div>
               )}
            </div>
            <Listbox.Options
               className={({ open }) =>
                  `absolute z-10 mt-0.5 max-h-[10.1875rem] w-full overflow-auto rounded-xl border-2 border-neutral6 bg-neutral8 shadow-dropdown-2 outline-none dark:border-neutral3 dark:bg-neutral1 dark:shadow-dropdown-3 ${
                     open
                        ? 'visible translate-y-0 scale-100 opacity-100'
                        : 'invisible -translate-y-20 scale-75 opacity-0'
                  } transition-all duration-200`
               }
               style={{ transformOrigin: '50% 0' }}>
               {data.map((value, index) => (
                  <Listbox.Option
                     key={index}
                     className={({ active }) =>
                        `cursor-copy px-3.5 py-2.5 font-medium leading-[1.4] ${
                           active ? 'bg-neutral7 dark:bg-neutral2' : ''
                        } transition-all duration-200`
                     }
                     value={value}>
                     {({ selected }) => (
                        <span
                           className={`block truncate capitalize ${
                              selected ? 'text-primary1' : ''
                           }`}>
                           {value}
                        </span>
                     )}
                  </Listbox.Option>
               ))}
            </Listbox.Options>
         </div>
      </Listbox>
   );
};

AdibDropdown.defaultProps = {
   size: 'large',
};
