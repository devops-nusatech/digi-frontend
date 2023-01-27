import React, {
   useEffect,
   useState,
   FunctionComponent,
   useLayoutEffect
} from 'react';
import { injectIntl } from 'react-intl';
import {
   connect,
   MapDispatchToPropsFunction
} from 'react-redux';
// import { ChevronRightIcon } from '@heroicons/react/solid';

import {
   alertPush,
   GroupMember,
   Market,
   orderExecuteFetch,
   RootState,
   selectAmount,
   selectCurrentMarket,
   selectCurrentMarketFilters,
   selectCurrentPrice,
   selectDepthAsks,
   selectDepthBids,
   selectMarketTickers,
   selectOrderExecuteLoading,
   selectTradingFees,
   selectUserLoggedIn,
   selectWallets,
   setAmount,
   setCurrentPrice,
   TradingFee,
   Wallet,
   walletsFetch,
} from 'modules';
import { OrderType, OrderSide } from 'modules/types';
import {
   Decimal,
   // SliderPercent,
   // InputOrder,
   // Button,
   formatWithSeparators,
   TradingOrderAsk,
   TradingOrderBid,
   TradingOrderBackToLogin,
   Nav,
   TradingTrade,
} from 'components';
import { FilterPrice } from 'filters';
import { IntlProps } from 'index';
import { selectGroupMember } from 'modules/user/groupMember/selectors';

export interface IOrderProps {
   price: string;
   side: OrderSide;
   volume: string;
}

interface ReduxProps {
   currentMarket: Market | undefined;
   currentMarketFilters: FilterPrice;
   executeLoading: boolean;
   marketTickers: {
      [key: string]: {
         last: string,
      }
   },
   bids: string[][];
   asks: string[][];
   wallets: Wallet[];
   currentPrice: string;
   amountVolume: string;
   groupMember: GroupMember;
   tradingFees: TradingFee[];
}

interface DispatchProps {
   walletsFetch: typeof walletsFetch;
   setCurrentPrice: typeof setCurrentPrice;
   setCurrentAmount: typeof setAmount;
   orderExecuteFetch: typeof orderExecuteFetch;
   alertPush: typeof alertPush;
}

interface OwnProps {
   isLoggedIn: boolean;
   currentPrice: string;
}

type Props = ReduxProps & DispatchProps & OwnProps & IntlProps;

