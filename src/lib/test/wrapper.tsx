import * as React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { IntlProvider } from 'react-intl';
import { languageMap } from 'translations';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from 'modules';

const browserHistory = createBrowserHistory();
const store = createStore(rootReducer);

const locale = 'en';

export const TestComponentWrapper: React.FC = ({ children }) => (
   <Router history={browserHistory}>
      <IntlProvider
         {...{ locale }}
         defaultLocale={locale}
         messages={languageMap[locale]}>
         <Provider store={store}>{children}</Provider>
      </IntlProvider>
   </Router>
);
