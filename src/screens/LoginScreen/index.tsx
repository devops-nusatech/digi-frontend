import cx from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import {
   connect,
   MapDispatchToPropsFunction,
   MapStateToProps,
} from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../..';
import { captchaLogin, captchaType } from '../../api';
import { Captcha, LoginComponent, TwoFactorAuth } from '../../components';
import {
   EMAIL_REGEX,
   ERROR_EMPTY_PASSWORD,
   ERROR_INVALID_EMAIL,
   setDocumentTitle,
} from '../../helpers';
import {
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
   resetCaptchaState,
   RootState,
   selectAlertState,
   selectCaptchaResponse,
   selectGeetestCaptchaSuccess,
   selectRecaptchaSuccess,
   selectLoginError,
   selectLoginRequire2FA,
   selectregisterRequireVerification,
   selectUserFetching,
   selectUserLoggedIn,
   login,
   loginError,
   loginRequire2FA,
   registerRequireVerification,
} from '../../modules';
import { CommonError } from '../../modules/types';

interface ReduxProps {
   error?: CommonError;
   isLoggedIn: boolean;
   loading?: boolean;
   require2FA?: boolean;
   requireEmailVerification?: boolean;
   captcha_response?:
      | string
      | GeetestCaptchaResponse
      | GeetestCaptchaV4Response;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
}

interface DispatchProps {
   login: typeof login;
   loginError: typeof loginError;
   loginRequire2FA: typeof loginRequire2FA;
   resetCaptchaState: typeof resetCaptchaState;
   registerRequireVerification: typeof registerRequireVerification;
}

interface LoginState {
   email: string;
   emailError: string;
   emailFocused: boolean;
   password: string;
   passwordError: string;
   passwordFocused: boolean;
   otpCode: string;
   error2fa: string;
   codeFocused: boolean;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps;

class Login extends React.Component<Props, LoginState> {
   public state = {
      email: '',
      emailError: '',
      emailFocused: false,
      password: '',
      passwordError: '',
      passwordFocused: false,
      otpCode: '',
      error2fa: '',
      codeFocused: false,
   };

   public componentDidMount() {
      setDocumentTitle('Sign In');
      this.props.loginError({ code: 0, message: [''] });
      this.props.registerRequireVerification({ requireVerification: false });
   }

   public componentWillReceiveProps(nextProps: Props) {
      const { email } = this.state;

      if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
         this.props.resetCaptchaState();
         this.props.history.push('/wallets', { email });
      }

      if (nextProps.requireEmailVerification) {
         this.props.history.push('/email-verification', { email });
      }
   }

   public componentWillUnmount() {
      this.props.resetCaptchaState();
   }

   public renderCaptcha = () => {
      const { error } = this.props;

      return <Captcha error={error} />;
   };

   public render() {
      const { loading, require2FA } = this.props;

      const className = cx('pg-login-screen__container', { loading });

      return (
         <div className="pg-login-screen">
            <div className={className}>
               {require2FA ? this.render2FA() : this.renderLoginForm()}
            </div>
         </div>
      );
   }

   private renderLoginForm = () => {
      const {
         loading,
         captcha_response,
         reCaptchaSuccess,
         geetestCaptchaSuccess,
      } = this.props;
      const {
         email,
         emailError,
         emailFocused,
         password,
         passwordError,
         passwordFocused,
      } = this.state;

      return (
         <LoginComponent
            email={email}
            emailError={emailError}
            emailFocused={emailFocused}
            emailPlaceholder={this.props.intl.formatMessage({
               id: 'page.header.login.email',
            })}
            password={password}
            passwordError={passwordError}
            passwordFocused={passwordFocused}
            passwordPlaceholder={this.props.intl.formatMessage({
               id: 'page.header.login.password',
            })}
            labelLogin={this.props.intl.formatMessage({
               id: 'page.header.login',
            })}
            labelregister={this.props.intl.formatMessage({
               id: 'page.header.register',
            })}
            emailLabel={this.props.intl.formatMessage({
               id: 'page.header.login.email',
            })}
            passwordLabel={this.props.intl.formatMessage({
               id: 'page.header.login.password',
            })}
            receiveConfirmationLabel={this.props.intl.formatMessage({
               id: 'page.header.login.receiveConfirmation',
            })}
            forgotPasswordLabel={this.props.intl.formatMessage({
               id: 'page.header.login.forgotPassword',
            })}
            isLoading={loading}
            onForgotPassword={this.forgotPassword}
            onregister={this.handleregister}
            onLogin={this.handleLogin}
            handleChangeFocusField={this.handleFieldFocus}
            isFormValid={this.validateForm}
            refreshError={this.refreshError}
            changeEmail={this.handleChangeEmailValue}
            changePassword={this.handleChangePasswordValue}
            captchaType={captchaType()}
            renderCaptcha={this.renderCaptcha()}
            reCaptchaSuccess={reCaptchaSuccess}
            geetestCaptchaSuccess={geetestCaptchaSuccess}
            captcha_response={captcha_response}
         />
      );
   };

