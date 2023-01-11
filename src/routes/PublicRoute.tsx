import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Loader } from 'components';
import { RouteProps } from './types';

const PublicRoute: React.FC<RouteProps> = ({ component: Component, loading, isLogged, ...rest }) => {
   if (loading) {
      return <Loader />;
   }

   if (!isLogged) {
      return (
         <Route
            {...rest}
            render={props => <Component {...props} />}
         />
      );
   }


   return (
      <Route {...rest}>
         <Redirect to={'/wallets'} />
      </Route>
   );

};

export default PublicRoute;
