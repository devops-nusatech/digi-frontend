import { Button, Decimal } from 'components';
import { Membership } from 'modules';
import React, { ReactNode } from 'react';
import { platformCurrency } from 'api';

interface MembershipCardProps {
   banner: ReactNode;
   tier: Membership['tier'];
   directReff: string;
   subReff: string;
   withdrawLimit1H: string;
   onClick: () => void;
}

export const MembershipCard = ({
   banner,
   tier,
   directReff,
   subReff,
   withdrawLimit1H,
   onClick,
}: MembershipCardProps) => {
   return (
      <div className="shrink-0 snap-start first:pl-3 last:pr-3">
         <div className="cursor-pointer space-y-3.5 rounded-2xl px-3 py-6 shadow-thin transition-all duration-200 hover:shadow-lg dark:hover:bg-neutral2">
            {banner}
            <div className="text-base font-medium">Reward {tier}</div>
            <div className="space-y-3">
               <div className="flex items-center justify-between gap-2">
                  <div className="text-neutral3">
                     Refferal Comision on Direct
                  </div>
                  <div className="text-base font-medium text-primary1">
                     {+directReff * 100}%
                  </div>
               </div>
               <div className="flex items-center justify-between gap-2">
                  <div className="text-neutral3">
                     Refferal Comision 1st Level
                  </div>
                  <div className="text-base font-medium text-primary1">
                     {+subReff * 100}%
                  </div>
               </div>
               <div className="flex items-center justify-between gap-2">
                  <div className="text-neutral3">Withdraw Limit</div>
                  <div className="text-base font-medium text-neutral4">
                     {Decimal.format(withdrawLimit1H, 0, ',')}{' '}
                     {platformCurrency()?.toUpperCase()} /Day
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
   );
};
