import React, { FunctionComponent, useState } from 'react';
import { Button, Export, InputGroup, LayoutWallet, Nav, Portal, TableOrderHistory } from 'components';
import { OrderCommon, RootState, marketsFetch, ordersCancelAllFetch, resetOrdersHistory, selectOrdersHistory } from 'modules';
import { IntlProps } from 'index';
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

type ReduxProps = {
   list: OrderCommon[]
}

type DispatchProps = {
   marketsFetch: typeof marketsFetch;
   ordersCancelAll: typeof ordersCancelAllFetch;
   resetOrdersHistory: typeof resetOrdersHistory;
}

type Props = ReduxProps & DispatchProps & IntlProps;

const Orders = ({
   list,
   marketsFetch,
   ordersCancelAll,
   resetOrdersHistory,
   intl
}: Props) => {
   const [currentTab, setCurrentTab] = useState<'open' | 'close'>('close');
   const [q, setQ] = useState('');
   const [showExport, setShowExport] = useState(false);

   const handleShowExport = () => setShowExport(!showExport);

   const type = currentTab === 'open' ? 'Open' : 'Cancel';

   // const translate = (id: string) => intl.formatMessage({ id });

   const renderTable = () => {
      if (currentTab === 'close') {
         return <TableOrderHistory type="all" q={q} />
      } else {
         return <TableOrderHistory type="open" q={q} />
      }
   }

   return (
      <LayoutWallet>
         <div className="h-full p-8 rounded bg-neutral8 dark:bg-shade2">
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
               </div>
            </div>
            <div className="flex items-center justify-between mb-10.5">
               <div className="text-3.5xl leading-tight tracking-custom1 font-dm font-bold">
                  Order History
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
               <div className="space-y-8">
                  {renderTable()}
               </div>
            </div>
         </div>
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
      </LayoutWallet>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   list: selectOrdersHistory(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   marketsFetch: () => dispatch(marketsFetch()),
   ordersCancelAll: () => dispatch(ordersCancelAllFetch()),
   resetOrdersHistory: () => dispatch(resetOrdersHistory()),
});

export const WalletOrder = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps),
)(Orders) as FunctionComponent;
