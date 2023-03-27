import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type LayoutProfileProps = {
   title: string;
   withBreadcrumbs?: {
      display: string;
      href: string;
      active: string;
   };
   withLinkMore?: {
      title: string;
      display: string;
      href: string;
   };
};

export const LayoutProfile: FC<LayoutProfileProps> = ({
   title,
   withBreadcrumbs,
   withLinkMore,
   children,
}) => (
   <div>
      <div className="border-b border-shade4 py-10 dark:border-neutral2 md-max:pt-4 md-max:pb-8">
         <div className="mx-auto block w-full max-w-7xl flex-wrap items-center px-8 md:flex md:px-10 lg2:px-20">
            <div
               className={`${
                  withBreadcrumbs || withLinkMore ? 'mr-auto' : ''
               } font-dm text-3.5xl leading-10 tracking-custom1 lg:text-4.5xl lg:leading-12 lg2:text-5xl lg2:leading-custom1 lg2:tracking-custom`}>
               {title}
            </div>
            {withBreadcrumbs && (
               <div className="ml-0 flex items-center space-x-1 md:ml-10 md-max:mt-4">
                  <Link
                     to={withBreadcrumbs.href || ''}
                     className="font-dm leading-custom3 text-neutral4 transition-colors duration-300 hover:text-primary1 hover:underline hover:underline-offset-4">
                     {withBreadcrumbs.display || ''}
                  </Link>
                  <svg className="h-5 w-5 fill-neutral4 transition-colors duration-300">
                     <use xlinkHref="#icon-arrow-right" />
                  </svg>
                  <div className="select-none font-dm leading-custom3">
                     {withBreadcrumbs.active || ''}
                  </div>
               </div>
            )}
            {withLinkMore && (
               <div className="flex select-none items-center text-xs font-medium leading-custom4 text-neutral4">
                  {withLinkMore.title}
                  <Link
                     to={withLinkMore.href}
                     className="group ml-2 flex items-center text-neutral2 transition-colors duration-500 hover:text-primary1 hover:underline hover:underline-offset-4 dark:text-neutral6">
                     <span>{withLinkMore.display}</span>
                     <svg className="h-5 w-5 -translate-x-0.5 fill-neutral2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:fill-primary1 dark:fill-neutral6">
                        <use xlinkHref="#icon-arrow-right" />
                     </svg>
                  </Link>
               </div>
            )}
         </div>
      </div>
      <div className="grow bg-shade5 py-20 dark:bg-neutral1 dark:shadow-body md-max:py-4 lg-max:pt-10 lg2-max:pt-16">
         <div className="mx-auto block w-full max-w-7xl items-start px-4 md:px-10 lg:flex lg2:px-20">
            {children}
         </div>
      </div>
   </div>
);
