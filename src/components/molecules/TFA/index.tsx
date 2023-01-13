import React, { FC, KeyboardEvent, memo, useCallback, useState } from 'react';
import { Button, LayoutAuth, InputOtp, Portal } from 'components';
import { ImgTfa } from 'assets';
import { openInNewTab } from 'helpers';

export interface TFAProps {
   errorMessage?: string;
   isLoading?: boolean;
   onSubmit: () => void;
   title: string;
   subTitle: string;
   buttonLabel: string;
   modalTitle: string;
   modalButton: string;
   message?: string;
   otpCode: string;
   error: string;
   codeFocused: boolean;
   handleOtpCodeChange: (otp: string) => void;
   handleChangeFocusField: () => void;
   handleClose2fa?: () => void;
}

export const TFA: FC<TFAProps> = memo(({
   errorMessage,
   isLoading,
   title,
   subTitle,
   buttonLabel,
   modalTitle,
   modalButton,
   message,
   error,
   otpCode,
   codeFocused,
   onSubmit,
   handleOtpCodeChange,
   handleChangeFocusField,
   handleClose2fa,
}) => {
   const [forgot2fa, setforgot2fa] = useState(false);
   const handleEnterPress = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
         if (e.key === 'Enter') {
            e.preventDefault();
            if (!isLoading && otpCode.match(`^[0-9]{6}$`)) {
               onSubmit();
            }
         }
      },
      [onSubmit, otpCode, isLoading]
   );

   const handleShowModalTfa = () => setforgot2fa(!forgot2fa);
   const handleChatAdmin = () => openInNewTab('https://wa.me/62895704447596');

   const renderModalForgot2FA = () => (
      <Portal
         show={forgot2fa}
         close={handleShowModalTfa}
      >
         <div className="pt-10 space-y-8">
            <ImgTfa className="mx-auto mt-9" />
            <div className="text-center text-base font-medium leading-normal">
               {modalTitle}
            </div>
            <Button
               text={modalButton}
               onClick={handleChatAdmin}
            />
         </div>
      </Portal>
   )
   return (
      <LayoutAuth
         title={title || '2FA verification'}
         subTitle={subTitle || 'Please enter 6 Digits authentication code from your App'}
         onKeyPress={handleEnterPress}
         linkTo="/register"
         linkToTxt="Register for free"
         descLinkTo="Don’t have an account?"
      >
         <form>
            <InputOtp
               length={6}
               isNumberInput
               className="flex mb-8 -mx-2"
               onChangeOTP={handleOtpCodeChange}
            />
            <Button
               text={isLoading ? 'Loading...' : buttonLabel ? buttonLabel : 'Login'}
               withLoading={isLoading}
               disabled={isLoading || !otpCode.match(`^[0-9]{6}$`)}
               onClick={onSubmit}
            />
            <div className="text-center mt-4">
               <button
                  type="button"
                  onClick={handleShowModalTfa}
                  className="text-xs leading-custom4 font-semibold text-primary1 hover:text-primary1/90 transition-colors duration-300"
               >
                  Forgot 2FA?
               </button>
            </div>
         </form>
         {renderModalForgot2FA()}
      </LayoutAuth>
   );
});
