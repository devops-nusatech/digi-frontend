import React, { FC } from 'react';
import { WalletSidebar } from '../WalletSidebar';

export const LayoutWallet: FC = ({ children }) => {
   return (
      <div className="block lg:flex p-4 pt-8 lg:p-1 bg-neutral7 dark:bg-neutral1">
         <WalletSidebar />
         <div className="grow h-auto lg:h-[calc(100vh-88px)] pl-0 lg:pl-1 overflow-auto">
            {children}
         </div>
      </div>
   )
}
