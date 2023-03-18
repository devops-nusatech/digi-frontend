// import React, { Component, ComponentClass } from 'react';
// import { compose } from 'redux';
// import {
//    connect,
//    MapDispatchToPropsFunction,
//    MapStateToProps,
// } from 'react-redux';
// import { injectIntl } from 'react-intl';
// import { RouterProps } from 'react-router';
// import { withRouter } from 'react-router-dom';
// import { IntlProps } from 'index';
// import { captchaLogin } from 'api';
// import {
//    EMAIL_REGEX,
//    ERROR_EMPTY_PASSWORD,
//    ERROR_INVALID_EMAIL,
//    PASSWORD_REGEX,
//    setDocumentTitle,
// } from 'helpers';
// import {
//    Configs,
//    GeetestCaptchaResponse,
//    resetCaptchaState,
//    RootState,
//    selectAlertState,
//    selectCaptchaDataObjectLoading,
//    selectCaptchaResponse,
//    selectConfigs,
//    selectGeetestCaptchaSuccess,
//    selectRecaptchaSuccess,
//    selectLoginError,
//    selectLoginLoading,
//    selectLoginRequire2FA,
//    selectregisterRequireVerification,
//    selectUserFetching,
//    selectUserLoggedIn,
//    login,
//    loginError,
//    loginRequire2FA,
//    registerRequireVerification,
// } from 'modules';
// import { CommonError } from 'modules/types';
// import { Captcha, FormLogin, TFA } from 'components';

// interface ReduxProps {
//    error?: CommonError;
//    isLoggedIn: boolean;
//    loading?: boolean;
//    isLoading: boolean;
//    require2FA?: boolean;
//    requireEmailVerification?: boolean;
//    configs: Configs;
//    captcha_response?: string | GeetestCaptchaResponse;
//    reCaptchaSuccess: boolean;
//    geetestCaptchaSuccess: boolean;
//    captchaLoading: boolean;
// }

// interface DispatchProps {
//    login: typeof login;
//    loginError: typeof loginError;
//    loginRequire2FA: typeof loginRequire2FA;
//    resetCaptchaState: typeof resetCaptchaState;
//    registerRequireVerification: typeof registerRequireVerification;
// }

// interface LoginState {
//    email: string;
//    emailError: string;
//    emailFocused: boolean;
//    password: string;
//    passwordError: string;
//    passwordFocused: boolean;
//    otpCode: string;
//    error2fa: string;
//    codeFocused: boolean;
// }

// interface OwnProps {
//    location: {
//       state: {
//          email: string;
//          password: string;
//       };
//    };
// }

// type Props = ReduxProps & DispatchProps & RouterProps & OwnProps & IntlProps;

// class LoginClass extends Component<Props, LoginState> {
//    public constructor(props) {
//       super(props);
//       this.geetestCaptchaRef = React.createRef<HTMLButtonElement>();
//    }

//    private geetestCaptchaRef;

//    public state = {
//       email:
//          (this.props.location.state && this.props.location.state.email) || '',
//       password:
//          (this.props.location.state && this.props.location.state.password) ||
//          '',
//       emailError: '',
//       emailFocused: false,
//       passwordError: '',
//       passwordFocused: false,
//       otpCode: '',
//       error2fa: '',
//       codeFocused: false,
//    };

//    public componentDidMount() {
//       setDocumentTitle('Login');
//       this.props.loginError({ code: 0, message: [''] });
//       this.props.registerRequireVerification({ requireVerification: false });
//    }

//    public componentDidUpdate(
//       prevProps: Readonly<Props>,
//       prevState: Readonly<LoginState>,
//       snapshot?: any
//    ) {
//       const { otpCode } = this.state;
//       if (!prevState.otpCode && otpCode.length === 6) {
//          this.handle2FALogin();
//       }
//    }

//    public componentWillReceiveProps(nextProps: Props) {
//       const { email } = this.state;
//       const {
//          isLoggedIn,
//          resetCaptchaState,
//          history: { push },
//       } = this.props;

//       if (!isLoggedIn && nextProps.isLoggedIn) {
//          resetCaptchaState();
//          push('/wallets', { email });
//       }

//       if (nextProps.requireEmailVerification) {
//          push('/email-verification', { email });
//       }

