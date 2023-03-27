import React from 'react';
import { TextProps } from '../types';

const classes = {
   theme: {
      positive: 'bg-chart1',
      negative: 'bg-primary4',
   },
};

type InfoProps = TextProps & {
   theme?: 'positive' | 'negative';
};

export const Info = ({ text, className, theme }: InfoProps) => {
   return (
      <div
         className={`inline-block rounded-xl ${
            classes.theme[theme!]
         } px-2 pt-1.75 pb-1.25 text-xs font-bold uppercase leading-none text-neutral8 ${
            className || ''
         }`}>
         {text}
      </div>
   );
};

Info.defaultProps = {
   theme: 'positive',
};
