// import * as React from 'react';

// const RE_DIGIT = new RegExp(/^\d+$/);

// type InputOtp2Props = {
//    value: string;
//    onChange: (value: string) => void;
//    valueLength: number;
// }

// export const InputOtp2 = ({
//    value,
//    onChange,
//    valueLength
// }: InputOtp2Props) => {
//    const valueItems = React.useMemo(() => {
//       const valueArray = value.split('');
//       const items: Array<string> = [];

//       for (let i = 0; i < valueLength; i++) {
//          const char = valueArray[i];
//          RE_DIGIT.test(char) ? items.push(char) : items.push('');
//       }

//       return items;
//    }, [value, valueLength]);

//    const handleFocusToNextInput = (target: HTMLElement) => {
//       const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;
//       if (nextElementSibling) nextElementSibling.focus();
//    }
//    const handleFocusToPrevInput = (target: HTMLElement) => {
//       const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;
//       if (previousElementSibling) previousElementSibling.focus();
//    }

//    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//       const target = e.target;
//       let targetValue = target.value.trim();
//       const isTargetValueDigit = RE_DIGIT.test(targetValue);

//       if (!isTargetValueDigit && targetValue !== '') return;

//       const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

//       // only delete digit if next input element has no value
//       if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') return;

//       targetValue = isTargetValueDigit ? targetValue : '';

//       const targetValueLength = targetValue.length;
//       if (targetValueLength === 1) {
//          const newValue = value.substring(0, index) + targetValue + value.substring(index + 1);
//          onChange(newValue);

//          if (!isTargetValueDigit) return;

//          handleFocusToNextInput(target);
//       } else if (targetValueLength === valueLength) {
//          onChange(targetValue)
//          target.blur();
//       }
//    }

//    const handleKeydownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
//       const { key } = e;
//       const target = e.target as HTMLInputElement;

//       if (key === 'ArrowRight' || key === 'ArrowDown') {
//          e.preventDefault();
//          return handleFocusToNextInput(target);
//       }
//       if (key === 'ArrowLeft' || key === 'ArrowUp') {
//          e.preventDefault();
//          return handleFocusToPrevInput(target);
//       }

//       const targetValue = target.value;

//       // keep the selection range position
//       // if the same digit was typed
//       target.setSelectionRange(0, targetValue.length);

//       if (key !== 'Backspace' || targetValue !== '') return;

//       handleFocusToPrevInput(target);
//    };

//    const handleFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
//       const { target } = e;

//       // keep focusing back until previous input
//       // element has value
//       const prevInputEl = target.previousElementSibling as HTMLInputElement | null;

//       if (prevInputEl && prevInputEl.value === '') return prevInputEl.focus();

//       target.setSelectionRange(0, target.value.length);
//    }

//    return (
//       <div className="relative">
//          {valueItems.map((digit, index) => (
//             <input
//                key={index}
//                type="text"
//                inputMode="numeric"
//                autoComplete="one-time-code"
//                pattern="\d{1}"
//                maxLength={valueLength}
//                className="otp-input"
//                value={digit}
//                onChange={e => handleChangeInput(e, index)}
//                onKeyDown={handleKeydownInput}
//                onFocus={handleFocusInput}
//             />
//          ))}
//       </div>
//    )
// }

import React, { useMemo } from 'react';

const RE_DIGIT = new RegExp(/^\d+$/);

type Props = {
   value: string;
   valueLength: number;
   onChange: (value: string) => void;
};

export const InputOtp2 = ({ value, valueLength, onChange }: Props) => {
   const valueItems = useMemo(() => {
      const valueArray = value.split('');
      const items: Array<string> = [];

      for (let i = 0; i < valueLength; i++) {
         const char = valueArray[i];

         if (RE_DIGIT.test(char)) {
            items.push(char);
         } else {
            items.push('');
         }
      }

      return items;
   }, [value, valueLength]);

   const focusToNextInput = (target: HTMLElement) => {
      const nextElementSibling =
         target.nextElementSibling as HTMLInputElement | null;

      if (nextElementSibling) {
         nextElementSibling.focus();
      }
   };
   const focusToPrevInput = (target: HTMLElement) => {
      const previousElementSibling =
         target.previousElementSibling as HTMLInputElement | null;

      if (previousElementSibling) {
         previousElementSibling.focus();
      }
   };
   const inputOnChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      idx: number
   ) => {
      const target = e.target;
      let targetValue = target.value.trim();
      const isTargetValueDigit = RE_DIGIT.test(targetValue);

      if (!isTargetValueDigit && targetValue !== '') {
         return;
      }

      const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

      // only delete digit if next input element has no value
      if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
         return;
      }

      targetValue = isTargetValueDigit ? targetValue : ' ';

      const targetValueLength = targetValue.length;

      if (targetValueLength === 1) {
         const newValue =
            value.substring(0, idx) + targetValue + value.substring(idx + 1);

         onChange(newValue);

         if (!isTargetValueDigit) {
            return;
         }

         focusToNextInput(target);
      } else if (targetValueLength === valueLength) {
         onChange(targetValue);

         target.blur();
      }
   };
   const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;
      const target = e.target as HTMLInputElement;

      if (key === 'ArrowRight' || key === 'ArrowDown') {
         e.preventDefault();
         return focusToNextInput(target);
      }

      if (key === 'ArrowLeft' || key === 'ArrowUp') {
         e.preventDefault();
         return focusToPrevInput(target);
      }

      const targetValue = target.value;

      // keep the selection range position
      // if the same digit was typed
      target.setSelectionRange(0, targetValue.length);

      if (e.key !== 'Backspace' || targetValue !== '') {
         return;
      }

      focusToPrevInput(target);
   };
   const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      const { target } = e;

      // keep focusing back until previous input
      // element has value
      const prevInputEl =
         target.previousElementSibling as HTMLInputElement | null;

      if (prevInputEl && prevInputEl.value === '') {
         return prevInputEl.focus();
      }

      target.setSelectionRange(0, target.value.length);
   };

   return (
      <div className="-mx-2 flex">
         {valueItems.map((digit, idx) => (
            <>
               <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d{1}"
                  maxLength={valueLength}
                  className="my-0 mx-2 h-16 w-[calc(16.6667%-16px)] shrink-0 grow-0 basis-[calc(16.6667%-16px)] bg-neutral8 text-center font-dm text-3.5xl font-semibold outline-none transition-all duration-300 dark:bg-neutral1"
                  value={digit}
                  onChange={e => inputOnChange(e, idx)}
                  onKeyDown={inputOnKeyDown}
                  onFocus={inputOnFocus}
               />
               <div
                  className={`h-1 w-full rounded-lg ${
                     digit[idx] ? 'bg-primary1' : 'bg-primary1/30'
                  }`}
               />
            </>
         ))}
      </div>
   );
};
