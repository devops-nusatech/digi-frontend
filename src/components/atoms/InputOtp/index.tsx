import React, { memo, useState, useCallback, CSSProperties, KeyboardEvent } from 'react';
import SingleInput from '../SingleInput';

export interface OTPInputProps {
   length: number;
   onChangeOTP: (otp: string) => any;
   onKeyPress?: (event: KeyboardEvent) => void;

   autoFocus?: boolean;
   isNumberInput?: boolean;
   disabled?: boolean;

   style?: CSSProperties;
   className?: string;

   inputStyle?: CSSProperties;
   inputClassName?: string;
}

export const InputOtp = memo((props: OTPInputProps) => {
   const {
      length,
      isNumberInput,
      autoFocus = true,
      disabled,
      onChangeOTP,
      onKeyPress,
      inputClassName,
      inputStyle,
      ...rest
   } = props;

   const [activeInput, setActiveInput] = useState(0);
   const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''));

   // Helper to return OTP from inputs
   const handleOtpChange = useCallback((otp: string[]) => {
      const otpValue = otp.join('');
      onChangeOTP(otpValue);
   }, [onChangeOTP]);

   // Helper to return value with the right type: 'text' or 'number'
   const getRightValue = useCallback((str: string) => {
      let changedValue = str;

      if (!isNumberInput || !changedValue) {
         return changedValue;
      }

      return Number(changedValue) >= 0 ? changedValue : '';
   }, [isNumberInput]);

   // Change OTP value at focussing input
   const changeCodeAtFocus = useCallback((str: string) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || '';
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
   }, [activeInput, handleOtpChange, otpValues]);

   // Focus `inputIndex` input
   const focusInput = useCallback((inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
   }, [length]);

   const focusPrevInput = useCallback(() => {
      focusInput(activeInput - 1);
   }, [activeInput, focusInput]);

   const focusNextInput = useCallback(() => {
      focusInput(activeInput + 1);
   }, [activeInput, focusInput]);

   // Handle onFocus input
   const handleOnFocus = useCallback((index: number) => () => {
      focusInput(index);
   }, [focusInput]);

   // Handle onChange value for each input
   const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
         e.preventDefault();
         return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
   }, [changeCodeAtFocus, focusNextInput, getRightValue]);

   // Handle onBlur input
   const onBlur = useCallback(() => {
      setActiveInput(-1);
   }, []);

   // Handle onKeyDown input
   const handleOnKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressedKey = e.key;

      switch (pressedKey) {
         case 'Backspace':
         case 'Delete': {
            e.preventDefault();
            if (otpValues[activeInput]) {
               changeCodeAtFocus('');
               // Update
               focusInput(activeInput - 1);
            } else {
               focusPrevInput();
            }
            break;
         }
         case 'ArrowLeft': {
            e.preventDefault();
            focusPrevInput();
            break;
         }
         case 'ArrowRight': {
            e.preventDefault();
            focusNextInput();
            break;
         }
         default: {
            if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
               e.preventDefault();
            }

            break;
         }
      }
   }, [activeInput, changeCodeAtFocus, focusInput, focusNextInput, focusPrevInput, otpValues]);

   const handleOnPaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
         .getData('text/plain')
         .trim()
         .slice(0, length - activeInput)
         .split('');
      if (pastedData) {
         let nextFocusIndex = 0;
         const updatedOTPValues = [...otpValues];
         updatedOTPValues.forEach((val, index) => {
            if (index >= activeInput) {
               const changedValue = getRightValue(pastedData.shift() || val);
               if (changedValue) {
                  updatedOTPValues[index] = changedValue;
                  nextFocusIndex = index;
               }
            }
         });
         setOTPValues(updatedOTPValues);
         handleOtpChange(updatedOTPValues);
         setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
      }
   }, [activeInput, getRightValue, length, otpValues]);

   return (
      <div {...rest} onKeyPress={onKeyPress}>
         {Array(length)
            .fill('')
            .map((_, index) => (
               <div className="grow-0 shrink-0 basis-[calc(16.6667%-16px)] w-[calc(16.6667%-16px)] my-0 mx-2">
                  <SingleInput
                     key={`SingleInput-${index}`}
                     type={isNumberInput ? 'number' : 'text'}
                     focus={activeInput === index}
                     value={otpValues && otpValues[index]}
                     autoFocus={autoFocus}
                     onFocus={handleOnFocus(index)}
                     onChange={handleOnChange}
                     onKeyDown={handleOnKeyDown}
                     onBlur={onBlur}
                     onPaste={handleOnPaste}
                     style={inputStyle}
                     className={
                        inputClassName ??
                        "w-full h-16 text-center font-dm text-3.5xl font-semibold bg-neutral8 dark:bg-neutral1 outline-none transition-all duration-300"
                     }
                     disabled={disabled}
                  />
                  <div className={`w-full rounded-lg h-1 ${otpValues[index] ? "bg-primary1" : "bg-primary1/30"}`} />
               </div>
            ))}
      </div>
   );
});
