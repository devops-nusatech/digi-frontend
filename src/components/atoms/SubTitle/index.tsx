import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const SubTitle = ({ text, className }: TextProps) => (
   <div className={classNames(`text-base leading-normal ${className || ''}`)}>
      {text}
   </div>
);