//       // if (captcha_type !== 'none' && captchaLogin() && error && !require2FA) {
//       //    resetCaptchaState();
//       // }
//    }

//    public componentWillUnmount() {
//       this.props.resetCaptchaState();
//    }

//    public renderCaptcha = () => (
//       <Captcha geetestCaptchaRef={this.geetestCaptchaRef} />
//    );

//    public render() {
//       const { require2FA } = this.props;
//       return require2FA ? this.render2FA() : this.renderLoginForm();
//    }

//    private render2FA = () => {
//       const { isLoading } = this.props;
//       const { otpCode, error2fa, codeFocused } = this.state;
//       const translate = (id: string) => this.props.intl.formatMessage({ id });

//       return (
//          <TFA
//             isLoading={isLoading}
//             onSubmit={this.handle2FALogin}
//             title={translate('page.auth.2fa.title')}
//             subTitle={translate('page.auth.2fa.subtitle')}
//             buttonLabel={translate('page.body.kyc.next')}
//             modalTitle={translate('page.auth.2fa.modal.title')}
//             modalButton={translate('page.auth.2fa.modal.button')}
//             // message={this.props.intl.formatMessage({ id: 'page.password2fa.message' })}
//             codeFocused={codeFocused}
//             otpCode={otpCode}
//             error={error2fa}
//             handleOtpCodeChange={this.handleChangeOtpCode}
//             handleChangeFocusField={this.handle2faFocus}
//             handleClose2fa={this.handleClose}
//          />
//       );
//    };

//    private renderLoginForm = () => {
//       const {
//          configs,
//          isLoading,
//          captcha_response,
//          reCaptchaSuccess,
//          geetestCaptchaSuccess,
//       } = this.props;

//       const {
//          email,
//          emailError,
//          emailFocused,
//          password,
//          passwordError,
//          passwordFocused,
//       } = this.state;
//       const {
//          intl: { formatMessage },
//          captchaLoading,
//       } = this.props;

//       return (
//          <FormLogin
//             geetestCaptchaRef={this.geetestCaptchaRef}
//             title="Login to Digiasset"
//             subTitle="Please ensure you are visiting the correct url."
//             email={email}
//             emailError={emailError}
//             emailFocused={emailFocused}
//             emailPlaceholder={formatMessage({ id: 'page.header.login.email' })}
//             password={password}
//             passwordError={passwordError}
//             passwordFocused={passwordFocused}
//             passwordPlaceholder={formatMessage({
//                id: 'page.header.login.password',
//             })}
//             labelLogin={formatMessage({ id: 'page.header.login' })}
//             labelregister={formatMessage({ id: 'page.header.register' })}
//             emailLabel={formatMessage({ id: 'page.header.login.email' })}
//             passwordLabel={formatMessage({ id: 'page.header.login.password' })}
//             receiveConfirmationLabel={formatMessage({
//                id: 'page.header.login.receiveConfirmation',
//             })}
//             forgotPasswordLabel={formatMessage({
//                id: 'page.header.login.forgotPassword',
//             })}
//             isLoading={isLoading || captchaLoading}
//             onForgotPassword={this.forgotPassword}
//             onregister={this.handleregister}
//             onLogin={this.handleLogin}
//             handleChangeFocusField={this.handleFieldFocus}
//             isFormValid={this.validateForm}
//             refreshError={this.refreshError}
//             changeEmail={this.handleChangeEmailValue}
//             resetEmail={this.resetEmail}
//             changePassword={this.handleChangePasswordValue}
//             captchaType={configs.captcha_type}
//             renderCaptcha={this.renderCaptcha()}
//             reCaptchaSuccess={reCaptchaSuccess}
//             geetestCaptchaSuccess={geetestCaptchaSuccess}
//             captcha_response={captcha_response}
//          />
//       );
//    };

//    private handle2FALogin = () => {
//       const { email, password, otpCode } = this.state;
//       const {
//          configs: { captcha_type },
//          captcha_response,
//          login,
//       } = this.props;

//       if (!otpCode) {
//          this.setState({
//             error2fa: 'Please enter 2fa code',
//          });
//       } else if (captcha_type !== 'none' && captchaLogin()) {
//          login({ email, password, captcha_response, otp_code: otpCode });
//       } else {
//          login({ email, password, otp_code: otpCode });
//       }
//    };

