import React from 'react';
import { TradingChart, TradingOrder } from 'components';
import { User } from 'modules';
import {
   CurrentMarket,
   IsDisplay,
   PrivateTrades,
   PublicTrades,
   SetCurrentPrice,
   Translate,
} from 'types';

interface TradingCenterProps
   extends Translate,
      CurrentMarket,
      IsDisplay,
      PublicTrades,
      PrivateTrades,
      SetCurrentPrice {
   user: User;
}

export const TradingCenter = ({
   user,
   translate,
   currentMarket,
   display,
}: TradingCenterProps) => {
   return (
      <>
         <div className="mx-1 w-c-full-65 shrink-0 grow-0 basis-c-full-65 lg:!block lg2:w-c-full-101 lg2:basis-c-full-101 lg-max:float-none lg-max:m-0 lg-max:w-full lg2-max:float-right lg2-max:mr-0">
            <TradingChart
               display={display}
               currentMarket={currentMarket}
            />
            <TradingOrder
               translate={translate}
               user={user}
            />
         </div>
      </>
   );
};
