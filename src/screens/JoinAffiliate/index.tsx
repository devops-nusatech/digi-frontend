import React, { FunctionComponent, useEffect, useMemo, useRef } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import {
   Button,
   InputGroup,
   LayoutProfile,
   Portal,
   StepLine,
} from 'components';
import { getRefObject, scrollTo } from 'helpers';
import { useToggle, useScrollUp, useStep } from 'hooks';

const JoinAffiliateFC = () => {
   useScrollUp();
   const [toggle, setToggle] = useToggle(false);
   const mainRef = useRef<HTMLDivElement>(null);

   const renderStep1 = () => (
      <div className="space-y-8">
         <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
            Affliate Program Digiasset
         </div>
         <div
            className="h-[182px] max-w-full"
            style={{
               background:
                  'url("/images/affiliate-membership.svg") 100% no-repeat',
               objectFit: 'cover',
               backgroundSize: '100%',
            }}
         />
         <div className="space-y-3">
            <div className="text-base leading-normal text-neutral3 dark:text-neutral5">
               What Is Affiliate Program
            </div>
            <div className="text-neutral4">
               An affiliate program is a marketing strategy that allows
               businesses to partner with individuals or organizations
               (affiliates) to promote their products or services. In exchange
               for promoting the business, the affiliate earns a commission for
               any resulting sales or leads. The commission is usually a
               percentage of the sale or a flat fee. Affiliates can promote the
               business through various channels, such as a website, social
               media, or email marketing. This can be a cost-effective way for
               businesses to acquire customers and expand their reach, while
               also providing an opportunity for affiliates to earn money.
            </div>
         </div>
         <div className="space-y-3">
            <div className="text-base leading-normal text-neutral3 dark:text-neutral5">
               Benefit Of Digiasset Affiliate Program
            </div>
            <ul className="list-outside list-decimal pl-3 text-neutral4">
               <li>
                  The Commission you get from Direct Referrals is{' '}
                  <span className="font-medium text-primary1">50%</span>
               </li>
               <li>
                  The Commission you get from Sub Direct Referrals is{' '}
                  <span className="font-medium text-primary1">25%</span>
               </li>
               <li>
                  The limit of the withdrawal you get is{' '}
                  <span className="font-medium text-primary1">2,000,000</span>{' '}
                  when you join this affiliate program{' '}
                  <span className="font-medium text-primary1">is 25%</span>
               </li>
               <li>
                  Cost-effective: Affiliate programs are a cost-effective way to
                  acquire customers and increase sales, as the business only
                  pays the affiliate when a sale or lead is generated.
               </li>
               <li>
                  Reach: Affiliates can reach a wider audience than the business
                  would be able to on its own, as they have their own networks
                  and followers.
               </li>
               <li>
                  Increased visibility: Affiliates can promote the business
                  through various channels, such as social media, websites, and
                  email marketing, which can increase the business's visibility
                  and online presence.
               </li>
               <li>
                  Low risk: As the business only pays the affiliate when a sale
                  or lead is generated, there is low risk involved.
               </li>
            </ul>
         </div>
         <div className="text-right">
            <Button
               text="Continue"
               width="noFull"
               onClick={() => goToStep(1)}
            />
         </div>
      </div>
   );
   const renderStep2 = () => (
      <div className="space-y-8">
         <button
            type="button"
            onClick={() => goToStep(0)}
            className="group flex items-center text-2xl font-semibold leading-custom2 tracking-custom1">
            <svg className="mr-4 h-3.5 w-3.5 fill-neutral4 transition-all duration-300 group-hover:-translate-x-1">
               <use xlinkHref="#icon-arrow-prev" />
            </svg>
            Social Media Link
         </button>
         <div className="grid grid-cols-2 gap-4">
            <InputGroup
               label="Instagram"
               placeholder="eg. instagram.com/airdrops...."
            />
            <InputGroup
               label="Twitter"
               placeholder="eg. twitter.com/airdrops...."
            />
         </div>
         <div className="grid grid-cols-2 gap-4">
            <InputGroup
               label="Youtube"
               placeholder="eg. youtube.com/sosmed...."
            />
            <InputGroup
               label="Telegram"
               placeholder="eg. t.me/grouptele...."
            />
         </div>
         <div className="grid grid-cols-2 gap-4">
            <InputGroup
               label="Tiktok"
               placeholder="eg. tiktok.com/grouptele...."
            />
            <InputGroup
               label="Other"
               placeholder="Another Social Media Link (Optional)"
            />
         </div>
         <div className="text-right">
            <Button
               text="Continue"
               width="noFull"
               onClick={setToggle}
            />
         </div>
      </div>
   );

   const { currentStep, goToStep, step } = useStep([
      renderStep1(),
      renderStep2(),
   ]);

   const renderModalSuccess = useMemo(
      () => (
         <Portal
            show={toggle}
            close={setToggle}>
            <div className="mt-10 space-y-8">
               <div className="text-center font-dm text-5xl font-bold leading-custom1 tracking-custom">
                  Yay! 🎉
               </div>
               <div className="text-center leading-normal text-neutral4">
                  Your Affiliate request was successful, the request will be
                  processed in approximately 2 x 24 hours. Or you can Contact
                  Support for further questions
               </div>
               <Button
                  text="Continue"
                  onClick={setToggle}
               />
            </div>
         </Portal>
      ),
      [setToggle, toggle]
   );

   useEffect(() => {
      if (currentStep > 0) {
         scrollTo(getRefObject(mainRef).offsetTop);
      }
   }, [currentStep]);

   return (
      <>
         <LayoutProfile
            title="Apply Affliate Program"
            withBreadcrumbs={{
               display: 'Membership',
               href: '/membership',
               active: 'Join affiliate',
            }}>
            <StepLine
               titles={['Introductions', 'Enter social media']}
               currentStep={currentStep}
            />
            <div className="mr-8 w-full shrink-0 space-y-6 lg:w-56 lg2:mr-12 lg2:w-72 1xl:mr-20 md-max:mb-6 lg-max:mb-8 lg-max:hidden">
               <div
                  className={`relative flex h-12 items-center space-x-4 rounded-3xl px-2 font-dm font-bold leading-custom3 transition-all duration-300 after:absolute after:left-5.75 after:top-full after:h-6 after:border-l-2 after:border-dashed after:border-neutral5 after:content-[''] ${
                     currentStep === 0 && 'text-neutral4'
                  } ${
                     currentStep === 1 &&
                     'bg-neutral8 shadow-step dark:bg-neutral2 dark:after:border-neutral4'
                  }`}>
                  <div
                     className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        currentStep === 0 || currentStep === 1
                           ? 'border-primary5 dark:border-chart1'
                           : 'border-neutral6 dark:border-neutral4'
                     } ${
                        currentStep === 1 &&
                        'bidding__number bidding__number_dark'
                     } transition-all duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-full after:transition-opacity after:duration-200 after:content-['']`}>
                     1
                  </div>
                  <div>What is affliate program</div>
               </div>
               <div
                  className={`relative flex h-12 items-center space-x-4 rounded-3xl px-2 font-dm font-bold ${
                     currentStep !== 1 && 'text-neutral4'
                  } leading-custom3 transition-all duration-300`}>
                  <div
                     className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        currentStep === 1
                           ? 'border-primary5 dark:border-chart1'
                           : 'border-neutral6 dark:border-neutral4'
                     } transition-all duration-300`}>
                     2
                  </div>
                  <div>Social media profile</div>
               </div>
            </div>
            <div
               ref={mainRef}
               className="grow rounded-2xl bg-neutral8 p-4 shadow-card2 dark:bg-shade1 md:px-8 md:py-10 lg:p-10"
               style={{ animationDuration: '100ms' }}>
               {step}
            </div>
         </LayoutProfile>
         {renderModalSuccess}
      </>
   );
};

export const JoinAffiliate = compose(
   injectIntl,
   withRouter
)(JoinAffiliateFC) as FunctionComponent;
