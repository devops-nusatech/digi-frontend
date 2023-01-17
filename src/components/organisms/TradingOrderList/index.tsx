import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from '../../../';
import { Decimal, Skeleton } from 'components';
import {
   Market,
   PublicTrade,
   RootState,
   selectCurrentColorTheme,
   selectCurrentMarket,
   selectCurrentPrice,
   selectDepthAsks,
   selectDepthBids,
   selectDepthLoading,
   selectLastRecentTrade,
   selectMarketTickers,
   selectMobileDeviceState,
   selectOpenOrdersList,
   selectRecentTrades,
   setAmount,
   setCurrentPrice,
   Ticker,
} from 'modules';
import { OrderCommon } from 'modules/types';
import { accumulateVolume, calcMaxVolume } from 'helpers';

type TCurrentTab = 'all' | 'asks' | 'bids';

interface ReduxProps {
   asks: string[][];
   bids: string[][];
   colorTheme: string;
   currentMarket?: Market;
   currentPrice?: number;
   lastRecentTrade?: PublicTrade;
   openOrdersList: OrderCommon[];
   orderBookLoading: boolean;
   isMobileDevice?: boolean;
   recentTrades?: PublicTrade[];
   selectedKey?: string;
}

interface DispatchProps {
   setCurrentPrice: typeof setCurrentPrice;
   setAmount: typeof setAmount;
}

interface State {
   tabActive: TCurrentTab;
   selectedRowKey?: string;
   amountVolume: string;
}

interface OwnProps {
   marketTickers: {
      [key: string]: Ticker;
   };
}

type Props = ReduxProps & DispatchProps & OwnProps & IntlProps;

class TradingOrderListContainer extends React.Component<Props, State> {
   constructor(props: Props) {
      super(props);

      this.state = {
         tabActive: 'all',
         selectedRowKey: props.selectedKey,
         amountVolume: '',
      };
   }

   public componentWillReceiveProps(next: ReduxProps) {
      if (this.state.selectedRowKey !== next.selectedKey) {
         this.setState({ selectedRowKey: next.selectedKey });
      }
   }

   public shouldComponentUpdate(nextProps: Props) {
      const {
         asks,
         bids,
         currentMarket,
         lastRecentTrade,
         marketTickers,
         openOrdersList,
         orderBookLoading,
      } = this.props;

      const shouldUpdateState =
         JSON.stringify(nextProps.asks) !== JSON.stringify(asks) ||
         JSON.stringify(nextProps.bids) !== JSON.stringify(bids) ||
         (nextProps.currentMarket && nextProps.currentMarket.id) !== (currentMarket && currentMarket.id) ||
         nextProps.openOrdersList !== openOrdersList ||
         nextProps.orderBookLoading !== orderBookLoading

      if (nextProps.lastRecentTrade) {
         return (
            shouldUpdateState ||
            JSON.stringify(nextProps.lastRecentTrade) !== JSON.stringify(lastRecentTrade)
         );
      }

      const lastPrice = currentMarket && this.getTickerValue(currentMarket, marketTickers).last;
      const nextLastPrice = nextProps.currentMarket && this.getTickerValue(nextProps.currentMarket, nextProps.marketTickers).last;

      return (
         shouldUpdateState ||
         nextLastPrice !== lastPrice
      );
   }

