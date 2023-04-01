import React, { FC, FunctionComponent, useEffect, useState } from 'react';
import {
   connect,
   MapDispatchToPropsFunction,
   MapStateToProps,
} from 'react-redux';
import {
   TradingHeader,
   TradingOrderList,
   TradingCenter,
   TradingMarketList,
   Nav,
} from 'components';
import {
   GroupMember,
   Market,
   RootState,
   selectCurrentColorTheme,
   selectCurrentMarket,
   selectGroupMember,
   selectMarkets,
   selectMarketTickers,
   selectUserInfo,
   selectUserLoggedIn,
   setCurrentMarket,
   Ticker,
   User,
} from 'modules';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { RouterProps, withRouter } from 'react-router';
import { IntlProps } from 'index';

type ReduxProps = {
   isLoggedIn: boolean;
   currentMarket?: Market;
   markets: Market[];
   marketTickers: {
      [key: string]: Ticker;
   };
   theme: string;
   user: User;
   groupMember: GroupMember;
};

interface DispatchProps {
   setCurrentMarket: typeof setCurrentMarket;
}

interface OwnProps {
   location: {
      state: {
         pathname: string;
      };
   };
}

type TradingProps = RouterProps &
   IntlProps &
   ReduxProps &
   DispatchProps &
   OwnProps;

const TradingFC: FC<TradingProps> = ({
   isLoggedIn,
   currentMarket,
   setCurrentMarket,
   markets,
   marketTickers,
   intl,
   theme,
   location,
   user,
   groupMember,
}) => {
   const [tab, setTab] = useState(0);
   const translate = (id: string) => intl.formatMessage({ id });

   useEffect(() => {
      document.body.classList.remove('bg-neutral8');
      document.body.classList.add('bg-shade4');
      return () => {
         document.body.classList.remove('bg-shade4');
         document.body.classList.add('bg-neutral8');
      };
   }, []);

   useEffect(() => {
      if (!currentMarket) {
         setCurrentMarket(
            location.state && location.state?.pathname
               ? markets.find(
                    e => e.id === location.state?.pathname.split('/').pop()
                 )!
               : markets[0]
         );
      }
   }, [
      currentMarket,
      location.state,
      location.state?.pathname,
      markets,
      setCurrentMarket,
   ]);

   return (
      <div className="mx-auto min-h-c-screen-28.5 w-full max-w-hd bg-shade4 p-4 pb-33 dark:bg-neutral1 lg:min-h-c-screen-22.5 lg:p-1">
         <TradingHeader
            currentMarket={currentMarket}
            marketTickers={marketTickers}
            translate={translate}
         />
         <div className="my-4 flex justify-between space-x-0 md:justify-start md:space-x-2 lg:mb-0 lg:hidden lg:space-x-0">
            <Nav
               title="Chart"
               theme={theme === 'dark' ? 'black' : 'grey'}
               isActive={tab === 0}
               onClick={() => setTab(0)}
            />
            <Nav
               title="Order Books"
               theme={theme === 'dark' ? 'black' : 'grey'}
               isActive={tab === 1}
               onClick={() => setTab(1)}
            />
            <Nav
               title="Trades"
               theme={theme === 'dark' ? 'black' : 'grey'}
               isActive={tab === 2}
               onClick={() => setTab(2)}
            />
         </div>
         <div className="mt-1 block lg2:flex">
            <TradingOrderList />
            <TradingCenter
               groupMember={groupMember}
               user={user}
            />
            <TradingMarketList translate={translate} />
         </div>
      </div>
   );
};

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   isLoggedIn: selectUserLoggedIn(state),
   currentMarket: selectCurrentMarket(state),
   markets: selectMarkets(state),
   marketTickers: selectMarketTickers(state),
   theme: selectCurrentColorTheme(state),
   user: selectUserInfo(state),
   groupMember: selectGroupMember(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   setCurrentMarket: payload => dispatch(setCurrentMarket(payload)),
});

export const Trading = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(TradingFC) as FunctionComponent;

// import React, { useCallback, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//    TradingHeader,
//    TradingOrderList,
//    TradingCenter,
//    TradingMarketList,
//    Nav,
// } from 'components';
// import {
//    fetchHistory,
//    recentTradesFetch,
//    selectCurrentColorTheme,
//    selectCurrentMarket,
//    // selectGroupMember,
//    selectMarkets,
//    selectMarketTickers,
//    selectUserInfo,
//    selectUserLoggedIn,
//    setAmount,
//    setCurrentMarket,
//    setCurrentPrice,
// } from 'modules';
// import { injectIntl, useIntl } from 'react-intl';
// import { withRouter } from 'react-router';
// import { useReduxSelector, useScrollUp } from 'hooks';
// import { compose } from 'redux';

