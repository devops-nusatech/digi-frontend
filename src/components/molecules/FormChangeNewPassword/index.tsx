import React, {
   RefObject,
   memo,
   useEffect,
   useMemo
} from 'react'
import {
   FormChangePassword,
   InputOtp,
} from 'components';
import { useCounter } from 'hooks';
import { GeetestCaptchaResponse, GeetestCaptchaV4Response } from 'modules';

type PasswordProps = {
   password: string;
   confirm_password: string;
}

interface FormChangeNewPasswordProps {
   geetestCaptchaRef: RefObject<HTMLButtonElement>;
   isRendered: 0 | 1;
   otpCode: string;
   forgotPasswordRequested: boolean;
   handleChangeOTP(otpCode: string): void;
   handleChangeRendered(isRendered: 0 | 1): void;
   changeForgotPasswordFetch({ password, confirm_password }: PasswordProps): void;
   translate(id: string): string;
   isDisabled: boolean;
   isLoading?: boolean;
   renderCaptcha: JSX.Element;
   handleResendGenerateCode(): void
   captcha_response?: string | GeetestCaptchaResponse | GeetestCaptchaV4Response;
}

export const FormChangeNewPassword = memo(({
   geetestCaptchaRef,
   isRendered,
   otpCode,
   forgotPasswordRequested,
   handleChangeOTP,
   handleChangeRendered,
   changeForgotPasswordFetch,
   translate,
   isDisabled,
   isLoading,
   renderCaptcha,
   handleResendGenerateCode,
   captcha_response,
}: FormChangeNewPasswordProps) => {
   const { counter, setCounter } = useCounter();

   useEffect(() => {
      if (otpCode.length === 6 && isRendered === 0)
         return handleChangeRendered(1)
   }, [otpCode]);

   useEffect(() => {
      if (!captcha_response) {
         setCounter(60);
      }
   }, [captcha_response]);

   const isReady = useMemo(() => counter < 1, [counter]);

   const renderInputOtp = useMemo(() => (
      <form className="space-y-8">
         <InputOtp
            length={6}
            className="flex -mx-2"
            onChangeOTP={handleChangeOTP}
         />
         <div className="text-center">
            {renderCaptcha}
            <button
               type="button"
               tabIndex={-1}
               ref={geetestCaptchaRef}
               className={`text-xs cursor-pointer font-semibold text-primary1 hover:text-primary1/90 leading-normal ${isReady ? '' : 'hidden'}`}
            >
               Resend
            </button>
            {!isReady && <div>00:{counter < 10 ? `0${counter}` : counter}</div>}
         </div>
      </form >
   ), [
      otpCode,
      handleChangeOTP,
      renderCaptcha,
      geetestCaptchaRef,
      isRendered,
      counter,
      isReady,
   ]);

   if (isRendered === 0) return renderInputOtp;

   return (
      <div className="space-y-4">
         <FormChangePassword
            handleChangePassword={changeForgotPasswordFetch}
            hideOldPassword
            isLoading={isLoading}
         />
         <div
            onClick={() => handleChangeRendered(0)}
            className="cursor-pointer text-center text-xs font-semibold text-primary1 hover:text-primary1/90 leading-normal">
            Back
         </div>
      </div>
   )
});
