import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import Nouislider from 'nouislider-react';
import { injectIntl } from 'react-intl';
import { ChevronRightIcon } from '@heroicons/react/solid';
import {
   Button,
   // Decimal,
   OrderProps,
   // formatWithSeparators,
   InputOrder,
   TradingOrderBackToLogin,
} from 'components';
import { IcWallet } from 'assets';
import {
   alertPush,
   Market,
   orderExecuteFetch,
   RootState,
   selectCurrentMarket,
   selectCurrentMarketFilters,
   selectCurrentPrice,
   selectDepthAsks,
   selectDepthBids,
   selectMarketTickers,
   selectOrderExecuteLoading,
   selectUserLoggedIn,
   selectWallets,
   setCurrentPrice,
   Wallet,
   walletsFetch
} from 'modules';
import { IntlProps } from 'index';
import { FilterPrice } from 'filters';
import 'nouislider/distribute/nouislider.css';

//
type TOrderType = 'limit' | 'market';

interface ReduxProps {
   bids: string[][];
   asks: string[][];
   currentMarket: Market | undefined;
   currentMarketFilters: FilterPrice[];
   currentPrice: number | undefined;
   executeLoading: boolean;
   marketTickers: {
      [key: string]: {
         last: string;
      },
   };
   wallets: Wallet[];
}

interface StoreProps {
   orderSide: string;
   priceLimit: number | undefined;
   width: number;
   percentAsk: number;
   percentBid: number;
   orderType: TOrderType;
}

interface DispatchProps {
   walletsFetch: typeof walletsFetch;
   setCurrentPrice: typeof setCurrentPrice;
   orderExecute: typeof orderExecuteFetch;
   pushAlert: typeof alertPush;
}

interface OwnProps {
   isLoggedIn: boolean;
   currentPrice: string;
   defaultTabIndex?: number;
}

type Props = ReduxProps & DispatchProps & OwnProps & IntlProps;

class TradingOrderComponent extends Component<Props, StoreProps> {
   constructor(props: Props) {
      super(props);
      this.state = {
         orderSide: 'buy',
         priceLimit: undefined,
         width: 0,
         percentAsk: 20,
         percentBid: 20,

         orderType: 'limit',
      }
      this.tradingOrderRef = createRef()
   }
   private tradingOrderRef;

   public componentDidMount() {
      if (!this.props.wallets.length) {
         this.props.walletsFetch();
      }
   }

   public componentWillUnmount() {
      if (this.state.priceLimit !== undefined) {
         this.setState({
            priceLimit: undefined,
         });
      }
   }

   public componentDidUpdate() {
      if (this.tradingOrderRef.current && this.state.width !== this.tradingOrderRef.current.clientWidth) {
         this.setState({
            width: this.tradingOrderRef.current.clientWidth,
         });
      }
   }

   public componentWillReceiveProps(next: Props) {
      if (this.props.isLoggedIn && !next.wallets.length) {
         this.props.walletsFetch();
      }
      if (+next.currentPrice && next.currentPrice !== this.state.priceLimit) {
         this.setState({
            priceLimit: +next.currentPrice,
         });
      }
   }

