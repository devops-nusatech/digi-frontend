import React, {
   Fragment,
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
import { Combobox, Transition } from '@headlessui/react';
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
import { arrayFilter, copyToClipboard, renderCurrencyIcon } from 'helpers';
import {
   Button,
   Decimal,
   PageTitle,
   Skeleton,
   InputGroup,
   QRCode,
   Nav,
   Label,
   ComboboxCurrency,
} from 'components';
import { platformCurrency } from 'api';
import { DEFAULT_WALLET } from '../../constants';

type ReduxProps = {
   user: User;
   wallets: Wallet[];
   generateAddressLoading?: boolean;
   walletLoading: boolean;
   memberLevel?: MemberLevels;
};

type OwnProps = {
   location: {
      state: Wallet;
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
      const defaultWallet: Wallet =
         wallets.find(e => e.currency === platformCurrency()?.toLowerCase()) ||
         DEFAULT_WALLET;

      const [selected, setSelected] = useState<Wallet>(
         location.state ? location.state : defaultWallet
      );
      const [networkActive, setNetworkActive] = useState(0);
      const [searchCurrency, setSearchCurrency] = useState('');
      const [assets, setAssets] = useState(wallets);

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
      }, [wallets]);

      const filteredWallets: Wallet[] =
         searchCurrency === ''
            ? assets
            : assets
            ? arrayFilter(assets, searchCurrency)
            : [];

      const formatedWallet = wallets.length
         ? wallets.find(wallet => wallet.currency === selected?.currency)
         : DEFAULT_WALLET;

      useEffect(() => {
         console.log('selected :>> ', selected);
         console.log('formatedWallet :>> ', formatedWallet);
      }, [selected, formatedWallet]);

      const type = formatedWallet?.type;
      const currencyActive = formatedWallet?.networks[networkActive];
      const depositAddress = formatedWallet?.deposit_addresses?.find(
         address => address.blockchain_key === currencyActive?.blockchain_key
      );
      let loadingFetchGenerate = false;

      const translate = useCallback(
         (id: string) => intl.formatMessage({ id }),
         [intl]
      );

      const handleGenerateAddress = useCallback(() => {
         generateAdress({
            currency: String(formatedWallet?.currency),
            blockchainKey: currencyActive?.blockchain_key,
         });
         fetchWallets();
         // eslint-disable-next-line react-hooks/exhaustive-deps
         loadingFetchGenerate = !!walletLoading;
      }, [
         generateAdress,
         formatedWallet,
         currencyActive,
         fetchWallets,
         walletLoading,
         loadingFetchGenerate,
      ]);

      const handleCopy = useCallback(
         (url: string, type: string) => {
            copyToClipboard(url);
            fetchSuccess({ message: [`${type} Copied`], type: 'success' });
         },
         [fetchSuccess, copyToClipboard]
      );

      const isDisabled = useMemo(() => {
         const depositEnabled =
            formatedWallet?.networks[networkActive]?.deposit_enabled;
         return (
            !formatedWallet ||
            formatedWallet?.name === '' ||
            !depositEnabled ||
            loadingFetchGenerate
         );
      }, [formatedWallet, loadingFetchGenerate, networkActive]);

      const renderAddressAvailable = useMemo(
         () => (
            <div className="flex items-center space-x-12">
               <div>
                  <div className="h-40 w-40 rounded-lg border-2 border-dashed border-primary1 p-4">
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
                           onClick={() =>
                              handleCopy(
                                 depositAddress?.address || '',
                                 'Address'
                              )
                           }
                           className="h-6 w-6 -translate-x-0.5 cursor-copy fill-neutral4 group-hover:fill-neutral2">
                           <use xlinkHref="#icon-copy" />
                        </svg>
                     }
                  />
               </div>
            </div>
         ),
         [depositAddress, handleCopy]
      );

      const renderAddressSkeleton = useMemo(
         () => (
            <div className="flex items-center space-x-12">
               <div>
                  <div className="h-40 w-40 grow rounded-lg border-2 border-dashed border-primary1 p-4">
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
         ),
         []
      );

      const renderButtonGenerated = useMemo(
         () => (
            <Button
               text={
                  formatedWallet?.networks?.length
                     ? translate('deposit.content.button.enabled')
                     : translate('deposit.content.button.disabled')
               }
               disabled={isDisabled || generateAddressLoading}
               onClick={handleGenerateAddress}
               withLoading={generateAddressLoading || loadingFetchGenerate}
            />
         ),
         [
            formatedWallet,
            isDisabled,
            generateAddressLoading,
            handleGenerateAddress,
            loadingFetchGenerate,
            translate,
         ]
      );

      return (
         <PageTitle
            title="Deposit"
            withBreadcrumbs={{
               display: 'Wallets',
               href: '/wallets',
               active: 'Deposit',
            }}>
            <div className="flex space-x-10">
               <div className="w-2/3">
                  <div className="space-y-8 rounded-2xl bg-neutral8 p-10 shadow-card dark:bg-shade1">
                     <ComboboxCurrency
                        onChange={currency => console.log('currency', currency)}
                        displayValue="name"
                     />
                     <Combobox
                        value={selected}
                        onChange={setSelected}>
                        <div className="relative">
                           <Label label="Select currency" />
                           <div className="relative mt-2.5">
                              <Combobox.Input
                                 className={({ open }) =>
                                    `${
                                       open ? 'text-primary1' : ''
                                    } h-12 w-full rounded-xl border-2 border-neutral6 bg-transparent bg-none px-3.5 pr-12 font-medium leading-12 outline-none transition duration-300 ease-in-out focus:border-neutral4 dark:border-neutral3 dark:focus:border-neutral4`
                                 }
                                 displayValue={(currency: { name: string }) =>
                                    typeof currency?.name === 'undefined'
                                       ? '~ Select currency ~'
                                       : currency.name
                                 }
                                 onChange={({ target: { value } }) =>
                                    setSearchCurrency(value)
                                 }
                              />
                              <Combobox.Button
                                 className="group absolute inset-y-0 right-0 flex items-center pr-2"
                                 onClick={() =>
                                    !assets.length && setAssets(wallets)
                                 }>
                                 <svg className="h-5 w-5 fill-neutral4 transition-colors duration-300 group-hover:fill-neutral2 dark:group-hover:fill-neutral6">
                                    <use xlinkHref="#icon-search" />
                                 </svg>
                              </Combobox.Button>
                           </div>
                           <Transition
                              as={Fragment}
                              enter="transition ease-in duration-100"
                              enterFrom="opacity-0 -translate-y-20 scale-50"
                              enterTo="opacity-100 translate-y-0 scale-100"
                              leave="transition ease-out duration-200"
                              leaveFrom="opacity-100 translate-y-0 scale-100"
                              leaveTo="opacity-0 -translate-y-20 scale-50"
                              afterLeave={() => {
                                 setSearchCurrency('');
                                 setNetworkActive(0);
                              }}>
                              <Combobox.Options className="absolute z-[9] mt-0.5 max-h-[252px] w-full overflow-auto rounded-xl border-2 border-neutral6 bg-neutral8 shadow-dropdown-2 outline-none dark:border-neutral3 dark:bg-neutral1 dark:shadow-dropdown-3">
                                 {filteredWallets.length === 0 &&
                                 searchCurrency !== '' ? (
                                    <div className="relative cursor-default select-none px-4 py-2 text-neutral4">
                                       Nothing found...
                                    </div>
                                 ) : (
                                    filteredWallets.map(wallet => (
                                       <Combobox.Option
                                          key={wallet.currency}
                                          className={({ active }) =>
                                             `relative ${
                                                active
                                                   ? 'bg-neutral7 dark:bg-neutral2'
                                                   : ''
                                             } px-3.5 py-2.5 font-medium leading-[1.4] transition-all duration-200`
                                          }
                                          value={wallet}>
                                          {({ selected, active }) => (
                                             <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                   <div className="pointer-events-none h-8 w-8 overflow-hidden">
                                                      <img
                                                         className={
                                                            renderCurrencyIcon(
                                                               wallet.currency,
                                                               wallet?.iconUrl
                                                            ).includes('http')
                                                               ? 'polygon bg-neutral8 object-cover'
                                                               : ''
                                                         }
                                                         src={renderCurrencyIcon(
                                                            wallet.currency,
                                                            wallet?.iconUrl
                                                         )}
                                                         alt={wallet.name}
                                                         title={wallet.name}
                                                      />
                                                   </div>
                                                   <div
                                                      className={`block truncate ${
                                                         selected
                                                            ? 'font-medium text-primary1'
                                                            : 'font-normal'
                                                      } group-hover:font-medium`}>
                                                      {wallet?.name}{' '}
                                                      <span className="font-normal text-neutral4">
                                                         {wallet.currency.toUpperCase()}
                                                      </span>
                                                   </div>
                                                </div>
                                                <div className="font-normal text-neutral4">
                                                   {Decimal.format(
                                                      wallet.balance || 0,
                                                      wallet.fixed,
                                                      ','
                                                   )}{' '}
                                                   {wallet.currency.toUpperCase()}
                                                </div>
                                             </div>
                                          )}
                                       </Combobox.Option>
                                    ))
                                 )}
                              </Combobox.Options>
                           </Transition>
                        </div>
                     </Combobox>
                     <div className="space-y-2.5">
                        <Label
                           label={
                              type === 'coin' ? 'Pick network' : 'Select bank'
                           }
                        />
                        {!formatedWallet || formatedWallet.name === '' ? (
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
                        ) : formatedWallet.networks.length &&
                          formatedWallet.name !== '' &&
                          type === 'coin' ? (
                           <div className="flex space-x-4">
                              {formatedWallet.networks.map(
                                 ({ blockchain_key, protocol }, index) => (
                                    <>
                                       <Nav
                                          key={blockchain_key}
                                          title={protocol}
                                          isActive={networkActive === index}
                                          onClick={() =>
                                             setNetworkActive(index)
                                          }
                                          theme="grey"
                                       />
                                       {/* <Button
                                 key={network.blockchain_key}
                                 text={network.protocol}
                                 size="normal"
                                 width="noFull"
                                 rounded="lg"
                                 fontDM={false}
                                 variant={networkActive === index ? "primary" : "outline"}
                                 onClick={() => setNetworkActive(index)}
                              /> */}
                                    </>
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
                     <div className="space-y-2.5">
                        <Label label="Payment address" />
                        {formatedWallet?.name !== '' &&
                           formatedWallet?.type === 'coin' &&
                           (depositAddress?.state === 'pending'
                              ? renderAddressSkeleton
                              : depositAddress?.address
                              ? renderAddressAvailable
                              : renderButtonGenerated)}
                        {formatedWallet?.name !== '' &&
                           formatedWallet?.type === 'fiat' &&
                           renderButtonGenerated}
                     </div>
                     <div className="flex flex-col rounded-2xl bg-neutral7 px-6 py-4 dark:bg-neutral2">
                        <div className="font-medium leading-6">
                           Instruction of deposit
                        </div>
                        <ul className="list-outside list-decimal pl-3 text-xs leading-5">
                           {type === 'coin' ? (
                              <>
                                 <li>
                                    {formatedWallet?.currency.toUpperCase()}{' '}
                                    deposit will be into the account after the{' '}
                                    {currencyActive?.min_confirmations}{' '}
                                    confirmation, and it can be allowed to
                                    withdraw after the{' '}
                                    {Number(currencyActive?.min_confirmations) +
                                       2}{' '}
                                    confirmation.
                                 </li>
                                 <li>
                                    Minimum deposits are{' '}
                                    {Decimal.format(
                                       currencyActive?.min_deposit_amount,
                                       Number(formatedWallet?.fixed),
                                       ','
                                    )}{' '}
                                    {formatedWallet?.currency.toUpperCase()},
                                    and deposits will be not into the account if
                                    they are less the minimum.
                                 </li>
                                 <li>
                                    Please note that depositing other tokens to
                                    the address below will cause your asset to
                                    be permanent lost
                                 </li>
                              </>
                           ) : (
                              <li>
                                 Please note the minimum deposit is{' '}
                                 {Decimal.format(
                                    currencyActive?.min_deposit_amount,
                                    Number(formatedWallet?.fixed),
                                    ','
                                 )}{' '}
                                 {formatedWallet?.currency.toUpperCase()} and if
                                 you deposit below that amount, the deposit will
                                 not be credited to your account.
                              </li>
                           )}
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="w-1/3">
                  <div className="rounded-2xl bg-neutral8 px-6 py-10 shadow-card dark:bg-shade1">
                     <div className="space-y-3">
                        <Label
                           label={translate('deposit.content.right.title')}
                        />
                        <div className="pointer-events-none mx-auto h-20 w-20 overflow-hidden">
                           <img
                              className={`w-full ${
                                 renderCurrencyIcon(
                                    formatedWallet?.currency,
                                    formatedWallet?.iconUrl
                                 )?.includes('http')
                                    ? 'polygon bg-neutral8 object-cover'
                                    : ''
                              }`}
                              src={renderCurrencyIcon(
                                 formatedWallet?.currency,
                                 formatedWallet?.iconUrl
                              )}
                              alt={formatedWallet?.name || ''}
                              title={formatedWallet?.name || ''}
                           />
                        </div>
                        <div className="flex items-center justify-between space-x-3">
                           <div>{translate('currency')}</div>
                           <div className="truncate text-right font-medium">
                              {formatedWallet?.name || ''}
                           </div>
                        </div>
                        <div className="flex items-center justify-between space-x-3">
                           <div>Total balance</div>
                           <div className="truncate text-right font-medium">
                              {Decimal.format(
                                 Number(formatedWallet?.balance) +
                                    Number(formatedWallet?.locked) || 0,
                                 Number(formatedWallet?.fixed),
                                 ','
                              )}{' '}
                              {formatedWallet?.currency.toUpperCase()}
                           </div>
                        </div>
                        <div className="flex items-center justify-between space-x-3">
                           <div>Locked balance</div>
                           <div className="truncate text-right font-medium">
                              {Decimal.format(
                                 Number(formatedWallet?.locked) || 0,
                                 Number(formatedWallet?.fixed),
                                 ','
                              )}{' '}
                              {formatedWallet?.currency.toUpperCase()}
                           </div>
                        </div>
                        <div className="flex items-center justify-between space-x-3">
                           <div>Available balance</div>
                           <div className="truncate text-right font-medium">
                              {Decimal.format(
                                 Number(formatedWallet?.balance) || 0,
                                 Number(formatedWallet?.fixed),
                                 ','
                              )}{' '}
                              {formatedWallet?.currency.toUpperCase()}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </PageTitle>
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

export const DepositOld = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(DepositFC) as FunctionComponent;
