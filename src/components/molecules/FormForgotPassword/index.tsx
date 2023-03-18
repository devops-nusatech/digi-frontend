import React, { RefObject, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, InputGroup } from 'components';
import { EMAIL_REGEX } from 'helpers';
import { IcMessage } from 'assets';
import {
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
   selectMobileDeviceState,
} from 'modules';

interface FormForgotPasswordProps {
   geetestCaptchaRef: RefObject<HTMLButtonElement>;
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
   captcha_response?:
      | string
      | GeetestCaptchaResponse
      | GeetestCaptchaV4Response;
   handleRenderInputNewPass: () => void;
}

export const FormForgotPassword = memo(
   ({
      geetestCaptchaRef,
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
      handleRenderInputNewPass,
   }: FormForgotPasswordProps) => {
      const isMobileDevice = useSelector(selectMobileDeviceState);

      useEffect(() => {
         if (captchaType !== 'none') {
            if (reCaptchaSuccess || geetestCaptchaSuccess) {
               handleClick();
               handleRenderInputNewPass();
            }
         }
      }, [reCaptchaSuccess, geetestCaptchaSuccess]);

      const isValidForm = () => {
         const isEmailValid = email.match(EMAIL_REGEX);
         return email && isEmailValid;
      };

      const isButtonDisabled = (): boolean => {
         if (isLoading || !email.match(EMAIL_REGEX)) {
            return true;
         }

         return false;
      };

      const handleClick = () => (!isValidForm() ? validateForm() : onSubmit());

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
               icon={
                  <IcMessage className="inline-block h-6 w-6 cursor-pointer" />
               }
               withError={!!emailError}
               info={emailError}
            />
            {renderCaptcha}
            <Button
               ref={geetestCaptchaRef}
               text={
                  isLoading ? 'Loading...' : buttonLabel ? buttonLabel : 'Send'
               }
               onClick={() => captchaType === 'none' && handleClick()}
               disabled={isButtonDisabled()}
               withLoading={isLoading}
            />
         </form>
      );
   }
);