   public render() {
      const {
         // asks,
         // bids,
         currentMarket,
         // currentMarketFilters,
         // defaultTabIndex,
         // executeLoading,
         // marketTickers,
         // wallets,
         isLoggedIn,
      } = this.props;
      const { priceLimit, percentAsk, percentBid, orderType } = this.state;

      if (!currentMarket) {
         return null;
      }

      // const walletBase = this.getWallet(currentMarket.base_unit, wallets);
      // const walletQuote = this.getWallet(currentMarket.quote_unit, wallets);

      // const currentTicker = marketTickers[currentMarket.id];
      // const defaultCurrentTicker = { last: '0' };

      // console.log('wallets', wallets);
      // console.log('walletBase', walletBase);
      // console.log('walletQuote', walletQuote);
      // console.log('currentTicker', currentTicker);
      // console.log('defaultCurrentTicker', defaultCurrentTicker);

      return (
         <div className="relative mt-1 rounded p-4 bg-neutral8 dark:bg-shade2" ref={this.tradingOrderRef}>
            <div className="flex items-center mb-6 justify-between">
               <div className="flex items-center space-x-4">
                  <div
                     onClick={() => this.handleGetOrderType('limit')}
                     className={`flex py-1.5 px-3 rounded-1xl font-dm font-bold leading-custom3 ${orderType === 'limit' ? 'bg-neutral6 dark:bg-neutral3' : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'} cursor-pointer transition ease-in-out duration-300`}
                  >
                     {
                        this.translate('page.body.trade.header.newOrder.content.orderType.limit')
                     }
                  </div>
                  <div
                     onClick={() => this.handleGetOrderType('market')}
                     className={`flex py-1.5 px-3 rounded-1xl font-dm font-bold leading-custom3 cursor-pointer ${orderType === 'market' ? 'bg-neutral6 dark:bg-neutral3' : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'} transition ease-in-out duration-300`}
                  >
                     {
                        this.translate('page.body.trade.header.newOrder.content.orderType.market')
                     }
                  </div>
               </div>
               <div className="flex items-center text-xs text-neutral4 font-medium leading-custom1">
                  <div className="">
                     Crypto trading tutorial
                  </div>
                  <Link to="/" className="flex items-center group">
                     <div className="ml-2 text-neutral2 dark:text-neutral6 group-hover:text-primary1 transition-all duration-300">
                        Learn now
                     </div>
                     <div className="w-5 h-5 flex items-center justify-center">
                        <ChevronRightIcon className="w-4 h-4 stroke-neutral2 dark:stroke-neutral6 fill-neutral2 dark:fill-neutral6 group-hover:stroke-primary1 transition-all duration-300" />
                     </div>
                  </Link>
               </div>
            </div>
            <div className="flex my-0 -mx-4">
               <div className="lg:block flex w-[calc(50%-32px)] shrink-0 grow-0 my-0 mx-4">
                  <div className="flex items-center justify-between mb-4">
                     <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
                        Buy BTC
                     </div>
                     <div className="flex items-center space-x-1">
                        <IcWallet />
                        <div className="text-xs font-semibold leading-custom1">
                           10,098.36 USDT
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                     <InputOrder
                        titleLeft="Price"
                        titleRight="IDR"
                        value={orderType === 'limit' ? priceLimit : ''}
                        placeholder={orderType === 'market' ? 'Market' : ''}
                        disabled={orderType === 'market'}
                     />
                     <InputOrder
                        titleLeft="Amount"
                        titleRight="BTC"
                        value={''}
                        readOnly
                     />
                     <div className="relative h-6 z-20">
                        <Nouislider
                           range={{ min: 0, max: 100 }}
                           start={percentBid}
                           step={10}
                           tooltips
                           connect={[true, false]}
                           onSlide={this.onSlideBid}
                           format={{
                              to(val) {
                                 return `${val}%`
                              },
                              from(val) {
                                 return Number(val);
                              }
                           }}
                           className="!cursor-pointer !absolute !top-[12px] !inset-x-0 !border-none !bg-neutral6 dark:!bg-neutral3 !shadow-none !h-0.5"
                        />
                        <div className="absolute top-[10px] inset-x-0 flex justify-between pointer-events-none">
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                        </div>
                     </div>
                     <InputOrder
                        titleLeft="Total"
                        titleRight="BTC"
                        value={''}
                        readOnly
                     />
                     <Button
                        onClick={this.handleOrder}
                        text="Buy BTC"
                        className="bg-primary5 hover:bg-primary5 hover:contrast-75"
                     />
                  </div>
               </div>
               <div className="lg:block flex w-[calc(50%-32px)] shrink-0 grow-0 my-0 mx-4">
                  <div className="flex items-center justify-between mb-4">
                     <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
                        Sell BTC
                     </div>
                     <div className="flex items-center space-x-1">
                        <IcWallet />
                        <div className="text-xs font-semibold leading-custom1">
                           10,098.36 BTC
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                     <InputOrder
                        titleLeft="Price"
                        titleRight="IDR"
                        value={orderType === 'limit' ? priceLimit : ''}
                        placeholder={orderType === 'market' ? 'Market' : ''}
                        disabled={orderType === 'market'}
                     />
                     <InputOrder
                        titleLeft="Amount"
                        titleRight="BTC"
                        value={''}
                     />
                     <div className="relative h-6 z-20">
                        <Nouislider
                           range={{ min: 0, max: 100 }}
                           start={percentAsk}
                           step={10}
                           tooltips
                           connect={[true, false]}
                           onSlide={this.onSlideAsk}
                           format={{
                              to(val) {
                                 return `${val}%`
                              },
                              from(val) {
                                 return Number(val);
                              }
                           }}
                           className="!cursor-pointer !absolute !top-[12px] !inset-x-0 !border-none !bg-neutral6 dark:!bg-neutral3 !shadow-none !h-0.5"
                        />
                        <div className="absolute top-[10px] inset-x-0 flex justify-between pointer-events-none">
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                           <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
                        </div>
                     </div>
                     <InputOrder
                        titleLeft="Total"
                        titleRight="BTC"
                        value={''}
                     />
                     <Button text="Sell BTC" className="bg-primary4 hover:bg-primary4 hover:contrast-75" />
                  </div>
               </div>
            </div>
            {
               !isLoggedIn && (
                  <TradingOrderBackToLogin />
               )
            }
         </div>
      );
   }

