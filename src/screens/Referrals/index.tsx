import React, {
   FunctionComponent,
   useEffect,
   useState
} from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';
import {
   InputGroup,
   LayoutProfile,
   ProfileSidebar,
   Skeleton
} from 'components';
import {
   copyToClipboard,
   setDocumentTitle
} from 'helpers';
import {
   RootState,
   selectUserInfo,
   User
} from 'modules';
import { toast } from 'react-toastify';
import { Referral } from './types';

import axios from 'axios';

interface Me extends User {
   referral?: any;
}
interface ReduxProps {
   user: Me;
}

type Props = ReduxProps & IntlProps;

const ReferralsFC = ({ intl, user }: Props) => {
   const { uid } = user;
   const [referrals, setReferrals] = useState<Referral>();
   const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
      setDocumentTitle('Referrals');
      (async () => {
         setIsLoading(true);
         const res: Referral = await (await axios.get('https://api.npoint.io/ff687718826ee5ecd3d9')).data;
         setIsLoading(false);
         setReferrals(res);
      })();
   }, []);

   const renderIconCopied = (title: string, value: string) => (
      <button
         className="cursor-copy group"
         onClick={() => handleCopy(value, title)}
         title="Copy referral"
      >
         <svg className="w-6 h-6 group-hover:scale-110 fill-neutral4 group-hover:fill-neutral3 dark:group-hover:fill-neutral5 transition-transform duration-200">
            <use xlinkHref="#icon-copy" />
         </svg>
      </button>
   );

   const handleCopy = (url: string, type: string) => {
      copyToClipboard(url);
      toast.success(`${type} Copied`)
   }

   const referralLink = `${window.document.location.origin}/register?refid=${uid}`;
   const referralCode = (): string => uid;

   return (
      <LayoutProfile
         title="API keys"
         withBreadcrumbs={{
            display: 'Home',
            href: '/',
            active: 'Referrals',
         }}
      >
         <ProfileSidebar />
         <div className="grow p-4 md:px-8 md:py-10 lg:p-10 shadow-card2 rounded-2xl bg-neutral8 dark:bg-shade1 space-y-12">
            <div className="space-y-3">
               <div className="flex justify-between">
                  <div>
                     <div className="font-medium text-neutral3 dark:text-neutral6">
                        Total rewards
                     </div>
                     <div className="font-dm text-4.5xl leading-1.2 tracking-custom1">
                        {referrals?.reff || '1,056.00'}
                        <span className="text-primary1"> USDT</span>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="font-medium text-neutral3 dark:text-neutral6 whitespace-nowrap">
                        Your referral
                     </div>
                     <div className="font-dm text-4.5xl leading-1.2 tracking-custom1">
                        {referrals?.reff_active || 0}
                     </div>
                  </div>
               </div>
               <div className="text-xs leading-custom4 text-neutral4">
                  Invite your friends to register digiassetindo exchange through the referral link or QR codes and get reward once they complete a trade
               </div>
            </div>
            <div className="space-y-12">
               <div className="p-8 space-y-8 rounded-2xl bg-shade4 dark:bg-neutral2">
                  <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                     Invite friends to earn 20%
                  </div>
                  <div className="flex space-x-4">
                     <InputGroup
                        label="referral link"
                        parentClassName="w-full"
                        lableClassName="!text-neutral2"
                        className="!bg-neutral8 dark:!bg-neutral1 border-0 focus:border-2 focus:border-neutral3 truncate"
                        value={referralLink}
                        icon={renderIconCopied('Referral link', referralLink)}
                     />
                     <InputGroup
                        label="referral code"
                        parentClassName="w-full"
                        lableClassName="!text-neutral2"
                        className="!bg-neutral8 dark:!bg-neutral1 border-0 focus:border-2 focus:border-neutral3 truncate"
                        value={referralCode()}
                        readOnly
                        icon={renderIconCopied('Referral code', referralCode())}
                     />
                  </div>
               </div>
               {referrals?.reff_list && (
                  <div>
                     <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
                        My referrals
                     </div>
                     <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                           <thead className="divide-y divide-neutral7 dark:divide-neutral2">
                              <tr>
                                 <td className="py-4 pr-2 text-xs leading-custom4 font-semibold text-left">
                                    No.
                                 </td>
                                 <td className="py-4 pr-2 text-xs leading-custom4 font-semibold text-left">
                                    UID
                                 </td>
                                 <td className="py-4 px-2 text-xs leading-custom4 font-semibold text-left">
                                    Email
                                 </td>
                                 <td className="py-4 px-2 text-xs leading-custom4 font-semibold text-left">
                                    Kyc Level
                                 </td>
                                 <td className="py-4 pl-2 text-xs leading-custom4 font-semibold text-right">
                                    Tier
                                 </td>
                              </tr>
                           </thead>
                           <tbody>
                              {isLoading ? (
                                 <>
                                    <tr>
                                       <td colSpan={5} className="px-4 py-3 last:pb-0">
                                          <Skeleton height={20} isWithFull rounded="md" />
                                       </td>
                                    </tr>
                                    <tr>
                                       <td colSpan={5} className="px-4 py-3 last:pb-0">
                                          <Skeleton height={20} isWithFull rounded="md" />
                                       </td>
                                    </tr>
                                    <tr>
                                       <td colSpan={5} className="px-4 py-3 last:pb-0">
                                          <Skeleton height={20} isWithFull rounded="md" />
                                       </td>
                                    </tr>
                                 </>
                              ) : referrals.reff_list?.length > 0 ? referrals.reff_list.map((e, i) => (
                                 <tr key={i}>
                                    <td className="py-4 pr-2 font-medium">
                                       {i + 1}.
                                    </td>
                                    <td className="py-4 px-2 font-medium">
                                       {e.uid}
                                    </td>
                                    <td className="py-4 px-2 font-medium">
                                       {e.email}
                                    </td>
                                    <td className="py-4 px-2 font-medium">
                                       {e.kyc_level}
                                    </td>
                                    <td className="py-4 pl-2 font-medium text-right">
                                       {e.tier}
                                    </td>
                                 </tr>
                              )) : (
                                 <tr>
                                    <td className="px-2 text-center text-neutral4 align-middle text-base font-medium" colSpan={12}>
                                       <div>{intl.formatMessage({ id: 'page.noDataToShow' })}</div>
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
   )
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
});

export const Referrals = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, null)
)(ReferralsFC) as FunctionComponent;
