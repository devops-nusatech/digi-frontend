import React, { forwardRef, KeyboardEvent } from 'react';

type type = 'text' | 'number';
interface InputOrder {
   titleLeft: string;
   titleRight: string;
   value?: any;
   type?: type;
   title?: string;
   alt?: string;
   readOnly?: boolean;
   disabled?: boolean;
   onChange?: (e: string) => void;
   onFocus?: (e?: any) => void;
   onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
   placeholder?: string;
   className?: string;
   maxLength?: number;
   classNameInfo?: string;
   info?: string;
   withError?: boolean;
}

type ref = HTMLInputElement;

export const InputOrder = forwardRef<ref, InputOrder>(
   (
      {
         titleLeft,
         titleRight,
         type,
         title,
         value,
         readOnly,
         disabled,
         onChange,
         onFocus,
         onKeyPress,
         placeholder,
         className,
         maxLength,
         classNameInfo,
         info,
         withError,
      },
      ref,
      ...rest
   ) => (
      <div className="space-y-2.5">
         <div
            className={`flex items-center rounded-xl px-4 py-0.5 ${
               withError
                  ? 'ring-2 ring-inset ring-primary4'
                  : 'shadow-input dark:shadow-input-dark'
            } cursor-pointer ${
               disabled &&
               'pointer-events-none select-none bg-neutral7 dark:bg-shade1'
            }`}>
            <div className="pointer-events-none font-medium text-neutral4">
               {titleLeft}
            </div>
            <input
               ref={ref}
               {...rest}
               maxLength={maxLength}
               type={type}
               value={value}
               title={title}
               onChange={({ target: { value } }) => onChange && onChange(value)}
               onFocus={onFocus}
               onKeyPress={onKeyPress}
               placeholder={placeholder}
               className={`m-0 h-11.5 grow border-none bg-neutral8 px-[10px] text-right font-medium outline-none dark:bg-shade2 ${
                  disabled &&
                  'pointer-events-none select-none bg-neutral7 placeholder:text-center placeholder:text-neutral3'
               } ${className}`}
               disabled={disabled}
               readOnly={readOnly}
            />
            <div className="pointer-events-none font-medium text-neutral4">
               {titleRight}
            </div>
         </div>
         {info && (
            <div
               className={`${classNameInfo ? classNameInfo : ''} ${
                  withError && 'text-primary4'
               } text-x font-medium leading-relaxed`}>
               {info}
            </div>
         )}
      </div>
   )
);

InputOrder.defaultProps = {
   type: 'text',
   readOnly: false,
   disabled: false,
};