   private render2FA = () => {
      const { loading } = this.props;
      const { otpCode, error2fa, codeFocused } = this.state;

      return (
         <TwoFactorAuth
            isLoading={loading}
            onSubmit={this.handle2FALogin}
            title={this.props.intl.formatMessage({ id: 'page.password2fa' })}
            label={this.props.intl.formatMessage({
               id: 'page.body.wallets.tabs.withdraw.content.code2fa',
            })}
            buttonLabel={this.props.intl.formatMessage({
               id: 'page.header.login',
            })}
            message={this.props.intl.formatMessage({
               id: 'page.password2fa.message',
            })}
            codeFocused={codeFocused}
            otpCode={otpCode}
            error={error2fa}
            handleOtpCodeChange={this.handleChangeOtpCode}
            handleChangeFocusField={this.handle2faFocus}
            handleClose2fa={this.handleClose}
         />
      );
   };

   private refreshError = () => {
      this.setState({
         emailError: '',
         passwordError: '',
      });
   };

   private handleChangeOtpCode = (value: string) => {
      this.setState({
         error2fa: '',
         otpCode: value,
      });
   };

   private handleLogin = () => {
      const { email, password } = this.state;
      const { captcha_response } = this.props;

      if (captchaType() !== 'none' && captchaLogin()) {
         this.props.login({ email, password, captcha_response });
      } else {
         this.props.login({ email, password });
      }
   };

   private handle2FALogin = () => {
      const { email, password, otpCode } = this.state;
      const { captcha_response } = this.props;

      if (!otpCode) {
         this.setState({
            error2fa: 'Please enter 2fa code',
         });
      } else if (captchaType() !== 'none' && captchaLogin()) {
         this.props.login({
            email,
            password,
            captcha_response,
            otp_code: otpCode,
         });
      } else {
         this.props.login({ email, password, otp_code: otpCode });
      }
   };

   private handleregister = () => {
      this.props.history.push('/register');
   };

   private forgotPassword = () => {
      this.props.history.push('/forgot_password');
   };

   private handleFieldFocus = (field: string) => {
      switch (field) {
         case 'email':
            this.setState(prev => ({
               emailFocused: !prev.emailFocused,
            }));
            break;
         case 'password':
            this.setState(prev => ({
               passwordFocused: !prev.passwordFocused,
            }));
            break;
         default:
            break;
      }
   };

   private handle2faFocus = () => {
      this.setState(prev => ({
         codeFocused: !prev.codeFocused,
      }));
   };

   private validateForm = () => {
      const { email, password } = this.state;
      const isEmailValid = email.match(EMAIL_REGEX);

      if (!isEmailValid) {
         this.setState({
            emailError: this.props.intl.formatMessage({
               id: ERROR_INVALID_EMAIL,
            }),
            passwordError: '',
         });

         return;
      }
      if (!password) {
         this.setState({
            emailError: '',
            passwordError: this.props.intl.formatMessage({
               id: ERROR_EMPTY_PASSWORD,
            }),
         });

         return;
      }
   };

   private handleChangeEmailValue = (value: string) => {
      this.setState({
         email: value,
      });
   };

   private handleChangePasswordValue = (value: string) => {
      this.setState({
         password: value,
      });
   };

   private handleClose = () => {
      this.props.loginRequire2FA({ require2fa: false });
   };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   alert: selectAlertState(state),
   error: selectLoginError(state),
   isLoggedIn: selectUserLoggedIn(state),
   loading: selectUserFetching(state),
   require2FA: selectLoginRequire2FA(state),
   requireEmailVerification: selectregisterRequireVerification(state),
   captcha_response: selectCaptchaResponse(state),
   reCaptchaSuccess: selectRecaptchaSuccess(state),
   geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   login: data => dispatch(login(data)),
   loginError: error => dispatch(loginError(error)),
   loginRequire2FA: payload => dispatch(loginRequire2FA(payload)),
   resetCaptchaState: () => dispatch(resetCaptchaState()),
   registerRequireVerification: data =>
      dispatch(registerRequireVerification(data)),
});

export const LoginScreen = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Login) as React.ComponentClass;
