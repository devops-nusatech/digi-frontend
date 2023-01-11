import { CheckIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { InputGroup } from '../InputGroup';

export const InputBeneficary = () => {
   const [open, setOpen] = useState<boolean>(false);
   const handleSetOpen = () => setOpen(!open);

   return (
      <div className="relative">
         <InputGroup
            label="Withdrawal address"
            width="full"
            icon={
               <svg className="w-6 h-6 fill-neutral4 group-hover:fill-neutral2 transition-all duration-300">
                  <use xlinkHref="#icon-plus" />
               </svg>
            }
            onClick={handleSetOpen}
         />
         {
            open && (
               <div className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="group relative cursor-default select-none py-2 pl-10 pr-3.5">
                     <span className="block truncate">Name</span>
                     <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                     </div>
                  </div>
                  <div className="group relative cursor-default select-none py-2 pl-10 pr-3.5">
                     <span className="block truncate">Name</span>
                     <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                     </div>
                  </div>
                  <div className="group relative cursor-default select-none py-2 pl-10 pr-3.5">
                     <span className="block truncate">Name</span>
                     <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                     </div>
                  </div>
                  <div className="group relative cursor-default select-none py-2 pl-10 pr-3.5">
                     <span className="block truncate">Name</span>
                     <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                     </div>
                  </div>
               </div>
            )
         }
      </div>
   )
}