const TradingOrderLastFunc = (props: Props) => {
   const {
      wallets,
      walletsFetch,
      isLoggedIn,
      currentPrice,
      intl: { formatMessage },
      currentMarket,
      marketTickers,
      orderExecuteFetch,
      alertPush,
      executeLoading,
      amountVolume,
      setCurrentPrice,
      setCurrentAmount,
      bids,
      asks,
      tradingFees,
      groupMember
   } = props;

   const name: string = String(currentMarket?.name);
   const base_unit: string = String(currentMarket?.base_unit);
   const quote_unit: string = String(currentMarket?.quote_unit);
   const price_precision: number = Number(currentMarket?.price_precision);
   const amount_precision: number = Number(currentMarket?.amount_precision);
   const min_amount: number = Number(currentMarket?.min_amount);
   const min_price: number = Number(currentMarket?.min_price);
   const max_price: number = Number(currentMarket?.max_price);
   const lastPrice: string = marketTickers[String(currentMarket?.id)]?.last;
   const from: string = String(name.toUpperCase().split('/').pop());
   const to: string = base_unit.toUpperCase();
   const marketId: string = String(currentMarket?.id);
   const taker = tradingFees.find(e => e.group === groupMember.group)?.taker;
   const maker = tradingFees.find(e => e.group === groupMember.group)?.maker

   const [orderPrice, setOrderPrice] = useState<string>('');
   const [orderType, setOrderType] = useState<OrderType>('limit');
   const [currentTab, setCurrentTab] = useState(0);

   useEffect(() => {
      if (!wallets.length) {
         walletsFetch();
      }
      if (isLoggedIn && !wallets.length) {
         walletsFetch();
      }
      walletsFetch();
   }, []);
   useEffect(() => {
      if (+currentPrice && currentPrice !== orderPrice) {
         setOrderPrice(currentPrice);
      }
   }, [+currentPrice]);
   useLayoutEffect(() => {
      return () => {
         handleListenState();
      }
   }, [marketId]);

   const translate = (id: string, value?: any) => formatMessage({ id }, { ...value });

   const getWallet = (currency: string, wallets: Wallet[]) => {
      const currencyLower = currency.toLowerCase();
      return wallets.find(w => w.currency === currencyLower) as Wallet;
   }

   const walletBase = getWallet(base_unit, wallets);
   const walletQuote = getWallet(quote_unit, wallets);

   const getAvailableValue = (wallet: Wallet) => wallet && wallet?.balance ? Number(wallet?.balance) : 0;

   const handleSetOrderType = (ord_type: OrderType) => setOrderType(ord_type);

   const handleListenState = () => {
      setCurrentAmount('');
      setCurrentPrice(0);
   }

   const handleOrder = (order: IOrderProps) => {
      if (!currentMarket) {
         return;
      }
      const { side, volume, price } = order;

      handleListenState();

      const valueOrder = {
         ord_type: orderType,
         market: String(currentMarket?.id),
         side,
         volume
      };

      const sendOrder = orderType === 'limit' ? { ...valueOrder, price: price.includes(',') ? price.split(',').join('').toString() : price.toString() } : valueOrder;

      let orderAllowed = true;

      if (+volume < +min_amount) {
         alertPush({
            message: [translate('error.order.create.minAmount', {
               amount: Decimal.format(min_amount, amount_precision, ','),
               currency: base_unit.toUpperCase(),
            })],
            type: 'error'
         })
         orderAllowed = false;
         console.log(1);
      }
      if (+price < +min_price) {
         alertPush({
            message: [translate('error.order.create.minPrice', {
               price: Decimal.format(min_price, price_precision, ','),
               currency: quote_unit.toUpperCase(),
            })],
            type: 'error'
         })
         orderAllowed = false;
         console.log(2);
      }
      if (+max_price && +price > +max_price) {
         alertPush({
            message: [translate('error.order.create.maxPrice', {
               price: Decimal.format(max_price, price_precision, ','),
               currency: quote_unit.toUpperCase(),
            })],
            type: 'error'
         })
         orderAllowed = false;
         console.log(3);
      }
      if ((+getAvailableValue(walletQuote) < (+volume * +price) && side === 'buy') ||
         (+getAvailableValue(walletBase) < +volume && side === 'sell')
      ) {
         alertPush({
            message: [translate('error.order.create.available', {
               available: formatWithSeparators(String(side === 'buy' ? getAvailableValue(walletQuote) : getAvailableValue(walletBase)), ','),
               currency: side === 'buy' ? (
                  quote_unit.toUpperCase()
               ) : (
                  base_unit.toUpperCase()
               ),
            })],
            type: 'error'
         })
         orderAllowed = false;
         console.log(4);
      }
      if (orderAllowed) {
         console.log('valueOrder', sendOrder);
         // alert(JSON.stringify(sendOrder));
         orderExecuteFetch(sendOrder);
         setOrderPrice('');
         setOrderType('limit');
      }
   }

   // const handleOrder = (e: FormEvent<HTMLFormElement>, order: IOrderProps) => {
   //    e.preventDefault();
   //    e.persist();
   //    if (!currentMarket) {
   //       return;
   //    }
   //    setCurrentPrice(0);
   //    const { side, volume, price } = order;
   //    const valueOrder = {
   //       ord_type,
   //       market: String(currentMarket?.id),
   //       side,
   //       volume
   //    };
   //    const sendOrder = ord_type === 'limit' ? { ...valueOrder, price } : valueOrder;
   //    let orderAllowed = true;
   //    if (+valueOrder.volume < +min_amount) {
   //       alertPush({
   //          message: [translate('error.order.create.minAmount', {
   //             amount: Decimal.format(min_amount, amount_precision, ','),
   //             currency: base_unit.toUpperCase(),
   //          })],
   //          type: 'error'
   //       })
   //       orderAllowed = false;
   //    }
   //    if (+price < +min_price) {
   //       alertPush({
   //          message: [translate('error.order.create.minPrice', {
   //             price: Decimal.format(min_price, price_precision, ','),
   //             currency: quote_unit.toUpperCase(),
   //          })],
   //          type: 'error'
   //       })
   //       orderAllowed = false;
   //    }
   //    if (+max_price && +price > +max_price) {
   //       alertPush({
   //          message: [translate('error.order.create.maxPrice', {
   //             price: Decimal.format(max_price, price_precision, ','),
   //             currency: quote_unit.toUpperCase(),
   //          })],
   //          type: 'error'
   //       })
   //       orderAllowed = false;
   //    }
   //    if ((+getAvailableValue(walletQuote) < (+valueOrder.volume * +price) && side === 'buy') ||
   //       (+getAvailableValue(walletBase) < +valueOrder.volume && side === 'sell')
   //    ) {
   //       alertPush({
   //          message: [translate('error.order.create.available', {
   //             available: formatWithSeparators(String(side === 'buy' ? getAvailableValue(walletQuote) : getAvailableValue(walletBase)), ','),
   //             currency: side === 'buy' ? (
   //                quote_unit.toUpperCase()
   //             ) : (
   //                base_unit.toUpperCase()
   //             ),
   //          })],
   //          type: 'error'
   //       })
   //       orderAllowed = false;
   //    }
   //    if (orderAllowed) {
   //       console.log('sendOrder', sendOrder);
   //       alert(JSON.stringify(sendOrder))
   //       // orderExecuteFetch(valueOrder);
   //       // setOrderPrice(0);
   //       // setOrderVolume(0);
   //       // setOrderBuy({
   //       //    market: '',
   //       //    ord_type: 'limit',
   //       //    total: 0
   //       // });
   //    }
   // }


   return (
      <>
         <div className="relative mt-1 rounded p-4 bg-neutral8 dark:bg-shade2">
            <div className={`flex space-x-4 justify-center ${!isLoggedIn ? 'opacity-0' : 'opacity-100'}`}>
               <Nav
                  title="Transaction"
                  isActive={currentTab === 0}
                  onClick={() => setCurrentTab(0)}
                  theme="grey"
               />
               <Nav
                  title="My orders"
                  isActive={currentTab === 1}
                  onClick={() => setCurrentTab(1)}
                  theme="grey"
               />
            </div>
            <div className={`${currentTab === 0 ? 'h-[369.99px] opacity-100 z-10 visible' : 'h-0 opacity-0 z-0 invisible'} transition-all duration-700`}>
               <div className="flex items-center mb-6 justify-between">
                  <div className="flex items-center space-x-4">
                     <div
                        onClick={() => handleSetOrderType('limit')}
                        className={`flex py-1.5 px-3 rounded-1xl font-dm font-bold leading-custom3 ${orderType === 'limit' ? 'bg-neutral6 dark:bg-neutral3' : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'} cursor-pointer transition ease-in-out duration-300`}
                     >
                        {translate('page.body.trade.header.newOrder.content.orderType.limit')}
                     </div>
                     <div
                        onClick={() => handleSetOrderType('market')}
                        className={`flex py-1.5 px-3 rounded-1xl font-dm font-bold leading-custom3 cursor-pointer ${orderType === 'market' ? 'bg-neutral6 dark:bg-neutral3' : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'} transition ease-in-out duration-300`}
                     >
                        {translate('page.body.trade.header.newOrder.content.orderType.market')}
                     </div>
                  </div>
                  <div className="flex items-center gap-4  text-xs text-neutral4 font-medium leading-custom1">
                     <div className="">
                        Maker: <span className="text-primary4 font-bold">{maker}%</span>
                     </div>
                     <div className="">
                        Taker: <span className="text-primary4 font-bold">{taker}%</span>
                     </div>
                  </div>
                  {/* <div className="flex items-center text-xs text-neutral4 font-medium leading-custom1">
                     <div>Crypto trading tutorial</div>
                     <a href="https://www.digiassetindo.com/blog/tag/edukasi" target="_blank" rel="noopener noreferrer" className="flex items-center group">
                        <div className="ml-2 text-neutral2 dark:text-neutral6 group-hover:text-primary1 transition-all duration-300">
                           Learn now
                        </div>
                        <div className="w-5 h-5 flex items-center justify-center">
                           <ChevronRightIcon className="w-4 h-4 stroke-neutral2 dark:stroke-neutral6 fill-neutral2 dark:fill-neutral6 group-hover:stroke-primary1 transition-all duration-300" />
                        </div>
                     </a>
                  </div> */}
               </div>
               <div className="flex my-0 -mx-4">
                  {/* <div className="lg:block flex w-[calc(50%-32px)] shrink-0 grow-0 my-0 mx-4">
               <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
                     Buy {to}
                  </div>
                  <div className="flex items-center space-x-1">
                     <IcWallet />
                     <div className="text-xs font-semibold leading-custom1">
                        {Decimal.format(getAvailableValue(walletQuote), price_precision, ',')} {from}
                     </div>
                  </div>
               </div>
               <form onSubmit={e => handleOrder(e, 'buy')} className="flex flex-col space-y-3">
                  <InputOrder
                     titleLeft={translate('page.body.trade.header.newOrder.content.price')}
                     titleRight={from}
                     value={ord_type === 'market' ? '' : orderPrice === 0 ? '' : Decimal.format(orderPrice, price_precision, ',')}
                     placeholder={ord_type === 'market' ? 'Market' : ''}
                     disabled={ord_type === 'market'}
                  />
                  <InputOrder
                     titleLeft={translate('page.body.trade.header.newOrder.content.amount')}
                     titleRight={to}
                     value={orderVolume === 0 ? '' : Decimal.format(total / orderPrice, amount_precision)}
                     readOnly={ord_type === 'limit'}
                  />
                  {
                     (orderPrice || ord_type === 'market') &&
                     <SliderPercent
                        range={{
                           min: 0,
                           max: 100
                        }}
                        start={0}
                        onSlide={onSlideBid}
                     />
                  }
                  <InputOrder
                     titleLeft={translate('page.body.trade.header.newOrder.content.total')}
                     titleRight={from}
                     // value={total === 0 ? '' : Decimal.format(total, price_precision, ',')}
                     // value={total === 0 ? '' : Decimal.format((total / orderPrice) * orderPrice, price_precision, ',')}
                     value={Decimal.format(Number(Decimal.format(orderPrice, price_precision)) * Number(Decimal.format(total / orderPrice, amount_precision)), price_precision, ',') === 'NaN' ? '' : Decimal.format(Number(Decimal.format(orderPrice, price_precision)) * Number(Decimal.format(total / orderPrice, amount_precision)), price_precision, ',')}
                     readOnly
                  />
                  <Button
                     type="submit"
                     variant="green"
                     disabled={
                        checkButtonIsDisabled() ||
                        +Decimal.format(total / orderPrice, amount_precision) < +min_amount
                     }
                     text={`Buy ${to}`}
                  />
               </form>
            </div> */}
                  <TradingOrderBid
                     to={to}
                     from={from}
                     availableQuote={getAvailableValue(walletQuote)}
                     availableBase={getAvailableValue(walletBase)}
                     translate={translate}
                     pricePrecision={price_precision}
                     amountPrecision={amount_precision}
                     orderPrice={orderPrice}
                     orderType={orderType}
                     handleOrder={handleOrder}
                     disabled={executeLoading}
                     minAmount={min_amount}
                     minPrice={min_price}
                     priceMarket={lastPrice}
                     amountVolume={amountVolume}
                     market={marketId}
                     asks={asks}
                     executeLoading={executeLoading}
                     taker={taker}
                     maker={maker}
                  />
                  <TradingOrderAsk
                     executeLoading={executeLoading}
                     to={to}
                     from={from}
                     availableBase={getAvailableValue(walletBase)}
                     translate={translate}
                     pricePrecision={price_precision}
                     amountPrecision={amount_precision}
                     orderPrice={orderPrice}
                     orderType={orderType}
                     handleOrder={handleOrder}
                     disabled={executeLoading}
                     minAmount={min_amount}
                     minPrice={min_price}
                     priceMarket={lastPrice}
                     amountVolume={amountVolume}
                     market={marketId}
                     bids={bids}
                     taker={taker}
                     maker={maker}
                  />
               </div>
            </div>
            <div className={`${currentTab === 1 ? 'h-[369.99px] opacity-100 overflow-y-auto z-10 visible' : 'h-0 opacity-0 z-0 invisible'} transition-all duration-700`}>
               <TradingTrade />
            </div>
            {!isLoggedIn && (
               <TradingOrderBackToLogin />
            )}
         </div>
      </>
   )
};

const mapStateToProps = (state: RootState) => ({
   isLoggedIn: selectUserLoggedIn(state),
   bids: selectDepthBids(state),
   asks: selectDepthAsks(state),
   currentMarket: selectCurrentMarket(state),
   currentMarketFilters: selectCurrentMarketFilters(state),
   executeLoading: selectOrderExecuteLoading(state),
   marketTickers: selectMarketTickers(state),
   wallets: selectWallets(state),
   currentPrice: selectCurrentPrice(state),
   amountVolume: selectAmount(state),
   tradingFees: selectTradingFees(state),
   groupMember: selectGroupMember(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   walletsFetch: () => dispatch(walletsFetch()),
   orderExecuteFetch: payload => dispatch(orderExecuteFetch(payload)),
   alertPush: payload => dispatch(alertPush(payload)),
   setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
   setCurrentAmount: payload => dispatch(setAmount(payload)),
});

export const TradingOrderLast = injectIntl(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(TradingOrderLastFunc as FunctionComponent)
) as FunctionComponent;
