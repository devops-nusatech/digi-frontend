import React, {
   memo,
   useCallback,
   useEffect,
   useMemo
} from 'react'
import {
   Button,
   FormChangePassword,
   InputOtp,
   Portal
} from 'components';
import { useModal } from 'hooks';
import { Configs } from 'modules';

interface FormChangeNewPasswordProps {
   isRendered: 0 | 1;
   otpCode: string;
   forgotPasswordRequested: boolean;
   handleChangeOTP(otpCode: string): void;
   handleChangeRendered(isRendered: 0 | 1): void;
   changeForgotPasswordFetch({ password, confirm_password }: { password: string, confirm_password: string }): void;
   translate(id: string): string;
   isDisabled: boolean;
   isLoading?: boolean;
   currentPasswordEntropy: number;
   renderCaptcha: JSX.Element;
   handleResendGenerateCode(): void
   fetchCurrentPasswordEntropy(e?: any): void
   configs: Configs;
}

export const FormChangeNewPassword = memo(({
   isRendered,
   otpCode,
   forgotPasswordRequested,
   handleChangeOTP,
   handleChangeRendered,
   changeForgotPasswordFetch,
   translate,
   isDisabled,
   isLoading,
   currentPasswordEntropy,
   renderCaptcha,
   handleResendGenerateCode,
   fetchCurrentPasswordEntropy,
   configs,
}: FormChangeNewPasswordProps) => {
   const { isShow, toggle } = useModal();
   const renderButtonResend = useCallback(() => (
      <div className="text-center ">
         <button
            type="button"
            tabIndex={-1}
            onClick={isRendered === 0 ? toggle : () => handleChangeRendered(0)}
            className="text-xs font-semibold text-primary1 hover:text-primary1/90 leading-normal"
         >
            {isRendered === 0 ? 'Resend' : 'Back'}
         </button>
      </div>
   ), [toggle, isRendered]);

   const renderModalResendCode = useMemo(() => (
      <Portal
         show={isShow}
         close={toggle}
         title="Resend Code"
      >
         {renderCaptcha}
         <Button
            text="Resend code"
            onClick={handleResendGenerateCode}
            withLoading={isLoading}
            disabled={isDisabled}
         />
      </Portal>
   ), [isShow, toggle, renderCaptcha]);

   useEffect(() => {
      if (otpCode.length === 6 && isRendered === 0) {
         handleChangeRendered(1)
      }
      if (forgotPasswordRequested && isShow) {
         toggle();
      }
   }, [otpCode, forgotPasswordRequested]);

   if (isRendered === 0) {
      return (
         <>
            <form className="space-y-8">
               <InputOtp
                  length={6}
                  className="flex -mx-2"
                  isNumberInput
                  onChangeOTP={handleChangeOTP}
               />
               {renderButtonResend()}
            </form>
            {renderModalResendCode}
         </>
      )
   }

   return (
      <>
         <FormChangePassword
            handleChangePassword={changeForgotPasswordFetch}
            title={translate('page.body.profile.header.account.content.password.change')}
            configs={configs}
            currentPasswordEntropy={currentPasswordEntropy}
            fetchCurrentPasswordEntropy={fetchCurrentPasswordEntropy}
            showTitle
            hideOldPassword
         />
         {renderButtonResend()}
      </>
   )
});
