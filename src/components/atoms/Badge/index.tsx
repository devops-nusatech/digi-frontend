import React, { FC } from 'react'
import { classNames } from 'helpers';
import { Variant, Rounded } from '../types';

const classes = {
   base: 'inline-block pt-2 pb-1.5 px-2 rounded text-xs font-bold uppercase text-neutral8 leading-none',
   variant: {
      primary: 'bg-primary1 text-neutral8 hover:bg-primary1/90 hover:shadow-xl disabled:hover:bg-primary1',
      green: 'bg-primary5 dark:bg-chart1',
      orange: 'bg-primary4',
      outline: 'bg-none shadow-border hover:text-neutral8 hover:shadow-input-dark hover:bg-neutral2 hover:-translate-y-0.5 dark:hover:bg-neutral3 dark:hover:border-none dark:shadow-border-dark disabled:translate-y-0',
      ungu: 'bg-primary3'
   },
   rounded: {
      sm: 'rounded-sm',
      defualt: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '1xl': 'rounded-1xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      '4xl': 'rounded-4xl',
      '5xl': 'rounded-5xl',
      full: 'rounded-full',
      20: 'rounded-20',
   },
}

interface BadgeProps {
   variant?: Variant;
   text: string;
   className?: string;
   rounded?: Rounded;
   children?: JSX.Element;
}

export const Badge: FC<BadgeProps> = ({
   variant,
   text,
   className,
   rounded,
   children,
}) => (
   <div className={
      classNames(`
         ${classes.base}
         ${classes.variant[String(variant)]}
         ${classes.rounded[String(rounded)]}
         ${className}
      `)
   }>
      {text || children}
   </div>
);

Badge.defaultProps = {
   variant: 'primary'
}
