import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button, InputGroup, Portal } from 'components';
import { IcShorting } from 'assets';
import { useModal } from 'hooks';

export const WalletSidebar = () => {
   const { pathname } = useLocation();
   const { isShow, toggle } = useModal();
   const { push } = useHistory();
   const [showWithdraw, setShowWithdraw] = useState<boolean>(false);
   const handleShowWithdraw = () => setShowWithdraw(!showWithdraw);
   const [openDropdown, setOpenDropdown] = useState(false);

   const handleDropdown = () => setOpenDropdown(!openDropdown);

   const renderIconActive = () => {
      switch (pathname) {
         case '/trades':
            return 'bg-primary3';
         case '/orders':
            return 'bg-secondary1';
         case '/wallets/finances':
            return 'bg-secondary3';
         default:
            return 'bg-neutral2';
      }
   };
   const renderNameDisplayed = () => {
      switch (pathname) {
         case '/trades':
            return 'Trade History';
         case '/orders':
            return 'Order History';
         case '/wallets/finances':
            return 'Finances';
         default:
            return 'Overview';
      }
   };

   return (
      <>
         <aside className="flex h-auto w-full shrink-0 grow-0 basis-44.05 flex-col rounded bg-none pt-0 lg:h-c-screen-22.5 lg:w-44.05 lg:bg-neutral8 lg:pt-6 dark:lg:bg-shade2 lg2:w-64 lg2:basis-64 lg-max:mb-4">
            <div className="hide-scroll mb-auto lg:overflow-y-scroll lg-max:relative lg-max:z-5 lg-max:m-0 lg-max:mt-8">
               <div
                  onClick={handleDropdown}
                  className={`lg-max:relative lg-max:flex lg-max:h-12 lg-max:select-none lg-max:items-center lg-max:rounded-xl lg-max:bg-neutral8 lg-max:pr-16 lg-max:font-medium lg-max:transition-all lg-max:duration-200 dark:lg-max:bg-shade1 ${
                     openDropdown
                        ? 'lg-max:shadow-dropdown-primary after:lg-max:-translate-y-1/2 after:lg-max:rotate-180'
                        : 'lg-max:shadow-input dark:lg-max:shadow-border-dark'
                  } after:lg-max:icon-arrow hidden after:lg-max:absolute after:lg-max:right-4 after:lg-max:top-1/2 after:lg-max:h-6 after:lg-max:w-6 after:lg-max:-translate-y-1/2 after:lg-max:cursor-pointer after:lg-max:transition-transform after:lg-max:duration-200 after:lg-max:content-['']`}>
                  <div
                     className={`ml-6.5 mr-4.5 h-3 w-3 shrink-0 rounded ${renderIconActive()}`}
                  />
                  {renderNameDisplayed()}
               </div>
               <div
                  className={`lg-max:absolute lg-max:inset-x-0 lg-max:top-c-full+1 lg-max:select-none lg-max:overflow-hidden lg-max:rounded-xl lg-max:bg-neutral8 lg-max:shadow-dropdown-4 dark:lg-max:bg-neutral3 ${
                     openDropdown
                        ? 'lg-max:visible lg-max:-translate-y-0 lg-max:opacity-100'
                        : 'lg-max:invisible lg-max:-translate-y-10 lg-max:opacity-0'
                  } flex flex-col lg-max:transition-all lg-max:duration-200`}>
                  <Link
                     to="/wallets"
                     className={`lg-max:hover:bg-neutral6 lg-max:hover:text-neutral2 dark:lg-max:hover:bg-neutral3 dark:lg-max:hover:text-neutral8 ${
                        pathname === '/wallets'
                           ? 'lg-max:bg-neutral6 lg-max:dark:bg-neutral3'
                           : ''
                     } flex h-12 items-center font-dm leading-custom3 transition-colors duration-300 ${
                        pathname === '/wallets/overview' ||
                        pathname === '/wallets'
                           ? ''
                           : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                     }`}>
                     <div className="mb-0 ml-6.5 mr-4.5 mt-0 h-3 w-3 shrink-0 rounded bg-neutral2" />
                     Overview
                  </Link>
                  <Link
                     to="/trades"
                     className={`lg-max:hover:bg-neutral6 lg-max:hover:text-neutral2 dark:lg-max:hover:bg-neutral3 dark:lg-max:hover:text-neutral8 ${
                        pathname === '/trades'
                           ? 'lg-max:bg-neutral6 lg-max:dark:bg-neutral3'
                           : ''
                     } flex h-12 items-center font-dm leading-custom3 transition-colors duration-300 ${
                        pathname.includes('/trades')
                           ? ''
                           : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                     }`}>
                     <div className="mb-0 ml-6.5 mr-4.5 mt-0 h-3 w-3 shrink-0 rounded bg-primary3" />
                     Trade History
                  </Link>
                  <Link
                     to="/orders"
                     className={`lg-max:hover:bg-neutral6 lg-max:hover:text-neutral2 dark:lg-max:hover:bg-neutral3 dark:lg-max:hover:text-neutral8 ${
                        pathname === '/orders'
                           ? 'lg-max:bg-neutral6 lg-max:dark:bg-neutral3'
                           : ''
                     } flex h-12 items-center font-dm leading-custom3 transition-colors duration-300 ${
                        pathname.includes('/orders')
                           ? ''
                           : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                     }`}>
                     <div className="mb-0 ml-6.5 mr-4.5 mt-0 h-3 w-3 shrink-0 rounded bg-secondary1" />
                     Order History
                  </Link>
                  <Link
                     to="/wallets/finances"
                     className={`lg-max:hover:bg-neutral6 lg-max:hover:text-neutral2 dark:lg-max:hover:bg-neutral3 dark:lg-max:hover:text-neutral8 ${
                        pathname === '/wallets/finances'
                           ? 'lg-max:bg-neutral6 lg-max:dark:bg-neutral3'
                           : ''
                     } flex h-12 items-center font-dm leading-custom3 ${
                        pathname === '/wallets/finances'
                           ? ''
                           : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                     } font-bold transition-colors duration-300`}
                     // className={`relative mb-[2.563rem] flex items-center h-12 font-dm leading-custom3 ${pathname.includes('/fiat-and-spot') ? '' : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'} font-bold transition-colors duration-300 after:content-[''] after:absolute after:top-[calc(100%+1.25rem)] after:inset-x-0 after:h-[1px] after:bg-neutral6 after:dark:bg-neutral2`}
                  >
                     <div className="mb-0 ml-6.5 mr-4.5 mt-0 h-3 w-3 shrink-0 rounded bg-secondary3" />
                     Finance History
                  </Link>
               </div>
            </div>
            <div className="p-4 lg:mb-3 lg:mt-6 lg:space-y-3 lg-max:-order-1 lg-max:flex lg-max:space-x-3 lg-max:p-0">
               <Button
                  size="normal"
                  text="Deposit"
                  onClick={() => push('/wallets/deposit')}
               />
               <Button
                  size="normal"
                  variant="outline"
                  text="Withdraw"
                  onClick={() => push('/wallets/withdraw')}
               />
               <Button
                  size="normal"
                  variant="outline"
                  text="Transfer"
                  className="lg:hidden"
                  onClick={() => push('/wallets/transfer')}
               />
            </div>
         </aside>
         <Portal
            close={toggle}
            show={isShow}
            title="Transfer">
            <div className="flex justify-between rounded bg-neutral7 px-6 py-5 dark:bg-neutral3">
               <div className="font-medium text-neutral3 dark:text-neutral6">
                  Available <br /> balance
               </div>
               <div className="text-right">
                  <div className="text-base font-medium">2.56213968 ETH</div>
                  <div className="text-neutral4">$10,095.35</div>
               </div>
            </div>
            <InputGroup
               label="form"
               icon={
                  <svg className="ww-6 h-6 fill-neutral4 transition-all duration-300 dark:fill-neutral8">
                     <use xlinkHref="#icon-arrow-down"></use>
                  </svg>
               }
            />
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral6 transition-all duration-200 hover:scale-105 hover:shadow-md dark:bg-neutral3">
               <IcShorting className="h-4 w-4 fill-neutral3 dark:fill-neutral6" />
            </div>
            <InputGroup
               label="to"
               icon={
                  <svg className="ww-6 h-6 fill-neutral4 transition-all duration-300 dark:fill-neutral8">
                     <use xlinkHref="#icon-arrow-down"></use>
                  </svg>
               }
            />
            <InputGroup
               label="coin"
               icon={
                  <svg className="ww-6 h-6 fill-neutral4 transition-all duration-300 dark:fill-neutral8">
                     <use xlinkHref="#icon-arrow-down"></use>
                  </svg>
               }
            />
            <InputGroup
               label="amount to transfer"
               info="2.14646231064565653 ETH available"
               icon={
                  <svg className="ww-6 h-6 fill-neutral4 transition-all duration-300 dark:fill-neutral8">
                     <use xlinkHref="#icon-arrow-down"></use>
                  </svg>
               }
            />
            <Button text="Transfer" />
         </Portal>
         <Portal
            title={`Widthdrawal IDR`}
            close={handleShowWithdraw}
            show={showWithdraw}>
            {/* <ModalWithdraw beneficiaries={defaultBeneficiary[0]} /> */}
         </Portal>
      </>
   );
};
