import React from 'react';
import { Link } from 'react-router-dom';
import { SVG, DropdownMenu } from 'components';

interface DropdownListEventProps {
   isOpen: boolean;
   translate: (id: string) => string;
   pathname: string;
}

export const DropdownListEvent = ({
   isOpen,
   translate,
   pathname,
}: DropdownListEventProps) => {
   return (
      <DropdownMenu
         isOpen={isOpen}
         className="py-0">
         <Link
            to="/airdrop"
            className="group flex items-center space-x-2 border-b border-neutral6 py-4 font-dm leading-custom3 text-neutral3 transition-colors duration-300 dark:border-neutral3 dark:text-neutral4 dark:hover:text-neutral8">
            <SVG
               className="h-5 w-5 fill-neutral8 stroke-neutral4 transition-all duration-300 group-hover:stroke-neutral3 dark:fill-neutral2 dark:group-hover:stroke-neutral8"
               xlinkHref="airdrop"
            />
            <div>{translate('page.body.trade.header.airdrop')}</div>
         </Link>
         <Link
            to="/membership"
            className="group flex items-center space-x-2 border-b border-neutral6 py-4 font-dm leading-custom3 text-neutral3 transition-colors duration-300 dark:border-neutral3 dark:text-neutral4 dark:hover:text-neutral8">
            <SVG
               className="h-5 w-5 fill-neutral4 transition-all duration-300 group-hover:fill-neutral2 dark:group-hover:fill-neutral8"
               xlinkHref="star-outline"
            />
            <div>{translate('page.body.trade.header.membership')}</div>
         </Link>
         <Link
            to="/launchpad"
            className="group flex items-center space-x-2 py-4 font-dm leading-custom3 text-neutral3 transition-colors duration-300 dark:text-neutral4 dark:hover:text-neutral8">
            <SVG
               className="h-5 w-5 fill-neutral8 stroke-neutral4 transition-all duration-300 group-hover:stroke-neutral3 dark:fill-neutral2 dark:group-hover:stroke-neutral8"
               xlinkHref="launchpad"
            />
            <div>{translate('page.body.trade.header.launchpad')}</div>
         </Link>
      </DropdownMenu>
   );
};
