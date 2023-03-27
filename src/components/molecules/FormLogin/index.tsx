// import React, {
//    KeyboardEvent,
//    useCallback,
//    useEffect,
//    useState,
//    memo,
//    RefObject,
// } from 'react';
// import { useSelector } from 'react-redux';
// import { Button, LayoutAuth, InputGroup } from 'components';
// // import { captchaLogin } from 'api';
// import { EMAIL_REGEX, PASSWORD_REGEX, removeClass } from 'helpers';
// import { GeetestCaptchaResponse } from 'modules';
// import { selectMobileDeviceState } from 'modules/public/globalSettings';
// import { Link } from 'react-router-dom';

// import PhoneInput from 'react-phone-input-2';

// export interface LoginProps {
//    geetestCaptchaRef: RefObject<HTMLButtonElement>;
//    labelLogin?: string;
//    labelregister?: string;
//    emailLabel?: string;
//    passwordLabel?: string;
//    receiveConfirmationLabel?: string;
//    forgotPasswordLabel?: string;
//    isLoading?: boolean;
//    title: string;
//    subTitle?: string;
//    onForgotPassword: (email?: string) => void;
//    onConfirmationResend?: (email?: string) => void;
//    onregister: () => void;
//    onLogin: () => void;
//    className?: string;
//    image?: string;
//    email: string;
//    emailError: string;
//    password: string;
//    passwordError: string;
//    emailFocused: boolean;
//    emailPlaceholder: string;
//    passwordFocused: boolean;
//    passwordPlaceholder: string;
//    isFormValid: () => void;
//    refreshError: () => void;
//    handleChangeFocusField: (value: string) => void;
//    changePassword: (value: string) => void;
//    changeEmail: (value: string) => void;
//    resetEmail?: () => void;
//    captchaType?: 'recaptcha' | 'geetest' | 'none';
//    renderCaptcha?: JSX.Element | null;
//    reCaptchaSuccess?: boolean;
//    geetestCaptchaSuccess?: boolean;
//    captcha_response?: string | GeetestCaptchaResponse;
// }

// export const FormLogin = memo(
//    ({
//       geetestCaptchaRef,
//       title,
//       subTitle,
//       email,
//       emailError,
//       emailPlaceholder,
//       password,
//       passwordError,
//       passwordPlaceholder,
//       isLoading,
//       onregister,
//       image,
//       labelLogin,
//       labelregister,
//       emailLabel,
//       passwordLabel,
//       emailFocused,
//       passwordFocused,
//       onForgotPassword,
//       forgotPasswordLabel,
//       refreshError,
//       onLogin,
//       isFormValid,
//       handleChangeFocusField,
//       changePassword,
//       changeEmail,
//       resetEmail,
//       captchaType,
//       geetestCaptchaSuccess,
//       reCaptchaSuccess,
//       renderCaptcha,
//       captcha_response,
//    }: LoginProps) => {
//       // const [loginBy, setLoginBy] = useState<boolean>(true);
//       const [country, setCountry] = useState<string>('id');

//       useEffect(() => {
//          removeClass('form-control');
//          // removeElement('special-label');
//       });

//       const isMobileDevice = useSelector(selectMobileDeviceState);

//       const isValidForm = useCallback(() => {
//          const isEmailValid = email.match(EMAIL_REGEX);

//          return email && isEmailValid && password;
//       }, [email, password]);

//       const handleChangeEmail = useCallback(
//          (value: string) => {
//             changeEmail(value);
//          },
//          [changeEmail]
//       );

//       const handleChangePassword = useCallback(
//          (value: string) => {
//             changePassword(value);
//          },
//          [changePassword]
//       );

//       const handleFieldFocus = useCallback(
//          (field: string) => {
//             handleChangeFocusField(field);
//          },
//          [handleChangeFocusField]
//       );

//       // const isButtonDisabled = useMemo(
//       //    () => (captchaLogin() && captchaType !== 'none' && !(reCaptchaSuccess || geetestCaptchaSuccess)),
//       //    [reCaptchaSuccess, geetestCaptchaSuccess]
//       // );

