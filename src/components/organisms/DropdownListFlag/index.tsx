import { DropdownMenu } from 'components/atoms'
import { selectSonic } from 'modules';
import React from 'react';
import { useSelector } from 'react-redux';

interface DropdownListFlag {
   isOpen: boolean;
   langActive: string;
   onSelect: (value: string, type?: string) => void;
}

export const DropdownListFlag = ({ isOpen, langActive, onSelect }: DropdownListFlag) => {
   const sonic = useSelector(selectSonic);
   const activeClassLang = (id: string) =>
      langActive === id
         ? 'text-neutral2 dark:text-neutral8'
         : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8';

   return (
      <DropdownMenu width="md" isOpen={isOpen}>
         <div className="flex -mx-6">
            <div className="grow-0 shrink-0 basis-1/2 px-6 border-r border-neutral6 dark:border-neutral3">
               <div className="mb-1 text-xs leading-custom4 font-medium text-neutral4">
                  Language
               </div>
               <div className="flex flex-col">
                  <div
                     onClick={() => onSelect('en', 'lang')}
                     className={`py-3 font-dm leading-custom3 font-bold ${activeClassLang('en')} cursor-pointer [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3 transition-colors duration-200`}
                  >
                     <span className="mr-2">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                     English
                  </div>
                  <div
                     onClick={() => onSelect('id', 'lang')}
                     className={`py-3 font-dm leading-custom3 font-bold ${activeClassLang('id')} cursor-pointer [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3 transition-colors duration-200`}
                  >
                     <span className="mr-2">🇲🇨</span>
                     Indonesian
                  </div>
               </div>
            </div>
            <div className="grow-0 shrink-0 basis-1/2 px-6">
               <div className="mb-1 text-xs leading-custom4 font-medium text-neutral4">
                  Currency
               </div>
               <div className="flex flex-col">
                  <div className="relative py-3 pl-7 font-dm leading-custom3 font-bold text-neutral2 dark:text-neutral8 cursor-pointer [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3 transition-colors duration-200 before:absolute before:content-[''] before:top-1/2 before:left-1.5 before:w-2 before:h-2 before:-translate-y-1/2 before:rounded-full before:bg-neutral3 before:dark:bg-neutral6">
                     {sonic?.peatio_platform_currency?.toUpperCase()}
                  </div>
                  {/* <div className="relative py-3 pl-7 font-dm leading-custom3 font-bold text-neutral4 hover:text-neutral2 dark:hover:text-neutral8 cursor-pointer [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3 transition-colors duration-200 before:absolute before:content-[''] before:top-1/2 before:left-1.5 before:w-2 before:h-2 before:-translate-y-1/2 before:rounded-full before:bg-neutral6 before:hover:bg-neutral3 before:dark:bg-neutral3  before:dark:hover:bg-neutral6">
                     USDT
                  </div>
                  <div className="relative py-3 pl-7 font-dm leading-custom3 font-bold text-neutral4 hover:text-neutral2 dark:hover:text-neutral8 cursor-pointer [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3 transition-colors duration-200 before:absolute before:content-[''] before:top-1/2 before:left-1.5 before:w-2 before:h-2 before:-translate-y-1/2 before:rounded-full before:bg-neutral6 before:hover:bg-neutral3 before:dark:bg-neutral3  before:dark:hover:bg-neutral6">
                     USDC
                  </div> */}
               </div>
            </div>
         </div>
      </DropdownMenu>
   )
}
