import React, { HTMLProps } from 'react';
import cn from 'classnames';

export type PageLinkProps = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export const PageLink = ({
   className,
   active,
   disabled,
   children,
   ...rest
}: PageLinkProps) => {
   const customClassName = cn(
      'relative inline-flex cursor-pointer border border-neutral6 dark:border-neutral3 bg-neutral8 dark:bg-neutral1 text-primary1 text-base font-medium py-2.5 px-3.75 transition-colors duration-300 first:rounded-l-xl last:rounded-r-xl [&:not(:first-child)]:-mr-px [&.active]:z-2 [&.active]:text-neutral8 [&.active]:border-primary1 [&.active]:bg-primary1 [&.disabled]:text-neutral4 [&.disabled]:bg-neutral7 dark:[&.disabled]:bg-neutral3 [&.disabled]:pointer-events-none hover:bg-primary1 focus:text-primary4 focus:bg-primary4 focus:z-3',
      className,
      {
         active,
         disabled,
      }
   );

   if (disabled) {
      return <span className={customClassName}>{children}</span>;
   }

   return (
      <a
         className={customClassName}
         aria-current={active ? 'page' : undefined}
         {...rest}>
         {children}
      </a>
   );
};
