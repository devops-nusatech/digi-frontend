import React, { KeyboardEvent, useCallback, useEffect, useState, memo, FC } from 'react';
// import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { Button, LayoutAuth, Nav, InputGroup } from 'components';
import { captchaLogin } from 'api';
import { EMAIL_REGEX, removeClass, } from 'helpers';
import { GeetestCaptchaResponse, GeetestCaptchaV4Response, } from 'modules';
import { selectMobileDeviceState } from 'modules/public/globalSettings';
import { Link } from 'react-router-dom';

import PhoneInput from 'react-phone-input-2';

export interface SignInProps {
   labelSignIn?: string;
   labelSignUp?: string;
   emailLabel?: string;
   passwordLabel?: string;
   receiveConfirmationLabel?: string;
   forgotPasswordLabel?: string;
   isLoading?: boolean;
   title: string;
   subTitle?: string;
   onForgotPassword: (email?: string) => void;
   onConfirmationResend?: (email?: string) => void;
   onSignUp: () => void;
   onSignIn: () => void;
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
   captchaType?: 'recaptcha' | 'geetest' | 'none';
   renderCaptcha?: JSX.Element | null;
   reCaptchaSuccess?: boolean;
   geetestCaptchaSuccess?: boolean;
   captcha_response?: string | GeetestCaptchaResponse | GeetestCaptchaV4Response;
}

export const FormLogin: FC<SignInProps> = memo(({
   title,
   subTitle,
   email,
   emailError,
   emailPlaceholder,
   password,
   passwordError,
   passwordPlaceholder,
   isLoading,
   onSignUp,
   image,
   labelSignIn,
   labelSignUp,
   emailLabel,
   passwordLabel,
   emailFocused,
   passwordFocused,
   onForgotPassword,
   forgotPasswordLabel,
   refreshError,
   onSignIn,
   isFormValid,
   handleChangeFocusField,
   changePassword,
   changeEmail,
   resetEmail,
   captchaType,
   geetestCaptchaSuccess,
   reCaptchaSuccess,
   renderCaptcha,
   captcha_response
}) => {
   const [loginBy, setLoginBy] = useState<boolean>(true);
   const [country, setCountry] = useState<string>('id');

   useEffect(() => {
      removeClass('form-control');
      // removeElement('special-label');
   });

   const isMobileDevice = useSelector(selectMobileDeviceState);

   const isValidForm = useCallback(() => {
      const isEmailValid = email.match(EMAIL_REGEX);

      return email && isEmailValid && password;
   }, [email, password]);

   const handleChangeEmail = useCallback((value: string) => {
      changeEmail(value);
   }, [changeEmail]);

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

   const isButtonDisabled = (): boolean => {
      return ((captchaLogin() && captchaType !== 'none' && !reCaptchaSuccess && !geetestCaptchaSuccess)) ? true : false;
   };

   const handleSubmitForm = useCallback(() => {
      refreshError();
      onSignIn();
   }, [onSignIn, refreshError]);

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
      (e: KeyboardEvent<HTMLInputElement>) => {
         if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
         }
      },
      [handleClick]
   );

   // const onClick = () => captchaType === 'none' ? handleClick() : useShowGeetestCaptcha;

   useEffect(() => {
      captcha_response && handleClick();
   }, [captcha_response]);

   return (
      <LayoutAuth
         linkTo="/register"
         linkToTxt="Register"
         descLinkTo="Don’t have an account?"
         title={title}
         subTitle={subTitle}
         withDisplayLink
      >
         <div>
            <form>
               <div className="flex flex-col space-y-8" onKeyPress={handleEnterPress}>
                  <div className="flex justify-center space-x-6">
                     <Nav title="Email" isActive={loginBy} onClick={() => setLoginBy(true)} />
                     <Nav title="Mobile" isActive={!loginBy} onClick={() => setLoginBy(false)} />
                  </div>
                  {loginBy ? (
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
                        <div className="text-xs text-neutral5 undefined leading-none font-bold uppercase">Phone</div>
                        <PhoneInput
                           country={country}
                           searchPlaceholder="Search for..."
                           enableSearch
                           searchStyle={{ color: 'red' }}
                           value={country}
                           onChange={phone => setCountry(phone)}
                           buttonClass="coba"
                           containerClass='relative'
                           inputClass="w-full h-12 font-pop pr-3.5 rounded-xl font-medium 1leading-12 outline-none border-2 border-neutral6 bg-none bg-transparent shadow-none focus:border-neutral4 transition-all duration-300 dark:border-neutral3 dark:focus:border-neutral4"
                           inputStyle={{ paddingLeft: 60, borderWidth: 2 }}
                           dropdownStyle={{ width: 380, borderRadius: 12, marginTop: 8, }}
                           buttonStyle={{ width: 48, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, paddingLeft: 4 }}
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
                     />
                     <Link to="/forgot_password" className="mt-4 text-xs leading-custom4 float-right font-semibold text-primary1 hover:text-primary2 transition-colors duration-300">
                        Forgot password?
                     </Link>
                  </div>
                  {renderCaptcha}
                  <Button
                     text={isLoading ? 'Loading...' : labelSignIn ? labelSignIn : 'Login'}
                     onClick={handleClick as any}
                     disabled={isLoading || !email.match(EMAIL_REGEX) || !password || isButtonDisabled()}
                     withLoading={isLoading}
                  />
               </div>
            </form>
         </div>
      </LayoutAuth>
   );
});
