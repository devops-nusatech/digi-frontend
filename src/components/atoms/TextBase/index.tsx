import React, { FC } from 'react';
import { classNames } from 'helpers';
import { TextProps, Weight } from '../types';

const classes = {
   font: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
   },
};

interface TextBaseProps extends TextProps {
   font?: Weight;
}

export const TextBase: FC<TextBaseProps> = ({ font, text, className }) => {
   return (
      <div
         className={classNames(
            `text-base leading-normal ${font ? classes.font[font] : ''} ${
               className || ''
            }`
         )}>
         {text}
      </div>
   );
};

TextBase.defaultProps = {
   font: 'medium',
};
