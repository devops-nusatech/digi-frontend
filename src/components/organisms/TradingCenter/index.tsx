import React from 'react';
import {
   TradingChart,
   // TradingOrder,
   // TradingOrderNew,
   TradingOrderLast
} from 'components';

export const TradingCenter = () => {
   return (
      <>
         <div className="grow-0 shrink-0 w-full lg:w-[calc(100%-260px)] lg2:w-[calc(100%-520px)] lg:block float-none lg:float-right lg:m-0 lg2:mx-1">
            <TradingChart />
            {/* <TradingOrder /> */}
            {/* <TradingOrderNew /> */}
            <TradingOrderLast />
         </div>
      </>
   );
};
