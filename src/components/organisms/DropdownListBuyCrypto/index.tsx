import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCardIcon, InboxInIcon } from '@heroicons/react/outline';
import { DropdownMenu } from 'components';

interface DropdownListBuyCryptoProps {
   isOpen: boolean;
   translate: (id: string) => string;
}

export const DropdownListBuyCrypto = ({
   isOpen,
   translate,
}: DropdownListBuyCryptoProps) => {
   return (
      <DropdownMenu
         isOpen={isOpen}
         className="py-0">
         <Link
            to="/buy-crypto"
            className="group flex items-center space-x-2 border-b border-neutral6 py-4 font-dm leading-custom3 text-neutral3 transition-colors duration-300 dark:border-neutral3 dark:text-neutral4 dark:hover:text-neutral8">
            <CreditCardIcon className="h-5 stroke-neutral4 transition-colors duration-300 group-hover:stroke-neutral3 dark:group-hover:stroke-neutral8" />
            <div>{translate('page.body.trade.header.credit_card')}</div>
         </Link>
         <Link
            to="/sell-crypto"
            className="group flex items-center space-x-2 py-4 font-dm leading-custom3 text-neutral3 transition-colors duration-300 dark:text-neutral4 dark:hover:text-neutral8">
            <InboxInIcon className="h-5 stroke-neutral4 transition-colors duration-300 group-hover:stroke-neutral3 dark:group-hover:stroke-neutral8" />
            <div>{translate('page.body.trade.header.deposit_bank')}</div>
         </Link>
      </DropdownMenu>
   );
};
