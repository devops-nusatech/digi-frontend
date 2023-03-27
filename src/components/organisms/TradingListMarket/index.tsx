import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { injectIntl } from 'react-intl';
import { IntlProps } from '../../..';
import { SearchIcon, StarIcon } from '@heroicons/react/outline';
import { IcShorting } from 'assets';
import {
   depthFetch,
   Market,
   marketsTickersFetch,
   RootState,
   selectCurrentMarket,
   selectMarkets,
   selectMarketsLoading,
   selectMarketTickers,
   selectUserInfo,
   setCurrentMarket,
   setCurrentPrice,
   Ticker,
   User,
} from 'modules';
import { Decimal, Nav } from 'components';
import { useLocalStorage } from 'hooks';

interface ReduxProps {
   userData: User;
   markets: Market[];
   marketLoading?: boolean;
   marketTickers: {
      [key: string]: Ticker;
   };
   currentMarket: Market | undefined;
}

interface DispatchProps {
   setCurrentMarket: typeof setCurrentMarket;
   depthFetch: typeof depthFetch;
   tickers: typeof marketsTickersFetch;
   setCurrentPrice: typeof setCurrentPrice;
}

type Props = ReduxProps & DispatchProps & IntlProps;

const TradingListMarketFC: FC<Props> = ({
   userData,
   markets,
   marketLoading,
   marketTickers,
   currentMarket,
   setCurrentMarket,
   depthFetch,
   tickers,
   setCurrentPrice,
   intl: { formatMessage },
}) => {
   const history = useHistory();
   const [searchMarket, setSearchMarket] = useState<string>('');
   const [tabMarket, setTabMarket] = useState<number>(0);
   const [currentBidUnit, setCurrentBidUnit] = useState('');

   const Slider = useRef<HTMLDivElement>(null);

   //    const handlePrevBtnClick = () => {
   //       Slider.current.scrollLeft -= 80;
   //   }
   const handleNextBtnClick = () => {
      if (Slider.current) {
         Slider.current.scrollLeft += 80;
      }
   };

   const [favorites, setFavorites] = useLocalStorage<Market[]>('favorites', []);
   const SaveDataToLocalStorage = data => {
      let a;
      a = JSON.parse(String(localStorage.getItem('session'))) || [];
      a.push(data);
      setFavorites(a);
      localStorage.setItem('session', JSON.stringify(a));
   };

   useEffect(() => {
      if (markets.length === 0) {
         tickers();
      }
   }, []);

   const handleSearchMarket = (e: any) => setSearchMarket(e.target.value);

   const handleRedirectToTrading = (id: string) => {
      const currentMarket: Market | undefined = markets.find(
         market => market.id === id
      );
      if (currentMarket) {
         setCurrentMarket(currentMarket);
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
      currentBidUnitsList = markets.reduce(
         formatFilteredMarkets,
         currentBidUnitsList
      );
   }

   return (
      <div className="w-64 shrink-0 lg:!block lg2:float-left">
         <div className="relative max-h-[957px] overflow-y-scroll rounded bg-neutral8 p-4 dark:bg-shade2">
            <div
               className="absolute top-4.5 right-1.5"
               onClick={handleNextBtnClick}>
               <svg className="h-6 w-6 cursor-pointer fill-neutral4 transition-all duration-300">
                  <use xlinkHref="#icon-arrow-right" />
               </svg>
            </div>
            <div
               className="!-pb-4 flex items-center space-x-2 overflow-x-auto scroll-smooth"
               ref={Slider}
               id="list-pair-market">
               <Nav
                  title="Favorites"
                  theme="grey"
                  onClick={() => setTabMarket(1)}
                  isActive={tabMarket === 1}
               />
               {currentBidUnitsList.map((item, index) => (
                  <Nav
                     key={index}
                     title={
                        item
                           ? item.toUpperCase()
                           : formatMessage({
                                id: 'page.body.marketsTable.filter.all',
                             })
                     }
                     onClick={() => setCurrentBidUnit(item)}
                     isActive={item === currentBidUnit}
                     theme="grey"
                  />
               ))}
               <div
                  onClick={() => setTabMarket(0)}
                  className={`flex cursor-pointer rounded-1xl py-1.5 px-3 font-dm font-bold  leading-custom3 ${
                     tabMarket === 0
                        ? 'bg-neutral6 dark:bg-neutral3'
                        : ' text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-all duration-300`}>
                  Favorites
               </div>
               <div
                  onClick={() => setTabMarket(1)}
                  className={`flex cursor-pointer rounded-1xl py-1.5 px-3 font-dm font-bold leading-custom3 ${
                     tabMarket === 1
                        ? 'bg-neutral6 dark:bg-neutral3'
                        : ' text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-all duration-300`}>
                  IDR
               </div>
               <div
                  onClick={() => setTabMarket(2)}
                  className={`flex cursor-pointer rounded-1xl py-1.5 px-3 font-dm font-bold leading-custom3 ${
                     tabMarket === 2
                        ? 'bg-neutral6 dark:bg-neutral3'
                        : ' text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'
                  } transition-all duration-300`}>
                  USDT
               </div>
            </div>
            <form className="relative my-3">
               <input
                  type="text"
                  onChange={handleSearchMarket}
                  placeholder="Search"
                  className="h-10 w-full appearance-none rounded-lg border-2 border-neutral6 bg-none py-0 pl-3.5 pr-10 text-xs shadow-none outline-none transition-colors duration-200"
               />
               <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center">
                  <SearchIcon className="h-5 w-5 stroke-neutral4 transition-all duration-200" />
               </button>
            </form>
            <div className="table w-full">
               <div className="table-row">
                  <div className="table-cell whitespace-nowrap p-1.5 pb-3 pl-0 text-xs font-semibold leading-relaxed text-neutral4">
                     <div className="relative inline-block cursor-pointer pr-4">
                        {formatMessage({
                           id: 'page.body.trade.header.markets.content.pair',
                        })}
                        <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div>
                     </div>
                  </div>
                  <div className="table-cell whitespace-nowrap p-1.5 pb-3 text-right text-xs font-semibold leading-relaxed text-neutral4">
                     <div className="relative inline-block cursor-pointer pr-4">
                        {formatMessage({
                           id: 'page.body.trade.header.markets.content.price',
                        })}
                        <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div>
                     </div>
                  </div>
                  <div className="table-cell whitespace-nowrap p-1.5 pb-3 pr-0 text-right text-xs font-semibold leading-relaxed text-neutral4">
                     <div className="relative inline-block cursor-pointer pr-4">
                        {formatMessage({
                           id: 'page.body.trade.header.markets.content.change',
                        })}
                        <div className="absolute top-0 -right-2">
                           <IcShorting />
                        </div>
                     </div>
                  </div>
               </div>
               {marketLoading ? (
                  <>
                     <div className="table-row">
                        <div className="table-cell p-1.5 pb-[10px] pl-0">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px] pr-0">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                     </div>
                     <div className="table-row">
                        <div className="table-cell p-1.5 pb-[10px] pl-0">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px] pr-0">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                     </div>
                     <div className="table-row">
                        <div className="table-cell p-1.5 pb-[10px] pl-0">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px]">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                        <div className="table-cell p-1.5 pb-[10px] pr-0">
                           <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6" />
                        </div>
                     </div>
                  </>
               ) : tabMarket === 0 && favorites.length ? (
                  favorites.map(market => (
                     <div
                        key={market.id}
                        onClick={() => handleRedirectToTrading(market.id)}
                        className="table-row cursor-pointer">
                        <div className="table-cell p-1.5 pl-0 align-middle text-xs font-medium leading-custom1">
                           <div className="inline-flex items-center">
                              <button
                                 onClick={e => {
                                    e.stopPropagation();
                                    SaveDataToLocalStorage(market);
                                 }}
                                 type="button"
                                 className="group mr-1 h-4 w-4">
                                 <StarIcon className="h-4 w-4 fill-secondary3 stroke-secondary3 transition-all duration-200" />
                              </button>
                              <div className="whitespace-nowrap">
                                 {market.name.split('/').shift()}
                                 {/* <span className="text-neutral4">/{market.name.split('/').pop()}</span> */}
                              </div>
                           </div>
                        </div>
                        <div className="table-cell p-1.5 text-right font-urw-din-500 text-xs font-medium leading-custom1">
                           {Decimal.format(
                              Number(marketTickers[market?.id]?.last),
                              market?.price_precision,
                              ','
                           ) ?? 0}
                        </div>
                        <div
                           className={`table-cell p-1.5 pr-0 text-right font-urw-din-500 text-xs font-medium leading-custom1 ${
                              (
                                 marketTickers[market?.id] || 0
                              ).price_change_percent?.includes('+', 0)
                                 ? 'text-primary5'
                                 : 'text-primary4'
                           }`}>
                           {
                              (marketTickers[market.id] || 0)
                                 ?.price_change_percent
                           }
                        </div>
                     </div>
                  ))
               ) : markets.length > 0 ? (
                  markets
                     ?.filter(
                        e =>
                           e.name.toUpperCase().split('/').pop() === 'IDR' &&
                           e.name.toUpperCase().split('/').pop()
                     )
                     .filter(e =>
                        Object.keys(e)?.reduce(
                           (acc, curr) =>
                              acc ||
                              e[curr]
                                 ?.toString()
                                 ?.toLowerCase()
                                 ?.match(searchMarket?.toLowerCase())
                                 ?.includes(searchMarket?.toLowerCase()),
                           false
                        )
                     )
                     .map(market => {
                        return (
                           <div
                              key={market.id}
                              onClick={() => handleRedirectToTrading(market.id)}
                              className="table-row cursor-pointer">
                              <div className="table-cell p-1.5 pl-0 align-middle text-xs font-medium leading-custom1">
                                 <div className="inline-flex items-center">
                                    <button
                                       onClick={e => {
                                          e.stopPropagation();
                                          SaveDataToLocalStorage(market);
                                       }}
                                       type="button"
                                       className="group mr-1 h-4 w-4">
                                       <StarIcon className="h-4 w-4 stroke-neutral4 transition-all duration-200 group-hover:stroke-yellow-500" />
                                    </button>
                                    <div className="whitespace-nowrap">
                                       {market.name.split('/').shift()}
                                       {/* <span className="text-neutral4">/{market.name.split('/').pop()}</span> */}
                                    </div>
                                 </div>
                              </div>
                              <div className="table-cell p-1.5 text-right font-urw-din-500 text-xs font-medium leading-custom1">
                                 {Decimal.format(
                                    Number(marketTickers[market?.id]?.last),
                                    market?.price_precision,
                                    ','
                                 ) ?? 0}
                              </div>
                              <div
                                 className={`table-cell p-1.5 pr-0 text-right font-urw-din-500 text-xs font-medium leading-custom1 ${
                                    (
                                       marketTickers[market?.id] || 0
                                    ).price_change_percent?.includes('+', 0)
                                       ? 'text-primary5'
                                       : 'text-primary4'
                                 }`}>
                                 {
                                    (marketTickers[market.id] || 0)
                                       ?.price_change_percent
                                 }
                              </div>
                           </div>
                        );
                     })
               ) : (
                  <div className="">Market Null</div>
               )}
            </div>
         </div>
      </div>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   userData: selectUserInfo(state),
   markets: selectMarkets(state),
   marketLoading: selectMarketsLoading(state),
   marketTickers: selectMarketTickers(state),
   currentMarket: selectCurrentMarket(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   setCurrentMarket: (market: Market) => dispatch(setCurrentMarket(market)),
   depthFetch: (market: Market) => dispatch(depthFetch(market)),
   tickers: () => dispatch(marketsTickersFetch()),
   setCurrentPrice: price => dispatch(setCurrentPrice(price)),
});

export const TradingListMarket = injectIntl(
   connect(mapStateToProps, mapDispatchToProps)(TradingListMarketFC) as any
);
