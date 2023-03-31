import React, { FunctionComponent } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { History } from 'history';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';
import {
   ProfileSidebar,
   FormChangePassword,
   LayoutProfile,
   Button,
} from 'components';
import {
   changePasswordFetch,
   RootState,
   selectChangePasswordLoading,
   selectChangePasswordSuccess,
} from 'modules';
import { useDocumentTitle } from 'hooks';

interface ReduxProps {
   changePasswordLoading: boolean;
   passwordChangeSuccess?: boolean;
}

type RouterProps = {
   history: History;
};

interface DispatchProps {
   changePassword: typeof changePasswordFetch;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps;

const ChangePasswordFC = ({
   intl,
   changePassword,
   changePasswordLoading,
   passwordChangeSuccess,
   history: { push },
}: Props) => {
   useDocumentTitle('Change Password');

   const translate = (id: string) => intl.formatMessage({ id });

   return (
      <LayoutProfile
         title="Change password"
         withBreadcrumbs={{
            display: 'Home',
            href: '/',
            active: 'Change password',
         }}>
         <ProfileSidebar />
         <div
            className="grow space-y-12 rounded-2xl bg-neutral8 p-4 shadow-card2 dark:bg-shade1 md:px-8 md:py-10 lg:p-10"
            style={{ animationDuration: '100ms' }}>
            {passwordChangeSuccess ? (
               <div className="mx-auto w-full sm:w-84">
                  <div className="text-center font-dm text-4.5xl leading-[1.2] tracking-custom1">
                     New password
                  </div>
                  <div className="mb-8 mt-2 text-center text-base leading-normal">
                     Your new password has been set
                  </div>
                  <div className="text-center">
                     <Button
                        text="Get home"
                        width="noFull"
                        variant="outline"
                        onClick={() => push('/')}
                     />
                  </div>
               </div>
            ) : (
               <FormChangePassword
                  title={translate(
                     'page.body.profile.header.account.content.password.change'
                  )}
                  handleChangePassword={changePassword}
                  isLoading={changePasswordLoading}
               />
            )}
         </div>
      </LayoutProfile>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   changePasswordLoading: selectChangePasswordLoading(state),
   passwordChangeSuccess: selectChangePasswordSuccess(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   changePassword: ({ old_password, new_password, confirm_password }) =>
      dispatch(
         changePasswordFetch({
            old_password,
            new_password,
            confirm_password,
         })
      ),
});

export const ChangePassword = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ChangePasswordFC) as FunctionComponent;
