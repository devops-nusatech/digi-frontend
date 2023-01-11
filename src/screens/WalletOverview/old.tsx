import React, {
   useState,
   FunctionComponent,
   memo,
   useEffect,
   FC,
} from 'react';
import { Link } from 'react-router-dom';
import { RouterProps, withRouter } from 'react-router';
import { connect, MapDispatchToProps } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Badge, Decimal, WalletSidebar, } from 'components';
import {
   alertPush,
   beneficiariesFetch,
   Beneficiary,
   currenciesFetch,
   Currency,
   RootState,
   selectBeneficiariesActivateSuccess,
   selectBeneficiariesCreateSuccess,
   selectBeneficiariesDeleteSuccess,
   selectCurrencies,
   selectHistory,
   selectUserInfo,
   selectUserLoggedIn,
   selectWallets,
   selectWalletsLoading,
   selectWithdrawSuccess,
   User,
   Wallet,
   WalletHistoryList,
   walletsAddressFetch,
   walletsData,
   walletsFetch,
   walletsWithdrawCcyFetch
} from 'modules';
import { IntlProps } from 'index';
import { SearchIcon } from '@heroicons/react/outline';

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
   currencies: Currency[];
   withdrawSuccess: boolean;
   walletsLoading?: boolean;
   historyList: WalletHistoryList;
   beneficiariesActivateSuccess: boolean;
   beneficiariesDeleteSuccess: boolean;
   beneficiariesAddSuccess: boolean;
   isLoggedIn: boolean;
}

interface DispatchProps {
   fetchBeneficiaries: typeof beneficiariesFetch;
   fetchAddress: typeof walletsAddressFetch;
   fetchWallets: typeof walletsFetch;
   fetchCurrencies: typeof currenciesFetch;
   walletsWithdrawCcy: typeof walletsWithdrawCcyFetch;
   fetchSuccess: typeof alertPush;
   clearWallets: () => void;
}

interface OwnProps {
   walletsError: {
      message: string;
   }
}

type Props = RouterProps & ReduxProps & DispatchProps & OwnProps & IntlProps;

