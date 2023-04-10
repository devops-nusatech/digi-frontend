import React from 'react';
import { IcEmpty } from 'assets';
import { Wallet } from 'modules';
import { Decimal, Image } from 'components';
import { renderCurrencyIcon } from 'helpers';
import { useMarket } from 'hooks';
import { platformCurrency } from 'api';

type TableWalletsPRops = {
   /**
    * balances user type array from Wallet[]
    */
   balances: Wallet[];
   push: (to: string, state?: unknown) => void;
   translate: (id: string) => string;
};

export const TableWallets = ({
   balances,
   push,
   translate,
}: TableWalletsPRops) => {
   const { markets } = useMarket();

   const ceckString = (value: string) =>
      value?.includes(',') ? value?.split(',')?.join('') : value;
   const percision = (defualt: number) =>
      Number(
         ceckString(
            String(
               balances?.find(e => e.currency === platformCurrency())?.fixed
            )
         )
      ) || defualt;
   const estimatedFormat = (currency: string, value?: string | number) => {
      const availableCurrency = markets?.find(e => e?.base_unit === currency);
      const balance = Number(value);
      return balance > 0 && availableCurrency
         ? +ceckString(availableCurrency?.last) * balance
         : balance;
   };

   return (
      <div className="overflow-x-auto">
         <table className="w-full table-auto">
            <thead>
               <tr className="border-b border-neutral7 dark:border-neutral2">
                  <th className="p-4 pt-5 text-left text-xs font-semibold leading-custom4 first:pl-8 last:pr-8">
                     Asset
                  </th>
                  <th className="p-4 pt-5 text-right text-xs font-semibold leading-custom4 first:pl-8 last:pr-8">
                     On orders
                  </th>
                  <th className="p-4 pt-5 text-right text-xs font-semibold leading-custom4 first:pl-8 last:pr-8">
                     Available balance
                  </th>
                  <th className="p-4 pt-5 text-right text-xs font-semibold leading-custom4 first:pl-8 last:pr-8">
                     Total balance
                  </th>
               </tr>
            </thead>
            <tbody>
               {balances.length > 0 ? (
                  balances.map(
                     ({ currency, name, iconUrl, locked, balance, fixed }) => (
                        <tr
                           key={currency}
                           onClick={() =>
                              push(`wallets/${currency}`, {
                                 estimateValue: `${Decimal.format(
                                    estimatedFormat(
                                       currency,
                                       Number(balance) + Number(locked)
                                    ),
                                    percision(fixed),
                                    ','
                                 )} ${platformCurrency()?.toUpperCase()}`,
                              })
                           }
                           className="cursor-pointer hover:bg-neutral7 dark:hover:bg-neutral2 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                           <td className="p-4 first:pl-8 last:pr-8">
                              <div className="flex space-x-5">
                                 <div className="w-8 shrink-0">
                                    <Image
                                       className={`w-full ${
                                          renderCurrencyIcon(
                                             currency,
                                             iconUrl
                                          )?.includes('http')
                                             ? 'polygon'
                                             : ''
                                       }`}
                                       src={renderCurrencyIcon(
                                          currency,
                                          iconUrl
                                       )}
                                       alt={name}
                                       title={name}
                                       height={40}
                                       width={40}
                                    />
                                 </div>
                                 <div>
                                    <div className="font-medium uppercase">
                                       {currency}
                                    </div>
                                    <div className="text-neutral4">{name}</div>
                                 </div>
                              </div>
                           </td>
                           <td className="p-4 text-right uppercase first:pl-8 last:pr-8">
                              <div className="font-medium">
                                 {Decimal.format(locked, percision(fixed), ',')}{' '}
                                 {currency}
                              </div>
                              <div className="text-neutral4">
                                 &asymp;{' '}
                                 {Decimal.format(
                                    estimatedFormat(currency, locked),
                                    percision(fixed),
                                    ','
                                 )}{' '}
                                 {platformCurrency()}
                              </div>
                           </td>
                           <td className="p-4 text-right uppercase first:pl-8 last:pr-8">
                              <div className="font-medium">
                                 {Decimal.format(
                                    balance,
                                    currency === 'idr' ? 0 : percision(fixed),
                                    ','
                                 )}{' '}
                                 {currency}
                              </div>
                              <div className="text-neutral4">
                                 &asymp;{' '}
                                 {Decimal.format(
                                    estimatedFormat(currency, balance),
                                    percision(fixed),
                                    ','
                                 )}{' '}
                                 {platformCurrency()}
                              </div>
                           </td>
                           <td className="p-4 text-right uppercase first:pl-8 last:pr-8">
                              <div className="font-medium">
                                 {Decimal.format(
                                    Number(balance) + Number(locked),
                                    percision(fixed),
                                    ','
                                 )}{' '}
                                 {currency}
                              </div>
                              <div className="text-neutral4">
                                 &asymp;{' '}
                                 {Decimal.format(
                                    estimatedFormat(
                                       currency,
                                       Number(balance) + Number(locked)
                                    ),
                                    percision(fixed),
                                    ','
                                 )}{' '}
                                 {platformCurrency()}
                              </div>
                           </td>
                        </tr>
                     )
                  )
               ) : (
                  <tr>
                     <td colSpan={4}>
                        <div className="flex min-h-c-screen-462 flex-col items-center justify-center space-y-3">
                           <IcEmpty />
                           <div className="text-xs font-semibold text-neutral4">
                              {translate('noResultFound')}
                           </div>
                        </div>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};
