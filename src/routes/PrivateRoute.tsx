import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Loader } from 'components';
import { RouteProps } from './types';

const PrivateRoute: React.FC<RouteProps> = ({
   component: Component,
   loading,
   isLogged,
   ...rest
}) => {
   if (loading) {
      return <Loader />;
   }

   if (!isLogged) {
      return (
         <Route {...rest}>
            <Redirect to={'/login'} />
         </Route>
      );
   }

   return (
      <Route
         {...rest}
         render={props => <Component {...props} />}
      />
   );
};

export default PrivateRoute;
