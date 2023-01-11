import { History } from 'history';
import React, { Component, createRef } from 'react';
import { injectIntl } from 'react-intl';
import {
   connect,
   MapDispatchToPropsFunction,
   MapStateToProps,
} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import { isUsernameEnabled } from 'api';
import { Button, Captcha, FormRegisterV2, LayoutAuth, Modal } from 'components';
import {
   EMAIL_REGEX,
   ERROR_INVALID_EMAIL,
   ERROR_INVALID_PASSWORD,
   ERROR_PASSWORD_CONFIRMATION,
   PASSWORD_REGEX,
   passwordErrorFirstSolution,
   passwordErrorSecondSolution,
   passwordErrorThirdSolution,
   setDocumentTitle,
} from 'helpers';
import {
   Configs,
   entropyPasswordFetch, GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
   LanguageState,
   resetCaptchaState,
   RootState,
   selectCaptchaResponse,
   selectConfigs,
   selectCurrentLanguage,
   selectCurrentPasswordEntropy,
   selectGeetestCaptchaSuccess,
   selectRecaptchaSuccess,
   selectSignUpError,
   selectSignUpLoading,
   selectSignUpRequireVerification,
   signUp,
} from 'modules';

interface ReduxProps {
   configs: Configs;
   requireVerification?: boolean;
   loading?: boolean;
   currentPasswordEntropy: number;
   captcha_response?: string | GeetestCaptchaResponse | GeetestCaptchaV4Response;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
   isLoading: boolean;
}

interface DispatchProps {
   signUp: typeof signUp;
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
   signUpError: boolean;
   i18n: LanguageState['lang'];
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps & OwnProps;

export const extractRefID = (props: RouterProps) => new URLSearchParams(props.location.search).get('refid');

class RegisterClass extends Component<Props> {
   public readonly state = {
      showModal: false,
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
      typingTimeout: 0,
      passwordErrorFirstSolved: false,
      passwordErrorSecondSolved: false,
      passwordErrorThirdSolved: false,
      passwordPopUp: false,
   };

   private myRef = createRef<HTMLInputElement>();
   private passwordWrapper = createRef<HTMLDivElement>();

   public componentDidMount() {
      setDocumentTitle('Register');
      const localReferralCode = localStorage.getItem('referralCode');
      const refId = this.extractRefID(this.props.location.search);
      const referralCode = refId || localReferralCode || '';
      this.setState({ refId: referralCode });
      if (refId && refId !== localReferralCode) {
         localStorage.setItem('referralCode', referralCode);
      }
      document.addEventListener('click', this.handleOutsideClick, false);
   }

   public componentDidUpdate(prev: Props) {
      const { email, password } = this.state;
      if (!prev.requireVerification && this.props.requireVerification)
         this.props.history.push('/email-verification', { email, password });
   }

   public componentWillUnmount() {
      document.removeEventListener('click', this.handleOutsideClick, false);
   }

   public renderCaptcha = () => {
      const { signUpError } = this.props;
      const { confirmationError, emailError } = this.state;
      const error = signUpError || confirmationError || emailError;
      return <Captcha error={error} />;
   };

