import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface ListDropdownProps {
   title: string;
   subTitle: string;
   icon: string;
   to?: string;
   children?: JSX.Element;
}

export const ListDropdown: FC<ListDropdownProps> = ({ title, subTitle, icon, to, children }) => {
   return (
      <Link to={String(to)} className="flex justify-between [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 py-3">
         <div className="flex items-center space-x-2 font-dm">
            <svg className="h-5 w-5 fill-neutral4 transition-all duration-300">
               <use xlinkHref={`#icon-${icon}`} />
            </svg>
            <div className="grow pt-0.5 space-y-0.5">
               <div className="font-bold leading-custom3 hover:text-primary1 transition-all duration-300">
                  {title}
               </div>
               <div className="text-x font-medium text-neutral4 leading-[1.6]">
                  {subTitle}
               </div>
            </div>
         </div>
         {children}
      </Link>
   )
};

ListDropdown.defaultProps = {
   to: '#',
};
