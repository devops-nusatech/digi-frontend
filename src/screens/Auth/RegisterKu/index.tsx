import React, {
   FunctionComponent,
   useEffect,
   useRef,
   useState
} from 'react';
import { History } from 'history'
import { withRouter } from 'react-router';
import { compose } from 'redux';
import {
   MapDispatchToPropsFunction,
   MapStateToProps,
   connect
} from 'react-redux';
import { injectIntl } from 'react-intl';
import {
   Configs,
   GeetestCaptchaResponse,
   LanguageState,
   RootState,
   SignUpFetch,
   entropyPasswordFetch,
   resetCaptchaState,
   selectCaptchaResponse,
   selectConfigs,
   selectCurrentPasswordEntropy,
   selectGeetestCaptchaSuccess,
   selectRecaptchaSuccess,
   selectSignUpLoading,
   selectSignUpRequireVerification,
   signUp
} from 'modules';
import { IntlProps } from 'index';
import {
   EMAIL_REGEX,
   ERROR_INVALID_EMAIL,
   ERROR_INVALID_PASSWORD,
   ERROR_PASSWORD_CONFIRMATION,
   PASSWORD_REGEX,
   USERNAME_REGEX,
   passwordErrorFirstSolution,
   passwordErrorSecondSolution,
   passwordErrorThirdSolution,
   setDocumentTitle
} from 'helpers';
import { Captcha, FormRegisterKu, LayoutAuth } from 'components';
import { isUsernameEnabled } from 'api';

type RegisterState = {
   username: string;
   email: string;
   password: string;
   confirmPassword: string;
   refId: string;
   hasConfirmed: boolean;

   emailError: string;
   passwordError: string;
   confirmationError: string;

   usernameFocused: boolean;
   emailFocused: boolean;
   passwordFocused: boolean;
   confirmPasswordFocused: boolean;
   refIdFocused: boolean;

   typingTimeout: number | NodeJS.Timeout;
   passwordErrorFirstSolved: boolean;
   passwordErrorSecondSolved: boolean;
   passwordErrorThirdSolved: boolean;
   passwordPopUp: boolean;
}

type OwnProps = {
   signUpError: boolean;
   i18n: LanguageState['lang'];
}

type ReduxProps = {
   configs: Configs;
   requireVerification?: boolean;
   loading?: boolean;
   currentPasswordEntropy: number;
   captcha_response?: string | GeetestCaptchaResponse;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
}

interface RouterProps {
   location: {
      search: string;
   };
   history: History;
}

type DispatchProps = {
   register: typeof signUp;
   fetchCurrentPasswordEntropy: typeof entropyPasswordFetch;
   resetCaptchaState: typeof resetCaptchaState;
}

type Props = OwnProps & ReduxProps & RouterProps & DispatchProps & IntlProps;

