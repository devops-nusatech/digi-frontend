import React, {
   useEffect,
   FC,
} from 'react';
import {
   Badge,
   Decimal,
   Pagination,
   Image,
   Direction,
   State,
   AdibTooltip,
} from 'components';
import {
   arrayFilter,
   copyToClipboard,
   localeDate,
   setTradesType,
   truncateMiddle,
   renderCurrencyIcon,
} from 'helpers';
import {
   currenciesFetch,
   Currency,
   Deposit,
   fetchHistory,
   InternalTransfer,
   OrderSide,
   PrivateTradeEvent,
   Transaction,
   User,
   Wallet,
   WalletHistoryList,
   Withdraw,
} from 'modules';
import { IcEmty, IcShorting } from 'assets';
import { toast } from 'react-toastify';
import { useMarket } from 'hooks';

interface TableActivityProps {
   core: 'transactions' | 'deposits' | 'withdraws' | 'transfers' | 'trades';
   search: string;
   market?: string;
   currency?: string;
   time_from?: string;
   time_to?: string;
   intl: any;
   currencies: Currency[];
   wallets: Wallet[];
   list: WalletHistoryList;
   fetching: boolean;
   page: number;
   firstElemIndex: number;
   lastElemIndex: number;
   nextPageExists: boolean;
   fetchCurrencies: typeof currenciesFetch;
   fetchHistory: typeof fetchHistory;
   isApply: boolean;
   advanceFilter: boolean;
   handleApply: () => void;
   currencyId?: string;
   direction: Direction;
   user: User;
   state: State
   type?: OrderSide | ''
}

