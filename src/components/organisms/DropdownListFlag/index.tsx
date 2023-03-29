import React from 'react';
import { platformCurrency } from 'api';
import { TextXs, DropdownMenu } from 'components';

interface DropdownListFlagProps {
   isOpen: boolean;
   langActive: string;
   onSelect: (value: string, type?: string) => void;
}

export const DropdownListFlag = ({
   isOpen,
   langActive,
   onSelect,
}: DropdownListFlagProps) => {
   const activeClassLang = (id: string) =>
      langActive === id
         ? 'text-neutral2 dark:text-neutral8'
         : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8';

   return (
      <DropdownMenu
         width="md"
         isOpen={isOpen}>
         <div className="-mx-6 flex">
            <div className="shrink-0 grow-0 basis-1/2 border-r border-neutral6 px-6 dark:border-neutral3">
               <TextXs
                  text="Language"
                  className="mb-1 font-medium"
               />
               <div className="flex flex-col">
                  <div
                     onClick={() => onSelect('en', 'lang')}
                     className={`py-3 font-dm leading-custom3 ${activeClassLang(
                        'en'
                     )} cursor-pointer transition-colors duration-200 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3`}>
                     <span className="mr-2">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                     English
                  </div>
                  <div
                     onClick={() => onSelect('id', 'lang')}
                     className={`py-3 font-dm leading-custom3 ${activeClassLang(
                        'id'
                     )} cursor-pointer transition-colors duration-200 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3`}>
                     <span className="mr-2">🇲🇨</span>
                     Indonesian
                  </div>
               </div>
            </div>
            <div className="shrink-0 grow-0 basis-1/2 px-6">
               <TextXs
                  font="medium"
                  text="Currency"
                  className="mb-1"
               />
               <div className="flex flex-col">
                  <div className="relative cursor-pointer py-3 pl-7 font-dm leading-custom3 text-neutral2 transition-colors duration-200 before:absolute before:top-1/2 before:left-1.5 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-neutral3 before:content-[''] dark:text-neutral8 before:dark:bg-neutral6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                     {platformCurrency().toUpperCase() || 'Currency'}
                  </div>
                  {/* <div className="relative cursor-pointer py-3 pl-7 font-dm leading-custom3 text-neutral4 transition-colors duration-200 before:absolute before:top-1/2 before:left-1.5 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-neutral6 before:content-[''] hover:text-neutral2 before:hover:bg-neutral3 before:dark:bg-neutral3 dark:hover:text-neutral8 before:dark:hover:bg-neutral6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6  dark:[&:not(:last-child)]:border-neutral3">
                     USDT
                  </div>
                  <div className="relative cursor-pointer py-3 pl-7 font-dm leading-custom3 text-neutral4 transition-colors duration-200 before:absolute before:top-1/2 before:left-1.5 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-neutral6 before:content-[''] hover:text-neutral2 before:hover:bg-neutral3 before:dark:bg-neutral3 dark:hover:text-neutral8 before:dark:hover:bg-neutral6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6  dark:[&:not(:last-child)]:border-neutral3">
                     USDC
                  </div> */}
               </div>
            </div>
         </div>
      </DropdownMenu>
   );
};