   public render() {
      const {
         asks,
         bids,
         orderBookLoading,
         currentMarket,
      } = this.props;
      const { tabActive } = this.state;

      const priceFixed = currentMarket ? currentMarket.price_precision : 0;
      const amountFixed = currentMarket ? currentMarket.amount_precision : 0;

      const bgWidthBids = this.mapValues(calcMaxVolume(bids, asks), accumulateVolume(bids, false));
      const bgWidthAsks = this.mapValues(calcMaxVolume(bids, asks), accumulateVolume(asks, false));

      return (
         <div className="shrink-0 w-full lg:w-64 lg-max:!float-none lg2-max:float-left hidden lg:block lg-max:!mb-0 lg2-max:mb-1">
            <div className="rounded bg-neutral8 dark:bg-shade2">
               {/* {this.state.selectedRowKey} */}
               <div className="flex items-center px-4 pt-4 pb-3">
                  <div className="flex items-center space-x-3 mr-auto">
                     <button
                        onClick={() => this.handleSetCurrentTab('all')}
                        className={`flex flex-col space-y-0.5 justify-center items-center shrink-0 w-8 h-8 rounded ${tabActive === 'all' ? 'bg-shade4 dark:bg-neutral2' : 'hover:bg-shade4 dark:hover:bg-neutral2'} transition-all duration-300`}
                     >
                        <span className="bg-primary4 w-3 h-0.5" />
                        <span className="bg-neutral5 w-3 h-0.5" />
                        <span className="bg-chart1 w-3 h-0.5" />
                     </button>
                     <button
                        onClick={() => this.handleSetCurrentTab('asks')}
                        className={`flex flex-col space-y-0.5 justify-center items-center shrink-0 w-8 h-8 rounded ${tabActive === 'asks' ? 'bg-shade4 dark:bg-neutral2' : 'hover:bg-shade4 dark:hover:bg-neutral2'} transition-all duration-300`}
                     >
                        <span className="bg-neutral5 w-3 h-0.5" />
                        <span className="bg-neutral5 w-3 h-0.5" />
                        <span className="bg-chart1 w-3 h-0.5" />
                     </button>
                     <button
                        onClick={() => this.handleSetCurrentTab('bids')}
                        className={`flex flex-col space-y-0.5 justify-center items-center shrink-0 w-8 h-8 rounded ${tabActive === 'bids' ? 'bg-shade4 dark:bg-neutral2' : 'hover:bg-shade4 dark:hover:bg-neutral2'} transition-all duration-300`}
                     >
                        <span className="bg-primary4 w-3 h-0.5" />
                        <span className="bg-neutral5 w-3 h-0.5" />
                        <span className="bg-neutral5 w-3 h-0.5" />
                     </button>
                  </div>
                  <select className="inline-flex h-8 w-15 outline-none justify-center items-center text-center rounded bg-shade4 dark:bg-neutral2">
                     <option value="5">5</option>
                     <option value="10">10</option>
                     <option value="20">20</option>
                     <option value="30">30</option>
                     <option value="40">40</option>
                     <option value="50">50</option>
                  </select>
               </div>
               <div className="flex space-x-1 py-1 px-4 text-xs font-semibold text-neutral4 leading-custom1 mb-1">
                  <div className="">
                     {this.renderHeaders()[0]}
                  </div>
                  <div className="text-right">
                     {this.renderHeaders()[1]}
                  </div>
                  <div className="text-right">
                     {this.renderHeaders()[2]}
                  </div>
               </div>
               <div className="relative h-[53.5625rem] overflow-hidden pb-4">
                  {(tabActive === 'all' || tabActive === 'bids') && (
                     <div className={`flex overflow-y-scroll ${tabActive === 'bids' ? 'h-[calc(100%-48px)]' : 'h-[calc(50%-24px)]'} ${orderBookLoading ? 'flex-col space-y-3' : 'flex-col-reverse space-y-1 space-y-reverse'} pb-1`} id="order-book">
                        {orderBookLoading ? (
                           <>
                              <Skeleton height={16} className="mt-3" isWithFull />
                              <Skeleton height={16} isWithFull />
                              <Skeleton height={16} isWithFull />
                           </>
                        ) : asks.length > 0 && asks.map((ask, index) => {
                           const [price, volume] = ask;
                           return (
                              <div
                                 key={index}
                                 onClick={() => this.handleOnSelectAsks(String(index))}
                                 className="relative flex py-2 px-4 items-center justify-between space-x-1 text-xs leading-custom1 !font-urw-din-500"
                              >
                                 <div className="text-primary4 font-semibold w-[35%] tracking-wider cursor-pointer z-2">
                                    <Decimal fixed={priceFixed} thousSep="," prevValue={asks[index + 1] ? asks[index + 1][0] : 0}>{price}</Decimal>
                                 </div>
                                 <div className="text-right w-[35%] tracking-wider cursor-pointer z-2">
                                    {Decimal.format(volume, amountFixed, ',')}
                                 </div>
                                 <div className="text-right w-[30%] tracking-wider cursor-pointer z-2">
                                    {Decimal.format((Number(price) * Number(volume)), priceFixed, ',')}
                                 </div>
                                 <div className="absolute inset-y-0 right-0 bg-primary4 bg-opacity-20 dark:bg-opacity-30 transition ease-in-out pointer-events-none z-0" style={{ width: `${bgWidthAsks[index]}%` }} />
                              </div>
                           )
                        })}
                     </div>
                  )}
                  <div className="h-12 border-y border-neutral6 dark:border-neutral2">
                     <div className="flex items-center justify-between space-x-2 py-3 px-4 text-base">
                        {this.lastPrice()}
                     </div>
                  </div>
                  <div className={`flex flex-col overflow-y-scroll ${tabActive === 'asks' ? 'h-[calc(100%-48px)]' : 'h-[calc(50%-24px)]'} ${orderBookLoading ? 'space-y-3' : 'space-y-1'} py-1`} id="order-book">
                     {orderBookLoading ? (
                        <>
                           <Skeleton height={16} className="mt-3" isWithFull />
                           <Skeleton height={16} isWithFull />
                           <Skeleton height={16} isWithFull />
                        </>
                     ) : ((tabActive === 'all' || tabActive === 'asks') && bids.length > 0) && bids.map((bid, index) => {
                        const [price, volume] = bid;
                        return (
                           <div
                              onClick={() => this.handleOnSelectBids(String(index))}
                              key={index}
                              className="relative flex py-2 px-4 items-center justify-between space-x-1 text-xs leading-custom1 !font-urw-din-500"
                           >
                              <div className="text-primary5 font-semibold w-[35%] tracking-wider cursor-pointer z-2">
                                 <Decimal fixed={priceFixed} thousSep="," prevValue={bids[index + 1] ? bids[index + 1][0] : 0}>{price}</Decimal>
                              </div>
                              <div className="w-[35%] text-right tracking-wider cursor-pointer z-2">
                                 {Decimal.format(volume, amountFixed, ',')}
                              </div>
                              <div className="w-[30%] text-right tracking-wider cursor-pointer z-2">
                                 {Decimal.format((Number(price) * Number(volume)), priceFixed, ',')}
                              </div>
                              <div className={`absolute inset-y-0 right-0 bg-primary5 dark:bg-chart1 bg-opacity-20 dark:bg-opacity-30 transition ease-in-out pointer-events-none z-0`} style={{ width: `${bgWidthBids[index]}%` }} />
                           </div>
                        )
                     })}
                  </div>
               </div>
            </div>
         </div>
      );
   }

