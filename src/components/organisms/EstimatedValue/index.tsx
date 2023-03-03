import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from 'index';
import { Badge, Decimal, formatWithSeparators } from 'components';
import { estimateValue, estimateValueAvailable, estimateValueLocked } from 'helpers/estimateValue';
import {
   currenciesFetch,
   Currency,
   marketsFetch,
   marketsTickersFetch,
   RootState,
   selectCurrencies,
   selectMarkets,
   selectMarketTickers,
   selectUserLoggedIn,
   Wallet,
   Market,
   Ticker,
   selectSonic,
   Sonic
} from 'modules';
import { peatioPlatformCurrency } from 'api';

interface EstimatedValueProps {
   wallets: Wallet[];
}

interface ReduxProps {
   sonic: Sonic;
   currencies: Currency[];
   markets: Market[];
   tickers: {
      [key: string]: Ticker,
   };
   userLoggedIn: boolean;
}

interface DispatchProps {
   fetchCurrencies: typeof currenciesFetch;
   fetchMarkets: typeof marketsFetch;
   fetchTickers: typeof marketsTickersFetch;
}

type Props = DispatchProps & ReduxProps & EstimatedValueProps & IntlProps;

class EstimatedValueContainer extends React.Component<Props> {
   public componentDidMount() {
      const {
         currencies,
         fetchCurrencies,
         fetchMarkets,
         fetchTickers,
         markets,
         tickers,
      } = this.props;

      if (!markets.length) {
         fetchMarkets();
      }

      if (!tickers.length) {
         fetchTickers();
      }

      if (!currencies.length) {
         fetchCurrencies();
      }
   }

   public componentWillReceiveProps(next: Props) {
      const {
         currencies,
         fetchCurrencies,
         fetchMarkets,
         fetchTickers,
         markets,
         tickers,
      } = this.props;

      if (!markets.length && next.markets.length) {
         fetchMarkets();
      }

      if (!tickers.length && next.tickers.length) {
         fetchTickers();
      }

      if (!currencies.length && next.currencies.length) {
         fetchCurrencies();
      }
   }

   public render(): React.ReactNode {
      const {
         currencies,
         markets,
         tickers,
         wallets,
         sonic,
      } = this.props;
      const estimatedValue = estimateValue(sonic.peatio_platform_currency || peatioPlatformCurrency(), currencies, wallets, markets, tickers);
      const estimatedValueLocked = estimateValueLocked(sonic.peatio_platform_currency || peatioPlatformCurrency(), currencies, wallets, markets, tickers);
      const estimatedValueAvailable = estimateValueAvailable(sonic.peatio_platform_currency || peatioPlatformCurrency(), currencies, wallets, markets, tickers);

      const wallet = wallets.find(e => e.currency === (sonic.peatio_platform_currency?.toLowerCase() || peatioPlatformCurrency()?.toLowerCase()))

      return (
         <div className="flex items-start justify-between">
            <div>
               <div className="mb-1 font-medium">Total balance</div>
               <div className="flex items-center space-x-2">
                  <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                     {Decimal.format(wallet?.balance, Number(wallet?.fixed), ',')}
                  </div>
                  <Badge variant="green" text={sonic.peatio_platform_currency?.toUpperCase() || peatioPlatformCurrency()?.toUpperCase()} />
               </div>
               <div className="text-base text-neutral4">
                  &asymp; {formatWithSeparators(estimatedValue, ',')} {sonic.peatio_platform_currency?.toUpperCase() || peatioPlatformCurrency()?.toUpperCase()}
               </div>
            </div>
            <div>
               <div className="mb-1 font-medium">Locked balance</div>
               <div className="flex items-center space-x-2">
                  <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                     {Decimal.format(wallet?.locked, Number(wallet?.fixed), ',')}
                  </div>
                  <Badge variant="green" text={sonic.peatio_platform_currency?.toUpperCase() || peatioPlatformCurrency()?.toUpperCase()} />
               </div>
               <div className="text-base text-neutral4">
                  &asymp; {formatWithSeparators(estimatedValueLocked, ',')} {sonic.peatio_platform_currency?.toUpperCase() || peatioPlatformCurrency()?.toUpperCase()}
               </div>
            </div>
            <div>
               <div className="mb-1 font-medium">Available balance</div>
               <div className="flex items-center space-x-2">
                  <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                     {Decimal.format(Number(wallet?.balance) + Number(wallet?.locked), Number(wallet?.fixed), ',')}
                  </div>
                  <Badge variant="green" text={sonic.peatio_platform_currency?.toUpperCase() || peatioPlatformCurrency()?.toUpperCase()} />
               </div>
               <div className="text-base text-neutral4">
                  &asymp; {formatWithSeparators(estimatedValueAvailable, ',')} {sonic.peatio_platform_currency?.toUpperCase() || peatioPlatformCurrency()?.toUpperCase()}
               </div>
            </div>
         </div>
      );
   }

   public translate = (key: string) => this.props.intl.formatMessage({ id: key });
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   sonic: selectSonic(state),
   currencies: selectCurrencies(state),
   markets: selectMarkets(state),
   tickers: selectMarketTickers(state),
   userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   fetchCurrencies: () => dispatch(currenciesFetch()),
   fetchMarkets: () => dispatch(marketsFetch()),
   fetchTickers: () => dispatch(marketsTickersFetch()),
});

export const EstimatedValue = injectIntl(connect(mapStateToProps, mapDispatchToProps)(EstimatedValueContainer)) as any;
