import React, {
   KeyboardEvent,
   forwardRef,
   FocusEvent,
   useState,
   ChangeEvent,
   useMemo,
   useCallback,
} from 'react';
import { classNames } from 'helpers';
import { InputType, Size, Variant, Width } from '../types';

const classes = {
   base: 'px-3.5 rounded-xl font-medium leading-12 outline-none border-2 border-neutral6 dark:border-neutral3 bg-none bg-transparent shadow-none transition ease-in-out duration-300',
   icon: 'pr-12',
   disabled:
      'cursor-not-allowed disabled:bg-neutral7 dark:disabled:bg-neutral2',
   size: {
      small: '',
      normal: 'h-10',
      large: 'h-12',
   },
   variant: {
      primary: 'focus:border-primary1',
      green: '',
      orange: '',
      outline: 'focus:border-neutral4 dark:focus:border-neutral4',
   },
   width: {
      full: 'w-full',
      noFull: '',
   },
   withError: '!border-primary4',
};

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
   onClickInput?: (e: any) => void;
   withIconPassword?: boolean;
   withIconReset?: boolean;
   withIconSearch?: boolean;
   onClickResetEmail?: () => void;
   withError?: boolean;
   disabled?: boolean;
   readOnly?: boolean;
   tabIndex?: number;
   maxLength?: number;
   minLength?: number;
   autoComplete?: 'on' | 'off';
   required?: boolean;
   withLabelAlt?: boolean;
}

export const InputGroup = forwardRef<Ref, InputGroupProps>(
   (
      {
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
         onClickInput,
         withIconPassword,
         withIconReset,
         withIconSearch,
         onClickResetEmail,
         withError,
         disabled,
         readOnly,
         tabIndex,
         maxLength,
         minLength,
         autoComplete,
         required,
         withLabelAlt,
      },
      ref
   ) => {
      const [showPassword, setShowPassword] = useState(false);
      const handleShowPassword = useCallback(
         () => setShowPassword(!showPassword),
         [showPassword]
      );

      const renderTypePassword = useMemo(
         () => (showPassword ? 'text' : 'password'),
         [showPassword]
      );
      const inputType = useMemo(
         () => (withIconPassword ? renderTypePassword : type),
         [renderTypePassword, type, withIconPassword]
      );

      const renderIconEyeOpen = useMemo(
         () => (
            <svg className="h-6 w-6 fill-neutral5 transition-colors duration-500 hover:fill-neutral4 dark:fill-neutral4 dark:hover:fill-neutral5">
               <use xlinkHref="#icon-eye" />
            </svg>
         ),
         []
      );
      const renderIconEyeClose = useMemo(
         () => (
            <svg className="h-6 w-6 fill-neutral5 transition-colors duration-500 hover:fill-neutral4 dark:fill-neutral4 dark:hover:fill-neutral5">
               <use xlinkHref="#icon-eye-close" />
            </svg>
         ),
         []
      );
      const renderIconReset = useMemo(
         () => (
            <svg
               onClick={onClickResetEmail}
               className="h-6 w-6 fill-neutral5 transition-colors duration-500 hover:fill-neutral4 dark:fill-neutral4 dark:hover:fill-neutral5">
               <use xlinkHref="#icon-close-circle" />
            </svg>
         ),
         [onClickResetEmail]
      );
      const renderIconSearch = useMemo(
         () => (
            <svg className="h-5 w-5 fill-neutral4 transition-colors duration-300">
               <use xlinkHref="#icon-search" />
            </svg>
         ),
         []
      );

      const renderLabel = useMemo(
         () =>
            (label || withLabelAlt) && (
               <div
                  className={`${!withLabelAlt ? 'leading-none' : ''} ${
                     parentClassNameLabel || ''
                  }`}>
                  <label
                     htmlFor={id}
                     className={`${
                        !withLabelAlt
                           ? 'text-xs font-bold uppercase leading-none text-neutral5'
                           : 'font-medium'
                     } ${lableClassName || ''}`}>
                     {label}
                  </label>
               </div>
            ),
         [id, label, lableClassName, parentClassNameLabel, withLabelAlt]
      );
      const renderWithButton = useMemo(
         () =>
            (withIconPassword || withIconReset || withIconSearch || icon) && (
               <button
                  type="button"
                  onClick={onClick || handleShowPassword}
                  className={`group absolute top-0 right-0 ${
                     classes.size[size!]
                  } ${
                     size === 'small'
                        ? 'w-8'
                        : size === 'normal'
                        ? 'w-10'
                        : 'w-12'
                  } flex items-center justify-center bg-none text-center transition-all duration-300`}
                  tabIndex={-1}>
                  {withIconPassword
                     ? showPassword
                        ? renderIconEyeClose
                        : renderIconEyeOpen
                     : withIconReset
                     ? renderIconReset
                     : withIconSearch
                     ? renderIconSearch
                     : icon}
               </button>
            ),
         [
            handleShowPassword,
            icon,
            onClick,
            renderIconEyeClose,
            renderIconEyeOpen,
            renderIconReset,
            renderIconSearch,
            showPassword,
            size,
            withIconPassword,
            withIconReset,
            withIconSearch,
         ]
      );
      const renderInfo = useMemo(
         () =>
            (info || infoAlt) && (
               <div
                  className={`flex justify-between ${
                     parentClassNameInfo || ''
                  }`}>
                  {info && (
                     <div
                        className={`${classNameInfo || ''} ${
                           withError && 'text-primary4'
                        } text-x font-medium leading-relaxed`}>
                        {info}
                     </div>
                  )}
                  {infoAlt && (
                     <div className="text-x font-medium leading-relaxed text-neutral4">
                        {infoAlt}
                     </div>
                  )}
               </div>
            ),
         [classNameInfo, info, infoAlt, parentClassNameInfo, withError]
      );

      return (
         <div className={`space-y-2.5 ${parentClassName || ''}`}>
            {renderLabel}
            <div className="relative">
               <input
                  ref={ref}
                  id={id}
                  name={name}
                  type={inputType}
                  value={value}
                  defaultValue={defaultValue}
                  autoFocus={autoFocus}
                  onChange={e =>
                     (onChange && onChange(e.target.value)) ||
                     (onChangeAlt && onChangeAlt(e))
                  }
                  onFocus={onFocus}
                  onFocusCapture={onFocusCapture}
                  onBlur={onBlur}
                  onBlurCapture={onBlurCapture}
                  onKeyPress={onKeyPress}
                  onClick={onClickInput}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  disabled={disabled}
                  tabIndex={tabIndex}
                  maxLength={maxLength}
                  minLength={minLength}
                  autoComplete={autoComplete}
                  required={required}
                  className={classNames(`
                     ${classes.base}
                     ${
                        (icon ||
                           withIconPassword ||
                           withIconReset ||
                           withIconSearch) &&
                        size === 'small'
                           ? 'pr-8'
                           : size === 'normal'
                           ? 'pr-10'
                           : 'pr-12'
                     }
                     ${classes.size[size!]}
                     ${classes.variant[variant!]}
                     ${classes.width[width!]}
                     ${disabled ? classes.disabled : ''}
                     ${withError ? classes.withError : ''}
                     ${withIconPassword ? classes.icon : ''}
                     ${className || ''}
                  `)}
               />
               {renderWithButton}
            </div>
            {renderInfo}
         </div>
      );
   }
);

InputGroup.defaultProps = {
   type: 'text',
   width: 'full',
   size: 'large',
   variant: 'outline',
   classNameInfo: 'text-neutral4',
};
