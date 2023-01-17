import React, { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Dialog, Export, InputGroup, Nav, Portal, TableActivity } from 'components';
import { Currency, Market, RootState, Wallet, WalletHistoryList, alertPush, currenciesFetch, fetchHistory, marketsFetch, resetHistory, selectCurrencies, selectCurrentPage, selectFirstElemIndex, selectHistory, selectHistoryLoading, selectLastElemIndex, selectMarkets, selectNextPageExists, selectWallets, walletsFetch } from 'modules';
import { IntlProps } from 'index';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { IcShorting, icBitcoin, icBitcoinCash, icEthereum, icTether } from 'assets';

interface ReduxProps {
   currencies: Currency[];
   marketsData: Market[];
   wallets: Wallet[];
   list: WalletHistoryList;
   fetching: boolean;
   page: number;
   firstElemIndex: number;
   lastElemIndex: number;
   nextPageExists: boolean;
}
interface DispatchProps {
   resetHistory: typeof resetHistory;
   fetchMarkets: typeof marketsFetch;
   fetchWallets: typeof walletsFetch;
   fetchHistory: typeof fetchHistory;
   fetchCurrencies: typeof currenciesFetch;
   alertPush: typeof alertPush;
}

type OwnProps = {
   title?: string;
   hiddenCategory?: number[];
}

type TableFinanceProps = OwnProps & ReduxProps & DispatchProps & IntlProps;

