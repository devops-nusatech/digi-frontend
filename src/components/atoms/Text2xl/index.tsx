import React from 'react';
import { TextProps, Weight } from '../types';

const classes = {
   font: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
   },
};

interface Text2xlProps extends TextProps {
   font?: Weight;
}

export const Text2xl = ({ font, text, className }: Text2xlProps) => {
   return (
      <div
         className={`text-2xl ${
            font ? classes.font[font!] : ''
         } tracking-custom1 ${className || ''}`}>
         {text}
      </div>
   );
};

Text2xl.defaultProps = {
   font: 'semibold',
};
