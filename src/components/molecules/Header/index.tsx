import React, {
   useState,
   useRef,
   useEffect,
   FunctionComponent
} from 'react';
import type { RouterProps } from 'react-router';
import {
   Link,
   withRouter
} from 'react-router-dom';
import { compose } from 'redux';
import {
   connect,
   MapDispatchToPropsFunction,
} from 'react-redux';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import {
   changeColorTheme,
   changeLanguage,
   logoutFetch,
   Market,
   selectConfigsLoading,
   selectCurrentColorTheme,
   selectCurrentLanguage,
   selectCurrentMarket,
   selectLogoutLoading,
   selectUserFetching,
   selectUserInfo,
   selectUserLoggedIn,
} from 'modules';
import type {
   RootState,
   User
} from 'modules';
import {
   icLogoDark,
   icLogoLight
} from 'assets';
import { useScrollUp } from 'hooks';
import {
   Button,
   Skeleton,
   DropdownListFlag,
   // DropdownListBuyCrypto,
   ModalConfirmLogout,
   DropdownListNotification,
   DropdownListProfile
} from 'components';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';

const noHeaderRoutes = [
   '/confirm',
   '/404',
   '/500',
   '/login',
   '/register',
   '/forgot_password',
   '/accounts/password_reset',
   '/email-verification',
   '/geetest',
   '/chart',
   '/exchange',
];

const noHeaderFull = [
   '/wallets/withdraw',
   '/wallets/deposit',
   '/wallets/transfer',
]

const headerFull = [
   '/trading',
   '/wallets',
   // '/wallet-details',
   '/trades',
   '/orders',
   '/fiat-and-spot',
];

interface ReduxProps {
   user: User;
   isLogined: boolean;
   configsLoading: boolean;
   theme: string;
   lang: string;
   userLoading: boolean;
   currentMarket: Market | undefined;
   logoutLoading: boolean;
}

interface DispatchProps {
   changeColorTheme: typeof changeColorTheme;
   changeLanguage: typeof changeLanguage;
   logout: typeof logoutFetch;
}

interface LocationProps extends RouterProps {
   location: {
      pathname: string;
   };
}

type HeaderProps = ReduxProps & DispatchProps & IntlProps & LocationProps;

