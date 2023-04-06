import React, { FunctionComponent, useState } from 'react';
import {
   Accordion,
   AccordionData,
   Button,
   Container,
   Heading2,
   Heading3,
   Hero,
   MembershipList,
   Section,
   TextBase,
} from 'components';
import { membershipStep1, membershipStep2, membershipStep3 } from 'assets';
import { useHistory, withRouter } from 'react-router';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Membership as IMembership } from 'modules';
import { numberFormat } from 'helpers';

const MembershipFC = () => {
   const [expandFaq, setExpandFaq] = useState(false);
   const handleSetExpandFaq = () => setExpandFaq(!expandFaq);
   const [membership, setMembership] = useState<IMembership>();

   const { push } = useHistory();

   const accordionItems: AccordionData[] = [
      {
         title: 'What’s the benefits for the invitees as new users?',
         content: 'What’s the benefits for the invitees as new users?',
      },
      {
         title: 'Where can I see my referral rewards? How often will the rewards be distributed?',
         content:
            'Where can I see my referral rewards? How often will the rewards be distributed?',
      },
      {
         title: 'How many times can a referral code be used?',
         content: 'How many times can a referral code be used?',
      },
   ];

   const requirement = membership && membership?.requirement;

   return (
      <>
         <Hero
            title="Smart way to earn bonus by refferal program with digiasset"
            subTitle="Earn rewards when you introduce your community to crypto. Get up to $1,000 for every referral."
            path="/markets"
            textButton="Lets Join Us"
            style={{
               background: 'url("/images/hero-membership.svg") no-repeat',
               backgroundSize: '100%',
               objectFit: 'cover',
            }}
            scrollTo="list"
         />
         <Section
            className="-mt-24 mb-6 md:mb-10"
            id="list">
            <Container>
               <Heading2 text="Tier Memberships" />
               <MembershipList onClick={setMembership} />
               {membership && (
                  <div className="space-y-6">
                     <Heading3 text="Tier Requirement" />
                     <div className="space-y-2.5">
                        <TextBase
                           font="normal"
                           text={`${membership?.tier
                              .split('')
                              .shift()
                              ?.toUpperCase()}${membership?.tier.slice(
                              1
                           )} Tier Requirements:`}
                           className="text-neutral3 dark:text-neutral5"
                        />
                        <ul className="list-outside list-decimal pl-3 text-neutral4">
                           <li>
                              Minimum KYC Must be{' '}
                              <span className="text-primary1">
                                 Level {requirement?.kyc}
                              </span>
                           </li>
                           <li>
                              The minimum number of referrals that must be owned
                              is{' '}
                              <span className="text-primary1">
                                 {requirement?.reff} active referrals
                              </span>
                           </li>
                           <li>
                              Minimum trading volume that must be owned is{' '}
                              {numberFormat(+requirement?.trx_vol!)} USDT and
                              have a good trade history
                           </li>
                           <li>
                              After you have achieved all the requirements,
                              every time you level up you will get a reward that
                              you can claim 1X every time you level up
                           </li>
                        </ul>
                     </div>
                  </div>
               )}
            </Container>
         </Section>
         <section className="relative bg-neutral7 py-8 dark:bg-shade1">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20">
               <div className="space-y-12">
                  <Heading2 text="Affiliate Program" />
                  <div
                     className="h-[319px] max-w-full"
                     style={{
                        background:
                           'url("/images/affiliate-membership.svg") 100% no-repeat',
                        objectFit: 'cover',
                        backgroundSize: '100%',
                     }}
                  />
                  <div className="text-center">
                     <Button
                        text="Join affiliate program"
                        width="noFull"
                        onClick={() => push('/join-affiliate')}
                     />
                  </div>
               </div>
            </div>
         </section>
         <section className="relative py-16 lg:py-28 lg2:py-34">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20">
               <div className="mx-auto mb-12 mt-0 max-w-[455px] space-y-5 md:mb-16 md:text-center">
                  <Heading2 text="How To Get Commision Easly" />
                  <div className="text-base text-neutral4">
                     A creative agency that lead and inspire.
                  </div>
               </div>
               <div className="mx-auto max-w-4xl">
                  <div className="grid grid-cols-3 gap-8">
                     <div className="relative col-span-3 cursor-pointer text-center transition-all duration-500 md:col-span-1">
                        <div className="relative mx-auto mb-20 mt-0 flex h-24 w-24 items-center justify-center">
                           <img
                              className="w-full object-none"
                              src={membershipStep1}
                              alt="Step 1"
                           />
                        </div>
                        <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                           Step 1
                        </div>
                        <div className="mb-4 text-base font-medium">
                           Share Your Code
                        </div>
                        <div className="text-neutral3 dark:text-neutral6">
                           Share your referral code/link to your friends or the
                           community.
                        </div>
                     </div>
                     <div className="relative col-span-3 cursor-pointer text-center transition-all duration-500 md:col-span-1">
                        <div className="relative mx-auto mb-20 mt-0 flex h-24 w-24 items-center justify-center">
                           <img
                              className="w-full object-none"
                              src={membershipStep2}
                              alt="Step 1"
                           />
                        </div>
                        <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                           Step 2
                        </div>
                        <div className="mb-4 text-base font-medium">
                           Referral register for trading
                        </div>
                        <div className="text-neutral3 dark:text-neutral6">
                           Earn from every sign up through your referral for
                           trading.
                        </div>
                     </div>
                     <div className="relative col-span-3 cursor-pointer text-center transition-all duration-500 md:col-span-1">
                        <div className="relative mx-auto mb-20 mt-0 flex h-24 w-24 items-center justify-center">
                           <img
                              className="w-full object-none"
                              src={membershipStep3}
                              alt="Step 1"
                           />
                        </div>
                        <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                           Step 3
                        </div>
                        <div className="mb-4 text-base font-medium">
                           Start earning
                        </div>
                        <div className="text-neutral3 dark:text-neutral6">
                           Up to 60% commission waiting for you to unlock while
                           your friends enjoy 10% rebate.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="mb-16 md:mb-28 lg2:mb-34">
            <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg:px-20">
               <Heading2
                  text="Frequently asked questions"
                  className="mb-10 text-center"
               />
               <div
                  className={`relative ${
                     expandFaq ? 'max-w-full' : 'max-w-546'
                  } mx-auto transition-all duration-700`}>
                  <Accordion items={accordionItems} />
                  <svg
                     onClick={handleSetExpandFaq}
                     className="absolute -top-4 right-0 h-4 w-4 cursor-pointer fill-neutral4 transition-all duration-300 hover:fill-neutral2 dark:hover:fill-neutral8">
                     <use xlinkHref="#icon-full-screen-outline" />
                  </svg>
               </div>
            </div>
         </section>
      </>
   );
};

export const Membership = compose(
   injectIntl,
   withRouter
)(MembershipFC) as FunctionComponent;
