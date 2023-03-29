import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const Heading1 = ({ text, className, withDark }: TextProps) => (
   <div
      className={classNames(
         `mb-5 break-words font-dm text-5xl tracking-custom md:text-64 md-max:leading-custom1 ${
            !withDark ? 'dark:text-neutral2' : ''
         } ${className || ''}`
      )}>
      {text}
   </div>
);
