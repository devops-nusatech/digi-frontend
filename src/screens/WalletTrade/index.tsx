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
import { Badge, Button, Decimal, LayoutWallet, Portal, Skeleton, } from 'components';
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
import { IcEmty, ImgBarcode, ImgTfa } from 'assets';
import { useDocumentTitle } from 'hooks';

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

const WalletTradeFC: FC<Props> = memo(({
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
   walletsError,
   fetchBeneficiaries,
   fetchAddress,
   fetchWallets,
   fetchCurrencies,
   walletsWithdrawCcy,
   fetchSuccess,
   clearWallets,
   history: { push },
   intl,
}, state: State) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [q, setQ] = useState<string>('');
   useDocumentTitle('Trades');
   useEffect(() => {
      if (!wallets.length || !currencies.length) {
         fetchWallets();
         fetchCurrencies();
      }
   }, [wallets, currencies]);

   let balances: Wallet[] = wallets || [];
   if (q) {
      balances = balances.length
         ? balances.filter(market =>
            Object.keys(market).reduce(
               (acc, curr) =>
                  acc ||
                  market[curr]
                     ?.toString()
                     ?.toLowerCase()
                     ?.match(q.toLowerCase())
                     ?.includes(q.toLowerCase()),
               false
            )
         )
         : [];
   }

   const wallet = wallets.find(pair => pair.currency === 'idr');

   const handleShowPortal = () => setIsOpen(prev => !prev);

   const renderHeaderModal = () => {
      if (user.level < 2) {
         return 'Verify your identity';
      }
      if (!user.otp) {
         return 'Activate two factor authentication';
      }
      return;
   }

   const renderContentModal = () => {
      if (user.level < 2) {
         return 'Please verify your identity through the mobile application, scan the barcode below to download.';
      }
      if (!user.otp) {
         return 'Please strengthen your account security by activate google two-factor authentication';
      }
      return;
   }

   const handleActionModal = () => {
      if (user.level < 2) {
         return handleShowPortal()
      }
      if (!user.otp) {
         return push('/2fa');
      }
      return;
   }

   return (
      <>
         <LayoutWallet>
            <div className="p-8 rounded bg-neutral8 dark:bg-shade2">
               <div className="flex items-center mb-5">
                  <div className="mr-auto text-3.5xl font-dm font-bold leading-tight tracking-custom1">
                     Summary
                  </div>
                  <div className="flex items-center space-x-2">
                     <div>
                        <div className="relative w-64">
                           <input
                              type="text"
                              className="h-10 text-xs w-full pt-0 pr-12 pb-0 pl-3.5 rounded-3xl border-2 border-neutral6 dark:border-neutral4 dark:bg-transparent focus:border-neutral4 outline-none"
                              style={{ transition: 'border-color .2s' }}
                              placeholder="Search..."
                              onChange={e => setQ(e.target.value)}
                           />
                           <button
                              type="button"
                              className="absolute top-0 right-0 h-10 w-10 bg-none flex items-center justify-center"
                           >
                              <SearchIcon className="w-5 h-5 stroke-neutral4 transition-all duration-300" />
                           </button>
                        </div>
                     </div>
                     <Button
                        text="Filter"
                        variant="outline"
                        size="normal"
                        icRight={
                           <svg className="ml-3 w-3.5 h-3.5 fill-neutral4 group-hover:fill-neutral8 transition-colors duration-300">
                              <use xlinkHref="#icon-filter" />
                           </svg>
                        }
                     />
                  </div>
               </div>
               <div className="flex items-center">
                  <div className="mr-auto">
                     <div className="mb-1 font-medium">Total balance</div>
                     <div className="flex items-center space-x-2">
                        <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                           {Decimal.format(wallet?.balance, Number(wallet?.fixed), ',')}
                        </div>
                        {wallet?.currency ? (
                           <Badge text={String(wallet?.currency.toUpperCase())} />
                        ) : (
                           <Skeleton height={26} width={36} />
                        )}
                     </div>
                     <div className="text-base text-neutral4">
                        $10,098.36
                     </div>
                  </div>
               </div>
            </div>
            <div className="pt-1">
               <div className="bg-neutral8 dark:bg-shade2 rounded overflow-hidden">
                  <div className="pb-1">
                     <div className="table w-full">
                        <div className="table-row" style={{ transition: 'background .2s' }}>
                           <div className="table-cell p-4 !pl-8 !pt-5 border-b border-neutral7 dark:border-neutral3 text-xs leading-custom1 font-semibold text-neutral3 dark:text-neutral8">
                              Asset
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
                           // walletsLoading ? (
                           //    <>
                           //       <div className="table-row">
                           //          <div className="table-cell pb-[10px] p-1.5 pl-0">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5 pr-0">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //       </div>
                           //       <div className="table-row">
                           //          <div className="table-cell pb-[10px] p-1.5 pl-0">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5 pr-0">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //       </div>
                           //       <div className="table-row">
                           //          <div className="table-cell pb-[10px] p-1.5 pl-0">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //          <div className="table-cell pb-[10px] p-1.5 pr-0">
                           //             <div className="h-5 w-full rounded-lg bg-neutral6 animate-pulse" />
                           //          </div>
                           //       </div>
                           //    </>
                           // ) :
                           balances.length > 0
                              ? balances.map(wallet => (
                                 <Link to={`/wallets/${wallet.currency}`} className="table-row hover:bg-neutral7 dark:hover:bg-neutral3" style={{ transition: 'background .2s' }}>
                                    <div className={`table-cell p-4 !pl-8 align-middle [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3`}>
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
                                    <div className="table-cell [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 p-4 text-right">
                                       <div className="font-medium">
                                          {Decimal.format(wallet?.balance, wallet?.currency === 'idr' ? 0 : wallet?.fixed, ',')} {wallet?.currency?.toUpperCase()}
                                       </div>
                                       <div className="text-neutral4">$10,098.36</div>
                                    </div>
                                    <div className="table-cell [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 p-4 text-right">
                                       <div className="font-medium">
                                          {Decimal.format(wallet?.balance, 0, ',')} {wallet?.currency?.toUpperCase()}
                                       </div>
                                       <div className="text-neutral4">$10,098.36</div>
                                    </div>
                                    <div className="table-cell [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3 p-4 !pr-8 text-right">
                                       <div className="font-medium">
                                          {Decimal.format(wallet?.balance, 0, ',')} {wallet?.currency?.toUpperCase()}
                                       </div>
                                       <div className="text-neutral4">$10,098.36</div>
                                    </div>
                                 </Link>
                              )) : (
                                 <div className="table-row hover:bg-neutral7 dark:hover:bg-neutral3">
                                    <div className="table-cell">&nbsp;</div>
                                    <div className="table-cell">&nbsp;</div>
                                    <div className="table-cell align-middle">
                                       <div className="flex flex-col items-center space-y-3">
                                          <IcEmty />
                                          <div className="text-xs leading-normal font-medium text-neutral4">No result found...</div>
                                       </div>
                                    </div>
                                    <div className="table-cell">&nbsp;</div>
                                    <div className="table-cell">&nbsp;</div>
                                 </div>
                              )
                        }
                     </div>
                  </div>
               </div>
            </div>
         </LayoutWallet>
         <Portal
            show={isOpen}
            close={handleShowPortal}
         >
            <div className="pt-10 space-y-8">
               <div className="space-y-3">
                  <div className="font-dm font-bold text-2xl leading-9 text-center tracking-custom">
                     {renderHeaderModal()}
                  </div>
                  <div className="max-w-82 mx-auto text-center text-xs text-neutral4 leading-5">
                     {renderContentModal()}
                  </div>
               </div>
               {
                  user.level < 2 ? (
                     <div className="h-40 w-40 mx-auto p-4 rounded-lg border-2 border-dashed border-primary1">
                        <ImgBarcode className="max-w-full max-h-full" />
                     </div>
                  ) : <ImgTfa className="mx-auto" />
               }
               <Button
                  text={user.level < 2 ? 'Close' : 'Enable 2FA'}
                  onClick={handleActionModal}
               />
            </div>
         </Portal>
      </>
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

export const WalletTrade = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(WalletTradeFC) as FunctionComponent;
