import React, {
   FunctionComponent,
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
   ComboboxMarket,
   Dialog,
   InputGroup,
   Label,
   LayoutWallet,
   Nav,
   Portal,
   TableOrderHistory
} from 'components';
import {
   OrderBy,
   OrderCommon,
   OrderSide,
   OrderType,
   RootState,
   marketsFetch,
   ordersCancelAllFetch,
   ordersHistoryCancelFetch,
   resetOrdersHistory,
   selectCancelAllFetching,
   selectCancelFetching,
   selectOrdersHistory
} from 'modules';
import { useDebounced } from 'hooks';

type FilterState = {
   startDate: Date;
   endDate: Date;
   market: string;
   order_by: OrderBy;
   side: OrderSide | '';
   type: OrderType | '';
   advanceFilter: boolean;
   isApply: boolean;
}

type ReduxProps = {
   list: OrderCommon[]
   cancelAllLoading: boolean;
   cancelLoading: boolean;
}

type DispatchProps = {
   marketsFetch: typeof marketsFetch;
   ordersCancelAll: typeof ordersCancelAllFetch;
   ordersCancelById: typeof ordersHistoryCancelFetch;
   resetOrdersHistory: typeof resetOrdersHistory;
}

type Props = ReduxProps & DispatchProps & IntlProps;