   private lastPrice() {
      const {
         currentMarket,
         lastRecentTrade,
         marketTickers,
         orderBookLoading,
      } = this.props;

      if (currentMarket) {
         let lastPrice = '';
         let entryPriceChange: '' | 'positive' | 'negative' = '';

         const lastTicker = currentMarket && this.getTickerValue(currentMarket, marketTickers).last;
         const openTicker = currentMarket && this.getTickerValue(currentMarket, marketTickers).open;

         if (lastRecentTrade?.market === currentMarket.id) {
            lastPrice = lastRecentTrade.price;

            if (Number(lastRecentTrade.price_change) > 0) {
               entryPriceChange = 'positive';
            } else if (Number(lastRecentTrade.price_change) < 0) {
               entryPriceChange = 'negative';
            }
         } else {
            const currentTicker = currentMarket && this.getTickerValue(currentMarket, marketTickers);
            lastPrice = currentTicker.last;

            if (currentTicker.price_change_percent.includes('+')) {
               entryPriceChange = 'positive';
            } else if (currentTicker.price_change_percent.includes('-')) {
               entryPriceChange = 'negative';
            }
         }

         return (
            orderBookLoading ? (
               <div className="flex justify-between gap-4">
                  <Skeleton height={20} width={50} />
                  <Skeleton height={20} width={50} />
                  <Skeleton height={20} width={50} />
               </div>
            ) : (
               <>
                  <div className={`text-base font-semibold tracking-wider leading-normal ${entryPriceChange === 'positive' ? 'text-primary5' : 'text-primary4'}`}>
                     {Decimal.format(lastPrice, currentMarket.price_precision, ',')}
                  </div>
                  <svg className={`w-4 h-4 fill-primary1 ${entryPriceChange === 'positive' ? 'fill-primary5 rotate-0' : 'fill-primary4 rotate-180'}`}>
                     <use xlinkHref="#icon-arrow-top"></use>
                  </svg>
                  <div className={`text-base font-medium tracking-wider leading-normal ${entryPriceChange === 'positive' ? 'text-primary5' : 'text-primary4'}`}>{Decimal.format((Number(lastTicker) - Number(openTicker)), Number(currentMarket?.price_precision), ',')}</div>
               </>
            )
         )

      } else {
         return (
            <>
               <span className={'cr-combined-order-book__market-negative'}>0</span>
               <span>{this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.lastMarket' })}</span>
            </>
         );
      }
   }

   private mapValues = (maxVolume?: number, data?: number[]) => data && maxVolume && data.length ? data.map(currentVolume => (currentVolume / maxVolume) * 100) : [];

   private handleSetCurrentTab = (type: TCurrentTab) => this.setState({ tabActive: type });

   private renderHeaders = () => {
      const {
         currentMarket,
         intl,
         isMobileDevice,
      } = this.props;
      const formattedBaseUnit = (currentMarket && currentMarket.base_unit) ? `(${currentMarket.base_unit.toUpperCase()})` : '';
      const formattedQuoteUnit = (currentMarket && currentMarket.quote_unit) ? `(${currentMarket.quote_unit.toUpperCase()})` : '';

      if (isMobileDevice) {
         return [
            `${intl.formatMessage({ id: 'page.body.trade.orderbook.header.price' })}\n${formattedQuoteUnit}`,
            `${intl.formatMessage({ id: 'page.body.trade.orderbook.header.amount' })}\n${formattedBaseUnit}`,
         ];
      }

      return [
         `${intl.formatMessage({ id: 'page.body.trade.orderbook.header.price' })}\n${formattedQuoteUnit}`,
         `${intl.formatMessage({ id: 'page.body.trade.orderbook.header.amount' })}\n${formattedBaseUnit}`,
         `${intl.formatMessage({ id: 'page.body.trade.orderbook.header.volume' })}\n${formattedBaseUnit}`,
      ];
   };

   private handleOnSelectBids = (index: string) => {
      const { bids, currentPrice, setCurrentPrice, currentMarket, setAmount } = this.props;
      const priceToSet = bids[Number(index)] && Number(bids[Number(index)][0]);
      let tempAmount = 0;
      for (let i = 0; i <= Number(index); i++) {
         tempAmount += Number(bids[i][1]);
      }
      const amount = Decimal.format(tempAmount, Number(currentMarket?.amount_precision), ',');
      if (currentPrice !== priceToSet) {
         setCurrentPrice(priceToSet);
         setAmount(amount);
      }
   };

   private handleOnSelectAsks = (index: string) => {
      const { asks, currentPrice, setCurrentPrice, currentMarket, setAmount } = this.props;
      const priceToSet = asks[Number(index)] && Number(asks[Number(index)][0]);
      let tempAmount = 0;
      for (let i = 0; i <= Number(index); i++) {
         tempAmount += Number(asks[i][1]);
      }
      const amount = Decimal.format(tempAmount, Number(currentMarket?.amount_precision), ',');
      if (currentPrice !== priceToSet) {
         setCurrentPrice(priceToSet);
         setAmount(amount);
      }
   };

   private getTickerValue = (currentMarket: Market, tickers: { [key: string]: Ticker }) => {
      const defaultTicker = { amount: 0, low: 0, last: 0, high: 0, volume: 0, open: 0, price_change_percent: '+0.00%' };

      return tickers[currentMarket.id] || defaultTicker;
   };
}

const mapStateToProps = (state: RootState) => ({
   bids: selectDepthBids(state),
   asks: selectDepthAsks(state),
   colorTheme: selectCurrentColorTheme(state),
   orderBookLoading: selectDepthLoading(state),
   currentMarket: selectCurrentMarket(state),
   currentPrice: selectCurrentPrice(state),
   lastRecentTrade: selectLastRecentTrade(state),
   marketTickers: selectMarketTickers(state),
   openOrdersList: selectOpenOrdersList(state),
   isMobileDevice: selectMobileDeviceState(state),
   recentTrades: selectRecentTrades(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, OwnProps> = dispatch => ({
   setCurrentPrice: price => dispatch(setCurrentPrice(price)),
   setAmount: amount => dispatch(setAmount(amount)),
});

export const TradingOrderList = React.memo(injectIntl(connect(mapStateToProps, mapDispatchToProps)(TradingOrderListContainer)) as any);
export type TradingOrderListProps = ReduxProps;
