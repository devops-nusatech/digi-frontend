import axios from 'axios';
import { Button, DropdownMenu, Skeleton } from 'components/atoms'
import { localeDate, truncateEnd } from 'helpers';
import React, { useEffect, useState } from 'react';

interface Notification {
   date: number;
   read: boolean;
   type: Type;
   detail: string;
   id_notif: string;
}

type Type = 'security' | 'deposit' | 'withdrawal' | 'trade' | 'transfer' | 'alert' | 'news';


interface DropdownListFlag {
   isOpen: boolean;
   notifActive: string;
   onSelect: () => void;
}

export const DropdownListNotification = ({ isOpen, notifActive, onSelect }: DropdownListFlag) => {
   const [isLoading, setIsLoading] = useState(false);
   const [notifications, setNotifications] = useState<Notification[]>([]);

   useEffect(() => {
      if (!notifications.length && isOpen) {
         (async () => {
            setIsLoading(true);
            await axios.get('https://api.npoint.io/a69cae8e918567992ef0').then(res => {
               setNotifications(res.data);
               setIsLoading(false);
            });
         })();
      }
   }, [isOpen]);
   return (
      <DropdownMenu width="def" isOpen={isOpen}>
         <div className="mb-1 text-2xl leading-custom2 font-semibold tracking-custom1 text-left">
            Notifications
         </div>
         <div className="text-left">
            {isLoading ? (
               <>
                  <div className="group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300">
                     <Skeleton height={20} isWithFull />
                  </div>
                  <div className="group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300">
                     <Skeleton height={20} isWithFull />
                  </div>
                  <div className="group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300">
                     <Skeleton height={20} isWithFull />
                  </div>
               </>
            ) : notifications.length ? notifications.slice(0, 6).map((e, i) => (
               <div key={e.id_notif} className={`group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300 ${e.read ? "after:content-[''] after:absolute after:top-4 after:right-0 after:w-3 after:h-3 after:rounded-full after:bg-primary5" : ''}`}>
                  <div className="text-xs leading-custom4 font-semibold group-hover:text-primary1 transition-colors duration-300">
                     {truncateEnd(e.detail, 30)}
                  </div>
                  <div className="text-x text-neutral4 font-medium leading-[1.6]">
                     {localeDate(e.date, 'shortDate')}
                  </div>
               </div>
            )) : (
               <div className="group relative block py-3 pr-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 transition-colors duration-300">
                  No result found
               </div>
            )}
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
               onClick={() => setNotifications([])}
            />
         </div>
      </DropdownMenu>
   )
}
