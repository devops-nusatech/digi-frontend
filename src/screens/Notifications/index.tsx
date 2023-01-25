import React, {
   useEffect,
   useState
} from 'react'
import {
   Button,
   Checkbox,
   Skeleton,
   TutorialAlt
} from 'components'
import axios from 'axios';
import { Notification } from './types'
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
}

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
         await axios.get('https://api.npoint.io/a69cae8e918567992ef0').then(res => {
            setNotifications(res.data);
            setIsLoading(false);
         });
      })();
   }, []);

   const selectAll = () => setState({
      isSecurity: true,
      isWallet: true,
      isTrade: true,
      isDeposit: true,
      isTransfer: true,
      isWithdraw: true,
      isNews: true,
   });
   const unSelectAll = () => setState({
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
      return notifications.filter(e =>
         (e.type === 'security' && isSecurity) ||
         (e.type === 'alert' && isWallet) ||
         (e.type === 'trade' && isTrade) ||
         (e.type === 'deposit' && isDeposit) ||
         (e.type === 'transfer' && isTransfer) ||
         (e.type === 'withdrawal' && isWithdraw) ||
         (e.type === 'news' && isNews)
      );
   }

   return (
      <>
         <section className="py-8 lg-max:pb-16 bg-neutral7 dark:bg-neutral1">
            <div className="w-full max-w-7xl px-8 md:px-10 lg:px-20 mx-auto">
               <div className="p-0 lg:p-10 rounded-lg bg-neutral7 lg:bg-neutral8 dark:bg-neutral1 dark:lg:bg-shade1">
                  <div className="flex md-max:flex-wrap md-max:mb-5 md-max:pb-0 md-max:border-none items-center mb-8 pb-8 border-b border-neutral6 dark:border-neutral3">
                     <div className="text-3.5xl leading-tight tracking-custom1 font-dm mr-auto md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-5">
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
                  <div className="block md:flex flex-row-reverse">
                     <Button
                        text="Advanced filter"
                        size="normal"
                        className="md:hidden"
                     />
                     <div className="shrink-0 md-max:hidden md-max:pt-8 md:w-56.5 lg2:w-72.5 1xl:w-82">
                        <div className="mb-8 text-2xl leading-custom2 font-semibold tracking-custom1">
                           Filters
                        </div>
                        <div className="flex flex-col space-y-6 items-start">
                           <Checkbox
                              text="Security"
                              checked={state.isSecurity}
                              onChecked={() => setState({ ...state, isSecurity: !state.isSecurity })}
                           />
                           <Checkbox
                              text="Wallet"
                              checked={state.isWallet}
                              onChecked={() => setState({ ...state, isWallet: !state.isWallet })}
                           />
                           <Checkbox
                              text="Trade"
                              checked={state.isTrade}
                              onChecked={() => setState({ ...state, isTrade: !state.isTrade })}
                           />
                           <Checkbox
                              text="Deposit"
                              checked={state.isDeposit}
                              onChecked={() => setState({ ...state, isDeposit: !state.isDeposit })}
                           />
                           <Checkbox
                              text="Transfer"
                              checked={state.isTransfer}
                              onChecked={() => setState({ ...state, isTransfer: !state.isTransfer })}
                           />
                           <Checkbox
                              text="Withdrawal"
                              checked={state.isWithdraw}
                              onChecked={() => setState({ ...state, isWithdraw: !state.isWithdraw })}
                           />
                           <Checkbox
                              text="News"
                              checked={state.isNews}
                              onChecked={() => setState({ ...state, isNews: !state.isNews })}
                           />
                        </div>
                        <div className="flex space-x-3 mt-6">
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
                     <div className="grow md-max:pt-12 pr-0 md:pr-8 lg:pr-12 lg2:pr-20">
                        <div className="-mx-8 md:mx-0 space-y-8">
                           {isLoading ? (
                              <>
                                 <div className="flex space-x-4 md-max:px-8 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                                    <Skeleton height={48} width={48} rounded="full" />
                                    <div className="space-y-2">
                                       <div className="md-max:flex-wrap flex">
                                          <div className="md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-2 !mr-auto pr-0 md:pr-8">
                                             <Skeleton height={20} width={270} />
                                          </div>
                                          <div className="shrink-0 md-max:mr-auto mt-0.5 text-xs leading-custom4 text-neutral4">
                                             <Skeleton height={20} width={107} />
                                          </div>
                                       </div>
                                       <Skeleton height={40} isWithFull />
                                    </div>
                                 </div>
                                 <div className="flex space-x-4 md-max:px-8 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                                    <Skeleton height={48} width={48} rounded="full" />
                                    <div className="space-y-2">
                                       <div className="md-max:flex-wrap flex">
                                          <div className="md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-2 !mr-auto pr-0 md:pr-8">
                                             <Skeleton height={20} width={270} />
                                          </div>
                                          <div className="shrink-0 md-max:mr-auto mt-0.5 text-xs leading-custom4 text-neutral4">
                                             <Skeleton height={20} width={107} />
                                          </div>
                                       </div>
                                       <Skeleton height={40} isWithFull />
                                    </div>
                                 </div>
                                 <div className="flex space-x-4 md-max:px-8 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                                    <Skeleton height={48} width={48} rounded="full" />
                                    <div className="space-y-2">
                                       <div className="md-max:flex-wrap flex">
                                          <div className="md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-2 !mr-auto pr-0 md:pr-8">
                                             <Skeleton height={20} width={270} />
                                          </div>
                                          <div className="shrink-0 md-max:mr-auto mt-0.5 text-xs leading-custom4 text-neutral4">
                                             <Skeleton height={20} width={107} />
                                          </div>
                                       </div>
                                       <Skeleton height={40} isWithFull />
                                    </div>
                                 </div>
                              </>
                           ) : filteredNotifications().length ? filteredNotifications().slice(0, more).map(e => (
                              <div key={e.id_notif} className="flex space-x-4 md-max:px-8 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                                 <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full border-2 border-neutral6 dark:border-neutral3">
                                    <svg className="w-6 h-6 fill-neutral4 transition-colors duration-300">
                                       <use xlinkHref={`#icon-${e.type === 'news' ? 'lightning' : e.type === 'trade' ? 'candlesticks' : e.type === 'deposit' ? 'wallet' : e.type === 'alert' ? 'coin' : e.type === 'security' ? 'lock' : e.type === 'transfer' ? 'share' : 'cloud'}`} />
                                    </svg>
                                 </div>
                                 <div className="space-y-2">
                                    <div className="md-max:flex-wrap flex">
                                       <div className="md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-2 !mr-auto pr-0 md:pr-8 text-base leading-normal font-medium">
                                          {truncateEnd(e.detail, 30)}
                                       </div>
                                       <div className="shrink-0 md-max:mr-auto mt-0.5 text-xs leading-custom4 text-neutral4">
                                          {localeDate(e.date, 'shortDate')}
                                       </div>
                                       {e.read && markAllAsRead && (
                                          <div className="block shrink-0 w-3 h-3 mt-1.25 ml-4 rounded-full bg-primary5" />
                                       )}
                                    </div>
                                    <div className="text-xs leading-custom4 text-neutral4">
                                       {e.detail}
                                    </div>
                                 </div>
                              </div>
                           )) : (
                              <div className="flex items-center justify-center h-96">
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
                           <div className="text-center mt-8 md:mt-14">
                              <Button
                                 text="Load more"
                                 variant="outline"
                                 size="normal"
                                 icRight={
                                    <svg className="ml-3 w-4 h-4 fill-neutral4 dark:fill-neutral8">
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
               <div className="mt-4 p-8 rounded-lg">
                  <TutorialAlt />
               </div>
            </div>
         </section>
      </>
   )
}
