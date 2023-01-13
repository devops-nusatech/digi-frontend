import React, { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, InputGroup } from 'components';
import { EMAIL_REGEX } from 'helpers';
import { IcMessage } from 'assets';
import {
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
   selectMobileDeviceState
} from 'modules';

interface FormForgotPasswordProps {
   buttonLabel?: string;
   isLoading?: boolean;
   onSubmit: () => void;
   emailLabel?: string;
   email: string;
   emailError: string;
   placeholder?: string;
   validateForm: () => void;
   handleChangeEmail: (value: string) => void;
   captchaType?: 'recaptcha' | 'geetest' | 'none';
   renderCaptcha?: JSX.Element | null;
   reCaptchaSuccess?: boolean;
   geetestCaptchaSuccess?: boolean;
   captcha_response?: string | GeetestCaptchaResponse | GeetestCaptchaV4Response;
   handleRenderInputNewPass: () => void;
}

export const FormForgotPassword: FC<FormForgotPasswordProps> = memo(({
   buttonLabel,
   isLoading,
   onSubmit,
   emailLabel,
   email,
   emailError,
   placeholder,
   validateForm,
   handleChangeEmail,
   captchaType,
   renderCaptcha,
   reCaptchaSuccess,
   geetestCaptchaSuccess,
   handleRenderInputNewPass
}) => {
   const isMobileDevice = useSelector(selectMobileDeviceState);

   const handleSubmitForm = () => onSubmit();

   const isValidForm = () => {
      const isEmailValid = email.match(EMAIL_REGEX);
      return email && isEmailValid;
   };

   const isButtonDisabled = (): boolean => {
      if (isLoading || !email.match(EMAIL_REGEX)) {
         return true;
      }
      if (captchaType === 'recaptcha' && !reCaptchaSuccess) {
         return true;
      }

      if (captchaType === 'geetest' && !geetestCaptchaSuccess) {
         return true;
      }

      return false;
   };

   const handleClick = () => !isValidForm() ? validateForm() : handleSubmitForm();

   useEffect(() => {
      if (captchaType !== 'none') {
         if (reCaptchaSuccess || geetestCaptchaSuccess) {
            handleRenderInputNewPass();
         }
      }
   }, [reCaptchaSuccess, geetestCaptchaSuccess]);

   return (
      <form className="space-y-8">
         <InputGroup
            id="email"
            name="email"
            type="email"
            label={emailLabel}
            placeholder={placeholder}
            value={email}
            onChange={handleChangeEmail}
            autoFocus={!isMobileDevice}
            icon={<IcMessage className="w-6 h-6 inline-block cursor-pointer" />}
            withError={!!emailError}
            info={emailError}
         />
         {renderCaptcha}
         <Button
            disabled={isButtonDisabled()}
            onClick={handleClick}
            text={isLoading ? 'Loading...' : buttonLabel ? buttonLabel : 'Send'}
            withLoading={isLoading}
         />
      </form>
   );
});