//    private handleChangeOtpCode = (value: string) =>
//       this.setState({ error2fa: '', otpCode: value });

//    private handle2faFocus = () =>
//       this.setState(prev => ({ codeFocused: !prev.codeFocused }));

//    private handleClose = () =>
//       this.props.loginRequire2FA({ require2fa: false });

//    private forgotPassword = () => this.props.history.push('/forgot_password');

//    private handleregister = () => this.props.history.push('/register');

//    private handleLogin = () => {
//       const { email, password } = this.state;
//       const {
//          configs: { captcha_type },
//          captcha_response,
//       } = this.props;

//       if (captcha_type !== 'none' && captchaLogin()) {
//          this.props.login({ email, password, captcha_response });
//       } else {
//          this.props.login({ email, password });
//       }
//    };

//    private handleFieldFocus = (field: string) => {
//       switch (field) {
//          case 'email':
//             this.setState(prev => ({
//                emailFocused: !prev.emailFocused,
//             }));
//             break;
//          case 'password':
//             this.setState(prev => ({
//                passwordFocused: !prev.passwordFocused,
//             }));
//             break;
//          default:
//             break;
//       }
//    };

//    private validateForm = () => {
//       const { email, password } = this.state;
//       const isEmailValid = email.match(EMAIL_REGEX);

//       if (!isEmailValid) {
//          this.setState({
//             emailError: this.props.intl.formatMessage({
//                id: ERROR_INVALID_EMAIL,
//             }),
//             passwordError: '',
//          });
//          return;
//       }
//       if (!password) {
//          this.setState({
//             emailError: '',
//             passwordError: this.props.intl.formatMessage({
//                id: ERROR_EMPTY_PASSWORD,
//             }),
//          });
//       }
//    };

//    private refreshError = () =>
//       this.setState({ emailError: '', passwordError: '' });

//    private resetEmail = () =>
//       this.setState({
//          email: '',
//          emailFocused: true,
//          emailError: 'Email must be filled',
//       });

//    private handleChangeEmailValue = (email: string) => {
//       const isEmailValid = email.match(EMAIL_REGEX);
//       this.setState({
//          email,
//          emailError: !email.length
//             ? 'Email must be filled'
//             : email.length && !isEmailValid
//             ? this.props.intl.formatMessage({ id: ERROR_INVALID_EMAIL })
//             : '',
//       });
//    };

//    private handleChangePasswordValue = (password: string) => {
//       const isPasswordValid = password.match(PASSWORD_REGEX);
//       this.setState({
//          password,
//          passwordError: !password.length
//             ? 'Password must be filled'
//             : !isPasswordValid
//             ? this.props.intl.formatMessage({ id: ERROR_EMPTY_PASSWORD })
//             : '',
//       });
//    };
// }

// const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
//    alert: selectAlertState(state),
//    error: selectLoginError(state),
//    isLoggedIn: selectUserLoggedIn(state),
//    loading: selectUserFetching(state),
//    isLoading: selectLoginLoading(state),
//    require2FA: selectLoginRequire2FA(state),
//    requireEmailVerification: selectregisterRequireVerification(state),
//    configs: selectConfigs(state),
//    captcha_response: selectCaptchaResponse(state),
//    reCaptchaSuccess: selectRecaptchaSuccess(state),
//    geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
//    captchaLoading: selectCaptchaDataObjectLoading(state),
// });

// const mapDispatchToProps: MapDispatchToPropsFunction<
//    DispatchProps,
//    {}
// > = dispatch => ({
//    login: data => dispatch(login(data)),
//    loginError: error => dispatch(loginError(error)),
//    loginRequire2FA: payload => dispatch(loginRequire2FA(payload)),
//    resetCaptchaState: () => dispatch(resetCaptchaState()),
//    registerRequireVerification: data =>
//       dispatch(registerRequireVerification(data)),
// });

// export const Login = compose(
//    injectIntl,
//    withRouter,
//    connect(mapStateToProps, mapDispatchToProps)
// )(LoginClass) as ComponentClass;

import React, {
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Transition } from '@headlessui/react';

