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
import { useCountdown } from 'hooks';

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
}: FormChangeNewPasswordProps) => {
   const { minutes, seconds } = useCountdown(5);

   useEffect(() => {
      if (otpCode.length === 6 && isRendered === 0)
         return handleChangeRendered(1)
   }, [otpCode]);

   const renderInputOtp = useMemo(() => (
      <form className="space-y-8">
         <InputOtp
            length={6}
            className="flex -mx-2"
            isNumberInput
            onChangeOTP={handleChangeOTP}
         />
         <div className="text-center">
            {renderCaptcha}
            <button
               type="button"
               tabIndex={-1}
               ref={geetestCaptchaRef}
               className={`text-xs font-semibold text-primary1 hover:text-primary1/90 leading-normal ${minutes === 0 && seconds === 0 ? '' : 'hidden'}`}
            >
               Resend
            </button>
            {(minutes > 0 || seconds > 0) && (
               <div className="text-center text-xs font-semibold text-primary1 hover:text-primary1/90 leading-normal">
                  {minutes}: {seconds < 10 ? `0${seconds}` : seconds}
               </div>
            )}
         </div>
      </form >
   ), [
      otpCode,
      handleChangeOTP,
      renderCaptcha,
      geetestCaptchaRef,
      isRendered,
      minutes,
      seconds
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
            className="text-center text-xs font-semibold text-primary1 hover:text-primary1/90 leading-normal">
            Back
         </div>
      </div>
   )
});