const WalletOverviewFC: FC<Props> = memo(({
   user,
   wallets,
   currencies,
   withdrawSuccess,
   walletsLoading,
   historyList,
   beneficiariesActivateSuccess,
   beneficiariesDeleteSuccess,
   beneficiariesAddSuccess,
   isLoggedIn,
   walletsError: { message },
   fetchBeneficiaries,
   fetchAddress,
   fetchWallets,
   fetchCurrencies,
   walletsWithdrawCcy,
   fetchSuccess,
   clearWallets,
   history,
   intl,
}, state: State) => {
   const [q, setQ] = useState<string>('');
   useEffect(() => {
      if (!wallets.length && !currencies.length) {
         fetchWallets();
         fetchCurrencies();
      }
   }, [wallets, currencies]);

   return (
      <div className="block lg:flex pt-8 pb-4 px-4 lg:!p-1 bg-neutral7 dark:bg-neutral1">
         <WalletSidebar />
         <div className="grow h-auto lg:h-[calc(100vh-88px)] pl-0 lg:pl-1 overflow-auto">
            <div className="p-8 rounded bg-neutral8 dark:bg-shade2">
               <div className="flex items-center mb-5">
                  <div className="mr-auto text-3.5xl font-dm font-bold leading-tight tracking-custom1">Overview</div>
                  <div className="flex items-center space-x-2">
                     <div className="relative w-64">
                        <input
                           type="text"
                           className="h-10 text-xs w-full pt-0 pr-12 pb-0 pl-3.5 rounded-3xl border-2 border-neutral6 dark:border-neutral4 dark:bg-transparent focus:border-neutral4 outline-none"
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
                     {/* <Listbox value={selected} onChange={setSelected}>
                        <div className="relative">
                           <Listbox.Button className="relative w-[104px] rounded-20 bg-neutral6 dark:bg-neutral3 h-10 py-0 pl-4 pr-10 text-left hover:shadow-md  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate uppercase font-medium">{selected?.currency}</span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                 <ChevronUpIcon
                                    className={`h-5 w-5 text-gray-400 ${selected === null ? 'rotate-0' : 'rotate-180'}`}
                                    aria-hidden="true"
                                 />
                              </span>
                           </Listbox.Button>
                           <Transition
                              as={Fragment}
                              enter="transform transition duration-[400ms] scale-50"
                              enterFrom="opacity-0 translate-y-10 scale-125"
                              enterTo="opacity-100 translate-y-1 scale-100"
                              leave="transform duration-200 transition ease-in-out"
                              leaveFrom="opacity-100 scale-100 translate-y-10"
                              leaveTo="opacity-0 scale-95 translate-y-12"
                           >
                              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-neutral8 dark:bg-neutral2 py-1 text-base shadow-dropdown-2 border-2 border-neutral-6 focus:outline-none dark:shadow-border-dark">
                                 {combineWallets.map((wallet: any) => (
                                    <Listbox.Option
                                       key={wallet.currency}
                                       className={({ active }) =>
                                          `relative cursor-default select-none py-2 pl-10 pr-4 uppercase ${active ? 'bg-neutral7' : 'text-neutral4'}`
                                       }
                                       value={wallet}
                                    >
                                       {({ selected }) => (
                                          <>
                                             <span
                                                className={`block truncate uppercase ${selected ? 'font-medium text-blue' : 'font-normal'
                                                   }`}
                                             >
                                                {wallet.currency}
                                             </span>
                                             {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                   <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                             ) : null}
                                          </>
                                       )}
                                    </Listbox.Option>
                                 ))}
                              </Listbox.Options>
                           </Transition>
                        </div>
                     </Listbox>
                     <div className="select-none inline-flex font-dm justify-center items-center h-10 rounded-20 py-0 px-4 whitespace-nowrap bg-neutral2 text-neutral8 dark:shadow-none dark:bg-neutral6 dark:hover:bg-neutral7 hover:-translate-y-1 hover:shadow-sm dark:text-neutral1 transition-all duration-300 cursor-pointer">
                        Show balance
                     </div> */}
                  </div>
               </div>
               <div>
                  <div className="mb-1 font-medium">Total balance</div>
                  <div className="flex items-center space-x-2">
                     <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                        {/* {Decimal.format(selected?.balance, selected?.amount_precision, ',')} */}
                     </div>
                     <Badge
                        text={'Coin'}
                     />
                  </div>
                  <div className="text-base text-neutral4">
                     $10,098.36
                  </div>
               </div>
            </div>
            <div>
               {/* <div>
                  <div className="pt-5 pb-2 px-8 text-xs text-neutral4 font-medium leading-relaxed">Account Balances</div>
                  <div className="bg-neutral8 dark:bg-shade1 rounded overflow-hidden">
                     <div>
                        <div className="flex flex-wrap -m-0.5 bg-neutral7 dark:bg-neutral1">
                           <div className="grow-0 shrink-0 basis-[calc(50%-4px)] w-[calc(50%-4px)] m-0.5 rounded bg-neutral8 dark:bg-shade1">
                              <div className="flex items-start min-h-[89px] py-5 px-8 border-b border-shade4 dark:border-neutral2">
                                 <div className="flex items-center mr-auto font-medium text-neutral3 dark:text-neutral7">
                                    <div className="bg-primary3 shrink-0 w-3 h-3 mr-2 rounded" />
                                    Margin
                                 </div>
                                 <div className="text-right">
                                    <div className="text-base font-medium">0.2785689852 BTC</div>
                                    <div className="text-neutral4">$10,098.36</div>
                                 </div>
                              </div>
                              <div className="flex space-x-2 py-5 px-8">
                                 <Button
                                    text="Deposit"
                                    size="small"
                                    variant="outline"
                                    width="noFull"
                                 />
                                 <Button
                                    text="Transfer"
                                    size="small"
                                    variant="outline"
                                    width="noFull"
                                 />
                              </div>
                           </div>
                           <div className="grow-0 shrink-0 basis-[calc(50%-4px)] w-[calc(50%-4px)] m-0.5 rounded bg-neutral8 dark:bg-shade1">
                              <div className="flex items-start min-h-[89px] py-5 px-8 border-b border-shade4 dark:border-neutral2">
                                 <div className="flex items-center mr-auto font-medium text-neutral3 dark:text-neutral7">
                                    <div className="bg-secondary3 shrink-0 w-3 h-3 mr-2 rounded" />
                                    Fiat and Spot
                                 </div>
                                 <div className="text-right">
                                    <div className="text-base font-medium">0.2785689852 BTC</div>
                                    <div className="text-neutral4">$10,098.36</div>
                                 </div>
                              </div>
                              <div className="flex space-x-2 py-5 px-8">
                                 <Button
                                    text="Deposit"
                                    size="small"
                                    variant="outline"
                                    width="noFull"
                                 />
                                 <Button
                                    text="Transfer"
                                    size="small"
                                    variant="outline"
                                    width="noFull"
                                 />
                              </div>
                           </div>
                           <div className="grow-0 shrink-0 basis-[calc(50%-4px)] w-[calc(50%-4px)] m-0.5 rounded bg-neutral8 dark:bg-shade1">
                              <div className="flex items-start min-h-[89px] py-5 px-8 border-b border-shade4 dark:border-neutral2">
                                 <div className="flex items-center mr-auto font-medium text-neutral3 dark:text-neutral7">
                                    <div className="bg-secondary1 shrink-0 w-3 h-3 mr-2 rounded" />
                                    P2P
                                 </div>
                              </div>
                              <div className="py-5 px-8">
                                 <div className="inline-block py-2 px-4 shadow-input dark:shadow-border-dark rounded-2xl font-dm font-bold text-primary5 leading-custom3">
                                    Coming soon
                                 </div>
                              </div>
                           </div>
                           <div className="grow-0 shrink-0 basis-[calc(50%-4px)] w-[calc(50%-4px)] m-0.5 rounded bg-neutral8 dark:bg-shade1">
                              <div className="flex items-start min-h-[89px] py-5 px-8 border-b border-shade4 dark:border-neutral2">
                                 <div className="flex items-center mr-auto font-medium text-neutral3 dark:text-neutral7">
                                    <div className="bg-primary1 shrink-0 w-3 h-3 mr-2 rounded" />
                                    Futures
                                 </div>
                              </div>
                              <div className="py-5 px-8">
                                 <div className="inline-block py-2 px-4 shadow-input dark:shadow-border-dark rounded-2xl font-dm font-bold text-primary5 leading-custom3">
                                    Coming soon
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div> */}
               <div>
                  <div className="pt-5 pb-2 px-8 text-xs text-neutral4 font-medium leading-relaxed">Asset Balances</div>
                  <div className="bg-neutral8 dark:bg-shade2 rounded overflow-hidden">
                     <div>
                        <div className="pb-1">
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
                              {/* {
                                       walletsLoading
                                       && (
                                          <>
                                             <div className="table-row">
                                                <div className="table-cell pb-[10px] p-1.5 pl-0">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5 pr-0">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                             </div>
                                             <div className="table-row">
                                                <div className="table-cell pb-[10px] p-1.5 pl-0">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5 pr-0">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                             </div>
                                             <div className="table-row">
                                                <div className="table-cell pb-[10px] p-1.5 pl-0">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                                <div className="table-cell pb-[10px] p-1.5 pr-0">
                                                   <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                                                </div>
                                             </div>
                                          </>
                                       )
                                    }  */}
                              {
                                 (wallets.length > 0 || walletsLoading)
                                    ? wallets.filter(e => Object.keys(e)
                                       .reduce((acc, curr) => acc || e[curr]?.toString()?.toLowerCase()?.match(q.toLowerCase())?.includes(q.toLowerCase()), false))
                                       ?.map(wallet => (
                                          <Link to={`/wallet-details/${wallet.currency}`} className="table-row hover:bg-neutral7 dark:hover:bg-neutral3" style={{ transition: 'background .2s' }}>
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
                                                <Badge
                                                   text="7.46% APR"
                                                />
                                             </div>
                                             <div className="table-cell border-b border-neutral6 dark:border-neutral3 p-4 text-right">
                                                <div className="font-medium">
                                                   {Decimal.format(wallet?.balance, wallet?.currency === 'idr' ? 0 : wallet?.fixed, ',')} {wallet?.currency?.toUpperCase()}
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
      </div>
   )
});

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   wallets: selectWallets(state),
   currencies: selectCurrencies(state),
   withdrawSuccess: selectWithdrawSuccess(state),
   walletsLoading: selectWalletsLoading(state),
   historyList: selectHistory(state),
   beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
   beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
   beneficiariesAddSuccess: selectBeneficiariesCreateSuccess(state),
   isLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   fetchBeneficiaries: params => dispatch(beneficiariesFetch(params)),
   fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
   fetchWallets: () => dispatch(walletsFetch()),
   fetchCurrencies: () => dispatch(currenciesFetch()),
   walletsWithdrawCcy: params => dispatch(walletsWithdrawCcyFetch(params)),
   fetchSuccess: payload => dispatch(alertPush(payload)),
   clearWallets: () => dispatch(walletsData([]))
});

export const Old = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(WalletOverviewFC) as FunctionComponent;
