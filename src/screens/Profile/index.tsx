import React, { FunctionComponent, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, LayoutProfile, ModalRequired, ProfileSidebar } from 'components';
import { injectIntl } from 'react-intl';
// import { RouterProps } from 'react-router';
import { compose } from 'redux';
import { copyToClipboard, setDocumentTitle } from '../../helpers';
import { alertPush, changePasswordError, changePasswordFetch, Configs, entropyPasswordFetch, RootState, selectChangePasswordSuccess, selectConfigs, selectCurrentPasswordEntropy, selectUserInfo, toggle2faFetch, User } from 'modules';
import { IntlProps } from 'index';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { useModal } from 'hooks';

interface ReduxProps {
   user: User;
   passwordChangeSuccess?: boolean;
   configs: Configs;
   currentPasswordEntropy: number;
}

interface RouterProps {
   history: History;
}

interface OnChangeEvent {
   target: {
      value: string;
   };
}

interface DispatchProps {
   changePassword: typeof changePasswordFetch;
   clearPasswordChangeError: () => void;
   toggle2fa: typeof toggle2faFetch;
   fetchCurrentPasswordEntropy: typeof entropyPasswordFetch;
   fetchSuccess: typeof alertPush;
}

interface ProfileProps {
   showModal: boolean;
}

interface State {
   showChangeModal: boolean;
   showModal: boolean;
   code2FA: string;
   code2FAFocus: boolean;
}

type Props = ReduxProps & DispatchProps & RouterProps & ProfileProps & IntlProps & OnChangeEvent;

const ProfileFC = ({ user, fetchSuccess }: Props, { code2FA }: State) => {
   const { profiles, } = user;
   const { isShow, toggle } = useModal();
   useEffect(() => {
      setDocumentTitle('Profile');
   }, []);
   const level = user.level;
   const referralLink = `${window.document.location.origin}/register?refid=${user.uid}`;

   const handleCopy = (url: string, type: string) => {
      copyToClipboard(url);
      fetchSuccess({ message: [`${type} Copied`], type: 'success' });
   };

   const renderIconCheck = () => (
      <svg className="w-6 h-6 fill-primary1 transition-colors duration-300">
         <use xlinkHref="#icon-check" />
      </svg>
   )

   return (
      <>
         <LayoutProfile
            title="Withdraw"
            withBreadcrumbs={{
               display: 'Home',
               href: '/',
               active: 'Profile',
            }}
         >
            <ProfileSidebar />
            <div className="grow p-4 md:px-8 md:py-10 lg:p-10 shadow-card2 rounded-2xl bg-neutral8 dark:bg-shade1 space-y-12" style={{ animationDuration: '100ms' }}>
               <div className="flex justify-between mb-5">
                  <div className="space-y-3">
                     <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
                        {user.username ?? profiles[0]?.first_name ?? ''}
                     </div>
                     <div className="font-medium text-neutral4">
                        {user.email}
                     </div>
                     <div className="flex items-center space-x-3">
                        <div className="font-medium text-neutral4 select-none">
                           {referralLink}
                        </div>
                        <button
                           className="cursor-copy group"
                           onClick={() => handleCopy(referralLink, 'Refferal')}
                           title="Copy referral"
                        >
                           <svg className="w-6 h-6 group-hover:scale-110 fill-neutral4 group-hover:fill-neutral3 dark:group-hover:fill-neutral5 transition-transform duration-200">
                              <use xlinkHref="#icon-copy" />
                           </svg>
                        </button>
                     </div>
                  </div>
                  <Button
                     text={`Level ${user.level} verified`}
                     size="small"
                     variant="outline"
                     width="noFull"
                     color={user.level === 1 ? 'orange' : user.level === 2 ? 'yellow' : 'primary'}
                     className="pointer-events-none select-none"
                  />
               </div>
               <div className="space-y-10">
                  <div className="text-2xl font-medium leading-custom2 tracking-custom1">
                     Features
                  </div>
                  <div className="space-y-6">
                     <div className={`flex justify-between pb-6 border-b border-neutral6 dark:border-neutral3 ${level === 1 ? 'text-primary1' : 'text-primary4'} text-xs leading-none font-bold uppercase`}>
                        <div>level 1</div>
                        <div>{level >= 1 ? 'Verified' : 'Unverified'}</div>
                     </div>
                     <div className="flex items-center justify-between">
                        <div>Deposit assets</div>
                        {renderIconCheck()}
                     </div>
                     <div className="flex items-center justify-between">
                        <div>Withdraw assets</div>
                        {renderIconCheck()}
                     </div>
                     <div className="flex items-center justify-between">
                        <div>Transactions</div>
                        {renderIconCheck()}
                     </div>
                     <div className="flex items-center justify-between">
                        <div>USDT withdrawals</div>
                        <div className="text-right text-neutral4">5,000 USDT /Day</div>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <div className={`flex justify-between pb-6 border-b border-neutral6 dark:border-neutral3 ${level === 2 ? 'text-primary1' : 'text-primary4'} text-xs leading-none font-bold uppercase`}>
                        <div>level 2</div>
                        <div>{level >= 2 ? 'Verified' : 'Unverified'}</div>
                     </div>
                     <div className="flex items-center justify-between">
                        <div>Internal transfer</div>
                        {renderIconCheck()}
                     </div>
                     <div className="flex items-center justify-between">
                        <div>USDT withdrawals</div>
                        <div className="text-right text-neutral4">10,000 USDT /Day</div>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <div className={`flex justify-between pb-6 border-b border-neutral6 dark:border-neutral3 ${level === 3 ? 'text-primary1' : 'text-primary4'} text-xs leading-none font-bold uppercase`}>
                        <div>level 3</div>
                        <div>{level >= 3 ? 'Verified' : 'Unverified'}</div>
                     </div>
                     <div className="flex items-center justify-between">
                        <div>IDR Transaction</div>
                        {renderIconCheck()}
                     </div>
                     <div className="flex items-center justify-between">
                        <div>USDT withdrawals</div>
                        <div className="text-right text-neutral4">50,000 USDT /Day</div>
                     </div>
                  </div>
               </div>
               {level < 3 && (
                  <div className="mt-10 text-right">
                     <Button
                        text="Verify your identity"
                        width="noFull"
                        onClick={toggle}
                     />
                  </div>
               )}
            </div>
         </LayoutProfile>
         <ModalRequired
            show={isShow}
            close={toggle}
         />
      </>
   )
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   passwordChangeSuccess: selectChangePasswordSuccess(state),
   currentPasswordEntropy: selectCurrentPasswordEntropy(state),
   configs: selectConfigs(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   changePassword: ({ old_password, new_password, confirm_password }) =>
      dispatch(changePasswordFetch({ old_password, new_password, confirm_password })),
   toggle2fa: ({ code, enable }) => dispatch(toggle2faFetch({ code, enable })),
   fetchCurrentPasswordEntropy: payload => dispatch(entropyPasswordFetch(payload)),
   fetchSuccess: payload => dispatch(alertPush(payload)),
   clearPasswordChangeError: () => dispatch(changePasswordError({ code: 0, message: [] }))
});

export const Profile = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ProfileFC) as FunctionComponent;
