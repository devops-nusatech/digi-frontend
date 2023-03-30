import { useModal } from 'hooks';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const ProfileSidebar = () => {
   const { pathname } = useLocation();
   const { isShow, toggle } = useModal();
   // const [isSticky, setIsSticky] = useState<boolean>(false);

   // const setFixedSidebar = () => window.scrollY >= 216 ? setIsSticky(true) : setIsSticky(false);
   // useEffect(() => {
   //    window.addEventListener('scroll', setFixedSidebar);
   //    return () => window.removeEventListener('scroll', setFixedSidebar);
   // }, []);

   const renderIconDisplayed = () => {
      switch (pathname) {
         case '/referrals':
            return 'share';
         case '/api-keys':
            return 'keyboard';
         case '/beneficiaries':
            return 'beneficiary';
         case '/sessions-history':
            return 'laptop';
         case '/2fa':
            return 'barcode';
         case '/change-password':
            return 'lock';
         case '/docs':
            return 'candlesticks';
         default:
            return 'user';
      }
   };
   const renderNameDisplayed = () => {
      switch (pathname) {
         case '/referrals':
            return 'Referrals';
         case '/api-keys':
            return 'API keys';
         case '/beneficiaries':
            return 'beneficiaries';
         case '/tier':
            return 'Tier membership';
         case '/sessions-history':
            return 'Sessions history';
         case '/2fa':
            return '2FA';
         case '/change-password':
            return 'Change password';
         case '/docs':
            return 'API docs';
         default:
            return 'Profile';
      }
   };

   return (
      <div className="mr-8 w-full shrink-0 space-y-6 lg:w-56 lg2:mr-12 lg2:w-72 1xl:mr-20 md-max:mb-6 lg-max:mb-8">
         <div className="lg-max:relative lg-max:z-[5]">
            {/* <div className={`${isSticky ? 'fixed top-20' : ''}lg-max:relative lg-max:z-[5]`}> */}
            <div
               onClick={toggle}
               className={`lg-max:after:icon-arrow hidden lg-max:relative lg-max:flex lg-max:h-12 lg-max:select-none lg-max:items-center lg-max:rounded-3xl lg-max:bg-neutral8 lg-max:pl-4 lg-max:pr-16 lg-max:font-dm lg-max:leading-custom3 lg-max:after:absolute lg-max:after:right-4 lg-max:after:top-1/2 lg-max:after:h-6 lg-max:after:w-6 lg-max:after:-translate-y-1/2 lg-max:after:content-[''] lg-max:dark:bg-neutral2 ${
                  isShow ? 'lg-max:after:rotate-180' : ''
               } lg-max:after:transition-transform lg-max:after:duration-200`}>
               <svg className="lg-max:mr-2 lg-max:h-6 lg-max:w-6 lg-max:fill-neutral2 lg-max:transition-colors lg-max:duration-200 lg-max:dark:fill-neutral8">
                  <use xlinkHref={`#icon-${renderIconDisplayed()}`} />
               </svg>
               {renderNameDisplayed()}
            </div>
            <div
               className={`lg-max:absolute lg-max:left-0 lg-max:right-0 lg-max:top-c-full+1 lg-max:z-2 lg-max:rounded-3xl lg-max:bg-neutral8 lg-max:p-4 lg-max:shadow-sidebar-dropdown lg-max:dark:bg-neutral2 ${
                  isShow
                     ? 'lg-max:visible lg-max:translate-y-0 lg-max:opacity-100'
                     : 'lg-max:invisible lg-max:-translate-y-10 lg-max:opacity-0'
               } space-y-1 lg:space-y-3 lg-max:transition-all lg-max:duration-200`}>
               <Link
                  to="/profile"
                  className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
                     pathname.includes('/profile')
                        ? ''
                        : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-colors duration-300`}>
                  <svg
                     className={`h-6 w-6 ${
                        pathname.includes('/profile')
                           ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                           : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
                     }`}>
                     <use xlinkHref="#icon-user" />
                  </svg>
                  <div>Profile</div>
               </Link>
               <Link
                  to="/referrals"
                  className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
                     pathname.includes('/referrals')
                        ? ''
                        : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-colors duration-300`}>
                  <svg
                     className={`h-6 w-6 ${
                        pathname.includes('/referrals')
                           ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                           : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
                     }`}>
                     <use xlinkHref="#icon-share" />
                  </svg>
                  <div>Referrals</div>
               </Link>
               <Link
                  to="/api-keys"
                  className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
                     pathname.includes('/api-keys')
                        ? ''
                        : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-colors duration-300`}>
                  <svg
                     className={`h-6 w-6 ${
                        pathname.includes('/api-keys')
                           ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                           : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
                     }`}>
                     <use xlinkHref="#icon-keyboard" />
                  </svg>
                  <div>API keys</div>
               </Link>
               <Link
                  to="/beneficiaries"
                  className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
                     pathname.includes('/beneficiaries')
                        ? ''
                        : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-colors duration-300`}>
                  <svg
                     className={`h-6 w-6 ${
                        pathname.includes('/beneficiaries')
                           ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                           : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
                     }`}>
                     <use xlinkHref="#icon-beneficiary" />
                  </svg>
                  <div>Beneficiaries</div>
               </Link>
               <Link
                  to="/tier"
                  className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
                     pathname.includes('/tier')
                        ? ''
                        : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-colors duration-300`}>
                  <svg
                     className={`h-6 w-6 ${
                        pathname.includes('/tier')
                           ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                           : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
                     }`}>
                     <use xlinkHref="#icon-membership" />
                  </svg>
                  <div>Membership</div>
               </Link>
               <div className="h-[1px] bg-neutral6 dark:bg-neutral3" />
               <Link
                  to="/sessions-history"
                  className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
                     pathname.includes('/sessions-history')
                        ? ''
                        : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-colors duration-300`}>
                  <svg
                     className={`h-6 w-6 ${
                        pathname.includes('/sessions-history')
                           ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                           : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
                     }`}>
                     <use xlinkHref="#icon-laptop" />
                  </svg>
                  <div>Sessions history</div>
               </Link>
               <Link
                  to="/2fa"
                  className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
                     pathname.includes('/2fa')
                        ? ''
                        : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-colors duration-300`}>
                  <svg
                     className={`h-6 w-6 ${
                        pathname.includes('/2fa')
                           ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                           : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
                     }`}>
                     <use xlinkHref="#icon-barcode" />
                  </svg>
                  <div>2FA</div>
               </Link>
               <Link
                  to="/change-password"
                  className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
                     pathname.includes('/change-password')
                        ? ''
                        : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-colors duration-300`}>
                  <svg
                     className={`h-6 w-6 ${
                        pathname.includes('/change-password')
                           ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                           : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
                     }`}>
                     <use xlinkHref="#icon-lock" />
                  </svg>
                  <div>Change password</div>
               </Link>
               <Link
                  to="/docs"
                  className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
                     pathname.includes('/docs')
                        ? ''
                        : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-colors duration-300`}>
                  <svg
                     className={`h-6 w-6 ${
                        pathname.includes('/docs')
                           ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                           : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
                     }`}>
                     <use xlinkHref="#icon-candlesticks" />
                  </svg>
                  <div>API docs</div>
               </Link>
            </div>
         </div>
      </div>
   );
};
