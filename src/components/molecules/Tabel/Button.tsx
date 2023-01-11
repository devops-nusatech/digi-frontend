import React, { FC, ReactNode } from 'react';

export function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

interface IBotton {
   children?: JSX.Element | ReactNode,
   className?: any;
   onClick?: () => void;
   disabled?: boolean;
}

export const Button: FC<IBotton> = ({ children, className, onClick, disabled, ...rest }) => {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         type="button"
         className={
            classNames(
               "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
               className
            )}
         {...rest}
      >
         {children}
      </button>
   )
}

export const PageButton = ({ children, className, onClick, disabled, ...rest }: IBotton) => {
   return (
      <button
         onClick={onClick}
         disabled={disabled}
         type="button"
         className={
            classNames(
               "relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-neutral4 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
               className
            )}
         {...rest}
      >
         {children}
      </button>
   )
}