import { captchaType, captchaLogin, kycSteps } from 'api';
import { Captcha, FormLogin, TFA, LayoutAuth } from 'components';
import {
   EMAIL_REGEX,
   ERROR_EMPTY_PASSWORD,
   ERROR_INVALID_EMAIL,
   PASSWORD_REGEX,
   setDocumentTitle,
} from 'helpers';
import { useReduxSelector } from 'hooks';
import {
   selectLoginRequire2FA,
   selectUserLoggedIn,
   login,
   loginError,
   loginRequire2FA,
   registerRequireVerification,
   selectLoginError,
   selectRecaptchaSuccess,
   selectGeetestCaptchaSuccess,
   selectCaptchaResponse,
   resetCaptchaState,
   selectLoginLoading,
   selectCaptchaDataObjectLoading,
} from 'modules';

interface OwnProps {
   location: {
      state: {
         email: string;
         password: string;
      };
   };
}

export const Login = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const { formatMessage } = useIntl();

   const location = history.location.state as OwnProps['location']['state'];
   const push = history.push;

   const [email, setEmail] = useState(location?.email ? location?.email : '');
   const [emailError, setEmailError] = useState('');
   const [emailFocused, setEmailFocused] = useState(false);
   const [password, setPassword] = useState(
      location?.password ? location?.password : ''
   );
   const [passwordError, setPasswordError] = useState('');
   const [passwordFocused, setPasswordFocused] = useState(false);
   const [otpCode, setOtpCode] = useState('');

   const isLoggedIn = useReduxSelector(selectUserLoggedIn);
   const isLoading = useReduxSelector(selectLoginLoading);
   const require2FA = useReduxSelector(selectLoginRequire2FA);
   const requireEmailVerification = useReduxSelector(
      x => x.user.auth.requireVerification
   );
   const errorLogin = useReduxSelector(selectLoginError);
   const reCaptchaSuccess = useReduxSelector(selectRecaptchaSuccess);
   const geetestCaptchaSuccess = useReduxSelector(selectGeetestCaptchaSuccess);
   const captcha_response = useReduxSelector(selectCaptchaResponse);
   const captchaLoading = useReduxSelector(selectCaptchaDataObjectLoading);

   const geetestCaptchaRef = useRef<HTMLButtonElement>(null);

   useEffect(() => {
      console.log('window.env', kycSteps());
   }, []);

   useEffect(() => {
      setDocumentTitle('Login');
      dispatch(loginError({ code: 0, message: [''] }));
      dispatch(registerRequireVerification({ requireVerification: false }));

      return () => {
         dispatch(resetCaptchaState());
      };
   }, [dispatch]);

   useEffect(() => {
      if (requireEmailVerification) {
         push('/email-verification', { email });
      }
   }, [requireEmailVerification, push, email]);

   useEffect(() => {
      if (isLoggedIn) {
         handleReset2Fa();
         push('/wallets');
      }
   }, [isLoggedIn, push]);

   useEffect(() => {
      if (
         captchaType() !== 'none' &&
         captchaLogin() &&
         errorLogin &&
         !require2FA
      ) {
         dispatch(resetCaptchaState());
      }
   }, [errorLogin, captchaType(), captchaLogin()]);

   const translate = useCallback(
      (id: string) => formatMessage({ id }),
      [formatMessage]
   );

   const refreshError = useCallback(() => {
      setEmailError('');
      setPasswordError('');
   }, []);

   const handleChangeOtpCode = useCallback((value: string) => {
      setOtpCode(value);
   }, []);

   const handleLogin = useCallback(() => {
      dispatch(
         login({
            email,
            password,
            ...(captchaType() !== 'none' &&
               captchaLogin() && { captcha_response }),
         })
      );
   }, [dispatch, email, password, captcha_response, captchaType()]);

   const handle2FALogin = useCallback(() => {
      if (otpCode) {
         dispatch(
            login({
               email,
               password,
               otp_code: otpCode,
               ...(captchaType() !== 'none' &&
                  captchaLogin() && { captcha_response }),
            })
         );
      }
   }, [dispatch, otpCode, email, password, captchaType(), captchaLogin()]);

   const handleRegister = useCallback(() => {
      push('/register');
   }, [push]);

   const forgotPassword = useCallback(() => {
      push('/forgot-password');
   }, [push]);

   const handleFieldFocus = useCallback(
      (field: string) => {
         switch (field) {
            case 'email':
               setEmailFocused(!emailFocused);
               break;
            case 'password':
               setPasswordFocused(!passwordFocused);
               break;
            default:
               break;
         }
      },
      [emailFocused, passwordFocused]
   );

   const validateForm = useCallback(() => {
      const isEmailValid = email.match(EMAIL_REGEX);

      if (!isEmailValid) {
         setEmailError(translate(ERROR_INVALID_EMAIL));
         setPasswordError('');

         return;
      }
      if (!password) {
         setEmailError('');
         setPasswordError(translate(ERROR_EMPTY_PASSWORD));
      }
   }, [email, password, translate]);

   const handleChangeEmailValue = useCallback(
      (email: string) => {
         const isEmailValid = email.match(EMAIL_REGEX);
         setEmail(email);
         setEmailError(
            !email.length
               ? 'Email must be filled'
               : email.length && !isEmailValid
               ? translate(ERROR_INVALID_EMAIL)
               : ''
         );
      },
      [translate]
   );

   const handleChangePasswordValue = useCallback(
      (password: string) => {
         const isPasswordValid = password.match(PASSWORD_REGEX);
         setPassword(password);
         setPasswordError(
            !password.length
               ? 'Password must be filled'
               : !isPasswordValid
               ? translate(ERROR_EMPTY_PASSWORD)
               : ''
         );
      },
      [translate]
   );

   const resetEmail = useCallback(() => {
      setEmail('');
      setEmailFocused(true);
      setEmailError('Email must be filled');
   }, []);

   const handleReset2Fa = useCallback(() => {
      setOtpCode('');
      dispatch(loginRequire2FA({ require2fa: false }));
   }, [dispatch]);

   const renderCaptcha = useMemo(
      () => <Captcha geetestCaptchaRef={geetestCaptchaRef} />,
      []
   );

   return (
      <LayoutAuth
         linkTo="/register"
         linkToTxt="Register for free"
         descLinkTo="Don’t have an account?"
         title={
            require2FA
               ? translate('page.auth.2fa.title') || '2FA verification'
               : 'Login to Digiasset'
         }
         subTitle={
            require2FA
               ? translate('page.auth.2fa.subtitle') ||
                 'Please enter 6 Digits authentication code from your App'
               : ''
         }
         withDisplayLink={!require2FA}>
         <Transition
            show={require2FA}
            enter="ease-out duration-1000"
            enterFrom="scale-50 -translate-x-96"
            leave="ease-in duration-700"
            leaveFrom="scale-100 translate-x-0">
            <TFA
               isLoading={isLoading || captchaLoading}
               onSubmit={handle2FALogin}
               otpCode={otpCode}
               handleOtpCodeChange={handleChangeOtpCode}
               buttonLabel={translate('page.body.kyc.next')}
               modalTitle={translate('page.auth.2fa.modal.title')}
               modalButton={translate('page.auth.2fa.modal.button')}
            />
         </Transition>
         {!require2FA && (
            <FormLogin
               geetestCaptchaRef={geetestCaptchaRef}
               email={email}
               emailError={emailError}
               emailFocused={emailFocused}
               emailPlaceholder={translate('page.header.login.email')}
               password={password}
               passwordError={passwordError}
               passwordFocused={passwordFocused}
               passwordPlaceholder={translate('page.header.login.password')}
               labelLogin={translate('page.header.login')}
               labelRegister={translate('page.header.register')}
               emailLabel={translate('page.header.login.email')}
               passwordLabel={translate('page.header.login.password')}
               receiveConfirmationLabel={translate(
                  'page.header.login.receiveConfirmation'
               )}
               forgotPasswordLabel={translate(
                  'page.header.login.forgotPassword'
               )}
               isLoading={isLoading || captchaLoading}
               onForgotPassword={forgotPassword}
               onRegister={handleRegister}
               onLogin={handleLogin}
               handleChangeFocusField={handleFieldFocus}
               isFormValid={validateForm}
               refreshError={refreshError}
               changeEmail={handleChangeEmailValue}
               changePassword={handleChangePasswordValue}
               renderCaptcha={renderCaptcha}
               reCaptchaSuccess={reCaptchaSuccess}
               geetestCaptchaSuccess={geetestCaptchaSuccess}
               captcha_response={captcha_response}
               resetEmail={resetEmail}
               captchaType={captchaType()}
            />
         )}
      </LayoutAuth>
   );
};
