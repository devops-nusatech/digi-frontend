import React from 'react';
import {
   CurrentMarket,
   IsDisplay,
   PrivateTrades,
   PublicTrades,
   SetCurrentPrice,
   Translate,
} from 'types';

interface TradingRightProps
   extends Translate,
      CurrentMarket,
      IsDisplay,
      PublicTrades,
      PrivateTrades,
      SetCurrentPrice {}

export const TradingRight = ({
   currentMarket,
   display,
   translate,
   marketTrades,
   myTrades,
   setCurrenPrice,
}: TradingRightProps) => {
   return (
      <div
         className={`w-64 space-y-1 lg:!block lg2:shrink-0 lg-max:float-none ${
            display ? '' : 'lg-max:hidden'
         } lg-max:w-full lg2-max:float-left`}>
         <div className="h-full space-y-1">Kokm</div>
      </div>
   );
};
