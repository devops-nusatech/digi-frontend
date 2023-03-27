import React, { FC, ReactNode } from 'react';

export function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

interface IBotton {
   children?: JSX.Element | ReactNode;
   className?: any;
   onClick?: () => void;
   disabled?: boolean;
}

export const Button: FC<IBotton> = ({
   children,
   className,
   onClick,
   disabled,
   ...rest
}) => {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         type="button"
         className={classNames(
            'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50',
            className
         )}
         {...rest}>
         {children}
      </button>
   );
};

export const PageButton = ({
   children,
   className,
   onClick,
   disabled,
   ...rest
}: IBotton) => {
   return (
      <button
         onClick={onClick}
         disabled={disabled}
         type="button"
         className={classNames(
            'relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:border-neutral4',
            className
         )}
         {...rest}>
         {children}
      </button>
   );
};
