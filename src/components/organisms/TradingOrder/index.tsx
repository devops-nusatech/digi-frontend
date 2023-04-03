import React, {
   useEffect,
   useState,
   FunctionComponent,
   useLayoutEffect,
   useMemo,
   useCallback,
   FC,
} from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';

import {
   alertPush,
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
   selectUserLoggedIn,
   selectWallets,
   setAmount,
   setCurrentPrice,
   User,
   Wallet,
   walletsFetch,
} from 'modules';
import { OrderType, OrderSide } from 'modules/types';
import {
   Decimal,
   formatWithSeparators,
   TradingOrderAsk,
   TradingOrderBid,
   TradingOrderBackToLogin,
   Nav,
   FlexCenter,
   Button,
} from 'components';
import { FilterPrice } from 'filters';
import { IntlProps } from 'index';
import { Translate } from 'types';

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
         last: string;
      };
   };
   bids: string[][];
   asks: string[][];
   wallets: Wallet[];
   currentPrice: string;
   amountVolume: string;
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

type UserProps = Translate & {
   user: User;
};

type Props = ReduxProps & DispatchProps & OwnProps & UserProps & IntlProps;

const navs = ['Transaction', 'History'];
const orderTypeinitial: OrderType[] = ['limit', 'market'];

const TradingOrderChild = ({
   user,
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
   translate,
}: Props) => {
   const name = useMemo(
      () => currentMarket?.name! || '',
      [currentMarket?.name]
   );
   const base_unit = useMemo(
      () => currentMarket?.base_unit!,
      [currentMarket?.base_unit]
   );
   const quote_unit = useMemo(
      () => currentMarket?.quote_unit!,
      [currentMarket?.quote_unit]
   );
   const price_precision = useMemo(
      () => currentMarket?.price_precision!,
      [currentMarket?.price_precision]
   );
   const amount_precision = useMemo(
      () => currentMarket?.amount_precision!,
      [currentMarket?.amount_precision]
   );
   const min_amount = useMemo(
      () => Number(currentMarket?.min_amount!),
      [currentMarket?.min_amount]
   );
   const min_price = useMemo(
      () => currentMarket?.min_price!,
      [currentMarket?.min_price]
   );
   const max_price = useMemo(
      () => Number(currentMarket?.max_price),
      [currentMarket?.max_price]
   );
   const lastPrice = useMemo(
      () => marketTickers[currentMarket?.id!]?.last,
      [currentMarket?.id, marketTickers]
   );
   const from = useMemo(
      () => String(name?.toUpperCase()?.split('/')?.pop()) || '',
      [name]
   );
   const to = useMemo(() => base_unit?.toUpperCase() || '', [base_unit]);
   const marketId = useMemo(
      () => currentMarket?.id! || '',
      [currentMarket?.id]
   );
   const taker = useMemo(
      () => +user.p2p_tier.taker_fee * 100,
      [user.p2p_tier.taker_fee]
   );
   const maker = useMemo(
      () => +user.p2p_tier.maker_fee * 100,
      [user.p2p_tier.maker_fee]
   );

   const [orderPrice, setOrderPrice] = useState('');
   const [orderType, setOrderType] = useState(orderTypeinitial[0]);
   const [showOrder, setShowOrder] = useState<'' | 'buy' | 'sell'>('');
   const [currentTab, setCurrentTab] = useState(0);

   useEffect(() => {
      if (isLoggedIn && !wallets.length) {
         walletsFetch();
      }
   }, [isLoggedIn, wallets, walletsFetch]);
   useEffect(() => {
      if (+currentPrice && currentPrice !== orderPrice) {
         setOrderPrice(currentPrice);
      }
   }, [currentPrice]);
   useLayoutEffect(() => {
      return () => {
         handleListenState();
      };
   }, [marketId]);

   const getWallet = useCallback(
      (currency: string, wallets: Wallet[]) => {
         const currencyLower = currency?.toLowerCase();
         return wallets.find(w => w.currency === currencyLower) as Wallet;
      },
      [marketId]
   );

   const walletBase = getWallet(base_unit, wallets);
   const walletQuote = getWallet(quote_unit, wallets);

   const getAvailableValue = (wallet: Wallet) =>
      wallet && wallet?.balance ? Number(wallet?.balance) : 0;

   const handleSetOrderType = (ord_type: OrderType) => setOrderType(ord_type);

   const handleListenState = () => {
      setCurrentAmount('');
      setCurrentPrice(0);
   };

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
         volume,
      };

      const sendOrder =
         orderType === 'limit'
            ? {
                 ...valueOrder,
                 price: price.includes(',')
                    ? price.split(',').join('').toString()
                    : price.toString(),
              }
            : valueOrder;

      let orderAllowed = true;

      if (+volume < +min_amount) {
         alertPush({
            message: [
               translate('error.order.create.minAmount', {
                  amount: Decimal.format(min_amount, amount_precision, ','),
                  currency: base_unit.toUpperCase(),
               }),
            ],
            type: 'error',
         });
         orderAllowed = false;
         console.log(1);
      }
      if (+price < +min_price) {
         alertPush({
            message: [
               translate('error.order.create.minPrice', {
                  price: Decimal.format(min_price, price_precision, ','),
                  currency: quote_unit.toUpperCase(),
               }),
            ],
            type: 'error',
         });
         orderAllowed = false;
         console.log(2);
      }
      if (+max_price && +price > +max_price) {
         alertPush({
            message: [
               translate('error.order.create.maxPrice', {
                  price: Decimal.format(max_price, price_precision, ','),
                  currency: quote_unit.toUpperCase(),
               }),
            ],
            type: 'error',
         });
         orderAllowed = false;
         console.log(3);
      }
      if (
         (+getAvailableValue(walletQuote) < +volume * +price &&
            side === 'buy') ||
         (+getAvailableValue(walletBase) < +volume && side === 'sell')
      ) {
         alertPush({
            message: [
               translate('error.order.create.available', {
                  available: formatWithSeparators(
                     String(
                        side === 'buy'
                           ? getAvailableValue(walletQuote)
                           : getAvailableValue(walletBase)
                     ),
                     ','
                  ),
                  currency:
                     side === 'buy'
                        ? quote_unit.toUpperCase()
                        : base_unit.toUpperCase(),
               }),
            ],
            type: 'error',
         });
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
   };

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

   const makerFee = useMemo(
      () => user && user.myTier?.benefit.maker_fee,
      [user]
   );
   const takerFee = useMemo(
      () => user && user.myTier?.benefit.taker_fee,
      [user]
   );

   return (
      <ContainerOrder>
         {isLoggedIn && (
            <FlexCenter className="justify-center gap-4 lg-max:hidden">
               {navs.map((e, i) => (
                  <Nav
                     key={i}
                     title={e}
                     theme="grey"
                     isActive={currentTab === i}
                     onClick={() => setCurrentTab(i)}
                  />
               ))}
            </FlexCenter>
         )}
         <FlexCenter className="justify-between lg-max:!mt-0">
            <div className="flex gap-4">
               {orderTypeinitial.map(e => (
                  <Nav
                     key={e}
                     title={e.charAt(0).toUpperCase() + e.slice(1)}
                     theme="grey"
                     isActive={e === orderType}
                     onClick={() => handleSetOrderType(e)}
                  />
               ))}
            </div>
            <FlexCenter className="gap-3 text-xs font-medium text-neutral4">
               <div>
                  Maker:{' '}
                  <span className="font-bold text-primary4">
                     {makerFee || 0}%
                  </span>
               </div>
               <div>
                  Taker:{' '}
                  <span className="font-bold text-primary4">
                     {takerFee || 0}%
                  </span>
               </div>
            </FlexCenter>
         </FlexCenter>
         {showOrder}
         <div>
            <div className="block">
               <div
                  className={`${
                     showOrder !== ''
                        ? 'lg-max:-translate-y-full lg-max:scale-100 lg-max:shadow-order'
                        : 'lg-max:scale-75'
                  } transition-all duration-300 lg-max:fixed lg-max:inset-x-0 lg-max:top-full lg-max:z-6 lg-max:bg-neutral8 lg-max:p-4 lg-max:dark:bg-neutral1`}>
                  <div className="block lg:-mx-4 lg:flex">
                     <TradingOrderBid
                        setShowOrder={setShowOrder}
                        display={showOrder === 'buy'}
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
                        disabled={executeLoading || user?.level < 2}
                        minAmount={min_amount}
                        minPrice={min_price}
                        maxPrice={max_price}
                        priceMarket={lastPrice}
                        amountVolume={amountVolume}
                        market={marketId}
                        asks={asks}
                        executeLoading={executeLoading}
                        taker={taker}
                        maker={maker}
                     />
                     <TradingOrderAsk
                        setShowOrder={setShowOrder}
                        display={showOrder === 'sell'}
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
                        disabled={executeLoading || user?.level < 2}
                        minAmount={min_amount}
                        minPrice={min_price}
                        maxPrice={max_price}
                        priceMarket={lastPrice}
                        amountVolume={amountVolume}
                        market={marketId}
                        bids={bids}
                        taker={taker}
                        maker={maker}
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-3 lg:hidden">
            <Button
               text="Buy"
               size="normal"
               onClick={() => setShowOrder('buy')}
            />
            <Button
               text="Sell"
               variant="orange"
               size="normal"
               onClick={() => setShowOrder('sell')}
            />
         </div>
         {!isLoggedIn && <TradingOrderBackToLogin />}
      </ContainerOrder>
   );
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
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   walletsFetch: () => dispatch(walletsFetch()),
   orderExecuteFetch: payload => dispatch(orderExecuteFetch(payload)),
   alertPush: payload => dispatch(alertPush(payload)),
   setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
   setCurrentAmount: payload => dispatch(setAmount(payload)),
});

export const TradingOrder = injectIntl(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(TradingOrderChild as FunctionComponent)
) as FunctionComponent<UserProps>;

const ContainerOrder: FC = ({ children }) => (
   <div className="relative mt-1 space-y-4 rounded bg-neutral8 p-4 dark:bg-shade2 lg:space-y-6 lg-max:fixed lg-max:inset-x-0 lg-max:bottom-0 lg-max:z-5 lg-max:m-0 lg-max:shadow-order">
      {children}
   </div>
);
