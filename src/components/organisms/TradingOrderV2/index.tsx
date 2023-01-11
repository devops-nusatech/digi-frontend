import React, {
   FC,
   FunctionComponent,
   useEffect,
   useState
} from 'react';
import { FilterPrice } from 'filters';
import { IntlProps } from 'index';
import {
   alertPush,
   Market,
   orderExecuteFetch,
   OrderType,
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
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { injectIntl } from 'react-intl';

export interface OrderPropsV2 extends OrderState {
   volume: number | string;
}

interface OrderState {
   price: number | undefined;
   ord_type: OrderType;
}

interface ReduxProps {
   currentMarket: Market;
   currentMarketFilters: FilterPrice[];
   executeLoading: boolean;
   marketTickers: {
      [key: string]: {
         last: string;
      }
   },
   bids: string[][];
   asks: string[][];
   wallets: Wallet[];
}

interface DispatchProps {
   walletsFetch: typeof walletsFetch;
   setCurrentPrice: typeof setCurrentPrice;
   orderExecute: typeof orderExecuteFetch;
   alertPush: typeof alertPush;
}

interface OwnProps {
   isLoggedIn: boolean;
   currentPrice: string;
}

type TradingOrderV2Props = ReduxProps & DispatchProps & OwnProps & IntlProps;

const TradingOrderV2FC: FC<TradingOrderV2Props> = ({
   currentMarket,
   currentMarketFilters,
   executeLoading,
   marketTickers,
   bids,
   asks,
   wallets,

   isLoggedIn,
   currentPrice,

   walletsFetch,
   setCurrentPrice,
   orderExecute,
   alertPush,
}) => {
   useEffect(() => {
      if (!wallets.length) {
         walletsFetch();
      }
      if (isLoggedIn && !wallets.length) {
         walletsFetch();
      }
      if (+currentPrice && currentPrice !== String(price)) {
         setState({ ...state, price });
      }
   }, [+currentPrice]);

   const [state, setState] = useState<OrderState>({
      price: undefined,
      ord_type: 'limit'
   });

   const { price } = state;


   // const handleSubmit = (value: OrderPropsV2) => {
   //    if (!currentMarket) {
   //       return;
   //    }
   //    setCurrentPrice(0);
   //    const {
   //       price,
   //       side,
   //       volume,
   //       ord_type
   //    } = value;

   //    const valueOrder = {
   //       ord_type,
   //       market: currentMarket.id,
   //       side,
   //       volume
   //    };
   //    const resultData = {
   //       market: currentMarket.id,
   //       side: type,
   //       volume,
   //       ord_type: (ord_type as string).toLowerCase(),
   //    };

   //    const order = ord_type === 'market' ? resultData : { ...resultData, price: String(price) };
   //    let orderAllowed = true;

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

   //    if ((+available < (+amount * +price) && order.side === 'buy') ||
   //       (+available < +amount && order.side === 'sell')) {
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

   return (
      <div>

      </div>
   );
};

const mapStateToProps = (state: RootState) => ({
   currentMarket: selectCurrentMarket(state),
   currentMarketFilters: selectCurrentMarketFilters(state),
   executeLoading: selectOrderExecuteLoading(state),
   marketTickers: selectMarketTickers(state),
   bids: selectDepthBids(state),
   asks: selectDepthAsks(state),
   wallets: selectWallets(state),
   isLoggedIn: selectUserLoggedIn(state),
   currentPrice: selectCurrentPrice(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   alertPush: payload => dispatch(alertPush(payload)),
   orderExecute: payload => dispatch(orderExecuteFetch(payload)),
   setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
   walletsFetch: () => dispatch(walletsFetch()),
});

export const TradingOrderV2 = injectIntl(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(TradingOrderV2FC as FunctionComponent)
) as FunctionComponent;
