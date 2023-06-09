import { useState, ChangeEvent, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Decimal } from 'components';
import { arrayFilter } from 'helpers';
import { useLocalStorage, useMarketsTickersFetch } from 'hooks';
import {
   Market,
   selectUserInfo,
   selectUserLoggedIn,
   selectMarkets,
   selectMarketTickers,
   selectMarketsLoading,
   selectMarketTickersLoading,
   selectConfigsLoading,
   setCurrentMarket,
   selectCurrentMarket,
   changeUserDataFetch,
   selectCurrentLanguage,
} from 'modules';
import { DEFAULT_TICKER } from '../constants';

export const useMarket = () => {
   useMarketsTickersFetch();
   const { push } = useHistory();
   const dispatch = useDispatch();

   const user = useSelector(selectUserInfo);
   const isLogin = useSelector(selectUserLoggedIn);
   const lang = useSelector(selectCurrentLanguage);
   const markets = useSelector(selectMarkets);
   const tickers = useSelector(selectMarketTickers);
   const marketLoading = useSelector(selectMarketsLoading);
   const marketTickerLoading = useSelector(selectMarketTickersLoading);
   const configsLoading = useSelector(selectConfigsLoading);
   const currentMarket = useSelector(selectCurrentMarket);

   const [currentBidUnit, setCurrentBidUnit] = useState('');
   const [searchMarket, setSearchMarket] = useState('');

   const handleSearchMarket = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => setSearchMarket(e.target.value),
      []
   );

   const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

   const handleRemoveKey = useCallback((array: string[], index: number) => {
      const firstArray = array.slice(0, index);
      const lastArray = array.slice(index + 1);
      return [...firstArray, ...lastArray];
   }, []);

   const handleLocalStorage = useCallback(
      (id: string) => {
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
      },
      [handleRemoveKey, setFavorites]
   );

   const _favorites = useMemo<Array<string>>(
      () => user.data && JSON.parse(user.data).favorites,
      [user.data]
   );
   const handleSetFavorites = useCallback(
      (id: string) => {
         const favoriteId = _favorites?.find(e => e === id);
         const findIndex = (id: string) => id === favoriteId;
         dispatch(
            changeUserDataFetch({
               user: {
                  ...user,
                  data: JSON.stringify({
                     language: lang,
                     favorites: favoriteId
                        ? handleRemoveKey(
                             _favorites,
                             _favorites?.findIndex(findIndex)
                          )
                        : !_favorites
                        ? []
                        : [..._favorites, id],
                  }),
               },
            })
         );
      },
      [_favorites, dispatch, handleRemoveKey, lang, user]
   );

   const handleToSetFavorites = useCallback(
      (e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => {
         if (e) {
            e.stopPropagation();
            isLogin ? handleSetFavorites(id) : handleLocalStorage(id);
         }
      },
      [handleLocalStorage, handleSetFavorites, isLogin]
   );

   const handleRedirectToTrading = useCallback(
      (id: string) => {
         const currentMarket: Market | undefined = markets?.find(
            market => market?.id === id
         );
         if (currentMarket) {
            dispatch(setCurrentMarket(currentMarket));
            push(`/trading/${currentMarket && currentMarket?.id}`);
         }
      },
      [dispatch, markets, push]
   );

   const formatFilteredMarkets = useCallback(
      (list: string[], market: Market) => {
         if (!list.includes(market.quote_unit)) {
            list.push(market.quote_unit);
         }
         return list;
      },
      []
   );

   const formatDecimal = useCallback(
      (value: number | string, precision: number) =>
         Decimal.format(value, precision, ','),
      []
   );

   let currentBidUnitsList: string[] = ['star', ''];

   if (markets?.length > 0) {
      currentBidUnitsList = markets?.reduce(
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
                    currentBidUnitMarkets?.find(e1 => e1?.id === f1)
                 )
               : favorites?.map(f2 =>
                    currentBidUnitMarkets?.find(e2 => e2?.id === f2)
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

   const formatMarketTikers = useCallback(
      (markets: Market[]) => {
         return markets?.length
            ? markets?.map((market, index) => {
                 const pricePrecision = market?.price_precision;
                 const amountPrecision = market?.amount_precision;
                 const {
                    amount,
                    avg_price,
                    high,
                    last,
                    low,
                    open,
                    price_change_percent,
                    volume,
                 } = tickers[market?.id] || DEFAULT_TICKER;
                 return {
                    ...market,
                    no: index + 1,
                    amount: formatDecimal(amount, amountPrecision),
                    avg_price: formatDecimal(avg_price, pricePrecision),
                    high: formatDecimal(high, pricePrecision),
                    last: formatDecimal(last, pricePrecision),
                    low: formatDecimal(low, pricePrecision),
                    open: formatDecimal(open, pricePrecision),
                    price_change_percent,
                    volume: formatDecimal(volume, pricePrecision),
                    change: formatDecimal(+last - +open, pricePrecision),
                    isFav: isLogin
                       ? !!_favorites?.find(favId => market?.id === favId)
                       : !!favorites?.find(favId => market?.id === favId),
                 };
              })
            : [];
      },
      [_favorites, favorites, formatDecimal, isLogin, tickers]
   );

   const isLoading = useMemo(
      () => marketTickerLoading || configsLoading,
      [configsLoading, marketTickerLoading]
   );

   return {
      currentBidUnit,
      setCurrentBidUnit,
      currentBidUnitsList,
      markets: formatMarketTikers(markets),
      filterMarkets: formatMarketTikers(currentBidUnitMarkets),
      handleRedirectToTrading,
      handleSearchMarket,
      push,
      isLoading,
      marketLoading,
      currentMarket,
      handleToSetFavorites,
      searchMarket,
      tickers,
   };
};
