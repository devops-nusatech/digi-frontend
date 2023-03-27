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

type TextXsProps = TextProps & {
   font?: Weight;
   withColorDefault?: boolean;
};

export const TextXs = ({
   font,
   text,
   className,
   withColorDefault,
}: TextXsProps) => {
   return (
      <div
         className={classNames(`
         text-xs  ${font ? classes.font[font] : ''} ${
            withColorDefault ? 'text-neutral4' : ''
         } ${className || ''}`)}>
         {text}
      </div>
   );
};
TextXs.defaultProps = {
   withColorDefault: true,
   font: 'normal',
};
