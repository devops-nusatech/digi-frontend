import React, {
   FormEvent,
   KeyboardEvent,
   RefObject,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { isUsernameEnabled } from 'api';
import {
   EMAIL_REGEX,
   ERROR_LONG_USERNAME,
   ERROR_SHORT_USERNAME,
   PASSWORD_REGEX,
   USERNAME_REGEX,
} from 'helpers';
import {
   Button,
   Checkbox,
   InputGroup,
   InputPassword,
   Portal,
   QRCode,
} from 'components';
import { GeetestCaptchaResponse, GeetestCaptchaV4Response } from 'modules';

type CaptchaType = 'recaptcha' | 'geetest' | 'none';

interface FormRegisterProps {
   geetestCaptchaRef: RefObject<HTMLButtonElement>;
   captchaType: CaptchaType;
   renderCaptcha: JSX.Element;
   captcha_response?:
      | string
      | GeetestCaptchaResponse
      | GeetestCaptchaV4Response;
   isReCaptchaSuccess: boolean;
   isGeetestCaptchaSuccess: boolean;
   hasConfirmed: boolean;
   isLoading?: boolean;
   onRegister: () => void;
   onLogin: () => void;
   validateForm: () => void;
   clickCheckBox: () => void;

   username: string;
   email: string;
   password: string;
   confirmPassword: string;
   refid: string;

   handleChangeUsername: (value: string) => void;
   handleChangeEmail: (value: string) => void;
   handleChangePassword: (value: string) => void;
   handleChangeConfirmPassword: (value: string) => void;
   handleChangeRefId: (value: string) => void;

   focusUsername: boolean;
   focusEmail: boolean;
   focusPassword: boolean;
   focusConfirmPassword: boolean;
   focusRefId: boolean;

   handleFocusUsername: () => void;
   handleFocusEmail: () => void;
   handleFocusPassword: () => void;
   handleFocusConfirmPassword: () => void;
   handleFocusRefId: () => void;

   handleResetEmail: () => void;

   usernameLabel?: string;
   emailLabel?: string;
   passwordLabel?: string;
   confirmPasswordLabel?: string;
   refIdLabel?: string;

   emailError: string;
   passwordError: string;
   confirmPasswordError: string;

   termsMessage: string;

   translate: (id: string) => string;
}

export const FormRegister = memo(
   ({
      geetestCaptchaRef,
      captchaType,
      renderCaptcha,
      captcha_response,
      isReCaptchaSuccess,
      isGeetestCaptchaSuccess,
      hasConfirmed,
      isLoading,
      onRegister,
      onLogin,
      validateForm,
      clickCheckBox,

      username,
      email,
      password,
      confirmPassword,
      refid,

      handleChangeUsername,
      handleChangeEmail,
      handleChangePassword,
      handleChangeConfirmPassword,
      handleChangeRefId,

      focusUsername,
      focusEmail,
      focusPassword,
      focusConfirmPassword,
      focusRefId,

      handleFocusUsername,
      handleFocusEmail,
      handleFocusPassword,
      handleFocusConfirmPassword,
      handleFocusRefId,

      handleResetEmail,

      usernameLabel,
      emailLabel,
      passwordLabel,
      confirmPasswordLabel,
      refIdLabel,

      emailError,
      passwordError,
      confirmPasswordError,

      termsMessage,
      translate,
   }: FormRegisterProps) => {
      const [showInfo, setShowInfo] = useState<boolean>(false);
      const [showFieldRefid, setShowFieldRefid] = useState<boolean>(false);

      useEffect(() => {
         setTimeout(() => setShowInfo(!showInfo), 1000);
         setShowFieldRefid(e => (!!refid ? !e : e));
      }, []);
      useEffect(() => {
         if (captchaType !== 'none') {
            captcha_response && handleRegister();
         }
      }, [captcha_response]);

      const isValidForm = useCallback(() => {
         const isEmailValid = email.match(EMAIL_REGEX);
         const isPasswordValid = password.match(PASSWORD_REGEX);
         const isConfirmPasswordValid = password === confirmPassword;

         return (
            email &&
            isEmailValid &&
            password &&
            isPasswordValid &&
            confirmPassword &&
            isConfirmPasswordValid
         );
      }, [email, password, confirmPassword]);

      const handleSubmitForm = useCallback(() => onRegister(), [onRegister]);

      const handleRegister = useCallback(
         (e?: FormEvent<HTMLInputElement>) => {
            if (e) e.preventDefault();
            !isValidForm() ? validateForm() : handleSubmitForm();
         },
         [isValidForm, validateForm, handleSubmitForm]
      );

      const handleEnterPress = useCallback(
         (e: KeyboardEvent<HTMLFormElement>) => {
            if (e.key === 'Enter') {
               e.preventDefault();
               handleRegister();
            }
         },
         [handleRegister]
      );

      const isDisabledButton = useMemo((): boolean => {
         if (
            (isUsernameEnabled() && !username.match(USERNAME_REGEX)) ||
            !email.match(EMAIL_REGEX) ||
            !password.match(PASSWORD_REGEX) ||
            !confirmPassword.match(PASSWORD_REGEX) ||
            confirmPassword !== password ||
            !hasConfirmed ||
            isLoading ||
            !navigator.onLine
         )
            return true;
         return false;
      }, [
         isUsernameEnabled,
         username,
         email,
         password,
         confirmPassword,
         hasConfirmed,
         isLoading,
      ]);

      const renderUsernameError = (nick: string) => {
         return nick.length < 4
            ? translate(ERROR_SHORT_USERNAME)
            : translate(ERROR_LONG_USERNAME);
      };
      const renderInputPassword = useCallback(
         () => (
            <InputPassword
               label={passwordLabel}
               onChange={handleChangePassword}
            />
         ),
         [handleChangePassword]
      );

      return (
         <>
            <form
               onKeyPress={handleEnterPress}
               className="space-y-8">
               {isUsernameEnabled() && (
                  <InputGroup
                     id="username"
                     label={usernameLabel || 'username'}
                     placeholder={usernameLabel || 'Username'}
                     value={username}
                     onChange={handleChangeUsername}
                     onFocus={handleFocusUsername}
                     withError={
                        !!(
                           !username.match(USERNAME_REGEX) &&
                           !focusUsername &&
                           username.length
                        )
                     }
                     info={
                        !username.match(USERNAME_REGEX) &&
                        !focusUsername &&
                        username.length
                           ? renderUsernameError(username)
                           : ''
                     }
                     autoFocus
                  />
               )}
               <InputGroup
                  id="email"
                  type="email"
                  label={emailLabel || 'email'}
                  placeholder={emailLabel || 'Email'}
                  value={email}
                  onChange={handleChangeEmail}
                  onFocus={handleFocusEmail}
                  withError={!!emailError}
                  withIconReset={!!emailError && !!email}
                  onClickResetEmail={handleResetEmail}
                  info={emailError}
                  autoFocus={!isUsernameEnabled()}
               />
               {renderInputPassword()}
               <InputGroup
                  id="confirmPassword"
                  type="password"
                  label={confirmPasswordLabel || 'confirm password'}
                  placeholder={confirmPasswordLabel || 'Confirm password'}
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  onFocus={handleFocusConfirmPassword}
                  info={confirmPasswordError && confirmPasswordError}
                  withIconPassword
               />
               <div
                  onClick={() => setShowFieldRefid(!showFieldRefid)}
                  className={`relative ${
                     showFieldRefid ? 'h-[72px]' : 'h-3.5 overflow-hidden'
                  } transition-all duration-300`}>
                  <div className="absolute right-0 top-0 z-2">
                     <svg
                        className={`h-6 w-6 cursor-pointer fill-neutral4 transition-transform duration-500 ${
                           showFieldRefid && 'rotate-180'
                        }`}>
                        <use xlinkHref="#icon-arrow-down" />
                     </svg>
                  </div>
                  <InputGroup
                     label={refIdLabel || 'referral code (optional)'}
                     placeholder={refIdLabel || 'Referral code (Optional)'}
                     value={refid}
                     onChange={handleChangeRefId}
                     onFocus={handleFocusRefId}
                     className={
                        showFieldRefid ? '' : '-translate-y-10 opacity-0'
                     }
                  />
               </div>
               <Checkbox
                  checked={hasConfirmed}
                  onChecked={clickCheckBox}>
                  {!termsMessage ? (
                     termsMessage
                  ) : (
                     <>
                        By signing up I agree that I’m 18 years of age or older,
                        to the{' '}
                        <a
                           className="font-medium text-neutral2 hover:text-primary1 dark:text-neutral8"
                           href="#">
                           User Agreements
                        </a>
                        ,{' '}
                        <a
                           className="font-medium text-neutral2 hover:text-primary1 dark:text-neutral8"
                           href="#">
                           Privacy Policy
                        </a>
                        ,{' '}
                        <a
                           className="font-medium text-neutral2 hover:text-primary1 dark:text-neutral8"
                           href="#">
                           Cookie Policy
                        </a>
                        ,{' '}
                        <a
                           className="font-medium text-neutral2 hover:text-primary1 dark:text-neutral8"
                           href="#">
                           E-Sign Consent
                        </a>
                        .
                     </>
                  )}
               </Checkbox>
               {renderCaptcha}
               <Button
                  ref={geetestCaptchaRef}
                  text={isLoading ? 'Loading...' : 'Register'}
                  onClick={e =>
                     captchaType === 'none' && handleRegister(e as any)
                  }
                  disabled={isDisabledButton}
                  withLoading={isLoading}
               />
            </form>
            <Portal
               show={showInfo}
               close={() => setShowInfo(!showInfo)}
               width="2xl">
               <div className="mx-auto max-w-sm pt-8 text-center text-2xl font-bold">
                  Create an account via the app for easier registration
               </div>
               <div className="text-center leading-custom2">
                  Don't have the Digiasset app yet? Scan the QR code above or
                  download the Digiasset app via
                  <a
                     href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     title="Download app"
                     className="text-primary1">
                     &nbsp; Google Play
                  </a>
                  &nbsp; or
                  <a
                     href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     title="Download app"
                     className="text-primary1">
                     &nbsp; App Store
                  </a>
                  .
               </div>
               <div className="flex flex-col items-center justify-center">
                  <QRCode
                     data="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                     dimensions={200}
                  />
                  <div className="my-2 text-xs font-medium text-neutral4">
                     Scan to download
                  </div>
                  <div className="text-base font-bold">iOS and Android</div>
               </div>
               <div className="mx-auto max-w-xs">
                  <Button
                     onClick={() => setShowInfo(!showInfo)}
                     text="Registration via web"
                     width="full"
                  />
               </div>
               <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Lihat panduan"
                  className="flex justify-center text-xs font-medium text-primary1 transition duration-500 ease-in-out hover:underline hover:underline-offset-4">
                  See registration guide via App
               </a>
            </Portal>
         </>
      );
   }
);
