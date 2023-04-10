import React, { useEffect } from 'react';
import { MembershipCard, TextXs } from 'components';
import {
   IcEmpty,
   TierMembershipSVG,
   TierMembershipSVG2,
   TierMembershipSVG3,
   TierMembershipSVG4,
   TierMembershipSVG5,
   TierMembershipSVG6,
} from 'assets';
import { Membership, selectMemberships } from 'modules';
import { useReduxSelector } from 'hooks';

interface MembershipListProps {
   onClick: (membership: Membership) => void;
}

export const MembershipList = ({ onClick }: MembershipListProps) => {
   const memberships = useReduxSelector(selectMemberships);
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
   };

   return (
      <div className="relative mt-10 flex max-w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-12 transition-transform duration-500 lg:gap-8.5">
         {memberships.length > 0 ? (
            memberships.map(member => (
               <MembershipCard
                  key={member.tier}
                  banner={renderTierBanner(member.tier)}
                  directReff={member.benefit.direct_reff}
                  tier={member.tier}
                  subReff={member.benefit.sub_reff}
                  withdrawLimit1H={member.benefit.withdraw_limit_24}
                  onClick={() => onClick(member)}
               />
            ))
         ) : (
            <div className="flex min-h-96 w-full flex-col items-center justify-center space-y-3">
               <IcEmpty />
               <TextXs
                  text="Memberships null"
                  font="semibold"
                  className="text-xs text-neutral4"
               />
            </div>
         )}
      </div>
   );
};
