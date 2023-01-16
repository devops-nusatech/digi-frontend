import React, { FC, FunctionComponent, useState } from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import {
   TradingHeader,
   TradingOrderList,
   TradingCenter,
   TradingTrade,
   TradingMarketList,
   Nav,
} from 'components';
import { Market, RootState, selectCurrentColorTheme, selectCurrentMarket, selectMarkets, selectMarketTickers, selectUserLoggedIn, Ticker } from 'modules';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { RouterProps, withRouter } from 'react-router';
import { IntlProps } from 'index';

type ReduxProps = {
   isLoggedIn: boolean;
   currentMarket?: Market;
   markets: Market[];
   marketTickers: {
      [key: string]: Ticker
   };
   theme: string;
}

interface DispatchProps {

}

type TradingProps = RouterProps & IntlProps & ReduxProps & DispatchProps;

const TradingFC: FC<TradingProps> = ({
   isLoggedIn,
   currentMarket,
   markets,
   marketTickers,
   intl,
   theme,
}) => {
   const [tab, setTab] = useState(0);
   const translate = (id: string) => intl.formatMessage({ id });

   return (
      <div className="bg-shade4 dark:bg-neutral1 min-h-[calc(100vh-114px)] lg:min-h-[calc(100vh-88px)] p-4 pb-33 lg:p-1">
         <TradingHeader
            currentMarket={currentMarket}
            marketTickers={marketTickers}
            translate={translate}
         />
         <div className="flex lg:hidden space-x-0 md:space-x-2 lg:space-x-0 my-4 lg:mb-0 justify-between md:justify-start">
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
         <div className="block lg2:flex mt-1">
            <TradingOrderList />
            <TradingCenter />
            <TradingMarketList translate={translate} />
         </div>
         <TradingTrade isLoggedIn={isLoggedIn} />
      </div>
   );
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   isLoggedIn: selectUserLoggedIn(state),
   currentMarket: selectCurrentMarket(state),
   markets: selectMarkets(state),
   marketTickers: selectMarketTickers(state),
   theme: selectCurrentColorTheme(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({

});

export const Trading = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(TradingFC) as FunctionComponent;
