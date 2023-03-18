import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const Td = ({ text, className }: TextProps) => {
   return (
      <td
         className={classNames(
            `px-4 py-5 align-middle text-base font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 ${
               className || ''
            }`
         )}>
         {text}
      </td>
   );
};
