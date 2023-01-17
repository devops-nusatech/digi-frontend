import React, {
   FC,
   // useEffect,
   useState,
} from 'react';
import {
   Beneficiaries,
   Button,
   Decimal,
   InputGroup,
} from 'components';
import { Beneficiary } from 'modules';
import {
   cleanPositiveFloatInput,
   precisionRegExp,
} from 'helpers';
import { defaultBeneficiary } from 'screens/WalletDetails/types';

interface ModalWithdrawProps {
   type: 'coin' | 'fiat'
   name: string;
   currency: string;
   balance?: string;
   fixed: number;
   locked?: string;
   estimatedBalance?: string;
   estimatedCurrency?: string;
   fee: number;
   minimum?: string;
   limit?: string;
   onClick: (amount: string, total: string, beneficiary: Beneficiary, otpCode: string) => void;
   twoFactorAuthRequired?: boolean;
   withdrawDone?: boolean;
}

export const ModalWithdraw: FC<ModalWithdrawProps> = ({
   type,
   name,
   currency,
   balance,
   fixed,
   locked,
   fee,
   minimum,
   limit,
   onClick,
   withdrawDone
}) => {
   // const [selected, setSelected] = useState(beneficiaries[0]?.name || defaultBeneficiary?.name);
   // useEffect(() => {
   //    setState({
   //       ...state,
   //       amount: '',
   //       otpCode: '',
   //       total: '',
   //    })
   // }, [!withdrawDone || !JSON.stringify(currency)]);

   const [state, setState] = useState({
      amount: '',
      beneficiary: defaultBeneficiary,
      otpCode: '',
      total: '',
      withdrawAmountFocused: false,
      withdrawCodeFocused: false,
   });

   const { amount, otpCode, total, beneficiary } = state;

   const handleChangeBeneficiary = (value: Beneficiary) => setState({
      ...state,
      beneficiary: value,
   });

   const handleChangeAmount = (value: string) => {
      const convertedValue = cleanPositiveFloatInput(value);
      if (convertedValue.match(precisionRegExp(fixed))) {
         const amount = (convertedValue !== '') ? Number(parseFloat(convertedValue).toFixed(fixed)) : '';
         const total = (amount !== '') ? (amount - Number(fee)).toFixed(fixed) : '';
         setState({
            ...state,
            total: Number(total) > 0 ? total : (0).toFixed(fixed),
            amount: convertedValue
         });
      }
   }

   const handleChangeInputOtpCode = (otpCode: string) => setState({
      ...state,
      otpCode: otpCode.replace(/\D/g, '')
   });

   const handleClick = () => onClick(
      amount, total, beneficiary, otpCode
   );

   const isDisabled = (total: string, beneficiary: Beneficiary, otpCode: string) => {
      const isPending = beneficiary.state && beneficiary.state.toLowerCase() === 'pending';
      return Number(total) < 1 || isPending || otpCode.length < 6;
   };

   return (
      <>
         <Beneficiaries
            type={type}
            currency={currency}
            onChangeValue={handleChangeBeneficiary}
         />
         <div className="flex justify-between py-5 px-6 rounded bg-neutral7 dark:bg-neutral3">
            <div className="font-medium text-neutral3 dark:text-neutral6">
               Available <br /> balance
            </div>
            <div className="text-right">
               <div className="text-base font-medium">
                  {balance} {currency?.toUpperCase()}
               </div>
               <div className="text-neutral4">{locked} {currency?.toUpperCase()}</div>
            </div>
         </div>
         <InputGroup
            label="amount to withdraw"
            value={amount}
            info={`${minimum} ${currency?.toUpperCase()} daily withdrawal limit remaining.`}
            onChange={handleChangeAmount}
            autoFocus
         />
         <InputGroup
            label="otp code"
            value={otpCode}
            maxLength={6}
            onChange={handleChangeInputOtpCode}
         />
         <InputGroup
            label="transaction fee"
            placeholder={`${Decimal.format(fee, fixed, ',')} ${currency?.toUpperCase()}`}
            disabled
         />
         <InputGroup
            label="total"
            placeholder={`${Decimal.format(total, fixed, ',')} ${currency?.toUpperCase()}`}
            disabled
         />
         <Button
            text="Withdraw"
            onClick={handleClick}
            width="full"
            disabled={isDisabled(total, beneficiary, otpCode)}
         />
      </>
   );
};
