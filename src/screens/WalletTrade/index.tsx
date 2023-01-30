import { LayoutWallet, TableFinance } from 'components'
import React from 'react'

export const WalletTrade = () => {
   return (
      <LayoutWallet>
         <div className="min-h-full p-8 rounded bg-neutral8 dark:bg-shade2">
            <TableFinance
               title="Trade History"
               hiddenCategory={[0, 1, 2, 3]}
            />
         </div>
      </LayoutWallet>
   )
}
