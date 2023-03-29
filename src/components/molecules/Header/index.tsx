import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { platformCurrency } from 'api';
import { icLogoDark, icLogoLight } from 'assets';
import { useOnHoverOutside, useReduxSelector, useScrollUp } from 'hooks';
import {
   Button,
   FlexCenter,
   Image,
   Navlink,
   SVG,
   Skeleton,
   ThemeSwitch,
   DropdownListBuyCrypto,
   DropdownListEvent,
   DropdownListFlag,
   DropdownListNotification,
   DropdownListProfile,
   ModalConfirmLogout,
} from 'components';
import {
   changeColorTheme,
   changeLanguage,
   logoutFetch,
   selectConfigsLoading,
   selectCurrentColorTheme,
   selectCurrentLanguage,
   selectCurrentMarket,
   selectUserFetching,
   selectUserInfo,
   selectUserLoggedIn,
} from 'modules';
import { classNames } from 'helpers';

const noHeaderRoutes = [
   '/confirm',
   '/404',
   '/500',
   '/login',
   '/register',
   '/forgot-password',
   '/accounts/password-reset',
   '/email-verification',
   '/geetest',
   '/chart',
   '/exchange',
];

const noHeaderFull = [
   '/wallets/withdraw',
   '/wallets/deposit',
   '/wallets/transfer',
];

const headerFull = [
   '/trading',
   '/wallets',
   '/trades',
   '/orders',
   '/fiat-and-spot',
];

