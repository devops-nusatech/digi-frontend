import React, { useEffect, FunctionComponent, useRef, memo } from 'react';
import { Link, useParams, withRouter } from 'react-router-dom';
import { RouterProps } from 'react-router';
import { compose } from 'redux';
import { connect, MapDispatchToProps } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
   Badge,
   Button,
   Decimal,
   PriceChart3,
   TableFinance,
   WalletSidebar,
} from 'components';
import {
   Currency,
   RootState,
   selectCurrencies,
   Wallet,
   walletsFetch,
   selectWallets,
   User,
   selectUserInfo,
} from 'modules';
import { arrayFilter, setDocumentTitle } from 'helpers';
import { IntlProps } from 'index';
import { Params } from './types';
import { DEFAULT_WALLET } from '../../constants';
import { useMarket } from 'hooks';

interface ReduxProps {
   user: User;
   wallets: Wallet[];
   currencies: Currency[];
}

interface DispatchProps {
   fetchWallets: typeof walletsFetch;
}

type OwnProps = {
   location: {
      state: {
         estimateValue: string;
      };
   };
};

type Props = ReduxProps & DispatchProps & IntlProps & RouterProps & OwnProps;

const WalletDetailsFC = memo(
   ({
      user,
      wallets,
      currencies,
      fetchWallets,
      history: { push },
      intl,
      location,
   }: Props) => {
      const { id = '' } = useParams<Params>();
      const sliderRef = useRef<HTMLDivElement>(null);
      const { markets, handleRedirectToTrading } = useMarket();

      useEffect(() => {
         setDocumentTitle(`${name} wallet details`);
         if (!wallets.length) {
            fetchWallets();
         }
      }, []);

      const translate = (id: string) => intl.formatMessage({ id });
      const wallet = wallets.length
         ? wallets.filter(e => id === e.currency)
         : [DEFAULT_WALLET];
      const { currency, balance, fixed, name, networks, status } = wallet[0];

      const friendsMarket = arrayFilter(markets, currency);

      const handleSlideRight = () => {
         if (sliderRef.current) {
            let scrollAmount = 0;
            const clientWidth = Math.max(
               (scrollAmount += sliderRef.current.clientWidth / 2)
            );
            sliderRef.current.scrollBy({
               top: 0,
               left: clientWidth,
               behavior: 'smooth',
            });
         }
      };

      return (
         <>
            <div className="block bg-neutral7 px-4 pt-8 pb-4 dark:bg-neutral1 lg:flex lg:!p-1">
               <WalletSidebar />
               <div className="h-auto grow overflow-auto pl-0 lg:h-[calc(100vh-88px)] lg:pl-1">
                  <div
                     className={`p-8 ${
                        friendsMarket.length ? 'pb-0' : ''
                     } rounded bg-neutral8 dark:bg-shade2`}>
                     <div className="mb-5 flex items-center">
                        <div className="mr-auto flex items-center">
                           <Link
                              className="group mr-3"
                              to="/wallets"
                              title="Back to Wallets">
                              <svg className="h-8 w-8 fill-neutral4 transition-transform duration-300 group-hover:-translate-x-3 group-hover:scale-105 group-hover:fill-neutral1 dark:group-hover:fill-neutral8">
                                 <use xlinkHref="#icon-arrow-left" />
                              </svg>
                           </Link>
                           <div className="mr-auto font-dm text-3.5xl font-bold leading-tight tracking-custom1">
                              {currency?.toUpperCase()}
                              <span className="ml-3 text-neutral5">
                                 {' '}
                                 {name}
                              </span>
                           </div>
                        </div>
                        <div className="flex items-center space-x-3">
                           <Button
                              text="Deposit"
                              size="normal"
                              onClick={() =>
                                 push('/wallets/deposit', { currency })
                              }
                              disabled={
                                 !networks.length ||
                                 status !== 'enabled' ||
                                 currency === 'idr'
                              }
                           />
                           <Button
                              text="Withdraw"
                              size="normal"
                              variant="outline"
                              onClick={() =>
                                 push('/wallets/withdraw', {
                                    wallet: wallet[0],
                                 })
                              }
                              disabled={
                                 !networks.length ||
                                 status !== 'enabled' ||
                                 currency === 'idr'
                              }
                           />
                           <Button
                              text="Transfer"
                              size="normal"
                              variant="outline"
                              onClick={() =>
                                 push(
                                    '/wallets/transfer',
                                    currencies.find(e => e.id === currency)
                                 )
                              }
                           />
                        </div>
                     </div>
                     <div className="relative">
                        <div className="flex justify-between gap-10">
                           <div>
                              <div className="mb-1 font-medium">
                                 {translate(
                                    'page.body.history.trade.header.total'
                                 )}{' '}
                                 {translate(
                                    'page.body.history.trade.header.balance'
                                 )}
                              </div>
                              <div className="flex items-center space-x-2">
                                 <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                                    {Decimal.format(
                                       balance,
                                       currency === 'idr' ? 0 : fixed,
                                       ','
                                    )}
                                 </div>
                                 <Badge
                                    variant="green"
                                    text={currency}
                                 />
                              </div>
                              <div className="text-base text-neutral4">
                                 &asymp;{' '}
                                 {location.state
                                    ? location.state?.estimateValue
                                    : `${Decimal.format(
                                         Number(balance) * Number(0),
                                         0,
                                         ','
                                      )} USDT`}
                              </div>
                           </div>
                           {friendsMarket.length > 0 && (
                              <div
                                 ref={sliderRef}
                                 className={`relative flex w-[668px] ${
                                    friendsMarket.length === 1
                                       ? 'justify-end'
                                       : ''
                                 } snap-x snap-mandatory gap-10 overflow-x-auto pb-8 transition-transform duration-500 lg:gap-20`}>
                                 {friendsMarket.length > 0 &&
                                    friendsMarket.map(market => {
                                       const klinesData: number[] =
                                          market.kline;
                                       let labels: number[], data: number[];
                                       labels = klinesData.map(e => e[0]);
                                       data = klinesData.map(e => e[2]);
                                       const change =
                                          market.price_change_percent.includes(
                                             '+'
                                          );
                                       return (
                                          <div
                                             key={market.id}
                                             className="shrink-0 snap-end first:pl-3 last:pr-3"
                                             onClick={() =>
                                                handleRedirectToTrading(
                                                   market.id
                                                )
                                             }>
                                             <div className="cursor-pointer rounded-xl p-6 transition-all duration-200 hover:shadow-lg dark:hover:bg-neutral2">
                                                <div className="flex items-center gap-3">
                                                   <div className="text-xs font-semibold uppercase leading-custom4 text-neutral4">
                                                      {market.name}
                                                   </div>
                                                   <Badge
                                                      rounded="2xl"
                                                      variant={
                                                         change
                                                            ? 'green'
                                                            : 'orange'
                                                      }
                                                      text={
                                                         market.price_change_percent
                                                      }
                                                   />
                                                </div>
                                                <div className="mt-1 mb-4 text-2xl font-semibold uppercase leading-custom2 tracking-custom1">
                                                   {Decimal.format(
                                                      market.last.includes(',')
                                                         ? market?.last
                                                              ?.split(',')
                                                              ?.join('')
                                                         : market.last,
                                                      market.price_precision,
                                                      ','
                                                   )}{' '}
                                                   {market.base_unit}
                                                </div>
                                                <div className="h-14 w-60">
                                                   <PriceChart3
                                                      id={market.id}
                                                      theme={
                                                         change
                                                            ? 'positive'
                                                            : 'negative'
                                                      }
                                                      labels={labels}
                                                      data={data}
                                                      maintainAspectRatio={
                                                         false
                                                      }
                                                      gradientOpacityTop={0.5}
                                                      gradientOpacityBottom={
                                                         0.07
                                                      }
                                                   />
                                                </div>
                                             </div>
                                          </div>
                                       );
                                    })}
                              </div>
                           )}
                        </div>
                        {friendsMarket.length > 2 && (
                           <div className="absolute top-[36%] right-0">
                              <div
                                 onClick={handleSlideRight}
                                 className="group flex h-10 w-10 animate-right cursor-pointer items-center justify-center rounded-full bg-shade5 shadow-card transition-all duration-300 hover:scale-110 hover:animate-none hover:bg-neutral6 dark:bg-neutral2">
                                 <svg className="h-6 w-6 fill-neutral4 transition-colors duration-300 group-hover:h-7 group-hover:w-7">
                                    <use xlinkHref="#icon-arrow-right" />
                                 </svg>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
                  <div className="mt-1 rounded bg-neutral8 p-8 dark:bg-shade2">
                     <TableFinance
                        title="Finances"
                        hiddenCategory={[0, 4]}
                        currencyId={currency}
                        withAdvancadFilter={false}
                     />
                  </div>
               </div>
            </div>
         </>
      );
   }
);

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   wallets: selectWallets(state),
   currencies: selectCurrencies(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   fetchWallets: () => dispatch(walletsFetch()),
});

export const WalletDetails = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(WalletDetailsFC) as FunctionComponent;
