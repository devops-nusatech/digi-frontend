import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';
import {
   Market,
   OrderBy,
   OrderCommon,
   OrderSide,
   OrderType,
   openOrdersCancelFetch,
   selectCancelAllFetching,
   selectCancelFetching,
   selectCurrentPageIndex,
   selectOrdersFirstElemIndex,
   selectOrdersHistory,
   selectOrdersHistoryLoading,
   selectOrdersLastElemIndex,
   selectOrdersNextPageExists,
   userOrdersHistoryFetch,
} from 'modules';
import { RootState } from 'store';
import {
   Badge,
   Button,
   Decimal,
   Pagination,
   Portal,
   Skeleton,
   Image,
} from 'components';
import { IcEmty, IcShorting } from 'assets';
import { arrayFilter, localeDate, renderCurrencyIcon } from 'helpers';
import { useMarket, useModal } from 'hooks';

interface TableOrderProps {
   core: 'open' | 'close';
   q: string;
   setDetail: (e: OrderCommon) => void;
   isApply?: boolean;
   advanceFilter?: boolean;
   handleApply?: () => void;
   market?: string;
   order_by?: OrderBy;
   ord_type?: OrderType | '';
   type?: OrderSide | '';
   time_from?: string;
   time_to?: string;
}

interface ReduxProps {
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
   openOrderCancelById: typeof openOrdersCancelFetch;
   userOrdersHistoryFetch: typeof userOrdersHistoryFetch;
}

type Props = TableOrderProps & ReduxProps & DispatchProps & IntlProps;

