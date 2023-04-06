import React, { useEffect, useMemo, useRef } from 'react';
import { Button, InputGroup, LayoutStep, ModalSuccess } from 'components';
import { getRefObject, scrollTo } from 'helpers';
import { useToggle, useScrollUp, useStep } from 'hooks';

const titles = ['Introductions', 'Enter social media'];

export const JoinAffiliate = () => {
   useScrollUp();
   const [toggle, setToggle] = useToggle(false);
   const mainRef = useRef<HTMLDivElement>(null);

   const renderStep1 = useMemo(
      () => (
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
                  (affiliates) to promote their products or services. In
                  exchange for promoting the business, the affiliate earns a
                  commission for any resulting sales or leads. The commission is
                  usually a percentage of the sale or a flat fee. Affiliates can
                  promote the business through various channels, such as a
                  website, social media, or email marketing. This can be a
                  cost-effective way for businesses to acquire customers and
                  expand their reach, while also providing an opportunity for
                  affiliates to earn money.
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
                     <span className="font-medium text-primary1">
                        2,000,000
                     </span>{' '}
                     when you join this affiliate program{' '}
                     <span className="font-medium text-primary1">is 25%</span>
                  </li>
                  <li>
                     Cost-effective: Affiliate programs are a cost-effective way
                     to acquire customers and increase sales, as the business
                     only pays the affiliate when a sale or lead is generated.
                  </li>
                  <li>
                     Reach: Affiliates can reach a wider audience than the
                     business would be able to on its own, as they have their
                     own networks and followers.
                  </li>
                  <li>
                     Increased visibility: Affiliates can promote the business
                     through various channels, such as social media, websites,
                     and email marketing, which can increase the business's
                     visibility and online presence.
                  </li>
                  <li>
                     Low risk: As the business only pays the affiliate when a
                     sale or lead is generated, there is low risk involved.
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
      ),
      []
   );
   const renderStep2 = useMemo(
      () => (
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
      ),
      [setToggle]
   );

   const { currentStep, goToStep, step } = useStep([renderStep1, renderStep2]);

   const renderModalSuccess = useMemo(
      () => (
         <ModalSuccess
            toggle={toggle}
            setToggle={setToggle}
            title={
               <>
                  followed{' '}
                  <span className="text-primary1">Affliate Program</span> from
                  Digiasset
               </>
            }
            subTitle="Your Affiliate request was successful, the request will be processed in approximately 2 x 24 hours. Or you can Contact Support for further questions."
         />
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
         <LayoutStep
            title="Apply Affliate Program"
            withBreadcrumbs={{
               display: 'Membership',
               href: '/membership',
               active: 'Join affiliate',
            }}
            titles={titles}
            currentStep={currentStep}
            mainRef={mainRef}>
            {step}
         </LayoutStep>
         {renderModalSuccess}
      </>
   );
};