   //
   private handleGetOrderType = (type: TOrderType) => this.setState({ orderType: type });

   private handleOrder = (order: OrderProps) => {
      console.log('amount', order.amount);
      console.log('available', order.available);
      console.log('orderType', order.orderType);
      console.log('type', order.type);
      console.log('price', order.price);
   }
   //

   // private handleSubmit = (value: OrderProps) => {
   //    const { currentMarket } = this.props;

   //    if (!currentMarket) {
   //       return;
   //    }

   //    const {
   //       amount,
   //       available,
   //       orderType,
   //       price,
   //       type,
   //    } = value;

   //    this.props.setCurrentPrice(0);

   //    const resultData = {
   //       market: currentMarket.id,
   //       side: type,
   //       volume: amount?.toString(),
   //       ord_type: (orderType as string)?.toLowerCase(),
   //    };

   //    const order = orderType === 'Limit' ? { ...resultData, price: price.toString() } : resultData;
   //    let orderAllowed: boolean = true;

   //    if (+resultData.volume < +currentMarket.min_amount) {
   //       this.props.pushAlert({
   //          message: [this.translate(
   //             'error.order.create.minAmount',
   //             {
   //                amount: Decimal.format(currentMarket.min_amount, currentMarket.amount_precision, ','),
   //                currency: currentMarket.base_unit.toUpperCase(),
   //             },
   //          )],
   //          type: 'error',
   //       });

   //       orderAllowed = false;
   //    }

   //    if (+price < +currentMarket.min_price) {
   //       this.props.pushAlert({
   //          message: [this.translate(
   //             'error.order.create.minPrice',
   //             {
   //                price: Decimal.format(currentMarket.min_price, currentMarket.price_precision, ','),
   //                currency: currentMarket.quote_unit.toUpperCase(),
   //             },
   //          )],
   //          type: 'error',
   //       });

   //       orderAllowed = false;
   //    }

   //    if (+currentMarket.max_price && +price > +currentMarket.max_price) {
   //       this.props.pushAlert({
   //          message: [this.translate(
   //             'error.order.create.maxPrice',
   //             {
   //                price: Decimal.format(currentMarket.max_price, currentMarket.price_precision, ','),
   //                currency: currentMarket.quote_unit.toUpperCase(),
   //             },
   //          )],
   //          type: 'error',
   //       });

   //       orderAllowed = false;
   //    }

   //    if ((+available < (+amount * +price) && order.side === 'buy') || (+available < +amount && order.side === 'sell')) {
   //       this.props.pushAlert({
   //          message: [this.translate(
   //             'error.order.create.available',
   //             {
   //                available: formatWithSeparators(String(available), ','),
   //                currency: order.side === 'buy' ? (
   //                   currentMarket.quote_unit.toUpperCase()
   //                ) : (
   //                   currentMarket.base_unit.toUpperCase()
   //                ),
   //             },
   //          )],
   //          type: 'error',
   //       });

   //       orderAllowed = false;
   //    }

   //    if (orderAllowed) {
   //       this.props.orderExecute(order);
   //    }
   // };


   // private getWallet = (currency: string, wallets: Wallet[]) => {
   //    const currenyLower = currency.toLowerCase();
   //    return wallets.find(e => e.currency === currenyLower) as Wallet
   // }

   private translate = (id: string, value?: any) => this.props.intl.formatMessage({ id }, { ...value });

   private onSlideBid = (render, handle, value, un, percent) => {
      this.setState({
         percentBid: percent[0],
      });
   }

   private onSlideAsk = (render, handle, value, un, percent) => {
      this.setState({
         percentAsk: percent[0],
      });
   }

}

const mapStateToProps = (state: RootState) => ({
   asks: selectDepthAsks(state),
   bids: selectDepthBids(state),
   currentMarket: selectCurrentMarket(state),
   currentMarketFilters: selectCurrentMarketFilters(state),
   currentPrice: selectCurrentPrice(state),
   executeLoading: selectOrderExecuteLoading(state),
   isLoggedIn: selectUserLoggedIn(state),
   marketTickers: selectMarketTickers(state),
   wallets: selectWallets(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   walletsFetch: () => dispatch(walletsFetch()),
   orderExecute: payload => dispatch(orderExecuteFetch(payload)),
   pushAlert: payload => dispatch(alertPush(payload)),
   setCurrentPrice: price => dispatch(setCurrentPrice(price)),
});

export const TradingOrder = injectIntl(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(TradingOrderComponent as any)) as any;
