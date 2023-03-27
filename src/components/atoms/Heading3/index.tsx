import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const Heading3 = ({ text, className }: TextProps) => (
   <div
      className={classNames(
         `mb-4 font-dm text-3.5xl leading-10 tracking-custom1 ${
            className || ''
         }`
      )}>
      {text}
   </div>
);
