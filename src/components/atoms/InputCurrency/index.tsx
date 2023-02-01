import React, { FC, FocusEvent, KeyboardEvent } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

type type = 'text' | 'tel';

interface InputOrder extends NumericFormatProps {
   titleLeft: string;
   titleRight: string;
   value?: any;
   type?: type;
   title?: string;
   alt?: string;
   readOnly?: boolean;
   disabled?: boolean;
   onChange?: (e: any) => void;
   onFocus?: (e?: FocusEvent<HTMLInputElement>) => void;
   onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
   placeholder?: string;
   className?: string;
   classNameInfo?: string;
   info?: string;
   withError?: boolean;
}

export const InputCurrency: FC<InputOrder> = ({
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
   classNameInfo,
   info,
   withError,
   ...rest
}): JSX.Element => {
   return (
      <div className="space-y-2.5">
         <div className={`flex items-center px-4 py-0.5 rounded-xl ${withError ? 'ring-2 ring-primary4 ring-inset' : 'shadow-input dark:shadow-input-dark'} cursor-pointer ${disabled && 'bg-neutral7 dark:bg-shade1 pointer-events-none select-none'}`}>
            <div className="font-medium text-neutral4 pointer-events-none">
               {titleLeft}
            </div>
            <NumericFormat
               type={type}
               value={value}
               title={title}
               onChange={({ target: { value } }) => onChange && onChange(value)}
               onFocus={onFocus}
               onKeyPress={onKeyPress}
               placeholder={placeholder}
               className={`grow h-11.5 px-[10px] text-right font-medium outline-none m-0 border-none bg-neutral8 dark:bg-shade2 ${disabled && 'bg-neutral7 placeholder:text-center placeholder:text-neutral3 pointer-events-none select-none'} ${className}`}
               disabled={disabled}
               readOnly={readOnly}
               {...rest}
            />
            <div className="font-medium text-neutral4 pointer-events-none">
               {titleRight}
            </div>
         </div>
         {info && (
            <div className={`${classNameInfo ? classNameInfo : ''} ${withError && 'text-primary4'} text-x leading-relaxed font-medium`}>
               {info}
            </div>
         )}
      </div>
   )
}

InputCurrency.defaultProps = {
   type: 'text',
   readOnly: false,
   disabled: false,
   thousandSeparator: ','
}
