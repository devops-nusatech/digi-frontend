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

import { captchaType, captchaLogin } from 'api';
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
         pathname: string;
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
         push(location?.pathname ? location?.pathname : '/wallets');
      }
   }, [isLoggedIn, push, location?.pathname]);

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

   useEffect(() => {
      if (
         !email ||
         !password ||
         (captchaType() !== 'none' && !captcha_response)
      ) {
         dispatch(loginRequire2FA({ require2fa: false }));
      }
   }, [captcha_response, dispatch, email, password]);

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
      push('/forgot_password');
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
