import React, { FC, MouseEvent } from 'react'

interface NavProps {
   title: string;
   isActive?: boolean;
   onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
   theme?: 'black' | 'grey';
   className?: string;
}

export const Nav: FC<NavProps> = ({ title, isActive, onClick, theme, className }) =>
   <button
      type="button"
      onClick={onClick}
      className={`flex py-1.5 px-3 rounded-1xl font-dm font-bold leading-custom3 ${(isActive && theme === 'black') ? 'bg-neutral3 text-neutral8' : (isActive && theme === 'grey') ? 'bg-neutral6 dark:bg-neutral3' : 'bg-none text-neutral4 hover:text-neutral3 dark:hover:text-neutral8'} ${className} transition-all duration-300`}>
      {title}
   </button>

   Nav.defaultProps = {
      theme: 'black'
   }
