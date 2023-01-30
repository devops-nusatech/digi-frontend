import React, {
   FunctionComponent,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from 'react'
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
   connect,
   MapDispatchToPropsFunction
} from 'react-redux';
import {
   walletsFetch,
   selectWallets,
   walletsAddressFetch,
   selectGenerateAddressLoading,
   alertPush,
   selectUserInfo,
   selectWalletsLoading,
   Sonic,
   selectSonic,
   MemberLevels,
   selectMemberLevels,
} from 'modules';
import type {
   RootState,
   User,
   Wallet,
} from 'modules';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';
import { copyToClipboard, renderCurrencyIcon } from 'helpers';
import { Button, Decimal, LayoutProfile, Skeleton, InputGroup, QRCode, Nav, Label, ComboboxCurrency } from 'components';
import { DEFAULT_WALLET } from '../../constants';

type DepositState = {
   currency: string;
   currentNetwork: number;
}

type ReduxProps = {
   sonic: Sonic;
   user: User;
   wallets: Wallet[];
   generateAddressLoading?: boolean;
   walletLoading: boolean;
   memberLevel?: MemberLevels;
}

type OwnProps = {
   location: {
      state: {
         currency: string;
      }
   };
}

interface DispatchProps {
   fetchWallets: typeof walletsFetch;
   generateAdress: typeof walletsAddressFetch;
   fetchSuccess: typeof alertPush;
}

type DepositProps = ReduxProps & OwnProps & DispatchProps & RouterProps & IntlProps;

