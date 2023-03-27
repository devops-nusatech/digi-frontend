import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Loader } from 'components';
import { RouteProps } from './types';

type PublicRouteProps = RouteProps & {
   location?: {
      state: {
         pathname: string;
      };
   };
};

const PublicRoute: React.FC<PublicRouteProps> = ({
   component: Component,
   loading,
   isLogged,
   location,
   ...rest
}) => {
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
         <Redirect
            to={
               location?.state && location?.state?.pathname
                  ? location?.state?.pathname
                  : '/wallets'
            }
         />
      </Route>
   );
};

export default PublicRoute;
