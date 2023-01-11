import { classNames } from 'helpers';
import React, { FC } from 'react';

const classes = {
   width: {
      sm: 'md:w-64',
      def: 'md:w-65',
      md: 'md:w-82.5'
   }
}

type Width = 'sm' | 'def' | 'md';

interface DropdownMenuProps {
   isOpen: boolean;
   width?: Width;
   className?: string;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ isOpen, width, className, children }) => (
   <div className={`
      absolute
      bg-neutral8
      dark:bg-neutral2
      top-full
      md:top-c-full+5
      md-max:right-4
      left-4
      md:left-1/2
      z-2
      w-auto
      p-4
      shadow-dropdown
      rounded-xl
      translate-x-0
      md:-translate-x-1/2
      ${isOpen
         ? 'visible opacity-100 translate-y-0 scale-100'
         : 'invisible opacity-0 -translate-y-10 scale-75 shadow-primary1/75 dark:shadow-neutral8/60'
      }
      ${classNames(`
         ${width ? classes.width[String(width)] : ''}
         ${className ? className : ''}
      `)}
      transition-all
      duration-300
      before:absolute
      before:content-['']
      before:bottom-full
      before:w-6
      before:h-3
      before:icon-dropdown
      before:dark:icon-dropdown-dark
      before:left-1/2
      before:-translate-x-1/2
      before:md-max:left-auto
      before:md-max:right-52
   `}>
      {children}
   </div>
);


DropdownMenu.defaultProps = {
   width: 'sm'
}
