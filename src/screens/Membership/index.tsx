import React, { FunctionComponent, useState } from 'react';
import { Accordion, AccordionData, Button, Heading2, Heading3, Hero, MembershipList } from 'components';
import { membershipStep1, membershipStep2, membershipStep3 } from 'assets';
import { useHistory, withRouter } from 'react-router';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

const MembershipFC = () => {
   const [expandFaq, setExpandFaq] = useState(false);
   const handleSetExpandFaq = () => setExpandFaq(!expandFaq);

   const { push } = useHistory();

   const accordionItems: AccordionData[] = [{
      title: 'What’s the benefits for the invitees as new users?',
      content: 'What’s the benefits for the invitees as new users?',
   }, {
      title: 'Where can I see my referral rewards? How often will the rewards be distributed?',
      content: 'Where can I see my referral rewards? How often will the rewards be distributed?',
   }, {
      title: 'How many times can a referral code be used?',
      content: 'How many times can a referral code be used?',
   }];

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
               objectFit: 'cover'
            }}
            scrollTo="list"
         />
         <section className="relative mb-6 md:mb-10 -mt-24" id="list">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
               <Heading2 text="Digiasset Tier Membership List" />
               <MembershipList />
               <div className="space-y-6">
                  <Heading3 text="Tier Requirement" />
                  <div className="space-y-2.5">
                     <div className="text-base leading-normal text-neutral3 dark:text-neutral5">
                        Diamond Tier Requirements:
                     </div>
                     <ul className="list-decimal list-outside text-neutral4 pl-3">
                        <li>Minimum KYC Must be <span className="text-primary1">Level 1</span></li>
                        <li>The minimum number of referrals that must be owned is <span className="text-primary1">100 active referrals</span></li>
                        <li>Minimum trading volume that must be owned is $ 1.000.000 USDT and have a good trade history</li>
                        <li>After you have achieved all the requirements, every time you level up you will get a reward that you can claim 1X every time you level up</li>
                     </ul>
                  </div>
               </div>
            </div>
         </section>
         <section className="relative py-8 bg-neutral7 dark:bg-shade1">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
               <div className="space-y-12">
                  <Heading2 text="Affiliate Program" />
                  <div className="max-w-full h-[319px]"
                     style={{
                        background: 'url("/images/affiliate-membership.svg") 100% no-repeat',
                        objectFit: 'cover',
                        backgroundSize: '100%'
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
            <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
               <div className="max-w-[455px] mt-0 mb-12 md:mb-16 mx-auto md:text-center space-y-5">
                  <Heading2 text="How To Get Commision Easly" />
                  <div className="text-base text-neutral4">
                     A creative agency that lead and inspire.
                  </div>
               </div>
               <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-3 gap-8">
                     <div className="relative col-span-3 md:col-span-1 transition-all duration-500 cursor-pointer text-center">
                        <div className="relative flex justify-center items-center w-24 h-24 mt-0 mx-auto mb-20">
                           <img className="w-full object-none" src={membershipStep1} alt="Step 1" />
                        </div>
                        <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                           Step 1
                        </div>
                        <div className="mb-4 text-base font-medium">
                           Share Your Code
                        </div>
                        <div className="text-neutral3 dark:text-neutral6">
                           Share your referral code/link to your friends or the community.
                        </div>
                     </div>
                     <div className="relative col-span-3 md:col-span-1 transition-all duration-500 cursor-pointer text-center">
                        <div className="relative flex justify-center items-center w-24 h-24 mt-0 mx-auto mb-20">
                           <img className="w-full object-none" src={membershipStep2} alt="Step 1" />
                        </div>
                        <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                           Step 2
                        </div>
                        <div className="mb-4 text-base font-medium">
                           Referral register for trading
                        </div>
                        <div className="text-neutral3 dark:text-neutral6">
                           Earn from every sign up through your referral for trading.
                        </div>
                     </div>
                     <div className="relative col-span-3 md:col-span-1 transition-all duration-500 cursor-pointer text-center">
                        <div className="relative flex justify-center items-center w-24 h-24 mt-0 mx-auto mb-20">
                           <img className="w-full object-none" src={membershipStep3} alt="Step 1" />
                        </div>
                        <div className="mb-8 text-xs font-semibold leading-custom1 text-neutral4">
                           Step 3
                        </div>
                        <div className="mb-4 text-base font-medium">
                           Start earning
                        </div>
                        <div className="text-neutral3 dark:text-neutral6">
                           Up to 60% commission waiting for you to unlock while your friends enjoy 10% rebate.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="mb-16 md:mb-28 lg2:mb-34">
            <div className="w-full max-w-7xl px-8 md:px-10 lg:px-20 mx-auto">
               <Heading2
                  text="Frequently asked questions"
                  className="text-center mb-10"
               />
               <div className={`relative ${expandFaq ? 'max-w-full' : 'max-w-546'} transition-all duration-700 mx-auto`}>
                  <Accordion items={accordionItems} />
                  <svg
                     onClick={handleSetExpandFaq}
                     className="cursor-pointer absolute right-0 -top-4 w-4 h-4 fill-neutral4 hover:fill-neutral2 dark:hover:fill-neutral8 transition-all duration-300">
                     <use xlinkHref="#icon-full-screen-outline" />
                  </svg>
               </div>
            </div>
         </section>
      </>
   )
}

export const Membership = compose(
   injectIntl,
   withRouter,
)(MembershipFC) as FunctionComponent;
