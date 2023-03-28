import React, {
   forwardRef,
   ButtonHTMLAttributes,
   ReactNode,
   useMemo,
   useCallback,
} from 'react';
import { classNames } from 'helpers';
import { Rounded, Size, Variant, Width, Color, ButtonType } from '../types';

const classes = {
   base: 'group inline-flex justify-center items-center leading-none cursor-pointer whitespace-nowrap transition ease-in-out duration-300',
   fontDM: 'font-dm',
   disabled: 'opacity-40 cursor-not-allowed hover:shadow-none',
   size: {
      small: 'h-8 rounded-20 px-4',
      normal: 'h-10 rounded-20 px-4',
      large: 'h-12 rounded-3xl px-6 text-base',
   },
   variant: {
      primary:
         'bg-primary1 text-neutral8 hover:bg-primary1/90 hover:shadow-xl disabled:hover:bg-primary1',
      green: 'bg-primary5 dark:bg-chart1 text-neutral8 hover:bg-my-green-h hover:shadow-xl disabled:hover:bg-primary5',
      orange:
         'bg-primary4 text-neutral8 hover:bg-my-orange-h hover:shadow-xl disabled:hover:bg-primary4',
      outline:
         'bg-none shadow-border hover:text-neutral8 hover:shadow-input-dark hover:bg-neutral2 hover:-translate-y-0.5 dark:hover:bg-neutral3 dark:hover:border-none dark:shadow-border-dark disabled:translate-y-0',
      dark: 'bg-neutral2 text-neutral8 dark:bg-neutral3',
   },
   color: {
      orange: 'text-primary4',
      yellow: 'text-secondary3',
      primary: 'text-primary1',
   },
   rounded: {
      'sm': '!rounded-sm',
      'defualt': '!rounded',
      'md': '!rounded-md',
      'lg': '!rounded-lg',
      'xl': '!rounded-xl',
      '1xl': '!rounded-1xl',
      '2xl': '!rounded-2xl',
      '3xl': '!rounded-3xl',
      '4xl': '!rounded-4xl',
      '5xl': '!rounded-5xl',
      'full': '!rounded-full',
      20: '!rounded-20',
   },
   width: {
      full: 'w-full',
      noFull: '',
   },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   text: ReactNode | string;
   type?: ButtonType;
   size?: Size;
   variant?: Variant;
   width?: Width;
   color?: Color;
   rounded?: Rounded;
   icLeft?: JSX.Element;
   icRight?: JSX.Element;
   fontDM?: boolean;
   withLoading?: boolean;
}

type Ref = HTMLButtonElement;

export const Button = forwardRef<Ref, ButtonProps>(
   (
      {
         text,
         type,
         size,
         variant,
         width,
         className,
         color,
         disabled,
         rounded,
         fontDM,
         onClick,
         children,
         icLeft,
         icRight,
         withLoading,
      },
      ref
   ) => {
      const renderWithLoading = useMemo(
         () =>
            withLoading && (
               <svg
                  className={`-ml-1 mr-3 h-5 w-5 animate-spin ${
                     variant === 'outline'
                        ? 'text-neutral2 group-hover:text-neutral8 dark:text-neutral8'
                        : 'text-neutral8'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                     className="opacity-25"
                     cx="12"
                     cy="12"
                     r="10"
                     stroke="currentColor"
                     strokeWidth="4"
                  />
                  <path
                     className="opacity-75"
                     fill="currentColor"
                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
               </svg>
            ),
         [variant, withLoading]
      );

      const handleOnClick = useCallback(
         (e: any) => {
            onClick && onClick(e);
         },
         [onClick]
      );
      return (
         <button
            ref={ref}
            type={type}
            onClick={handleOnClick}
            className={classNames(`
               ${classes.base || ''}
               ${classes.size[size!] || ''}
               ${classes.variant[variant!] || ''}
               ${classes.width[width!] || ''}
               ${classes.color[color!] || ''}
               ${rounded ? classes.rounded[rounded] : ''}
               ${fontDM ? classes.fontDM : ''}
               ${disabled ? classes.disabled : ''}
               ${withLoading ? `!cursor-progress ${classes.disabled}` : ''}
               ${className || ''}
           `)}>
            {renderWithLoading}
            {icLeft}
            <span>{text ?? children}</span>
            {icRight}
         </button>
      );
   }
);

Button.defaultProps = {
   variant: 'primary',
   type: 'button',
   size: 'large',
   width: 'full',
   withLoading: false,
   fontDM: true,
};
