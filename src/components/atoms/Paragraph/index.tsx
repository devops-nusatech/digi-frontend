import React from 'react';
import { classNames } from 'helpers';
import { TextProps } from '../types';

export const Paragraph = ({ text, className }: TextProps) => (
   <div className={classNames(`text-neutral4 ${className || ''}`)}>{text}</div>
);
