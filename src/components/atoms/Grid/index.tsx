import React from 'react';
import { classNames } from 'helpers';
import { TChildren } from '../types';

export const Grid = ({ children, className }: TChildren) => (
   <div className={classNames(`grid ${className || ''}`)}>{children}</div>
);
