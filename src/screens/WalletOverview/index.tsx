import React, {
   useState,
   FunctionComponent,
   memo,
   useEffect,
   FC,
   useMemo,
   ChangeEvent,
} from 'react';
import {
   RouterProps,
   withRouter
} from 'react-router';
import {
   connect,
   MapDispatchToProps
} from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import {
   Badge,
   Button,
   Decimal,
   LayoutWallet,
   ModalRequired,
   Skeleton,
} from 'components';
import {
   alertPush,
   beneficiariesFetch,
   Beneficiary,
   RootState,
   selectBeneficiariesActivateSuccess,
   selectBeneficiariesCreateSuccess,
   selectBeneficiariesDeleteSuccess,
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
import { IcEmty } from 'assets';
import { useDocumentTitle } from 'hooks';
import {
   arrayFilter,
   renderCurrencyIcon
} from 'helpers';

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
   isLoggedIn: boolean;
}

interface DispatchProps {
   fetchBeneficiaries: typeof beneficiariesFetch;
   fetchAddress: typeof walletsAddressFetch;
   fetchWallets: typeof walletsFetch;
   walletsWithdrawCcy: typeof walletsWithdrawCcyFetch;
   fetchSuccess: typeof alertPush;
   clearWallets: () => void;
}

interface OwnProps {
   walletsError: {
      message: string;
   },
   location: {
      state: {
         isOpenPortal: boolean;
      }
   }
}

type WalletsProps = RouterProps & ReduxProps & DispatchProps & OwnProps & IntlProps;

