import React, { Component, ComponentClass } from 'react';
import { compose } from 'redux';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { injectIntl } from 'react-intl';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { IntlProps } from '../../..';
import { captchaLogin } from 'api';
import { EMAIL_REGEX, ERROR_EMPTY_PASSWORD, ERROR_INVALID_EMAIL, PASSWORD_REGEX, setDocumentTitle } from 'helpers';
import {
   Configs,
   GeetestCaptchaResponse,
   resetCaptchaState,
   RootState,
   selectAlertState,
   selectCaptchaResponse,
   selectConfigs,
   selectGeetestCaptchaSuccess,
   selectRecaptchaSuccess,
   selectSignInError,
   selectSignInLoading,
   selectSignInRequire2FA,
   selectSignUpRequireVerification,
   selectUserFetching,
   selectUserLoggedIn,
   signIn,
   signInError,
   signInRequire2FA,
   signUpRequireVerification,
} from 'modules';
import { CommonError } from 'modules/types';
import { Captcha, FormLogin, TFA } from 'components';

interface ReduxProps {
   error?: CommonError;
   isLoggedIn: boolean;
   loading?: boolean;
   isLoading: boolean;
   require2FA?: boolean;
   requireEmailVerification?: boolean;
   configs: Configs;
   captcha_response?: string | GeetestCaptchaResponse;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
}

interface DispatchProps {
   signIn: typeof signIn;
   signInError: typeof signInError;
   signInRequire2FA: typeof signInRequire2FA;
   resetCaptchaState: typeof resetCaptchaState;
   signUpRequireVerification: typeof signUpRequireVerification;
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

interface OwnProps {
   location: {
      state: {
         email: string;
         password: string;
      };
   };
}

type Props = ReduxProps & DispatchProps & RouterProps & OwnProps & IntlProps;

class LoginClass extends Component<Props, LoginState> {
   public state = {
      email: (this.props.location.state && this.props.location.state.email) || '',
      password: (this.props.location.state && this.props.location.state.password) || '',
      emailError: '',
      emailFocused: false,
      passwordError: '',
      passwordFocused: false,
      otpCode: '',
      error2fa: '',
      codeFocused: false,
   }

   public componentDidMount() {
      setDocumentTitle('Login');
      this.props.signInError({ code: 0, message: [''] });
      this.props.signUpRequireVerification({ requireVerification: false });
   }

   public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<LoginState>, snapshot?: any) {
      const { otpCode } = this.state;
      if (!prevState.otpCode && otpCode.length === 6) {
         this.handle2FASignIn();
      }
   }

   public componentWillReceiveProps(nextProps: Props) {
      const { email } = this.state;
      const { isLoggedIn, resetCaptchaState, history: { push } } = this.props;
      if (!isLoggedIn && nextProps.isLoggedIn) {
         resetCaptchaState();
         push('/wallets', { email });
      }
      if (nextProps.requireEmailVerification) push('/email-verification', { email });
   }

   public componentWillUnmount() {
      this.props.resetCaptchaState();
   }

   public renderCaptcha = () => <Captcha error={this.props.error} />;

   public render() {
      const { require2FA } = this.props;
      return require2FA ? this.render2FA() : this.renderSignInForm();
   }

   private render2FA = () => {
      const { isLoading } = this.props;
      const { otpCode, error2fa, codeFocused } = this.state;
      const translate = (id: string) => this.props.intl.formatMessage({ id });

      return <TFA
         isLoading={isLoading}
         onSubmit={this.handle2FASignIn}
         title={translate('page.auth.2fa.title')}
         subTitle={translate('page.auth.2fa.subtitle')}
         buttonLabel={translate('page.body.kyc.next')}
         modalTitle={translate('page.auth.2fa.modal.title')}
         modalButton={translate('page.auth.2fa.modal.button')}
         // message={this.props.intl.formatMessage({ id: 'page.password2fa.message' })}
         codeFocused={codeFocused}
         otpCode={otpCode}
         error={error2fa}
         handleOtpCodeChange={this.handleChangeOtpCode}
         handleChangeFocusField={this.handle2faFocus}
         handleClose2fa={this.handleClose}
      />

   }

