import React, {
   memo,
   useCallback,
   useEffect,
   useMemo,
   useState
} from 'react';
import {
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response
} from 'modules';
import {
   Button,
   Checkbox,
   InputGroup,
   InputPassword,
   Portal,
   QRCode,
} from 'components';
import {
   ERROR_LONG_USERNAME,
   ERROR_SHORT_USERNAME
} from 'helpers';

type CaptchaType = 'recaptcha' | 'geetest' | 'none';

interface FormRegisterKuProps {
   captchaType: CaptchaType;
   renderCaptcha: JSX.Element;
   captcha_response?: string | GeetestCaptchaResponse | GeetestCaptchaV4Response;
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

   handleFocusUsername: () => void;
   handleFocusEmail: () => void;
   handleFocusPassword: () => void;
   handleFocusConfirmPassword: () => void;
   handleFocusRefId: () => void;

   handleResetEmail: () => void;

   usernameLabel: string;
   emailLabel: string;
   passwordLabel: string;
   confirmPasswordLabel: string;
   refIdLabel: string;

   emailError: string;
   passwordError: string;
   confirmPasswordError: string;

   USERNAME_REGEXP: RegExp;
   EMAIL_REGEXP: RegExp;
   PASSWORD_REGEXP: RegExp;

   termsMessage: string;

   translate: (id: string) => string;
   isUsernameEnabled: boolean;
}

export const FormRegisterKu = memo(({
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

   USERNAME_REGEXP,
   EMAIL_REGEXP,
   PASSWORD_REGEXP,

   termsMessage,

   translate,
   isUsernameEnabled,
}: FormRegisterKuProps) => {
   const [showInfo, setShowInfo] = useState(false);
   const [showFieldRefid, setShowFieldRefid] = useState(false);

   useEffect(() => {
      setTimeout(() => setShowInfo(!showInfo), 1000);
      setShowFieldRefid(e => !!refid ? !e : e)
   }, []);
   useEffect(() => {
      captcha_response && handleRegister();
   }, [captcha_response])

   const renderUsernameError = (nick: string) => {
      return nick.length < 4 ? translate(ERROR_SHORT_USERNAME) : translate(ERROR_LONG_USERNAME);
   };

   const renderInputPassword = useCallback(() => (
      <InputPassword
         label={passwordLabel}
         onChange={handleChangePassword}
      />
   ), [handleChangePassword]);

   const isValidForm = useCallback(() => {
      const isEmailValid = email.match(EMAIL_REGEXP);
      const isPasswordValid = password.match(PASSWORD_REGEXP);
      const isConfirmPasswordValid = password === confirmPassword;

      return email && password && confirmPassword && isEmailValid && isPasswordValid && isConfirmPasswordValid;
   }, [
      email,
      password,
      confirmPassword
   ]);

   const handleRegister = useCallback(() =>
      !isValidForm
         ? validateForm()
         : onRegister(),
      [
         isValidForm,
         validateForm,
         onRegister
      ]);

   const isDisabled = useMemo(() => {
      const captchaTypeValue = captchaType;

      if (
         !hasConfirmed ||
         isLoading ||
         !email.match(EMAIL_REGEXP) ||
         !password ||
         !confirmPassword ||
         (isUsernameEnabled && !username.match(USERNAME_REGEXP)) ||
         !navigator.onLine
      ) {
         return true;
      }

      if (captchaTypeValue === 'recaptcha' && !isReCaptchaSuccess) {
         return true;
      }

      if (captchaTypeValue === 'geetest' && !isGeetestCaptchaSuccess) {
         return true;
      }

      return false;
   }, [
      captchaType,
      confirmPassword,
      username,
      email,
      isReCaptchaSuccess,
      isGeetestCaptchaSuccess,
      hasConfirmed,
      isLoading,
      password,
   ]);

   return (
      <>
         <form className="space-y-8">
            {isUsernameEnabled && (
               <InputGroup
                  id="username"
                  label={usernameLabel || 'username'}
                  placeholder={usernameLabel || 'Username'}
                  value={username}
                  onChange={handleChangeUsername}
                  onFocus={handleFocusUsername}
                  withError={!!(!username.match(USERNAME_REGEXP) && !focusUsername && username.length)}
                  info={(!username.match(USERNAME_REGEXP) && !focusUsername && username.length) ? renderUsernameError(username) : ''}
                  autoFocus={focusUsername}
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
               autoFocus={!isUsernameEnabled}
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
               className={`relative ${showFieldRefid ? 'h-[72px]' : 'h-3.5 overflow-hidden'} transition-all duration-300`}
            >
               <div className="absolute right-0 top-0 z-2">
                  <svg className={`cursor-pointer w-6 h-6 fill-neutral4 transition-transform duration-500 ${showFieldRefid && 'rotate-180'}`}>
                     <use xlinkHref="#icon-arrow-down" />
                  </svg>
               </div>
               <InputGroup
                  label={refIdLabel || 'referral code (optional)'}
                  placeholder={refIdLabel || 'Referral code (Optional)'}
                  value={refid}
                  onChange={handleChangeRefId}
                  onFocus={handleFocusRefId}
                  className={showFieldRefid ? '' : '-translate-y-10 opacity-0'}
               />
            </div>
            <Checkbox
               checked={hasConfirmed}
               onChecked={clickCheckBox}
            >
               {!termsMessage ? termsMessage : (
                  <>
                     By signing up I agree that I’m 18 years of age or older, to the <a className="font-medium text-neutral2 hover:text-primary1 dark:text-neutral8" href="#">User Agreements</a>, <a className="font-medium text-neutral2 hover:text-primary1 dark:text-neutral8" href="#">Privacy Policy</a>, <a className="font-medium text-neutral2 hover:text-primary1 dark:text-neutral8" href="#">Cookie Policy</a>, <a className="font-medium text-neutral2 hover:text-primary1 dark:text-neutral8" href="#">E-Sign Consent</a>.
                  </>
               )}
            </Checkbox>
            {renderCaptcha}
            <Button
               text={`${isLoading ? 'Loading...' : 'Register'}`}
               disabled={isDisabled}
               onClick={handleRegister}
               withLoading={isLoading}
            />
         </form>
         <Portal
            show={showInfo}
            close={() => {
               setShowInfo(!showInfo);
               isUsernameEnabled ?
                  handleFocusUsername() : handleFocusEmail()
            }}
            width="2xl"
         >
            <div className="text-2xl max-w-sm font-bold pt-8 mx-auto text-center">
               Create an account via the app for easier registration
            </div>
            <div className="text-center leading-custom2">
               Don't have the Digiasset app yet? Scan the QR code above or download the Digiasset app via
               <a
                  href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download app"
                  className="text-primary1"
               >
                  &nbsp; Google Play
               </a>
               &nbsp; or
               <a
                  href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download app"
                  className="text-primary1"
               >
                  &nbsp; App Store
               </a>.
            </div>
            <div className="flex flex-col items-center justify-center">
               <QRCode
                  data="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                  dimensions={200}
               />
               <div className="text-neutral4 text-xs font-medium my-2">
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
               className="flex justify-center text-xs font-medium text-primary1 hover:underline hover:underline-offset-4 transition ease-in-out duration-500"
            >
               See registration guide via App
            </a>
         </Portal>
      </>
   )
})
