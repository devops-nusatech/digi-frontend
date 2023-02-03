import React from 'react'
import { MembershipCard } from 'components';
import {
   TierMembershipSVG,
   TierMembershipSVG2,
   TierMembershipSVG3,
   TierMembershipSVG4,
   TierMembershipSVG5,
} from 'assets';

export const MembershipList = () => {
   return (
      <div className="mt-10 relative max-w-full flex gap-6 lg:gap-8.5 snap-x snap-mandatory overflow-x-auto pb-12 transition-transform duration-500">
         <MembershipCard
            banner={<TierMembershipSVG />}
         />
         <MembershipCard
            banner={<TierMembershipSVG2 />}
         />
         <MembershipCard
            banner={<TierMembershipSVG3 />}
         />
         <MembershipCard
            banner={<TierMembershipSVG4 />}
         />
         <MembershipCard
            banner={<TierMembershipSVG5 />}
         />
      </div>
   )
}