// const time_from = String(Math.floor((Date.now() - 1000 * 60 * 60 * 24) / 1000));
// export const Trading = compose(
//    injectIntl(
//       withRouter(({ history }) => {
//          useScrollUp();
//          const { formatMessage } = useIntl();
//          const dispatch = useDispatch();

//          const isLogin = useReduxSelector(selectUserLoggedIn);
//          const currentMarket = useReduxSelector(selectCurrentMarket)!;
//          // const currentPrice = useReduxSelector(selectCurrentPrice)!;
//          const markets = useReduxSelector(selectMarkets);
//          const marketTickers = useReduxSelector(selectMarketTickers);
//          const theme = useReduxSelector(selectCurrentColorTheme);
//          // const lastRecentTrade = useReduxSelector(selectLastRecentTrade)!;
//          // const marketTrades = useReduxSelector(selectRecentTrades);
//          // const myTrades = useReduxSelector(selectHistory) as PrivateTrade[];
//          const user = useReduxSelector(selectUserInfo);
//          // const groupMember = useReduxSelector(selectGroupMember);

//          const [tab, setTab] = useState(0);

//          const translate = useCallback(
//             (id: string) => formatMessage({ id }),
//             [formatMessage]
//          );
//          const handleSetCurrentMarket = useCallback(
//             (id: string) => {
//                dispatch(
//                   setCurrentMarket(
//                      !id ? markets[0] : markets.find(e => e.id === id)!
//                   )
//                );
//             },
//             [dispatch, markets]
//          );

//          const handleSetCurrentPrice = useCallback(
//             (price?: number) => {
//                dispatch(setCurrentPrice(price));
//             },
//             [dispatch]
//          );

//          const handleSetCurrentAmount = useCallback(
//             (amount: string) => {
//                dispatch(setAmount(amount));
//             },
//             [dispatch]
//          );

//          useEffect(() => {
//             document.body.classList.remove('bg-neutral8');
//             document.body.classList.add('bg-shade4');
//             return () => {
//                document.body.classList.remove('bg-shade4');
//                document.body.classList.add('bg-neutral8');
//             };
//          }, []);

//          useEffect(() => {
//             const pathname = history.location.pathname.split('/').pop()!;
//             if (!currentMarket) {
//                dispatch(handleSetCurrentMarket(pathname));
//             }
//             if (currentMarket) {
//                dispatch(recentTradesFetch(currentMarket));
//                if (isLogin) {
//                   dispatch(
//                      fetchHistory({
//                         core: 'trades',
//                         page: 0,
//                         time_from,
//                         market: currentMarket.id,
//                      })
//                   );
//                }
//             }
//             return () => {
//                handleSetCurrentPrice(undefined);
//                handleSetCurrentAmount('');
//             };
//          }, [
//             currentMarket,
//             dispatch,
//             handleSetCurrentAmount,
//             handleSetCurrentMarket,
//             handleSetCurrentPrice,
//             history.location.pathname,
//             isLogin,
//          ]);

//          return (
//             <div className="mx-auto min-h-c-screen-28.5 w-full max-w-hd bg-shade4 p-4 pb-33 dark:bg-neutral1 lg:min-h-c-screen-22.5 lg:p-1">
//                <TradingHeader
//                   currentMarket={currentMarket}
//                   marketTickers={marketTickers}
//                   translate={translate}
//                />
//                <div className="my-4 flex justify-between space-x-0 md:justify-start md:space-x-2 lg:mb-0 lg:hidden lg:space-x-0">
//                   <Nav
//                      title="Chart"
//                      theme={theme === 'dark' ? 'black' : 'grey'}
//                      isActive={tab === 0}
//                      onClick={() => setTab(0)}
//                   />
//                   <Nav
//                      title="Order Books"
//                      theme={theme === 'dark' ? 'black' : 'grey'}
//                      isActive={tab === 1}
//                      onClick={() => setTab(1)}
//                   />
//                   <Nav
//                      title="Trades"
//                      theme={theme === 'dark' ? 'black' : 'grey'}
//                      isActive={tab === 2}
//                      onClick={() => setTab(2)}
//                   />
//                </div>
//                <div className="mt-1 block lg2:flex">
//                   <TradingOrderList />
//                   <TradingCenter
//                      // groupMember={groupMember}
//                      user={user}
//                   />
//                   <TradingMarketList translate={translate} />
//                </div>
//             </div>
//          );
//       })
//    )
// );
