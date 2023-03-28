import React from 'react';
import {
   TradingChart,
   // TradingOrder,
   // TradingOrderNew,
   TradingOrderLast,
} from 'components';

export const TradingCenter = () => {
   return (
      <>
         <div className="m-0 w-full shrink-0 grow-0 basis-c-full-101 lg:ml-1 lg:block lg:w-c-full-65 lg2:mr-1 lg2:w-c-full-101 lg-max:!float-none lg2-max:float-right">
            <TradingChart />
            <TradingOrderLast />
         </div>
      </>
   );
};
