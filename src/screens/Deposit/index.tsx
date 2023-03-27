import React, {
   FunctionComponent,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import {
   walletsFetch,
   selectWallets,
   walletsAddressFetch,
   selectGenerateAddressLoading,
   alertPush,
   selectUserInfo,
   selectWalletsLoading,
   MemberLevels,
   selectMemberLevels,
} from 'modules';
import type { RootState, User, Wallet } from 'modules';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';
import { copyToClipboard, renderCurrencyIcon } from 'helpers';
import {
   Button,
   Decimal,
   LayoutProfile,
   Skeleton,
   InputGroup,
   QRCode,
   Nav,
   Label,
   ComboboxCurrency,
   IconCopy,
   TextBase,
   Accordion,
   AccordionData,
   RowDetail,
   IRowItem,
   Image,
   Scan,
   Col2,
} from 'components';
import { DEFAULT_WALLET } from '../../constants';

type DepositState = {
   currency: string;
   currentNetwork: number;
};

type ReduxProps = {
   user: User;
   wallets: Wallet[];
   generateAddressLoading?: boolean;
   walletLoading: boolean;
   memberLevel?: MemberLevels;
};

type OwnProps = {
   location: {
      state: {
         currency: string;
      };
   };
};

interface DispatchProps {
   fetchWallets: typeof walletsFetch;
   generateAdress: typeof walletsAddressFetch;
   fetchSuccess: typeof alertPush;
}

type DepositProps = ReduxProps &
   OwnProps &
   DispatchProps &
   RouterProps &
   IntlProps;

const DepositFC = memo(
   ({
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
      intl,
   }: DepositProps) => {
      useEffect(() => {
         if (user && user.level < 1 && user.state === 'pending') {
            push('/email-verification', { email: user.email });
         }
         if (
            user &&
            user.level <
               Number(
                  memberLevel &&
                     memberLevel?.deposit &&
                     memberLevel?.deposit?.minimum_level
               )
         ) {
            push('/wallets');
         }
      }, []);
      useEffect(() => {
         if (!wallets.length) {
            fetchWallets();
         }
      }, [wallets, fetchWallets]);

      const [state, setState] = useState<DepositState>({
         currency: '',
         currentNetwork: 0,
      });
      const { currency, currentNetwork } = state;

      const handleChangeCurrency = (currency: string) =>
         setState({
            ...state,
            currency,
            currentNetwork: 0,
         });
      const handleChangeCurrentNetwork = (currentNetwork: number) =>
         setState({
            ...state,
            currentNetwork,
         });

      const filteredWallet =
         (wallets &&
            wallets.filter(wallet => wallet?.currency === currency)[0]) ||
         DEFAULT_WALLET;
      const network = filteredWallet?.networks[currentNetwork];
      const depositAddress =
         filteredWallet?.deposit_addresses &&
         filteredWallet?.deposit_addresses?.find(
            e => e?.blockchain_key === network?.blockchain_key
         );

      let loadingFetchGenerate = false;

      const translate = useCallback(
         (id: string) => intl.formatMessage({ id }),
         [intl]
      );

      const handleGenerateAddress = useCallback(() => {
         generateAdress({ currency, blockchainKey: network?.blockchain_key });
         fetchWallets();
         // eslint-disable-next-line react-hooks/exhaustive-deps
         loadingFetchGenerate = !!walletLoading;
      }, [
         generateAdress,
         filteredWallet,
         fetchWallets,
         walletLoading,
         loadingFetchGenerate,
      ]);

      const handleCopy = useCallback(
         (url: string, type: string) => {
            copyToClipboard(url);
            fetchSuccess({ message: [`${type} Copied`], type: 'success' });
         },
         [fetchSuccess]
      );

      const isDisabled = useMemo(() => {
         const depositEnabled = network?.deposit_enabled;
         return (
            !filteredWallet ||
            filteredWallet?.name === '' ||
            !depositEnabled ||
            loadingFetchGenerate
         );
      }, [filteredWallet, loadingFetchGenerate, currentNetwork]);

      const isRipple = useMemo(() => currency === 'xrp', [currency]);
      const isStellar = useMemo(() => currency === 'xlm', [currency]);

      const renderAddressAvailable = useMemo(
         () => (
            <>
               <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                     label="Deposit address"
                     value={depositAddress?.address}
                     icon={
                        <IconCopy
                           title="Address"
                           value={depositAddress?.address!}
                        />
                     }
                     parentClassName={
                        isRipple || isStellar ? 'col-span-1' : 'col-span-2'
                     }
                  />
                  {(isRipple || isStellar) && (
                     <InputGroup
                        label={isRipple ? 'Distination tag' : 'Memo'}
                        value={depositAddress?.address?.split('?dt=').pop()}
                        icon={
                           <IconCopy
                              title={`${isRipple ? 'Destination tag' : 'Memo'}`}
                              value={
                                 depositAddress?.address?.split('?dt=').pop()!
                              }
                           />
                        }
                     />
                  )}
               </div>
               <Scan
                  childrenButton={
                     <Button
                        text="Scan address"
                        className="pointer-events-none mt-12"
                        variant="outline"
                        width="noFull"
                     />
                  }>
                  <QRCode
                     data={depositAddress?.address || ''}
                     dimensions={116}
                  />
               </Scan>
            </>
         ),
         [depositAddress, handleCopy]
      );

      const renderAddressSkeleton = useMemo(
         () => (
            <>
               <Col2>
                  <div
                     className={`space-y-2.5 ${
                        isRipple || isStellar ? '' : 'col-span-2'
                     }`}>
                     <Skeleton
                        height={16.5}
                        width={120}
                     />
                     <Skeleton
                        rounded="xl"
                        height={48}
                        isWithFull
                     />
                  </div>
                  {(isRipple || isStellar) && (
                     <div className="space-y-2.5">
                        <Skeleton
                           height={16.5}
                           width={120}
                        />
                        <Skeleton
                           rounded="xl"
                           height={48}
                           isWithFull
                        />
                     </div>
                  )}
               </Col2>
               <Scan
                  childrenButton={
                     <Skeleton
                        rounded="20"
                        height={48}
                        isWithFull
                     />
                  }>
                  <Skeleton
                     rounded="lg"
                     height={118}
                     width={118}
                  />
               </Scan>
            </>
         ),
         [isRipple, isStellar]
      );

      const renderButtonGenerate = useMemo(
         () => (
            <div className="text-center">
               <Button
                  text={
                     network
                        ? translate('deposit.content.button.enabled')
                        : translate('deposit.content.button.disabled')
                  }
                  disabled={isDisabled || generateAddressLoading}
                  onClick={handleGenerateAddress}
                  withLoading={generateAddressLoading || loadingFetchGenerate}
                  width="noFull"
               />
            </div>
         ),
         [
            network,
            isDisabled,
            generateAddressLoading,
            handleGenerateAddress,
            loadingFetchGenerate,
            translate,
         ]
      );

      const accordionItems = useMemo<AccordionData[]>(
         () => [
            {
               title: 'Instruction of deposit',
               content: (
                  <ul className="list-outside list-decimal text-neutral4">
                     {filteredWallet.type === 'coin' ? (
                        <>
                           <li>
                              {filteredWallet?.currency.toUpperCase()} deposit
                              will be into the account after the{' '}
                              {network?.min_confirmations} confirmation, and it
                              can be allowed to withdraw after the{' '}
                              {network?.min_confirmations! + 2} confirmation.
                           </li>
                           <li>
                              Minimum deposits are{' '}
                              {Decimal.format(
                                 network?.min_deposit_amount,
                                 filteredWallet?.fixed,
                                 ','
                              )}{' '}
                              {filteredWallet?.currency.toUpperCase()}, and
                              deposits will be not into the account if they are
                              less the minimum.
                           </li>
                           <li>
                              Please note that depositing other tokens to the
                              address below will cause your asset to be
                              permanent lost
                           </li>
                        </>
                     ) : (
                        <li>
                           Please note the minimum deposit is{' '}
                           {Decimal.format(
                              network?.min_deposit_amount,
                              filteredWallet?.fixed,
                              ','
                           )}{' '}
                           {filteredWallet?.currency.toUpperCase()} and if you
                           deposit below that amount, the deposit will not be
                           credited to your account.
                        </li>
                     )}
                  </ul>
               ),
            },
         ],
         [filteredWallet, network]
      );

      const rowDetails = useMemo<Array<IRowItem>>(
         () => [
            {
               left: translate('currency'),
               right: filteredWallet?.name || '',
            },
            {
               left: 'Total balance',
               right: `${Decimal.format(
                  Number(filteredWallet?.balance) +
                     Number(filteredWallet?.locked) || 0,
                  filteredWallet?.fixed,
                  ','
               )} ${filteredWallet?.currency.toUpperCase()}`,
            },
            {
               left: 'Locked balance',
               right: `${Decimal.format(
                  filteredWallet?.locked || 0,
                  filteredWallet?.fixed,
                  ','
               )} ${filteredWallet?.currency?.toUpperCase()}`,
            },
            {
               left: 'Available balance',
               right: `${Decimal.format(
                  filteredWallet?.balance || 0,
                  filteredWallet?.fixed,
                  ','
               )} ${filteredWallet?.currency?.toUpperCase()}`,
            },
         ],
         [translate, filteredWallet]
      );

      return (
         <LayoutProfile
            title="Deposit"
            withBreadcrumbs={{
               display: 'Wallets',
               href: '/wallets',
               active: 'Deposit',
            }}>
            <div className="flex w-full gap-10 lg-max:flex-wrap">
               <div className="w-full lg:w-3/5 lg2:w-2/3">
                  <div className="space-y-8 rounded-2xl bg-neutral8 p-10 shadow-card dark:bg-shade1">
                     <div className="grid grid-cols-1 gap-4">
                        <ComboboxCurrency
                           onChange={handleChangeCurrency}
                           displayValue="name"
                           defaultValue={location.state?.currency}
                           withBalance={false}
                        />
                        {/* <AdibDropdown
                        label="Select network"
                        onChange={e => console.log('e :>> ', filteredWallet.networks.map((p, i) => p.protocol.toUpperCase() === e?.toUpperCase()))}
                        data={
                           filteredWallet.networks.map(({ protocol }) => protocol)
                        }
                     /> */}
                     </div>
                     <div className="space-y-2.5">
                        <Label
                           label={
                              filteredWallet.type === 'coin'
                                 ? 'Pick network'
                                 : 'Select bank'
                           }
                        />
                        {!filteredWallet || filteredWallet.name === '' ? (
                           <div className="flex space-x-4">
                              <Skeleton
                                 height={40}
                                 width={71.98}
                                 rounded="lg"
                              />
                              <Skeleton
                                 height={40}
                                 width={71.98}
                                 rounded="lg"
                              />
                              <Skeleton
                                 height={40}
                                 width={71.98}
                                 rounded="lg"
                              />
                           </div>
                        ) : filteredWallet.networks.length &&
                          filteredWallet.name !== '' &&
                          filteredWallet.type === 'coin' ? (
                           <div className="flex space-x-4">
                              {filteredWallet.networks.map(
                                 ({ blockchain_key, protocol }, index) => (
                                    <Nav
                                       key={blockchain_key}
                                       title={protocol.toUpperCase()}
                                       isActive={currentNetwork === index}
                                       onClick={() =>
                                          handleChangeCurrentNetwork(index)
                                       }
                                       theme="grey"
                                    />
                                 )
                              )}
                           </div>
                        ) : (
                           <div className="flex items-center space-x-3 rounded-lg bg-secondary3 bg-opacity-20 px-3 py-2">
                              <span className="text-3xl font-bold text-primary4">
                                 &#9888;
                              </span>
                              <div>{translate('deposit.content.disabled')}</div>
                           </div>
                        )}
                     </div>
                     {filteredWallet?.name !== '' &&
                        filteredWallet?.type === 'coin' &&
                        (depositAddress?.state === 'pending'
                           ? renderAddressSkeleton
                           : depositAddress?.address
                           ? renderAddressAvailable
                           : renderButtonGenerate)}
                     {filteredWallet?.name !== '' &&
                        filteredWallet?.type === 'fiat' &&
                        renderButtonGenerate}
                     {(filteredWallet.virtual_account?.length! > 0 ||
                        filteredWallet.deposit_addresses?.length! > 0) && (
                        <Accordion
                           items={accordionItems}
                           withNumber={false}
                        />
                     )}
                  </div>
               </div>
               <div className="w-full lg:w-2/5 lg2:w-1/3">
                  <div className="rounded-2xl bg-neutral8 p-10 shadow-card dark:bg-shade1">
                     <div className="space-y-3">
                        <TextBase
                           text={translate('deposit.content.right.title')}
                        />
                        <div className="pointer-events-none mx-auto h-20 w-20 overflow-hidden">
                           <Image
                              className={`w-full ${
                                 renderCurrencyIcon(
                                    filteredWallet?.currency,
                                    filteredWallet?.iconUrl
                                 )?.includes('http')
                                    ? 'polygon bg-neutral8 object-cover'
                                    : ''
                              }`}
                              src={renderCurrencyIcon(
                                 filteredWallet?.currency,
                                 filteredWallet?.iconUrl
                              )}
                              height={80}
                              width={80}
                              alt={filteredWallet?.name || ''}
                              title={filteredWallet?.name || ''}
                           />
                        </div>
                        <RowDetail items={rowDetails} />
                     </div>
                  </div>
               </div>
            </div>
         </LayoutProfile>
      );
   }
);

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   wallets: selectWallets(state),
   generateAddressLoading: selectGenerateAddressLoading(state),
   walletLoading: selectWalletsLoading(state),
   memberLevel: selectMemberLevels(state),
});
const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   fetchWallets: () => dispatch(walletsFetch()),
   generateAdress: payload => dispatch(walletsAddressFetch(payload)),
   fetchSuccess: payload => dispatch(alertPush(payload)),
});

export const Deposit = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(DepositFC) as FunctionComponent;