const TableFinanceFC = ({
   title,
   hiddenCategory,
   currencies,
   marketsData,
   wallets,
   list,
   fetching,
   page,
   firstElemIndex,
   lastElemIndex,
   nextPageExists,
   resetHistory,
   fetchMarkets,
   fetchWallets,
   fetchHistory,
   fetchCurrencies,
   alertPush,
   intl
}: TableFinanceProps) => {
   const [activeTab, setActiveTab] = useState(hiddenCategory && hiddenCategory?.includes(4) ? 1 : hiddenCategory?.includes(3) ? 4 : 0);
   const [filter, setFilter] = useState({
      startDate: '',
      endDate: '',
      currency: '',
      state: '',
      advanceFilter: false,
   });
   const [q, setQ] = useState('');
   const [showFilter, setShowFilter] = useState(false)
   const [showExport, setShowExport] = useState(false);

   useEffect(() => {
      if (!marketsData.length) {
         fetchMarkets();
      }
      if (!wallets.length) {
         fetchWallets();
      }
      return () => {
         resetHistory();
      }
   }, [activeTab]);

   const handleShowExport = () => setShowExport(!showExport);

   const handleShowAdvanceFilter = () => setFilter({ ...filter, advanceFilter: !filter.advanceFilter });

   const translate = (id: string) => intl.formatMessage({ id });

   const renderAllTypes = useMemo(() => {
      return (
         <table className="w-full table-auto">
            <thead>
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
            </thead>
            <tbody>
               <tr style={{ transition: 'background .2s' }} className="group">
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>1.</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text="withdraw"
                     />
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex space-x-3 items-center">
                        <div className="shrink-0 w-8">
                           <img className="max-w-full" src={icBitcoin} alt="" />
                        </div>
                        <div>Bitcoin</div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>0.000434344 BTC</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>3DkQyAdif6kQLPMBu</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="text-neutral4">3DkQyAdif6kQLPMBu</div>
                  </td>
                  <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">17-05-2021 04:12:30</div>
                  </td>
               </tr>
               <tr style={{ transition: 'background .2s' }} className="group">
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>2.</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text="Deposited"
                        variant="green"
                     />
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex space-x-3 items-center">
                        <div className="shrink-0 w-8">
                           <img className="max-w-full" src={icBitcoinCash} alt="" />
                        </div>
                        <div>Bitcoin Cash</div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>0.000434344 BTC</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>3DkQyAdif6kQLPMBu</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="text-neutral4">3DkQyAdif6kQLPMBu</div>
                  </td>
                  <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">17-05-2021 04:12:30</div>
                  </td>
               </tr>
               <tr style={{ transition: 'background .2s' }} className="group">
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>3.</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text="withdraw"
                     />
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex space-x-3 items-center">
                        <div className="shrink-0 w-8">
                           <img className="max-w-full" src={icEthereum} alt="" />
                        </div>
                        <div>Etherium</div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>0.00051799 ETH</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>3DkQyAdif6kQLPMBu</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="text-neutral4">3DkQyAdif6kQLPMBu</div>
                  </td>
                  <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">17-05-2021 04:12:30</div>
                  </td>
               </tr>
               <tr style={{ transition: 'background .2s' }} className="group">
                  <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs py-5 pr-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>4.</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <Badge
                        text="Deposited"
                        variant="green"
                     />
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="flex space-x-3 items-center">
                        <div className="shrink-0 w-8">
                           <img className="max-w-full" src={icTether} alt="" />
                        </div>
                        <div>Tether</div>
                     </div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>13,000 USDT</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div>3DkQyAdif6kQLPMBu</div>
                  </td>
                  <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                     <div className="text-neutral4">3DkQyAdif6kQLPMBu</div>
                  </td>
                  <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                     <div className="text-neutral4">17-05-2021 04:12:30</div>
                  </td>
               </tr>
            </tbody>
         </table>
      )
   }, []);

   const renderActivity = () => {
      switch (activeTab) {
         case 1:
            return <TableActivity
               type="deposits"
               search={q}
               intl={translate}
               currencies={currencies}
               marketsData={marketsData}
               wallets={wallets}
               list={list}
               fetching={fetching}
               page={page}
               firstElemIndex={firstElemIndex}
               lastElemIndex={lastElemIndex}
               nextPageExists={nextPageExists}
               fetchCurrencies={fetchCurrencies}
               fetchHistory={fetchHistory}
               alertPush={alertPush}
            />
         case 2:
            return <TableActivity
               type="withdraws"
               search={q}
               intl={translate}
               currencies={currencies}
               marketsData={marketsData}
               wallets={wallets}
               list={list}
               fetching={fetching}
               page={page}
               firstElemIndex={firstElemIndex}
               lastElemIndex={lastElemIndex}
               nextPageExists={nextPageExists}
               fetchCurrencies={fetchCurrencies}
               fetchHistory={fetchHistory}
               alertPush={alertPush}
            />
         case 3:
            return <TableActivity
               type="internal_transfers"
               search={q}
               intl={translate}
               currencies={currencies}
               marketsData={marketsData}
               wallets={wallets}
               list={list}
               fetching={fetching}
               page={page}
               firstElemIndex={firstElemIndex}
               lastElemIndex={lastElemIndex}
               nextPageExists={nextPageExists}
               fetchCurrencies={fetchCurrencies}
               fetchHistory={fetchHistory}
            />
         case 4:
            return <TableActivity
               type="trades"
               search={q}
               intl={translate}
               currencies={currencies}
               marketsData={marketsData}
               wallets={wallets}
               list={list}
               fetching={fetching}
               page={page}
               firstElemIndex={firstElemIndex}
               lastElemIndex={lastElemIndex}
               nextPageExists={nextPageExists}
               fetchCurrencies={fetchCurrencies}
               fetchHistory={fetchHistory}
            />
         default:
            return renderAllTypes
      }
   };

   const type = activeTab === 0
      ? 'all type' : activeTab === 1
         ? 'deposit' : activeTab === 2
            ? 'withdrawls' : activeTab === 3
               ? 'internal transfer' : 'my trades';

   return (
      <>
         <div className="block md:flex items-center justify-between mb-8 p-0 md:pb-8 border-b-0 md:border-b border-neutral6 dark:border-neutral3">
            <div className="flex space-x-4">
               {!hiddenCategory?.includes(0) && (
                  <Nav
                     title="All type"
                     isActive={activeTab === 0}
                     onClick={() => setActiveTab(0)}
                  />
               )}
               {!hiddenCategory?.includes(1) && (
                  <Nav
                     title="Deposit"
                     isActive={activeTab === 1}
                     onClick={() => setActiveTab(1)}
                  />
               )}
               {!hiddenCategory?.includes(2) && (
                  <Nav
                     title="Withdraw"
                     isActive={activeTab === 2}
                     onClick={() => setActiveTab(2)}
                  />
               )}
               {!hiddenCategory?.includes(3) && (
                  <Nav
                     title="Transfer"
                     isActive={activeTab === 3}
                     onClick={() => setActiveTab(3)}
                  />
               )}
               {!hiddenCategory?.includes(4) && (
                  <Nav
                     title="My trades"
                     isActive={activeTab === 4}
                     onClick={() => setActiveTab(4)}
                  />
               )}
            </div>
            <div className="flex space-x-4">
               <div className="w-64">
                  <InputGroup
                     autoFocus
                     placeholder="Search"
                     size="normal"
                     value={q}
                     onChange={setQ}
                     icon={
                        <svg className="h-5 w-5 fill-neutral4">
                           <use xlinkHref="#icon-search"></use>
                        </svg>
                     }
                  />
               </div>
               <Button
                  text='All time'
                  variant="outline"
                  size="normal"
                  width="noFull"
                  onClick={() => setShowFilter(true)}
                  icRight={
                     <svg className="ml-3 w-4 h-4 fill-neutral4 group-hover:fill-neutral8 transition-all">
                        <use xlinkHref="#icon-calendar"></use>
                     </svg>
                  }
               />
            </div>
         </div>
         <div className="flex items-center justify-between mb-10.5">
            <div className="text-3.5xl leading-tight tracking-custom1 font-dm font-bold">
               {title}
            </div>
            <Button
               text="Export"
               size="normal"
               onClick={handleShowExport}
               icLeft={
                  <svg className="mr-3 w-4 h-4 fill-neutral8 transition-all duration-200">
                     <use xlinkHref="#icon-arrow-bottom" />
                  </svg>
               }
               disabled={list.length <= 0}
               width="noFull"
            />
         </div>
         <div className="overflow-x-auto">
            {renderActivity()}
         </div>
         <Dialog
            isOpen={showFilter}
            setIsOpen={() => {
               setShowFilter(false)
               setFilter({ ...filter, advanceFilter: false })
            }}
            title="Filter"
         >
            <div className="grid grid-cols-2 gap-3">
               <InputGroup
                  type="date"
                  label="start date"
               />
               <InputGroup
                  type="date"
                  label="end date"
               />
            </div>
            <div className="flex justify-between items-center space-x-2">
               <div className="w-full h-0.5 bg-[#B6DFD9] rounded" />
               <div
                  className="flex justify-between items-center space-x-2 cursor-pointer"
                  onClick={handleShowAdvanceFilter}
               >
                  <div className="text-xs font-medium whitespace-nowrap leading-5">
                     ADVANCE FILTER
                  </div>
                  <svg className={`${filter.advanceFilter ? '' : 'rotate-180'} w-6 h-6 fill-neutral4 transition-all duration-300`}>
                     <use xlinkHref="#icon-arrow-down" />
                  </svg>
               </div>
            </div>
            {filter.advanceFilter && (
               <>
                  <InputGroup
                     label="asset name"
                     placeholder="search asset"
                  />
                  <InputGroup
                     label="state type"
                     placeholder="State"
                  />
               </>
            )}
            <div className="grid grid-cols-2 gap-3">
               <Button
                  text="Apply"
               />
               <Button
                  text="Reset"
                  variant="outline"
               />
            </div>
         </Dialog>
         <Portal
            title="Confirm download"
            show={showExport}
            close={handleShowExport}
         >
            <div>
               <div className="mt-16.5 space-y-8">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary3">
                     <svg className="w-10 h-10 fill-neutral8 transition-colors duration-300">
                        <use xlinkHref="#icon-arrow-bottom"></use>
                     </svg>
                  </div>
                  <div className="text-center text-base leading-normal font-medium">
                     Are you sure you want to download the filename <strong className="font-bold capitalize text-primary4 tracking-wider">{type}</strong> ?
                  </div>
                  <Export
                     title="Continue"
                     csvData={list}
                     fileName={type}
                     onClick={handleShowExport}
                  />
               </div>
            </div>
         </Portal>
      </>
   )
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   currencies: selectCurrencies(state),
   marketsData: selectMarkets(state),
   wallets: selectWallets(state),
   list: selectHistory(state),
   fetching: selectHistoryLoading(state),
   page: selectCurrentPage(state),
   firstElemIndex: selectFirstElemIndex(state, 10),
   lastElemIndex: selectLastElemIndex(state, 10),
   nextPageExists: selectNextPageExists(state, 10),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   fetchMarkets: () => dispatch(marketsFetch()),
   fetchWallets: () => dispatch(walletsFetch()),
   fetchHistory: payload => dispatch(fetchHistory(payload)),
   resetHistory: () => dispatch(resetHistory()),
   fetchCurrencies: () => dispatch(currenciesFetch()),
   alertPush: message => dispatch(alertPush(message)),
});

export const TableFinance = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps),
)(TableFinanceFC) as any;