export const TableActivity: FC<TableActivityProps> = ({
   core,
   search,
   currency,
   market,
   time_from,
   time_to,
   intl,
   currencies,
   wallets,
   list,
   fetching,
   page,
   firstElemIndex,
   lastElemIndex,
   nextPageExists,
   fetchCurrencies,
   fetchHistory,
   isApply,
   advanceFilter,
   handleApply,
   currencyId,
   direction,
   user,
   state,
   type,
}) => {
   const { marketsData } = useMarket();

   const fetchUpdate = ({ page }: { page: number }) => fetchHistory({
      page,
      core,
      limit: 10,
      ...(currencyId && { currency: currencyId }),
      ...(isApply && core !== 'transfers' && { time_from, time_to }),
      // ...(core === 'transfers' && { sender: user.uid }),
      ...((advanceFilter && core !== 'trades') && { currency, state: formatState() }),
      ...((advanceFilter && core === 'trades') && { market, type })
   });

   const handleFilter = () => fetchUpdate({ page: 0 });

   useEffect(() => {
      if (isApply) {
         handleFilter();
         handleApply();
      }
   }, [isApply]);
   useEffect(() => {
      if (core) {
         fetchUpdate({ page: 0 });
      }
      if (!currencies.length) {
         fetchCurrencies();
      }
   }, [core, currencies]);

   const renderHead = () => {
      switch (core) {
         case 'transactions':
            return (
               <tr>
                  <th className="pr-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>#</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Type</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Coin</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Amount</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Address</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Transaction ID</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="pl-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                     <div>Date</div>
                  </th>
               </tr>
            )
         case 'deposits':
            return (
               <tr>
                  <th className="pr-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>#</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Status</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Currency</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Amount</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>TX-ID</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="pl-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                     <div>Date</div>
                  </th>
               </tr>
            )
         case 'withdraws':
            return (
               <tr>
                  <th className="pr-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>#</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Status</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Currency</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Amount</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Address</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>TX-ID</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="pl-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                     <div>Date</div>
                  </th>
               </tr>
            )
         case 'transfers':
            return (
               <tr>
                  <th className="pr-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>#</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Status</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Currency</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Amount</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Sender</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Receiver</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Direction</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="pl-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                     <div>Date</div>
                  </th>
               </tr>
            )
         case 'trades':
            return (
               <tr>
                  <th className="pr-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>#</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Side</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>Market</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer justify-end">
                        <div>Price</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer justify-end">
                        <div>Amount</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer justify-end">
                        <div>Total</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="pl-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                     <div>Date</div>
                  </th>
               </tr>
            )
         default:
            return;
      }
   }

   const retrieveData = () => arrayFilter([...list], search).map((item, index) =>
      renderActivity(item, index));

   const getBlockchainLink = (currency: string, blockchainKey: string, { txid, rid }: { txid?: string, rid?: string }) => {
      const currencyInfo = wallets && wallets.find(wallet => wallet.currency === currency);
      const blockchainCurrency = currencyInfo?.networks?.find(blockchain_cur => blockchain_cur.blockchain_key === blockchainKey);
      if (currencyInfo) {
         if (txid && blockchainCurrency?.explorer_transaction) {
            return blockchainCurrency?.explorer_transaction.replace('#{txid}', txid);
         }
         if (rid && blockchainCurrency?.explorer_address) {
            return blockchainCurrency?.explorer_address.replace('#{address}', rid);
         }
      }

      return '';
   };

   const renderActivity = (item, index: number) => {
      switch (core) {
         case 'transactions': {
            const transactions: Transaction = item;
            const {
               address,
               currency,
               amount,
               txid,
               created_at,
               type,
            } = transactions;

            // const state = intl(`page.body.history.withdraw.content.status.${item.state}`);
            const wallet = wallets.find(obj => obj.currency === currency);

            const formatCurrency = currencies.find(market => market.id === currency)
            const assetName = String(formatCurrency?.name);
            const iconUrl = String(formatCurrency?.icon_url);

            return (
               <tr key={txid} style={{ transition: 'background .2s' }} className="group">
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{index + 1}.</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text={type}
                        variant={type === 'Withdraw' ? 'green' : 'Deposit' ? 'orange' : 'yellow'}
                     />
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex space-x-3 items-center">
                        <div className="shrink-0 w-8">
                           <Image
                              className={`w-full ${renderCurrencyIcon(currency, iconUrl)?.includes('http') ? 'polygon' : ''}`}
                              src={renderCurrencyIcon(currency, iconUrl)}
                              alt={assetName}
                              title={assetName}
                              height={40}
                              width={40}
                           />
                        </div>
                        <div>
                           {assetName || currency}
                        </div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>
                        <div>{wallet && Decimal.format(amount, currency === 'idr' ? 0 : wallet.fixed, ',')} {String(currency)?.toUpperCase()}</div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <AdibTooltip
                        content={
                           <div className="font-pop text-xs font-medium leading-none">
                              {address}
                           </div>
                        }
                     >
                        <div>{truncateMiddle(address, 20)}</div>
                     </AdibTooltip>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex items-center">
                        <AdibTooltip
                           content={
                              <div className="font-pop text-xs font-medium leading-none">
                                 {txid}
                              </div>
                           }
                        >
                           <div className="text-neutral4">
                              {truncateMiddle(txid, 20)}
                           </div>
                        </AdibTooltip>
                        <AdibTooltip
                           content={
                              <div className="font-pop text-xs font-medium leading-none">
                                 Copy to clipboard
                              </div>
                           }
                        >
                           <div className="cursor-copy" onClick={() => handleCopy(txid)}>
                              <svg className="ml-2 w-4 h-4 fill-neutral4 hover:fill-neutral2 transition-all duration-300">
                                 <use xlinkHref="#icon-copy" />
                              </svg>
                           </div>
                        </AdibTooltip>
                     </div>
                  </td>
                  <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4 whitespace-nowrap">
                        {localeDate(created_at, 'fullDate')}
                     </div>
                  </td>
               </tr>
            )
         }
         case 'deposits': {
            const deposits: Deposit = item;
            const { amount, created_at, currency, txid, blockchain_key } = deposits;
            const blockchainLink = getBlockchainLink(currency, blockchain_key, { txid: txid });
            const wallet = wallets.find(obj => obj.currency === currency);
            // const itemCurrency = currencies && currencies.find(cur => cur.id === currency);
            // const blockchainCurrency = itemCurrency?.networks.find(blockchain_cur => blockchain_cur.blockchain_key === item.blockchain_key);
            // const minConfirmations = blockchainCurrency?.min_confirmations;
            // const state = (item.state === 'submitted' && confirmations !== undefined && minConfirmations !== undefined) ? (
            //    `${confirmations}/${minConfirmations}`
            // ) : (
            //    intl(`page.body.history.deposit.content.status.${item.state}`)
            // );

            const formatCurrency = currencies.find(market => market.id === currency)
            const assetName = String(formatCurrency?.name);
            const iconUrl = String(formatCurrency?.icon_url);

            const stateType = () => {
               switch (deposits.state) {
                  case 'collected':
                     return 'succeed'
                  case 'submitted':
                  case 'accepted':
                  case 'accepted22':
                  case 'aml_processing':
                  case 'aml_suspicious':
                  case 'processing':
                  case 'skipped':
                  case 'fee_processing':
                  case 'errored':
                     return 'pending'
                  case 'canceled':
                  case 'rejected':
                     return 'failed'

                  default:
                     return deposits.state;
               }
            }
            const stateVariant = () => {
               switch (deposits.state) {
                  case 'collected':
                     return 'green'
                  case 'submitted':
                  case 'accepted':
                  case 'accepted22':
                  case 'aml_processing':
                  case 'aml_suspicious':
                  case 'processing':
                  case 'skipped':
                  case 'fee_processing':
                  case 'errored':
                     return 'yellow'
                  case 'canceled':
                  case 'rejected':
                     return 'orange'

                  default:
                     return;
               }
            }

            return (
               <tr style={{ transition: 'background .2s' }} className="group" key={txid}>
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{index + 1} .</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text={stateType()}
                        variant={stateVariant()}
                     />
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex items-center space-x-3">
                        <div className="shrink-0 w-8">
                           <Image
                              className={`w-full ${renderCurrencyIcon(currency, iconUrl)?.includes('http') ? 'polygon' : ''}`}
                              src={renderCurrencyIcon(currency, iconUrl)}
                              alt={assetName}
                              title={assetName}
                              height={40}
                              width={40}
                           />
                        </div>
                        <div>
                           {assetName || currency}
                        </div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{wallet && Decimal.format(amount, wallet.fixed, ',')} {String(currency)?.toUpperCase()}</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex items-center">
                        <AdibTooltip
                           content={
                              <div className="font-pop text-xs font-medium leading-none">
                                 {txid}
                              </div>
                           }
                        >
                           <a href={blockchainLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary1 hover:underline">
                              {truncateMiddle(txid, 20)}
                           </a>
                        </AdibTooltip>
                        {txid && (
                           <AdibTooltip
                              content={
                                 <div className="font-pop text-xs font-medium leading-none">
                                    Copy to clipboard
                                 </div>
                              }
                           >
                              <div
                                 className="cursor-copy"
                                 onClick={() => handleCopy(txid)}
                              >
                                 <svg className="ml-2 w-4 h-4 fill-neutral4 hover:fill-neutral2 transition-all duration-300">
                                    <use xlinkHref="#icon-copy" />
                                 </svg>
                              </div>
                           </AdibTooltip>
                        )}
                     </div>
                  </td>
                  <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">
                        {localeDate(created_at, 'fullDate')}
                     </div>
                  </td>
               </tr>
            );
         }
         case 'withdraws': {
            const withdraws: Withdraw = item
            const { created_at, currency, amount, rid, blockchain_txid, blockchain_key } = withdraws;
            const t = intl(`page.body.history.withdraw.content.status.${item.state}`);
            const blockchainLink = getBlockchainLink(currency, blockchain_key, { rid });
            const blockchainTXID = getBlockchainLink(currency, blockchain_key, { txid: blockchain_txid });
            const wallet = wallets.find(obj => obj.currency === currency);

            const formatCurrency = currencies.find(market => market.id === currency)
            const assetName = String(formatCurrency?.name);
            const iconUrl = String(formatCurrency?.icon_url);

            const stateType = () => {
               switch (withdraws.state) {
                  case 'succeed':
                     return t;
                  case 'prepared':
                  case 'submitted':
                  case 'accepted':
                  case 'processing':
                  case 'skipped':
                     return 'pending'
                  case 'canceled':
                  case 'rejected':
                  case 'failed':
                     return t

                  default:
                     return '';
               }
            }
            const stateVariant = () => {
               switch (withdraws.state) {
                  case 'succeed':
                     return 'green';
                  case 'prepared':
                  case 'submitted':
                  case 'accepted':
                  case 'processing':
                  case 'skipped':
                     return 'yellow'
                  case 'canceled':
                  case 'rejected':
                  case 'failed':
                     return 'orange'

                  default:
                     return;
               }
            }

            return (
               <tr style={{ transition: 'background .2s' }} className="group" key={index}>
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{index + 1}. </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text={stateType()}
                        variant={stateVariant()}
                     />
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex items-center space-x-3">
                        <div className="shrink-0 w-8">
                           <Image
                              className={`w-full ${renderCurrencyIcon(currency, iconUrl)?.includes('http') ? 'polygon' : ''}`}
                              src={renderCurrencyIcon(currency, iconUrl)}
                              alt={assetName}
                              title={assetName}
                              height={40}
                              width={40}
                           />
                        </div>
                        <div>
                           {assetName || currency}
                        </div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{wallet && Decimal.format(amount, currency === 'idr' ? 0 : wallet.fixed, ',')} {String(currency)?.toUpperCase()}</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <AdibTooltip
                        content={
                           <div className="font-pop text-xs font-medium leading-none">
                              {rid}
                           </div>
                        }
                     >
                        <div>
                           <a href={blockchainLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary1 hover:underline">
                              {truncateMiddle(rid, 20)}
                           </a>
                        </div>
                     </AdibTooltip>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="flex items-center">
                        <AdibTooltip
                           content={
                              <div className="font-pop text-xs font-medium leading-none">
                                 {blockchain_txid}
                              </div>
                           }
                           followCursorProps={false}
                        >
                           <a href={blockchainTXID} target="_blank" rel="noopener noreferrer" className="hover:text-primary1 hover:underline" >
                              {truncateMiddle(blockchain_txid, 20)}
                           </a>
                        </AdibTooltip>
                        {blockchain_txid && (
                           <AdibTooltip
                              content={
                                 <div className="font-pop text-xs font-medium leading-none">
                                    Copy to clipboard
                                 </div>
                              }
                              followCursorProps={false}
                           >
                              <div className="cursor-copy" onClick={() => handleCopy(blockchain_txid)}>
                                 <svg className="ml-2 w-4 h-4 fill-neutral4 hover:fill-neutral2 transition-all duration-300">
                                    <use xlinkHref="#icon-copy" />
                                 </svg>
                              </div>
                           </AdibTooltip>
                        )}
                     </div>
                  </td>
                  <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">{localeDate(created_at, 'fullDate')}</div>
                  </td>
               </tr>
            )
         }
         case 'transfers': {
            const transfers: InternalTransfer = item
            const { sender_uid, receiver_uid, created_at, currency, amount, status, direction, receiver_username, sender_username } = transfers;
            const wallet = wallets.find(obj => obj.currency === currency);

            const formatCurrency = currencies.find(market => market.id === currency)
            const assetName = String(formatCurrency?.name);
            const iconUrl = String(formatCurrency?.icon_url);

            const stateType = () => {
               switch (status) {
                  case 'completed':
                     return 'succeed'
                  case 'submitted':
                  case 'accepted':
                  case 'accepted22':
                  case 'aml_processing':
                  case 'aml_suspicious':
                  case 'processing':
                  case 'skipped':
                  case 'fee_processing':
                  case 'errored':
                     return 'pending'
                  case 'canceled':
                  case 'rejected':
                     return 'failed'

                  default:
                     return status;
               }
            }
            const stateVariant = () => {
               switch (status) {
                  case 'completed':
                     return 'green'
                  case 'submitted':
                  case 'accepted':
                  case 'accepted22':
                  case 'aml_processing':
                  case 'aml_suspicious':
                  case 'processing':
                  case 'skipped':
                  case 'fee_processing':
                  case 'errored':
                     return 'yellow'
                  case 'canceled':
                  case 'rejected':
                     return 'orange'

                  default:
                     return;
               }
            }

            return (
               <tr style={{ transition: 'background .2s' }} className="group" key={index}>
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{index + 1} .</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text={stateType()}
                        variant={stateVariant()}
                     />
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex items-center space-x-3">
                        <div className="shrink-0 w-8">
                           <Image
                              className={`w-full ${renderCurrencyIcon(currency, iconUrl)?.includes('http') ? 'polygon' : ''}`}
                              src={renderCurrencyIcon(currency, iconUrl)}
                              alt={assetName}
                              title={assetName}
                              height={40}
                              width={40}
                           />
                        </div>
                        <div>
                           {assetName || currency}
                        </div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{wallet && Decimal.format(amount, currency === 'idr' ? 0 : wallet.fixed, ',')} {String(currency)?.toUpperCase()}</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <AdibTooltip
                        content={
                           <div className="font-pop text-xs font-medium leading-none">
                              {sender_username}
                           </div>
                        }
                        followCursorProps={false}
                     >
                        <div>{sender_uid}</div>
                     </AdibTooltip>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <AdibTooltip
                        content={
                           <div className="font-pop text-xs font-medium leading-none">
                              {receiver_username}
                           </div>
                        }
                        followCursorProps={false}
                     >
                        <div>{receiver_uid}</div>
                     </AdibTooltip>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className={`${direction === 'in' ? 'text-primary5' : 'text-primary4'} uppercase`}>{direction}</div>
                  </td>
                  <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">{localeDate(created_at, 'fullDate')}</div>
                  </td>
               </tr>
            )
         }
         case 'trades': {
            const trades: PrivateTradeEvent = item;
            const { created_at, side, market, price, amount, total } = trades;
            const marketToDisplay = marketsData.find(m => m.id === market) || { name: '', price_precision: 0, amount_precision: 0 };
            const marketName = marketToDisplay ? marketToDisplay.name : market;
            const sideText = setTradesType(side).text.toLowerCase() ? intl(`page.body.history.trade.content.side.${setTradesType(side).text.toLowerCase()}`) : '';

            return (
               <tr style={{ transition: 'background .2s' }} className="group" key={index}>
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{index + 1} .</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text={sideText}
                        variant={side === 'buy' ? 'green' : 'orange'}
                     />
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex space-x-3 items-center">
                        <div className="shrink-0 w-8">
                           <Image
                              className={`w-full ${renderCurrencyIcon(marketToDisplay?.base_unit, marketToDisplay?.iconUrl)?.includes('http') ? 'polygon' : ''}`}
                              src={renderCurrencyIcon(marketToDisplay?.base_unit, marketToDisplay?.iconUrl)}
                              alt={marketName}
                              title={marketName}
                              height={40}
                              width={40}
                           />
                        </div>
                        <div className="uppercase">
                           {marketName.includes('/') ? (
                              <div>{marketName.split('/').shift()} <span className="text-neutral4">/{marketName.split('/').pop()}</span></div>
                           ) : marketName}
                        </div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     {Decimal.format(price, marketToDisplay.price_precision, ',')}
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     {Decimal.format(amount, marketToDisplay.amount_precision, ',')}
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">
                        {total}
                     </div>
                  </td>
                  <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">{localeDate(created_at, 'fullDate')}</div>
                  </td>
               </tr>
            )
         }
         default: {
            return [];
         }
      }
   }

   const onClickPrevPage = () => fetchUpdate({ page: page - 1 });

   const onClickNextPage = () => fetchUpdate({ page: page + 1 });

   const formatState = () => {
      switch (core) {
         case 'deposits':
            switch (state) {
               case 'succeed':
                  return 'collected'
               case 'pending':
                  return 'processing'
               case 'failed':
                  return 'rejected'
               case 'refund':
                  return 'refunding'

               default:
                  return;
            }
         case 'withdraws':
            switch (state) {
               case 'succeed':
                  return state
               case 'pending':
                  return 'processing'
               case 'failed':
                  return state

               default:
                  return;
            }

         default:
            return;
      }
   }

   function handleCopy(id: string) {
      copyToClipboard(id);
      toast.success('Transaction id Copied');
   }

   return (
      <div className="space-y-8">
         <table className="w-full table-auto">
            <thead>
               {renderHead()}
            </thead>
            <tbody>
               {fetching ? (
                  <tr>
                     <td colSpan={10} className="align-middle text-center">
                        <div className="space-y-3 mt-3">
                           <div className="h-4 rounded-2xl w-full bg-neutral6 dark:bg-neutral3 animate-pulse" />
                           <div className="h-4 rounded-2xl w-full bg-neutral6 dark:bg-neutral3 animate-pulse" />
                           <div className="h-4 rounded-2xl w-full bg-neutral6 dark:bg-neutral3 animate-pulse" />
                        </div>
                     </td>
                  </tr>
               ) : list.length > 0 ? (
                  retrieveData().length ? retrieveData() : (
                     <tr>
                        <td colSpan={10}>
                           <div className="min-h-96 flex flex-col items-center justify-center space-y-3">
                              <IcEmty />
                              <div className="text-xs font-semibold text-neutral4">
                                 {intl('noResultFound')}
                              </div>
                           </div>
                        </td>
                     </tr>
                  )
               ) : (
                  <tr>
                     <td colSpan={10}>
                        <div className="min-h-96 flex flex-col items-center justify-center space-y-3">
                           <IcEmty />
                           <div className="text-xs font-semibold text-neutral4">
                              {intl('noResultFound')}
                           </div>
                        </div>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
         <Pagination
            firstElemIndex={firstElemIndex}
            lastElemIndex={lastElemIndex}
            page={page}
            nextPageExists={nextPageExists}
            onClickPrevPage={onClickPrevPage}
            onClickNextPage={onClickNextPage}
         />
      </div>
   )
};
