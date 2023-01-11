import { IllusWorld } from 'assets';
import { Button } from 'components';
import React from 'react';
import { useHistory } from 'react-router';

export const TradingOrderBackToLogin = () => {
   const { push } = useHistory();
   return (
      <>
         <div className="absolute inset-0 backdrop-blur-md bg-neutral8/30 dark:bg-neutral2/30 rounded z-30" />
         <div className="absolute inset-0 flex justify-center items-center text-center z-40 bg-transparent">
            <div className="space-y-5">
               <div className="flex justify-center">
                  <IllusWorld className="w-40 h-40" />
               </div>
               <div className="text-base font-dm font-bold animate-bounce">
                  Please login for accessing trade...
               </div>
               <Button
                  onClick={() => push('/login')}
                  text="Login"
               />
            </div>
         </div>
      </>
   )
}
