import React from 'react';
import { classNames } from 'helpers';
import { TChildren } from '../types';

export const FlexCenter = ({ children, className }: TChildren) => (
   <div className={classNames(`flex items-center ${className || ''}`)}>
      {children}
   </div>
);
