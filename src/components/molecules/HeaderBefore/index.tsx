import React, { FC, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutFetch } from 'modules';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { icCirup, icLock, icLogo, icLogoDark, icLogoLight, icLogout, icSetting, icSoon, icUser, imgAvatar } from '../../../assets';

interface HeaderProps {
   txtLogin?: string;
   txtSignup?: string;
   isLogined?: boolean;
   isFull?: boolean;
}

export const HeaderBefore: FC<HeaderProps> = ({ txtLogin, txtSignup, isLogined, isFull }) => {
   const [isDarkMode, setDarkMode] = React.useState<boolean>(false);

   const [dropDwonCrypto, setDropDwonCrypto] = useState<boolean>(false);
   const [dropDwonFlag, setDropDwonFlag] = useState<boolean>(false);
   const [dropDwonNotif, setDropDwonNotif] = useState<boolean>(false);
   const [dropDwonProfile, setDropDwonProfile] = useState<boolean>(false);

   const refDropDwonCrypto = useRef<HTMLDivElement>(null);
   const refDropDwonFlag = useRef<HTMLDivElement>(null);
   const refDropDwonNotif = useRef<HTMLDivElement>(null);
   const refDropDwonProfile = useRef<HTMLDivElement>(null);

   const handleSetDropDwonCrypto = () => setDropDwonCrypto(!dropDwonCrypto);
   const handleSetDropDwonFlag = () => setDropDwonFlag(!dropDwonFlag);
   const handleSetDropDwonNotif = () => setDropDwonNotif(!dropDwonNotif);
   const handleSetDropDwonProfile = () => setDropDwonProfile(!dropDwonProfile);

   const handleOutsideDropDwonCrypto = (e: any) => {
      if (refDropDwonCrypto && !refDropDwonCrypto?.current?.contains(e.target)) setDropDwonCrypto(false);
   }
   const handleOutsideDropDwonFlag = (e: any) => {
      if (refDropDwonFlag && !refDropDwonFlag?.current?.contains(e.target)) setDropDwonFlag(false);
   }
   const handleOutsideDropDwonNotif = (e: any) => {
      if (refDropDwonNotif && !refDropDwonNotif?.current?.contains(e.target)) setDropDwonNotif(false);
   }
   const handleOutsideDropDwonProfile = (e: any) => {
      if (refDropDwonProfile && !refDropDwonProfile?.current?.contains(e.target)) setDropDwonProfile(false);
   }

   useEffect(() => {
      document.addEventListener('mousedown', handleOutsideDropDwonCrypto);
      return () => document.removeEventListener('mousedown', handleOutsideDropDwonCrypto);
   }, []);
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

   const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

   const dropDwonCryptoDarkMode = (checked: boolean) => setDarkMode(checked);

   const dispatch = useDispatch();
   const handleLogout = () => dispatch(logoutFetch());

   return (
      <header className={`header js-header ${!isFull ? 'header_wide' : ''} registered`} data-id="#header">
         <div className="header__center center">
            <Link onClick={handleScrollTop} className="header__logo" to="/">
               <img className="header__pic header__pic_desktop some-icon" src={icLogoLight} alt="Digiasset" />
               <img className="header__pic header__pic_desktop some-icon-dark" src={icLogoDark} alt="Digiasset" />
               <img className="header__pic header__pic_mobile" src={icLogo} alt="Digiasset" />
            </Link>
            <div className="header__wrapper">
               <div className="header__wrap js-header-wrap">
                  <nav className="header__nav">
                     <a className="header__item" href="exchange.html">Exchange</a>
                     <div ref={refDropDwonCrypto} onClick={handleSetDropDwonCrypto} className={`header__item header__item_dropdown js-header-item ${dropDwonCrypto ? 'active' : ''}`}>
                        <button className="header__head js-header-head">Buy Crypto <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
                           <path
                              d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" />
                        </svg>
                        </button>
                        <div className="header__body js-header-body">
                           <a className="header__link" href="buy-crypto.html">
                              <svg className="icon" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                                 <circle cx="5.5" cy="15.5" r="1.5" />
                                 <path
                                    d="M19,3H5A5.006,5.006,0,0,0,0,8v8a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3ZM5,5H19a3,3,0,0,1,3,3H2A3,3,0,0,1,5,5ZM19,19H5a3,3,0,0,1-3-3V10H22v6A3,3,0,0,1,19,19Z" />
                              </svg>Credit card</a>
                           <a className="header__link" href="deposit-fiat.html">
                              <svg className="icon" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                                 <path
                                    d="m18 24h-12a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h12a5.006 5.006 0 0 1 5 5v14a5.006 5.006 0 0 1 -5 5zm-12-22a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-14a3 3 0 0 0 -3-3zm10 8h-8a3 3 0 0 1 0-6h8a3 3 0 0 1 0 6zm-8-4a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm-2 7a1 1 0 1 0 1 1 1 1 0 0 0 -1-1zm4 0a1 1 0 1 0 1 1 1 1 0 0 0 -1-1zm4 0a1 1 0 1 0 1 1 1 1 0 0 0 -1-1zm-8 4a1 1 0 1 0 1 1 1 1 0 0 0 -1-1zm4 0a1 1 0 1 0 1 1 1 1 0 0 0 -1-1zm8-4a1 1 0 1 0 1 1 1 1 0 0 0 -1-1zm1 5a1 1 0 0 0 -1-1h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 1-1z" />
                              </svg>Bank deposit </a>
                        </div>
                     </div>
                     <a className="header__item" href="market.html">Market</a>
                     <a className="header__item" href="learn-crypto.html">Discover</a>
                  </nav>
                  <div className="header__btns">
                     <a className="button-small header__button" href="sign-up.html">Sign Up</a>
                     <a className="button-stroke button-small header__button" href="sign-in.html">Login</a>
                  </div>
                  <a className="button-stroke header__button" href="wallets/overview.html">Wallet</a>
               </div>
               <div ref={refDropDwonFlag} onClick={handleSetDropDwonFlag} className={`header__item header__item_settings js-header-item ${dropDwonFlag ? 'active' : ''}`}>
                  <button className="header__head js-header-head">EN/USD <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
                     <path
                        d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" />
                  </svg>
                  </button>
                  <div className="header__body js-header-body">
                     <div className="header__row">
                        <div className="header__col">
                           <div className="header__category">Language</div>
                           <div className="header__menu">
                              <a className="header__language active" href="#">
                                 <span className="header__flag">🇺🇸</span>English </a>
                              <a className="header__language" href="#">
                                 <span className="header__flag">🇮🇩</span>Indonesia </a>
                              <a className="header__language" href="#">
                                 <span className="header__flag">🇷🇺</span>Russia </a>
                           </div>
                        </div>
                        <div className="header__col">
                           <div className="header__category">Currency</div>
                           <div className="header__menu">
                              <a className="header__currency active" href="#">USD</a>
                              <a className="header__currency" href="#">RUB</a>
                              <a className="header__currency" href="#">EUR</a>
                              <a className="header__currency" href="#">IDR</a>
                              <a className="header__currency" href="#">BTC</a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {
                  isLogined && (
                     <div className="header__control">
                        <a className="header__activity" href="activity.html">
                           <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
                              <path
                                 d="M11.24,24a2.262,2.262,0,0,1-.948-.212,2.18,2.18,0,0,1-1.2-2.622L10.653,16H6.975A3,3,0,0,1,4.1,12.131l3.024-10A2.983,2.983,0,0,1,10,0h3.693a2.6,2.6,0,0,1,2.433,3.511L14.443,8H17a3,3,0,0,1,2.483,4.684l-6.4,10.3A2.2,2.2,0,0,1,11.24,24ZM10,2a1,1,0,0,0-.958.71l-3.024,10A1,1,0,0,0,6.975,14H12a1,1,0,0,1,.957,1.29L11.01,21.732a.183.183,0,0,0,.121.241A.188.188,0,0,0,11.4,21.9l6.4-10.3a1,1,0,0,0,.078-1.063A.979.979,0,0,0,17,10H13a1,1,0,0,1-.937-1.351l2.19-5.84A.6.6,0,0,0,13.693,2Z" />
                           </svg>
                        </a>
                        <div ref={refDropDwonNotif} onClick={handleSetDropDwonNotif} className={`header__item header__item_notifications js-header-item ${dropDwonNotif ? 'active' : ''}`}>
                           <button className="header__head js-header-head active">
                              <svg className="icon" style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
                                 <g id="_01_align_center" data-name="01 align center">
                                    <path
                                       d="M23.259,16.2l-2.6-9.371A9.321,9.321,0,0,0,2.576,7.3L.565,16.35A3,3,0,0,0,3.493,20H7.1a5,5,0,0,0,9.8,0h3.47a3,3,0,0,0,2.89-3.8ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm9.165-4.395a.993.993,0,0,1-.8.395H3.493a1,1,0,0,1-.976-1.217l2.011-9.05a7.321,7.321,0,0,1,14.2-.372l2.6,9.371A.993.993,0,0,1,21.165,17.605Z" />
                                 </g>
                              </svg>
                           </button>
                           <div className="header__body js-header-body">
                              <div className="header__title">Notifications</div>
                              <div className="header__list">
                                 <a className="header__notification header__notification_new" href="notifications.html">
                                    <div className="header__subtitle">Login attempted from new IP</div>
                                    <div className="header__date">2021-03-10 20:19:15</div>
                                 </a>
                                 <a className="header__notification header__notification_new" href="notifications.html">
                                    <div className="header__subtitle">Request to reset security</div>
                                    <div className="header__date">2021-03-10 20:19:15</div>
                                 </a>
                                 <a className="header__notification header__notification_new" href="notifications.html">
                                    <div className="header__subtitle">Login attempted from new IP</div>
                                    <div className="header__date">2021-03-10 20:19:15</div>
                                 </a>
                                 <a className="header__notification header__notification_new" href="notifications.html">
                                    <div className="header__subtitle">Request to reset security</div>
                                    <div className="header__date">2021-03-10 20:19:15</div>
                                 </a>
                                 <a className="header__notification" href="notifications.html">
                                    <div className="header__subtitle">Login attempted from new IP</div>
                                    <div className="header__date">2021-03-10 20:19:15</div>
                                 </a>
                                 <a className="header__notification" href="notifications.html">
                                    <div className="header__subtitle">Request to reset security</div>
                                    <div className="header__date">2021-03-10 20:19:15</div>
                                 </a>
                              </div>
                              <div className="header__btns">
                                 <a className="button-small header__button" href="notifications.html">View all</a>
                                 <button className="button-stroke button-small header__button">Clear all</button>
                              </div>
                           </div>
                        </div>
                        <a className="button-stroke button-small header__button" href="wallets/overview.html">Wallet</a>
                        <label className="theme js-theme">
                           <input className="theme__input" type="checkbox" />
                           <span className="theme__icon">
                              <DarkModeSwitch
                                 className="icon"
                                 checked={isDarkMode}
                                 onChange={dropDwonCryptoDarkMode}
                                 size={20}
                              />
                              {/* <svg className="icon icon-theme-light">
                                    <use xlinkHref="#icon-theme-light"></use>
                                 </svg>
                                 <svg className="icon icon-theme-dark">
                                    <use xlinkHref="#icon-theme-dark"></use>
                                 </svg> */}
                           </span>
                        </label>
                        <div ref={refDropDwonProfile} onClick={handleSetDropDwonProfile} className={`header__item header__item_user js-header-item ${dropDwonProfile ? 'active' : ''}`}>
                           <button className="header__head js-header-head">
                              <img src={imgAvatar} alt="Avatar" />
                           </button>
                           <div className="header__body js-header-body">
                              <a className="header__el" href="profile-info.html">
                                 <div className="header__icon">
                                    <img className="icon" src={icUser} alt="Profile" />
                                 </div>
                                 <div className="header__details">
                                    <div className="header__title">Profile</div>
                                    <div className="header__content">Important account details</div>
                                 </div>
                              </a>
                              <a className="header__el" href="referrals.html">
                                 <div className="header__icon">
                                    <img className="icon" src={icCirup} alt="Referrals" />
                                 </div>
                                 <div className="header__details">
                                    <div className="header__title">Referrals</div>
                                    <div className="header__content">Invite your friends and earn rewards</div>
                                 </div>
                              </a>
                              <a className="header__el" href="2fa.html">
                                 <div className="header__icon">
                                    <img className="icon" src={icLock} alt="2FA security" />
                                 </div>
                                 <div className="header__details">
                                    <div className="header__title">2FA security</div>
                                    <div className="header__content">Setup 2FA for more security</div>
                                 </div>
                              </a>
                              <a className="header__el" href="api-keys.html">
                                 <div className="header__icon">
                                    <img className="icon" src={icSetting} alt="Settings" />
                                 </div>
                                 <div className="header__details">
                                    <div className="header__title">Settings</div>
                                    <div className="header__content">View additional settings</div>
                                 </div>
                              </a>
                              <div className="header__el">
                                 <div className="header__icon">
                                    <img className="icon" src={icSoon} alt="Dark Mode" />
                                 </div>
                                 <div className="header__details">
                                    <div className="header__line">
                                       <div className="header__title">Dark mode</div>
                                       <label className="theme js-theme">
                                          <input className="theme__input" type="checkbox" />
                                          <span className="theme__inner">
                                             <span className="theme__box"></span>
                                          </span>
                                       </label>
                                    </div>
                                    <div className="header__content">Switch dark/light mode</div>
                                 </div>
                              </div>
                              <a className="header__el" href="#" onClick={handleLogout}>
                                 <div className="header__icon">
                                    <img className="icon" src={icLogout} alt="Logout" />
                                 </div>
                                 <div className="header__details">
                                    <div className="header__title">Log out</div>
                                 </div>
                              </a>
                           </div>
                        </div>
                     </div>
                  )
               }
               {
                  !isLogined && (
                     <div style={{ display: 'flex' }}>
                        <Link className="button-small header__button" style={{ marginRight: '8px' }} to="/register">{txtSignup}</Link>
                        <Link className="button-stroke button-small header__button" to="/login">{txtLogin}</Link>
                     </div>
                  )
               }
               <button className="header__burger js-header-burger"></button>
            </div>
         </div>
      </header>
   );
};