const HeaderFC = ({
   user,
   isLogined,
   configsLoading,
   theme,
   lang,
   changeColorTheme,
   changeLanguage,
   logout,
   location,
   history,
   currentMarket,
   userLoading,
   logoutLoading,
   intl,
}: HeaderProps) => {
   useScrollUp();
   const [showModalConfirmLogout, setShowModalConfirmLogout] = useState<boolean>(false);
   const [isDarkMode, setDarkMode] = useState<boolean>(theme === 'dark' ? true : false);
   const [dataMode, setDataMode] = useState<string>(window.document.documentElement.dataset.mode = theme === 'dark' ? 'dark' : 'light');

   const handleSwitch = () => changeColorTheme(isDarkMode ? 'light' : 'dark');
   const dropDwonCryptoDarkMode = (checked: boolean) => {
      handleSwitch();
      setDataMode(dataMode ? 'light' : 'dark');
      setDarkMode(checked);
   };

   const handleSetShowModalConfirmLogout = () => setShowModalConfirmLogout(!showModalConfirmLogout);
   const handleLogout = () => {
      logout();
      setShowModalConfirmLogout(!showModalConfirmLogout);
   }

   const handleSelectDropDownFlag = (value: string, type?: string) => type === 'lang' ? changeLanguage(value) : null;
   const translate = (id: string) => intl.formatMessage({ id });

   // const [dropDwonCrypto, setDropDwonCrypto] = useState<boolean>(false);
   const [dropDwonFlag, setDropDwonFlag] = useState<boolean>(false);
   const [dropDwonNotif, setDropDwonNotif] = useState<boolean>(false);
   const [dropDwonProfile, setDropDwonProfile] = useState<boolean>(false);

   // const refDropDwonCrypto = useRef<HTMLDivElement>(null);
   const refDropDwonFlag = useRef<HTMLDivElement>(null);
   const refDropDwonNotif = useRef<HTMLButtonElement>(null);
   const refDropDwonProfile = useRef<HTMLDivElement>(null);

   // const handleSetDropDwonCrypto = () => setDropDwonCrypto(!dropDwonCrypto);
   const handleSetDropDwonFlag = () => setDropDwonFlag(!dropDwonFlag);
   const handleSetDropDwonNotif = () => setDropDwonNotif(!dropDwonNotif);
   const handleSetDropDwonProfile = (e) => {
      e.stopPropagation();
      setDropDwonProfile(!dropDwonProfile);
   }

   // const handleOutsideDropDwonCrypto = (e: any) => {
   //    if (refDropDwonCrypto && !refDropDwonCrypto?.current?.contains(e.target)) setDropDwonCrypto(false);
   // }
   const handleOutsideDropDwonFlag = (e: any) => {
      if (refDropDwonFlag && !refDropDwonFlag?.current?.contains(e.target)) setDropDwonFlag(false);
   }
   const handleOutsideDropDwonNotif = (e: any) => {
      if (refDropDwonNotif && !refDropDwonNotif?.current?.contains(e.target)) setDropDwonNotif(false);
   }
   const handleOutsideDropDwonProfile = (e: any) => {
      if (refDropDwonProfile && !refDropDwonProfile?.current?.contains(e.target)) setDropDwonProfile(false);
   }

   // useEffect(() => {
   //    document.addEventListener('mousedown', handleOutsideDropDwonCrypto);
   //    return () => document.removeEventListener('mousedown', handleOutsideDropDwonCrypto);
   // }, []);
   useEffect(() => {
      document.addEventListener('mousedown', handleOutsideDropDwonFlag);
      return () => document.removeEventListener('mousedown', handleOutsideDropDwonFlag);
   }, []);
   useEffect(() => {
      document.addEventListener('mousedown', handleOutsideDropDwonNotif);
      return () => document.removeEventListener('mousedown', handleOutsideDropDwonNotif);
   }, []);
   useEffect(() => {
      document.addEventListener('mousedown', handleOutsideDropDwonProfile);
      return () => document.removeEventListener('mousedown', handleOutsideDropDwonProfile);
   }, []);

   const handleSwithTheme = () => dropDwonCryptoDarkMode(isDarkMode ? false : true);

   const { push } = history;
   const shouldRenderHeader = !noHeaderRoutes.some(r => location.pathname.includes(r));
   const shouldRenderHeaderFull = !headerFull.some(r => location.pathname.includes(r));
   const shouldNoRenderHeaderFull = noHeaderFull.some(r => location.pathname === r);

   if (!shouldRenderHeader || configsLoading) {
      return <></>;
   }

   return (
      <>
         <header className={`select-none relative z-10 pt-8 pb-6 md:py-5 px-0 shadow-none ${shouldRenderHeaderFull || shouldNoRenderHeaderFull ? 'md:shadow-header' : ''} dark:shadow-header-dark`}>
            <div className={`${(shouldRenderHeaderFull || shouldNoRenderHeaderFull) ? 'w-full max-w-7xl mx-auto px-6 md:px-5 lg:px-10 lg2:px-20' : 'max-w-full px-6 md:px-5'} flex items-center`}>
               <nav className="flex items-center justify-between w-full">
                  <div className="flex space-x-3 lg:space-x-8">
                     <Link to="/">
                        <img
                           className="md:w-32 lg:w-34"
                           src={theme === 'dark' ? icLogoDark : icLogoLight}
                           alt="Logo"
                        />
                     </Link>
                     <div className="1xl-max:hidden border-r border-solid h-[content] border-gray4 dark:border-neutral3" />
                     <div className="hidden md:flex items-center space-x-0 md:space-x-2 lg:space-x-5 lg2:space-x-8 font-dm font-bold text-neutral4 whitespace-nowrap">
                        <Link to={`/trading/${currentMarket?.id}`} className={`cursor-pointer ${location.pathname.includes('/trading') ? 'text-neutral2 dark:text-neutral8' : 'hover:text-neutral2 dark:hover:text-neutral8'} transition-colors duration-300`}>
                           Exchange
                        </Link>
                        {/* <div
                           ref={refDropDwonCrypto}
                           onClick={handleSetDropDwonCrypto}
                           className="relative select-none"
                        >
                           <div className="flex items-center space-x-1 group">
                              <div className="cursor-pointer group-hover:text-neutral2 dark:group-hover:text-neutral8 transition-colors duration-300">
                                 {translate('page.body.trade.header.buy_crypto')}
                              </div>
                              <svg className={`w-4 h-4 ${dropDwonCrypto ? 'rotate-180 fill-neutral1 dark:fill-neutral8' : 'fill-neutral4 group-hover:fill-neutral1 dark:group-hover:fill-neutral8'} transition ease-out duration-300`}>
                                 <use xlinkHref="#icon-arrow-down" />
                              </svg>
                           </div>
                           <DropdownListBuyCrypto isOpen={dropDwonCrypto} translate={translate} />
                        </div> */}
                        <Link
                           to="/markets"
                           className={`cursor-pointer ${location.pathname.includes('/markets') ? 'text-neutral2 dark:text-neutral8' : 'hover:text-neutral2 dark:hover:text-neutral8'} transition-colors duration-300`}
                        >
                           {translate('page.body.trade.header.markets')}
                        </Link>
                        {/* <Link
                           to="/learn-crypto"
                           className={`cursor-pointer ${location.pathname.includes('/learn-crypto') ? 'text-neutral2 dark:text-neutral8' : 'hover:text-neutral2 dark:hover:text-neutral8'} transition-colors duration-300`}
                        >
                           {translate('page.body.trade.header.discover')}
                        </Link> */}
                     </div>
                  </div>
                  <div className="flex items-center space-x-0 md:space-x-4 lg:space-x-8">
                     <div className="relative" ref={refDropDwonFlag}>
                        <div
                           className="cursor-pointer flex items-center space-x-1 group"
                           onClick={handleSetDropDwonFlag}
                        >
                           <div className="text-neutral2 dark:text-neutral8 font-dm font-bold whitespace-nowrap transition-colors duration-300">
                              {lang.toUpperCase()}/USD
                           </div>
                           <svg className={`w-4 h-4 ${dropDwonFlag ? 'rotate-180 fill-neutral1 dark:fill-neutral8' : 'fill-neutral4 group-hover:fill-neutral1 dark:group-hover:fill-neutral8'} transition ease-out duration-300`}>
                              <use xlinkHref="#icon-arrow-down" />
                           </svg>
                        </div>
                        <DropdownListFlag
                           isOpen={dropDwonFlag}
                           langActive={lang}
                           onSelect={handleSelectDropDownFlag}
                        />
                     </div>
                     {userLoading ? (
                        <div className="flex items-center space-x-3 lg:space-x-4 lg2:space-x-6">
                           <Skeleton className="h-6 w-6" rounded="full" />
                           <Skeleton className="h-6 w-6" rounded="full" />
                           <Skeleton className="h-10 w-17" rounded="full" />
                           <Skeleton className="h-6 w-6" rounded="full" />
                           <Skeleton className="h-10 w-10" rounded="full" />
                        </div>
                     ) : isLogined ? (
                        <div className="flex items-center space-x-3 lg:space-x-4 lg2:space-x-6">
                           <Link to="/activity" className="flex justify-center items-center shrink-0 w-6 h-6">
                              <svg className="w-6 h-6 fill-neutral4 hover:fill-neutral2 dark:hover:fill-neutral8 transition-all duration-300">
                                 <use xlinkHref="#icon-lightning" />
                              </svg>
                           </Link>
                           <button
                              ref={refDropDwonNotif}
                              className="relative flex justify-center items-center shrink-0 w-6 h-6"
                              onClick={handleSetDropDwonNotif}
                           >
                              <svg
                                 className="h-6 w-6 fill-neutral4 hover:fill-neutral2 dark:hover:fill-neutral8 transition-all duration-300"
                                 style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"
                              >
                                 <g id="_01_align_center" data-name="01 align center">
                                    <path
                                       d="M23.259,16.2l-2.6-9.371A9.321,9.321,0,0,0,2.576,7.3L.565,16.35A3,3,0,0,0,3.493,20H7.1a5,5,0,0,0,9.8,0h3.47a3,3,0,0,0,2.89-3.8ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm9.165-4.395a.993.993,0,0,1-.8.395H3.493a1,1,0,0,1-.976-1.217l2.011-9.05a7.321,7.321,0,0,1,14.2-.372l2.6,9.371A.993.993,0,0,1,21.165,17.605Z" />
                                 </g>
                              </svg>
                              <div className="flex absolute -right-1 -top-2.5 w-3 h-3">
                                 <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary5 opacity-75" />
                                 <div className="relative inline-flex w-3 h-3 rounded-full bg-primary5" />
                              </div>
                              <DropdownListNotification
                                 isOpen={dropDwonNotif}
                                 notifActive={''}
                                 onSelect={() => push('/notifications')}
                              />
                           </button>
                           <Link
                              to="/wallets"
                              className={`select-none inline-flex font-dm justify-center items-center h-10 rounded-20 py-0 px-4 whitespace-nowrap ${location.pathname.includes('/wallet-') ? 'bg-neutral2 text-neutral8 dark:bg-neutral3' : 'bg-none shadow-border dark:shadow-none dark:border-2 dark:border-neutral4'} hover:bg-neutral2 hover:-translate-y-1 hover:shadow-sm hover:text-neutral8 dark:text-neutral8 transition-all duration-300 cursor-pointer`}
                           >
                              Wallet
                           </Link>
                           <DarkModeSwitch
                              className="h-6 w-6 transition-all duration-300"
                              checked={!isDarkMode}
                              onChange={handleSwithTheme}
                              size={24}
                              sunColor="#fcfcfd"
                              moonColor="#777E90"
                           />
                           <div
                              className="relative cursor-pointer"
                              ref={refDropDwonProfile}
                              onClick={handleSetDropDwonProfile}
                           >
                              <div className="w-10 h-10 rounded-full overflow-hidden select-none">
                                 <img className="object-cover w-full h-full" src={`https://avatars.dicebear.com/api/identicon/${user.email}.svg`} alt={user.email} />
                              </div>
                              <DropdownListProfile
                                 isOpen={dropDwonProfile}
                                 headerFull={shouldRenderHeaderFull}
                                 handleSetShowModalConfirmLogout={handleSetShowModalConfirmLogout}
                                 translate={translate}
                              />
                           </div>
                        </div>
                     ) : (
                        <>
                           <DarkModeSwitch
                              className="h-6 w-6 transition-all duration-300"
                              checked={!isDarkMode}
                              onChange={handleSwithTheme}
                              size={24}
                              sunColor="#fcfcfd"
                              moonColor="#777E90"
                           />
                           <div className="hidden md:flex items-center space-x-2">
                              <Button
                                 text="Register"
                                 size="normal"
                                 onClick={() => push('/register')}
                              />
                              <Button
                                 text="Login"
                                 size="normal"
                                 variant="outline"
                                 onClick={() => push('/login')}
                              />
                           </div>
                        </>
                     )}
                     <svg
                        className="flex md:hidden"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M6.66683 10.667C5.93045 10.667 5.3335 11.2639 5.3335 12.0003C5.3335 12.7367 5.93045 13.3337 6.66683 13.3337H25.3335C26.0699 13.3337 26.6668 12.7367 26.6668 12.0003C26.6668 11.2639 26.0699 10.667 25.3335 10.667H6.66683Z"
                           fill="#777E91"
                        />
                        <path
                           d="M6.66683 18.667C5.93045 18.667 5.3335 19.2639 5.3335 20.0003C5.3335 20.7367 5.93045 21.3337 6.66683 21.3337H25.3335C26.0699 21.3337 26.6668 20.7367 26.6668 20.0003C26.6668 19.2639 26.0699 18.667 25.3335 18.667H6.66683Z"
                           fill="#777E91"
                        />
                     </svg>
                  </div>
               </nav>
            </div>
         </header>
         <ModalConfirmLogout
            show={showModalConfirmLogout}
            close={handleSetShowModalConfirmLogout}
            handleLogout={handleLogout}
            isLoading={logoutLoading}
         />
      </>
   )
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   configsLoading: selectConfigsLoading(state),
   user: selectUserInfo(state),
   isLogined: selectUserLoggedIn(state),
   theme: selectCurrentColorTheme(state),
   lang: selectCurrentLanguage(state),
   currentMarket: selectCurrentMarket(state),
   userLoading: selectUserFetching(state),
   logoutLoading: selectLogoutLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   changeColorTheme: payload => dispatch(changeColorTheme(payload)),
   changeLanguage: lang => dispatch(changeLanguage(lang)),
   logout: () => dispatch(logoutFetch())
});

export const Header = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(HeaderFC) as FunctionComponent;
