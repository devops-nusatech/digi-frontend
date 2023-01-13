import React, { FC, FunctionComponent, KeyboardEvent, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import {
   connect,
   MapDispatchToPropsFunction,
   MapStateToProps,
} from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../..';
import { Captcha, FormForgotPassword, LayoutAuth } from 'components';
import {
   EMAIL_REGEX,
   ERROR_INVALID_EMAIL,
   setDocumentTitle,
} from 'helpers';
import {
   Configs,
   forgotPassword,
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
   resetCaptchaState,
   RootState,
   selectCaptchaResponse,
   selectConfigs,
   selectForgotPasswordError,
   selectForgotPasswordSuccess,
   selectGeetestCaptchaSuccess,
   selectRecaptchaSuccess,
} from 'modules';
import { CommonError } from 'modules/types';

interface ReduxProps {
   success: boolean;
   error?: CommonError;
   configs: Configs;
   captcha_response?: string | GeetestCaptchaResponse | GeetestCaptchaV4Response;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
   isLoading: boolean;
}

interface DispatchProps {
   forgotPassword: typeof forgotPassword;
   resetCaptchaState: typeof resetCaptchaState;
}

interface ForgotPasswordState {
   email: string;
   emailError: string;
}

type Props = RouterProps & ReduxProps & DispatchProps & IntlProps;

const ForgotPasswordFC: FC<Props> = ({
   success,
   error,
   configs,
   captcha_response,
   reCaptchaSuccess,
   geetestCaptchaSuccess,
   isLoading,
   forgotPassword,
   resetCaptchaState,
   history,
   intl
}) => {
   useEffect(() => {
      setDocumentTitle('Forgot password');
      return () => setDocumentTitle('');
   }, []);
   const [state, setState] = useState<ForgotPasswordState>({
      email: '',
      emailError: '',
   });
   const { email, emailError } = state;

   const translate = (id: string) => intl.formatMessage({ id });

   const handleChangePassword = () => {
      switch (configs.captcha_type) {
         case 'recaptcha':
         case 'geetest':
            forgotPassword({ email, captcha_response });
            break;
         default:
            forgotPassword({ email });
            break;
      }
      setState({ ...state, email: '' });
      resetCaptchaState();
   };

   const handleInputEmail = (email: string) => {
      const isEmailValid = email.match(EMAIL_REGEX);
      setState({
         ...state,
         email,
         emailError: !email ? `Email ${translate('mustBeFilled')}` : (email && !isEmailValid) ? translate(ERROR_INVALID_EMAIL) : ''
      });
   };

   const validateForm = () => {
      const isEmailValid = email ? email.match(EMAIL_REGEX) : true;
      if (!isEmailValid) {
         setState({
            ...state,
            emailError: ERROR_INVALID_EMAIL,
         });
         return;
      }
   };

   const handleEnterPress = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         handleChangePassword();
      }
   };

   const handleRenderInputNewPass = () => history.push('/accounts/password_reset', { email });

   const renderCaptcha = () => <Captcha error={error} success={success} />;

   return (
      <LayoutAuth
         linkTo="/register"
         linkToTxt="Register for free"
         descLinkTo="Don’t have an account?"
         onKeyPress={handleEnterPress}
         title={translate('page.forgotPassword')}
         subTitle={translate('page.forgotPassword.subtitle')}
      >
         <FormForgotPassword
            buttonLabel={translate('page.body.kyc.next')}
            isLoading={isLoading}
            onSubmit={handleChangePassword}
            emailLabel={translate('page.forgotPassword.label')}
            email={email}
            emailError={emailError}
            placeholder={translate('page.header.signIn.email')}
            validateForm={validateForm}
            handleChangeEmail={handleInputEmail}
            captchaType={configs.captcha_type}
            renderCaptcha={renderCaptcha()}
            reCaptchaSuccess={reCaptchaSuccess}
            geetestCaptchaSuccess={geetestCaptchaSuccess}
            captcha_response={captcha_response}
            handleRenderInputNewPass={handleRenderInputNewPass}
         />
      </LayoutAuth>
   )
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   success: selectForgotPasswordSuccess(state),
   error: selectForgotPasswordError(state),
   configs: selectConfigs(state),
   captcha_response: selectCaptchaResponse(state),
   reCaptchaSuccess: selectRecaptchaSuccess(state),
   geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
   isLoading: selectForgotPasswordSuccess(state)
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   forgotPassword: credentials => dispatch(forgotPassword(credentials)),
   resetCaptchaState: () => dispatch(resetCaptchaState())
});

export const ForgotPassword = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ForgotPasswordFC) as FunctionComponent;
