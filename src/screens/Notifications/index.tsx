import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Skeleton, TutorialAlt } from 'components';
import axios from 'axios';
import { Notification } from './types';
import { localeDate, truncateEnd } from 'helpers';
import { IcEmty } from 'assets';

type State = {
   isSecurity: boolean;
   isWallet: boolean;
   isTrade: boolean;
   isDeposit: boolean;
   isTransfer: boolean;
   isWithdraw: boolean;
   isNews: boolean;
};

const rows = 5;

export const Notifications = () => {
   const [state, setState] = useState<State>({
      isSecurity: true,
      isWallet: false,
      isTrade: false,
      isDeposit: true,
      isTransfer: false,
      isWithdraw: true,
      isNews: true,
   });
   const [isLoading, setIsLoading] = useState(false);
   const [notifications, setNotifications] = useState<Notification[]>([]);
   const [more, setMore] = useState<number>(rows);
   const [markAllAsRead, setMarkAllAsRead] = useState(true);

   useEffect(() => {
      (async () => {
         setIsLoading(true);
         await axios
            .get('https://api.npoint.io/a69cae8e918567992ef0')
            .then(res => {
               setNotifications(res.data);
               setIsLoading(false);
            });
      })();
   }, []);

   const selectAll = () =>
      setState({
         isSecurity: true,
         isWallet: true,
         isTrade: true,
         isDeposit: true,
         isTransfer: true,
         isWithdraw: true,
         isNews: true,
      });
   const unSelectAll = () =>
      setState({
         isSecurity: false,
         isWallet: false,
         isTrade: false,
         isDeposit: false,
         isTransfer: false,
         isWithdraw: false,
         isNews: false,
      });

   const {
      isSecurity,
      isWallet,
      isTrade,
      isDeposit,
      isTransfer,
      isWithdraw,
      isNews,
   } = state;

   const handleSetMarkAllAsRead = () => setMarkAllAsRead(false);

   const filteredNotifications = () => {
      return notifications.filter(
         e =>
            (e.type === 'security' && isSecurity) ||
            (e.type === 'alert' && isWallet) ||
            (e.type === 'trade' && isTrade) ||
            (e.type === 'deposit' && isDeposit) ||
            (e.type === 'transfer' && isTransfer) ||
            (e.type === 'withdrawal' && isWithdraw) ||
            (e.type === 'news' && isNews)
      );
   };

   return (
      <>
         <section className="bg-neutral7 py-8 dark:bg-neutral1 lg-max:pb-16">
            <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg:px-20">
               <div className="rounded-lg bg-neutral7 p-0 dark:bg-neutral1 lg:bg-neutral8 lg:p-10 dark:lg:bg-shade1">
                  <div className="mb-8 flex items-center border-b border-neutral6 pb-8 dark:border-neutral3 md-max:mb-5 md-max:flex-wrap md-max:border-none md-max:pb-0">
                     <div className="mr-auto font-dm text-3.5xl leading-tight tracking-custom1 md-max:mb-5 md-max:shrink-0 md-max:grow-0 md-max:basis-full">
                        Notifications
                     </div>
                     <Button
                        text="Mark all as read"
                        size="normal"
                        variant="outline"
                        className="mr-4"
                        width="noFull"
                        onClick={handleSetMarkAllAsRead}
                     />
                     <Button
                        text="Clear all"
                        size="normal"
                        variant="outline"
                        width="noFull"
                        onClick={() => {
                           setNotifications([]);
                           unSelectAll();
                        }}
                     />
                  </div>
                  <div className="block flex-row-reverse md:flex">
                     <Button
                        text="Advanced filter"
                        size="normal"
                        className="md:hidden"
                     />
                     <div className="shrink-0 md:w-56.5 lg2:w-72.5 1xl:w-82 md-max:hidden md-max:pt-8">
                        <div className="mb-8 text-2xl font-semibold leading-custom2 tracking-custom1">
                           Filters
                        </div>
                        <div className="flex flex-col items-start space-y-6">
                           <Checkbox
                              text="Security"
                              checked={state.isSecurity}
                              onChecked={() =>
                                 setState({
                                    ...state,
                                    isSecurity: !state.isSecurity,
                                 })
                              }
                           />
                           <Checkbox
                              text="Wallet"
                              checked={state.isWallet}
                              onChecked={() =>
                                 setState({
                                    ...state,
                                    isWallet: !state.isWallet,
                                 })
                              }
                           />
                           <Checkbox
                              text="Trade"
                              checked={state.isTrade}
                              onChecked={() =>
                                 setState({ ...state, isTrade: !state.isTrade })
                              }
                           />
                           <Checkbox
                              text="Deposit"
                              checked={state.isDeposit}
                              onChecked={() =>
                                 setState({
                                    ...state,
                                    isDeposit: !state.isDeposit,
                                 })
                              }
                           />
                           <Checkbox
                              text="Transfer"
                              checked={state.isTransfer}
                              onChecked={() =>
                                 setState({
                                    ...state,
                                    isTransfer: !state.isTransfer,
                                 })
                              }
                           />
                           <Checkbox
                              text="Withdrawal"
                              checked={state.isWithdraw}
                              onChecked={() =>
                                 setState({
                                    ...state,
                                    isWithdraw: !state.isWithdraw,
                                 })
                              }
                           />
                           <Checkbox
                              text="News"
                              checked={state.isNews}
                              onChecked={() =>
                                 setState({ ...state, isNews: !state.isNews })
                              }
                           />
                        </div>
                        <div className="mt-6 flex space-x-3">
                           <Button
                              text="Select all"
                              variant="outline"
                              size="normal"
                              width="noFull"
                              onClick={selectAll}
                           />
                           <Button
                              text="Unslect all"
                              variant="outline"
                              size="normal"
                              width="noFull"
                              onClick={unSelectAll}
                           />
                        </div>
                     </div>
                     <div className="grow pr-0 md:pr-8 lg:pr-12 lg2:pr-20 md-max:pt-12">
                        <div className="-mx-8 space-y-8 md:mx-0">
                           {isLoading ? (
                              <>
                                 <div className="flex space-x-4 pb-6 md-max:px-8 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                                    <Skeleton
                                       height={48}
                                       width={48}
                                       rounded="full"
                                    />
                                    <div className="space-y-2">
                                       <div className="flex md-max:flex-wrap">
                                          <div className="!mr-auto pr-0 md:pr-8 md-max:mb-2 md-max:shrink-0 md-max:grow-0 md-max:basis-full">
                                             <Skeleton
                                                height={20}
                                                width={270}
                                             />
                                          </div>
                                          <div className="mt-0.5 shrink-0 text-xs leading-custom4 text-neutral4 md-max:mr-auto">
                                             <Skeleton
                                                height={20}
                                                width={107}
                                             />
                                          </div>
                                       </div>
                                       <Skeleton
                                          height={40}
                                          isWithFull
                                       />
                                    </div>
                                 </div>
                                 <div className="flex space-x-4 pb-6 md-max:px-8 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                                    <Skeleton
                                       height={48}
                                       width={48}
                                       rounded="full"
                                    />
                                    <div className="space-y-2">
                                       <div className="flex md-max:flex-wrap">
                                          <div className="!mr-auto pr-0 md:pr-8 md-max:mb-2 md-max:shrink-0 md-max:grow-0 md-max:basis-full">
                                             <Skeleton
                                                height={20}
                                                width={270}
                                             />
                                          </div>
                                          <div className="mt-0.5 shrink-0 text-xs leading-custom4 text-neutral4 md-max:mr-auto">
                                             <Skeleton
                                                height={20}
                                                width={107}
                                             />
                                          </div>
                                       </div>
                                       <Skeleton
                                          height={40}
                                          isWithFull
                                       />
                                    </div>
                                 </div>
                                 <div className="flex space-x-4 pb-6 md-max:px-8 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                                    <Skeleton
                                       height={48}
                                       width={48}
                                       rounded="full"
                                    />
                                    <div className="space-y-2">
                                       <div className="flex md-max:flex-wrap">
                                          <div className="!mr-auto pr-0 md:pr-8 md-max:mb-2 md-max:shrink-0 md-max:grow-0 md-max:basis-full">
                                             <Skeleton
                                                height={20}
                                                width={270}
                                             />
                                          </div>
                                          <div className="mt-0.5 shrink-0 text-xs leading-custom4 text-neutral4 md-max:mr-auto">
                                             <Skeleton
                                                height={20}
                                                width={107}
                                             />
                                          </div>
                                       </div>
                                       <Skeleton
                                          height={40}
                                          isWithFull
                                       />
                                    </div>
                                 </div>
                              </>
                           ) : filteredNotifications().length ? (
                              filteredNotifications()
                                 .slice(0, more)
                                 .map(e => (
                                    <div
                                       key={e.id_notif}
                                       className="flex space-x-4 pb-6 md-max:px-8 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                                       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-neutral6 dark:border-neutral3">
                                          <svg className="h-6 w-6 fill-neutral4 transition-colors duration-300">
                                             <use
                                                xlinkHref={`#icon-${
                                                   e.type === 'news'
                                                      ? 'lightning'
                                                      : e.type === 'trade'
                                                      ? 'candlesticks'
                                                      : e.type === 'deposit'
                                                      ? 'wallet'
                                                      : e.type === 'alert'
                                                      ? 'coin'
                                                      : e.type === 'security'
                                                      ? 'lock'
                                                      : e.type === 'transfer'
                                                      ? 'share'
                                                      : 'cloud'
                                                }`}
                                             />
                                          </svg>
                                       </div>
                                       <div className="space-y-2">
                                          <div className="flex md-max:flex-wrap">
                                             <div className="!mr-auto pr-0 text-base font-medium leading-normal md:pr-8 md-max:mb-2 md-max:shrink-0 md-max:grow-0 md-max:basis-full">
                                                {truncateEnd(e.detail, 30)}
                                             </div>
                                             <div className="mt-0.5 shrink-0 text-xs leading-custom4 text-neutral4 md-max:mr-auto">
                                                {localeDate(
                                                   e.date,
                                                   'shortDate'
                                                )}
                                             </div>
                                             {e.read && markAllAsRead && (
                                                <div className="mt-1.25 ml-4 block h-3 w-3 shrink-0 rounded-full bg-primary5" />
                                             )}
                                          </div>
                                          <div className="text-xs leading-custom4 text-neutral4">
                                             {e.detail}
                                          </div>
                                       </div>
                                    </div>
                                 ))
                           ) : (
                              <div className="flex h-96 items-center justify-center">
                                 <div className="flex flex-col items-center justify-center space-y-3">
                                    <IcEmty />
                                    <div className="text-xs font-semibold text-neutral4">
                                       No result found
                                    </div>
                                 </div>
                              </div>
                           )}
                        </div>
                        {more < filteredNotifications()?.length && (
                           <div className="mt-8 text-center md:mt-14">
                              <Button
                                 text="Load more"
                                 variant="outline"
                                 size="normal"
                                 icRight={
                                    <svg className="ml-3 h-4 w-4 fill-neutral4 dark:fill-neutral8">
                                       <use xlinkHref="#icon-calendar" />
                                    </svg>
                                 }
                                 width="noFull"
                                 onClick={() => setMore(more + rows)}
                              />
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="mt-4 rounded-lg p-8">
                  <TutorialAlt />
               </div>
            </div>
         </section>
      </>
   );
};
