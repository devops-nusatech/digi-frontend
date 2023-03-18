import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const Th = ({ text, className }: TextProps) => {
   return (
      <th
         className={classNames(
            `px-4 py-6 text-start align-middle font-normal text-neutral4 ${
               className || ''
            }`
         )}>
         {text}
      </th>
   );
};
