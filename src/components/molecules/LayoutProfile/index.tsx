import React, { FC } from 'react'
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
}

export const LayoutProfile: FC<LayoutProfileProps> = ({
   title,
   withBreadcrumbs,
   withLinkMore,
   children
}) => (
   <div>
      <div className="md-max:pt-4 md-max:pb-8 py-10 border-b border-shade4 dark:border-neutral2">
         <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg2:px-20 block md:flex flex-wrap items-center">
            <div className={`${(withBreadcrumbs || withLinkMore) ? 'mr-auto' : ''} text-3.5xl lg:text-4.5xl lg2:text-5xl font-dm tracking-custom1 lg2:tracking-custom leading-10 lg:leading-12 lg2:leading-custom1`}>
               {title}
            </div>
            {withBreadcrumbs && (
               <div className="flex space-x-1 items-center md-max:mt-4 ml-0 md:ml-10">
                  <Link
                     to={withBreadcrumbs.href || ''}
                     className="font-dm leading-custom3 text-neutral4 hover:text-primary1 hover:underline hover:underline-offset-4 transition-colors duration-300"
                  >
                     {withBreadcrumbs.display || ''}
                  </Link>
                  <svg className="w-5 h-5 fill-neutral4 transition-colors duration-300">
                     <use xlinkHref="#icon-arrow-right" />
                  </svg>
                  <div className="font-dm leading-custom3 select-none">
                     {withBreadcrumbs.active || ''}
                  </div>
               </div>
            )}
            {withLinkMore && (
               <div className="flex items-center text-xs text-neutral4 font-medium leading-custom4 select-none">
                  {withLinkMore.title}
                  <Link
                     to={withLinkMore.href}
                     className="group flex items-center text-neutral2 dark:text-neutral6 ml-2 transition-colors duration-500 hover:underline hover:underline-offset-4 hover:text-primary1"
                  >
                     <span>{withLinkMore.display}</span>
                     <svg className="w-5 h-5 fill-neutral2 dark:fill-neutral6 group-hover:fill-primary1 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform duration-300">
                        <use xlinkHref="#icon-arrow-right" />
                     </svg>
                  </Link>
               </div>
            )}
         </div>
      </div>
      <div className="grow md-max:py-4 lg-max:pt-10 lg2-max:pt-16 py-20 bg-shade5 dark:bg-neutral1 dark:shadow-body">
         <div className="w-full max-w-7xl mx-auto px-4 md:px-10 lg2:px-20 block lg:flex items-start">
            {children}
         </div>
      </div>
   </div>
);
