import React from 'react';
import { TextProps } from '../types';

export const TextBase = ({ text, className }: TextProps) => {
   return <div className={`text-base leading-normal ${className}`}>{text}</div>;
};
