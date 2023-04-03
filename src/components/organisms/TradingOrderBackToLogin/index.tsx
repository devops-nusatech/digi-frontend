import React from 'react';
import { Button, SVG } from 'components';
import { useHistory } from 'react-router';

export const TradingOrderBackToLogin = () => {
   const history = useHistory();
   return (
      <>
         <div className="absolute inset-0 z-30 !mt-0 rounded bg-neutral8/30 backdrop-blur-md dark:bg-neutral2/30" />
         <div className="absolute inset-0 z-40 !mt-0 flex items-center justify-center bg-transparent text-center">
            <div className="space-y-5">
               <div className="flex justify-center">
                  <SVG
                     className="h-40 w-40 fill-neutral4 transition duration-300 dark:fill-neutral6"
                     xlinkHref="lock"
                  />
               </div>
               <div className="animate-bounce font-dm text-base font-bold">
                  Please login for accessing trade...
               </div>
               <Button
                  onClick={() =>
                     history.push('/login', {
                        pathname: history.location.pathname,
                     })
                  }
                  text="Login"
               />
            </div>
         </div>
      </>
   );
};
