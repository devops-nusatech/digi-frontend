import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

type MenuProps = {
   pathname: string;
   text: string;
   to: LinkProps['to'];
   iconName: string;
   className?: string;
   iconClassName?: string;
   isLink?: boolean;
};

export const Menu: FC<MenuProps> = ({
   pathname,
   text,
   to,
   iconName,
   className,
   iconClassName,
   isLink,
}) =>
   isLink ? (
      <Link
         to={to}
         className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
            pathname.includes(pathname)
               ? ''
               : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
         } transition-colors duration-300 ${className || ''}`}>
         <svg
            className={`h-6 w-6 ${iconClassName || ''} ${
               pathname.includes(pathname)
                  ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                  : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
            }`}>
            <use xlinkHref={`#icon-${iconName}`} />
         </svg>
         <div>{text}</div>
      </Link>
   ) : (
      <div
         className={`group flex h-10 items-center space-x-2 px-0 font-dm leading-custom3 lg2:px-4 ${
            pathname.includes(pathname)
               ? ''
               : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
         } transition-colors duration-300 ${className || ''}`}>
         <svg
            className={`h-6 w-6 ${iconClassName || ''} ${
               pathname.includes(pathname)
                  ? 'dark:fill-neutral8 dark:group-hover:fill-neutral8'
                  : 'fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral8'
            }`}>
            <use xlinkHref={`#icon-${iconName}`} />
         </svg>
         <div>{text}</div>
      </div>
   );

Menu.defaultProps = {
   isLink: true,
};
