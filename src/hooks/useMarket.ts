import { useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
   Market,
   selectUserInfo,
   selectUserLoggedIn,
   selectMarkets,
   selectMarketTickers,
   selectCurrencies,
   selectMarketsLoading,
   selectMarketTickersLoading,
   selectCurrenciesLoading,
   setCurrentMarket,
   selectCurrentMarket,
   changeUserDataFetch,
   selectCurrentLanguage,
} from 'modules';
import {
   useCurrenciesFetch,
   useLocalStorage,
   useMarketsFetch,
   useMarketsTickersFetch,
} from 'hooks';
import { arrayFilter } from 'helpers';
import { Decimal } from 'components';
import { DEFAULT_TICKER } from '../constants';

export const useMarket = () => {
   useMarketsFetch();
   useMarketsTickersFetch();
   useCurrenciesFetch();
   const { push } = useHistory();
   const dispatch = useDispatch();
   const user = useSelector(selectUserInfo);
   const isLogin = useSelector(selectUserLoggedIn);
   const lang = useSelector(selectCurrentLanguage);
   const markets = useSelector(selectMarkets);
   const tikcers = useSelector(selectMarketTickers);
   const currencies = useSelector(selectCurrencies);
   const marketLoading = useSelector(selectMarketsLoading);
   const marketTickerLoading = useSelector(selectMarketTickersLoading);
   const currencyLoading = useSelector(selectCurrenciesLoading);
   const currentMarket = useSelector(selectCurrentMarket);
   const [currentBidUnit, setCurrentBidUnit] = useState('');
   const [searchMarket, setSearchMarket] = useState('');

   const handleSearchMarket = (e: ChangeEvent<HTMLInputElement>) =>
      setSearchMarket(e.target.value);

   const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

   const handleRemoveKey = (array: string[], index: number) => {
      let firstArray = array.slice(0, index);
      let lastArray = array.slice(index + 1);
      return [...firstArray, ...lastArray];
   };

   const handleLocalStorage = (id: string) => {
      let _themp: string[] = [];
      _themp = JSON.parse(String(localStorage.getItem('favorites'))) || [];
      const marketId = _themp?.find(e => e === id);
      if (!marketId) {
         _themp.push(id);
         setFavorites(_themp);
      } else {
         const index = (id: string) => id === marketId;
         setFavorites(handleRemoveKey(_themp, _themp?.findIndex(index)));
      }
   };

   const _favorites: Array<string> =
      user.data && JSON.parse(user.data).favorites;
   const handleSetFavorites = (id: string) => {
      const favoriteId = _favorites?.find(e => e === id);
      const index = (id: string) => id === favoriteId;
      dispatch(
         changeUserDataFetch({
            user: {
               ...user,
               data: JSON.stringify({
                  language: lang,
                  favorites: favoriteId
                     ? handleRemoveKey(_favorites, _favorites?.findIndex(index))
                     : !_favorites
                     ? []
                     : [..._favorites, id],
               }),
            },
         })
      );
   };

   const handleToSetFavorites = (id: string) => {
      isLogin ? handleSetFavorites(id) : handleLocalStorage(id);
   };

   const handleRedirectToTrading = (id: string) => {
      const currentMarket: Market | undefined = markets?.find(
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

   if (markets?.length > 0) {
      currentBidUnitsList = markets.reduce(
         formatFilteredMarkets,
         currentBidUnitsList
      );
   }

   let currentBidUnitMarkets: any[] = markets;

   if (currentBidUnit) {
      if (currentBidUnit === 'star') {
         currentBidUnitMarkets = currentBidUnitMarkets?.length
            ? isLogin
               ? _favorites?.map(f1 =>
                    currentBidUnitMarkets?.find(e1 => e1.id === f1)
                 )
               : favorites?.map(f2 =>
                    currentBidUnitMarkets?.find(e2 => e2.id === f2)
                 )
            : [];
      } else {
         currentBidUnitMarkets = currentBidUnitMarkets?.length
            ? currentBidUnitMarkets.filter(
                 market => market.quote_unit === currentBidUnit
              )
            : [];
      }
   }

   if (searchMarket) {
      currentBidUnitMarkets = currentBidUnitMarkets?.length
         ? arrayFilter(currentBidUnitMarkets, searchMarket)
         : [];
   }

   const formattedMarkets = currentBidUnitMarkets?.length
      ? currentBidUnitMarkets?.map(market => ({
           ...market,
           last: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).last),
              market?.price_precision,
              ','
           ),
           open: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).open),
              market?.price_precision,
              ','
           ),
           price_change_percent: String(
              (tikcers[market?.id] || DEFAULT_TICKER).price_change_percent
           ),
           high: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).high),
              market?.price_precision,
              ','
           ),
           low: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).low),
              market?.price_precision,
              ','
           ),
           volume: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).volume),
              market?.price_precision,
              ','
           ),
           change: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).last) -
                 Number((tikcers[market?.id] || DEFAULT_TICKER).open),
              market?.price_precision,
              ','
           ),
        }))
      : [];

   const formatOtherMarkets = markets?.length
      ? markets?.map(market => ({
           ...market,
           last: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).last),
              market?.price_precision,
              ','
           ),
           open: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).open),
              market?.price_precision,
              ','
           ),
           price_change_percent: String(
              (tikcers[market?.id] || DEFAULT_TICKER).price_change_percent
           ),
           high: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).high),
              market?.price_precision,
              ','
           ),
           low: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).low),
              market?.price_precision,
              ','
           ),
           volume: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).volume),
              market?.price_precision,
              ','
           ),
           change: Decimal.format(
              Number((tikcers[market?.id] || DEFAULT_TICKER).last) -
                 Number((tikcers[market?.id] || DEFAULT_TICKER).open),
              market?.price_precision,
              ','
           ),
        }))
      : [];

   const combainMarketWithIcon = (markets, currencies) =>
      markets?.map((itm, i) => ({
         no: i + 1,
         ...itm,
         curency_data:
            currencies?.find(item => item.id === itm.base_unit) || null,
         isFav: isLogin
            ? _favorites?.find(k => itm.id === k)
               ? true
               : false
            : favorites?.find(k => itm.id === k)
            ? true
            : false,
      }));

   const marketsData = combainMarketWithIcon(formattedMarkets, currencies);
   const otherMarkets = combainMarketWithIcon(formatOtherMarkets, currencies);

   const isLoading = marketTickerLoading || currencyLoading;

   return {
      currentBidUnit,
      setCurrentBidUnit,
      currentBidUnitsList,
      marketsData,
      otherMarkets,
      handleRedirectToTrading,
      handleSearchMarket,
      push,
      isLoading,
      marketLoading,
      currentMarket,
      handleToSetFavorites,
   };
};
