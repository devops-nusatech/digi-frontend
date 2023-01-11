import React from 'react'
import { Button, Checkbox, TutorialAlt } from 'components'

export const Notification = () => {
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
                     />
                     <Button
                        text="Clear all"
                        size="normal"
                        variant="outline"
                        width="noFull"
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
                           <Checkbox text="Security" checked={true} />
                           <Checkbox text="Wallet" />
                           <Checkbox text="Trade" />
                           <Checkbox text="Deposit" checked={true} />
                           <Checkbox text="Transfer" />
                           <Checkbox text="Withdrawal" checked={true} />
                           <Checkbox text="News" checked={true} />
                        </div>
                        <div className="flex space-x-3 mt-6">
                           <Button
                              text="Select all"
                              variant="outline"
                              size="normal"
                              width="noFull"
                           />
                           <Button
                              text="Unslect all"
                              variant="outline"
                              size="normal"
                              width="noFull"
                           />
                        </div>
                     </div>
                     <div className="grow md-max:pt-12 pr-0 md:pr-8 lg:pr-12 lg2:pr-20">
                        <div className="-mx-8 md:mx-0 space-y-8">
                           <div className="flex space-x-4 md-max:px-8 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                              <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full border-2 border-neutral6 dark:border-neutral3">
                                 <svg className="w-6 h-6 fill-neutral4 transition-colors duration-300">
                                    <use xlinkHref="#icon-lightning" />
                                 </svg>
                              </div>
                              <div className="space-y-2">
                                 <div className="md-max:flex-wrap flex">
                                    <div className="md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-2 !mr-auto pr-0 md:pr-8 text-base leading-normal font-medium">
                                       Login attempted from new IP
                                    </div>
                                    <div className="shrink-0 md-max:mr-auto mt-0.5 text-xs leading-custom4 text-neutral4">
                                       2021-03-10 20:19:15
                                    </div>
                                    <div className="block shrink-0 w-3 h-3 mt-1.25 ml-4 rounded-full bg-primary5" />
                                 </div>
                                 <div className="text-xs leading-custom4 text-neutral4">
                                    Hello, you've reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled.
                                 </div>
                              </div>
                           </div>
                           <div className="flex space-x-4 md-max:px-8 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                              <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full border-2 border-neutral6 dark:border-neutral3">
                                 <svg className="w-6 h-6 fill-neutral4 transition-colors duration-300">
                                    <use xlinkHref="#icon-wallet" />
                                 </svg>
                              </div>
                              <div className="space-y-2">
                                 <div className="md-max:flex-wrap flex">
                                    <div className="md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-2 !mr-auto pr-0 md:pr-8 text-base leading-normal font-medium">
                                       Login attempted from new IP
                                    </div>
                                    <div className="shrink-0 md-max:mr-auto mt-0.5 text-xs leading-custom4 text-neutral4">
                                       2021-03-10 20:19:15
                                    </div>
                                    <div className="block shrink-0 w-3 h-3 mt-1.25 ml-4 rounded-full bg-primary5" />
                                 </div>
                                 <div className="text-xs leading-custom4 text-neutral4">
                                    Hello, you've reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled.
                                 </div>
                              </div>
                           </div>
                           <div className="flex space-x-4 md-max:px-8 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                              <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full border-2 border-neutral6 dark:border-neutral3">
                                 <svg className="w-6 h-6 fill-neutral4 transition-colors duration-300">
                                    <use xlinkHref="#icon-coin" />
                                 </svg>
                              </div>
                              <div className="space-y-2">
                                 <div className="md-max:flex-wrap flex">
                                    <div className="md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-2 !mr-auto pr-0 md:pr-8 text-base leading-normal font-medium">
                                       Login attempted from new IP
                                    </div>
                                    <div className="shrink-0 md-max:mr-auto mt-0.5 text-xs leading-custom4 text-neutral4">
                                       2021-03-10 20:19:15
                                    </div>
                                    <div className="block shrink-0 w-3 h-3 mt-1.25 ml-4 rounded-full bg-primary5" />
                                 </div>
                                 <div className="text-xs leading-custom4 text-neutral4">
                                    Hello, you've reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled.
                                 </div>
                              </div>
                           </div>
                           <div className="flex space-x-4 md-max:px-8 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                              <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full border-2 border-neutral6 dark:border-neutral3">
                                 <svg className="w-6 h-6 fill-neutral4 transition-colors duration-300">
                                    <use xlinkHref="#icon-lightning" />
                                 </svg>
                              </div>
                              <div className="space-y-2">
                                 <div className="md-max:flex-wrap flex">
                                    <div className="md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-2 !mr-auto pr-0 md:pr-8 text-base leading-normal font-medium">
                                       Login attempted from new IP
                                    </div>
                                    <div className="shrink-0 md-max:mr-auto mt-0.5 text-xs leading-custom4 text-neutral4">
                                       2021-03-10 20:19:15
                                    </div>
                                    <div className="hidden shrink-0 w-3 h-3 mt-1.25 ml-4 rounded-full bg-primary5" />
                                 </div>
                                 <div className="text-xs leading-custom4 text-neutral4">
                                    Hello, you've reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled.
                                 </div>
                              </div>
                           </div>
                           <div className="flex space-x-4 md-max:px-8 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                              <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full border-2 border-neutral6 dark:border-neutral3">
                                 <svg className="w-6 h-6 fill-neutral4 transition-colors duration-300">
                                    <use xlinkHref="#icon-wallet" />
                                 </svg>
                              </div>
                              <div className="space-y-2">
                                 <div className="md-max:flex-wrap flex">
                                    <div className="md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-2 !mr-auto pr-0 md:pr-8 text-base leading-normal font-medium">
                                       Login attempted from new IP
                                    </div>
                                    <div className="shrink-0 md-max:mr-auto mt-0.5 text-xs leading-custom4 text-neutral4">
                                       2021-03-10 20:19:15
                                    </div>
                                    <div className="hidden shrink-0 w-3 h-3 mt-1.25 ml-4 rounded-full bg-primary5" />
                                 </div>
                                 <div className="text-xs leading-custom4 text-neutral4">
                                    Hello, you've reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled.
                                 </div>
                              </div>
                           </div>
                           <div className="flex space-x-4 md-max:px-8 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                              <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full border-2 border-neutral6 dark:border-neutral3">
                                 <svg className="w-6 h-6 fill-neutral4 transition-colors duration-300">
                                    <use xlinkHref="#icon-coin" />
                                 </svg>
                              </div>
                              <div className="space-y-2">
                                 <div className="md-max:flex-wrap flex">
                                    <div className="md-max:shrink-0 md-max:grow-0 md-max:basis-full md-max:mb-2 !mr-auto pr-0 md:pr-8 text-base leading-normal font-medium">
                                       Login attempted from new IP
                                    </div>
                                    <div className="shrink-0 md-max:mr-auto mt-0.5 text-xs leading-custom4 text-neutral4">
                                       2021-03-10 20:19:15
                                    </div>
                                    <div className="hidden shrink-0 w-3 h-3 mt-1.25 ml-4 rounded-full bg-primary5" />
                                 </div>
                                 <div className="text-xs leading-custom4 text-neutral4">
                                    Hello, you've reset the Google Authentication on your account successfully. Your old security items have expired and new security items have now been enabled.
                                 </div>
                              </div>
                           </div>
                        </div>
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
                           />
                        </div>
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
