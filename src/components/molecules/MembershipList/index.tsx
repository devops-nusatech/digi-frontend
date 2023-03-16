import React, { useEffect } from 'react'
import { MembershipCard, Skeleton } from 'components';
import {
   TierMembershipSVG,
   TierMembershipSVG2,
   TierMembershipSVG3,
   TierMembershipSVG4,
   TierMembershipSVG5,
   TierMembershipSVG6,
} from 'assets';
import { useMembershipsFetch } from 'hooks';
import { Membership } from 'modules';

interface MembershipListProps {
   onClick: (membership: Membership) => void;
}

export const MembershipList = ({
   onClick
}: MembershipListProps) => {
   const {
      memberships,
      membershipsLoading,
   } = useMembershipsFetch();
   // const { airdrops } = useAirdropsFetch();
   // const { airdrop } = useAirdropFetch('0908e49c-34c7-495f-bb99-56225be74992');

   useEffect(() => {
      onClick(memberships[0]);
   }, [memberships]);

   // useEffect(() => {
   //    console.log('airdrops', airdrops);
   //    console.log('airdrop', airdrop);
   // }, [airdrops, airdrop]);

   const renderTierBanner = (tier: Membership['tier']) => {
      switch (tier) {
         case 'bronze':
            return <TierMembershipSVG />;
         case 'silver':
            return <TierMembershipSVG2 />;
         case 'gold':
            return <TierMembershipSVG3 />;
         case 'platinum':
            return <TierMembershipSVG4 />;
         case 'diamond':
            return <TierMembershipSVG5 />;
         case 'influencer':
            return <TierMembershipSVG6 />;
         default:
            return;
      }
   }

   return (
      <div className="mt-10 relative max-w-full flex gap-6 lg:gap-8.5 snap-x snap-mandatory overflow-x-auto pb-12 transition-transform duration-500">
         {membershipsLoading ? (
            <>
               <Skeleton className="snap-start shrink-0 first:pl-3 last:pr-3" width={339} height={350} />
               <Skeleton className="snap-start shrink-0 first:pl-3 last:pr-3" width={339} height={350} />
               <Skeleton className="snap-start shrink-0 first:pl-3 last:pr-3" width={339} height={350} />
               <Skeleton className="snap-start shrink-0 first:pl-3 last:pr-3" width={339} height={350} />
            </>
         ) : memberships.length > 0 ? memberships.map(member => (
            <MembershipCard
               key={member.tier}
               banner={renderTierBanner(member.tier)}
               directReff={member.benefits.direct_reff}
               tier={member.tier}
               subReff={member.benefits.sub_reff}
               withdrawLimit1H={member.benefits.withdraw_limit_24}
               onClick={() => onClick(member)}
            />
         )) : (
            <div className="">
               Memberships null
            </div>
         )}
      </div>
   )
}