   private renderSignInForm = () => {
      const {
         configs,
         isLoading,
         captcha_response,
         reCaptchaSuccess,
         geetestCaptchaSuccess
      } = this.props;

      const {
         email, emailError, emailFocused, password, passwordError, passwordFocused
      } = this.state;
      const { intl: { formatMessage } } = this.props;

      return (
         <>
            <FormLogin
               title="Login to Digiasset"
               subTitle="Please ensure you are visiting the correct url."
               email={email}
               emailError={emailError}
               emailFocused={emailFocused}
               emailPlaceholder={formatMessage({ id: 'page.header.signIn.email' })}
               password={password}
               passwordError={passwordError}
               passwordFocused={passwordFocused}
               passwordPlaceholder={formatMessage({ id: 'page.header.signIn.password' })}
               labelSignIn={formatMessage({ id: 'page.header.signIn' })}
               labelSignUp={formatMessage({ id: 'page.header.signUp' })}
               emailLabel={formatMessage({ id: 'page.header.signIn.email' })}
               passwordLabel={formatMessage({ id: 'page.header.signIn.password' })}
               receiveConfirmationLabel={formatMessage({ id: 'page.header.signIn.receiveConfirmation' })}
               forgotPasswordLabel={formatMessage({ id: 'page.header.signIn.forgotPassword' })}
               isLoading={isLoading}
               onForgotPassword={this.forgotPassword}
               onSignUp={this.handleSignUp}
               onSignIn={this.handleSignIn}
               handleChangeFocusField={this.handleFieldFocus}
               isFormValid={this.validateForm}
               refreshError={this.refreshError}
               changeEmail={this.handleChangeEmailValue}
               resetEmail={this.resetEmail}
               changePassword={this.handleChangePasswordValue}
               captchaType={configs.captcha_type}
               renderCaptcha={this.renderCaptcha()}
               reCaptchaSuccess={reCaptchaSuccess}
               geetestCaptchaSuccess={geetestCaptchaSuccess}
               captcha_response={captcha_response}
            />
         </>
      )

   }

   private handle2FASignIn = () => {
      const { email, password, otpCode } = this.state;
      const { configs: { captcha_type }, captcha_response, signIn } = this.props;

      if (!otpCode) {
         this.setState({
            error2fa: 'Please enter 2fa code',
         });
      } else {
         if (captcha_type !== 'none' && captchaLogin()) {
            signIn({ email, password, captcha_response, otp_code: otpCode });
         } else {
            signIn({ email, password, otp_code: otpCode });
         }
      }
   };

   private handleChangeOtpCode = (value: string) => this.setState({ error2fa: '', otpCode: value });

   private handle2faFocus = () => this.setState(prev => ({ codeFocused: !prev.codeFocused }));

   private handleClose = () => this.props.signInRequire2FA({ require2fa: false });

   private forgotPassword = () => this.props.history.push('/forgot_password');

   private handleSignUp = () => this.props.history.push('/register');

   private handleSignIn = () => {
      const { email, password } = this.state;
      const { configs: { captcha_type }, captcha_response } = this.props;

      if (captcha_type !== 'none' && captchaLogin()) {
         this.props.signIn({ email, password, captcha_response });
      } else {
         this.props.signIn({ email, password });
      }
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

   private validateForm = () => {
      const { email, password } = this.state;
      const isEmailValid = email.match(EMAIL_REGEX);

      if (!isEmailValid) {
         this.setState({
            emailError: this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL }),
            passwordError: '',
         });
         return;
      }
      if (!password) {
         this.setState({
            emailError: '',
            passwordError: this.props.intl.formatMessage({ id: ERROR_EMPTY_PASSWORD }),
         });
         return;
      }
   };

   private refreshError = () => this.setState({ emailError: '', passwordError: '' });

   private resetEmail = () => this.setState({ email: '', emailFocused: true, emailError: 'Email must be filled' });

   private handleChangeEmailValue = (email: string) => {
      const isEmailValid = email.match(EMAIL_REGEX);
      this.setState({
         email,
         emailError: !email.length ? 'Email must be filled' : (email.length && !isEmailValid) ? this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL }) : ''
      });
   };

   private handleChangePasswordValue = (password: string) => {
      const isPasswordValid = password.match(PASSWORD_REGEX);
      this.setState({
         password,
         passwordError: !password.length ? 'Password must be filled' : !isPasswordValid ? this.props.intl.formatMessage({ id: ERROR_EMPTY_PASSWORD }) : ''
      })
   }

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   alert: selectAlertState(state),
   error: selectSignInError(state),
   isLoggedIn: selectUserLoggedIn(state),
   loading: selectUserFetching(state),
   isLoading: selectSignInLoading(state),
   require2FA: selectSignInRequire2FA(state),
   requireEmailVerification: selectSignUpRequireVerification(state),
   configs: selectConfigs(state),
   captcha_response: selectCaptchaResponse(state),
   reCaptchaSuccess: selectRecaptchaSuccess(state),
   geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state)
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   signIn: data => dispatch(signIn(data)),
   signInError: error => dispatch(signInError(error)),
   signInRequire2FA: payload => dispatch(signInRequire2FA(payload)),
   resetCaptchaState: () => dispatch(resetCaptchaState()),
   signUpRequireVerification: data => dispatch(signUpRequireVerification(data))
});

export const Login = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(LoginClass) as ComponentClass;
