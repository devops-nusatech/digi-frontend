import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
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
   Currency,
   Deposit,
   fetchHistory,
   InternalTransfer,
   Market,
   OrderSide,
   PrivateTradeEvent,
   Transaction,
   User,
   Wallet,
   WalletHistoryList,
   Withdraw,
} from 'modules';
import { IcEmty, IcShorting } from 'assets';
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
   fetchHistory: typeof fetchHistory;
   isApply: boolean;
   advanceFilter: boolean;
   handleApply: () => void;
   currencyId?: string;
   direction: Direction;
   user: User;
   state: State;
   type?: OrderSide;
}

export const TableActivity = memo(
   ({
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
      fetchHistory,
      isApply,
      advanceFilter,
      handleApply,
      currencyId,
      direction,
      user,
      state,
      type,
   }: TableActivityProps) => {
      const { markets } = useMarket();

      const formatState = useMemo(() => {
         switch (core) {
            case 'deposits':
               switch (state) {
                  case 'succeed':
                     return 'collected';
                  case 'pending':
                     return 'processing';
                  case 'failed':
                     return 'rejected';
                  case 'refund':
                     return 'refunding';

                  default:
                     return;
               }
            case 'withdraws':
               switch (state) {
                  case 'succeed':
                     return state;
                  case 'pending':
                     return 'processing';
                  case 'failed':
                     return state;

                  default:
                     return;
               }

            default:
               return;
         }
      }, [core, state]);

      const fetchUpdate = useCallback(
         ({ page }: { page: number }) => {
            fetchHistory({
               page,
               core,
               limit: 10,
               ...(currencyId && { currency: currencyId }),
               ...(isApply && core !== 'transfers' && { time_from, time_to }),
               // ...(core === 'transfers' && { sender: user.uid }),
               ...(advanceFilter &&
                  core !== 'trades' && { currency, state: formatState }),
               ...(advanceFilter &&
                  core === 'trades' &&
                  market &&
                  type && { market, type }),
            });
         },
         [
            advanceFilter,
            core,
            currency,
            currencyId,
            fetchHistory,
            formatState,
            isApply,
            market,
            time_from,
            time_to,
            type,
         ]
      );

      const handleFilter = useCallback(
         () => fetchUpdate({ page: 0 }),
         [fetchUpdate]
      );

      useEffect(() => {
         if (core) {
            fetchHistory({ page: 0, core, limit: 10 });
         }
      }, [core, fetchHistory]);

      useEffect(() => {
         if (isApply) {
            handleFilter();
            handleApply();
         }
      }, [handleApply, handleFilter, isApply]);

      const renderHead = useMemo(() => {
         switch (core) {
            case 'transactions':
               return (
                  <tr>
                     <th className="border-b border-neutral6 pr-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>#</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Type</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Coin</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Amount</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Address</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Transaction ID</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 pl-4 pb-6 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div>Date</div>
                     </th>
                  </tr>
               );
            case 'deposits':
               return (
                  <tr>
                     <th className="border-b border-neutral6 pr-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>#</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Status</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Currency</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Amount</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>TX-ID</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 pl-4 pb-6 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div>Date</div>
                     </th>
                  </tr>
               );
            case 'withdraws':
               return (
                  <tr>
                     <th className="border-b border-neutral6 pr-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>#</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Status</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Currency</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Amount</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Address</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>TX-ID</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 pl-4 pb-6 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div>Date</div>
                     </th>
                  </tr>
               );
            case 'transfers':
               return (
                  <tr>
                     <th className="border-b border-neutral6 pr-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>#</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Status</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Currency</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Amount</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Sender</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Receiver</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Direction</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 pl-4 pb-6 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div>Date</div>
                     </th>
                  </tr>
               );
            case 'trades':
               return (
                  <tr>
                     <th className="border-b border-neutral6 pr-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>#</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Side</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center space-x-1">
                           <div>Market</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center justify-end space-x-1">
                           <div>Price</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center justify-end space-x-1">
                           <div>Amount</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div className="flex cursor-pointer items-center justify-end space-x-1">
                           <div>Total</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="border-b border-neutral6 pl-4 pb-6 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                        <div>Date</div>
                     </th>
                  </tr>
               );
            default:
               return;
         }
      }, [core]);

      const handleCopy = useCallback((id: string) => {
         copyToClipboard(id);
         toast.success('Transaction id Copied');
      }, []);

      const getBlockchainLink = useCallback(
         (
            currency: string,
            blockchainKey: string,
            { txid, rid }: { txid?: string; rid?: string }
         ) => {
            const currencyInfo =
               wallets && wallets.find(wallet => wallet.currency === currency);
            const blockchainCurrency = currencyInfo?.networks?.find(
               blockchain_cur => blockchain_cur.blockchain_key === blockchainKey
            );
            if (currencyInfo) {
               if (txid && blockchainCurrency?.explorer_transaction) {
                  return blockchainCurrency?.explorer_transaction.replace(
                     '#{txid}',
                     txid
                  );
               }
               if (rid && blockchainCurrency?.explorer_address) {
                  return blockchainCurrency?.explorer_address.replace(
                     '#{address}',
                     rid
                  );
               }
            }

            return '';
         },
         [wallets]
      );

      const renderActivity = useCallback(
         (item, index: number) => {
            switch (core) {
               case 'transactions': {
                  const transactions: Transaction = item;
                  const { address, currency, amount, txid, created_at, type } =
                     transactions;

                  // const state = intl(`page.body.history.withdraw.content.status.${item.state}`);
                  const wallet = wallets.find(obj => obj.currency === currency);

                  const formatCurrency = currencies.find(
                     market => market.id === currency
                  );
                  const assetName = String(formatCurrency?.name);
                  const iconUrl = String(formatCurrency?.icon_url);

                  return (
                     <tr
                        key={txid}
                        style={{ transition: 'background .2s' }}
                        className="group">
                        <td className="rounded-l-xl py-5 pr-4 align-middle text-xs font-semibold leading-custom4 text-neutral4 transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div>{index + 1}.</div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <Badge
                              text={type}
                              variant={
                                 type === 'Withdraw'
                                    ? 'green'
                                    : 'Deposit'
                                    ? 'orange'
                                    : 'yellow'
                              }
                           />
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="flex items-center space-x-3">
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
                                    src={renderCurrencyIcon(currency, iconUrl)}
                                    alt={assetName}
                                    title={assetName}
                                    height={40}
                                    width={40}
                                 />
                              </div>
                              <div>{assetName || currency}</div>
                           </div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div>
                              <div>
                                 {wallet &&
                                    Decimal.format(
                                       amount,
                                       currency === 'idr' ? 0 : wallet.fixed,
                                       ','
                                    )}{' '}
                                 {String(currency)?.toUpperCase()}
                              </div>
                           </div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <AdibTooltip
                              content={
                                 <div className="font-pop text-xs font-medium leading-none">
                                    {address}
                                 </div>
                              }>
                              <div>{truncateMiddle(address, 20)}</div>
                           </AdibTooltip>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="flex items-center">
                              <AdibTooltip
                                 content={
                                    <div className="font-pop text-xs font-medium leading-none">
                                       {txid}
                                    </div>
                                 }>
                                 <div className="text-neutral4">
                                    {truncateMiddle(txid, 20)}
                                 </div>
                              </AdibTooltip>
                              <AdibTooltip
                                 content={
                                    <div className="font-pop text-xs font-medium leading-none">
                                       Copy to clipboard
                                    </div>
                                 }>
                                 <div
                                    className="cursor-copy"
                                    onClick={() => handleCopy(txid)}>
                                    <svg className="ml-2 h-4 w-4 fill-neutral4 transition-all duration-300 hover:fill-neutral2">
                                       <use xlinkHref="#icon-copy" />
                                    </svg>
                                 </div>
                              </AdibTooltip>
                           </div>
                        </td>
                        <td className="rounded-r-xl py-5 pl-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="whitespace-nowrap text-neutral4">
                              {localeDate(created_at, 'fullDate')}
                           </div>
                        </td>
                     </tr>
                  );
               }
               case 'deposits': {
                  const deposits: Deposit = item;
                  const { amount, created_at, currency, txid, blockchain_key } =
                     deposits;
                  const blockchainLink = getBlockchainLink(
                     currency,
                     blockchain_key,
                     {
                        txid,
                     }
                  );
                  const wallet = wallets.find(obj => obj.currency === currency);
                  // const itemCurrency = currencies && currencies.find(cur => cur.id === currency);
                  // const blockchainCurrency = itemCurrency?.networks.find(blockchain_cur => blockchain_cur.blockchain_key === item.blockchain_key);
                  // const minConfirmations = blockchainCurrency?.min_confirmations;
                  // const state = (item.state === 'submitted' && confirmations !== undefined && minConfirmations !== undefined) ? (
                  //    `${confirmations}/${minConfirmations}`
                  // ) : (
                  //    intl(`page.body.history.deposit.content.status.${item.state}`)
                  // );

                  const formatCurrency = currencies.find(
                     market => market.id === currency
                  );
                  const assetName = String(formatCurrency?.name);
                  const iconUrl = String(formatCurrency?.icon_url);

                  const stateType = () => {
                     switch (deposits.state) {
                        case 'collected':
                           return 'succeed';
                        case 'submitted':
                        case 'accepted':
                        case 'accepted22':
                        case 'aml_processing':
                        case 'aml_suspicious':
                        case 'processing':
                        case 'skipped':
                        case 'fee_processing':
                        case 'errored':
                           return 'pending';
                        case 'canceled':
                        case 'rejected':
                           return 'failed';

                        default:
                           return deposits.state;
                     }
                  };
                  const stateVariant = () => {
                     switch (deposits.state) {
                        case 'collected':
                           return 'green';
                        case 'submitted':
                        case 'accepted':
                        case 'accepted22':
                        case 'aml_processing':
                        case 'aml_suspicious':
                        case 'processing':
                        case 'skipped':
                        case 'fee_processing':
                        case 'errored':
                           return 'yellow';
                        case 'canceled':
                        case 'rejected':
                           return 'orange';

                        default:
                           return;
                     }
                  };

                  return (
                     <tr
                        style={{ transition: 'background .2s' }}
                        className="group"
                        key={txid}>
                        <td className="rounded-l-xl py-5 pr-4 align-middle text-xs font-semibold leading-custom4 text-neutral4 transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div>{index + 1} .</div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <Badge
                              text={stateType()}
                              variant={stateVariant()}
                           />
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="flex items-center space-x-3">
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
                                    src={renderCurrencyIcon(currency, iconUrl)}
                                    alt={assetName}
                                    title={assetName}
                                    height={40}
                                    width={40}
                                 />
                              </div>
                              <div>{assetName || currency}</div>
                           </div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div>
                              {wallet &&
                                 Decimal.format(amount, wallet.fixed, ',')}{' '}
                              {String(currency)?.toUpperCase()}
                           </div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="flex items-center">
                              <AdibTooltip
                                 content={
                                    <div className="font-pop text-xs font-medium leading-none">
                                       {txid}
                                    </div>
                                 }>
                                 <a
                                    href={blockchainLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary1 hover:underline">
                                    {truncateMiddle(txid, 20)}
                                 </a>
                              </AdibTooltip>
                              {txid && (
                                 <AdibTooltip
                                    content={
                                       <div className="font-pop text-xs font-medium leading-none">
                                          Copy to clipboard
                                       </div>
                                    }>
                                    <div
                                       className="cursor-copy"
                                       onClick={() => handleCopy(txid)}>
                                       <svg className="ml-2 h-4 w-4 fill-neutral4 transition-all duration-300 hover:fill-neutral2">
                                          <use xlinkHref="#icon-copy" />
                                       </svg>
                                    </div>
                                 </AdibTooltip>
                              )}
                           </div>
                        </td>
                        <td className="rounded-r-xl py-5 pl-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="text-neutral4">
                              {localeDate(created_at, 'fullDate')}
                           </div>
                        </td>
                     </tr>
                  );
               }
               case 'withdraws': {
                  const withdraws: Withdraw = item;
                  const {
                     created_at,
                     currency,
                     amount,
                     rid,
                     blockchain_txid,
                     blockchain_key,
                  } = withdraws;
                  const t = intl(
                     `page.body.history.withdraw.content.status.${item.state}`
                  );
                  const blockchainLink = getBlockchainLink(
                     currency,
                     blockchain_key,
                     {
                        rid,
                     }
                  );
                  const blockchainTXID = getBlockchainLink(
                     currency,
                     blockchain_key,
                     {
                        txid: blockchain_txid,
                     }
                  );
                  const wallet = wallets.find(obj => obj.currency === currency);

                  const formatCurrency = currencies.find(
                     market => market.id === currency
                  );
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
                           return 'pending';
                        case 'canceled':
                        case 'rejected':
                        case 'failed':
                           return t;

                        default:
                           return '';
                     }
                  };
                  const stateVariant = () => {
                     switch (withdraws.state) {
                        case 'succeed':
                           return 'green';
                        case 'prepared':
                        case 'submitted':
                        case 'accepted':
                        case 'processing':
                        case 'skipped':
                           return 'yellow';
                        case 'canceled':
                        case 'rejected':
                        case 'failed':
                           return 'orange';

                        default:
                           return;
                     }
                  };

                  return (
                     <tr
                        style={{ transition: 'background .2s' }}
                        className="group"
                        key={index}>
                        <td className="rounded-l-xl py-5 pr-4 align-middle text-xs font-semibold leading-custom4 text-neutral4 transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div>{index + 1}. </div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <Badge
                              text={stateType()}
                              variant={stateVariant()}
                           />
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="flex items-center space-x-3">
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
                                    src={renderCurrencyIcon(currency, iconUrl)}
                                    alt={assetName}
                                    title={assetName}
                                    height={40}
                                    width={40}
                                 />
                              </div>
                              <div>{assetName || currency}</div>
                           </div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div>
                              {wallet &&
                                 Decimal.format(
                                    amount,
                                    currency === 'idr' ? 0 : wallet.fixed,
                                    ','
                                 )}{' '}
                              {String(currency)?.toUpperCase()}
                           </div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <AdibTooltip
                              content={
                                 <div className="font-pop text-xs font-medium leading-none">
                                    {rid}
                                 </div>
                              }>
                              <div>
                                 <a
                                    href={blockchainLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary1 hover:underline">
                                    {truncateMiddle(rid, 20)}
                                 </a>
                              </div>
                           </AdibTooltip>
                        </td>
                        <td className="py-5 px-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="flex items-center">
                              <AdibTooltip
                                 content={
                                    <div className="font-pop text-xs font-medium leading-none">
                                       {blockchain_txid}
                                    </div>
                                 }
                                 followCursorProps={false}>
                                 <a
                                    href={blockchainTXID}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary1 hover:underline">
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
                                    followCursorProps={false}>
                                    <div
                                       className="cursor-copy"
                                       onClick={() =>
                                          handleCopy(blockchain_txid)
                                       }>
                                       <svg className="ml-2 h-4 w-4 fill-neutral4 transition-all duration-300 hover:fill-neutral2">
                                          <use xlinkHref="#icon-copy" />
                                       </svg>
                                    </div>
                                 </AdibTooltip>
                              )}
                           </div>
                        </td>
                        <td className="rounded-r-xl py-5 pl-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="text-neutral4">
                              {localeDate(created_at, 'fullDate')}
                           </div>
                        </td>
                     </tr>
                  );
               }
               case 'transfers': {
                  const transfers: InternalTransfer = item;
                  const {
                     sender_uid,
                     receiver_uid,
                     created_at,
                     currency,
                     amount,
                     status,
                     direction,
                     receiver_username,
                     sender_username,
                  } = transfers;
                  const wallet = wallets.find(obj => obj.currency === currency);

                  const formatCurrency = currencies.find(
                     market => market.id === currency
                  );
                  const assetName = String(formatCurrency?.name);
                  const iconUrl = String(formatCurrency?.icon_url);

                  const stateType = () => {
                     switch (status) {
                        case 'completed':
                           return 'succeed';
                        case 'submitted':
                        case 'accepted':
                        case 'accepted22':
                        case 'aml_processing':
                        case 'aml_suspicious':
                        case 'processing':
                        case 'skipped':
                        case 'fee_processing':
                        case 'errored':
                           return 'pending';
                        case 'canceled':
                        case 'rejected':
                           return 'failed';

                        default:
                           return status;
                     }
                  };
                  const stateVariant = () => {
                     switch (status) {
                        case 'completed':
                           return 'green';
                        case 'submitted':
                        case 'accepted':
                        case 'accepted22':
                        case 'aml_processing':
                        case 'aml_suspicious':
                        case 'processing':
                        case 'skipped':
                        case 'fee_processing':
                        case 'errored':
                           return 'yellow';
                        case 'canceled':
                        case 'rejected':
                           return 'orange';

                        default:
                           return;
                     }
                  };

                  return (
                     <tr
                        style={{ transition: 'background .2s' }}
                        className="group"
                        key={index}>
                        <td className="rounded-l-xl py-5 pr-4 align-middle text-xs font-semibold leading-custom4 text-neutral4 transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div>{index + 1} .</div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <Badge
                              text={stateType()}
                              variant={stateVariant()}
                           />
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="flex items-center space-x-3">
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
                                    src={renderCurrencyIcon(currency, iconUrl)}
                                    alt={assetName}
                                    title={assetName}
                                    height={40}
                                    width={40}
                                 />
                              </div>
                              <div>{assetName || currency}</div>
                           </div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div>
                              {wallet &&
                                 Decimal.format(
                                    amount,
                                    currency === 'idr' ? 0 : wallet.fixed,
                                    ','
                                 )}{' '}
                              {String(currency)?.toUpperCase()}
                           </div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <AdibTooltip
                              content={
                                 <div className="font-pop text-xs font-medium leading-none">
                                    {sender_username}
                                 </div>
                              }
                              followCursorProps={false}>
                              <div>{sender_uid}</div>
                           </AdibTooltip>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <AdibTooltip
                              content={
                                 <div className="font-pop text-xs font-medium leading-none">
                                    {receiver_username}
                                 </div>
                              }
                              followCursorProps={false}>
                              <div>{receiver_uid}</div>
                           </AdibTooltip>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div
                              className={`${
                                 direction === 'in'
                                    ? 'text-primary5'
                                    : 'text-primary4'
                              } uppercase`}>
                              {direction}
                           </div>
                        </td>
                        <td className="rounded-r-xl py-5 pl-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="text-neutral4">
                              {localeDate(created_at, 'fullDate')}
                           </div>
                        </td>
                     </tr>
                  );
               }
               case 'trades': {
                  const trades: PrivateTradeEvent = item;
                  const { created_at, side, market, price, amount, total } =
                     trades;
                  const kokom = markets.find(m => m.id === market) || {
                     name: '',
                     price_precision: 0,
                     amount_precision: 0,
                  };
                  const marketToDisplay = kokom as Market;
                  const marketName = marketToDisplay
                     ? marketToDisplay.name
                     : market;
                  const sideText = setTradesType(side).text.toLowerCase()
                     ? intl(
                          `page.body.history.trade.content.side.${setTradesType(
                             side
                          ).text.toLowerCase()}`
                       )
                     : '';

                  return (
                     <tr
                        style={{ transition: 'background .2s' }}
                        className="group"
                        key={index}>
                        <td className="rounded-l-xl py-5 pr-4 align-middle text-xs font-semibold leading-custom4 text-neutral4 transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div>{index + 1} .</div>
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <Badge
                              text={sideText}
                              variant={side === 'buy' ? 'green' : 'orange'}
                           />
                        </td>
                        <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="flex items-center space-x-3">
                              <div className="w-8 shrink-0">
                                 <Image
                                    className={`w-full ${
                                       renderCurrencyIcon(
                                          marketToDisplay?.base_unit,
                                          marketToDisplay?.logo_url
                                       )?.includes('http')
                                          ? 'polygon'
                                          : ''
                                    }`}
                                    src={renderCurrencyIcon(
                                       marketToDisplay?.base_unit,
                                       marketToDisplay?.logo_url
                                    )}
                                    alt={marketName}
                                    title={marketName}
                                    height={40}
                                    width={40}
                                 />
                              </div>
                              <div className="uppercase">
                                 {marketName.includes('/') ? (
                                    <div>
                                       {marketName.split('/').shift()}{' '}
                                       <span className="text-neutral4">
                                          /{marketName.split('/').pop()}
                                       </span>
                                    </div>
                                 ) : (
                                    marketName
                                 )}
                              </div>
                           </div>
                        </td>
                        <td className="py-5 px-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           {Decimal.format(
                              price,
                              marketToDisplay.price_precision,
                              ','
                           )}
                        </td>
                        <td className="py-5 px-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           {Decimal.format(
                              amount,
                              marketToDisplay.amount_precision,
                              ','
                           )}
                        </td>
                        <td className="py-5 px-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="text-neutral4">{total}</div>
                        </td>
                        <td className="rounded-r-xl py-5 pl-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                           <div className="text-neutral4">
                              {localeDate(created_at, 'fullDate')}
                           </div>
                        </td>
                     </tr>
                  );
               }
               default: {
                  return [];
               }
            }
         },
         [
            core,
            currencies,
            getBlockchainLink,
            handleCopy,
            intl,
            markets,
            wallets,
         ]
      );

      const retrieveData = useMemo(
         () =>
            arrayFilter([...list], search).map((item, index) =>
               renderActivity(item, index)
            ),
         [list, renderActivity, search]
      );

      const onClickPrevPage = useCallback(
         () => fetchUpdate({ page: page - 1 }),
         [fetchUpdate, page]
      );
      const onClickNextPage = useCallback(
         () => fetchUpdate({ page: page + 1 }),
         [fetchUpdate, page]
      );

      return (
         <div className="space-y-8">
            <table className="w-full table-auto">
               <thead>{renderHead}</thead>
               <tbody>
                  {fetching ? (
                     <tr>
                        <td
                           colSpan={10}
                           className="text-center align-middle">
                           <div className="mt-3 space-y-3">
                              <div className="h-4 w-full animate-pulse rounded-2xl bg-neutral6 dark:bg-neutral3" />
                              <div className="h-4 w-full animate-pulse rounded-2xl bg-neutral6 dark:bg-neutral3" />
                              <div className="h-4 w-full animate-pulse rounded-2xl bg-neutral6 dark:bg-neutral3" />
                           </div>
                        </td>
                     </tr>
                  ) : list.length > 0 ? (
                     retrieveData.length ? (
                        retrieveData
                     ) : (
                        <tr>
                           <td colSpan={10}>
                              <div className="flex min-h-96 flex-col items-center justify-center space-y-3">
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
                           <div className="flex min-h-96 flex-col items-center justify-center space-y-3">
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
      );
   }
);