const Orders = ({
   list,
   marketsFetch,
   ordersCancelAll,
   resetOrdersHistory,
   ordersCancelById,
   cancelAllLoading,
   cancelLoading,
   intl
}: Props) => {
   const [currentTab, setCurrentTab] = useState<'open' | 'close'>('close');
   const [q, setQ] = useState('');
   const [qDebounce] = useDebounced(q, 1000);
   const [showCancelAll, setShowCancelAll] = useState(false);
   const [showFilter, setShowFilter] = useState(false);
   const [filter, setFilter] = useState<FilterState>({
      startDate: new Date((new Date).getFullYear(), (new Date).getMonth(), 1),
      endDate: new Date(),
      market: '',
      order_by: '',
      side: '',
      type: '',
      advanceFilter: false,
      isApply: false,
   });
   const { startDate, endDate, market, isApply, advanceFilter, side, type, order_by } = filter;

   const time_from = Math.floor(new Date(startDate).getTime() / 1000).toString()
   const time_to = Math.floor(new Date(endDate).getTime() / 1000).toString()

   const handleChangeStartDate = (startDate: Date) => {
      setFilter({ ...filter, startDate });
   }
   const handleChangeEndDate = (endDate: Date) => {
      setFilter({ ...filter, endDate })
   }
   const handleChangeMarket = (market: string) => {
      setFilter({ ...filter, market })
   }
   const handleChangeOrderBy = (order_by: OrderBy) => {
      setFilter({ ...filter, order_by })
   }
   const handleChangeSide = (side: OrderSide | '') => {
      setFilter({ ...filter, side })
   }
   const handleChangeType = (type: OrderType | '') => {
      setFilter({ ...filter, type })
   }
   const handleApply = () => {
      setFilter({ ...filter, isApply: !isApply });
      setShowFilter(false);
   }
   const handleShowAdvanceFilter = () => setFilter({ ...filter, advanceFilter: !advanceFilter });

   const handleShowCancelAll = () => setShowCancelAll(!showCancelAll);
   const handleCancelAll = () => {
      ordersCancelAll();
      handleShowCancelAll();
   }

   const renderTable = () => {
      if (currentTab === 'close') {
         return <TableOrderHistory
            core="all"
            q={qDebounce}
         />
      } else {
         return <TableOrderHistory
            core="open"
            q={qDebounce}
            advanceFilter={advanceFilter}
            isApply={isApply}
            handleApply={handleApply}
            market={market}
            order_by={order_by}
            ord_type={type}
            type={side}
            time_from={time_from}
            time_to={time_to}
         />
      }
   }

   return (
      <LayoutWallet>
         <div className="min-h-full p-8 rounded bg-neutral8 dark:bg-shade2">
            <div className="block md:flex items-center justify-between mb-8 p-0 md:pb-8 border-b-0 md:border-b border-neutral6 dark:border-neutral3">
               <div className="flex space-x-4">
                  <Nav
                     title="All"
                     isActive={currentTab === 'close'}
                     onClick={() => setCurrentTab('close')}
                  />
                  <Nav
                     title="Open"
                     isActive={currentTab === 'open'}
                     onClick={() => setCurrentTab('open')}
                  />
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
                  {currentTab === 'open' && (
                     <Button
                        text='All time'
                        variant="outline"
                        size="normal"
                        width="noFull"
                        icRight={
                           <svg className="ml-3 w-4 h-4 fill-neutral4 group-hover:fill-neutral8 transition-all">
                              <use xlinkHref="#icon-calendar"></use>
                           </svg>
                        }
                        onClick={() => {
                           setQ('');
                           setShowFilter(true);
                           setFilter({ ...filter, advanceFilter: false });
                        }}
                     />
                  )}
               </div>
            </div>
            <div className="flex items-center justify-between mb-10.5">
               <div className="text-3.5xl leading-tight tracking-custom1 font-dm font-bold">
                  Order History
               </div>
               {list.filter(e => e.state === 'wait').length > 0 && (
                  <Button
                     text="Cancel all"
                     size="normal"
                     onClick={handleShowCancelAll}
                     variant="outline"
                     disabled={list.length <= 0}
                     width="noFull"
                  />
               )}
            </div>
            <div className="overflow-x-auto">
               <div className="space-y-8">
                  {renderTable()}
               </div>
            </div>
         </div>
         <Portal
            title="Cancel all orders"
            show={showCancelAll}
            close={handleShowCancelAll}
         >
            <div className="text-center text-base leading-normal font-medium">
               Are you sure cancel all pending order?
            </div>
            <Button
               text="Confirm"
               withLoading={cancelAllLoading}
               onClick={handleCancelAll}
            />
         </Portal>
         <Dialog
            isOpen={showFilter}
            setIsOpen={() => {
               setShowFilter(false);
               setFilter({ ...filter, advanceFilter: false, type: '' });
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
            <div className="flex justify-between items-center space-x-2">
               <div className="w-full h-px bg-neutral6 dark:bg-neutral3 rounded" />
               <div
                  className="flex justify-between items-center space-x-2 cursor-pointer"
                  onClick={handleShowAdvanceFilter}
               >
                  <div className="text-xs font-medium whitespace-nowrap leading-5">
                     ADVANCE FILTER
                  </div>
                  <svg className={`${advanceFilter ? '' : 'rotate-180'} w-6 h-6 fill-neutral4 transition-all duration-300`}>
                     <use xlinkHref="#icon-arrow-down" />
                  </svg>
               </div>
            </div>
            <div className={`space-y-8 ${advanceFilter ? 'h-80 opacity-100 visible' : 'h-0 opacity-0 -translate-y-4 !mt-0 invisible'} transition-all duration-300`}>
               <ComboboxMarket onChange={handleChangeMarket} />
               <div className="relative space-y-2.5">
                  <Label label="Order side" />
                  <div className="flex space-x-3">
                     <Nav
                        title="BUY"
                        theme="grey"
                        onClick={() => handleChangeSide('buy')}
                        isActive={side === 'buy'}
                     />
                     <Nav
                        title="SELL"
                        theme="grey"
                        onClick={() => handleChangeSide('sell')}
                        isActive={side === 'sell'}
                     />
                  </div>
               </div>
               <div className="relative space-y-2.5">
                  <Label label="Order type" />
                  <div className="flex space-x-3">
                     <Nav
                        title="LIMIT"
                        theme="grey"
                        onClick={() => handleChangeType('limit')}
                        isActive={type === 'limit'}
                     />
                     <Nav
                        title="MARKET"
                        theme="grey"
                        onClick={() => handleChangeType('market')}
                        isActive={type === 'market'}
                     />
                  </div>
               </div>
               <div className="relative space-y-2.5">
                  <Label label="Order by" />
                  <div className="flex space-x-3">
                     <Nav
                        title="DESC"
                        theme="grey"
                        onClick={() => handleChangeOrderBy('desc')}
                        isActive={order_by === 'desc'}
                     />
                     <Nav
                        title="ASC"
                        theme="grey"
                        onClick={() => handleChangeOrderBy('asc')}
                        isActive={order_by === 'asc'}
                     />
                  </div>
               </div>
            </div>
            <Button
               text="Apply"
               onClick={handleApply}
            />
         </Dialog>
      </LayoutWallet>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   list: selectOrdersHistory(state),
   cancelAllLoading: selectCancelAllFetching(state),
   cancelLoading: selectCancelFetching(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   marketsFetch: () => dispatch(marketsFetch()),
   ordersCancelAll: () => dispatch(ordersCancelAllFetch()),
   ordersCancelById: payload => dispatch(ordersHistoryCancelFetch(payload)),
   resetOrdersHistory: () => dispatch(resetOrdersHistory()),
});

export const WalletOrder = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps),
)(Orders) as FunctionComponent;
