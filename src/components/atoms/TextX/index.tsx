import React from 'react';
import { classNames } from 'helpers';
import { TextProps, Weight } from '../types';

const classes = {
   font: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
   },
};

type TextXProps = TextProps & {
   font?: Weight;
};

export const TextX = ({ font, text, className }: TextXProps) => {
   return (
      <div
         className={classNames(
            `text-x leading-[1.6] text-neutral4 ${
               font ? classes.font[font] : ''
            } ${className || ''}`
         )}>
         {text}
      </div>
   );
};

TextX.defaultProps = {
   font: 'medium',
};
