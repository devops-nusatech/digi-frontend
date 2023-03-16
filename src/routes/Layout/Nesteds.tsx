import React from 'react';
import {
   Link,
   Switch,
   useRouteMatch,
   Route,
   useParams,
} from 'react-router-dom';
import { Transfer, WalletOverview } from 'screens';

export const Nesteds = () => {
   let { path } = useRouteMatch();
   return (
      <div>
         <Link to="/wallets">Nesteds {path}</Link>
         <ul>
            <li>
               <Link to={`${path}/deposit`}>Deposit</Link>
            </li>
            <li>
               <Link to={`${path}/withdraw`}>Withdraw</Link>
            </li>
            <li>
               <Link to={`${path}/transfer`}>Transfer</Link>
            </li>
            <li>
               <Link to={`${path}/cuk`}>Transfers</Link>
            </li>
         </ul>
         <Switch>
            <Route
               exact
               path={path}
               component={WalletOverview}
            />
            <Route
               path={`${path}/cuk`}
               component={Transfer}
            />
            <Route path={`${path}/:topicId`}>
               <Topic />
            </Route>
         </Switch>
      </div>
   );
};

function Topic() {
   // The <Route> that rendered this component has a
   // path of `/topics/:topicId`. The `:topicId` portion
   // of the URL indicates a placeholder that we can
   // get from `useParams()`.
   let { topicId = '' } = useParams<{ topicId: string }>();

   return (
      <div>
         <h3>{topicId}</h3>
      </div>
   );
}
