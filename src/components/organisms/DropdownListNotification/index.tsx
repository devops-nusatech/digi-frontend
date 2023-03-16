import axios from 'axios';
import { Button, DropdownMenu, Skeleton } from 'components/atoms';
import { localeDate, truncateEnd } from 'helpers';
import React, { useEffect, useState } from 'react';

interface Notification {
   date: number;
   read: boolean;
   type: Type;
   detail: string;
   id_notif: string;
}

type Type =
   | 'security'
   | 'deposit'
   | 'withdrawal'
   | 'trade'
   | 'transfer'
   | 'alert'
   | 'news';

interface DropdownListFlag {
   isOpen: boolean;
   notifActive: string;
   onSelect: () => void;
}

export const DropdownListNotification = ({
   isOpen,
   notifActive,
   onSelect,
}: DropdownListFlag) => {
   const [isLoading, setIsLoading] = useState(false);
   const [notifications, setNotifications] = useState<Notification[]>([]);

   useEffect(() => {
      if (!notifications.length && isOpen) {
         (async () => {
            setIsLoading(true);
            await axios
               .get('https://api.npoint.io/a69cae8e918567992ef0')
               .then(res => {
                  setNotifications(res.data);
                  setIsLoading(false);
               });
         })();
      }
   }, [isOpen]);
   return (
      <DropdownMenu
         width="def"
         isOpen={isOpen}>
         <div className="mb-1 text-left text-2xl font-semibold leading-custom2 tracking-custom1">
            Notifications
         </div>
         <div className="text-left">
            {isLoading ? (
               <>
                  <div className="group relative block py-3 pr-6 transition-colors duration-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </div>
                  <div className="group relative block py-3 pr-6 transition-colors duration-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </div>
                  <div className="group relative block py-3 pr-6 transition-colors duration-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </div>
               </>
            ) : notifications.length ? (
               notifications.slice(0, 6).map((e, i) => (
                  <div
                     key={e.id_notif}
                     className={`group relative block py-3 pr-6 transition-colors duration-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 ${
                        e.read
                           ? "after:absolute after:top-4 after:right-0 after:h-3 after:w-3 after:rounded-full after:bg-primary5 after:content-['']"
                           : ''
                     }`}>
                     <div className="text-xs font-semibold leading-custom4 transition-colors duration-300 group-hover:text-primary1">
                        {truncateEnd(e.detail, 30)}
                     </div>
                     <div className="text-x font-medium leading-[1.6] text-neutral4">
                        {localeDate(e.date, 'shortDate')}
                     </div>
                  </div>
               ))
            ) : (
               <div className="group relative block py-3 pr-6 transition-colors duration-300 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3">
                  No result found
               </div>
            )}
         </div>
         <div className="-mx-2 mt-1 hidden md:flex">
            <Button
               className="mx-2 w-c-1/2-4 shrink-0 grow-0 basis-c-1/2-4"
               text="View all"
               size="normal"
               onClick={onSelect}
            />
            <Button
               className="mx-2 w-c-1/2-4 shrink-0 grow-0 basis-c-1/2-4"
               text="Clear all"
               size="normal"
               variant="outline"
               onClick={() => setNotifications([])}
            />
         </div>
      </DropdownMenu>
   );
};
