import React, {
   useState,
   // Fragment,
   FunctionComponent,
   memo,
} from 'react';
import { Link } from 'react-router-dom';
import { RouterProps, withRouter } from 'react-router';
import { connect, MapDispatchToProps } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
// import { Listbox, Transition } from '@headlessui/react'
import { Decimal, WalletSidebar } from 'components';
import {
   alertPush,
   beneficiariesFetch,
   Beneficiary,
   currenciesFetch,
   Currency,
   Market,
   RootState,
   selectBeneficiariesActivateSuccess,
   selectBeneficiariesCreateSuccess,
   selectBeneficiariesDeleteSuccess,
   selectCurrencies,
   selectHistory,
   selectMarkets,
   selectMarketsLoading,
   selectMarketTickers,
   selectUserInfo,
   selectUserLoggedIn,
   selectWallets,
   selectWalletsLoading,
   selectWithdrawSuccess,
   Ticker,
   User,
   Wallet,
   WalletHistoryList,
   walletsAddressFetch,
   walletsData,
   walletsFetch,
   walletsWithdrawCcyFetch,
} from 'modules';
import { IntlProps } from 'index';
import { useMarketsFetch } from 'hooks';
import { SearchIcon } from '@heroicons/react/outline';
import { ICChevronRight, IllusChart } from 'assets';

// const defaultBeneficiary: Beneficiary = {
//    id: 0,
//    currency: '',
//    name: '',
//    state: '',
//    data: {
//       address: ''
//    }
// }

// const defaultWallet: Wallet = {
//    name: '',
//    currency: '',
//    balance: '',
//    type: 'coin',
//    fixed: 0,
//    fee: 0
// }

interface State {
   activeIndex: number;
   currentTabIndex: number;
   otpCode: string;
   beneficiary: Beneficiary;
   selectWalletIndex: number;
   withdrawSubmitModal: boolean;
   withdrawConfirmModal: boolean;
   bchAddress?: string;
   filteredWallets?: Wallet[] | null;
   tab: string;
   withdrawDone: boolean;
   amount: string;
   total: string;
}

interface ReduxProps {
   user: User;
   wallets: Wallet[];
   withdrawSuccess: boolean;
   walletsLoading?: boolean;
   historyList: WalletHistoryList;
   beneficiariesActivateSuccess: boolean;
   beneficiariesDeleteSuccess: boolean;
   beneficiariesAddSuccess: boolean;
   currencies: Currency[];
   markets: Market[] | [];
   marketLoading?: boolean;
   marketTickers: {
      [key: string]: Ticker;
   };
   isLoggedIn: boolean;
}

interface DispatchProps {
   fetchBeneficiaries: typeof beneficiariesFetch;
   fetchAddress: typeof walletsAddressFetch;
   fetchWallets: typeof walletsFetch;
   walletsWithdrawCcy: typeof walletsWithdrawCcyFetch;
   fetchSuccess: typeof alertPush;
   currenciesFetch: typeof currenciesFetch;
   clearWallets: () => void;
}

interface OwnProps {
   walletsError: {
      message: string;
   };
}

type Props = RouterProps & ReduxProps & DispatchProps & OwnProps & IntlProps;

