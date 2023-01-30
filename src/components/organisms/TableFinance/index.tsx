import React, {
   FC,
   useEffect,
   useState
} from 'react';
import { compose } from 'redux';
import {
   MapDispatchToPropsFunction,
   connect
} from 'react-redux';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

import {
   Button,
   ComboboxCurrency,
   Dialog,
   Export,
   InputGroup,
   Label,
   Nav,
   Portal,
   TableActivity
} from 'components';
import {
   Currency,
   Market,
   RootState,
   Wallet,
   WalletHistoryList,
   currenciesFetch,
   fetchHistory,
   marketsFetch,
   resetHistory,
   selectCurrencies,
   selectCurrentPage,
   selectFirstElemIndex,
   selectHistory,
   selectHistoryLoading,
   selectLastElemIndex,
   selectMarkets,
   selectNextPageExists,
   selectWallets,
   walletsFetch
} from 'modules';
import { VALUATION_PRIMARY_CURRENCY, DEFAULT_WALLET } from '../../../constants';

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
}

type OwnProps = {
   title: string;
   hiddenCategory?: number[];
   currencyId?: string;
   withAdvancadFilter?: boolean;
}

type TableFinanceProps = OwnProps & ReduxProps & DispatchProps & IntlProps;

const TableFinanceFC: FC<TableFinanceProps> = ({
   title,
   hiddenCategory,
   currencyId,
   withAdvancadFilter,
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
   intl
}) => {
   const defaultWallet: Wallet = wallets.find(wallet => wallet.currency === VALUATION_PRIMARY_CURRENCY?.toLowerCase()) || wallets[0] || DEFAULT_WALLET;

   const [activeTab, setActiveTab] = useState(hiddenCategory && hiddenCategory?.includes(4) ? 1 : hiddenCategory?.includes(3) ? 4 : 0);
   const [q, setQ] = useState('');

   const [showFilter, setShowFilter] = useState(false);
   const [showExport, setShowExport] = useState(false);

   const [filter, setFilter] = useState({
      startDate: new Date((new Date).getFullYear(), (new Date).getMonth(), 1),
      endDate: new Date(),
      currency: defaultWallet?.currency || 'usdt',
      state: '',
      advanceFilter: false,
      isApply: false,
   });
   const { startDate, endDate, currency, isApply, advanceFilter } = filter;

   const time_from = Math.floor(new Date(startDate).getTime() / 1000).toString()
   const time_to = Math.floor(new Date(endDate).getTime() / 1000).toString()

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

   const handleChangeStartDate = (startDate: Date) => {
      setFilter({ ...filter, startDate });
   }
   const handleChangeEndDate = (endDate: Date) => {
      setFilter({ ...filter, endDate })
   }
   const handleChangeAsset = (currency: string) => {
      setFilter({ ...filter, currency })
   }
   const handleApply = () => {
      setFilter({ ...filter, isApply: !isApply });
      setShowFilter(false);
   }

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
               advanceFilter={advanceFilter}
               time_from={time_from}
               time_to={time_to}
               isApply={isApply}
               handleApply={handleApply}
               market={currency}
               currencyId={currencyId}
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
               advanceFilter={advanceFilter}
               time_from={time_from}
               time_to={time_to}
               isApply={isApply}
               handleApply={handleApply}
               market={currency}
               currencyId={currencyId}
            />
         case 3:
            return <TableActivity
               type="transfers"
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
               advanceFilter={advanceFilter}
               time_from={time_from}
               time_to={time_to}
               isApply={isApply}
               handleApply={handleApply}
               market={currency}
               currencyId={currencyId}
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
               advanceFilter={advanceFilter}
               time_from={time_from}
               time_to={time_to}
               isApply={isApply}
               handleApply={handleApply}
               market={currency}
               currencyId={currencyId}
            />
         default:
            return <TableActivity
               type="transactions"
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
               advanceFilter={advanceFilter}
               time_from={time_from}
               time_to={time_to}
               isApply={isApply}
               handleApply={handleApply}
               market={currency}
               currencyId={currencyId}
            />
      }
   };

   const type = activeTab === 0
      ? 'transactions' : activeTab === 1
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
                  onClick={() => {
                     setQ('');
                     setShowFilter(true);
                  }}
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
               setFilter({ ...filter, advanceFilter: false });
            }}
            title="Filter"
         >
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2.5">
                  <Label label="start date" />
                  <div className="relative">
                     <DatePicker
                        selected={startDate}
                        onChange={handleChangeStartDate}
                        dateFormat="MMM dd, yyyy"
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        scrollableMonthYearDropdown
                     />
                     <button className="absolute top-3 right-3.5 -z-2">
                        <svg className="w-6 h-6 fill-neutral4 transition-all duration-300">
                           <use xlinkHref="#icon-calendar" />
                        </svg>
                     </button>
                  </div>
               </div>
               <div className="space-y-2.5">
                  <Label label="start date" />
                  <div className="relative">
                     <DatePicker
                        selected={endDate}
                        onChange={handleChangeEndDate}
                        dateFormat="MMM dd, yyyy"
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        scrollableMonthYearDropdown
                     />
                     <button className="absolute top-3 right-3.5 -z-2">
                        <svg className="w-6 h-6 fill-neutral4 transition-all duration-300">
                           <use xlinkHref="#icon-calendar" />
                        </svg>
                     </button>
                  </div>
               </div>
            </div>
            {withAdvancadFilter && (
               <>
                  <div className="flex justify-between items-center space-x-2">
                     <div className="w-full h-px bg-neutral6 dark:bg-neutral3 rounded" />
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
                  <div className={`space-y-8 ${filter.advanceFilter ? 'h-44 opacity-100 visible' : 'h-0 opacity-0 -translate-y-4 !mt-0 invisible'} transition-all duration-300`}>
                     <ComboboxCurrency onChange={handleChangeAsset} />
                     <InputGroup
                        label="state type"
                        placeholder="State"
                     />
                  </div>
               </>
            )}
            <div className="grid grid-cols-2 gap-4">
               <Button
                  text="Apply"
                  onClick={handleApply}
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
});

export const TableFinance = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps),
)(TableFinanceFC) as FC<OwnProps>;

TableFinance.defaultProps = {
   withAdvancadFilter: true
}
