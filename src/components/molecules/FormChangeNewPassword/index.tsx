import React, { FC, memo, useCallback } from 'react'
import { Button, InputGroup, InputOtp, PasswordStrengthBar } from 'components';

interface FormChangeNewPasswordProps {
   isRendered: 0 | 1;
   newPassword: string;
   confirmPassword: string;
   newPasswordLabel: string;
   newPasswordFocus: boolean;
   confirmPasswordFocus: boolean;
   confirmPasswordLabel: string;
   buttonLabel: string;
   placeholder?: string;
   handleChangeOTP(otpCode: string): void;
   handleChangeNewPassword(newPassword: string): void;
   handleChangeConfirmPassword(confirmPassword: string): void;
   handleFocusNewPassword(): void;
   handleFocusConfirmPassword(): void;
   handleChangeRendered(isRendered: 0 | 1): void;
   changeForgotPasswordFetch(): void;
   translate(id: string): string;
   isDisabled: boolean;
   isLoading?: boolean;

   minPasswordEntropy: number;
   currentPasswordEntropy: number;
   passwordErrorFirstSolved: boolean;
   passwordErrorSecondSolved: boolean;
   passwordErrorThirdSolved: boolean;
   newPasswordWrapper: any;
   newPasswordShow: boolean;

   renderCaptcha: JSX.Element;
   handleResendGenerateCode(): void
}

export const FormChangeNewPassword: FC<FormChangeNewPasswordProps> = memo(({
   isRendered,
   newPassword,
   confirmPassword,
   newPasswordLabel,
   newPasswordFocus,
   confirmPasswordFocus,
   confirmPasswordLabel,
   buttonLabel,
   placeholder,
   handleChangeOTP,
   handleChangeNewPassword,
   handleFocusNewPassword,
   handleFocusConfirmPassword,
   handleChangeConfirmPassword,
   handleChangeRendered,
   changeForgotPasswordFetch,
   translate,
   isDisabled,
   isLoading,

   minPasswordEntropy,
   currentPasswordEntropy,
   passwordErrorFirstSolved,
   passwordErrorSecondSolved,
   passwordErrorThirdSolved,
   newPasswordWrapper,
   newPasswordShow,

   renderCaptcha,
   handleResendGenerateCode,
}) => {
   const renderButton = useCallback(() => (
      <div>
         <Button
            text={buttonLabel}
            onClick={() => {
               isRendered === 0 ? handleChangeRendered(1) : changeForgotPasswordFetch()
            }}
            disabled={isDisabled}
            withLoading={isRendered === 1 && isLoading}
         />
         <div className="mt-4 text-center">
            <button
               type="button"
               tabIndex={-1}
               onClick={isRendered === 0 ? handleResendGenerateCode : () => handleChangeRendered(1)}
               className="text-xs font-semibold text-primary1 hover:text-primary1/90 leading-normal"
            >
               {isRendered === 0 ? 'Resend' : 'Back'}
            </button>
         </div>
      </div>
   ), [buttonLabel, isRendered, handleChangeRendered, isDisabled, changeForgotPasswordFetch]);

   const renderPasswordInput = useCallback(() => {
      return (
         <div ref={newPasswordWrapper}>
            <InputGroup
               id="new-password"
               name="new-password"
               type="password"
               label={newPasswordLabel}
               placeholder={placeholder}
               value={newPassword}
               onChange={handleChangeNewPassword}
               onFocus={handleFocusNewPassword}
               withIconPassword
               autoFocus={isRendered === 1 || newPasswordFocus}
            // onKeyPress={handleFocusNewPassword}
            />
            {newPassword && (
               <PasswordStrengthBar
                  minPasswordEntropy={minPasswordEntropy}
                  currentPasswordEntropy={currentPasswordEntropy}
                  passwordExist={newPassword !== ''}
                  passwordErrorFirstSolved={passwordErrorFirstSolved}
                  passwordErrorSecondSolved={passwordErrorSecondSolved}
                  passwordErrorThirdSolved={passwordErrorThirdSolved}
                  passwordPopUp={newPasswordShow}
                  translate={translate}
               />
            )}
         </div>
      )
   }, [newPasswordWrapper, newPasswordLabel, placeholder, newPassword, handleChangeNewPassword, handleFocusNewPassword, isRendered, newPasswordFocus, minPasswordEntropy, currentPasswordEntropy, passwordErrorFirstSolved, passwordErrorSecondSolved, passwordErrorThirdSolved, newPasswordShow, translate]);

   const renderConfirmPasswordInput = useCallback(() => {
      return (
         <InputGroup
            id="confirm-password"
            name="confirm-password"
            type="password"
            label={confirmPasswordLabel}
            placeholder={placeholder}
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            onFocus={handleFocusConfirmPassword}
            withIconPassword
            autoFocus={confirmPasswordFocus}
            onKeyPress={handleFocusConfirmPassword}
         />
      )
   }, [confirmPasswordLabel, placeholder, confirmPassword, handleChangeConfirmPassword, handleFocusConfirmPassword, confirmPasswordFocus]);

   if (isRendered === 0) {
      return (
         <form className="space-y-8">
            <InputOtp
               length={6}
               className="flex -mx-2"
               isNumberInput
               onChangeOTP={handleChangeOTP}
            />
            {renderCaptcha}
            {renderButton()}
         </form>
      )
   }
   return (
      <form className="space-y-8">
         {renderPasswordInput()}
         {renderConfirmPasswordInput()}
         {renderButton()}
      </form>
   )
});
