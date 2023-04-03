import React, { useCallback, useMemo } from 'react';
import { InputGroup, LayoutProfile, ProfileSidebar } from 'components';
import { copyToClipboard } from 'helpers';
import { toast } from 'react-toastify';
import { useDocumentTitle, useReduxSelector } from 'hooks';
import { selectUserInfo } from 'modules';
import { useIntl } from 'react-intl';

export const Referrals = () => {
   useDocumentTitle('Referrals');
   const { formatMessage } = useIntl();
   const { uid, referral_id } = useReduxSelector(selectUserInfo);

   const translate = useCallback(
      (id: string) => formatMessage({ id }),
      [formatMessage]
   );

   const handleCopy = useCallback((url: string, type: string) => {
      copyToClipboard(url);
      toast.success(`${type} Copied`);
   }, []);

   const renderIconCopied = useCallback(
      (title: string, value: string) => (
         <button
            className="group cursor-copy"
            onClick={() => handleCopy(value, title)}
            title="Copy referral">
            <svg className="h-6 w-6 fill-neutral4 transition-transform duration-200 group-hover:scale-110 group-hover:fill-neutral3 dark:group-hover:fill-neutral5">
               <use xlinkHref="#icon-copy" />
            </svg>
         </button>
      ),
      [handleCopy]
   );

   const referralLink = useMemo(
      () => `${window.document.location.origin}/register?refid=${uid}`,
      [uid]
   );
   const referralCode = (): string => uid;

   return (
      <LayoutProfile
         title="Refferals"
         withBreadcrumbs={{
            display: 'Home',
            href: '/',
            active: 'Referrals',
         }}>
         <ProfileSidebar />
         <div className="grow space-y-12 rounded-2xl bg-neutral8 p-4 shadow-card2 dark:bg-shade1 md:px-8 md:py-10 lg:p-10">
            <div className="space-y-3">
               <div className="flex justify-between">
                  <div>
                     <div className="font-medium text-neutral3 dark:text-neutral6">
                        Total rewards
                     </div>
                     <div className="font-dm text-4.5xl leading-1.2 tracking-custom1">
                        1,056.00
                        <span className="text-primary1"> USDT</span>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="whitespace-nowrap font-medium text-neutral3 dark:text-neutral6">
                        Your referral
                     </div>
                     <div className="font-dm text-4.5xl leading-1.2 tracking-custom1">
                        {referral_id?.length || 0}
                     </div>
                  </div>
               </div>
               <div className="text-xs leading-custom4 text-neutral4">
                  Invite your friends to register digiassetindo exchange through
                  the referral link or QR codes and get reward once they
                  complete a trade
               </div>
            </div>
            <div className="space-y-12">
               <div className="space-y-8 rounded-2xl bg-shade4 p-8 dark:bg-neutral2">
                  <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                     Invite friends to earn 20%
                  </div>
                  <div className="flex space-x-4">
                     <InputGroup
                        label="referral link"
                        parentClassName="w-full"
                        lableClassName="!text-neutral2"
                        className="truncate border-0 !bg-neutral8 focus:border-2 focus:border-neutral3 dark:!bg-neutral1"
                        value={referralLink}
                        icon={renderIconCopied('Referral link', referralLink)}
                     />
                     <InputGroup
                        label="referral code"
                        parentClassName="w-full"
                        lableClassName="!text-neutral2"
                        className="truncate border-0 !bg-neutral8 focus:border-2 focus:border-neutral3 dark:!bg-neutral1"
                        value={referralCode()}
                        readOnly
                        icon={renderIconCopied('Referral code', referralCode())}
                     />
                  </div>
               </div>
               {referral_id && (
                  <div>
                     <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                        My referrals
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                           <thead className="divide-y divide-neutral7 dark:divide-neutral2">
                              <tr>
                                 <td className="py-4 pr-2 text-left text-xs font-semibold leading-custom4">
                                    No.
                                 </td>
                                 <td className="py-4 pr-2 text-left text-xs font-semibold leading-custom4">
                                    UID
                                 </td>
                                 <td className="px-2 py-4 text-left text-xs font-semibold leading-custom4">
                                    Email
                                 </td>
                                 <td className="px-2 py-4 text-left text-xs font-semibold leading-custom4">
                                    Kyc Level
                                 </td>
                                 <td className="py-4 pl-2 text-right text-xs font-semibold leading-custom4">
                                    Tier
                                 </td>
                              </tr>
                           </thead>
                           <tbody>
                              {referral_id?.length > 0 ? (
                                 referral_id.map((e, i) => (
                                    <tr key={i}>
                                       <td className="py-4 pr-2 font-medium">
                                          {i + 1}.
                                       </td>
                                       <td className="px-2 py-4 font-medium">
                                          {e.uid}
                                       </td>
                                       <td className="px-2 py-4 font-medium">
                                          {e.email}
                                       </td>
                                       <td className="px-2 py-4 font-medium">
                                          {e.level}
                                       </td>
                                       <td className="py-4 pl-2 text-right font-medium">
                                          {e.tier}
                                       </td>
                                    </tr>
                                 ))
                              ) : (
                                 <tr>
                                    <td
                                       className="px-2 text-center align-middle text-base font-medium text-neutral4"
                                       colSpan={12}>
                                       <div>
                                          {translate('page.noDataToShow')}
                                       </div>
                                    </td>
                                 </tr>
                              )}
                           </tbody>
                        </table>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </LayoutProfile>
   );
};
