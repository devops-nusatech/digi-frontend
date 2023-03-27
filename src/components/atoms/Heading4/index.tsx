import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const Heading4 = ({ text, className }: TextProps) => (
   <div
      className={classNames(
         `font-dm text-2xl leading-tight tracking-custom1 ${className || ''}`
      )}>
      {text}
   </div>
);
