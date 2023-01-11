import React from 'react';
import {
   LayoutWallet,
   TableFinance
} from 'components';

export const WalletFinance = () => (
   <LayoutWallet>
      <div className="h-full bg-neutral8 dark:bg-shade2 p-8 rounded">
         <TableFinance
            title="Finances"
            hiddenCategory={[0, 4]}
         />
      </div>
   </LayoutWallet>
)
