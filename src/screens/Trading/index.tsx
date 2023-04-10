import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import {
   TradingHeader,
   TradingOrderBook,
   TradingCenter,
   TradingMarketList,
   Nav,
} from 'components';
import { useReduxSelector, useScrollUp, useTranslate } from 'hooks';
import {
   fetchHistory,
   Market,
   PrivateTrade,
   recentTradesFetch,
   selectCurrentColorTheme,
   selectCurrentMarket,
   selectCurrentPrice,
   selectHistory,
   selectLastRecentTrade,
   selectMarkets,
   selectMarketTickers,
   selectRecentTrades,
   selectUserInfo,
   selectUserLoggedIn,
   setAmount,
   setCurrentMarket,
   setCurrentPrice,
} from 'modules';

const navs = ['Chart', 'Order Books', 'Trades'];
const time_from = String(Math.floor((Date.now() - 1000 * 60 * 60 * 24) / 1000));

export const Trading = withRouter(({ history }) => {
   useScrollUp();
   const dispatch = useDispatch();
   const isLoggedIn = useReduxSelector(selectUserLoggedIn);
   const user = useReduxSelector(selectUserInfo);
   const currentMarket = useReduxSelector(selectCurrentMarket)!;
   const currentPrice = useReduxSelector(selectCurrentPrice)!;
   const markets = useReduxSelector(selectMarkets);
   const marketTickers = useReduxSelector(selectMarketTickers);
   const theme = useReduxSelector(selectCurrentColorTheme);
   const lastRecentTrade = useReduxSelector(selectLastRecentTrade)!;
   const marketTrades = useReduxSelector(selectRecentTrades);
   const myTrades = useReduxSelector(selectHistory) as PrivateTrade[];

   const [tab, setTab] = useState(0);
   const translate = useTranslate();

   const handleSetCurrentMarket = useCallback(
      (id: string) => {
         dispatch(
            setCurrentMarket(
               !id || id === 'undefined'
                  ? markets && markets[0]
                  : markets.find(e => e.id === id)!
            )
         );
      },
      [dispatch, markets]
   );

   const handleSetCurrentPrice = useCallback(
      (price?: number) => {
         dispatch(setCurrentPrice(price));
      },
      [dispatch]
   );

   const handleSetCurrentAmount = useCallback(
      (amount: string) => {
         dispatch(setAmount(amount));
      },
      [dispatch]
   );

   const tradesFetch = useCallback(
      (currentMarket: Market) => {
         dispatch(recentTradesFetch(currentMarket));
      },
      [dispatch]
   );

   const myTradesFetch = useCallback(
      (currentMarket: string) => {
         dispatch(
            fetchHistory({
               core: 'trades',
               page: 0,
               time_from,
               market: currentMarket,
            })
         );
      },
      [dispatch]
   );

   useEffect(() => {
      document.body.classList.remove('bg-neutral8');
      document.body.classList.add('bg-shade4');
      return () => {
         document.body.classList.remove('bg-shade4');
         document.body.classList.add('bg-neutral8');
      };
   }, []);

   useEffect(() => {
      console.log('currentPrice :>> ', currentPrice);
   }, [currentPrice]);

   useEffect(() => {
      if (!currentMarket) {
         const pathname = history.location.pathname.split('/').pop()!;
         handleSetCurrentMarket(pathname);
      }
      if (currentMarket) {
         tradesFetch(currentMarket);
         if (isLoggedIn) {
            myTradesFetch(currentMarket.id);
         }
      }
      return () => {
         handleSetCurrentPrice(undefined);
         handleSetCurrentAmount('');
      };
   }, [
      currentMarket,
      handleSetCurrentAmount,
      handleSetCurrentMarket,
      handleSetCurrentPrice,
      history.location.pathname,
      myTradesFetch,
      isLoggedIn,
      tradesFetch,
   ]);

   return (
      <div className="mx-auto min-h-c-screen-28.5 w-full max-w-hd bg-shade4 p-4 pb-33 dark:bg-neutral1 lg:min-h-c-screen-22.5 lg:p-1">
         <TradingHeader
            currentMarket={currentMarket}
            marketTickers={marketTickers}
            translate={translate}
         />
         <div className="flex md:space-x-2 lg:hidden lg:space-x-0 md-max:justify-between lg-max:my-4">
            {navs.map((e, i) => (
               <Nav
                  key={i}
                  title={e}
                  theme={theme === 'dark' ? 'black' : 'grey'}
                  isActive={tab === i}
                  onClick={() => setTab(i)}
               />
            ))}
         </div>
         <div className="mt-1 block lg2:flex">
            <TradingOrderBook
               currentMarket={currentMarket}
               marketTickers={marketTickers}
               lastRecentTrade={lastRecentTrade}
               setCurrenPrice={handleSetCurrentPrice}
               setCurrentAmount={handleSetCurrentAmount}
               translate={translate}
               display={tab === 1}
            />
            <TradingCenter
               user={user}
               translate={translate}
               marketTrades={marketTrades}
               myTrades={myTrades}
               currentMarket={currentMarket}
               setCurrenPrice={handleSetCurrentPrice}
               display={tab === 0}
            />
            <TradingMarketList
               translate={translate}
               display={tab === 2}
            />
         </div>
      </div>
   );
});
