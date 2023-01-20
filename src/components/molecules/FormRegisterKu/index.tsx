import React, {
   memo,
   useCallback,
   useMemo
} from 'react';
import {
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response
} from 'modules';
import {
   Button,
   Checkbox,
   InputGroup,
   PasswordStrengthBar
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

   minPasswordEntropy: number;
   currentPasswordEntropy: number;
   passwordErrorFirstSolved: boolean;
   passwordErrorSecondSolved: boolean;
   passwordErrorThirdSolved: boolean;
   passwordPopUp: boolean;

   translate: (id: string) => string;
   ref: any;
   passwordWrapper: any;
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

   USERNAME_REGEXP,
   EMAIL_REGEXP,
   PASSWORD_REGEXP,

   termsMessage,

   minPasswordEntropy,
   currentPasswordEntropy,
   passwordErrorFirstSolved,
   passwordErrorSecondSolved,
   passwordErrorThirdSolved,
   passwordPopUp,

   translate,
   ref,
   passwordWrapper,
   isUsernameEnabled,
}: FormRegisterKuProps) => {

   const renderUsernameError = (nick: string) => {
      return nick.length < 4 ? translate(ERROR_SHORT_USERNAME) : translate(ERROR_LONG_USERNAME);
   };

   // const renderInputPassword = useCallback(() => {
   //    return (
   //       <div ref={passwordWrapper}>
   //          <InputGroup
   //             id="password"
   //             type="password"
   //             label={passwordLabel || 'password'}
   //             placeholder={passwordLabel || 'Enter password'}
   //             value={password}
   //             onChange={handleChangePassword}
   //             onFocus={handleFocusPassword}
   //             withIconPassword
   //          />
   //          {password && (
   //             <>
   //                <PasswordStrengthBar
   //                   minPasswordEntropy={minPasswordEntropy}
   //                   currentPasswordEntropy={currentPasswordEntropy}
   //                   passwordExist={password !== ''}
   //                   passwordErrorFirstSolved={passwordErrorFirstSolved}
   //                   passwordErrorSecondSolved={passwordErrorSecondSolved}
   //                   passwordErrorThirdSolved={passwordErrorThirdSolved}
   //                   passwordPopUp={passwordPopUp}
   //                   translate={translate}
   //                />
   //             </>
   //          )}
   //       </div>
   //    )
   // }, [passwordLabel, password, handleChangePassword, handleFocusPassword, minPasswordEntropy, currentPasswordEntropy, passwordErrorFirstSolved, passwordErrorSecondSolved, passwordErrorThirdSolved, passwordPopUp, translate]);

   const renderInputPassword = useCallback(() => (
      <div ref={passwordWrapper}>
         <InputGroup
            id="password"
            type="password"
            label={passwordLabel || 'password'}
            placeholder={passwordLabel || 'Enter password'}
            value={password}
            onChange={handleChangePassword}
            onFocus={handleFocusPassword}
            withIconPassword
         />
         {password && (
            <PasswordStrengthBar
               minPasswordEntropy={minPasswordEntropy}
               currentPasswordEntropy={currentPasswordEntropy}
               passwordExist={password !== ''}
               passwordErrorFirstSolved={passwordErrorFirstSolved}
               passwordErrorSecondSolved={passwordErrorSecondSolved}
               passwordErrorThirdSolved={passwordErrorThirdSolved}
               passwordPopUp={passwordPopUp}
               translate={translate}
            />
         )}
      </div>
   ), [
      password,
      handleChangePassword,
      handleFocusPassword,
      minPasswordEntropy,
      currentPasswordEntropy,
      passwordErrorFirstSolved,
      passwordErrorSecondSolved,
      passwordErrorThirdSolved,
      passwordPopUp,
      translate
   ]);

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
         (isUsernameEnabled && !username.match(USERNAME_REGEXP))
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
         <form className="space-y-7.5">
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
      </>
   )
})
