import React from 'react'
import { IcEmty } from 'assets';
import { Wallet, selectSonic } from 'modules';
import {
   Decimal,
   Image,
} from 'components';
import { renderCurrencyIcon } from 'helpers';
import { useSelector } from 'react-redux';
import { useMarket } from 'hooks';

type TableWalletsPRops = {
   /**
    * balances user type array from Wallet[]
    */
   balances: Wallet[];
   push: (to: string, state?: unknown) => void;
   translate: (id: string) => string;
}

export const TableWallets = ({
   balances,
   push,
   translate
}: TableWalletsPRops) => {
   const { peatio_platform_currency } = useSelector(selectSonic);
   const {
      otherMarkets
   } = useMarket();

   const ceckString = (value: string) => value?.includes(',') ? value?.split(',')?.join('') : value;
   // const lastPrice = () => Number(ceckString(otherMarkets?.find(e => e?.quote_unit === peatio_platform_currency)?.last)) || 0;
   const lastPrice = (currency: string, defualt: number) => Number(ceckString(otherMarkets?.find(e => e?.base_unit === currency)?.last)) || defualt;

   return (
      <div className="overflow-x-auto">
         <table className="w-full table-auto">
            <thead>
               <tr className="border-b border-neutral7 dark:border-neutral2">
                  <th className="p-4 pt-5 first:pl-8 last:pr-8 text-xs font-semibold leading-custom4 text-left">
                     Asset
                  </th>
                  <th className="p-4 pt-5 first:pl-8 last:pr-8 text-xs font-semibold leading-custom4 text-right">
                     On orders
                  </th>
                  <th className="p-4 pt-5 first:pl-8 last:pr-8 text-xs font-semibold leading-custom4 text-right">
                     Available balance
                  </th>
                  <th className="p-4 pt-5 first:pl-8 last:pr-8 text-xs font-semibold leading-custom4 text-right">
                     Total balance
                  </th>
               </tr>
            </thead>
            <tbody>
               {balances.length > 0 ? balances.map(({ currency, name, iconUrl, locked, balance, fixed }) => (
                  <tr
                     key={currency}
                     onClick={() => push(`wallets/${currency}`, { estimateValue: `${Decimal.format((lastPrice(currency, (Number(balance) + Number(locked))) * (Number(balance) + Number(locked))), currency === 'idr' ? 0 : fixed, ',')} ${peatio_platform_currency?.toUpperCase()}` })}
                     className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3 hover:bg-neutral7 dark:hover:bg-neutral2 cursor-pointer"
                  >
                     <td className="p-4 first:pl-8 last:pr-8">
                        <div className="flex space-x-5">
                           <div className="shrink-0 w-8">
                              <Image
                                 className={`w-full ${renderCurrencyIcon(currency, iconUrl)?.includes('http') ? 'polygon' : ''}`}
                                 src={renderCurrencyIcon(currency, iconUrl)}
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
                              <div className="text-neutral4">
                                 {name}
                              </div>
                           </div>
                        </div>
                     </td>
                     <td className="p-4 first:pl-8 last:pr-8 text-right uppercase">
                        <div className="font-medium">
                           {Decimal.format(locked, currency === 'idr' ? 0 : fixed, ',')} {currency}
                        </div>
                        {ceckString(otherMarkets?.find(e => e?.base_unit === currency)?.last)}
                        {/* {JSON.stringify(lastPrice(currency, Number(locked)))} */}
                        <div className="text-neutral4">
                           &asymp; {Decimal.format(lastPrice(currency, Number(locked)), currency === 'idr' ? 0 : fixed, ',')} {peatio_platform_currency}
                        </div>
                     </td>
                     <td className="p-4 first:pl-8 last:pr-8 text-right uppercase">
                        <div className="font-medium">
                           {Decimal.format(balance, currency === 'idr' ? 0 : currency === 'idr' ? 0 : fixed, ',')} {currency}
                        </div>
                        <div className="text-neutral4">
                           &asymp; {Decimal.format(lastPrice(currency, Number(balance)), currency === 'idr' ? 0 : fixed, ',')} {peatio_platform_currency}
                        </div>
                     </td>
                     <td className="p-4 first:pl-8 last:pr-8 text-right uppercase">
                        <div className="font-medium">
                           {Decimal.format(Number(balance) + Number(locked), currency === 'idr' ? 0 : fixed, ',')} {currency}
                        </div>
                        <div className="text-neutral4">
                           &asymp; {Decimal.format(lastPrice(currency, (Number(balance) + Number(locked))), currency === 'idr' ? 0 : fixed, ',')} {peatio_platform_currency}
                        </div>
                     </td>
                  </tr>
               )) : (
                  <tr>
                     <td colSpan={4}>
                        <div className="min-h-c-screen-462 flex flex-col items-center justify-center space-y-3">
                           <IcEmty />
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
   )
};