const TableOrder = ({
   core,
   q,
   setDetail,
   isApply,
   advanceFilter,
   handleApply,
   market,
   order_by,
   ord_type,
   type,
   time_from,
   time_to,
   pageIndex,
   firstElemIndex,
   list,
   fetching,
   lastElemIndex,
   nextPageExists,
   cancelAllFetching,
   cancelFetching,
   userOrdersHistoryFetch,
   openOrderCancelById,
   intl,
}: Props) => {
   const { isShow, toggle } = useModal();
   const marketsData = useMarket().markets;
   const [detailId, setDetailId] = useState<any>();
   useEffect(() => {
      userOrdersHistoryFetch({ core, pageIndex: 0, limit: 10 });
   }, [core]);

   const handleFilter = () => {
      userOrdersHistoryFetch({
         pageIndex: 0,
         core,
         limit: 10,
         ...(core !== 'close' && { time_from, time_to }),
         ...(core !== 'close' &&
            advanceFilter && { market, type, ord_type, order_by }),
      });
   };

   useEffect(() => {
      if (isApply) {
         handleFilter();
         handleApply && handleApply();
      }
   }, [isApply]);

   const translate = (id: string) => intl.formatMessage({ id });

   const retrieveData = () =>
      arrayFilter(list, q).map(item => renderOrders(item));

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

   const handleConfirm = (item: OrderCommon) => {
      setDetailId(item);
      toggle();
   };

   const renderOrders = (item: OrderCommon) => {
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
      const currentMarket =
         marketsData.find(m => m.id === market) ||
         ({
            name: '',
            price_precision: 0,
            amount_precision: 0,
         } as Market);

      const marketName =
         currentMarket.name !== '' ? currentMarket.name : market;
      const costRemaining = +remaining_volume * +price;
      const date = localeDate(updated_at || created_at, 'fullDate');
      const status = setOrderStatus(state);
      const actualPrice =
         ord_type === 'market' || status === 'done' ? avg_price : price;

      const formatDecimal = (value: string | undefined, precision: number) =>
         Decimal.format(
            value && value?.includes(',') ? value?.split(',')?.join('') : value,
            precision,
            ','
         );

      return (
         <tr
            style={{ transition: 'background .2s' }}
            className="group"
            key={id}>
            <td className="py-5 pr-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
               <Badge
                  text={side}
                  variant={side === 'buy' ? 'green' : 'orange'}
               />
            </td>
            <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
               <div className="flex items-center space-x-3">
                  <div className="w-8 shrink-0">
                     <Image
                        className={`w-full ${
                           renderCurrencyIcon(
                              currentMarket?.base_unit,
                              currentMarket?.logo_url
                           )?.includes('http')
                              ? 'polygon'
                              : ''
                        }`}
                        src={renderCurrencyIcon(
                           currentMarket?.base_unit,
                           currentMarket?.logo_url
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
            <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
               <div className="text-right">
                  {Decimal.format(
                     actualPrice,
                     currentMarket.price_precision,
                     ''
                  )}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
               <div className="text-right">
                  {Decimal.format(
                     origin_volume,
                     currentMarket.amount_precision,
                     ''
                  )}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
               <div className="text-right">
                  {formatDecimal(
                     executed_volume,
                     currentMarket.amount_precision
                  )}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
               <div className="text-right">
                  {formatDecimal(
                     remaining_volume,
                     currentMarket.amount_precision
                  )}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
               <div className="text-right">
                  {formatDecimal(
                     String(costRemaining),
                     currentMarket.amount_precision
                  )}
               </div>
            </td>
            <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
               <div className="whitespace-nowrap">{status}</div>
            </td>
            <td className="py-5 px-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
               <div className="whitespace-nowrap text-right text-neutral4">
                  {date}
               </div>
            </td>
            <td className="rounded-r-xl py-5 pl-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
               {state === 'wait' && (
                  <button onClick={() => handleConfirm(item)}>
                     <svg className="h-5 w-5 fill-primary4">
                        <use xlinkHref="#icon-close-circle" />
                     </svg>
                  </button>
               )}
            </td>
         </tr>
      );
   };

   const handleCancel = () => {
      openOrderCancelById({ order: detailId, list });
      setTimeout(() => {
         userOrdersHistoryFetch({
            pageIndex: 0,
            core,
            limit: 10,
            ...(core !== 'close' && { time_from, time_to }),
            ...(core !== 'close' &&
               advanceFilter && { market, type, ord_type, order_by }),
         });
      }, 1000);
      toggle();
   };

   const onClickPrevPage = () => {
      userOrdersHistoryFetch({
         pageIndex: pageIndex - 1,
         core,
         limit: 10,
         ...(core !== 'close' && { time_from, time_to }),
         ...(core !== 'close' &&
            advanceFilter && { market, type, ord_type, order_by }),
      });
   };
   const onClickNextPage = () => {
      userOrdersHistoryFetch({
         pageIndex: pageIndex + 1,
         core,
         limit: 10,
         ...(core !== 'close' && { time_from, time_to }),
         ...(core !== 'close' &&
            advanceFilter && { market, type, ord_type, order_by }),
      });
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
   );

   let updateList = list;

   if (core === 'open') {
      updateList = list.filter(o => o.state === 'wait');
   }

   return (
      <>
         <table className="w-full table-auto">
            <thead>
               <tr>
                  <th className="border-b border-neutral6 pr-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                     <div className="flex cursor-pointer items-center space-x-1">
                        <div>
                           {translate(
                              'page.documentation.models.item.table.header.type'
                           )}
                        </div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                     <div className="flex cursor-pointer items-center space-x-1">
                        <div>
                           {translate('page.body.openOrders.header.pair')}
                        </div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                     <div className="flex cursor-pointer items-center justify-end space-x-1">
                        <div>
                           {translate('page.body.openOrders.header.price')}
                        </div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                     <div className="flex cursor-pointer items-center justify-end space-x-1">
                        <div>
                           {translate('page.body.openOrders.header.amount')}
                        </div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                     <div className="flex cursor-pointer items-center justify-end space-x-1">
                        <div>
                           {translate('page.body.openOrders.header.executed')}
                        </div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                     <div className="flex cursor-pointer items-center justify-end space-x-1">
                        <div>
                           {translate('page.body.openOrders.header.remaining')}
                        </div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-6 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                     <div className="flex cursor-pointer items-center justify-end space-x-1">
                        <div>
                           {translate(
                              'page.body.openOrders.header.costRemaining'
                           )}
                        </div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-6 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                     <div className="flex cursor-pointer items-center space-x-1">
                        <div>
                           {translate('page.body.openOrders.header.status')}
                        </div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-6 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3">
                     <div className="flex cursor-pointer items-center justify-end space-x-1">
                        <div>
                           {translate('page.body.history.deposit.header.date')}
                        </div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 pl-4 pb-6 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral3" />
               </tr>
            </thead>
            <tbody>
               {fetching ? (
                  <tr>
                     <td
                        colSpan={10}
                        className="text-center align-middle">
                        <div className="mt-3 space-y-3">
                           <Skeleton
                              height={16}
                              isWithFull
                              rounded="2xl"
                           />
                           <Skeleton
                              height={16}
                              isWithFull
                              rounded="2xl"
                           />
                           <Skeleton
                              height={16}
                              isWithFull
                              rounded="2xl"
                           />
                        </div>
                     </td>
                  </tr>
               ) : updateList.length ? (
                  retrieveData()
               ) : (
                  <tr>
                     <td colSpan={10}>
                        <div className="flex min-h-96 flex-col items-center justify-center space-y-3">
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
         <Portal
            title="Cancel order"
            show={isShow}
            close={toggle}>
            <div className="space-y-2">
               <div className="text-center font-medium leading-normal">
                  {detailId?.side}
               </div>
               <div className="text-center font-dm text-3.5xl font-bold uppercase leading-tight tracking-custom1">
                  {Decimal.format(
                     detailId?.price,
                     Number(
                        marketsData.find(m => m.id === detailId?.market)
                           ?.price_precision
                     ),
                     ''
                  )}
               </div>
            </div>
            <Button
               text="Confirm"
               withLoading={cancelFetching}
               onClick={handleCancel}
            />
         </Portal>
      </>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   pageIndex: selectCurrentPageIndex(state),
   firstElemIndex: selectOrdersFirstElemIndex(state, 25),
   list: selectOrdersHistory(state),
   fetching: selectOrdersHistoryLoading(state),
   lastElemIndex: selectOrdersLastElemIndex(state, 25),
   nextPageExists: selectOrdersNextPageExists(state),
   cancelAllFetching: selectCancelAllFetching(state),
   cancelFetching: selectCancelFetching(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   openOrderCancelById: payload => dispatch(openOrdersCancelFetch(payload)),
   userOrdersHistoryFetch: payload => dispatch(userOrdersHistoryFetch(payload)),
});

export const TableOrderHistory = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps)
)(TableOrder) as any;
