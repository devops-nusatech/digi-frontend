import { Button } from 'components';
import { useBeneficiaries } from 'hooks'
import React from 'react'

export const Exchange = () => {
   const { beneficiaries, fetchLoading, activateBeneficiary } = useBeneficiaries('usdt');
   return (
      <div className="block lg2:flex mt-1">
         <div className="shrink-0 w-full lg:w-64 lg-max:!float-none lg2-max:float-left hidden lg:block lg-max:!mb-0 lg2-max:mb-1">
            {/* <div className="rounded dark:bg-shade2"> */}
            <div className="rounded bg-neutral8 bg-primary3/30 h-908">
               {fetchLoading ? (
                  <div className="">
                     Loading
                  </div>
               ) : beneficiaries.map(e => (
                  <div className="" key={e.blockchain_key}>
                     <div className="">
                        {e.blockchain_name}
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="lg:block grow-0 shrink-0 basis-c-full-101 w-full lg:w-c-full-65 lg2:w-c-full-101 lg-max:!float-none lg2-max:float-right m-0 lg2:mr-1 lg:ml-1">
            <Button text="Click me" onClick={() => activateBeneficiary({ id: 312, pin: '197127' })} />
         </div>
      </div>
   )
}
