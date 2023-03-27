import React from 'react';
import { LayoutWallet, TableFinance } from 'components';

export const WalletFinance = () => (
   <LayoutWallet>
      <div className="min-h-full rounded bg-neutral8 p-8 dark:bg-shade2">
         <TableFinance
            title="Finances"
            hiddenCategory={[0, 4]}
         />
      </div>
   </LayoutWallet>
);
