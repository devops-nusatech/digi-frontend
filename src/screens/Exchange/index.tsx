import { Button } from 'components';
import { useBeneficiaries } from 'hooks';
import React from 'react';

export const Exchange = () => {
   const { beneficiaries, fetchLoading, activateBeneficiary } =
      useBeneficiaries('usdt');
   return (
      <div className="mt-1 block lg2:flex">
         <div className="hidden w-full shrink-0 lg:block lg:w-64 lg-max:!float-none lg-max:!mb-0 lg2-max:float-left lg2-max:mb-1">
            {/* <div className="rounded dark:bg-shade2"> */}
            <div className="h-908 rounded bg-neutral8 bg-primary3/30">
               {fetchLoading ? (
                  <div className="">Loading</div>
               ) : (
                  beneficiaries.map(e => (
                     <div
                        className=""
                        key={e.blockchain_key}>
                        <div className="">{e.blockchain_name}</div>
                     </div>
                  ))
               )}
            </div>
         </div>
         <div className="m-0 w-full shrink-0 grow-0 basis-c-full-101 lg:ml-1 lg:block lg:w-c-full-65 lg2:mr-1 lg2:w-c-full-101 lg-max:!float-none lg2-max:float-right">
            <Button
               text="Click me"
               onClick={() => activateBeneficiary({ id: 312, pin: '197127' })}
            />
         </div>
      </div>
   );
};
