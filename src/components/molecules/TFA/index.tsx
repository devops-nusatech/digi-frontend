import React, {
   FC,
   KeyboardEvent,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from 'react';
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

export const TFA: FC<TFAProps> = memo(
   ({
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

      useEffect(() => {
         if (otpCode.length === 6) {
            onSubmit();
         }
      }, [onSubmit, otpCode]);

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

      const handleShowModalTfa = useCallback(
         () => setforgot2fa(!forgot2fa),
         [forgot2fa]
      );

      const handleChatAdmin = useCallback(
         () =>
            openInNewTab(
               'https://api.whatsapp.com/send/?phone=62882005439488&text&type=phone_number&app_absent=0'
            ),
         []
      );

      const renderModalForgot2FA = useMemo(
         () => (
            <Portal
               show={forgot2fa}
               close={handleShowModalTfa}>
               <div className="space-y-8 pt-10">
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
         ),
         [
            forgot2fa,
            handleChatAdmin,
            handleShowModalTfa,
            modalButton,
            modalTitle,
         ]
      );

      return (
         <>
            <LayoutAuth
               title={title || '2FA verification'}
               subTitle={
                  subTitle ||
                  'Please enter 6 Digits authentication code from your App'
               }
               onKeyPress={handleEnterPress}
               linkTo="/register"
               linkToTxt="Register for free"
               descLinkTo="Don’t have an account?">
               <form>
                  <InputOtp
                     length={6}
                     className="-mx-2 mb-8 flex"
                     onChangeOTP={handleOtpCodeChange}
                  />
                  <Button
                     text={
                        isLoading
                           ? 'Loading...'
                           : buttonLabel
                           ? buttonLabel
                           : 'Login'
                     }
                     withLoading={isLoading}
                     disabled={isLoading || !otpCode.match(`^[0-9]{6}$`)}
                     onClick={onSubmit}
                  />
                  <div className="mt-4 text-center">
                     <button
                        type="button"
                        onClick={handleShowModalTfa}
                        className="text-xs font-semibold leading-custom4 text-primary1 transition-colors duration-300 hover:text-primary1/90">
                        Forgot 2FA?
                     </button>
                  </div>
               </form>
            </LayoutAuth>
            {renderModalForgot2FA}
         </>
      );
   }
);
