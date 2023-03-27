import React, { ReactNode } from 'react';

export interface InputProps {
   type: string;
   label?: string;
   defaultLabel: string;
   handleChangeInput?: (value: string) => void;
   inputValue: string | number;
   handleFocusInput?: () => void;
   placeholder?: string;
   classNameLabel?: string;
   classNameInput?: string;
   autoFocus?: boolean;
   onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
   readOnly?: boolean;
   id?: string;
   handleClick?: (
      event: React.MouseEvent<HTMLInputElement, MouseEvent>
   ) => void;
   isDisabled?: boolean;
   labelVisible?: boolean;
   autoComplete?: string;
   name?: string;
   isIcon?: boolean;
   icRight?: string | JSX.Element;
   handleViewPass?: () => void;
   children?: ReactNode;
}

interface OnChangeEvent {
   target: {
      value: string;
   };
}
type Props = InputProps;

export const Input = ({
   label,
   labelVisible,
   placeholder,
   defaultLabel,
   inputValue,
   classNameLabel,
   type,
   autoFocus,
   readOnly,
   id,
   handleClick,
   isDisabled,
   onKeyPress,
   autoComplete,
   name,
   icRight,
   isIcon = false,
   handleChangeInput,
   handleFocusInput,
   handleViewPass,
   children,
}: Props) => {
   const handleChangeValue = (e: OnChangeEvent) => {
      handleChangeInput && handleChangeInput(e.target.value);
   };
   return (
      <div className="relative">
         {label && (
            <div>
               <label
                  className={`mb-3 text-xs font-bold uppercase leading-[1] text-[#B1B5C3] ${classNameLabel}`}>
                  {/* {(labelVisible || inputValue) && (label || defaultLabel)} */}
                  {label}
               </label>
            </div>
         )}
         <div className="relative">
            <input
               type={type}
               value={inputValue.toString()}
               placeholder={placeholder}
               autoFocus={autoFocus}
               onFocus={handleFocusInput}
               onBlur={handleFocusInput}
               onChange={e => handleChangeValue(e)}
               readOnly={readOnly}
               id={id}
               onClick={handleClick}
               disabled={isDisabled}
               onKeyPress={onKeyPress}
               autoComplete={autoComplete}
               name={name}
               className={`h-12 w-full appearance-none rounded-xl border-2 border-solid border-[#E6E8EC] py-0 px-4 text-sm font-medium leading-[1.71429] text-[#23262F] shadow-none outline-none transition-colors duration-300 focus:border-[#777e90] ${
                  isIcon && 'pr-12'
               }`}
            />
            {isIcon && (
               <button
                  onClick={handleViewPass}
                  type="button"
                  className="group absolute inset-y-0 right-0 w-12 cursor-default">
                  {icRight}
               </button>
            )}
         </div>
         {children}
      </div>
   );
};