//       const handleSubmitForm = useCallback(() => {
//          refreshError();
//          onLogin();
//       }, [onLogin, refreshError]);

//       const handleValidateForm = useCallback(() => {
//          isFormValid();
//       }, [isFormValid]);

//       const handleClick = useCallback(
//          (e?: React.MouseEvent) => {
//             if (e) {
//                e.preventDefault();
//             }
//             if (!isValidForm()) {
//                handleValidateForm();
//             } else {
//                handleSubmitForm();
//             }
//          },
//          [handleSubmitForm, handleValidateForm, isValidForm]
//       );

//       const handleEnterPress = useCallback(
//          (e: KeyboardEvent<HTMLDivElement>) => {
//             if (e.key === 'Enter') {
//                e.preventDefault();
//                handleClick();
//             }
//          },
//          [handleClick]
//       );

//       useEffect(() => {
//          if (captchaType !== 'none') {
//             captcha_response && handleClick();
//          }
//       }, [captcha_response]);

//       return (
//          <LayoutAuth
//             linkTo="/register"
//             linkToTxt="Register"
//             descLinkTo="Don’t have an account?"
//             title={title}
//             subTitle={subTitle}
//             withDisplayLink>
//             <div>
//                <form>
//                   <div
//                      className="flex flex-col space-y-8"
//                      onKeyPress={handleEnterPress}>
//                      {/* <div className="flex justify-center space-x-6">
//                      <Nav title="Email" isActive={loginBy} onClick={() => setLoginBy(true)} />
//                      <Nav title="Mobile" isActive={!loginBy} onClick={() => setLoginBy(false)} />
//                   </div> */}
//                      {true ? (
//                         <InputGroup
//                            id="email"
//                            type="email"
//                            label="Email"
//                            placeholder={emailPlaceholder}
//                            onChange={handleChangeEmail}
//                            value={email}
//                            onFocus={() => handleFieldFocus('email')}
//                            autoFocus={!isMobileDevice || emailFocused}
//                            withError={!!emailError}
//                            withIconReset={!!emailError && !!email}
//                            onClickResetEmail={resetEmail}
//                            info={emailError}
//                         />
//                      ) : (
//                         <div className="space-y-3">
//                            <div className="undefined text-xs font-bold uppercase leading-none text-neutral5">
//                               Phone
//                            </div>
//                            <PhoneInput
//                               country={country}
//                               searchPlaceholder="Search for..."
//                               enableSearch
//                               searchStyle={{ color: 'red' }}
//                               value={country}
//                               onChange={phone => setCountry(phone)}
//                               buttonClass="coba"
//                               containerClass="relative"
//                               inputClass="w-full h-12 font-pop pr-3.5 rounded-xl font-medium 1leading-12 outline-none border-2 border-neutral6 bg-none bg-transparent shadow-none focus:border-neutral4 transition-all duration-300 dark:border-neutral3 dark:focus:border-neutral4"
//                               inputStyle={{ paddingLeft: 60, borderWidth: 2 }}
//                               dropdownStyle={{
//                                  width: 380,
//                                  borderRadius: 12,
//                                  marginTop: 8,
//                               }}
//                               buttonStyle={{
//                                  width: 48,
//                                  borderTopLeftRadius: 12,
//                                  borderBottomLeftRadius: 12,
//                                  paddingLeft: 4,
//                               }}
//                            />
//                         </div>
//                      )}
//                      <div>
//                         <InputGroup
//                            id="password"
//                            name="password"
//                            type="password"
//                            label={passwordLabel || 'Password'}
//                            placeholder="Enter your password"
//                            value={password}
//                            onChange={handleChangePassword}
//                            onFocus={() => handleFieldFocus('password')}
//                            withIconPassword
//                            withError={!!passwordError}
//                            info={passwordError}
//                         />
//                         <Link
//                            to="/forgot_password"
//                            className="float-right mt-4 text-xs font-semibold leading-custom4 text-primary1 transition-colors duration-300 hover:text-primary2">
//                            Forgot password?
//                         </Link>
//                      </div>
//                      {renderCaptcha}
//                      <Button
//                         ref={geetestCaptchaRef}
//                         text={
//                            isLoading
//                               ? 'Loading...'
//                               : labelLogin
//                               ? labelLogin
//                               : 'Login'
//                         }
//                         onClick={e =>
//                            captchaType === 'none' && handleClick(e as any)
//                         }
//                         disabled={
//                            isLoading ||
//                            !email.match(EMAIL_REGEX) ||
//                            !password.match(PASSWORD_REGEX) ||
//                            !navigator.onLine
//                         }
//                         withLoading={isLoading}
//                      />
//                   </div>
//                </form>
//             </div>
//          </LayoutAuth>
//       );
//    }
// );

