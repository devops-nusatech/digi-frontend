import React from 'react';
import { TextProps } from '../types';

export const Text2xl = ({ text, className }: TextProps) => {
   return (
      <div
         className={`text-2xl font-semibold leading-custom2 tracking-custom1 ${
            className || ''
         }`}>
         {text}
      </div>
   );
};
