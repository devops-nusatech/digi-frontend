import { classNames } from 'helpers';
import React, { FC } from 'react';

const classes = {
   width: {
      sm: 'md:w-64',
      def: 'md:w-71.25',
      md: 'md:w-82.5',
   },
};

type Width = 'sm' | 'def' | 'md';

interface DropdownMenuProps {
   isOpen: boolean;
   width?: Width;
   className?: string;
   translateX?: string;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
   isOpen,
   width,
   className,
   children,
   translateX,
}) => (
   <div
      className={`
      absolute
      top-full
      left-4
      z-2
      w-auto
      translate-x-0
      rounded-xl
      bg-neutral8
      p-4
      shadow-dropdown
      dark:bg-neutral2
      md:top-c-full+5
      md:left-1/2
      md-max:right-4
      ${translateX ? translateX : 'md:-translate-x-1/2'}
      ${
         isOpen
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible -translate-y-10 scale-75 opacity-0 shadow-primary1/75 dark:shadow-neutral8/60'
      }
      ${classNames(`
         ${width ? classes.width[String(width)] : ''}
         ${className ? className : ''}
      `)}
      before:icon-dropdown
      before:dark:icon-dropdown-dark
      transition-all
      duration-300
      before:absolute
      before:bottom-full
      before:left-1/2
      before:h-3
      before:w-6
      before:-translate-x-1/2
      before:content-['']
      before:md-max:left-auto
      before:md-max:right-52
   `}>
      {children}
   </div>
);

DropdownMenu.defaultProps = {
   width: 'sm',
};
