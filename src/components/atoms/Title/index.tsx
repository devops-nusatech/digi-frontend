import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const Title = ({ text, className }: TextProps) => (
   <div
      className={classNames(
         `text-2xl leading-custom2 tracking-custom1 ${className || ''}`
      )}>
      {text}
   </div>
);
