import React, { FC } from 'react';
import { Button, Portal } from 'components';
import { FormattedMessage } from 'react-intl';

interface ModalWithdrawDoneProps {
   show: boolean;
   close: () => void;
}

export const ModalWithdrawDone: FC<ModalWithdrawDoneProps> = ({ show, close }) => {
   return (
      <Portal
         show={show}
         close={close}
      >
         <div className="mt-10 space-y-8">
            <div className="text-5xl text-center font-dm font-bold leading-custom1 tracking-custom">Yay! 🎉</div>
            <div className="max-w-65 mx-auto text-center text-base font-medium leading-normal">
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