   public render() {
      const {
         configs,
         isLoading,
         currentPasswordEntropy,
         captcha_response,
         reCaptchaSuccess,
         geetestCaptchaSuccess,
         intl: { formatMessage }
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
         passwordErrorFirstSolved,
         passwordErrorSecondSolved,
         passwordErrorThirdSolved,
         passwordPopUp
      } = this.state;
      return (
         <LayoutAuth
            descLinkTo="Already have an account?"
            linkTo="/login"
            linkToTxt="Login"
            title="Register"
            subTitle="Please fill in the data below with honest and accurate information."
         >
            <FormRegisterV2
               captchaType={configs.captcha_type}
               renderCaptcha={this.renderCaptcha()}
               captcha_response={captcha_response}
               isReCaptchaSuccess={reCaptchaSuccess}
               isGeetestCaptchaSuccess={geetestCaptchaSuccess}
               hasConfirmed={hasConfirmed}
               isLoading={isLoading}
               onRegister={this.handleSignUp}
               onLogin={this.handleSignIn}
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

               usernameLabel={`Username`}
               emailLabel={formatMessage({ id: 'page.header.signUp.email' })}
               passwordLabel={formatMessage({ id: 'page.header.signUp.password' })}
               confirmPasswordLabel={formatMessage({ id: 'page.header.signUp.confirmPassword' })}
               refIdLabel={`${formatMessage({ id: 'page.header.signUp.referalCode' })} (optional)`}

               emailError={emailError}
               passwordError={passwordError}
               confirmPasswordError={confirmationError}

               termsMessage={formatMessage({ id: 'page.header.signUp.terms' })}

               minPasswordEntropy={configs.password_min_entropy}
               currentPasswordEntropy={currentPasswordEntropy}
               passwordErrorFirstSolved={passwordErrorFirstSolved}
               passwordErrorSecondSolved={passwordErrorSecondSolved}
               passwordErrorThirdSolved={passwordErrorThirdSolved}
               passwordPopUp={passwordPopUp}

               translate={this.translate}
               ref={this.myRef}
               passwordWrapper={this.passwordWrapper}
            />
            {/* <FormRegister
               title="Register"
               subTitle="Create New Digiasset Account"
               labelSignIn={this.props.intl.formatMessage({ id: 'page.header.signIn' })}
               labelSignUp={this.props.intl.formatMessage({ id: 'page.header.signUp' })}
               emailLabel={this.props.intl.formatMessage({ id: 'page.header.signUp.email' })}
               passwordLabel={this.props.intl.formatMessage({ id: 'page.header.signUp.password' })}
               confirmPasswordLabel={this.props.intl.formatMessage({ id: 'page.header.signUp.confirmPassword' })}
               referalCodeLabel={`${this.props.intl.formatMessage({ id: 'page.header.signUp.referalCode' })} (Optional)`}
               termsMessage={this.props.intl.formatMessage({ id: 'page.header.signUp.terms' })}
               refId={refId}
               handleChangeRefId={this.handleChangeRefId}
               isLoading={loading}
               onSignIn={this.handleSignIn}
               onSignUp={this.handleSignUp}
               username={username}
               handleChangeUsername={this.handleChangeUsername}
               email={email}
               handleChangeEmail={this.handleChangeEmail}
               password={password}
               handleChangePassword={this.handleChangePassword}
               confirmPassword={confirmPassword}
               handleChangeConfirmPassword={this.handleChangeConfirmPassword}
               hasConfirmed={hasConfirmed}
               clickCheckBox={this.handleCheckboxClick}
               validateForm={this.handleValidateForm}
               emailError={emailError}
               passwordError={passwordError}
               confirmationError={confirmationError}
               confirmPasswordFocused={confirmPasswordFocused}
               refIdFocused={refIdFocused}
               usernameFocused={usernameFocused}
               emailFocused={emailFocused}
               passwordFocused={passwordFocused}
               handleFocusUsername={this.handleFocusUsername}
               handleFocusEmail={this.handleFocusEmail}
               handleFocusPassword={this.handleFocusPassword}
               handleFocusConfirmPassword={this.handleFocusConfirmPassword}
               handleFocusRefId={this.handleFocusRefId}
               captchaType={configs.captcha_type}
               renderCaptcha={this.renderCaptcha()}
               reCaptchaSuccess={reCaptchaSuccess}
               geetestCaptchaSuccess={geetestCaptchaSuccess}
               captcha_response={captcha_response}
               currentPasswordEntropy={currentPasswordEntropy}
               minPasswordEntropy={configs.password_min_entropy}
               passwordErrorFirstSolved={passwordErrorFirstSolved}
               passwordErrorSecondSolved={passwordErrorSecondSolved}
               passwordErrorThirdSolved={passwordErrorThirdSolved}
               passwordPopUp={passwordPopUp}
               myRef={this.myRef}
               passwordWrapper={this.passwordWrapper}
               translate={this.translate}
            /> */}
            <Modal
               show={this.state.showModal}
               header={this.renderModalHeader()}
               content={this.renderModalBody()}
               footer={this.renderModalFooter()}
            />
         </LayoutAuth>
      )
   }

   private translate = (key: string) => this.props.intl.formatMessage({ id: key });


   private handleCheckboxClick = (e: any) => {
      if (e) {
         e.preventDefault();
         this.setState({
            hasConfirmed: !this.state.hasConfirmed,
         });
      }
   };

   private handleChangeUsername = (value: string) => {
      this.setState({
         username: value.replace(/[^A-Za-z0-9]+/g, '').toLowerCase(),
      });
   };

