import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const Heading1 = ({ text, className, withDark }: TextProps) => (
   <div
      className={classNames(
         `mb-5 font-dm text-5xl leading-custom1 md:text-64 md:leading-none md:tracking-custom ${!withDark ? 'dark:text-neutral2' : ''} ${
            className || ''
         }`
      )}>
      {text}
   </div>
);
