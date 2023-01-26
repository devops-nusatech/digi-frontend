import React, { memo } from 'react';
import { MapDispatchToPropsFunction, MapStateToProps, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Decimal, NewTickerTable } from 'components';
import {
   useMarketsFetch,
   useMarketsTickersFetch,
} from 'hooks';
import {
   KlineState,
   klineUpdatePeriod,
   Market,
   RootState,
   selectKline,
   selectMarkets,
   selectMarketTickers,
   setCurrentMarket,
} from 'modules';
import { connect } from 'react-redux';

const defaultTicker = {
   amount: '0.0',
   last: '0.0',
   high: '0.0',
   open: '0.0',
   low: '0.0',
   price_change_percent: '+0.00%',
   volume: '0.0',
};

interface ReduxProps {
   kline: KlineState;
}

interface DispatchProps {
   klineUpdatePeriod: typeof klineUpdatePeriod;
}

type Props = ReduxProps & DispatchProps;

const MyMarketsTableMemo = memo((props: any, { kline, klineUpdatePeriod }: Props) => {
   useMarketsFetch();
   useMarketsTickersFetch();
   const history = useHistory();
   const dispatch = useDispatch();
   const markets = useSelector(selectMarkets);
   const marketTickers = useSelector(selectMarketTickers);
   const [currentBidUnit, setCurrentBidUnit] = React.useState('');

   const handleRedirectToTrading = (id: string) => {
      const currentMarket: Market | undefined = markets.find(item => item.id === id);
      console.log('id', id);
      console.log('marketid', markets.find(item => item.id));
      if (currentMarket) {
         props.handleChangeCurrentMarket && props.handleChangeCurrentMarket(currentMarket);
         dispatch(setCurrentMarket(currentMarket));
         history.push(`/trading/${currentMarket?.id}`);
      }
   };

   const formatFilteredMarkets = (list: string[], market: Market) => {
      if (!list.includes(market.quote_unit)) {
         list.push(market.quote_unit);
      }
      return list;
   };

   let currentBidUnitsList: string[] = [''];

   if (markets.length > 0) {
      currentBidUnitsList = markets.reduce(formatFilteredMarkets, currentBidUnitsList);
   }

   let currentBidUnitMarkets = props.markets || markets;

   if (currentBidUnit) {
      currentBidUnitMarkets = currentBidUnitMarkets.length ? currentBidUnitMarkets.filter(market => market.quote_unit === currentBidUnit) : [];
   }

   const formattedMarkets = currentBidUnitMarkets.length ? currentBidUnitMarkets.map(market =>
   ({
      ...market,
      last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
      open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
      price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
      high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), market.amount_precision),
      low: Decimal.format(Number((marketTickers[market.id] || defaultTicker).low), market.amount_precision),
      volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.amount_precision),
   }),
   ).map(market =>
   ({
      ...market,
      change: Decimal.format((+market.last - +market.open)
         .toFixed(market.price_precision), market.price_precision),
   }),
   ) : [];

   // console.log('currentBidUnit', currentBidUnit);
   // console.log('currentBidUnitsList', currentBidUnitsList);
   // console.log('formattedMarkets', formattedMarkets);
   // console.log('handleRedirectToTrading', handleRedirectToTrading);
   // console.log('setCurrentBidUnit', setCurrentBidUnit)

   return (
      <>
         <NewTickerTable
            currentBidUnit={currentBidUnit}
            currentBidUnitsList={currentBidUnitsList}
            markets={formattedMarkets}
            setCurrentBidUnit={setCurrentBidUnit}
            redirectToTrading={handleRedirectToTrading}
         />
         {/* <MyTickerTable
            currentBidUnit={currentBidUnit}
            currentBidUnitsList={currentBidUnitsList}
            markets={formattedMarkets}
            setCurrentBidUnit={setCurrentBidUnit}
            redirectToTrading={handleRedirectToTrading}
         /> */}
      </>
   );
});

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   kline: selectKline(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   klineUpdatePeriod: payload => dispatch(klineUpdatePeriod(payload)),
});

export const MyMarketsTable = connect<ReduxProps, DispatchProps, {}, RootState>(mapStateToProps, mapDispatchProps)(MyMarketsTableMemo);
