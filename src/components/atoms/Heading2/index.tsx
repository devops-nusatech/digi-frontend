import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const Heading2 = ({ text, className }: TextProps) => (
   <div
      className={classNames(
         `font-dm text-4.5xl leading-1.2 tracking-custom1 md:text-5xl md:leading-custom1 md:tracking-custom ${
            className || ''
         }`
      )}>
      {text}
   </div>
);
