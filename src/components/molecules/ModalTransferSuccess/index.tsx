import React, { FC } from 'react';
import { Button, Portal } from 'components';
import { FormattedMessage } from 'react-intl';

interface ModalTransferSuccessProps {
   show: boolean;
   close: () => void;
}

export const ModalTransferSuccess: FC<ModalTransferSuccessProps> = ({
   show,
   close,
}) => {
   return (
      <Portal
         show={show}
         close={close}>
         <div className="mt-10 space-y-8">
            <div className="text-center font-dm text-5xl font-bold leading-custom1 tracking-custom">
               Yay! 🎉
            </div>
            <div className="mx-auto max-w-71.25 text-center text-base font-medium leading-normal">
               <FormattedMessage id="page.modal.withdraw.success.message.content" />
            </div>
            <Button
               text="OK"
               onClick={close}
               width="full"
            />
         </div>
      </Portal>
   );
};