const WalletMarginFC = memo((props: Props, state: State) => {
   useMarketsFetch();
   const { wallets, markets, walletsLoading } = props;
   console.log('props :>> ', props);
   const combainById = (a1, a2) =>
      a1.map((market, i) => ({
         ...a2.find(wallet => wallet?.currency === market.base_unit),
         amount_precision: market.amount_precision,
         price_precision: market.price_precision,
      }));
   const combineWallets =
      combainById(markets, wallets.length > 0 ? wallets : []) || [];
   console.log('combineWallets :>> ', combineWallets);

   console.log('wallets', wallets);

   const [q, setQ] = useState<string>('');

   return (
      <div className="block bg-neutral7 px-4 pb-4 pt-8 dark:bg-neutral1 lg:flex lg:!p-1">
         <WalletSidebar />
         <div className="h-auto grow overflow-auto pl-0 lg:h-[calc(100vh-88px)] lg:pl-1">
            <div className="rounded bg-neutral8 p-8 dark:bg-shade2">
               <div className="mb-5 font-dm text-3.5xl leading-tight tracking-custom1">
                  Margin
               </div>
               <div className="flex items-start justify-between">
                  <div>
                     <div className="mb-1 font-medium text-neutral3">
                        Total balance
                     </div>
                     <div className="flex items-center space-x-2">
                        <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                           0.27894652
                        </div>
                        <div className="inline-block rounded bg-primary5 px-2 py-1.5 text-xs font-bold uppercase text-neutral8">
                           BTC
                        </div>
                     </div>
                     <div className="text-base text-neutral4">$10,098.36</div>
                  </div>
                  <div className="flex items-center space-x-6">
                     <IllusChart />
                     <div>
                        <div className="mb-1 font-medium text-neutral3">
                           Margin level
                        </div>
                        <div className="flex items-center space-x-2">
                           <div className="text-2xl font-semibold leading-custom2 tracking-custom1 text-primary5">
                              999.00
                           </div>
                           <div className="inline-block rounded bg-primary5 px-2 py-1.5 text-xs font-bold uppercase text-neutral8">
                              LOW RISK
                           </div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <div className="text-base text-neutral4">
                        Account Equity
                     </div>
                     <div className="flex items-center space-x-2">
                        <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                           0.00000000
                        </div>
                        <div className="inline-block rounded bg-neutral5 px-2 py-1.5 text-xs font-bold uppercase text-neutral8">
                           BTC
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <div>
                  <div className="px-8 pb-2 pt-5 text-xs font-medium leading-relaxed text-neutral4">
                     Funds
                  </div>
                  <div className="overflow-hidden rounded bg-neutral8 dark:bg-shade2">
                     <div className="pt-5">
                        <div className="flex items-center px-8">
                           <div className="relative mr-auto w-64">
                              <input
                                 type="text"
                                 className="h-10 w-full rounded-3xl border-2 border-neutral6 pb-0 pl-3.5 pr-12 pt-0 text-xs outline-none focus:border-neutral4 dark:border-neutral3 dark:bg-transparent dark:focus:border-neutral4"
                                 style={{ transition: 'border-color .2s' }}
                                 placeholder="Search coins"
                                 onChange={e => setQ(e.target.value)}
                              />
                              <button
                                 type="button"
                                 className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center bg-none">
                                 <SearchIcon className="h-5 w-5 stroke-neutral4 transition-all duration-300" />
                              </button>
                           </div>
                           <Link
                              to="/wallet-margin"
                              className="flex items-center text-xs font-medium leading-custom1 text-neutral4 transition-colors duration-300 hover:text-neutral2">
                              Borrowing history
                              <ICChevronRight className="ml-1 h-6 w-6 fill-neutral4 transition-colors duration-200" />
                           </Link>
                        </div>
                        <div className="table w-full">
                           <div
                              className="table-row"
                              style={{ transition: 'background .2s' }}>
                              <div className="table-cell border-b border-neutral7 p-4 !pl-8 !pt-5 text-xs font-semibold leading-custom1 text-neutral3 dark:border-neutral3 dark:text-neutral8">
                                 Asset
                              </div>
                              <div className="table-cell border-b border-neutral7 p-4 !pt-5 text-xs font-semibold leading-custom1 text-neutral3 dark:border-neutral3 dark:text-neutral8">
                                 Earn
                              </div>
                              <div className="table-cell border-b border-neutral7 p-4 !pt-5 text-right text-xs font-semibold leading-custom1 text-neutral3 dark:border-neutral3 dark:text-neutral8">
                                 On orders
                              </div>
                              <div className="table-cell border-b border-neutral7 p-4 !pt-5 text-right text-xs font-semibold leading-custom1 text-neutral3 dark:border-neutral3 dark:text-neutral8">
                                 Available balance
                              </div>
                              <div className="table-cell border-b border-neutral7 p-4 !pr-8 !pt-5 text-right text-xs font-semibold leading-custom1 text-neutral3 dark:border-neutral3 dark:text-neutral8">
                                 Total balance
                              </div>
                           </div>
                           {wallets.length > 0 || walletsLoading ? (
                              wallets
                                 .filter(e =>
                                    Object.keys(e).reduce(
                                       (acc, curr) =>
                                          acc ||
                                          e[curr]
                                             ?.toString()
                                             ?.toLowerCase()
                                             ?.includes(q.toLowerCase()),
                                       false
                                    )
                                 )
                                 .map(wallet => (
                                    <Link
                                       to="/"
                                       className="table-row hover:bg-neutral7 dark:hover:bg-neutral3"
                                       style={{ transition: 'background .2s' }}>
                                       <div
                                          className={`table-cell p-4 !pl-8 align-middle ${
                                             wallet[
                                                Object.keys(wallet)[
                                                   Object.keys(wallet).length -
                                                      1
                                                ]
                                             ]
                                                ? 'border-none'
                                                : 'border-b border-neutral6 dark:border-neutral3'
                                          }`}>
                                          <div className="flex">
                                             <div className="mr-5 w-8 shrink-0">
                                                <img
                                                   className="w-full"
                                                   style={{
                                                      clipPath:
                                                         'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                                                   }}
                                                   src={wallet?.iconUrl}
                                                   alt={wallet?.name}
                                                />
                                             </div>
                                             <div>
                                                <div className="font-medium uppercase">
                                                   {wallet?.currency}
                                                </div>
                                                <div className="text-neutral4">
                                                   {wallet?.name}
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="table-cell border-b border-neutral6 p-4 dark:border-neutral3">
                                          <div className="inline-block rounded bg-primary5 px-2 pb-1.5 pt-2 text-xs font-bold uppercase text-neutral8">
                                             7.46% APR
                                          </div>
                                       </div>
                                       <div className="table-cell border-b border-neutral6 p-4 text-right dark:border-neutral3">
                                          <div className="font-medium">
                                             {Decimal.format(
                                                wallet?.balance,
                                                0,
                                                ','
                                             )}{' '}
                                             {wallet?.currency?.toUpperCase()}
                                          </div>
                                          <div className="text-neutral4">
                                             $10,098.36
                                          </div>
                                       </div>
                                       <div className="table-cell border-b border-neutral6 p-4 text-right dark:border-neutral3">
                                          <div className="font-medium">
                                             {Decimal.format(
                                                wallet?.balance,
                                                0,
                                                ','
                                             )}{' '}
                                             {wallet?.currency?.toUpperCase()}
                                          </div>
                                          <div className="text-neutral4">
                                             $10,098.36
                                          </div>
                                       </div>
                                       <div className="table-cell border-b border-neutral6 p-4 !pr-8 text-right dark:border-neutral3">
                                          <div className="font-medium">
                                             {Decimal.format(
                                                wallet?.balance,
                                                0,
                                                ','
                                             )}{' '}
                                             {wallet?.currency?.toUpperCase()}
                                          </div>
                                          <div className="text-neutral4">
                                             $10,098.36
                                          </div>
                                       </div>
                                    </Link>
                                 ))
                           ) : (
                              <>
                                 <div className="table-row">
                                    <div className="table-cell p-1.5 pb-[10px] pl-0">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px]">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px]">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px]">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px] pr-0">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                 </div>
                                 <div className="table-row">
                                    <div className="table-cell p-1.5 pb-[10px] pl-0">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px]">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px]">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px]">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px] pr-0">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                 </div>
                                 <div className="table-row">
                                    <div className="table-cell p-1.5 pb-[10px] pl-0">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px]">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px]">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px]">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                    <div className="table-cell p-1.5 pb-[10px] pr-0">
                                       <div className="h-5 w-full animate-pulse rounded-lg bg-neutral6 dark:bg-neutral4" />
                                    </div>
                                 </div>
                              </>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
});

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   wallets: selectWallets(state),
   withdrawSuccess: selectWithdrawSuccess(state),
   walletsLoading: selectWalletsLoading(state),
   historyList: selectHistory(state),
   beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
   beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
   beneficiariesAddSuccess: selectBeneficiariesCreateSuccess(state),
   currencies: selectCurrencies(state),
   isLoggedIn: selectUserLoggedIn(state),
   markets: selectMarkets(state),
   marketLoading: selectMarketsLoading(state),
   marketTickers: selectMarketTickers(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   fetchBeneficiaries: params => dispatch(beneficiariesFetch(params)),
   fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
   fetchWallets: () => dispatch(walletsFetch()),
   walletsWithdrawCcy: params => dispatch(walletsWithdrawCcyFetch(params)),
   fetchSuccess: payload => dispatch(alertPush(payload)),
   currenciesFetch: () => dispatch(currenciesFetch()),
   clearWallets: () => dispatch(walletsData([])),
});

export const WalletMargin = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(WalletMarginFC) as FunctionComponent;