   private handleResetEmail = () => this.setState({ email: '', emailFocused: true, emailError: 'Email must be filled' });
   private handleChangeEmail = (email: string) => {
      const isEmailValid = email.match(EMAIL_REGEX);
      this.setState({
         email,
         emailError: !email.length ? 'Email must be filled' : (email.length && !isEmailValid) ? this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL }) : ''
      });
   };

   private handleChangePassword = (value: string) => {
      const { passwordErrorFirstSolved, passwordErrorSecondSolved, passwordErrorThirdSolved } = this.state;

      if (passwordErrorFirstSolution(value) && !passwordErrorFirstSolved) {
         this.setState({
            passwordErrorFirstSolved: true,
         });
      } else if (!passwordErrorFirstSolution(value) && passwordErrorFirstSolved) {
         this.setState({
            passwordErrorFirstSolved: false,
         });
      }

      if (passwordErrorSecondSolution(value) && !passwordErrorSecondSolved) {
         this.setState({
            passwordErrorSecondSolved: true,
         });
      } else if (!passwordErrorSecondSolution(value) && passwordErrorSecondSolved) {
         this.setState({
            passwordErrorSecondSolved: false,
         });
      }

      if (passwordErrorThirdSolution(value) && !passwordErrorThirdSolved) {
         this.setState({
            passwordErrorThirdSolved: true,
         });
      } else if (!passwordErrorThirdSolution(value) && passwordErrorThirdSolved) {
         this.setState({
            passwordErrorThirdSolved: false,
         });
      }

      if (this.state.typingTimeout) {
         clearTimeout(this.state.typingTimeout);
      }

      this.setState({
         password: value,
         typingTimeout: setTimeout(() => {
            this.props.fetchCurrentPasswordEntropy({ password: value });
         }, 500),
      });
   };

   private handleChangeConfirmPassword = (value: string) => {
      this.setState({
         confirmPassword: value,
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
         passwordPopUp: !this.state.passwordPopUp,
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

   private handleSignIn = () => {
      this.props.history.push('/login');
   };

   private handleSignUp = () => {
      const { configs, i18n, captcha_response, signUp } = this.props;
      const {
         username,
         email,
         password,
         refId,
      } = this.state;
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

      switch (configs.captcha_type) {
         case 'recaptcha':
         case 'geetest':
            payload = { ...payload, captcha_response };

            signUp(payload);
            break;
         default:
            signUp(payload);
            break;
      }
      this.props.resetCaptchaState();
   };

   private renderModalHeader = () => (
      <div className="pg-exchange-modal-submit-header">
         {this.props.intl.formatMessage({ id: 'page.header.signUp.modal.header' })}
      </div>
   );

   private renderModalBody = () => (
      <div className="pg-exchange-modal-submit-body">
         <h2>
            {this.props.intl.formatMessage({ id: 'page.header.signUp.modal.body' })}
         </h2>
      </div>
   );

   private renderModalFooter = () => (
      <div className="pg-exchange-modal-submit-footer">
         <Button
            onClick={this.closeModal}
            type="button"
            text={this.props.intl.formatMessage({ id: 'page.header.signUp.modal.footer' })}
         />
      </div>
   );

   private closeModal = () => {
      this.setState({ showModal: false });
      this.props.history.push('/login');
   };

   private handleValidateForm = () => {
      const { email, password, confirmPassword } = this.state;
      const { intl: { formatMessage } } = this.props;
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
            confirmationError: formatMessage({ id: ERROR_PASSWORD_CONFIRMATION }),
            emailError: '',
            passwordError: '',
            hasConfirmed: false,
         });

         return;
      }
   };

   private extractRefID = (url: string) => new URLSearchParams(url).get('refid');
   private handleOutsideClick = (e: any) => {
      const wrapperElement = this.passwordWrapper.current;
      if (wrapperElement && !wrapperElement.contains(e.target))
         this.setState({ passwordPopUp: false });
   };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   configs: selectConfigs(state),
   i18n: selectCurrentLanguage(state),
   requireVerification: selectSignUpRequireVerification(state),
   signUpError: selectSignUpError(state),
   currentPasswordEntropy: selectCurrentPasswordEntropy(state),
   captcha_response: selectCaptchaResponse(state),
   reCaptchaSuccess: selectRecaptchaSuccess(state),
   geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
   isLoading: selectSignUpLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
   dispatch => ({
      signUp: credentials => dispatch(signUp(credentials)),
      fetchCurrentPasswordEntropy: payload => dispatch(entropyPasswordFetch(payload)),
      resetCaptchaState: () => dispatch(resetCaptchaState()),
   });

export const Register = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(RegisterClass) as React.ComponentClass;
