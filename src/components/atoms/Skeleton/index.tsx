import { classNames } from 'helpers';
import React, { forwardRef } from 'react';
import { Rounded } from '../types';

const classes = () => ({
   base: 'bg-neutral6 dark:bg-neutral4 animate-pulse transition-all duration-500',
   rounded: {
      'sm': 'rounded-sm',
      'defualt': 'rounded',
      'md': 'rounded-md',
      'lg': 'rounded-lg',
      'xl': 'rounded-xl',
      '1xl': 'rounded-1xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      '4xl': 'rounded-4xl',
      '5xl': 'rounded-5xl',
      'full': 'rounded-full',
      20: 'rounded-20',
   },
   isWithFull: 'w-full',
   isHeightFull: 'h-full',
});

type SkeletonProps = {
   width?: number | string;
   height?: number | string;
   rounded?: Rounded;
   isWithFull?: boolean;
   isHeightFull?: boolean;
   className?: string;
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
   ({ width, height, rounded, isWithFull, isHeightFull, className }, ref) => {
      return (
         <div
            ref={ref}
            style={{ width, height }}
            className={classNames(`
               ${classes().base}
               ${isWithFull ? classes().isWithFull : ''}
               ${isHeightFull ? classes().isHeightFull : ''}
               ${classes().rounded[String(rounded)]}
               ${className || ''}
            `)}
         />
      );
   }
);

Skeleton.defaultProps = {
   rounded: 'defualt',
};