const RegisterKuFC = ({
   configs,
   signUpError,
   i18n,
   requireVerification,
   loading,
   currentPasswordEntropy,
   captcha_response,
   reCaptchaSuccess,
   geetestCaptchaSuccess,
   location,
   history: { push },
   register,
   fetchCurrentPasswordEntropy,
   resetCaptchaState,
   intl
}: Props) => {
   const passwordRef = useRef<HTMLInputElement>(null);
   const passwordWrapperRef = useRef<HTMLDivElement>(null);

   const [state, setState] = useState<RegisterState>({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      refId: '',
      hasConfirmed: false,

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
   });

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

      typingTimeout,
      passwordErrorFirstSolved,
      passwordErrorSecondSolved,
      passwordErrorThirdSolved,
      passwordPopUp,
   } = state;

   useEffect(() => {
      setDocumentTitle('Register');
      const localReferralCode = localStorage.getItem('referralCode');
      const refid = extractRefId(location.search);
      const referralCode = refid || localReferralCode || '';
      handleChangeRefid(referralCode);
      if (refid && refid !== localReferralCode) {
         localStorage.setItem('referralCode', referralCode);
      }
      document.addEventListener('click', handleOutsideClick, false);
      return () => document.removeEventListener('click', handleOutsideClick, false);
   }, []);

   useEffect(() => {
      if (requireVerification) {
         push('/email-verification', { email });
      }
   }, [requireVerification]);

   const extractRefId = (url: string) => new URLSearchParams(url).get('refid');
   const handleChangeRefid = (refId: string) => setState({ ...state, refId });

   const handleResetEmail = () => setState({ ...state, email: '' });

   const handleChangeUsername = (username: string) => setState({
      ...state,
      username: username.replace(/[^A-Za-z0-9]+/g, '').toLowerCase()
   });
   const handleChangeEmail = (email: string) => setState({ ...state, email });
   const handleChangePassword = (password: string) => {
      if (passwordErrorFirstSolution(password) && !passwordErrorFirstSolved) {
         setState({
            ...state,
            passwordErrorFirstSolved: true
         });
      } else if (!passwordErrorFirstSolution(password) && passwordErrorFirstSolved) {
         setState({
            ...state,
            passwordErrorFirstSolved: false
         });
      }

      if (passwordErrorSecondSolution(password) && !passwordErrorSecondSolved) {
         setState({
            ...state,
            passwordErrorSecondSolved: true
         });
      } else if (!passwordErrorSecondSolution(password) && passwordErrorSecondSolved) {
         setState({
            ...state,
            passwordErrorSecondSolved: false
         });
      }

      if (passwordErrorThirdSolution(password) && !passwordErrorThirdSolved) {
         setState({
            ...state,
            passwordErrorThirdSolved: true
         });
      } else if (!passwordErrorThirdSolution(password) && passwordErrorThirdSolved) {
         setState({
            ...state,
            passwordErrorThirdSolved: false
         });
      }

      if (typingTimeout) clearTimeout(Number(typingTimeout));

      const handlesetTimeout = () => setTimeout(() => fetchCurrentPasswordEntropy({ password }), 500);
      setState({
         ...state,
         password,
         typingTimeout: handlesetTimeout()
      })
   }
   const handleChangeConfirmPassword = (confirmPassword: string) => setState({
      ...state,
      confirmPassword
   });
   const handleChangeRefId = (refId: string) => setState({ ...state, refId });

   const handleFocusUsername = () => setState({
      ...state,
      usernameFocused: !usernameFocused
   });
   const handleFocusEmail = () => setState({
      ...state,
      emailFocused: !emailFocused
   });
   const handleFocusPassword = () => setState({
      ...state,
      passwordFocused: !passwordFocused,
      passwordPopUp: !passwordPopUp,
   });
   const handleFocusConfirmPassword = () => setState({
      ...state,
      confirmPasswordFocused: !confirmPasswordFocused,
   });
   const handleFocusRefId = () => setState({
      ...state,
      refIdFocused: !refIdFocused,
   });

   const handleLogin = () => push('/login');
   const handleRegister = () => {
      const payload: SignUpFetch['payload'] = {
         email,
         password,
         data: JSON.stringify({
            language: i18n,
         }),
         ...(isUsernameEnabled() && { username }),
         ...(refId && { refid: refId }),
         ...(configs.captcha_type !== 'none' && { captcha_response }),
      }
      register(payload);
      resetCaptchaState();
   }

   const handleValidateForm = () => {
      const isEmailValid = email.match(EMAIL_REGEX);
      const isPasswordValid = password.match(PASSWORD_REGEX);
      const isConfirmPasswordValid = password === confirmPassword;

      if (!isEmailValid && !isPasswordValid) {
         setState({
            ...state,
            confirmationError: '',
            emailError: translate(ERROR_INVALID_EMAIL),
            passwordError: translate(ERROR_INVALID_PASSWORD),
            hasConfirmed: false,
         });
         return;
      }

      if (!isEmailValid) {
         setState({
            ...state,
            confirmationError: '',
            emailError: '',
            passwordError: translate(ERROR_INVALID_PASSWORD),
            hasConfirmed: false,
         });
         return;
      }

      if (!isConfirmPasswordValid) {
         setState({
            ...state,
            confirmationError: translate(ERROR_PASSWORD_CONFIRMATION),
            emailError: '',
            passwordError: '',
            hasConfirmed: false,
         });
         return;
      }
   }

   const handleOutsideClick = e => {
      const wrapperElement = passwordWrapperRef.current;
      if (wrapperElement && !wrapperElement.contains(e.target)) {
         setState({ ...state, passwordPopUp: false });
      }
   };

   const handleCheckboxClick = () => setState({
      ...state,
      hasConfirmed: !hasConfirmed,
      confirmationError: '',
      emailError: '',
      passwordError: '',
   });

   const translate = (id: string) => intl.formatMessage({ id });

   const renderCaptcha = () => {
      const error = signUpError || confirmationError || emailError;
      return <Captcha error={error} />;
   }

   return (
      <LayoutAuth
         descLinkTo="Already have an account?"
         linkTo="/login"
         linkToTxt="Login"
         title="Register"
         subTitle="Please fill in the data below with honest and accurate information."
      >
         <FormRegisterKu
            captchaType={configs.captcha_type}
            renderCaptcha={renderCaptcha()}
            captcha_response={captcha_response}
            isReCaptchaSuccess={reCaptchaSuccess}
            isGeetestCaptchaSuccess={geetestCaptchaSuccess}
            hasConfirmed={hasConfirmed}
            isLoading={loading}
            onRegister={handleRegister}
            onLogin={handleLogin}
            validateForm={handleValidateForm}
            clickCheckBox={handleCheckboxClick}

            username={username}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            refid={refId}

            handleChangeUsername={handleChangeUsername}
            handleChangeEmail={handleChangeEmail}
            handleChangePassword={handleChangePassword}
            handleChangeConfirmPassword={handleChangeConfirmPassword}
            handleChangeRefId={handleChangeRefId}

            focusUsername={usernameFocused}
            focusEmail={emailFocused}
            focusPassword={passwordFocused}
            focusConfirmPassword={confirmPasswordFocused}
            focusRefId={refIdFocused}

            handleFocusUsername={handleFocusUsername}
            handleFocusEmail={handleFocusEmail}
            handleFocusPassword={handleFocusPassword}
            handleFocusConfirmPassword={handleFocusConfirmPassword}
            handleFocusRefId={handleFocusRefId}

            handleResetEmail={handleResetEmail}

            usernameLabel={'username'}
            emailLabel={translate('page.header.signUp.email')}
            passwordLabel={translate('page.header.signUp.password')}
            confirmPasswordLabel={translate('page.header.signUp.confirmPassword')}
            refIdLabel={translate('page.header.signUp.referalCode')}

            emailError={emailError}
            passwordError={passwordError}
            confirmPasswordError={confirmPassword}

            USERNAME_REGEXP={USERNAME_REGEX}
            EMAIL_REGEXP={EMAIL_REGEX}
            PASSWORD_REGEXP={PASSWORD_REGEX}

            termsMessage={translate('page.header.signUp.terms')}

            minPasswordEntropy={configs.password_min_entropy}
            currentPasswordEntropy={currentPasswordEntropy}
            passwordErrorFirstSolved={passwordErrorFirstSolved}
            passwordErrorSecondSolved={passwordErrorSecondSolved}
            passwordErrorThirdSolved={passwordErrorThirdSolved}
            passwordPopUp={passwordPopUp}

            translate={translate}
            ref={passwordRef}
            passwordWrapper={passwordWrapperRef}
            isUsernameEnabled={isUsernameEnabled()}
         />
      </LayoutAuth>
   )
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   configs: selectConfigs(state),
   requireVerification: selectSignUpRequireVerification(state),
   loading: selectSignUpLoading(state),
   currentPasswordEntropy: selectCurrentPasswordEntropy(state),
   captcha_response: selectCaptchaResponse(state),
   reCaptchaSuccess: selectRecaptchaSuccess(state),
   geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   register: credentials => dispatch(signUp(credentials)),
   fetchCurrentPasswordEntropy: payload => dispatch(entropyPasswordFetch(payload)),
   resetCaptchaState: () => dispatch(resetCaptchaState())
});

export const RegisterKu = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(RegisterKuFC) as FunctionComponent;
