import React from 'react';
import { Link } from 'react-router-dom';
import { SVG, DropdownMenu } from 'components';

interface DropdownListBuyCryptoProps {
   isOpen: boolean;
   translate: (id: string) => string;
   pathname: string;
}

export const DropdownListBuyCrypto = ({
   isOpen,
   translate,
   pathname,
}: DropdownListBuyCryptoProps) => {
   return (
      <DropdownMenu
         isOpen={isOpen}
         className="py-0">
         <Link
            to="/buy-crypto"
            className="group flex items-center space-x-2 border-b border-neutral6 py-4 font-dm leading-custom3 text-neutral3 transition-colors duration-300 dark:border-neutral3 dark:text-neutral4 dark:hover:text-neutral8">
            <SVG
               className="h-5 w-5 fill-neutral8 stroke-neutral4 transition-colors duration-300 group-hover:stroke-neutral3 dark:fill-neutral2 dark:group-hover:stroke-neutral8"
               xlinkHref="credit"
            />
            <div>{translate('page.body.trade.header.credit_card')}</div>
         </Link>
         <Link
            to="/sell-crypto"
            className="group flex items-center space-x-2 border-b border-neutral6 py-4 font-dm leading-custom3 text-neutral3 transition-colors duration-300 dark:border-neutral3 dark:text-neutral4 dark:hover:text-neutral8">
            <SVG
               className="h-5 w-5 fill-neutral8 stroke-neutral4 transition-colors duration-300 group-hover:stroke-neutral3 dark:fill-neutral2 dark:group-hover:stroke-neutral8"
               xlinkHref="deposit"
            />
            <div>{translate('page.body.trade.header.deposit_bank')}</div>
         </Link>
         <Link
            to="/p2p"
            className="group flex items-center space-x-2 py-4 font-dm leading-custom3 text-neutral3 transition-colors duration-300 dark:text-neutral4 dark:hover:text-neutral8">
            <SVG
               className={`h-5 w-5 ${
                  pathname.includes('/p2p')
                     ? 'fill-neutral3 dark:fill-neutral8'
                     : 'fill-neutral4 group-hover:fill-neutral3 dark:group-hover:fill-neutral8'
               } transition-colors duration-300`}
               xlinkHref="p2p"
            />
            <div>P2P trade</div>
         </Link>
      </DropdownMenu>
   );
};
