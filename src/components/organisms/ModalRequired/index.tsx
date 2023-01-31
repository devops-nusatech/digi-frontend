import React from 'react'
import { useSelector } from 'react-redux'
import type { LocationState, Path } from 'history'
import { selectMemberLevels, selectUserInfo } from 'modules'
import { ImgBarcode, ImgTfa } from 'assets'
import { Portal, Button } from 'components'

interface ModalRequiredProps {
   show: boolean;
   close: () => void;
   push?: (path: Path, state?: LocationState) => void;
}

export const ModalRequired = ({
   show,
   close,
   push
}: ModalRequiredProps) => {
   const user = useSelector(selectUserInfo);
   const memberLevel = useSelector(selectMemberLevels);

   const withdrawLevel = Number(memberLevel && memberLevel?.withdraw?.minimum_level);

   const renderHeaderModal = () => {
      if (user.level < withdrawLevel) {
         return 'Verify your identity';
      }
      if (!user.otp) {
         return 'Activate two factor authentication';
      }
      return;
   }

   const renderContentModal = () => {
      if (user.level < withdrawLevel) {
         return 'Please verify your identity through the mobile application, scan the barcode below to download.';
      }
      if (!user.otp) {
         return 'Please strengthen your account security by activate google two-factor authentication';
      }
      return;
   }

   const handleAction = () => {
      if (user.level < withdrawLevel) {
         return close()
      }
      if (!user.otp) {
         return push && push('/2fa');
      }
      return;
   }

   return (
      <Portal
         show={show}
         close={close}
      >
         <div className="pt-10 space-y-8">
            <div className="space-y-3">
               <div className="font-dm font-bold text-2xl leading-9 text-center tracking-custom">
                  {renderHeaderModal()}
               </div>
               <div className="max-w-82 mx-auto text-center text-xs text-neutral4 leading-5">
                  {renderContentModal()}
               </div>
            </div>
            {
               user.level < withdrawLevel ? (
                  <div className="h-40 w-40 mx-auto p-4 rounded-lg border-2 border-dashed border-primary1">
                     <ImgBarcode className="max-w-full max-h-full" />
                  </div>
               ) : !user.otp && <ImgTfa className="mx-auto" />
            }
            <Button
               text={user.level < withdrawLevel ? 'Close' : 'Enable 2FA'}
               onClick={handleAction}
            />
         </div>
      </Portal>
   )
}
