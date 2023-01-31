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
import {
   Button,
   InputGroup,
   LayoutWallet,
   Nav,
   Portal,
   TableOrderHistory
} from 'components';
import {
   OrderCommon,
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

   const handleShowCancelAll = () => setShowCancelAll(!showCancelAll);
   const handleCancelAll = () => {
      ordersCancelAll();
      handleShowCancelAll();
   }

   const renderTable = () => {
      if (currentTab === 'close') {
         return <TableOrderHistory type="all" q={qDebounce} />
      } else {
         return <TableOrderHistory type="open" q={qDebounce} />
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
