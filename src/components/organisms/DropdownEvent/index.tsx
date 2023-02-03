import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCardIcon, InboxInIcon } from '@heroicons/react/outline';
import { DropdownMenu } from 'components';

interface DropdownEventProps {
   isOpen: boolean;
   translate: (id: string) => string;
}

export const DropdownEvent = ({ isOpen, translate }: DropdownEventProps) => {
   return (
      <DropdownMenu isOpen={isOpen} className="py-0 divide-y divide-neutral6 dark:divide-neutral3">
         <Link to="/airdrop" className="group flex items-center space-x-2 py-4 font-dm text-neutral3 dark:text-neutral4 dark:hover:text-neutral8 leading-custom3 transition-colors duration-300">
            <CreditCardIcon className="h-5 stroke-neutral4 group-hover:stroke-neutral3 dark:group-hover:stroke-neutral8 transition-colors duration-300" />
            <div>{translate('page.body.trade.header.airdrop')}</div>
         </Link>
         <Link to="/membership" className="group flex items-center space-x-2 py-4 font-dm text-neutral3 dark:text-neutral4 dark:hover:text-neutral8 leading-custom3 transition-colors duration-300">
            <InboxInIcon className="h-5 stroke-neutral4 group-hover:stroke-neutral3 dark:group-hover:stroke-neutral8 transition-colors duration-300" />
            <div>{translate('page.body.trade.header.membership')}</div>
         </Link>
         <Link to="/launcphad" className="group flex items-center space-x-2 py-4 font-dm text-neutral3 dark:text-neutral4 dark:hover:text-neutral8 leading-custom3 transition-colors duration-300">
            <InboxInIcon className="h-5 stroke-neutral4 group-hover:stroke-neutral3 dark:group-hover:stroke-neutral8 transition-colors duration-300" />
            <div>{translate('page.body.trade.header.launchpad')}</div>
         </Link>
      </DropdownMenu>
   )
}