const DepositFC = memo(({
   sonic,
   user,
   wallets,
   generateAddressLoading,
   walletLoading,
   memberLevel,
   location,
   fetchWallets,
   generateAdress,
   fetchSuccess,
   history: { push },
   intl
}: DepositProps) => {
   useEffect(() => {
      if (user && user.level < 1 && user.state === 'pending') {
         push('/email-verification', { email: user.email });
      }
      if (user && user.level < Number(memberLevel && memberLevel?.deposit && memberLevel?.deposit?.minimum_level)) {
         push('/wallets');
      }
   }, []);
   useEffect(() => {
      if (!wallets.length) {
         fetchWallets();
      }
   }, [wallets]);

   const [state, setState] = useState<DepositState>({
      currency: '',
      currentNetwork: 0
   });
   const {
      currency,
      currentNetwork
   } = state;

   const handleChangeCurrency = (currency: string) => setState({
      ...state,
      currency
   });
   const handleChangeCurrentNetwork = (currentNetwork: number) => setState({
      ...state,
      currentNetwork
   });

   const filteredWallet =
      (wallets && wallets.filter(wallet => wallet?.currency === currency)[0]) ||
      DEFAULT_WALLET;
   const network = filteredWallet?.networks[currentNetwork]
   const depositAddress =
      filteredWallet?.deposit_addresses &&
      filteredWallet?.deposit_addresses?.find(
         e => e?.blockchain_key === network?.blockchain_key
      );

   let loadingFetchGenerate: boolean = false;

   const translate = useCallback((id: string) => intl.formatMessage({ id }), [intl]);

   const handleGenerateAddress = useCallback(() => {
      generateAdress({ currency, blockchainKey: network?.blockchain_key });
      fetchWallets();
      loadingFetchGenerate = walletLoading ? true : false;
   }, [generateAdress, filteredWallet, fetchWallets, walletLoading, loadingFetchGenerate]);

   const handleCopy = useCallback((url: string, type: string) => {
      copyToClipboard(url);
      fetchSuccess({ message: [`${type} Copied`], type: 'success' });
   }, [fetchSuccess, copyToClipboard]);

   const isDisabled = useMemo(() => {
      const depositEnabled = network?.deposit_enabled;
      return !filteredWallet || filteredWallet?.name === '' || !depositEnabled || loadingFetchGenerate;
   }, [filteredWallet, loadingFetchGenerate, currentNetwork]);

   const renderAddressAvailable = useMemo(() => (
      <div className="flex items-center space-x-12">
         <div>
            <div className="p-4 rounded-lg border-2 border-dashed border-primary1 w-40 h-40">
               <QRCode
                  dimensions={128}
                  data={depositAddress?.address || ''}
               />
            </div>
         </div>
         <div className="w-full">
            <InputGroup
               value={depositAddress?.address}
               icon={
                  <svg
                     onClick={() => handleCopy(depositAddress?.address || '', 'Address')}
                     className="cursor-copy -translate-x-0.5 w-6 h-6 fill-neutral4 group-hover:fill-neutral2"
                  >
                     <use xlinkHref="#icon-copy" />
                  </svg>
               }
            />
         </div>
      </div>
   ), [depositAddress, handleCopy]);

   const renderAddressSkeleton = useMemo(() => (
      <div className="flex items-center space-x-12">
         <div>
            <div className="grow p-4 rounded-lg border-2 border-dashed border-primary1 w-40 h-40">
               <Skeleton
                  rounded="lg"
                  isHeightFull
                  isWithFull
               />
            </div>
         </div>
         <div className="w-full">
            <Skeleton
               rounded="lg"
               height={48}
               isWithFull
            />
         </div>
      </div>
   ), []);

   const renderButtonGenerated = useMemo(() => (
      <Button
         text={network ? translate('deposit.content.button.enabled') : translate('deposit.content.button.disabled')}
         disabled={isDisabled || generateAddressLoading}
         onClick={handleGenerateAddress}
         withLoading={generateAddressLoading || loadingFetchGenerate}
      />
   ), [network, isDisabled, generateAddressLoading, handleGenerateAddress, loadingFetchGenerate, translate]);

   return (
      <LayoutProfile
         title="Deposit"
         withBreadcrumbs={{
            display: 'Wallets',
            href: '/wallets',
            active: 'Deposit'
         }}
      >
         <div className="flex space-x-10">
            <div className="w-2/3">
               <div className="bg-neutral8 dark:bg-shade1 shadow-card rounded-2xl p-10 space-y-8">
                  <ComboboxCurrency
                     onChange={handleChangeCurrency}
                     displayValue="name"
                     defaultValue={location.state?.currency}
                  />
                  <div className="space-y-2.5">
                     <Label label={filteredWallet.type === 'coin' ? 'Pick network' : 'Select bank'} />
                     {(!filteredWallet || filteredWallet.name === '') ? (
                        <div className="flex space-x-4">
                           <Skeleton height={40} width={71.98} rounded="lg" />
                           <Skeleton height={40} width={71.98} rounded="lg" />
                           <Skeleton height={40} width={71.98} rounded="lg" />
                        </div>
                     ) : (filteredWallet.networks.length && filteredWallet.name !== '' && filteredWallet.type === 'coin') ? (
                        <div className="flex space-x-4">
                           {filteredWallet.networks.map(({ blockchain_key, protocol }, index) => (
                              <>
                                 <Nav
                                    key={blockchain_key}
                                    title={protocol}
                                    isActive={currentNetwork === index}
                                    onClick={() => handleChangeCurrentNetwork(index)}
                                    theme="grey"
                                 />
                                 {/* <Button
                                 key={network.blockchain_key}
                                 text={network.protocol}
                                 size="normal"
                                 width="noFull"
                                 rounded="lg"
                                 fontDM={false}
                                 variant={currentNetwork === index ? "primary" : "outline"}
                                 onClick={() => handleChangeCurrentNetwork(index)}
                              /> */}
                              </>
                           ))}
                        </div>
                     ) : (
                        <div className="flex items-center space-x-3 rounded-lg px-3 py-2 bg-secondary3 bg-opacity-20">
                           <span className="text-3xl font-bold text-primary4">&#9888;</span>
                           <div>{translate('deposit.content.disabled')}</div>
                        </div>
                     )}
                  </div>
                  <div className="space-y-2.5">
                     <Label label="Payment address" />
                     {(filteredWallet?.name !== '' && filteredWallet?.type === 'coin') && (
                        depositAddress?.state === 'pending'
                           ? renderAddressSkeleton
                           : depositAddress?.address
                              ? renderAddressAvailable
                              : renderButtonGenerated
                     )}
                     {(filteredWallet?.name !== '' && filteredWallet?.type === 'fiat') && (
                        renderButtonGenerated
                     )}
                  </div>
                  <div className="bg-neutral7 dark:bg-neutral2 flex flex-col rounded-2xl px-6 py-4">
                     <div className="font-medium leading-6">
                        Instruction of deposit
                     </div>
                     <ul className="list-decimal list-outside text-xs pl-3 leading-5">
                        {filteredWallet.type === 'coin' ? (
                           <>
                              <li>{filteredWallet?.currency.toUpperCase()} deposit will be into the account after the {network?.min_confirmations} confirmation, and it can be allowed to withdraw after the {Number(network?.min_confirmations) + 2} confirmation.</li>
                              <li>Minimum deposits are {Decimal.format(network?.min_deposit_amount, Number(filteredWallet?.fixed), ',')} {filteredWallet?.currency.toUpperCase()}, and deposits will be not into the account if they are less the minimum.</li>
                              <li>Please note that depositing other tokens to the address below will cause your asset to be permanent lost</li>
                           </>
                        ) : (
                           <li>Please note the minimum deposit is {Decimal.format(network?.min_deposit_amount, Number(filteredWallet?.fixed), ',')} {filteredWallet?.currency.toUpperCase()} and if you deposit below that amount, the deposit will not be credited to your account.</li>
                        )}
                     </ul>
                  </div>
               </div>
            </div>
            <div className="w-1/3">
               <div className="bg-neutral8 dark:bg-shade1 shadow-card rounded-2xl py-10 px-6">
                  <div className="space-y-3">
                     <Label label={translate('deposit.content.right.title')} />
                     <div className="mx-auto w-20 h-20 overflow-hidden pointer-events-none">
                        <img
                           className={`w-full ${renderCurrencyIcon(filteredWallet?.currency, filteredWallet?.iconUrl)?.includes('http') ? 'object-cover polygon bg-neutral8' : ''}`}
                           src={renderCurrencyIcon(filteredWallet?.currency, filteredWallet?.iconUrl)}
                           alt={filteredWallet?.name || ''}
                           title={filteredWallet?.name || ''}
                        />
                     </div>
                     <div className="flex items-center justify-between space-x-3">
                        <div>{translate('currency')}</div>
                        <div className="text-right font-medium truncate">
                           {filteredWallet?.name || ''}
                        </div>
                     </div>
                     <div className="flex items-center justify-between space-x-3">
                        <div>Total balance</div>
                        <div className="text-right font-medium truncate">
                           {Decimal.format((Number(filteredWallet?.balance) + Number(filteredWallet?.locked) || 0), Number(filteredWallet?.fixed), ',')} {filteredWallet?.currency.toUpperCase()}
                        </div>
                     </div>
                     <div className="flex items-center justify-between space-x-3">
                        <div>Locked balance</div>
                        <div className="text-right font-medium truncate">
                           {Decimal.format(Number(filteredWallet?.locked) || 0, Number(filteredWallet?.fixed), ',')} {filteredWallet?.currency?.toUpperCase()}
                        </div>
                     </div>
                     <div className="flex items-center justify-between space-x-3">
                        <div>Available balance</div>
                        <div className="text-right font-medium truncate">
                           {Decimal.format(filteredWallet?.balance || 0, filteredWallet?.fixed, ',')} {filteredWallet?.currency?.toUpperCase()}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </LayoutProfile>
   )
})

const mapStateToProps = (state: RootState): ReduxProps => ({
   sonic: selectSonic(state),
   user: selectUserInfo(state),
   wallets: selectWallets(state),
   generateAddressLoading: selectGenerateAddressLoading(state),
   walletLoading: selectWalletsLoading(state),
   memberLevel: selectMemberLevels(state),
});
const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   fetchWallets: () => dispatch(walletsFetch()),
   generateAdress: payload => dispatch(walletsAddressFetch(payload)),
   fetchSuccess: payload => dispatch(alertPush(payload)),
});

export const Deposit = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(DepositFC) as FunctionComponent;