/* eslint-disable no-constant-condition */
import React, {
   KeyboardEvent,
   useCallback,
   useEffect,
   useState,
   memo,
   RefObject,
   useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { Button, InputGroup } from 'components';
import { EMAIL_REGEX, PASSWORD_REGEX, removeClass } from 'helpers';
import {
   CaptchaType,
   GeetestCaptchaResponse,
   selectMobileDeviceState,
} from 'modules';
import { captchaLogin } from 'api';

export interface LoginProps {
   geetestCaptchaRef: RefObject<HTMLButtonElement>;
   labelLogin?: string;
   labelRegister?: string;
   emailLabel?: string;
   passwordLabel?: string;
   receiveConfirmationLabel?: string;
   forgotPasswordLabel?: string;
   isLoading?: boolean;
   onForgotPassword: (email?: string) => void;
   onConfirmationResend?: (email?: string) => void;
   onRegister: () => void;
   onLogin: () => void;
   className?: string;
   image?: string;
   email: string;
   emailError: string;
   password: string;
   passwordError: string;
   emailFocused: boolean;
   emailPlaceholder: string;
   passwordFocused: boolean;
   passwordPlaceholder: string;
   isFormValid: () => void;
   refreshError: () => void;
   handleChangeFocusField: (value: string) => void;
   changePassword: (value: string) => void;
   changeEmail: (value: string) => void;
   resetEmail?: () => void;
   captchaType?: CaptchaType;
   renderCaptcha?: JSX.Element | null;
   reCaptchaSuccess?: boolean;
   geetestCaptchaSuccess?: boolean;
   captcha_response?: string | GeetestCaptchaResponse;
}

export const FormLogin = memo(
   ({
      geetestCaptchaRef,
      email,
      emailError,
      emailPlaceholder,
      password,
      passwordError,
      passwordPlaceholder,
      isLoading,
      onRegister,
      image,
      labelLogin,
      labelRegister,
      emailLabel,
      passwordLabel,
      emailFocused,
      passwordFocused,
      onForgotPassword,
      forgotPasswordLabel,
      refreshError,
      onLogin,
      isFormValid,
      handleChangeFocusField,
      changePassword,
      changeEmail,
      resetEmail,
      captchaType,
      geetestCaptchaSuccess,
      reCaptchaSuccess,
      renderCaptcha,
      captcha_response,
   }: LoginProps) => {
      // const [loginBy, setLoginBy] = useState<boolean>(true);
      const [country, setCountry] = useState<string>('id');

      useEffect(() => {
         removeClass('form-control');
         // removeElement('special-label');
      }, []);

      const isMobileDevice = useSelector(selectMobileDeviceState);

      const isValidForm = useCallback(() => {
         const isEmailValid = email.match(EMAIL_REGEX);

         return email && isEmailValid && password;
      }, [email, password]);

      const handleChangeEmail = useCallback(
         (value: string) => {
            changeEmail(value);
         },
         [changeEmail]
      );

      const handleChangePassword = useCallback(
         (value: string) => {
            changePassword(value);
         },
         [changePassword]
      );

      const handleFieldFocus = useCallback(
         (field: string) => {
            handleChangeFocusField(field);
         },
         [handleChangeFocusField]
      );

      const handleSubmitForm = useCallback(() => {
         refreshError();
         onLogin();
      }, [onLogin, refreshError]);

      const handleValidateForm = useCallback(() => {
         isFormValid();
      }, [isFormValid]);

      const handleClick = useCallback(
         (e?: React.MouseEvent) => {
            if (e) {
               e.preventDefault();
            }
            if (!isValidForm()) {
               handleValidateForm();
            } else {
               handleSubmitForm();
            }
         },
         [handleSubmitForm, handleValidateForm, isValidForm]
      );

      const handleEnterPress = useCallback(
         (e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
               e.preventDefault();
               captchaType !== 'none' && captchaLogin() === true
                  ? captcha_response && handleClick()
                  : handleClick();
            }
         },
         [captchaType, captcha_response, handleClick]
      );

      const isDisabledButton = useMemo(
         () =>
            isLoading ||
            !email.match(EMAIL_REGEX) ||
            !password.match(PASSWORD_REGEX) ||
            !navigator.onLine,
         [email, isLoading, password]
      );

      const handleLogin = useCallback(
         (e: any) => {
            if (captchaType === 'none' || captchaLogin() === false) {
               handleClick(e as any);
            }
         },
         [captchaType, handleClick]
      );

      useEffect(() => {
         if (captchaType !== 'none') {
            captcha_response && handleClick();
         }
      }, [captchaType, captcha_response, handleClick]);

      return (
         <div>
            <form>
               <div
                  className="flex flex-col space-y-8"
                  onKeyPress={handleEnterPress}>
                  {/* <div className="flex justify-center space-x-6">
                        <Nav
                           title="Email"
                           isActive={loginBy}
                           onClick={() => setLoginBy(true)}
                        />
                        <Nav
                           title="Mobile"
                           isActive={!loginBy}
                           onClick={() => setLoginBy(false)}
                        />
                     </div> */}
                  {true ? (
                     <InputGroup
                        id="email"
                        type="email"
                        label="Email"
                        placeholder={emailPlaceholder}
                        onChange={handleChangeEmail}
                        value={email}
                        onFocus={() => handleFieldFocus('email')}
                        autoFocus={!isMobileDevice || emailFocused}
                        withError={!!emailError}
                        withIconReset={!!emailError && !!email}
                        onClickResetEmail={resetEmail}
                        info={emailError}
                     />
                  ) : (
                     <div className="space-y-3">
                        <div className="undefined text-xs font-bold uppercase leading-none text-neutral5">
                           Phone
                        </div>
                        <PhoneInput
                           country={country}
                           searchPlaceholder="Search for..."
                           enableSearch
                           searchStyle={{ color: 'red' }}
                           value={country}
                           onChange={phone => setCountry(phone)}
                           buttonClass="coba"
                           containerClass="relative"
                           inputClass="w-full h-12 font-pop pr-3.5 rounded-xl font-medium 1leading-12 outline-none border-2 border-neutral6 bg-none bg-transparent shadow-none focus:border-neutral4 transition-all duration-300 dark:border-neutral3 dark:focus:border-neutral4"
                           inputStyle={{ paddingLeft: 60, borderWidth: 2 }}
                           dropdownStyle={{
                              width: 380,
                              borderRadius: 12,
                              marginTop: 8,
                           }}
                           buttonStyle={{
                              width: 48,
                              borderTopLeftRadius: 12,
                              borderBottomLeftRadius: 12,
                              paddingLeft: 4,
                           }}
                        />
                     </div>
                  )}
                  <div>
                     <InputGroup
                        id="password"
                        name="password"
                        type="password"
                        label={passwordLabel || 'Password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={handleChangePassword}
                        onFocus={() => handleFieldFocus('password')}
                        withIconPassword
                        withError={!!passwordError}
                        info={passwordError}
                        autoComplete="off"
                     />
                     <Link
                        to="/forgot_password"
                        className="float-right mt-4 text-xs font-semibold leading-custom4 text-primary1 transition-colors duration-300 hover:text-primary2">
                        Forgot password?
                     </Link>
                  </div>
                  {renderCaptcha}
                  <Button
                     ref={geetestCaptchaRef}
                     text={isLoading ? 'Loading...' : labelLogin || 'Login'}
                     onClick={handleLogin}
                     disabled={isDisabledButton}
                     withLoading={isLoading}
                  />
               </div>
            </form>
         </div>
      );
   }
);
