import { Button } from 'components'
import React, { ReactNode } from 'react'

interface MembershipCard {
   banner: ReactNode;
}

export const MembershipCard = ({
   banner,
}: MembershipCard) => (
   <div className="snap-end shrink-0 first:pl-3 last:pr-3">
      <div className="space-y-3.5 rounded-2xl shadow-thin hover:shadow-lg dark:hover:bg-neutral2 px-3 py-6 cursor-pointer transition-all duration-200">
         {banner}
         <div className="text-base font-medium">
            Reward member
         </div>
         <div className="space-y-3">
            <div className="flex gap-2 justify-between items-center">
               <div className="text-neutral3">
                  Refferal Comision on Direct
               </div>
               <div className="text-base font-medium text-primary1">
                  40%
               </div>
            </div>
            <div className="flex gap-2 justify-between items-center">
               <div className="text-neutral3">
                  Refferal Comision 1st Level
               </div>
               <div className="text-base font-medium text-primary1">
                  10%
               </div>
            </div>
            <div className="flex gap-2 justify-between items-center">
               <div className="text-neutral3">
                  Withdraw Limit
               </div>
               <div className="text-base font-medium text-neutral4">
                  4.000.000 IDR /Day
               </div>
            </div>
         </div>
         <div className="text-right">
            <Button
               text="Learn More"
               size="small"
               width="noFull"
            />
         </div>
      </div>
   </div>
)
