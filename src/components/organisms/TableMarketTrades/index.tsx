import { Tooltip, Skeleton } from 'components';
import { Decimal } from 'components/Decimal';
import { localeDate } from 'helpers';
import {
   Market,
   PublicTrade,
   RootState,
   recentTradesFetch,
   selectCurrentMarket,
   selectCurrentPrice,
   selectRecentTradesLoading,
   selectRecentTradesOfCurrentMarket,
   setCurrentPrice,
} from 'modules';
import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { compose } from 'redux';

interface ReduxProps {
   recentTrades: PublicTrade[];
   recentTradesLoading?: boolean;
   currentMarket: Market | undefined;
   currentPrice: number | undefined;
}

interface DispatchProps {
   tradesFetch: typeof recentTradesFetch;
   setCurrentPrice: typeof setCurrentPrice;
}

type Props = DispatchProps & ReduxProps;

const TableMarketTradesFC = ({
   recentTrades,
   recentTradesLoading,
   currentMarket,
   currentPrice,
   tradesFetch,
   setCurrentPrice,
}: Props) => {
   useEffect(() => {
      tradesFetch(currentMarket);
   }, [currentMarket]);

   const renderBody = useMemo(
      () =>
         recentTradesLoading ? (
            <>
               <tr>
                  <td className="p-3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </td>
                  <td className="p-3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </td>
                  <td className="p-3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </td>
               </tr>
               <tr>
                  <td className="p-3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </td>
                  <td className="p-3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </td>
                  <td className="p-3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </td>
               </tr>
               <tr>
                  <td className="p-3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </td>
                  <td className="p-3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </td>
                  <td className="p-3">
                     <Skeleton
                        height={20}
                        isWithFull
                     />
                  </td>
               </tr>
            </>
         ) : recentTrades.length ? (
            recentTrades?.map(e => (
               <Tooltip
                  key={e.id}
                  content={
                     <div className="flex flex-col space-y-1 text-xs tracking-wider">
                        <div>{localeDate(e.created_at, 'fullDate')}</div>
                        <div className="font-urw-din-500">
                           {Decimal.format(
                              e.total,
                              Number(currentMarket?.amount_precision),
                              ','
                           )}{' '}
                           {currentMarket &&
                              currentMarket.quote_unit.toUpperCase()}
                        </div>
                     </div>
                  }>
                  <tr
                     key={e.id}
                     className="group cursor-pointer"
                     onClick={() => setCurrentPrice(Number(e.price))}>
                     <td
                        className={`z-0 py-0.5 pr-1 text-xs font-medium leading-custom4 tracking-wider group-hover:bg-neutral7 dark:group-hover:bg-neutral2 ${
                           e.taker_type === 'sell'
                              ? 'text-primary4'
                              : 'text-primary5 dark:text-chart1'
                        }`}>
                        {Decimal.format(
                           e.price,
                           Number(currentMarket?.price_precision),
                           ','
                        )}
                     </td>
                     <td className="z-0 py-0.5 pl-1 pr-3 text-right text-xs font-medium leading-custom4 tracking-wider group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                        {Decimal.format(
                           e.amount,
                           Number(currentMarket?.amount_precision),
                           ','
                        )}
                     </td>
                     <td className="z-0 py-0.5 pl-1 text-right text-xs font-medium leading-custom4 tracking-wider group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                        {localeDate(e.created_at, 'time')}
                     </td>
                  </tr>
               </Tooltip>
            ))
         ) : (
            <div className="">Kosong</div>
         ),
      [recentTrades]
   );

   return (
      <table className="w-full table-auto">
         <thead>
            <tr>
               <th className="sticky top-0 bg-neutral8 pb-3 pr-1 pt-0.5 text-left align-top text-xs font-semibold leading-custom4 text-neutral4 dark:bg-shade2">
                  Price (
                  {currentMarket && currentMarket.quote_unit.toUpperCase()})
               </th>
               <th className="sticky top-0 bg-neutral8 pb-3 pl-1 pr-3 pt-0.5 text-right align-top text-xs font-semibold leading-custom4 text-neutral4 dark:bg-shade2">
                  Amount (
                  {currentMarket && currentMarket.base_unit.toUpperCase()})
               </th>
               <th className="sticky top-0 bg-neutral8 pb-3 pl-1 pt-0.5 text-right align-top text-xs font-semibold leading-custom4 text-neutral4 dark:bg-shade2">
                  Time
               </th>
            </tr>
         </thead>
         <tbody className="font-urw-din-500">{renderBody}</tbody>
      </table>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   recentTrades: selectRecentTradesOfCurrentMarket(state),
   recentTradesLoading: selectRecentTradesLoading(state),
   currentMarket: selectCurrentMarket(state),
   currentPrice: selectCurrentPrice(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   tradesFetch: market => dispatch(recentTradesFetch(market)),
   setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});

export const TableMarketTrades = compose(
   connect(mapStateToProps, mapDispatchToProps)
)(TableMarketTradesFC) as FunctionComponent;
