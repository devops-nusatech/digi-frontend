import React, {
   KeyboardEvent,
   forwardRef,
   FocusEvent,
   useState,
   ChangeEvent,
} from 'react';
import { InputType, Size, Variant, Width } from '../types';
import { classNames } from 'helpers';

const classes = {
   base: 'px-3.5 rounded-xl font-medium leading-12 outline-none border-2 border-neutral6 dark:border-neutral3 bg-none bg-transparent shadow-none transition ease-in-out duration-300',
   icon: 'pr-12',
   disabled: 'cursor-not-allowed disabled:bg-neutral7 dark:disabled:bg-neutral2',
   size: {
      small: '',
      normal: 'h-10',
      large: 'h-12'
   },
   variant: {
      primary: 'focus:border-primary1',
      green: '',
      orange: '',
      outline: 'focus:border-neutral4 dark:focus:border-neutral4'
   },
   width: {
      full: 'w-full',
      noFull: ''
   },
   withError: '!border-primary4',
}

type Ref = HTMLInputElement;

interface InputGroupProps {
   id?: string;
   name?: string;
   label?: string;
   info?: string;
   infoAlt?: string;
   type?: InputType;
   size?: Size;
   parentClassName?: string;
   lableClassName?: string;
   className?: string;
   iconClassName?: string;
   parentClassNameLabel?: string;
   parentClassNameInfo?: string;
   classNameInfo?: string;
   placeholder?: string;
   value?: string | number;
   defaultValue?: string | number;
   variant?: Variant;
   width?: Width;
   icon?: JSX.Element;
   autoFocus?: boolean;
   onChangeAlt?: (e: ChangeEvent<Ref>) => void;
   onChange?: (value: string) => void;
   onFocus?: (e?: FocusEvent<Ref>) => void;
   onFocusCapture?: (e?: FocusEvent<Ref>) => void;
   onBlur?: (e?: FocusEvent<Ref>) => void;
   onBlurCapture?: (e?: FocusEvent<Ref>) => void;
   onKeyPress?: (e: KeyboardEvent<Ref>) => void;
   onClick?: (e: any) => void;
   withIconPassword?: boolean;
   withIconReset?: boolean;
   onClickResetEmail?: () => void;
   withError?: boolean;
   disabled?: boolean;
   readOnly?: boolean;
   tabIndex?: number;
   maxLength?: number;
   minLength?: number;
   autoComplete?: 'on' | 'off';
}

export const InputGroup = forwardRef<Ref, InputGroupProps>(({
   id,
   name,
   label,
   info,
   infoAlt,
   type,
   size,
   parentClassName,
   lableClassName,
   className,
   iconClassName,
   parentClassNameLabel,
   parentClassNameInfo,
   classNameInfo,
   placeholder,
   value,
   defaultValue,
   variant,
   width,
   icon,
   autoFocus,
   onChangeAlt,
   onChange,
   onFocus,
   onFocusCapture,
   onBlur,
   onBlurCapture,
   onKeyPress,
   onClick,
   withIconPassword,
   withIconReset,
   onClickResetEmail,
   withError,
   disabled,
   readOnly,
   tabIndex,
   maxLength,
   minLength,
   autoComplete
}, ref, ...rest) => {
   const [showPassword, setShowPassword] = useState(false);
   const handleShowPassword = () => setShowPassword(!showPassword);

   const renderTypePassword = showPassword ? 'text' : 'password';
   const inputType = withIconPassword ? renderTypePassword : type;

   const renderIconEyeOpen = () => (
      <svg className="w-6 h-6 fill-neutral5 dark:fill-neutral4 hover:fill-neutral4 dark:hover:fill-neutral5 transition-colors duration-500">
         <use xlinkHref="#icon-eye" />
      </svg>
   );
   const renderIconEyeClose = () => (
      <svg className="w-6 h-6 fill-neutral5 dark:fill-neutral4 hover:fill-neutral4 dark:hover:fill-neutral5 transition-colors duration-500">
         <use xlinkHref="#icon-eye-close" />
      </svg>
   );
   const renderIconReset = () => (
      <svg
         onClick={onClickResetEmail}
         className="w-6 h-6 fill-neutral5 dark:fill-neutral4 hover:fill-neutral4 dark:hover:fill-neutral5 transition-colors duration-500"
      >
         <use xlinkHref="#icon-close-circle" />
      </svg>
   )

   const renderLabel = () => label && (
      <div className={`leading-none ${parentClassNameLabel ? parentClassNameLabel : ''}`}>
         <label htmlFor={id} className={`text-xs text-neutral5 ${lableClassName} leading-none font-bold uppercase`}>
            {label}
         </label>
      </div>
   );
   const renderWithButton = () => (withIconPassword || withIconReset || icon) && (
      <button
         type="button"
         onClick={onClick || handleShowPassword}
         className={`group absolute top-0 right-0 ${classes.size[String(size)]} w-12 ${iconClassName} bg-none flex items-center justify-center text-center transition-all duration-300`}
         tabIndex={-1}
      >
         {withIconPassword ? (
            showPassword ? renderIconEyeClose() : renderIconEyeOpen()
         ) : withIconReset ? renderIconReset() : icon}
      </button>
   )
   const renderInfo = () => (info || infoAlt) && (
      <div className={`flex justify-between ${parentClassNameInfo ? parentClassNameInfo : ''}`}>
         {info && (
            <div className={`${classNameInfo ? classNameInfo : ''} ${withError && 'text-primary4'} text-x leading-relaxed font-medium`}>
               {info}
            </div>
         )}
         {infoAlt && (
            <div className="text-x leading-relaxed font-medium text-neutral4">
               {infoAlt}
            </div>
         )}
      </div>
   );

   return (
      <div className={`space-y-2.5 ${parentClassName ? parentClassName : ''}`}>
         {renderLabel()}
         <div className="relative">
            <input
               ref={ref}
               id={id}
               name={name}
               type={inputType}
               value={value}
               defaultValue={defaultValue}
               autoFocus={autoFocus}
               onChange={e => onChange && onChange(e.target.value) || onChangeAlt && onChangeAlt(e)}
               onFocus={onFocus}
               onFocusCapture={onFocusCapture}
               onBlur={onBlur}
               onBlurCapture={onBlurCapture}
               onKeyPress={onKeyPress}
               placeholder={placeholder}
               readOnly={readOnly}
               disabled={disabled}
               tabIndex={tabIndex}
               maxLength={maxLength}
               minLength={minLength}
               autoComplete={autoComplete}
               className={
                  classNames(`
                     ${classes.base}
                     ${icon ? classes.icon : ''}
                     ${classes.size[String(size)]}
                     ${classes.variant[String(variant)]}
                     ${classes.width[String(width)]}
                     ${disabled ? classes.disabled : ''}
                     ${withError ? classes.withError : ''}
                     ${withIconPassword ? classes.icon : ''}
                     ${className ? className : ''}
                  `)
               }
               {...rest}
            />
            {renderWithButton()}
         </div>
         {renderInfo()}
      </div>
   )
});

InputGroup.defaultProps = {
   type: 'text',
   width: 'full',
   size: 'large',
   variant: "outline",
   classNameInfo: 'text-neutral4'
}
