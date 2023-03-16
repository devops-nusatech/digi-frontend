import React from 'react'
import { TextProps } from '../types';

export const TextXs = ({ text, className }: TextProps) => {
   return (
      <div className={`text-xs leading-custom4 text-neutral4 ${className}`}>
         {text}
      </div>
   );
};
