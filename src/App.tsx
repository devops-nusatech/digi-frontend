import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactGA from 'react-ga';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';
import { gaTrackerKey } from './api';
import { ErrorBoundary } from './containers';
import { useSetMobileDevice } from './hooks';
import * as mobileTranslations from './mobile/translations';
import { selectCurrentLanguage, selectMobileDeviceState } from './modules';
import { languageMap } from './translations';

const gaKey = gaTrackerKey();
const browserHistory = createBrowserHistory();

if (gaKey) {
   ReactGA.initialize(gaKey);
   browserHistory.listen(location => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
   });
}

const AlertsContainer = React.lazy(() =>
   import('./containers/Alerts').then(({ Alerts }) => ({ default: Alerts }))
);
const HeaderContainer = React.lazy(() =>
   import('./components/molecules/Header').then(({ Header }) => ({
      default: Header,
   }))
);
const FooterContainer = React.lazy(() =>
   import('./components/molecules/Footer').then(({ Footer }) => ({
      default: Footer,
   }))
);
const LayoutContainer = React.lazy(() =>
   import('./routes').then(({ Layout }) => ({ default: Layout }))
);

const getTranslations = (lang: string, isMobileDevice: boolean) => {
   if (isMobileDevice) {
      return {
         ...languageMap[lang],
         ...mobileTranslations[lang],
      };
   }
   return languageMap[lang];
};

const RenderDeviceContainers = () => {
   const isMobileDevice = useSelector(selectMobileDeviceState);

   if (isMobileDevice) {
      return (
         <>
            <AlertsContainer />
            <LayoutContainer />
         </>
      );
   }

   return (
      <>
         <HeaderContainer />
         <main className="flex grow flex-col">
            <LayoutContainer />
         </main>
         <FooterContainer />
         <AlertsContainer />
      </>
   );
};

export default () => {
   useSetMobileDevice();
   const lang = useSelector(selectCurrentLanguage);
   const isMobileDevice = useSelector(selectMobileDeviceState);

   return (
      <IntlProvider
         locale={lang}
         messages={getTranslations(lang, isMobileDevice)}
         key={lang}>
         <Router history={browserHistory}>
            <ErrorBoundary>
               <React.Suspense fallback={null}>
                  <RenderDeviceContainers />
               </React.Suspense>
            </ErrorBoundary>
         </Router>
      </IntlProvider>
   );
};
