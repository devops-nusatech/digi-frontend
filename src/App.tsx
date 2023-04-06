import { createBrowserHistory } from 'history';
import React, { lazy, useEffect, useMemo } from 'react';
import * as ReactGA from 'react-ga';
import { Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import { gaTrackerKey } from 'api';
import { Loader } from 'components';
import { ErrorBoundary } from 'containers';
import { useReduxSelector, useSetMobileDevice } from 'hooks';
import {
   selectCurrentLanguage,
   selectMemberships,
   selectMobileDeviceState,
   selectUserInfo,
   selectUserLoggedIn,
   userData,
} from 'modules';
import { languageMap } from 'translations';
import * as mobileTranslations from './mobile/translations';
import { useDispatch } from 'react-redux';

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
   const dispatch = useDispatch();
   useSetMobileDevice();
   const lang = useReduxSelector(selectCurrentLanguage);
   const isMobileDevice = useReduxSelector(selectMobileDeviceState);
   const isLoggedIn = useReduxSelector(selectUserLoggedIn);
   const user = useReduxSelector(selectUserInfo);
   const memberships = useReduxSelector(selectMemberships);

   const currentLang = useMemo(
      () => (lang === 'null' || !lang ? 'en' : lang),
      [lang]
   );
   const myTier = useMemo(
      () =>
         memberships?.find(
            e => e?.tier?.toLowerCase() === user?.tier?.toLowerCase()
         )!,
      [memberships, user]
   );

   useEffect(() => {
      if (isLoggedIn && memberships && user) {
         dispatch(userData({ user: { ...user, myTier } }));
      }
   }, [dispatch, isLoggedIn, memberships, myTier, user]);

   return (
      <IntlProvider
         locale={currentLang}
         messages={getTranslations(currentLang, isMobileDevice)}
         key={currentLang}>
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
