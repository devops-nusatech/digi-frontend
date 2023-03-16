import React, { FC } from 'react';
import { WalletSidebar } from '../WalletSidebar';

export const LayoutWallet: FC = ({ children }) => {
   return (
      <div className="block bg-neutral7 p-4 pt-8 dark:bg-neutral1 lg:flex lg:p-1">
         <WalletSidebar />
         <div className="h-auto grow overflow-auto pl-0 lg:h-[calc(100vh-88px)] lg:pl-1">
            {children}
         </div>
      </div>
   );
};
