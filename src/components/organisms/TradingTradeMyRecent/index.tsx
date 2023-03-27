// import classnames from 'classnames';
import * as React from 'react';
// import { Spinner } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { compose } from 'redux';
import { IntlProps } from 'index';
// import { Decimal } from 'components';
// import { localeDate, setTradesType } from 'helpers';
import {
   fetchHistory,
   Market,
   PrivateTrade,
   RootState,
   selectCurrentMarket,
   selectCurrentPrice,
   selectHistory,
   selectHistoryLoading,
   setCurrentPrice,
   WalletHistoryList,
} from 'modules';
import { localeDate } from 'helpers';
import { Decimal } from 'components/Decimal';
import { IcEmty } from 'assets';
// import { IcShorting } from 'assets';
// import { handleHighlightValue } from '../../../containers/RecentTrades/Market';

interface ReduxProps {
   list: WalletHistoryList;
   fetching: boolean;
   currentMarket: Market | undefined;
   currentPrice: number | undefined;
}

interface DispatchProps {
   fetchHistory: typeof fetchHistory;
   setCurrentPrice: typeof setCurrentPrice;
}

type Props = ReduxProps & DispatchProps & IntlProps;

const timeFrom = String(Math.floor((Date.now() - 1000 * 60 * 60 * 24) / 1000));

class TradingTradeMyRecentContainer extends React.Component<Props> {
   public componentDidMount() {
      const { currentMarket } = this.props;
      if (currentMarket) {
         this.props.fetchHistory({
            core: 'trades',
            page: 0,
            time_from: timeFrom,
            market: currentMarket.id,
         } as any);
      }
   }

   public componentWillReceiveProps(next: Props) {
      if (
         next.currentMarket &&
         this.props.currentMarket !== next.currentMarket
      ) {
         this.props.fetchHistory({
            core: 'trades',
            page: 0,
            time_from: timeFrom,
            market: next.currentMarket.id,
         });
      }
   }

   public shouldComponentUpdate(nextProps: Props) {
      return JSON.stringify(nextProps.list) !== JSON.stringify(this.props.list);
   }

   public render() {
      const { list, setCurrentPrice, currentMarket, fetching } = this.props;
      let lists;
      lists = list;
      const data: PrivateTrade[] = lists;
      return (
         <>
            <div className="table w-full">
               <div className="table-row">
                  <div className="table-cell p-1.5 pb-[10px] pl-0 text-xs font-semibold leading-relaxed text-neutral4">
                     <div className="relative inline-block cursor-pointer pr-4">
                        Time
                        {/* <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div> */}
                     </div>
                  </div>
                  <div className="table-cell p-1.5 pb-[10px] text-xs font-semibold leading-relaxed text-neutral4">
                     <div className="relative inline-block cursor-pointer pr-4">
                        Price (USDT)
                        {/* <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div> */}
                     </div>
                  </div>
                  <div className="table-cell p-1.5 pb-[10px] text-xs font-semibold leading-relaxed text-neutral4">
                     <div className="relative inline-block cursor-pointer pr-4">
                        Amount (BTC)
                        {/* <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div> */}
                     </div>
                  </div>
                  <div className="table-cell p-1.5 pb-[10px] pr-0 text-right text-xs font-semibold leading-relaxed text-neutral4">
                     <div className="relative inline-block cursor-pointer pr-4">
                        Total (USDT)
                        {/* <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div> */}
                     </div>
                  </div>
               </div>
            </div>
            <div className="hide-scroll h-[305px] overflow-y-scroll">
               <div className="table w-full">
                  {fetching ? (
                     <>
                        <div className="table-row">
                           <div className="table-cell p-1.5 pb-[10px] pl-0">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                           <div className="table-cell p-1.5 pb-[10px]">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                           <div className="table-cell p-1.5 pb-[10px]">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                           <div className="table-cell p-1.5 pb-[10px]">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                        </div>
                        <div className="table-row">
                           <div className="table-cell p-1.5 pb-[10px] pl-0">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                           <div className="table-cell p-1.5 pb-[10px]">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                           <div className="table-cell p-1.5 pb-[10px]">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                           <div className="table-cell p-1.5 pb-[10px]">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                        </div>
                        <div className="table-row">
                           <div className="table-cell p-1.5 pb-[10px] pl-0">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                           <div className="table-cell p-1.5 pb-[10px]">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                           <div className="table-cell p-1.5 pb-[10px]">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                           <div className="table-cell p-1.5 pb-[10px]">
                              <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                           </div>
                        </div>
                     </>
                  ) : data && data?.length > 0 ? (
                     data?.map(e => (
                        <div
                           className="table-row font-urw-din-500"
                           key={e.id}>
                           <div className="table-cell p-1.5 pl-0 text-xs font-medium leading-relaxed text-neutral4">
                              {localeDate(e.created_at, 'fullDate')}
                           </div>
                           <div
                              className="table-cell p-1.5 text-xs font-medium leading-relaxed"
                              onClick={() => setCurrentPrice(Number(e.price))}>
                              {Decimal.format(
                                 e.price,
                                 Number(currentMarket?.price_precision),
                                 ','
                              )}
                           </div>
                           <div className="table-cell p-1.5 text-xs font-medium leading-relaxed">
                              {Decimal.format(
                                 e.amount,
                                 Number(currentMarket?.amount_precision),
                                 ','
                              )}
                           </div>
                           <div className="table-cell p-1.5 pr-0 text-right text-xs font-medium leading-relaxed">
                              {Decimal.format(
                                 Number(e.amount) * Number(e.price),
                                 Number(currentMarket?.price_precision),
                                 ','
                              )}
                           </div>
                        </div>
                     ))
                  ) : (
                     <div className="hide-scroll table-row">
                        <div className="table-cell">&nbsp;</div>
                        <div className="table-cell">&nbsp;</div>
                        <div className="table-cell">&nbsp;</div>
                        <div className="flex min-h-56 flex-col items-center justify-center space-y-3">
                           <IcEmty />
                           <div className="text-xs font-semibold text-neutral4">
                              Today not found
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </>
      );
   }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   list: selectHistory(state),
   fetching: selectHistoryLoading(state),
   currentMarket: selectCurrentMarket(state),
   currentPrice: selectCurrentPrice(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   fetchHistory: params => dispatch(fetchHistory(params)),
   setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});

export const TradingTradeMyRecent = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps)
)(TradingTradeMyRecentContainer) as any; // tslint:disable-line
