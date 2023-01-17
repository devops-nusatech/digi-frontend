import React, { FunctionComponent, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { InputGroup, LayoutProfile, ProfileSidebar } from 'components';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { copyToClipboard, localeDate, setDocumentTitle } from 'helpers';
import { RootState, selectUserInfo, User } from 'modules';
import { IntlProps } from 'index';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

interface Me extends User {
   referral?: any;
}
interface ReduxProps {
   user: Me;
}


type Props = ReduxProps & IntlProps;

const ReferralsFC = ({ intl, user }: Props) => {
   const { uid, referral } = user;
   useEffect(() => {
      setDocumentTitle('Referrals');
   }, []);

   const translate = (id: string) => intl.formatMessage({ id });

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
                        1,056.00
                        <span className="text-primary1"> USDT</span>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="font-medium text-neutral3 dark:text-neutral6 whitespace-nowrap">
                        Your referral
                     </div>
                     <div className="font-dm text-4.5xl leading-1.2 tracking-custom1">
                        0
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
               {referral && (
                  <div>
                     <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
                        My referrals
                     </div>
                     <div className="relative table w-full">
                        <div className="table-row">
                           <div className="table-cell py-4 pr-2 border-b border-neutral7 dark:border-neutral3 text-xs text-neutral3 dark:text-neutral7 leading-custom4 font-semibold">
                              {translate('page.body.profile.apiKeys.table.header.created')}
                           </div>
                           <div className="table-cell py-4 px-2 border-b border-neutral7 dark:border-neutral3 text-xs text-neutral3 dark:text-neutral7 leading-custom4 font-semibold">
                              UID
                           </div>
                           <div className="table-cell py-4 px-2 border-b border-neutral7 dark:border-neutral3 text-xs text-neutral3 dark:text-neutral7 leading-custom4 font-semibold">
                              Email
                           </div>
                           <div className="table-cell py-4 px-2 border-b border-neutral7 dark:border-neutral3 text-xs text-neutral3 dark:text-neutral7 leading-custom4 font-semibold">
                              Username
                           </div>
                           <div className="table-cell py-4 px-2 border-b border-neutral7 dark:border-neutral3 text-xs text-neutral3 dark:text-neutral7 leading-custom4 font-semibold">
                              Level
                           </div>
                           <div className="table-cell py-4 pl-2 border-b border-neutral7 dark:border-neutral3 text-xs text-neutral3 dark:text-neutral7 leading-custom4 font-semibold text-right">
                              {translate('page.body.profile.apiKeys.table.header.state')}
                           </div>
                        </div>
                        {
                           referral?.length > 0
                              ? referral?.map((e, i) => (
                                 <div className="table-row" key={i}>
                                    <div className="table-cell py-4 pr-2 border-b border-neutral6 dark:border-neutral3 align-middle">
                                       <div className="font-medium">{localeDate(e[10], 'shortDate').split(' ').shift()}</div>
                                    </div>
                                    <div className="table-cell py-4 px-2 border-b border-neutral6 dark:border-neutral3 align-middle">
                                       <div className="font-medium">{e[1]}</div>
                                    </div>
                                    <div className="table-cell py-4 px-2 border-b border-neutral6 dark:border-neutral3 align-middle">
                                       <div className="font-medium">{e[2]}</div>
                                    </div>
                                    <div className="table-cell py-4 px-2 border-b border-neutral6 dark:border-neutral3 align-middle">
                                       <div className="font-medium">Jhon doe</div>
                                    </div>
                                    <div className="table-cell py-4 px-2 border-b border-neutral6 dark:border-neutral3 align-middle">
                                       <div className="font-medium">{e[4]}</div>
                                    </div>
                                    <div className="table-cell py-4 pl-2 border-b border-neutral6 dark:border-neutral3 align-middle">
                                       <div className={`font-medium ${e[8] === 'active' ? 'text-primary5' : 'text-primary4'}`}>{e[8]}</div>
                                    </div>
                                 </div>
                              )) : (
                                 <div className="table-row">
                                    <div className="table-cell">&nbsp;</div>
                                    <div className="table-cell">&nbsp;</div>
                                    <div className="table-cell">&nbsp;</div>
                                    <div className="table-cell">&nbsp;</div>
                                    <div className="table-cell">&nbsp;</div>
                                    <div className="table-cell absolute left-0 w-full text-xs leading-relaxed font-medium text-neutral4 text-center animate-pulse">
                                       Referral not found...
                                    </div>
                                 </div>
                              )
                        }
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
