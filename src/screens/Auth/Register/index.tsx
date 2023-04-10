import React, { Component } from 'react';
import { History } from 'history';
import { injectIntl } from 'react-intl';
import {
   connect,
   MapDispatchToPropsFunction,
   MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { captchaType, isUsernameEnabled } from 'api';
import { Captcha, FormRegister, LayoutAuth } from 'components';
import {
   EMAIL_REGEX,
   ERROR_INVALID_EMAIL,
   ERROR_INVALID_PASSWORD,
   ERROR_PASSWORD_CONFIRMATION,
   PASSWORD_REGEX,
   setDocumentTitle,
} from 'helpers';
import {
   entropyPasswordFetch,
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
   LanguageState,
   resetCaptchaState,
   RootState,
   selectCaptchaDataObjectLoading,
   selectCaptchaResponse,
   selectCurrentLanguage,
   selectCurrentPasswordEntropy,
   selectGeetestCaptchaSuccess,
   selectRecaptchaSuccess,
   selectregisterError,
   selectregisterLoading,
   selectregisterRequireVerification,
   register,
} from 'modules';
import { IntlProps } from '../../../';

interface ReduxProps {
   requireVerification?: boolean;
   loading?: boolean;
   currentPasswordEntropy: number;
   captcha_response?:
      | string
      | GeetestCaptchaResponse
      | GeetestCaptchaV4Response;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
   isLoading: boolean;
   captchaLoading: boolean;
}

interface DispatchProps {
   register: typeof register;
   fetchCurrentPasswordEntropy: typeof entropyPasswordFetch;
   resetCaptchaState: typeof resetCaptchaState;
}

interface RouterProps {
   location: {
      search: string;
   };
   history: History;
}

interface OwnProps {
   registerError: boolean;
   i18n: LanguageState['lang'];
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps & OwnProps;

export const extractRefID = (props: RouterProps) =>
   new URLSearchParams(props.location.search).get('refid');

class RegisterClass extends Component<Props> {
   public constructor(props) {
      super(props);

      this.geetestCaptchaRef = React.createRef<HTMLButtonElement>();
   }

   private geetestCaptchaRef;

   public readonly state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      refId: '',
      hasConfirmed: false,
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmationError: '',
      usernameFocused: false,
      emailFocused: false,
      passwordFocused: false,
      confirmPasswordFocused: false,
      refIdFocused: false,
   };

   public componentDidMount() {
      setDocumentTitle('Register');
      const localReferralCode = localStorage.getItem('referralCode');
      const refId = this.extractRefID(this.props.location.search);
      const referralCode = refId || localReferralCode || '';
      this.setState({ refId: referralCode });
      if (refId && refId !== localReferralCode) {
         localStorage.setItem('referralCode', referralCode);
      }
   }

   public componentDidUpdate(prev: Props) {
      const { email, password } = this.state;
      if (!prev.requireVerification && this.props.requireVerification)
         this.props.history.push('/email-verification', { email, password });
   }

   public renderCaptcha = () => {
      // const { registerError } = this.props;
      // const { confirmationError, emailError } = this.state;
      // const error = registerError || confirmationError || emailError;
      return <Captcha geetestCaptchaRef={this.geetestCaptchaRef} />;
   };

   public render() {
      const {
         isLoading,
         captcha_response,
         reCaptchaSuccess,
         geetestCaptchaSuccess,
         intl: { formatMessage },
         captchaLoading,
      } = this.props;
      const {
         username,
         email,
         password,
         confirmPassword,
         refId,
         hasConfirmed,
         emailError,
         passwordError,
         confirmationError,
         usernameFocused,
         emailFocused,
         passwordFocused,
         confirmPasswordFocused,
         refIdFocused,
      } = this.state;
      return (
         <LayoutAuth
            descLinkTo="Already have an account?"
            linkTo="/login"
            linkToTxt="Login"
            title="Register"
            subTitle="Please fill in the data below with honest and accurate information.">
            <FormRegister
               geetestCaptchaRef={this.geetestCaptchaRef}
               captchaType={captchaType()}
               renderCaptcha={this.renderCaptcha()}
               captcha_response={captcha_response}
               isReCaptchaSuccess={reCaptchaSuccess}
               isGeetestCaptchaSuccess={geetestCaptchaSuccess}
               hasConfirmed={hasConfirmed}
               isLoading={isLoading || captchaLoading}
               onRegister={this.handleregister}
               onLogin={this.handleLogin}
               validateForm={this.handleValidateForm}
               clickCheckBox={this.handleCheckboxClick}
               username={username}
               email={email}
               password={password}
               confirmPassword={confirmPassword}
               refid={refId}
               handleChangeUsername={this.handleChangeUsername}
               handleChangeEmail={this.handleChangeEmail}
               handleChangePassword={this.handleChangePassword}
               handleChangeConfirmPassword={this.handleChangeConfirmPassword}
               handleChangeRefId={this.handleChangeRefId}
               focusUsername={usernameFocused}
               focusEmail={emailFocused}
               focusPassword={passwordFocused}
               focusConfirmPassword={confirmPasswordFocused}
               focusRefId={refIdFocused}
               handleFocusUsername={this.handleFocusUsername}
               handleFocusEmail={this.handleFocusEmail}
               handleFocusPassword={this.handleFocusPassword}
               handleFocusConfirmPassword={this.handleFocusConfirmPassword}
               handleFocusRefId={this.handleFocusRefId}
               handleResetEmail={this.handleResetEmail}
               usernameLabel="Username"
               emailLabel={formatMessage({ id: 'page.header.register.email' })}
               passwordLabel={formatMessage({
                  id: 'page.header.register.password',
               })}
               confirmPasswordLabel={formatMessage({
                  id: 'page.header.register.confirmPassword',
               })}
               refIdLabel={`${formatMessage({
                  id: 'page.header.register.referalCode',
               })} (optional)`}
               emailError={emailError}
               passwordError={passwordError}
               confirmPasswordError={confirmationError}
               termsMessage={formatMessage({
                  id: 'page.header.register.terms',
               })}
               translate={this.translate}
            />
         </LayoutAuth>
      );
   }

   private translate = (key: string) =>
      this.props.intl.formatMessage({ id: key });

   private handleCheckboxClick = () => {
      this.setState({
         hasConfirmed: !this.state.hasConfirmed,
      });
   };

   private handleChangeUsername = (value: string) => {
      this.setState({
         username: value.replace(/[^A-Za-z0-9]+/g, '').toLowerCase(),
      });
   };

   private handleResetEmail = () =>
      this.setState({
         email: '',
         emailFocused: true,
         emailError: 'Email must be filled',
      });

   private handleChangeEmail = (email: string) => {
      const isEmailValid = email.match(EMAIL_REGEX);
      this.setState({
         email,
         emailError: !email.length
            ? 'Email must be filled'
            : email.length && !isEmailValid
            ? this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL })
            : '',
      });
   };

   private handleChangePassword = (password: string) => {
      this.setState({ password });
   };

   private handleChangeConfirmPassword = (value: string) => {
      this.setState({
         confirmPassword: value,
         confirmationError: !value.length
            ? `${this.translate(
                 'page.header.register.password'
              )} ${this.translate('mustBeFilled')}`
            : value.length && value !== this.state.password
            ? this.translate(
                 'page.header.register.confirmPassword.message.error'
              )
            : '',
      });
   };

   private handleChangeRefId = (value: string) => {
      this.setState({
         refId: value,
      });
   };

   private handleFocusUsername = () => {
      this.setState({
         usernameFocused: !this.state.usernameFocused,
      });
   };

   private handleFocusEmail = () => {
      this.setState({
         emailFocused: !this.state.emailFocused,
      });
   };

   private handleFocusPassword = () => {
      this.setState({
         passwordFocused: !this.state.passwordFocused,
      });
   };

   private handleFocusConfirmPassword = () => {
      this.setState({
         confirmPasswordFocused: !this.state.confirmPasswordFocused,
      });
   };

   private handleFocusRefId = () => {
      this.setState({
         refIdFocused: !this.state.refIdFocused,
      });
   };

   private handleLogin = () => {
      this.props.history.push('/login');
   };

   private handleregister = () => {
      const { i18n, captcha_response, register } = this.props;
      const { username, email, password, refId } = this.state;
      let payload: any = {
         email,
         password,
         data: JSON.stringify({
            language: i18n,
         }),
      };

      if (isUsernameEnabled()) {
         payload = { ...payload, username };
      }

      if (refId) {
         payload = { ...payload, refid: refId };
      }

      switch (captchaType()) {
         case 'recaptcha':
         case 'geetest':
            payload = { ...payload, captcha_response };

            register(payload);
            break;
         default:
            register(payload);
            break;
      }
      this.props.resetCaptchaState();
   };

   private handleValidateForm = () => {
      const { email, password, confirmPassword } = this.state;
      const {
         intl: { formatMessage },
      } = this.props;
      const isEmailValid = email.match(EMAIL_REGEX);
      const isPasswordValid = password.match(PASSWORD_REGEX);
      const isConfirmPasswordValid = password === confirmPassword;

      if (!isEmailValid && !isPasswordValid) {
         this.setState({
            confirmationError: '',
            emailError: formatMessage({ id: ERROR_INVALID_EMAIL }),
            passwordError: formatMessage({ id: ERROR_INVALID_PASSWORD }),
            hasConfirmed: false,
         });

         return;
      }

      if (!isEmailValid) {
         this.setState({
            confirmationError: '',
            emailError: formatMessage({ id: ERROR_INVALID_EMAIL }),
            passwordError: '',
            hasConfirmed: false,
         });

         return;
      }

      if (!isPasswordValid) {
         this.setState({
            confirmationError: '',
            emailError: '',
            passwordError: formatMessage({ id: ERROR_INVALID_PASSWORD }),
            hasConfirmed: false,
         });

         return;
      }

      if (!isConfirmPasswordValid) {
         this.setState({
            confirmationError: formatMessage({
               id: ERROR_PASSWORD_CONFIRMATION,
            }),
            emailError: '',
            passwordError: '',
            hasConfirmed: false,
         });
      }
   };

   private extractRefID = (url: string) =>
      new URLSearchParams(url).get('refid');
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   i18n: selectCurrentLanguage(state),
   requireVerification: selectregisterRequireVerification(state),
   registerError: selectregisterError(state),
   currentPasswordEntropy: selectCurrentPasswordEntropy(state),
   captcha_response: selectCaptchaResponse(state),
   reCaptchaSuccess: selectRecaptchaSuccess(state),
   geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
   isLoading: selectregisterLoading(state),
   captchaLoading: selectCaptchaDataObjectLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   register: credentials => dispatch(register(credentials)),
   fetchCurrentPasswordEntropy: payload =>
      dispatch(entropyPasswordFetch(payload)),
   resetCaptchaState: () => dispatch(resetCaptchaState()),
});

export const Register = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(RegisterClass) as React.ComponentClass;
