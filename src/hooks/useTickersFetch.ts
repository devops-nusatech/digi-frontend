import { useEffect } from 'react';
import {
   selectMarkets,
   marketsTickersFetch,
   selectShouldFetchMarketsTickers,
} from 'modules';
import { useDispatch } from 'react-redux';
import { useReduxSelector } from './redux';

export const useMarketsTickersFetch = () => {
   const shouldDispatch = useReduxSelector(selectShouldFetchMarketsTickers);
   const markets = useReduxSelector(selectMarkets);
   const dispatch = useDispatch();

   useEffect(() => {
      if (shouldDispatch && markets.length) {
         dispatch(marketsTickersFetch());
      }
   }, [dispatch, shouldDispatch, markets]);
};
