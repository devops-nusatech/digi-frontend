import React, { FC } from 'react';
import { Button, Portal } from 'components';

interface ModalWithdrawConfirmProps {
   total: string;
   currency: string;
   onSubmit: () => void;
   close: () => void;
   rid: string;
   show: boolean;
}

export const ModalWithdrawConfirm: FC<ModalWithdrawConfirmProps> = ({
   total,
   currency,
   onSubmit,
   close,
   rid,
   show,
}) => {
   return (
      <Portal
         close={close}
         show={show}
         zIndexBackdrop={1045}
         zIndexContent={1046}
         title="Confirmation"
      >
         <div className="flex justify-between py-5 px-6 rounded bg-neutral7 dark:bg-neutral3">
            <div className="font-medium text-neutral3 dark:text-neutral6">
               Currrency <br /> Total
            </div>
            <div className="text-right">
               <div className="text-base font-medium">
                  {currency?.toUpperCase()}
               </div>
               <div className="text-neutral4">{total}</div>
            </div>
         </div>
         <div>
            <div className="font-medium text-neutral3 dark:text-neutral6">
               Address
            </div>
            <div className="truncate">
               {rid}
            </div>
         </div>
         <Button
            text="Withdraw"
            width="full"
            onClick={onSubmit}
         />
      </Portal>
   )
}
