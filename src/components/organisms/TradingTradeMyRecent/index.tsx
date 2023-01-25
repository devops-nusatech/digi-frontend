// import classnames from 'classnames';
import * as React from 'react';
// import { Spinner } from 'react-bootstrap';
import {
   injectIntl,
} from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { compose } from 'redux';
import { IntlProps } from '../../../';
// import { Decimal } from 'components';
// import { localeDate, setTradesType } from 'helpers';
import {
   fetchHistory,
   Market,
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
         this.props.fetchHistory({ type: 'trades', page: 0, time_from: timeFrom, market: currentMarket.id } as any);
      }
   }

   public componentWillReceiveProps(next: Props) {
      if (next.currentMarket && this.props.currentMarket !== next.currentMarket) {
         this.props.fetchHistory({ type: 'trades', page: 0, time_from: timeFrom, market: next.currentMarket.id });
      }
   }

   public shouldComponentUpdate(nextProps: Props) {
      return JSON.stringify(nextProps.list) !== JSON.stringify(this.props.list);
   }

   public render() {
      const { list, setCurrentPrice, currentMarket, fetching } = this.props;
      return (
         <>
            <div className="table w-full">
               <div className="table-row">
                  <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed pb-[10px] p-1.5 pl-0">
                     <div className="relative inline-block pr-4 cursor-pointer">
                        Time
                        {/* <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div> */}
                     </div>
                  </div>
                  <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed pb-[10px] p-1.5">
                     <div className="relative inline-block pr-4 cursor-pointer">
                        Price (USDT)
                        {/* <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div> */}
                     </div>
                  </div>
                  <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed pb-[10px] p-1.5">
                     <div className="relative inline-block pr-4 cursor-pointer">
                        Amount (BTC)
                        {/* <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div> */}
                     </div>
                  </div>
                  <div className="table-cell text-xs text-neutral4 font-semibold leading-relaxed pb-[10px] p-1.5 pr-0 text-right">
                     <div className="relative inline-block pr-4 cursor-pointer">
                        Total (USDT)
                        {/* <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div> */}
                     </div>
                  </div>
               </div>
            </div>
            <div className="h-[305px] overflow-y-scroll hide-scroll">
               <div className="table w-full">
                  {
                     fetching ? (
                        <>
                           <div className="table-row">
                              <div className="table-cell pb-[10px] p-1.5 pl-0">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                              <div className="table-cell pb-[10px] p-1.5">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                              <div className="table-cell pb-[10px] p-1.5">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                              <div className="table-cell pb-[10px] p-1.5">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                           </div>
                           <div className="table-row">
                              <div className="table-cell pb-[10px] p-1.5 pl-0">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                              <div className="table-cell pb-[10px] p-1.5">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                              <div className="table-cell pb-[10px] p-1.5">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                              <div className="table-cell pb-[10px] p-1.5">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                           </div>
                           <div className="table-row">
                              <div className="table-cell pb-[10px] p-1.5 pl-0">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                              <div className="table-cell pb-[10px] p-1.5">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                              <div className="table-cell pb-[10px] p-1.5">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                              <div className="table-cell pb-[10px] p-1.5">
                                 <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                              </div>
                           </div>
                        </>
                     ) : (list && list?.length > 0) ? list?.map(({ id, amount, price, created_at }) => (
                        <div className="table-row font-urw-din-500" key={id}>
                           <div className="text-xs leading-relaxed font-medium table-cell p-1.5 pl-0 text-neutral4">
                              {localeDate(created_at, 'fullDate')}
                           </div>
                           <div className="text-xs leading-relaxed font-medium table-cell p-1.5" onClick={() => setCurrentPrice(Number(price))}>
                              {Decimal.format(price, Number(currentMarket?.price_precision), ',')}
                           </div>
                           <div className="text-xs leading-relaxed font-medium table-cell p-1.5">
                              {Decimal.format(amount, Number(currentMarket?.amount_precision), ',')}
                           </div>
                           <div className="text-xs leading-relaxed font-medium table-cell p-1.5 pr-0 text-right">
                              {Decimal.format(Number(amount) * Number(price), Number(currentMarket?.price_precision), ',')}
                           </div>
                        </div>
                     )) : (
                        <div className="table-row hide-scroll">
                           <div className="table-cell">&nbsp;</div>
                           <div className="table-cell">&nbsp;</div>
                           <div className="table-cell">&nbsp;</div>
                           <div className="min-h-56 flex flex-col items-center justify-center space-y-3">
                              <IcEmty />
                              <div className="text-xs font-semibold text-neutral4">
                                 Today not found
                              </div>
                           </div>
                        </div>
                     )
                  }
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

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
   dispatch => ({
      fetchHistory: params => dispatch(fetchHistory(params)),
      setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
   });

export const TradingTradeMyRecent = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps),
)(TradingTradeMyRecentContainer) as any; // tslint:disable-line
