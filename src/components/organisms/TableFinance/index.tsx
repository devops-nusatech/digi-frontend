import React, {
   FC,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { compose } from 'redux';
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';

import {
   AdibDropdown,
   Button,
   ComboboxCurrency,
   ComboboxMarket,
   Dialog,
   Export,
   InputGroup,
   Label,
   Nav,
   Portal,
   TableActivity,
} from 'components';
import {
   Currency,
   OrderSide,
   RootState,
   User,
   Wallet,
   WalletHistoryList,
   fetchHistory,
   marketsFetch,
   resetHistory,
   selectCurrencies,
   selectCurrentPage,
   selectFirstElemIndex,
   selectHistory,
   selectHistoryLoading,
   selectLastElemIndex,
   selectNextPageExists,
   selectUserInfo,
   selectWallets,
   walletsFetch,
} from 'modules';
import { useDebounced } from 'hooks';
import { platformCurrency } from 'api';
import { DEFAULT_WALLET } from '../../../constants';

export type Direction = 'IN' | 'OUT' | '';
export type State = 'succeed' | 'pending' | 'failed' | 'refund';

type FilterState = {
   startDate: Date;
   endDate: Date;
   currency: string;
   market: string;
   state: State;
   type: OrderSide | '';
   advanceFilter: boolean;
   isApply: boolean;
   direction: Direction;
};

interface ReduxProps {
   user: User;
   currencies: Currency[];
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
   fetchWallets: typeof walletsFetch;
   fetchHistory: typeof fetchHistory;
}

type OwnProps = {
   title: string;
   hiddenCategory?: number[];
   currencyId?: string;
   withAdvancadFilter?: boolean;
};

type TableFinanceProps = OwnProps & ReduxProps & DispatchProps & IntlProps;

const TableFinanceFC: FC<TableFinanceProps> = ({
   title,
   hiddenCategory,
   currencyId,
   withAdvancadFilter,
   user,
   currencies,
   wallets,
   list,
   fetching,
   page,
   firstElemIndex,
   lastElemIndex,
   nextPageExists,
   resetHistory,
   fetchWallets,
   fetchHistory,
   intl,
}) => {
   const defaultWallet = useMemo<Wallet>(
      () =>
         wallets.find(
            wallet => wallet.currency === platformCurrency()?.toLowerCase()
         ) ||
         wallets[0] ||
         DEFAULT_WALLET,
      [wallets]
   );

   const [activeTab, setActiveTab] = useState(
      hiddenCategory && hiddenCategory?.includes(4)
         ? 1
         : hiddenCategory?.includes(3)
         ? 4
         : 0
   );
   const [q, setQ] = useState('');
   const [qDebounce] = useDebounced(q, 500);

   const [showFilter, setShowFilter] = useState(false);
   const [showExport, setShowExport] = useState(false);

   const [filter, setFilter] = useState<FilterState>({
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date(),
      currency: defaultWallet?.currency || 'usdt',
      market: '',
      state: 'succeed',
      type: '',
      advanceFilter: false,
      isApply: false,
      direction: '',
   });
   const {
      startDate,
      endDate,
      currency,
      market,
      state,
      isApply,
      advanceFilter,
      direction,
      type,
   } = filter;

   const time_from = useMemo(
      () => Math.floor(new Date(startDate).getTime() / 1000).toString(),
      [startDate]
   );
   const time_to = useMemo(
      () => Math.floor(new Date(endDate).getTime() / 1000).toString(),
      [endDate]
   );

   useEffect(() => {
      if (!wallets.length) {
         fetchWallets();
      }
      if (activeTab === 3) {
         setFilter({ ...filter, advanceFilter: true });
      }
      return () => {
         resetHistory();
      };
   }, [activeTab]);

   const handleShowExport = useCallback(
      () => setShowExport(!showExport),
      [showExport]
   );

   const handleShowAdvanceFilter = useCallback(
      () => setFilter({ ...filter, advanceFilter: !advanceFilter }),
      [advanceFilter, filter]
   );

   const translate = useCallback(
      (id: string) => intl.formatMessage({ id }),
      [intl]
   );

   const handleChangeStartDate = useCallback(
      (startDate: Date) => {
         setFilter({ ...filter, startDate });
      },
      [filter]
   );
   const handleChangeEndDate = useCallback(
      (endDate: Date) => {
         setFilter({ ...filter, endDate });
      },
      [filter]
   );
   const handleChangeAsset = useCallback(
      (currency: string) => {
         setFilter({ ...filter, currency });
      },
      [filter]
   );
   const handleChangeMarket = useCallback(
      (market: string) => {
         setFilter({ ...filter, market });
      },
      [filter]
   );
   const handleChangeState = useCallback(
      (state: State) => {
         setFilter({ ...filter, state, advanceFilter: true });
      },
      [filter]
   );
   const handleChangeType = useCallback(
      (type: OrderSide | '') => {
         setFilter({ ...filter, type });
      },
      [filter]
   );
   const handleApply = useCallback(() => {
      setFilter({ ...filter, isApply: !isApply });
      setShowFilter(false);
   }, [filter, isApply]);

   const renderStateType = useMemo<Array<string>>(() => {
      switch (activeTab) {
         case 0:
            return [''];
         case 1:
            return ['succeed', 'pending', 'failed', 'refund'];
         case 2:
            return ['succeed', 'pending', 'failed'];

         default:
            return [''];
      }
   }, [activeTab]);

   const renderActivity = useMemo(() => {
      switch (activeTab) {
         case 1:
            return (
               <TableActivity
                  core="deposits"
                  search={qDebounce}
                  intl={translate}
                  currencies={currencies}
                  wallets={wallets}
                  list={list}
                  fetching={fetching}
                  page={page}
                  firstElemIndex={firstElemIndex}
                  lastElemIndex={lastElemIndex}
                  nextPageExists={nextPageExists}
                  fetchHistory={fetchHistory}
                  advanceFilter={advanceFilter}
                  time_from={time_from}
                  time_to={time_to}
                  isApply={isApply}
                  handleApply={handleApply}
                  currency={currency}
                  state={state}
                  currencyId={currencyId}
                  direction={direction}
                  user={user}
               />
            );
         case 2:
            return (
               <TableActivity
                  core="withdraws"
                  search={qDebounce}
                  intl={translate}
                  currencies={currencies}
                  wallets={wallets}
                  list={list}
                  fetching={fetching}
                  page={page}
                  firstElemIndex={firstElemIndex}
                  lastElemIndex={lastElemIndex}
                  nextPageExists={nextPageExists}
                  fetchHistory={fetchHistory}
                  advanceFilter={advanceFilter}
                  time_from={time_from}
                  time_to={time_to}
                  isApply={isApply}
                  handleApply={handleApply}
                  currency={currency}
                  state={state}
                  currencyId={currencyId}
                  direction={direction}
                  user={user}
               />
            );
         case 3:
            return (
               <TableActivity
                  core="transfers"
                  search={qDebounce}
                  intl={translate}
                  currencies={currencies}
                  wallets={wallets}
                  list={list}
                  fetching={fetching}
                  page={page}
                  firstElemIndex={firstElemIndex}
                  lastElemIndex={lastElemIndex}
                  nextPageExists={nextPageExists}
                  fetchHistory={fetchHistory}
                  advanceFilter={advanceFilter}
                  time_from={time_from}
                  time_to={time_to}
                  isApply={isApply}
                  handleApply={handleApply}
                  currency={currency}
                  state={state}
                  currencyId={currencyId}
                  direction={direction}
                  user={user}
               />
            );
         case 4:
            return (
               <TableActivity
                  core="trades"
                  search={qDebounce}
                  intl={translate}
                  currencies={currencies}
                  wallets={wallets}
                  list={list}
                  fetching={fetching}
                  page={page}
                  firstElemIndex={firstElemIndex}
                  lastElemIndex={lastElemIndex}
                  nextPageExists={nextPageExists}
                  fetchHistory={fetchHistory}
                  advanceFilter={advanceFilter}
                  time_from={time_from}
                  time_to={time_to}
                  isApply={isApply}
                  handleApply={handleApply}
                  currency={currency}
                  market={market}
                  state={state}
                  type={type}
                  currencyId={currencyId}
                  direction={direction}
                  user={user}
               />
            );
         default:
            return (
               <TableActivity
                  core="transactions"
                  search={qDebounce}
                  intl={translate}
                  currencies={currencies}
                  wallets={wallets}
                  list={list}
                  fetching={fetching}
                  page={page}
                  firstElemIndex={firstElemIndex}
                  lastElemIndex={lastElemIndex}
                  nextPageExists={nextPageExists}
                  fetchHistory={fetchHistory}
                  advanceFilter={advanceFilter}
                  time_from={time_from}
                  time_to={time_to}
                  isApply={isApply}
                  handleApply={handleApply}
                  currency={currency}
                  state={state}
                  currencyId={currencyId}
                  direction={direction}
                  user={user}
               />
            );
      }
   }, [
      activeTab,
      advanceFilter,
      currencies,
      currency,
      currencyId,
      direction,
      fetchHistory,
      fetching,
      firstElemIndex,
      handleApply,
      isApply,
      lastElemIndex,
      list,
      market,
      nextPageExists,
      page,
      qDebounce,
      state,
      time_from,
      time_to,
      translate,
      type,
      user,
      wallets,
   ]);

   const typeName = useMemo(
      () =>
         activeTab === 0
            ? 'transactions'
            : activeTab === 1
            ? 'deposit'
            : activeTab === 2
            ? 'withdrawls'
            : activeTab === 3
            ? 'internal transfer'
            : 'my trades',
      [activeTab]
   );

   return (
      <>
         <div className="mb-8 block items-center justify-between border-b-0 border-neutral6 p-0 dark:border-neutral3 md:flex md:border-b md:pb-8">
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
                     title="Withdrawals"
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
                           <use xlinkHref="#icon-search" />
                        </svg>
                     }
                  />
               </div>
               {(!currencyId || activeTab !== 3) && (
                  <Button
                     text="All time"
                     variant="outline"
                     size="normal"
                     width="noFull"
                     onClick={() => {
                        setQ('');
                        setShowFilter(true);
                        setFilter({
                           ...filter,
                           advanceFilter: activeTab === 3,
                        });
                     }}
                     icRight={
                        <svg className="ml-3 h-4 w-4 fill-neutral4 transition-all group-hover:fill-neutral8">
                           <use xlinkHref="#icon-calendar" />
                        </svg>
                     }
                  />
               )}
            </div>
         </div>
         <div className="mb-10.5 flex items-center justify-between">
            <div className="font-dm text-3.5xl leading-tight tracking-custom1">
               {title}
            </div>
            <Button
               text="Export"
               size="normal"
               onClick={handleShowExport}
               icLeft={
                  <svg className="mr-3 h-4 w-4 fill-neutral8 transition-all duration-200">
                     <use xlinkHref="#icon-arrow-bottom" />
                  </svg>
               }
               disabled={list.length <= 0}
               width="noFull"
            />
         </div>
         <div className="overflow-x-auto">{renderActivity}</div>
         <Dialog
            isOpen={showFilter}
            setIsOpen={() => {
               setShowFilter(false);
               setFilter({
                  ...filter,
                  advanceFilter: false,
                  direction: '',
                  type: '',
               });
            }}
            title="Filter">
            {activeTab !== 3 && (
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
                        <button className="absolute right-3.5 top-3 -z-2">
                           <svg className="h-6 w-6 fill-neutral4 transition-all duration-300">
                              <use xlinkHref="#icon-calendar" />
                           </svg>
                        </button>
                     </div>
                  </div>
                  <div className="space-y-2.5">
                     <Label label="end date" />
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
                        <button className="absolute right-3.5 top-3 -z-2">
                           <svg className="h-6 w-6 fill-neutral4 transition-all duration-300">
                              <use xlinkHref="#icon-calendar" />
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>
            )}
            {withAdvancadFilter && (
               <>
                  {activeTab !== 3 && (
                     <div className="flex items-center justify-between space-x-2">
                        <div className="h-px w-full rounded bg-neutral6 dark:bg-neutral3" />
                        <div
                           className="flex cursor-pointer items-center justify-between space-x-2"
                           onClick={handleShowAdvanceFilter}>
                           <div className="whitespace-nowrap text-xs font-medium leading-5">
                              ADVANCE FILTER
                           </div>
                           <svg
                              className={`${
                                 advanceFilter ? '' : 'rotate-180'
                              } h-6 w-6 fill-neutral4 transition-all duration-300`}>
                              <use xlinkHref="#icon-arrow-down" />
                           </svg>
                        </div>
                     </div>
                  )}
                  <div
                     className={`space-y-8 ${
                        advanceFilter && (activeTab === 3 || activeTab === 0)
                           ? ''
                           : advanceFilter
                           ? 'visible h-44 opacity-100'
                           : 'invisible !mt-0 h-0 -translate-y-4 opacity-0'
                     } transition-all duration-300`}>
                     {activeTab === 4 && (
                        <ComboboxMarket onChange={handleChangeMarket} />
                     )}
                     {activeTab !== 4 && (
                        <ComboboxCurrency onChange={handleChangeAsset} />
                     )}
                     {(activeTab === 1 || activeTab === 2) && (
                        <AdibDropdown
                           label="State type"
                           data={renderStateType}
                           onChange={handleChangeState}
                        />
                     )}{' '}
                     {activeTab === 4 && (
                        <div className="relative space-y-2.5">
                           <Label label="Order side" />
                           <div className="flex space-x-3">
                              <Nav
                                 title="BUY"
                                 theme="grey"
                                 onClick={() => handleChangeType('buy')}
                                 isActive={type === 'buy'}
                              />
                              <Nav
                                 title="SELL"
                                 theme="grey"
                                 onClick={() => handleChangeType('sell')}
                                 isActive={type === 'sell'}
                              />
                           </div>
                        </div>
                     )}
                  </div>
               </>
            )}
            <Button
               text="Apply"
               onClick={handleApply}
            />
         </Dialog>
         <Portal
            title="Confirm download"
            show={showExport}
            close={handleShowExport}>
            <div>
               <div className="mt-16.5 space-y-8">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary3">
                     <svg className="h-10 w-10 fill-neutral8 transition-colors duration-300">
                        <use xlinkHref="#icon-arrow-bottom" />
                     </svg>
                  </div>
                  <div className="text-center text-base font-medium leading-normal">
                     Are you sure you want to download the filename{' '}
                     <strong className="font-bold capitalize tracking-wider text-primary4">
                        {typeName}
                     </strong>{' '}
                     ?
                  </div>
                  <Export
                     title="Continue"
                     csvData={list}
                     fileName={typeName}
                     onClick={handleShowExport}
                  />
               </div>
            </div>
         </Portal>
      </>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   currencies: selectCurrencies(state),
   wallets: selectWallets(state),
   list: selectHistory(state),
   fetching: selectHistoryLoading(state),
   page: selectCurrentPage(state),
   firstElemIndex: selectFirstElemIndex(state, 10),
   lastElemIndex: selectLastElemIndex(state, 10),
   nextPageExists: selectNextPageExists(state, 10),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   fetchMarkets: () => dispatch(marketsFetch()),
   fetchWallets: () => dispatch(walletsFetch()),
   fetchHistory: payload => dispatch(fetchHistory(payload)),
   resetHistory: () => dispatch(resetHistory()),
});

export const TableFinance = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps)
)(memo(TableFinanceFC)) as FC<OwnProps>;

TableFinance.defaultProps = {
   withAdvancadFilter: true,
};
