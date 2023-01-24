import React, {
   useState,
   FunctionComponent,
   memo,
   useEffect,
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
   Button,
   LayoutWallet,
   ModalRequired,
   TableWallets,
} from 'components';
import {
   RootState,
   selectUserInfo,
   selectWallets,
   User,
   Wallet,
   walletsFetch
} from 'modules';
import { IntlProps } from 'index';
import { SearchIcon } from '@heroicons/react/outline';
import { useDocumentTitle } from 'hooks';
import { arrayFilter } from 'helpers';
import { EstimatedValue } from 'components';
import { DEFAULT_WALLET } from '../../constants';

interface ReduxProps {
   user: User;
   wallets: Wallet[];
}

interface DispatchProps {
   fetchWallets: typeof walletsFetch;
}

interface OwnProps {
   location: {
      state: {
         isOpenPortal: boolean;
      }
   }
}

type WalletsProps = RouterProps & ReduxProps & DispatchProps & OwnProps & IntlProps;

const WalletOverviewFC = memo(({
   user,
   wallets,
   fetchWallets,
   history: { push },
   location,
   intl,
}: WalletsProps) => {
   const [isOpen, setIsOpen] = useState(location.state?.isOpenPortal ? location.state?.isOpenPortal : false);
   const [q, setQ] = useState<string>('');
   const [checked, setChecked] = useState<boolean>(false);

   useDocumentTitle('Wallets');
   useEffect(() => {
      if (wallets.length <= 0) {
         fetchWallets();
      }
   }, [wallets]);

   let balances: Wallet[] = wallets || [DEFAULT_WALLET];
   if (q) {
      balances = balances.length
         ? arrayFilter(balances, q)
         : [];
   }
   if (checked) {
      balances = balances.length
         ? balances.filter(({ balance, locked }) => Number(balance) > 0 || Number(locked) > 0)
         : [];
   }
   // const wallet = wallets.find(pair => pair.currency === 'idr');

   const translate = (id: string) => intl.formatMessage({ id });
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value);
   const handleShowPortal = () => setIsOpen(prev => !prev);

   const handleRedirectToTransfer = () => {
      if (user.state === 'pending') {
         push('/email-verification')
      } else if (user.level < 2 || !user.otp) {
         handleShowPortal()
      } else {
         push('/wallets/transfer')
      }
   }

   const renderTableWallets = useMemo(() => (
      <TableWallets
         balances={balances}
         push={push}
         translate={translate}
      />
   ), [balances]);

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
               <EstimatedValue wallets={wallets} />
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
                           <div className="select-none text-xs font-medium leading-custom1 text-neutral4 hover:text-neutral2 dark:hover:text-neutral8 transition-colors duration-300">
                              Hide Empty Balance
                           </div>
                        </label>
                     </div>
                     {renderTableWallets}
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
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   fetchWallets: () => dispatch(walletsFetch()),
});

export const WalletOverview = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(WalletOverviewFC) as FunctionComponent;
