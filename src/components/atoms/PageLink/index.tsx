import React, { HTMLProps } from 'react';
import cn from 'classnames';

export type PageLinkProps = HTMLProps<HTMLLIElement> & { active?: boolean };

export const PageLink = ({
   className,
   active,
   disabled,
   children,
   ...rest
}: PageLinkProps) => {
   const customClassName = cn(
      'grid min-h-10 min-w-10 cursor-pointer place-items-center rounded-lg p-1 transition-all duration-300 hover:bg-neutral7 dark:bg-neutral1 dark:hover:bg-neutral2 [&.active]:bg-neutral6 [&.active]:font-medium dark:[&.active]:bg-neutral3 [&.disabled]:cursor-not-allowed dark:[&.disabled]:bg-neutral2',
      className,
      {
         active,
         disabled,
      }
   );

   if (disabled) {
      return <li className={customClassName}>{children}</li>;
   }

   return (
      <li
         className={customClassName}
         aria-current={active ? 'page' : undefined}
         {...rest}>
         {children}
      </li>
   );
};
