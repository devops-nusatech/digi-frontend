import React, { FunctionComponent, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ProfileSidebar, FormChangePassword, LayoutProfile } from 'components';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { setDocumentTitle } from '../../helpers';
import { changePasswordFetch, Configs, entropyPasswordFetch, RootState, selectChangePasswordSuccess, selectConfigs, selectCurrentPasswordEntropy, selectUserInfo, toggle2faFetch, User } from 'modules';
import { connect } from 'react-redux';
import { IntlProps } from 'index';

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
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps & OnChangeEvent;

const ChangePasswordFC = ({
   configs,
   currentPasswordEntropy,
   intl,
   changePassword,
   fetchCurrentPasswordEntropy,
}: Props) => {
   useEffect(() => {
      setDocumentTitle('Change Password');
   }, []);

   return (
      <LayoutProfile
         title="Change password"
         withBreadcrumbs={{
            display: 'Home',
            href: '/',
            active: 'Change password',
         }}
      >
         <ProfileSidebar />
         <div className="grow p-4 md:px-8 md:py-10 lg:p-10 shadow-card2 rounded-2xl bg-neutral8 dark:bg-shade1 space-y-12" style={{ animationDuration: '100ms' }}>
            <FormChangePassword
               handleChangePassword={changePassword}
               title={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.change' })}
               configs={configs}
               currentPasswordEntropy={currentPasswordEntropy}
               fetchCurrentPasswordEntropy={fetchCurrentPasswordEntropy}
            />
         </div>
      </LayoutProfile>
   )
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   passwordChangeSuccess: selectChangePasswordSuccess(state),
   currentPasswordEntropy: selectCurrentPasswordEntropy(state),
   configs: selectConfigs(state),
});

const mapDispatchToProps = dispatch => ({
   changePassword: ({ old_password, new_password, confirm_password }) =>
      dispatch(changePasswordFetch({ old_password, new_password, confirm_password })),
   toggle2fa: ({ code, enable }) => dispatch(toggle2faFetch({ code, enable })),
   fetchCurrentPasswordEntropy: payload => dispatch(entropyPasswordFetch(payload)),
});

export const ChangePassword = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ChangePasswordFC) as FunctionComponent;
