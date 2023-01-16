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
         <div className="lg:block grow-0 shrink-0 basis-c-full-101 w-full lg:w-c-full-65 lg2:w-c-full-101 lg-max:!float-none lg2-max:float-right m-0 lg2:mr-1 lg:ml-1">
            <TradingChart />
            {/* <TradingOrder /> */}
            {/* <TradingOrderNew /> */}
            <TradingOrderLast />
         </div>
      </>
   );
};
