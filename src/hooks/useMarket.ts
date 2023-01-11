import { arrayFilter } from 'helpers';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
   useSelector,
   useDispatch
} from 'react-redux';
import {
   Market,
   selectMarkets,
   selectMarketTickers,
   selectCurrencies,
   selectMarketsLoading,
   selectMarketTickersLoading,
   selectCurrenciesLoading,
   setCurrentMarket,
   selectCurrentMarket,
} from 'modules';
import {
   useCurrenciesFetch,
   useLocalStorage,
   useMarketsFetch,
   useMarketsTickersFetch
} from 'hooks';
import { Decimal } from 'components';

const defaultTicker = {
   amount: '0.0',
   last: '0.0',
   high: '0.0',
   open: '0.0',
   low: '0.0',
   price_change_percent: '+0.00%',
   volume: '0.0',
};

export const useMarket = () => {
   useMarketsFetch();
   useMarketsTickersFetch();
   useCurrenciesFetch();
   const { push } = useHistory();
   const dispatch = useDispatch();
   const markets = useSelector(selectMarkets);
   const tikcers = useSelector(selectMarketTickers);
   const currencies = useSelector(selectCurrencies);
   const marketLoading = useSelector(selectMarketsLoading);
   const marketTickerLoading = useSelector(selectMarketTickersLoading);
   const currencyLoading = useSelector(selectCurrenciesLoading);
   const currentMarket = useSelector(selectCurrentMarket);
   const [currentBidUnit, setCurrentBidUnit] = useState('');
   const [searchMarket, setSearchMarket] = useState('');

   const handleSearchMarket = (e: any) => setSearchMarket(e.target.value);

   const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

   const handleRemoveKey = (array: string[], index: number) => {
      let firstArray = array.slice(0, index);
      let lastArray = array.slice(index + 1);
      return [...firstArray, ...lastArray];
   }

   const handleLocalStorage = (id: string) => {
      let a: string[] = [];
      a = JSON.parse(String(localStorage.getItem('favorites'))) || [];
      const marketId = a.find(e => e === id);
      if (!marketId) {
         a.push(id);
         setFavorites(a);
      } else {
         const index = (id: string) => id === marketId;
         setFavorites(handleRemoveKey(a, a.findIndex(index)));
      }
   }

   const handleRedirectToTrading = (id: string) => {
      const currentMarket: Market | undefined = markets.find(
         market => market.id === id
      );
      if (currentMarket) {
         dispatch(setCurrentMarket(currentMarket));
         push(`/trading/${currentMarket?.id}`);
      }
   };

   const formatFilteredMarkets = (list: string[], market: Market) => {
      if (!list.includes(market.quote_unit)) {
         list.push(market.quote_unit);
      }
      return list;
   };

   let currentBidUnitsList: string[] = ['star', ''];

   if (markets.length > 0) {
      currentBidUnitsList = markets.reduce(
         formatFilteredMarkets,
         currentBidUnitsList
      );
   }

   let currentBidUnitMarkets: any[] = markets;

   if (currentBidUnit) {
      if (currentBidUnit === 'star') {
         currentBidUnitMarkets = currentBidUnitMarkets.length
            ? favorites.map(k => currentBidUnitMarkets.find(e => e.id === k))
            : [];
      } else {
         currentBidUnitMarkets = currentBidUnitMarkets.length
            ? currentBidUnitMarkets.filter(
               market => market.quote_unit === currentBidUnit
            )
            : [];
      }
   }

   if (searchMarket) {
      currentBidUnitMarkets = currentBidUnitMarkets.length
         ? arrayFilter(currentBidUnitMarkets, searchMarket) : [];
   }


   const formattedMarkets = currentBidUnitMarkets.length
      ? currentBidUnitMarkets.map(market => ({
         ...market,
         last: Decimal.format(
            Number((tikcers[market?.id] || defaultTicker).last),
            market?.price_precision,
            ','
         ),
         open: Decimal.format(
            Number((tikcers[market?.id] || defaultTicker).open),
            market?.price_precision,
            ','
         ),
         price_change_percent: String(
            (tikcers[market?.id] || defaultTicker).price_change_percent
         ),
         high: Decimal.format(
            Number((tikcers[market?.id] || defaultTicker).high),
            market?.price_precision,
            ','
         ),
         low: Decimal.format(
            Number((tikcers[market?.id] || defaultTicker).low),
            market?.price_precision,
            ','
         ),
         volume: Decimal.format(
            Number((tikcers[market?.id] || defaultTicker).volume),
            market?.price_precision,
            ','
         ),
         change: Decimal.format(
            Number((tikcers[market?.id] || defaultTicker).last) -
            Number((tikcers[market?.id] || defaultTicker).open),
            market?.price_precision,
            ','
         ),
      }))
      : [];


   const combainMarketWithIcon = (markets, currencies) =>
      markets.map((itm, i) => ({
         no: i + 1,
         ...itm,
         curency_data: currencies.find(item => item.id === itm.base_unit) || null,
         isFav: favorites.find(k => itm.id === k) ? true : false
      }));

   const marketsData = combainMarketWithIcon(formattedMarkets, currencies);

   const isLoading = marketLoading || marketTickerLoading || currencyLoading;

   return {
      currentBidUnit,
      setCurrentBidUnit,
      currentBidUnitsList,
      marketsData,
      handleRedirectToTrading,
      handleSearchMarket,
      push,
      isLoading,
      favorites,
      handleLocalStorage,
      currentMarket
   };
};
