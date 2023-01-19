import React, {
   useEffect,
   FunctionComponent,
   useRef,
   memo,
} from 'react';
import {
   Link,
   useParams,
   withRouter,
} from 'react-router-dom';
import { RouterProps } from 'react-router';
import { compose } from 'redux';
import {
   connect,
   MapDispatchToProps,
} from 'react-redux';
import { injectIntl } from 'react-intl';
import {
   Badge,
   Button,
   Decimal,
   PriceChart3,
   TableFinance,
   WalletSidebar
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
   walletsData,
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
   clearWallets: () => void;
}

type Props = ReduxProps & DispatchProps & IntlProps & RouterProps;

const WalletDetailsFC = memo(({
   user,
   wallets,
   currencies,
   fetchWallets,
   clearWallets,
   history: { push },
   intl,
}: Props) => {
   const { id = '' } = useParams<Params>();
   const sliderRef = useRef<HTMLDivElement>(null);
   const { marketsData, handleRedirectToTrading } = useMarket();

   useEffect(() => {
      setDocumentTitle(`${name} wallet details`);
      if (!wallets.length) {
         fetchWallets();
      }
      return () => clearWallets();
   }, []);

   const translate = (id: string) => intl.formatMessage({ id });
   const wallet = wallets.length ? wallets.filter(e => id === e.currency) : [DEFAULT_WALLET];
   const {
      currency,
      balance,
      fixed,
      name,
      networks,
      status,
   } = wallet[0];

   const friendsMarket = arrayFilter(marketsData, currency);

   const handleSlideRight = () => {
      if (sliderRef.current) {
         let scrollAmount = 0;
         const clientWidth = Math.max(scrollAmount += sliderRef.current.clientWidth / 2);
         sliderRef.current.scrollBy({
            top: 0,
            left: clientWidth,
            behavior: 'smooth',
         });
      }
   };

   return (
      <>
         <div className="block lg:flex pt-8 pb-4 px-4 lg:!p-1 bg-neutral7 dark:bg-neutral1">
            <WalletSidebar />
            <div className="grow h-auto lg:h-[calc(100vh-88px)] pl-0 lg:pl-1 overflow-auto">
               <div className={`p-8 ${friendsMarket.length ? 'pb-0' : ''} rounded bg-neutral8 dark:bg-shade2`}>
                  <div className="flex items-center mb-5">
                     <div className="flex items-center mr-auto">
                        <Link
                           className="mr-3 group"
                           to="/wallets"
                           title="Back to Wallets"
                        >
                           <svg className="w-8 h-8 fill-neutral4 group-hover:fill-neutral1 group-hover:-translate-x-3 group-hover:scale-105 transition-transform duration-300">
                              <use xlinkHref="#icon-arrow-left" />
                           </svg>
                        </Link>
                        <div className="mr-auto text-3.5xl font-dm font-bold leading-tight tracking-custom1">
                           {currency?.toUpperCase()}
                           <span className="ml-3 text-neutral5"> {name}</span>
                        </div>
                     </div>
                     <div className="flex items-center space-x-3">
                        <Button
                           text="Deposit"
                           size="normal"
                           onClick={() => push('/wallets/deposit', currencies.find(e => e.id === currency))}
                           disabled={!networks.length || status !== 'enabled'}
                        />
                        <Button
                           text="Withdraw"
                           size="normal"
                           variant="outline"
                           onClick={() => push('/wallets/withdraw', { wallet: wallet[0] })}
                           disabled={!networks.length || status !== 'enabled'}
                        />
                        <Button
                           text="Transfer"
                           size="normal"
                           variant="outline"
                           onClick={() => push('/wallets/transfer', currencies.find(e => e.id === currency))}
                        />
                     </div>
                  </div>
                  <div className="relative">
                     <div className="flex gap-10 justify-between">
                        <div>
                           <div className="mb-1 font-medium">
                              {translate('page.body.history.trade.header.total')} {translate('page.body.history.trade.header.balance')}
                           </div>
                           <div className="flex items-center space-x-2">
                              <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                                 {Decimal.format(balance, currency === 'idr' ? 0 : fixed, ',')}
                              </div>
                              <Badge
                                 variant="green"
                                 text={currency}
                              />
                           </div>
                           <div className="text-base text-neutral4">
                              {Decimal.format((Number(balance) * Number(5353)), 0, ',')}
                           </div>
                        </div>
                        {friendsMarket.length > 0 && (
                           <div ref={sliderRef} className={`relative w-[668px] flex ${friendsMarket.length === 1 ? 'justify-end' : ''} gap-10 lg:gap-20 snap-x snap-mandatory overflow-x-auto pb-8 transition-transform duration-500`}>
                              {friendsMarket.length > 0 && friendsMarket.map(market => {
                                 const klinesData: number[] = market.kline;
                                 let labels: number[], data: number[];
                                 labels = klinesData.map(e => e[0]);
                                 data = klinesData.map(e => e[2]);
                                 const change = market.price_change_percent.includes('+');
                                 return (
                                    <div
                                       key={market.id}
                                       className="snap-end shrink-0 first:pl-3 last:pr-3"
                                       onClick={() => handleRedirectToTrading(market.id)}
                                    >
                                       <div className="rounded-xl hover:shadow-lg dark:hover:bg-neutral2 p-6 cursor-pointer transition-all duration-200">
                                          <div className="flex items-center gap-3">
                                             <div className="text-xs leading-custom4 text-neutral4 font-semibold uppercase">
                                                {market.name}
                                             </div>
                                             <Badge rounded="2xl" variant={change ? 'green' : 'orange'} text={market.price_change_percent} />
                                          </div>
                                          <div className="text-2xl font-semibold tracking-custom1 leading-custom2 mt-1 mb-4 uppercase">
                                             {Decimal.format(market.last.includes(',') ? market?.last?.split(',')?.join('') : market.last, market.price_precision, ',')} {market.base_unit}
                                          </div>
                                          <div className="w-60 h-14">
                                             <PriceChart3
                                                id={market.id}
                                                theme={change ? 'positive' : 'negative'}
                                                labels={labels}
                                                data={data}
                                                maintainAspectRatio={false}
                                                gradientOpacityTop={.5}
                                                gradientOpacityBottom={.07}
                                             />
                                          </div>
                                       </div>
                                    </div>
                                 );
                              })}
                           </div>
                        )}
                     </div>
                     {(friendsMarket.length > 2) && (
                        <div className="absolute top-[36%] right-0">
                           <div
                              onClick={handleSlideRight}
                              className="group flex items-center justify-center bg-shade5 hover:bg-neutral6 dark:bg-neutral2 animate-right hover:animate-none shadow-card rounded-full w-10 h-10 cursor-pointer hover:scale-110 transition-all duration-300"
                           >
                              <svg className="w-6 h-6 fill-neutral4 group-hover:w-7 group-hover:h-7 transition-colors duration-300">
                                 <use xlinkHref="#icon-arrow-right" />
                              </svg>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
               <div className="mt-1 bg-neutral8 dark:bg-shade2 p-8 rounded">
                  <TableFinance
                     title="Finances"
                     hiddenCategory={[0, 4]}
                  />
               </div>
            </div>
         </div>
      </>
   );
});

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   wallets: selectWallets(state),
   currencies: selectCurrencies(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   fetchWallets: () => dispatch(walletsFetch()),
   clearWallets: () => dispatch(walletsData([])),
});

export const WalletDetails = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(WalletDetailsFC) as FunctionComponent;
