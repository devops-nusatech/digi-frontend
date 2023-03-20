import { IllusWorld } from 'assets';
import { Button } from 'components';
import React from 'react';
import { useHistory } from 'react-router';

export const TradingOrderBackToLogin = () => {
   const history = useHistory();
   return (
      <>
         <div className="absolute inset-0 z-30 rounded bg-neutral8/30 backdrop-blur-md dark:bg-neutral2/30" />
         <div className="absolute inset-0 z-40 flex items-center justify-center bg-transparent text-center">
            <div className="space-y-5">
               <div className="flex justify-center">
                  <IllusWorld className="h-40 w-40" />
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
