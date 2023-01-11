import { Button, DropdownMenu } from 'components/atoms'
import React from 'react';
import { Link } from 'react-router-dom';

interface DropdownListFlag {
   isOpen: boolean;
   notifActive: string;
   onSelect: () => void;
}

export const DropdownListNotification = ({ isOpen, notifActive, onSelect }: DropdownListFlag) => {
   return (
      <DropdownMenu width="def" isOpen={isOpen}>
         <div className="mb-1 text-2xl leading-custom2 font-semibold tracking-custom1 text-left">
            Notifications
         </div>
         <div className="text-left">
            <Link to="/notifications" className="group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300 after:content-[''] after:absolute after:top-4 after:right-0 after:w-3 after:h-3 after:rounded-full after:bg-primary5">
               <div className="text-xs leading-custom4 font-semibold group-hover:text-primary1 transition-colors duration-300">
                  Login attempted from new IP
               </div>
               <div className="text-x text-neutral4 font-medium leading-[1.6]">
                  2021-03-10 20:19:15
               </div>
            </Link>
            <Link to="/notifications" className="group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300 after:content-[''] after:absolute after:top-4 after:right-0 after:w-3 after:h-3 after:rounded-full after:bg-primary5">
               <div className="text-xs leading-custom4 font-semibold group-hover:text-primary1 transition-colors duration-300">
                  Login attempted from new IP
               </div>
               <div className="text-x text-neutral4 font-medium leading-[1.6]">
                  2021-03-10 20:19:15
               </div>
            </Link>
            <Link to="/notifications" className="group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300 after:content-[''] after:absolute after:top-4 after:right-0 after:w-3 after:h-3 after:rounded-full after:bg-primary5">
               <div className="text-xs leading-custom4 font-semibold group-hover:text-primary1 transition-colors duration-300">
                  Login attempted from new IP
               </div>
               <div className="text-x text-neutral4 font-medium leading-[1.6]">
                  2021-03-10 20:19:15
               </div>
            </Link>
            <Link to="/notifications" className="group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300 after:content-[''] after:absolute after:top-4 after:right-0 after:w-3 after:h-3 after:rounded-full after:bg-primary5">
               <div className="text-xs leading-custom4 font-semibold group-hover:text-primary1 transition-colors duration-300">
                  Login attempted from new IP
               </div>
               <div className="text-x text-neutral4 font-medium leading-[1.6]">
                  2021-03-10 20:19:15
               </div>
            </Link>
            <Link to="/notifications" className="group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300">
               <div className="text-xs leading-custom4 font-semibold group-hover:text-primary1 transition-colors duration-300">
                  Login attempted from new IP
               </div>
               <div className="text-x text-neutral4 font-medium leading-[1.6]">
                  2021-03-10 20:19:15
               </div>
            </Link>
            <Link to="/notifications" className="group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300">
               <div className="text-xs leading-custom4 font-semibold group-hover:text-primary1 transition-colors duration-300">
                  Login attempted from new IP
               </div>
               <div className="text-x text-neutral4 font-medium leading-[1.6]">
                  2021-03-10 20:19:15
               </div>
            </Link>
         </div>
         <div className="hidden md:flex mt-1 -mx-2">
            <Button
               className="shrink-0 grow-0 basis-c-1/2-4 w-c-1/2-4 mx-2"
               text="View all"
               size="normal"
               onClick={onSelect}
            />
            <Button
               className="shrink-0 grow-0 basis-c-1/2-4 w-c-1/2-4 mx-2"
               text="Clear all"
               size="normal"
               variant="outline"
               onClick={onSelect}
            />
         </div>
      </DropdownMenu>
   )
}
