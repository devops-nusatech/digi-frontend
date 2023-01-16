import React, { FC, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { icLogoDark, icLogoLight, IcArrowRight, Logo } from 'assets';
import { RouterProps, withRouter } from 'react-router';
import { IntlProps } from 'index';
import { connect, MapStateToProps, useSelector } from 'react-redux';
import { RootState, selectConfigsLoading, selectCurrentColorTheme } from 'modules';
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
];

const withFooter = [
   '/wallets/withdraw',
   '/wallets/deposit',
   '/wallets/transfer',
]

interface ReduxProps {
   configsLoading: boolean;
}

type FooterProps = ReduxProps & RouterProps & IntlProps;

const FooterFC: FC<FooterProps> = ({
   configsLoading,
   history,
   intl,
}) => {
   const theme = useSelector(selectCurrentColorTheme);

   const translate = (key: string) => intl.formatMessage({ id: key });

   const shouldRenderFooter = !noFooterRoutes.some(r => history.location.pathname.includes(r));
   const shouldRenderFooterWallet = !withFooter.some(r => history.location.pathname === r);
   if ((!shouldRenderFooter && shouldRenderFooterWallet) || configsLoading) {
      return <SVGSprites />;
   }

   const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

   return (
      <>
         <footer className="border-t border-neutral6 dark:border-neutral2">
            <div className="relative pt-8 md:pt-0">
               <div className="block md:flex w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
                  <div className="block md:flex grow-0 shrink-0 basis-[32%] lg2:basis-[39%] border-b border-neutral6 dark:border-neutral2 md:border-b-0 pl-0 pt-16 lg:pt-20 pr-8 lg:pr-16 1xl:pr-22 pb-12 lg:pb-16">
                     <div onClick={handleScrollTop} className="inline-block mr-0 md:mr-8 lg:mr-20 1xl:mr-40 mb-8 md:mb-0 w-35 md:w-8 overflow-hidden cursor-pointer">
                        <Logo className="w-35 hidden md:block" />
                        <img className={`w-35 md:hidden ${theme === 'dark' && 'inline-block'}`} src={`${theme === 'dark' ? icLogoDark : icLogoLight}`} alt="Logo Digiasset" title="Digiasset" />
                     </div>
                     <div>
                        <div className="flex md:hidden items-center md:items-start mb-0 md:mb-10.05 text-xs leading-none font-medium uppercase">
                           footer nav
                           <svg className="w-6 h-6 ml-auto fill-neutral4 transition-transform duration-200">
                              <use xlinkHref="#icon-arrow-down" />
                           </svg>
                        </div>
                        <div className="hidden md:flex flex-col items-start space-y-6 font-dm font-bold text-neutral4 pt-10 md:pt-0">
                           <Link to="/trading" className="hover:text-neutral2 dark:hover:text-neutral8 leading-custom3 transition-colors duration-300">Exchange</Link>
                           <Link to="/buy-crypto" className="hover:text-neutral2 dark:hover:text-neutral8 leading-custom3 transition-colors duration-300">Buy crypto</Link>
                           <Link to="/market" className="hover:text-neutral2 dark:hover:text-neutral8 leading-custom3 transition-colors duration-300">Market</Link>
                           <Link to="/learn-crypto" className="hover:text-neutral2 dark:hover:text-neutral8 leading-custom3 transition-colors duration-300">Learn crypto</Link>
                           <Link to="/contact" className="hover:text-neutral2 dark:hover:text-neutral8 leading-custom3 transition-colors duration-300">Contact</Link>
                        </div>
                     </div>
                  </div>
                  <div className="flex grow-0 shrink-0 basis-[34%] lg2:basis-[30.5%] px-0 md:px-8 lg:px-16 1xl:px-22 pt-8 md:pt-16 lg:pt-20 pb-8 md:pb-12 lg:pb-16 border-b md:border-b-0 md:border-l border-neutral6 dark:border-neutral2">
                     <div>
                        <div className="text-xs mb-10.05 font-bold uppercase leading-none">
                           Contact
                        </div>
                        <div className="space-y-2">
                           <div>
                              PT Digiasset Indonesia
                           </div>
                           <div>
                              Jl. Kompol R. Soekanto Sambiroto Blok F10
                           </div>
                           <div>
                              Semarang, 50271
                           </div>
                           <div>
                              Phone (024) 76412782
                           </div>
                           <div>
                              support@digiassetindo.com
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex grow-0 shrink-0 basis-[34%] lg2:basis-[30.5%] pb-8 md:pb-12 lg:pb-16 pl-0 md:pl-8 lg:pl-16 1xl:pl-22 pt-8 md:pt-16 lg:pt-20 pr-0 border-b md:border-b-0 border-l md:border-neutral6 dark:border-neutral2">
                     <div>
                        <div className="text-xs mb-10.05 font-bold uppercase leading-none">
                           News Letter
                        </div>
                        <div className="mb-6">
                           Subscribe our newsletter to get more free design course and resource.
                        </div>
                        <form className="relative">
                           <input type="email" className="w-full h-12 pl-3.5 pr-12 rounded-3xl bg-none dark:bg-transparent border-2 border-neutral6 dark:border-neutral3 focus-within:border-neutral4 outline-none leading-custom dark:text-neutral8 transition-colors duration-300" placeholder="Enter your email" />
                           <button type="submit" className="absolute inset-y-2 right-2 w-8 h-8 bg-primary1 rounded-full hover:bg-primary2 transition-all duration-300">
                              <IcArrowRight className="translate-x-1" />
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
            <div className="py-6 pb-5 border-t border-neutral6 dark:border-neutral3">
               <div className="block md:flex w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
                  <div className="mr-auto text-xs leading-custom1 text-neutral4">
                     Copyright © 2022 {translate('pagy.body.footer.powered_by')} digiassetindo.com. All rights reserved
                  </div>
                  <div className="flex items-center space-x-6">
                     <a href="#" rel="noopener noreferrer" className="flex justify-center items-center shrink-0 w-5 h-5">
                        <svg className="w-4 h-4 fill-neutral4 transition-all duration-300">
                           <use xlinkHref="#icon-facebook"></use>
                        </svg>
                     </a>
                     <a href="#" rel="noopener noreferrer" className="flex justify-center items-center shrink-0 w-5 h-5">
                        <svg className="w-4 h-4 fill-neutral4 transition-all duration-300">
                           <use xlinkHref="#icon-twitter"></use>
                        </svg>
                     </a>
                     <a href="#" rel="noopener noreferrer" className="flex justify-center items-center shrink-0 w-5 h-5">
                        <svg className="w-4 h-4 fill-neutral4 transition-all duration-300">
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