const WalletOverviewFC: FC<WalletsProps> = memo(({
   user,
   wallets,
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
   walletsWithdrawCcy,
   fetchSuccess,
   clearWallets,
   history: { push },
   location,
   intl,
}, state: State) => {
   const [isOpen, setIsOpen] = useState(location.state?.isOpenPortal ? location.state?.isOpenPortal : false);
   const [q, setQ] = useState<string>('');
   const [checked, setChecked] = useState<boolean>(false);

   useDocumentTitle('Wallets');
   useEffect(() => {
      if (!wallets.length) {
         fetchWallets();
      }
   }, [wallets]);

   const translate = (id: string) => intl.formatMessage({ id });

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value);

   let balances: Wallet[] = wallets || [];
   if (q) {
      balances = balances.length
         ? arrayFilter(balances, q)
         : [];
   }
   if (checked) {
      balances = balances.length
         ? balances.filter(({ balance, locked }) => Number(balance) < 0 || Number(locked) < 0)
         : [];
   }
   const wallet = wallets.find(pair => pair.currency === 'idr');

   const handleShowPortal = () => setIsOpen(prev => !prev);

   const handleRedirectToTransfer = () => {
      if (user.state === 'pending') {
         push('/email-verification')
      } else if (user.level < 2 || !user.otp) {
         handleShowPortal()
      } else {
         push('/transfer')
      }
   }

   const renderWallets = useMemo(() => (
      <div className="overflow-x-auto">
         <table className="w-full table-auto">
            <thead>
               <tr className="border-b border-neutral7 dark:border-neutral2">
                  <th className="p-4 pt-5 first:pl-8 last:pr-8 text-xs font-semibold leading-custom4 text-left">
                     Asset
                  </th>
                  <th className="p-4 pt-5 first:pl-8 last:pr-8 text-xs font-semibold leading-custom4 text-right">
                     On orders
                  </th>
                  <th className="p-4 pt-5 first:pl-8 last:pr-8 text-xs font-semibold leading-custom4 text-right">
                     Available balance
                  </th>
                  <th className="p-4 pt-5 first:pl-8 last:pr-8 text-xs font-semibold leading-custom4 text-right">
                     Total balance
                  </th>
               </tr>
            </thead>
            <tbody>
               {balances.length ? (
                  balances.map(({ currency, name, iconUrl, locked, balance, fixed }) => (
                     <tr
                        key={currency}
                        onClick={() => push(`wallets/${currency}`)}
                        className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3 hover:bg-neutral7 dark:hover:bg-neutral2 cursor-pointer"
                     >
                        <td className="p-4 first:pl-8 last:pr-8">
                           <div className="flex space-x-5">
                              <div className="shrink-0 w-8">
                                 <img
                                    className={`w-full ${renderCurrencyIcon(currency, iconUrl).includes('http') ? 'polygon' : ''}`}
                                    src={renderCurrencyIcon(currency, iconUrl)}
                                    alt={name}
                                    title={name}
                                 />
                              </div>
                              <div>
                                 <div className="font-medium uppercase">
                                    {currency}
                                 </div>
                                 <div className="text-neutral4">
                                    {name}
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="p-4 first:pl-8 last:pr-8 text-right">
                           <div className="font-medium uppercase">
                              {Decimal.format(locked, currency === 'idr' ? 0 : fixed, ',')} {currency}
                           </div>
                           <div className="text-neutral4">
                              $0.0
                           </div>
                        </td>
                        <td className="p-4 first:pl-8 last:pr-8 text-right">
                           <div className="font-medium uppercase">
                              {Decimal.format(balance, currency === 'idr' ? 0 : fixed, ',')} {currency}
                           </div>
                           <div className="text-neutral4">
                              $0.0
                           </div>
                        </td>
                        <td className="p-4 first:pl-8 last:pr-8 text-right">
                           <div className="font-medium uppercase">
                              {Decimal.format(Number(balance) + Number(locked), currency === 'idr' ? 0 : fixed, ',')} {currency}
                           </div>
                           <div className="text-neutral4">
                              $0.0
                           </div>
                        </td>
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td colSpan={4}>
                        <div className="min-h-c-screen-462 flex flex-col items-center justify-center space-y-3">
                           <IcEmty />
                           <div className="text-xs font-semibold text-neutral4">
                              {translate('noResultFound')}
                           </div>
                        </div>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   ), [balances])

   return (
      <>
         <LayoutWallet>
            <div className="p-8 rounded bg-neutral8 dark:bg-shade2">
               <div className="flex items-center mb-5">
                  <div className="mr-auto text-3.5xl font-dm font-bold leading-tight tracking-custom1">
                     Overview
                  </div>
                  <div className="w-56">
                     <Button
                        onClick={handleRedirectToTransfer}
                        text="Transfer"
                        variant="outline"
                        size="normal"
                        className="lg-max:hidden"
                     />
                  </div>
               </div>
               <div className="flex items-start justify-between">
                  <div>
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
                        $17,05.99
                     </div>
                  </div>
                  <div>
                     <div className="mb-1 font-medium">Locked balance</div>
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
                        $17,05.99
                     </div>
                  </div>
                  <div>
                     <div className="mb-1 font-medium">Available balance</div>
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
                        $17,05.99
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <div className="pt-5 pb-2 px-8 text-xs text-neutral4 font-medium leading-relaxed">
                  Asset Balances
               </div>
               <div className="bg-neutral8 dark:bg-shade2 rounded overflow-hidden min-h-c-screen-343">
                  <div className="pt-5">
                     <div className="flex items-center px-8">
                        <div className="relative w-64 mr-auto">
                           <input
                              type="text"
                              className="h-10 text-xs w-full pt-0 pr-12 pb-0 pl-3.5 rounded-3xl border-2 border-neutral6 outline-none focus:border-neutral4 dark:border-neutral3 dark:bg-transparent dark:focus:border-neutral4"
                              style={{ transition: 'border-color .2s' }}
                              placeholder="Search assets..."
                              onChange={handleChange}
                              autoFocus
                           />
                           <button
                              type="button"
                              className="absolute top-0 right-0 h-10 w-10 bg-none flex items-center justify-center"
                           >
                              <SearchIcon className="w-5 h-5 stroke-neutral4 transition-all duration-300" />
                           </button>
                        </div>
                        <label
                           htmlFor="hide-empty-balance"
                           className="flex space-x-1 items-center cursor-pointer"
                        >
                           <input
                              type="checkbox"
                              checked={checked}
                              className="accent-primary1 cursor-pointer" id="hide-empty-balance"
                              onChange={() => setChecked(prev => !prev)}
                           />
                           <div className="select-none text-xs font-medium leading-custom1 text-neutral4 hover:text-neutral2 transition-colors duration-300">
                              Hide Empty Balance
                           </div>
                        </label>
                     </div>
                     {renderWallets}
                  </div>
               </div>
            </div>
         </LayoutWallet>
         <ModalRequired
            show={isOpen}
            close={handleShowPortal}
            push={push}
         />
      </>
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
   isLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   fetchBeneficiaries: params => dispatch(beneficiariesFetch(params)),
   fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
   fetchWallets: () => dispatch(walletsFetch()),
   walletsWithdrawCcy: params => dispatch(walletsWithdrawCcyFetch(params)),
   fetchSuccess: payload => dispatch(alertPush(payload)),
   clearWallets: () => dispatch(walletsData([]))
});

export const WalletOverview = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(WalletOverviewFC) as FunctionComponent;