export const Header = withRouter(({ history }) => {
   useScrollUp();
   const { formatMessage } = useIntl();
   const dispatch = useDispatch();

   const user = useReduxSelector(selectUserInfo);
   const userLoading = useReduxSelector(selectUserFetching);
   const isLogined = useReduxSelector(selectUserLoggedIn);
   const configsLoading = useReduxSelector(selectConfigsLoading);
   const theme = useReduxSelector(selectCurrentColorTheme);
   const lang = useReduxSelector(selectCurrentLanguage);
   const currentMarket = useReduxSelector(selectCurrentMarket)!;

   const [showModalConfirmLogout, setShowModalConfirmLogout] = useState(false);
   const [isDarkMode, setDarkMode] = useState(theme === 'dark');
   const [dataMode, setDataMode] = useState(
      (window.document.documentElement.dataset.mode =
         theme === 'dark' ? 'dark' : 'light')
   );
   const [dropDwonCrypto, setDropDwonCrypto] = useState(false);
   const [dropDwonEvent, setDropDwonEvent] = useState(false);
   const [dropDwonFlag, setDropDwonFlag] = useState(false);
   const [dropDwonNotif, setDropDwonNotif] = useState(false);
   const [dropDwonProfile, setDropDwonProfile] = useState(false);

   const refDropDwonCrypto = useRef<HTMLDivElement>(null);
   const refDropDwonEvent = useRef<HTMLDivElement>(null);
   const refDropDwonFlag = useRef<HTMLDivElement>(null);
   const refDropDwonNotif = useRef<HTMLDivElement>(null);
   const refDropDwonProfile = useRef<HTMLDivElement>(null);

   const translate = useCallback(
      (id: string) => formatMessage({ id }),
      [formatMessage]
   );
   const handleSwitch = useCallback(
      () => dispatch(changeColorTheme(isDarkMode ? 'light' : 'dark')),
      [dispatch, isDarkMode]
   );
   const dropDwonCryptoDarkMode = useCallback(
      (checked: boolean) => {
         handleSwitch();
         setDataMode(dataMode ? 'light' : 'dark');
         setDarkMode(checked);
      },
      [dataMode, handleSwitch]
   );
   const handleSelectDropDownFlag = useCallback(
      (value: string, type?: string) => {
         if (type === 'lang') {
            dispatch(changeLanguage(value));
         }
      },
      [dispatch]
   );
   const handleSwithTheme = useCallback(
      () => dropDwonCryptoDarkMode(!isDarkMode),
      [dropDwonCryptoDarkMode, isDarkMode]
   );
   const handleSetShowModalConfirmLogout = useCallback(
      () => setShowModalConfirmLogout(!showModalConfirmLogout),
      [showModalConfirmLogout]
   );
   const handleLogout = useCallback(() => {
      dispatch(logoutFetch());
      setShowModalConfirmLogout(!showModalConfirmLogout);
   }, [dispatch, showModalConfirmLogout]);

   useOnHoverOutside(refDropDwonCrypto, () => setDropDwonCrypto(false));
   useOnHoverOutside(refDropDwonEvent, () => setDropDwonEvent(false));
   useOnHoverOutside(refDropDwonFlag, () => setDropDwonFlag(false));
   useOnHoverOutside(refDropDwonNotif, () => setDropDwonNotif(false));
   useOnHoverOutside(refDropDwonProfile, () => setDropDwonProfile(false));

   const pathname = history.location.pathname;
   const shouldRenderHeader = useMemo(
      () => !noHeaderRoutes.some(r => pathname.includes(r)),
      [pathname]
   );
   const shouldRenderHeaderFull = useMemo(
      () => !headerFull.some(r => pathname.includes(r)),
      [pathname]
   );
   const shouldNoRenderHeaderFull = useMemo(
      () => noHeaderFull.some(r => pathname === r),
      [pathname]
   );

   const renderThemeSwitch = useMemo(
      () => (
         <ThemeSwitch
            checked={!isDarkMode}
            onChange={handleSwithTheme}
         />
      ),
      [handleSwithTheme, isDarkMode]
   );
   const renderDropdownFlag = useMemo(
      () => (
         <DropdownListFlag
            isOpen={dropDwonFlag}
            langActive={lang}
            onSelect={handleSelectDropDownFlag}
         />
      ),
      [dropDwonFlag, handleSelectDropDownFlag, lang]
   );
   const renderSkeleton = useMemo(
      () => (
         <FlexCenter className="flex items-center space-x-3 lg:space-x-4 lg2:space-x-6">
            <Skeleton
               className="h-6 w-6"
               rounded="full"
            />
            <Skeleton
               className="h-6 w-6"
               rounded="full"
            />
            <Skeleton
               className="h-10 w-17"
               rounded="full"
            />
            <Skeleton
               className="h-6 w-6"
               rounded="full"
            />
            <Skeleton
               height={40}
               width={40}
               rounded="full"
            />
         </FlexCenter>
      ),
      [userLoading]
   );
   const renderNavAfterLogin = useMemo(
      () => (
         <div className="flex items-center space-x-3 lg:space-x-4 lg2:space-x-6">
            <Link
               to="/activity"
               className="flex h-6 w-6 shrink-0 items-center justify-center">
               <svg
                  className={classNames(
                     `h-6 w-6 ${
                        pathname === '/activity'
                           ? 'fill-neutral2 dark:fill-neutral8'
                           : 'fill-neutral4 hover:fill-neutral2 dark:hover:fill-neutral8'
                     } transition-all duration-300`
                  )}>
                  <use xlinkHref="#icon-lightning" />
               </svg>
            </Link>
            <div
               ref={refDropDwonNotif}
               className="relative -my-10 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center py-10"
               onMouseOver={() => setDropDwonNotif(true)}
               onFocus={() => setDropDwonNotif(true)}>
               <svg
                  className="h-6 w-5 fill-neutral4 transition-all duration-300 hover:fill-neutral2 dark:hover:fill-neutral8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512">
                  <g
                     id="_01_align_center"
                     data-name="01 align center">
                     <path d="M23.259,16.2l-2.6-9.371A9.321,9.321,0,0,0,2.576,7.3L.565,16.35A3,3,0,0,0,3.493,20H7.1a5,5,0,0,0,9.8,0h3.47a3,3,0,0,0,2.89-3.8ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm9.165-4.395a.993.993,0,0,1-.8.395H3.493a1,1,0,0,1-.976-1.217l2.011-9.05a7.321,7.321,0,0,1,14.2-.372l2.6,9.371A.993.993,0,0,1,21.165,17.605Z" />
                  </g>
               </svg>
               <div className="absolute -right-1 top-4 flex h-3 w-3">
                  <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary5 opacity-75" />
                  <div className="relative inline-flex h-3 w-3 rounded-full bg-primary5" />
               </div>
               <DropdownListNotification
                  isOpen={dropDwonNotif}
                  notifActive=""
                  onSelect={() => history.push('/notifications')}
               />
            </div>
            <Button
               text="Wallet"
               variant={pathname.includes('/wallets') ? 'dark' : 'outline'}
               size="normal"
               width="noFull"
               onClick={() => history.push('/wallets')}
            />
            {renderThemeSwitch}
            <div
               className="relative cursor-pointer"
               ref={refDropDwonProfile}
               onMouseOver={() => setDropDwonProfile(true)}
               onFocus={() => setDropDwonProfile(true)}>
               <div className="-my-5 table h-10 w-10 select-none overflow-hidden rounded-full py-5">
                  <Image
                     className="h-full w-full object-cover"
                     src={`https://avatars.dicebear.com/api/identicon/${user.email}.svg`}
                     alt={user.email}
                     title={user.email}
                     height={40}
                     width={40}
                     classNameParent="overflow-hidden rounded-full"
                  />
               </div>
               <DropdownListProfile
                  isOpen={dropDwonProfile}
                  headerFull={shouldRenderHeaderFull}
                  handleSetShowModalConfirmLogout={
                     handleSetShowModalConfirmLogout
                  }
                  translate={translate}
               />
            </div>
         </div>
      ),
      [
         dropDwonNotif,
         dropDwonProfile,
         handleSetShowModalConfirmLogout,
         history,
         pathname,
         renderThemeSwitch,
         shouldRenderHeaderFull,
         translate,
         user.email,
      ]
   );
   const renderNavBeforeLogin = useMemo(
      () => (
         <>
            {renderThemeSwitch}
            <div className="hidden items-center space-x-2 md:flex">
               <Button
                  text="Register"
                  size="normal"
                  onClick={() => history.push('/register', { pathname })}
               />
               <Button
                  text="Login"
                  size="normal"
                  variant="outline"
                  onClick={() => history.push('/login', { pathname })}
               />
            </div>
         </>
      ),
      [pathname, history, renderThemeSwitch]
   );
   const renderModalLogout = useMemo(
      () => (
         <ModalConfirmLogout
            show={showModalConfirmLogout}
            close={handleSetShowModalConfirmLogout}
            handleLogout={handleLogout}
            isLoading={false}
         />
      ),
      [handleLogout, handleSetShowModalConfirmLogout, showModalConfirmLogout]
   );

   if (!shouldRenderHeader || configsLoading) {
      return <></>;
   }

   return (
      <>
         <header
            className={classNames(
               `relative z-10 select-none bg-neutral8 pt-8 pb-6 shadow-none dark:bg-neutral1 md:py-5 ${
                  shouldRenderHeaderFull || shouldNoRenderHeaderFull
                     ? 'md:shadow-header'
                     : ''
               } dark:shadow-header-dark`
            )}>
            <div
               className={classNames(
                  `${
                     shouldRenderHeaderFull || shouldNoRenderHeaderFull
                        ? 'mx-auto w-full max-w-7xl px-6 md:px-5 lg:px-10 lg2:px-20'
                        : 'max-w-full px-6 md:px-5'
                  } flex items-center`
               )}>
               <nav className="flex w-full items-center justify-between">
                  <div className="flex space-x-3 lg:space-x-8">
                     <Link to="/">
                        <img
                           className="md:w-32 lg:w-34"
                           src={theme === 'dark' ? icLogoDark : icLogoLight}
                           alt="Logo"
                        />
                     </Link>
                     <div className="h-[content] border-r border-neutral6 dark:border-neutral3 1xl-max:hidden" />
                     <div className="hidden items-center space-x-0 whitespace-nowrap font-dm text-neutral4 md:flex md:space-x-2 lg:space-x-5 lg2:space-x-8">
                        <Navlink
                           text="Exchange"
                           to={`/trading/${currentMarket?.id}`}
                           pathActive="/trading"
                        />
                        <div
                           ref={refDropDwonCrypto}
                           onMouseOver={() => setDropDwonCrypto(true)}
                           onFocus={() => setDropDwonCrypto(true)}
                           className="relative select-none">
                           <div className="group -my-7 flex cursor-pointer items-center space-x-1 py-7">
                              <div className="transition-colors duration-300 group-hover:text-neutral2 dark:group-hover:text-neutral8">
                                 {translate(
                                    'page.body.trade.header.buy_crypto'
                                 )}
                              </div>
                              <svg
                                 className={`h-4 w-4 ${
                                    dropDwonCrypto
                                       ? 'rotate-180 fill-neutral1 dark:fill-neutral8'
                                       : 'fill-neutral4 group-hover:fill-neutral1 dark:group-hover:fill-neutral8'
                                 } transition duration-300 ease-out`}>
                                 <use xlinkHref="#icon-arrow-down" />
                              </svg>
                           </div>
                           <DropdownListBuyCrypto
                              isOpen={dropDwonCrypto}
                              translate={translate}
                              pathname={pathname}
                           />
                        </div>
                        <Navlink
                           text={translate('page.body.trade.header.markets')}
                           to="/markets"
                        />
                        <div
                           ref={refDropDwonEvent}
                           onMouseOver={() => setDropDwonEvent(true)}
                           onFocus={() => setDropDwonEvent(true)}
                           className="relative select-none">
                           <div className="group -my-7 flex cursor-pointer items-center space-x-1 py-7">
                              <div className="transition-colors duration-300 group-hover:text-neutral2 dark:group-hover:text-neutral8">
                                 {translate('page.body.trade.header.events')}
                              </div>
                              <SVG
                                 className={`h-4 w-4 ${
                                    dropDwonEvent
                                       ? 'rotate-180 fill-neutral1 dark:fill-neutral8'
                                       : 'fill-neutral4 group-hover:fill-neutral1 dark:group-hover:fill-neutral8'
                                 } transition duration-300 ease-out`}
                                 xlinkHref="arrow-down"
                              />
                           </div>
                           <DropdownListEvent
                              pathname={pathname}
                              isOpen={dropDwonEvent}
                              translate={translate}
                           />
                        </div>
                        {/* <Link
                           to="/learn-crypto"
                           className={`cursor-pointer ${pathname.includes('/learn-crypto') ? 'text-neutral2 dark:text-neutral8' : 'hover:text-neutral2 dark:hover:text-neutral8'} transition-colors duration-300`}
                        >
                           {translate('page.body.trade.header.discover')}
                        </Link> */}
                     </div>
                  </div>
                  <FlexCenter className="md:space-x-4 lg:space-x-8">
                     <div
                        className="relative"
                        ref={refDropDwonFlag}
                        onMouseOver={() => setDropDwonFlag(true)}
                        onFocus={() => setDropDwonFlag(true)}>
                        <div className="group -my-7 flex cursor-pointer items-center space-x-1 py-7">
                           <div className="whitespace-nowrap font-dm text-neutral2 transition-colors duration-300 dark:text-neutral8">
                              {lang.toUpperCase()}/
                              {platformCurrency().toUpperCase()}
                           </div>
                           <svg
                              className={`h-4 w-4 ${
                                 dropDwonFlag
                                    ? 'rotate-180 fill-neutral1 dark:fill-neutral8'
                                    : 'fill-neutral4 group-hover:fill-neutral1 dark:group-hover:fill-neutral8'
                              } transition duration-300 ease-out`}>
                              <use xlinkHref="#icon-arrow-down" />
                           </svg>
                        </div>
                        {renderDropdownFlag}
                     </div>
                     {userLoading
                        ? renderSkeleton
                        : isLogined
                        ? renderNavAfterLogin
                        : renderNavBeforeLogin}
                     <SVG
                        className="flex md:hidden"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M6.66683 10.667C5.93045 10.667 5.3335 11.2639 5.3335 12.0003C5.3335 12.7367 5.93045 13.3337 6.66683 13.3337H25.3335C26.0699 13.3337 26.6668 12.7367 26.6668 12.0003C26.6668 11.2639 26.0699 10.667 25.3335 10.667H6.66683Z"
                           fill="#777E91"
                        />
                        <path
                           d="M6.66683 18.667C5.93045 18.667 5.3335 19.2639 5.3335 20.0003C5.3335 20.7367 5.93045 21.3337 6.66683 21.3337H25.3335C26.0699 21.3337 26.6668 20.7367 26.6668 20.0003C26.6668 19.2639 26.0699 18.667 25.3335 18.667H6.66683Z"
                           fill="#777E91"
                        />
                     </SVG>
                  </FlexCenter>
               </nav>
            </div>
         </header>
         {renderModalLogout}
      </>
   );
});