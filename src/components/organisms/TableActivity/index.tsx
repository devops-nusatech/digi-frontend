import React, {
   useEffect,
   FC,
} from 'react';
import {
   Badge,
   Decimal,
   Pagination,
   Image,
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
   fetchHistory,
   Market,
   Wallet,
   WalletHistoryList,
} from 'modules';
import { IcEmty, IcShorting } from 'assets';
import { toast } from 'react-toastify';

interface TableActivityProps {
   type: string;
   search: string;
   intl: any;
   currencies: Currency[];
   marketsData: Market[];
   wallets: Wallet[];
   list: WalletHistoryList;
   fetching: boolean;
   page: number;
   firstElemIndex: number;
   lastElemIndex: number;
   nextPageExists: boolean;
   fetchCurrencies: typeof currenciesFetch;
   fetchHistory: typeof fetchHistory;
}

export const TableActivity: FC<TableActivityProps> = ({
   type,
   search,
   intl,
   currencies,
   marketsData,
   wallets,
   list,
   fetching,
   page,
   firstElemIndex,
   lastElemIndex,
   nextPageExists,
   fetchCurrencies,
   fetchHistory,

}) => {
   useEffect(() => {
      fetchHistory({ page: 0, type, limit: 10 });
   }, [type]);
   useEffect(() => {
      fetchCurrencies();
   }, [!currencies.length]);

   const renderHead = () => {
      switch (type) {
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
         case 'internal_transfers':
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

   const getBlockchainLink = (currency: string, txid: string, blockchainKey: string, rid?: string) => {
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
      switch (type) {
         case 'deposits': {
            const { amount, confirmations, created_at, currency, txid, blockchain_key, tid } = item;
            const blockchainLink = getBlockchainLink(currency, txid, blockchain_key, tid);
            const wallet = wallets.find(obj => obj.currency === currency);
            const itemCurrency = currencies && currencies.find(cur => cur.id === currency);
            const blockchainCurrency = itemCurrency?.networks.find(blockchain_cur => blockchain_cur.blockchain_key === item.blockchain_key);
            const minConfirmations = blockchainCurrency?.min_confirmations;
            const state = (item.state === 'submitted' && confirmations !== undefined && minConfirmations !== undefined) ? (
               `${confirmations}/${minConfirmations}`
            ) : (
               intl(`page.body.history.deposit.content.status.${item.state}`)
            );

            const formatCurrency = currencies.find(market => market.id === currency)
            const assetName = String(formatCurrency?.name);
            const iconUrl = String(formatCurrency?.icon_url);

            return (
               <tr style={{ transition: 'background .2s' }} className="group" key={txid}>
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{index + 1} .</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text={state === 'Collected' ? 'succeed' : state == 'processing' ? 'process' : 'failed'}
                        variant={state === 'Collected' ? 'green' : state === 'processing' ? 'yellow' : 'orange'}
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
                        <a href={blockchainLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary1 hover:underline">
                           {truncateMiddle(txid, 20)}
                        </a>
                        {txid && (
                           <div
                              title="Copy to clipboard"
                              className="cursor-copy"
                              onClick={() => handleCopy(txid)}
                           >
                              <svg className="ml-2 w-4 h-4 fill-neutral4 hover:fill-neutral2 cursor-pointer transition-all duration-300">
                                 <use xlinkHref="#icon-copy" />
                              </svg>
                           </div>
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
            const { txid, created_at, currency, amount, rid, blockchain_txid, blockchain_key } = item;
            const state = intl(`page.body.history.withdraw.content.status.${item.state}`);
            const blockchainLink = getBlockchainLink(currency, txid, blockchain_key, rid);
            const blockchainTXID = getBlockchainLink(currency, blockchain_txid, blockchain_key, rid);
            const wallet = wallets.find(obj => obj.currency === currency);

            const formatCurrency = currencies.find(market => market.id === currency)
            const assetName = String(formatCurrency?.name);
            const iconUrl = String(formatCurrency?.icon_url);

            return (
               <tr style={{ transition: 'background .2s' }} className="group" key={index}>
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{index + 1}. </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text={state}
                        variant={item.state === 'succeed' ? 'green' : state === 'confirming' ? 'yellow' : 'orange'}
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
                     <div>
                        <a href={blockchainLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary1 hover:underline">
                           {truncateMiddle(txid || rid, 20)}
                        </a>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="flex items-center">
                        <a href={blockchainTXID} target="_blank" rel="noopener noreferrer" className="hover:text-primary1 hover:underline" >
                           {truncateMiddle(blockchain_txid, 20)}
                        </a>
                        {blockchain_txid && (
                           <div title="Copy to clipboard" onClick={() => handleCopy(blockchain_txid)}>
                              <svg className="ml-2 w-4 h-4 fill-neutral4 hover:fill-neutral2 cursor-pointer transition-all duration-300">
                                 <use xlinkHref="#icon-copy" />
                              </svg>
                           </div>
                        )}
                     </div>
                  </td>
                  <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">{localeDate(created_at, 'fullDate')}</div>
                  </td>
               </tr>
            )
         }
         case 'internal_transfers': {
            const { sender_uid, receiver_uid, created_at, currency, amount, status, direction } = item;
            const wallet = wallets.find(obj => obj.currency === currency);

            const formatCurrency = currencies.find(market => market.id === currency)
            const assetName = String(formatCurrency?.name);
            const iconUrl = String(formatCurrency?.icon_url);

            return (
               <tr style={{ transition: 'background .2s' }} className="group" key={index}>
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{index + 1} .</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text={status}
                        variant={status === 'completed' ? 'green' : 'orange'}
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
                     <div>{sender_uid}</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>{receiver_uid}</div>
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
            const { id, created_at, side, market, price, amount, total } = item;
            const marketToDisplay = marketsData.find(m => m.id === market) ||
               { name: '', price_precision: 0, amount_precision: 0 };
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
                        {/* <div className="shrink-0 w-8">
                           <img className="max-w-full" src={icBitcoin} alt="" />
                        </div> */}
                        <div>{marketName.split('/').shift()} <span className="text-neutral4">/{marketName.split('/').pop()}</span></div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div> <Decimal key={id} fixed={marketToDisplay.price_precision} thousSep=",">{price}</Decimal></div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div><Decimal key={id} fixed={marketToDisplay.amount_precision} thousSep=",">{amount}</Decimal></div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">
                        <Decimal key={id} fixed={marketToDisplay.price_precision} thousSep=",">{total}</Decimal>
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

   const onClickPrevPage = () => fetchHistory({ page: Number(page) - 1, type, limit: 10 });

   const onClickNextPage = () => fetchHistory({ page: Number(page) + 1, type, limit: 10 });

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
