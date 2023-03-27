import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const Small = ({ text, className }: TextProps) => (
   <div className={classNames(`text-xs text-neutral4 ${className || ''}`)}>
      {text}
   </div>
);
