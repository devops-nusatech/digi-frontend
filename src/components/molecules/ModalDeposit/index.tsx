import React, { FC } from 'react';
import * as QRCodeGenerator from 'qrcode.react';
import { InputGroup, Portal } from 'components';

interface ModalDepositProps {
   show: boolean;
   close: () => void;
   protocol: string;
   name: string;
   icon: JSX.Element;
   address: string;
   handleCopy: (target: string, message: string) => void;
   min_confirmations: number;
   min_deposit_amount: string;
}

export const ModalDeposit: FC<ModalDepositProps> = ({
   show,
   close,
   protocol,
   name,
   icon,
   address,
   handleCopy,
   min_confirmations,
   min_deposit_amount,
}) => {
   return (
      <Portal
         show={show}
         close={close}
         title={`Deposit ${name}`}
         info={`on ${protocol}`}
         zIndexBackdrop={1045}
         zIndexContent={1046}
         onClick={close}>
         {icon}
         <div className="space-y-3 text-center">
            <div className="text-base font-medium leading-normal">
               You need to generate a deposit address to make deposit {name}
            </div>
            <div className="text-xs leading-custom4 text-neutral4">
               Only send {protocol.toUpperCase()} to this address. Sending any
               other asset to this address may result in the loss of your
               deposit!
            </div>
         </div>
         <InputGroup
            label="Payment Address"
            value={!address ? 'Loading...' : address}
            icon={
               <svg
                  onClick={() => handleCopy(address, 'Address')}
                  className="h-6 w-6 -translate-x-0.5 cursor-copy fill-neutral4 group-hover:fill-neutral2">
                  <use xlinkHref="#icon-copy" />
               </svg>
            }
            readOnly
            info={`Minimum deposit ${min_deposit_amount} ${name?.toUpperCase()}`}
            infoAlt={`Confirmations ${min_confirmations}`}
            className="!bg-neutral7"
         />
         <div className="flex items-center justify-center">
            <div className="rounded-lg border-2 border-dashed border-primary1 p-4">
               <QRCodeGenerator
                  value={address || ''}
                  size={128}
                  renderAs="svg"
               />
            </div>
         </div>
         <div className="text-center text-x font-medium leading-[1.6] text-neutral4">
            Please be sure that the contract address is related to the tokens
            that you are depositing.
         </div>
      </Portal>
   );
};
