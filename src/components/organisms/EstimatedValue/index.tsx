import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from 'index';
import { Badge, Decimal, formatWithSeparators } from 'components';
import {
   estimateValue,
   estimateValueAvailable,
   estimateValueLocked,
} from 'helpers/estimateValue';
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
} from 'modules';
import { platformCurrency } from 'api';

interface EstimatedValueProps {
   wallets: Wallet[];
}

interface ReduxProps {
   currencies: Currency[];
   markets: Market[];
   tickers: {
      [key: string]: Ticker;
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
      const { currencies, markets, tickers, wallets } = this.props;
      const estimatedValue = estimateValue(
         platformCurrency(),
         currencies,
         wallets,
         markets,
         tickers
      );
      const estimatedValueLocked = estimateValueLocked(
         platformCurrency(),
         currencies,
         wallets,
         markets,
         tickers
      );
      const estimatedValueAvailable = estimateValueAvailable(
         platformCurrency(),
         currencies,
         wallets,
         markets,
         tickers
      );

      const wallet = wallets.find(
         e => e.currency === platformCurrency()?.toLowerCase()
      );

      return (
         <div className="flex items-start justify-between">
            <div>
               <div className="mb-1 font-medium">Total balance</div>
               <div className="flex items-center space-x-2">
                  <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                     {Decimal.format(
                        wallet?.balance,
                        Number(wallet?.fixed),
                        ','
                     )}
                  </div>
                  <Badge
                     variant="green"
                     text={platformCurrency()?.toUpperCase()}
                  />
               </div>
               <div className="text-base text-neutral4">
                  &asymp; {formatWithSeparators(estimatedValue, ',')}{' '}
                  {platformCurrency()?.toUpperCase()}
               </div>
            </div>
            <div>
               <div className="mb-1 font-medium">Locked balance</div>
               <div className="flex items-center space-x-2">
                  <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                     {Decimal.format(
                        wallet?.locked,
                        Number(wallet?.fixed),
                        ','
                     )}
                  </div>
                  <Badge
                     variant="green"
                     text={platformCurrency()?.toUpperCase()}
                  />
               </div>
               <div className="text-base text-neutral4">
                  &asymp; {formatWithSeparators(estimatedValueLocked, ',')}{' '}
                  {platformCurrency()?.toUpperCase()}
               </div>
            </div>
            <div>
               <div className="mb-1 font-medium">Available balance</div>
               <div className="flex items-center space-x-2">
                  <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                     {Decimal.format(
                        Number(wallet?.balance) + Number(wallet?.locked),
                        Number(wallet?.fixed),
                        ','
                     )}
                  </div>
                  <Badge
                     variant="green"
                     text={platformCurrency()?.toUpperCase()}
                  />
               </div>
               <div className="text-base text-neutral4">
                  &asymp; {formatWithSeparators(estimatedValueAvailable, ',')}{' '}
                  {platformCurrency()?.toUpperCase()}
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   currencies: selectCurrencies(state),
   markets: selectMarkets(state),
   tickers: selectMarketTickers(state),
   userLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   fetchCurrencies: () => dispatch(currenciesFetch()),
   fetchMarkets: () => dispatch(marketsFetch()),
   fetchTickers: () => dispatch(marketsTickersFetch()),
});

export const EstimatedValue = injectIntl(
   connect(mapStateToProps, mapDispatchToProps)(EstimatedValueContainer)
) as any;
