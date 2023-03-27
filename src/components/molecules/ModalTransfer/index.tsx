import React, { useState } from 'react';
import { Button, Decimal, InputGroup, ModalTransferConfirm } from 'components';
import { cleanPositiveFloatInput, precisionRegExp } from 'helpers';

interface ModalTransferProps {
   fixed: number;
   balance: string;
   currency: string;
   handleTransfer: (receiver: string, amount: string, otp: string) => void;
}

type ModalTransferState = {
   receiver: string;
   amount: string;
   otp: string;
   isShowTransferConfirm: boolean;
   isShowTransferSuccess: boolean;
};

export const ModalTransfer = ({
   fixed,
   handleTransfer,
   balance,
   currency,
}: ModalTransferProps) => {
   const [state, setState] = useState<ModalTransferState>({
      receiver: '',
      amount: '',
      otp: '',
      isShowTransferConfirm: false,
      isShowTransferSuccess: false,
   });
   const { receiver, amount, otp, isShowTransferConfirm } = state;

   const handleChangeReceiver = (receiver: string) => {
      setState({ ...state, receiver });
   };
   const handleChangeAmount = (value: string) => {
      const convertedValue = cleanPositiveFloatInput(value);
      if (convertedValue.match(precisionRegExp(fixed))) {
         setState({ ...state, amount: convertedValue });
      }
   };
   const handleChangeOTP = (otp: string) => {
      setState({ ...state, otp: otp.replace(/\D/g, '') });
   };

   const isDisabled = () => {
      return !Boolean(receiver) || !Boolean(amount) || Number(otp.length) < 6;
   };

   const handleToggleConfirm = () =>
      setState({ ...state, isShowTransferConfirm: !isShowTransferConfirm });

   const handleConfirm = () => {
      handleTransfer(receiver, amount, otp);
   };

   const renderContent = () => {
      return (
         <>
            <InputGroup
               label="receiver uid / username"
               value={receiver}
               onChange={handleChangeReceiver}
               autoFocus
            />
            <InputGroup
               label="transfer amount"
               value={amount}
               onChange={handleChangeAmount}
               info={`Available ${balance} ${currency?.toUpperCase()}`}
            />
            <InputGroup
               label="2FA code"
               value={otp}
               onChange={handleChangeOTP}
               maxLength={6}
            />
            <Button
               text="Transfer"
               width="full"
               onClick={handleToggleConfirm}
               disabled={isDisabled()}
            />
         </>
      );
   };

   const renderModalConfirm = () => {
      return (
         <ModalTransferConfirm
            show={isShowTransferConfirm}
            close={handleToggleConfirm}
            currency={currency}
            receiver={receiver}
            total={Decimal.format(amount, fixed, ',')}
            onSubmit={handleConfirm}
         />
      );
   };

   return (
      <>
         {renderContent()}
         {renderModalConfirm()}
      </>
   );
};
