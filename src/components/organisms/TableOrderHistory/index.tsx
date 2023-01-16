import React, { useEffect } from 'react';
import { compose } from 'redux';
import {
   MapDispatchToPropsFunction,
   connect
} from 'react-redux';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';
import {
   Market,
   OrderCommon,
   ordersHistoryCancelFetch,
   selectCancelAllFetching,
   selectCancelFetching,
   selectCurrentPageIndex,
   selectMarkets,
   selectOrdersFirstElemIndex,
   selectOrdersHistory,
   selectOrdersHistoryLoading,
   selectOrdersLastElemIndex,
   selectOrdersNextPageExists,
   userOrdersHistoryFetch
} from 'modules';
import { RootState } from 'store';
import { Badge, Decimal, Pagination, Skeleton } from 'components';
import { IcEmty, IcShorting } from 'assets';
import { arrayFilter, localeDate } from 'helpers';

interface TableOrderProps {
   type: 'open' | 'close';
   q: string;
}

interface ReduxProps {
   marketsData: Market[];
   pageIndex: number;
   firstElemIndex: number;
   list: OrderCommon[];
   fetching: boolean;
   lastElemIndex: number;
   nextPageExists: boolean;
   cancelAllFetching: boolean;
   cancelFetching: boolean;
}

interface DispatchProps {
   ordersHistoryCancelFetch: typeof ordersHistoryCancelFetch;
   userOrdersHistoryFetch: typeof userOrdersHistoryFetch;
}

type Props = TableOrderProps & ReduxProps & DispatchProps & IntlProps;

