import { createBrowserHistory } from 'history';
import React, { lazy } from 'react';
import * as ReactGA from 'react-ga';
import { Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import { gaTrackerKey } from 'api';
import { Loader } from 'components';
import { ErrorBoundary } from 'containers';
import { useReduxSelector, useSetMobileDevice } from 'hooks';
import { selectCurrentLanguage, selectMobileDeviceState } from 'modules';
import { languageMap } from 'translations';
import * as mobileTranslations from './mobile/translations';

const gaKey = gaTrackerKey();
const browserHistory = createBrowserHistory();

if (gaKey) {
   ReactGA.initialize(gaKey);
   browserHistory.listen(location => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
   });
}

const AlertsContainer = lazy(() =>
   import('./containers/Alerts').then(({ Alerts }) => ({ default: Alerts }))
);
const HeaderContainer = lazy(() =>
   import('./components/molecules/Header').then(({ Header }) => ({
      default: Header,
   }))
);
const FooterContainer = lazy(() =>
   import('./components/molecules/Footer').then(({ Footer }) => ({
      default: Footer,
   }))
);
const LayoutContainer = lazy(() =>
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
   const isMobileDevice = useReduxSelector(selectMobileDeviceState);

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
         <AlertsContainer />
         <FooterContainer />
      </>
   );
};

export default () => {
   useSetMobileDevice();
   const lang =
      useReduxSelector(selectCurrentLanguage) === null
         ? 'en'
         : useReduxSelector(selectCurrentLanguage);
   const isMobileDevice = useReduxSelector(selectMobileDeviceState);

   return (
      <IntlProvider
         locale={lang || 'en'}
         messages={getTranslations(lang || 'en', isMobileDevice)}
         key={lang || 'en'}>
         <Router history={browserHistory}>
            <ErrorBoundary>
               <React.Suspense fallback={<Loader />}>
                  <RenderDeviceContainers />
               </React.Suspense>
            </ErrorBoundary>
         </Router>
      </IntlProvider>
   );
};
