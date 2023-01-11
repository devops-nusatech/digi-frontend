import React, {
   useState,
   FunctionComponent,
   memo,
} from 'react';
import { Link } from 'react-router-dom';
import { RouterProps, withRouter } from 'react-router';
import { connect, MapDispatchToProps } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
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
   User, Wallet,
   WalletHistoryList,
   walletsAddressFetch,
   walletsData,
   walletsFetch,
   walletsWithdrawCcyFetch
} from 'modules';
import { IntlProps } from 'index';
import { useMarketsFetch } from 'hooks';
import { SearchIcon } from '@heroicons/react/outline';
import { ICChevronRight } from 'assets';
import { arrayFilter } from 'helpers';

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
   }
}

type Props = RouterProps & ReduxProps & DispatchProps & OwnProps & IntlProps;

const WalletFIatAndSpotFC = memo((props: Props, state: State) => {
   useMarketsFetch();
   const { wallets, markets, walletsLoading } = props;
   console.log('props :>> ', props);
   const combainById = (a1, a2) =>
      a1.map((market, i) => ({
         ...a2.find(wallet => wallet?.currency === market.base_unit),
         amount_precision: market.amount_precision,
         price_precision: market.price_precision,
      }));
   const combineWallets = combainById(markets, wallets.length > 0 ? wallets : []) || [];
   console.log('combineWallets :>> ', combineWallets);

   console.log('wallets', wallets);

   const [q, setQ] = useState<string>('');
   let formatedWallets = wallets || [];
   if (q) {
      formatedWallets = formatedWallets.length ? arrayFilter(formatedWallets, q) : [];
   }

   return (
      <div className="block lg:flex pt-8 pb-4 px-4 lg:!p-1 bg-neutral7 dark:bg-neutral1">
         <WalletSidebar />
         <div className="grow h-auto lg:h-[calc(100vh-88px)] pl-0 lg:pl-1 overflow-auto">
            <div className="p-8 rounded bg-neutral8 dark:bg-shade2">
               <div className="mb-5 text-3.5xl font-dm font-bold leading-tight tracking-custom1">
                  Fiat and Spot
               </div>
               <div className="flex items-start justify-between">
                  <div>
                     <div className="mb-1 text-neutral3 font-medium">
                        Fiat and Spot balance
                     </div>
                     <div className="flex items-center space-x-2">
                        <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                           0.27894652
                        </div>
                        <div className="inline-block px-2 py-1.5 rounded text-xs font-bold uppercase text-neutral8 bg-primary5">
                           BTC
                        </div>
                     </div>
                     <div className="text-base text-neutral4">
                        $10,098.36
                     </div>
                  </div>
                  <div>
                     <div className="mb-1 text-neutral3 font-medium">
                        Spot balance
                     </div>
                     <div className="flex items-center space-x-2">
                        <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                           0.13894652
                        </div>
                        <div className="inline-block px-2 py-1.5 rounded text-xs font-bold uppercase text-neutral8 bg-primary5">
                           BTC
                        </div>
                     </div>
                     <div className="text-base text-neutral4">
                        $10,098.36
                     </div>
                  </div>
                  <div>
                     <div className="mb-1 text-neutral3 font-medium">
                        Fiat balance
                     </div>
                     <div className="flex items-center space-x-2">
                        <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                           0.18564652
                        </div>
                        <div className="inline-block px-2 py-1.5 rounded text-xs font-bold uppercase text-neutral8 bg-primary5">
                           BTC
                        </div>
                     </div>
                     <div className="text-base text-neutral4">
                        $10,098.36
                     </div>
                  </div>
                  <div>
                     <div className="mb-1 text-neutral3 font-medium">
                        Yesterday's PNL
                     </div>
                     <div className="flex items-center space-x-2">
                        <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                           0.00000000
                        </div>
                        <div className="inline-block px-2 py-1.5 rounded text-xs font-bold uppercase text-neutral8 bg-primary5">
                           BTC
                        </div>
                     </div>
                     <div className="text-base text-neutral4">
                        $10,098.36
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <div>
                  <div className="pt-5 pb-2 px-8 text-xs text-neutral4 font-medium leading-relaxed">Funds</div>
                  <div className="bg-neutral8 dark:bg-shade2 rounded overflow-hidden">
                     <div className="pt-5">
                        <div className="flex items-center px-8">
                           <div className="relative w-64 mr-auto">
                              <input
                                 type="text"
                                 className="h-10 text-xs w-full pt-0 pr-12 pb-0 pl-3.5 rounded-3xl border-2 border-neutral6 outline-none focus:border-neutral4 dark:border-neutral3 dark:bg-transparent dark:focus:border-neutral4"
                                 style={{ transition: 'border-color .2s' }}
                                 placeholder="Search coins"
                                 onChange={e => setQ(e.target.value)}
                              />
                              <button
                                 type="button"
                                 className="absolute top-0 right-0 h-10 w-10 bg-none flex items-center justify-center"
                              >
                                 <SearchIcon className="w-5 h-5 stroke-neutral4 transition-all duration-300" />
                              </button>
                           </div>
                           <Link to="/wallet-margin" className="flex items-center text-xs font-medium leading-custom1 text-neutral4 hover:text-neutral2 transition-colors duration-300">
                              Borrowing history
                              <ICChevronRight className="w-6 h-6 ml-1 fill-neutral4 transition-colors duration-200" />
                           </Link>
                        </div>
                        <div className="table w-full">
                           <div className="table-row" style={{ transition: 'background .2s' }}>
                              <div className="table-cell p-4 !pl-8 !pt-5 border-b border-neutral7 dark:border-neutral3 text-xs leading-custom1 font-semibold text-neutral3 dark:text-neutral8">
                                 Asset
                              </div>
                              <div className="table-cell p-4 !pt-5 border-b border-neutral7 dark:border-neutral3 text-xs leading-custom1 font-semibold text-neutral3 dark:text-neutral8">
                                 Earn
                              </div>
                              <div className="table-cell p-4 !pt-5 border-b border-neutral7 dark:border-neutral3 text-xs leading-custom1 font-semibold text-neutral3 dark:text-neutral8 text-right">
                                 On orders
                              </div>
                              <div className="table-cell p-4 !pt-5 border-b border-neutral7 dark:border-neutral3 text-xs leading-custom1 font-semibold text-neutral3 dark:text-neutral8 text-right">
                                 Available balance
                              </div>
                              <div className="table-cell p-4 !pr-8 !pt-5 border-b border-neutral7 dark:border-neutral3 text-xs leading-custom1 font-semibold text-neutral3 dark:text-neutral8 text-right">
                                 Total balance
                              </div>
                           </div>
                           {
                              (formatedWallets.length > 0 || walletsLoading)
                                 ? formatedWallets.map(wallet => (
                                    <Link to="/" className="table-row hover:bg-neutral7 dark:hover:bg-neutral3" style={{ transition: 'background .2s' }}>
                                       <div className={`table-cell p-4 !pl-8 align-middle ${wallet[Object.keys(wallet)[Object.keys(wallet).length - 1]] ? 'border-none' : 'border-b border-neutral6 dark:border-neutral3'}`}>
                                          <div className="flex">
                                             <div className="shrink-0 w-8 mr-5">
                                                <img className="w-full" style={{
                                                   clipPath: 'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                                                }} src={wallet?.iconUrl} alt={wallet?.name} />
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
                                       <div className="table-cell border-b border-neutral6 dark:border-neutral3 p-4">
                                          <div className="inline-block pt-2 pb-1.5 px-2 rounded text-xs font-bold uppercase text-neutral8 bg-primary5">7.46% APR</div>
                                       </div>
                                       <div className="table-cell border-b border-neutral6 dark:border-neutral3 p-4 text-right">
                                          <div className="font-medium">
                                             {Decimal.format(wallet?.balance, 0, ',')} {wallet?.currency?.toUpperCase()}
                                          </div>
                                          <div className="text-neutral4">$10,098.36</div>
                                       </div>
                                       <div className="table-cell border-b border-neutral6 dark:border-neutral3 p-4 text-right">
                                          <div className="font-medium">
                                             {Decimal.format(wallet?.balance, 0, ',')} {wallet?.currency?.toUpperCase()}
                                          </div>
                                          <div className="text-neutral4">$10,098.36</div>
                                       </div>
                                       <div className="table-cell border-b border-neutral6 dark:border-neutral3 p-4 !pr-8 text-right">
                                          <div className="font-medium">
                                             {Decimal.format(wallet?.balance, 0, ',')} {wallet?.currency?.toUpperCase()}
                                          </div>
                                          <div className="text-neutral4">$10,098.36</div>
                                       </div>
                                    </Link>
                                 )) : (
                                    <>
                                       <div className="table-row">
                                          <div className="table-cell pb-[10px] p-1.5 pl-0">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5 pr-0">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                       </div>
                                       <div className="table-row">
                                          <div className="table-cell pb-[10px] p-1.5 pl-0">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5 pr-0">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                       </div>
                                       <div className="table-row">
                                          <div className="table-cell pb-[10px] p-1.5 pl-0">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                          <div className="table-cell pb-[10px] p-1.5 pr-0">
                                             <div className="h-5 w-full rounded-lg bg-neutral6 dark:bg-neutral4 animate-pulse" />
                                          </div>
                                       </div>
                                    </>
                                 )
                           }
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
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
   clearWallets: () => dispatch(walletsData([]))
});

export const WalletFIatAndSpot = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(WalletFIatAndSpotFC) as FunctionComponent;