const TableOrder = ({
   type,
   q,
   marketsData,
   pageIndex,
   firstElemIndex,
   list,
   fetching,
   lastElemIndex,
   nextPageExists,
   cancelAllFetching,
   cancelFetching,
   userOrdersHistoryFetch,
   ordersHistoryCancelFetch,
   intl
}: Props) => {
   useEffect(() => {
      userOrdersHistoryFetch({ type, pageIndex: 0, limit: 25 });
   }, [type]);

   const translate = (id: string) => intl.formatMessage({ id });

   const retrieveData = () => arrayFilter(list, q).map(item => renderActivity(item));

   const setOrderStatus = (status: string) => {
      switch (status) {
         case 'done':
            return (
               <span className="text-primary5 dark:text-chart1">
                  {translate('page.body.openOrders.content.status.done')}
               </span>
            );
         case 'cancel':
            return (
               <span className="text-primary4">
                  {translate('page.body.openOrders.content.status.cancel')}
               </span>
            );
         case 'wait':
            return (
               <span className="text-secondary3">
                  {translate('page.body.openOrders.content.status.wait')}
               </span>
            );
         default:
            return status;
      }
   };

   const renderActivity = (item: OrderCommon) => {
      const {
         id,
         executed_volume,
         market,
         ord_type,
         price,
         avg_price,
         remaining_volume,
         origin_volume,
         side,
         state,
         updated_at,
         created_at,
      } = item;
      const currentMarket = marketsData.find(m => m.id === market)
         || { name: '', price_precision: 0, amount_precision: 0 };

      const marketName = currentMarket.name !== '' ? currentMarket.name : market;
      const costRemaining = +remaining_volume * +price;
      const date = localeDate(updated_at ? updated_at : created_at, 'fullDate');
      const status = setOrderStatus(state);
      const actualPrice = ord_type === 'market' || status === 'done' ? avg_price : price;

      const formatDecimal = (value: string | undefined, precision: number) => Decimal.format(value && value?.includes(',') ? value?.split(',')?.join('') : value, precision, ',');

      return (
         <tr style={{ transition: 'background .2s' }} className="group" key={id}>
            <td className="py-5 pr-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
               <Badge
                  text={side}
                  variant={side === 'buy' ? 'green' : 'orange'}
               />
            </td>
            <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
               <div className="uppercase">
                  {marketName}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
               <div className="text-right">
                  {formatDecimal(actualPrice, currentMarket.price_precision)}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
               <div className="text-right">
                  {formatDecimal(origin_volume, currentMarket.amount_precision)}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
               <div className="text-right">
                  {formatDecimal(executed_volume, currentMarket.amount_precision)}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
               <div className="text-right">
                  {formatDecimal(remaining_volume, currentMarket.amount_precision)}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
               <div className="text-right">
                  {formatDecimal(String(costRemaining), currentMarket.amount_precision)}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
               <div className="whitespace-nowrap">
                  {status}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
               <div className="whitespace-nowrap text-neutral4">
                  {date}
               </div>
            </td>
            <td className="rounded-r-xl py-5 pl-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
               {state === 'wait' && (
                  <button onClick={() => handleCancel(Number(id))}>
                     <svg className="w-5 h-5 fill-primary4">
                        <use xlinkHref="#icon-close-circle" />
                     </svg>
                  </button>
               )}
            </td>
         </tr>
      );
   }

   const handleCancel = (id: number) => () => {
      if (cancelAllFetching || cancelFetching) {
         return;
      }
      ordersHistoryCancelFetch({ id, type, list });
   };


   const onClickPrevPage = () => {
      userOrdersHistoryFetch({ pageIndex: pageIndex - 1, type, limit: 25 });
   };
   const onClickNextPage = () => {
      userOrdersHistoryFetch({ pageIndex: pageIndex + 1, type, limit: 25 });
   };

   const renderPaginate = () => (
      <Pagination
         firstElemIndex={firstElemIndex}
         lastElemIndex={lastElemIndex}
         page={pageIndex}
         nextPageExists={nextPageExists}
         onClickPrevPage={onClickPrevPage}
         onClickNextPage={onClickNextPage}
      />
   )

   let updateList = list;

   if (type === 'open') {
      updateList = list.filter(o => o.state === 'wait');
   }

   return (
      <>
         <table className="w-full table-auto">
            <thead>
               <tr>
                  <th className="pr-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>{translate('page.documentation.models.item.table.header.type')}</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>{translate('page.body.openOrders.header.pair')}</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer justify-end">
                        <div>{translate('page.body.openOrders.header.price')}</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer justify-end">
                        <div>{translate('page.body.openOrders.header.amount')}</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer justify-end">
                        <div>{translate('page.body.openOrders.header.executed')}</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer justify-end">
                        <div>{translate('page.body.openOrders.header.remaining')}</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4">
                     <div className="flex items-center space-x-1 cursor-pointer justify-end">
                        <div>{translate('page.body.openOrders.header.costRemaining')}</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>{translate('page.body.openOrders.header.status')}</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="px-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                     <div className="flex items-center space-x-1 cursor-pointer">
                        <div>{translate('page.body.history.deposit.header.date')}</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="pl-4 pb-6 border-b border-neutral6 dark:border-neutral3 text-xs leading-custom4 font-semibold text-neutral4 text-right">

                  </th>
               </tr>
            </thead>
            <tbody>
               {fetching ? (
                  <tr>
                     <td colSpan={10} className="align-middle text-center">
                        <div className="space-y-3 mt-3">
                           <Skeleton height={16} isWithFull rounded="2xl" />
                           <Skeleton height={16} isWithFull rounded="2xl" />
                           <Skeleton height={16} isWithFull rounded="2xl" />
                        </div>
                     </td>
                  </tr>
               ) : updateList.length ? retrieveData() : (
                  <tr>
                     <td colSpan={10}>
                        <div className="min-h-96 flex flex-col items-center justify-center space-y-3">
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
         {renderPaginate()}
      </>
   );
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   marketsData: selectMarkets(state),
   pageIndex: selectCurrentPageIndex(state),
   firstElemIndex: selectOrdersFirstElemIndex(state, 25),
   list: selectOrdersHistory(state),
   fetching: selectOrdersHistoryLoading(state),
   lastElemIndex: selectOrdersLastElemIndex(state, 25),
   nextPageExists: selectOrdersNextPageExists(state),
   cancelAllFetching: selectCancelAllFetching(state),
   cancelFetching: selectCancelFetching(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   ordersHistoryCancelFetch: payload => dispatch(ordersHistoryCancelFetch(payload)),
   userOrdersHistoryFetch: payload => dispatch(userOrdersHistoryFetch(payload)),
});

export const TableOrderHistory = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps),
)(TableOrder) as any;
