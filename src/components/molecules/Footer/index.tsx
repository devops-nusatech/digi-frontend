import React, { FC, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { icLogoDark, icLogoLight, IcArrowRight, Logo } from 'assets';
import { RouterProps, withRouter } from 'react-router';
import { IntlProps } from 'index';
import { connect, MapStateToProps, useSelector } from 'react-redux';
import {
   RootState,
   selectConfigsLoading,
   selectCurrentColorTheme,
} from 'modules';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { SVGSprites } from 'components/atoms';

const noFooterRoutes = [
   '/confirm',
   '/404',
   '/500',
   '/login',
   '/register',
   '/trading',
   '/trading',
   '/wallets',
   '/forgot_password',
   '/accounts/password_reset',
   '/email-verification',
   '/geetest',
   '/chart',
   '/exchange',
   '/orders',
   '/trades',
];

const withFooter = [
   '/wallets/withdraw',
   '/wallets/deposit',
   '/wallets/transfer',
];

interface ReduxProps {
   configsLoading: boolean;
}

type FooterProps = ReduxProps & RouterProps & IntlProps;

const FooterFC: FC<FooterProps> = ({ configsLoading, history, intl }) => {
   const theme = useSelector(selectCurrentColorTheme);

   const translate = (key: string) => intl.formatMessage({ id: key });

   const shouldRenderFooter = !noFooterRoutes.some(r =>
      history.location.pathname.includes(r)
   );
   const shouldRenderFooterWallet = !withFooter.some(
      r => history.location.pathname === r
   );
   if ((!shouldRenderFooter && shouldRenderFooterWallet) || configsLoading) {
      return <SVGSprites />;
   }

   const handleScrollTop = () =>
      window.scrollTo({ top: 0, behavior: 'smooth' });

   return (
      <>
         <footer className="border-t border-neutral6 dark:border-neutral2">
            <div className="relative pt-8 md:pt-0">
               <div className="mx-auto block w-full max-w-7xl px-8 md:flex md:px-10 lg:px-20">
                  <div className="block shrink-0 grow-0 basis-[32%] border-b border-neutral6 pl-0 pt-16 pr-8 pb-12 dark:border-neutral2 md:flex md:border-b-0 lg:pt-20 lg:pr-16 lg:pb-16 lg2:basis-[39%] 1xl:pr-22">
                     <div
                        onClick={handleScrollTop}
                        className="mr-0 mb-8 inline-block w-35 cursor-pointer overflow-hidden md:mr-8 md:mb-0 md:w-8 lg:mr-20 1xl:mr-40">
                        <Logo className="hidden w-35 md:block" />
                        <img
                           className={`w-35 md:hidden ${
                              theme === 'dark' && 'inline-block'
                           }`}
                           src={`${
                              theme === 'dark' ? icLogoDark : icLogoLight
                           }`}
                           alt="Logo Digiasset"
                           title="Digiasset"
                        />
                     </div>
                     <div>
                        <div className="mb-0 flex items-center text-xs font-medium uppercase leading-none md:mb-10.05 md:hidden md:items-start">
                           footer nav
                           <svg className="ml-auto h-6 w-6 fill-neutral4 transition-transform duration-200">
                              <use xlinkHref="#icon-arrow-down" />
                           </svg>
                        </div>
                        <div className="hidden flex-col items-start space-y-6 pt-10 font-dm font-bold text-neutral4 md:flex md:pt-0">
                           <Link
                              to="/trading"
                              className="leading-custom3 transition-colors duration-300 hover:text-neutral2 dark:hover:text-neutral8">
                              Exchange
                           </Link>
                           {/* <Link to="/buy-crypto" className="hover:text-neutral2 dark:hover:text-neutral8 leading-custom3 transition-colors duration-300">Buy crypto</Link> */}
                           <Link
                              to="/markets"
                              className="leading-custom3 transition-colors duration-300 hover:text-neutral2 dark:hover:text-neutral8">
                              Market
                           </Link>
                           {/* <Link to="/learn-crypto" className="hover:text-neutral2 dark:hover:text-neutral8 leading-custom3 transition-colors duration-300">Learn crypto</Link> */}
                           <Link
                              to="/faq"
                              className="leading-custom3 transition-colors duration-300 hover:text-neutral2 dark:hover:text-neutral8">
                              FAQ
                           </Link>
                        </div>
                     </div>
                  </div>
                  <div className="flex shrink-0 grow-0 basis-[34%] border-b border-neutral6 px-0 pt-8 pb-8 dark:border-neutral2 md:border-b-0 md:border-l md:px-8 md:pt-16 md:pb-12 lg:px-16 lg:pt-20 lg:pb-16 lg2:basis-[30.5%] 1xl:px-22">
                     <div>
                        <div className="mb-10.05 text-xs font-bold uppercase leading-none">
                           Contact
                        </div>
                        <div className="space-y-2">
                           <div>PT Digiasset Indonesia</div>
                           <div>Jl. Kompol R. Soekanto Sambiroto Blok F10</div>
                           <div>Semarang, 50271</div>
                           <div>Phone (024) 76412782</div>
                           <div>support@digiassetindo.com</div>
                        </div>
                     </div>
                  </div>
                  <div className="flex shrink-0 grow-0 basis-[34%] border-b border-l pb-8 pl-0 pt-8 pr-0 dark:border-neutral2 md:border-b-0 md:border-neutral6 md:pb-12 md:pl-8 md:pt-16 lg:pb-16 lg:pl-16 lg:pt-20 lg2:basis-[30.5%] 1xl:pl-22">
                     <div>
                        <div className="mb-10.05 text-xs font-bold uppercase leading-none">
                           News Letter
                        </div>
                        <div className="mb-6">
                           Subscribe our newsletter to get more free design
                           course and resource.
                        </div>
                        <form className="relative">
                           <input
                              type="email"
                              className="h-12 w-full rounded-3xl border-2 border-neutral6 bg-none pl-3.5 pr-12 leading-custom outline-none transition-colors duration-300 focus-within:border-neutral4 dark:border-neutral3 dark:bg-transparent dark:text-neutral8"
                              placeholder="Enter your email"
                           />
                           <button
                              type="submit"
                              className="absolute inset-y-2 right-2 h-8 w-8 rounded-full bg-primary1 transition-all duration-300 hover:bg-primary2">
                              <IcArrowRight className="translate-x-1" />
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
            <div className="border-t border-neutral6 py-6 pb-5 dark:border-neutral3">
               <div className="mx-auto block w-full max-w-7xl px-6 md:flex md:px-10 lg:px-20">
                  <div className="mr-auto text-xs leading-custom1 text-neutral4">
                     Copyright © 2022 {translate('pagy.body.footer.powered_by')}{' '}
                     digiassetindo.com. All rights reserved
                  </div>
                  <div className="flex items-center space-x-6">
                     <a
                        href="#"
                        rel="noopener noreferrer"
                        className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <svg className="h-4 w-4 fill-neutral4 transition-all duration-300">
                           <use xlinkHref="#icon-facebook"></use>
                        </svg>
                     </a>
                     <a
                        href="#"
                        rel="noopener noreferrer"
                        className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <svg className="h-4 w-4 fill-neutral4 transition-all duration-300">
                           <use xlinkHref="#icon-twitter"></use>
                        </svg>
                     </a>
                     <a
                        href="#"
                        rel="noopener noreferrer"
                        className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <svg className="h-4 w-4 fill-neutral4 transition-all duration-300">
                           <use xlinkHref="#icon-instagram"></use>
                        </svg>
                     </a>
                  </div>
               </div>
            </div>
         </footer>
         <SVGSprites />
      </>
   );
};

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   configsLoading: selectConfigsLoading(state),
});

export const Footer = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps)
)(FooterFC) as FunctionComponent;
