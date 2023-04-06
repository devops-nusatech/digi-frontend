import React, { useCallback, useMemo, useRef } from 'react';
import { withRouter } from 'react-router';
import {
   Button,
   FlexCenter,
   LayoutProfile,
   ModalRequired,
   Text2xl,
   TierCard,
} from 'components';
import {
   selectMemberships,
   selectTierClaimLoading,
   selectUserInfo,
   tierClaimFetch,
} from 'modules';
import { useDocumentTitle, useToggle, useReduxSelector } from 'hooks';
import { toast } from 'react-toastify';
import { copyToClipboard } from 'helpers';
import { useDispatch } from 'react-redux';

export const Tier = withRouter(({ history }) => {
   useDocumentTitle('Memberships');
   const mainRef = useRef<HTMLDivElement>(null);
   const dispatch = useDispatch();
   const memberships = useReduxSelector(selectMemberships);
   const tierClaimLoading = useReduxSelector(selectTierClaimLoading);
   const { uid, username, profiles, tier, email, level } =
      useReduxSelector(selectUserInfo);
   const [toggle, setToggle] = useToggle(false);

   const referralLink = useMemo(
      () => `${window.document.location.origin}/register?refid=${uid}`,
      [uid]
   );

   const handleCopy = useCallback((url: string, type: string) => {
      copyToClipboard(url);
      toast.success(`${type} Copied`);
   }, []);

   const renderIconCheck = useMemo(
      () => (
         <svg className="h-6 w-6 fill-primary1 transition-colors duration-300">
            <use xlinkHref="#icon-check" />
         </svg>
      ),
      []
   );

   const renderIconMember = useMemo(() => {
      switch (tier) {
         case 'silver':
            return './images/tier/silver.svg';
         case 'gold':
            return './images/tier/gold.svg';
         case 'platinum':
            return './images/tier/platinum.svg';
         case 'diamond':
            return './images/tier/diamond.svg';
         case 'bronze':
            return './images/tier/bronze.svg';

         default:
            return null;
      }
   }, [tier]);

   return (
      <>
         <LayoutProfile
            mainRef={mainRef}
            title="Memberships"
            withBreadcrumbs={{
               display: 'Home',
               href: '/',
               active: 'Profile',
            }}>
            <div className="space-y-12">
               <div className="mb-5 flex justify-between">
                  <div className="space-y-3">
                     <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                        {username ?? profiles?.shift()?.first_name ?? ''}
                     </div>
                     <FlexCenter className="space-x-3">
                        <img
                           src={renderIconMember!}
                           alt="Tier"
                        />
                        <div className="font-medium capitalize text-member-bronze">
                           {tier} Member
                        </div>
                     </FlexCenter>
                     <div className="font-medium text-neutral4">{email}</div>
                     <FlexCenter className="space-x-3">
                        <div className="select-none font-medium text-neutral4">
                           {referralLink}
                        </div>
                        <button
                           className="group cursor-copy"
                           onClick={() => handleCopy(referralLink, 'Refferal')}
                           title="Copy referral">
                           <svg className="h-6 w-6 fill-neutral4 transition-transform duration-200 group-hover:scale-110 group-hover:fill-neutral3 dark:group-hover:fill-neutral5">
                              <use xlinkHref="#icon-copy" />
                           </svg>
                        </button>
                     </FlexCenter>
                  </div>
                  <Button
                     text={`Level ${level} verified`}
                     size="small"
                     variant="outline"
                     width="noFull"
                     color={
                        level === 1
                           ? 'orange'
                           : level === 2
                           ? 'yellow'
                           : 'primary'
                     }
                     className="pointer-events-none select-none"
                  />
               </div>
               <div className="space-y-10">
                  <Text2xl text="Tier membership list" />
                  <TierCard
                     tier={tier}
                     memberships={memberships}
                  />
               </div>
               <div className="space-y-10">
                  <Text2xl text="Benefits" />
                  <div className="space-y-6">
                     <div className="flex justify-between border-b border-neutral6 pb-6 text-xs font-bold uppercase leading-none text-neutral4 dark:border-neutral3">
                        <div>Bronze</div>
                        <div>{level >= 1 ? 'Verified' : 'Unverified'}</div>
                     </div>
                     <FlexCenter className="justify-between font-medium">
                        <div>Refferal commision on direct</div>
                        {renderIconCheck}
                     </FlexCenter>
                     <FlexCenter className="justify-between font-medium">
                        <div>Refferal commision sub direct</div>
                        {renderIconCheck}
                     </FlexCenter>
                     <FlexCenter className="justify-between font-medium">
                        <div>Withdrawal limit</div>
                        <div className="text-neutral4">5,000 USDT /Day</div>
                     </FlexCenter>
                  </div>
               </div>
               <Button
                  text="Claim"
                  withLoading={tierClaimLoading}
                  onClick={() => dispatch(tierClaimFetch())}
               />
               {tier !== 'influencer' && (
                  <div className="mt-10 text-right">
                     <Button
                        text="Verify your identity"
                        width="noFull"
                        onClick={() => history.push('/membership')}
                     />
                  </div>
               )}
            </div>
         </LayoutProfile>
         <ModalRequired
            show={toggle}
            close={setToggle}
         />
      </>
   );
});
