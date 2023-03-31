import React, { FC, MouseEvent } from 'react';

interface NavProps {
   /**
    * Title to display.
    */
   title: string;
   /**
    * Active Nav
    */
   isActive?: boolean;
   /**
    * This function to set the active state
    */
   onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
   /**
    * Title to display.
    * @default 'black'
    */
   theme?: 'black' | 'grey';
   className?: string;
}

export const Nav: FC<NavProps> = ({
   title,
   isActive,
   onClick,
   theme,
   className,
}) => (
   <button
      type="button"
      onClick={onClick}
      className={`flex rounded-1xl px-3 py-1.5 font-dm leading-custom3 ${
         isActive && theme === 'black'
            ? 'bg-neutral3 text-neutral8'
            : isActive && theme === 'grey'
            ? 'bg-neutral6 dark:bg-neutral3'
            : 'bg-none text-neutral4 hover:text-neutral3 dark:hover:text-neutral8'
      } ${className} transition-all duration-300`}>
      {title}
   </button>
);

Nav.defaultProps = {
   theme: 'black',
};
