import { Button, Decimal } from 'components'
import { Membership, selectSonic } from 'modules';
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux';

interface MembershipCard {
   banner: ReactNode;
   tier: Membership['tier'];
   directReff: number;
   subReff: number;
   withdrawLimit1H: number;
   onClick: () => void;
}

export const MembershipCard = ({
   banner,
   tier,
   directReff,
   subReff,
   withdrawLimit1H,
   onClick
}: MembershipCard) => {
   const { peatio_platform_currency } = useSelector(selectSonic);
   return (
      <div className="snap-start shrink-0 first:pl-3 last:pr-3">
         <div className="space-y-3.5 rounded-2xl shadow-thin hover:shadow-lg dark:hover:bg-neutral2 px-3 py-6 cursor-pointer transition-all duration-200">
            {banner}
            <div className="text-base font-medium">
               Reward {tier}
            </div>
            <div className="space-y-3">
               <div className="flex gap-2 justify-between items-center">
                  <div className="text-neutral3">
                     Refferal Comision on Direct
                  </div>
                  <div className="text-base font-medium text-primary1">
                     {directReff * 100}%
                  </div>
               </div>
               <div className="flex gap-2 justify-between items-center">
                  <div className="text-neutral3">
                     Refferal Comision 1st Level
                  </div>
                  <div className="text-base font-medium text-primary1">
                     {subReff * 100}%
                  </div>
               </div>
               <div className="flex gap-2 justify-between items-center">
                  <div className="text-neutral3">
                     Withdraw Limit
                  </div>
                  <div className="text-base font-medium text-neutral4">
                     {Decimal.format(withdrawLimit1H, 0, ',')} {peatio_platform_currency?.toUpperCase()} /Day
                  </div>
               </div>
            </div>
            <div className="text-right">
               <Button
                  text="Learn More"
                  size="small"
                  width="noFull"
                  onClick={onClick}
               />
            </div>
         </div>
      </div>
   )
}
