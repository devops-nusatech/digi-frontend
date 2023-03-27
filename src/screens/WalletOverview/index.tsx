import React, {
   useState,
   FunctionComponent,
   memo,
   useEffect,
   useMemo,
   ChangeEvent,
} from 'react';
import { RouterProps, withRouter } from 'react-router';
import { connect, MapDispatchToProps } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Button, LayoutWallet, ModalRequired, TableWallets } from 'components';
import {
   MemberLevels,
   RootState,
   selectMemberLevels,
   selectUserInfo,
   selectWallets,
   User,
   Wallet,
   walletsFetch,
} from 'modules';
import { IntlProps } from 'index';
import { SearchIcon } from '@heroicons/react/outline';
import { useDebounced, useDocumentTitle } from 'hooks';
import { arrayFilter } from 'helpers';
import { EstimatedValue } from 'components';
import { DEFAULT_WALLET } from '../../constants';

interface ReduxProps {
   user: User;
   wallets: Wallet[];
   memberLevel?: MemberLevels;
}

interface DispatchProps {
   fetchWallets: typeof walletsFetch;
}

interface OwnProps {
   location: {
      state: {
         isOpenPortal: boolean;
      };
   };
}

type WalletsProps = RouterProps &
   ReduxProps &
   DispatchProps &
   OwnProps &
   IntlProps;

const WalletOverviewFC = memo(
   ({
      user,
      wallets,
      memberLevel,
      fetchWallets,
      history: { push },
      location,
      intl,
   }: WalletsProps) => {
      const [isOpen, setIsOpen] = useState(
         location.state?.isOpenPortal ? location.state?.isOpenPortal : false
      );
      const [q, setQ] = useState<string>('');
      const [checked, setChecked] = useState<boolean>(false);

      // const qDebounce = useDebounce(q, 1000);
      const [kokom] = useDebounced(q, 1000);

      useDocumentTitle('Wallets');
      useEffect(() => {
         if (wallets.length <= 0) {
            fetchWallets();
         }
      }, [wallets]);

      let balances: Wallet[] = wallets || [DEFAULT_WALLET];
      if (q) {
         balances = balances.length ? arrayFilter(balances, kokom) : [];
      }
      if (checked) {
         balances = balances.length
            ? balances.filter(
                 ({ balance, locked }) =>
                    Number(balance) > 0 || Number(locked) > 0
              )
            : [];
      }
      // const wallet = wallets.find(pair => pair.currency === 'idr');

      const translate = (id: string) => intl.formatMessage({ id });
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
         setQ(e.target.value);
      };
      const handleShowPortal = () => setIsOpen(prev => !prev);

      const handleRedirectToTransfer = () => push('/wallets/transfer');

      const renderTableWallets = useMemo(
         () => (
            <TableWallets
               balances={balances}
               push={push}
               translate={translate}
            />
         ),
         [balances]
      );

      return (
         <>
            <LayoutWallet>
               <div className="rounded bg-neutral8 p-8 dark:bg-shade2">
                  <div className="mb-5 flex items-center">
                     <div className="mr-auto font-dm text-3.5xl font-bold leading-tight tracking-custom1">
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
                  <div className="px-8 pt-5 pb-2 text-xs font-medium leading-relaxed text-neutral4">
                     Asset Balances
                  </div>
                  <div className="min-h-c-screen-343 overflow-hidden rounded bg-neutral8 dark:bg-shade2">
                     <div className="pt-5">
                        <div className="flex items-center px-8">
                           <div className="relative mr-auto w-64">
                              <input
                                 type="text"
                                 className="h-10 w-full rounded-3xl border-2 border-neutral6 pt-0 pr-12 pb-0 pl-3.5 text-xs outline-none focus:border-neutral4 dark:border-neutral3 dark:bg-transparent dark:focus:border-neutral4"
                                 style={{ transition: 'border-color .2s' }}
                                 placeholder="Search assets..."
                                 onChange={handleChange}
                                 autoFocus
                              />
                              <button
                                 type="button"
                                 className="absolute top-0 right-0 flex h-10 w-10 items-center justify-center bg-none">
                                 <SearchIcon className="h-5 w-5 stroke-neutral4 transition-all duration-300" />
                              </button>
                           </div>
                           <label
                              htmlFor="hide-empty-balance"
                              className="flex cursor-pointer items-center space-x-1">
                              <input
                                 type="checkbox"
                                 checked={checked}
                                 className="cursor-pointer accent-primary1"
                                 id="hide-empty-balance"
                                 onChange={() => setChecked(prev => !prev)}
                              />
                              <div className="select-none text-xs font-medium leading-custom1 text-neutral4 transition-colors duration-300 hover:text-neutral2 dark:hover:text-neutral8">
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
      );
   }
);

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   wallets: selectWallets(state),
   memberLevel: selectMemberLevels(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   fetchWallets: () => dispatch(walletsFetch()),
});

export const WalletOverview = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(WalletOverviewFC) as FunctionComponent;
