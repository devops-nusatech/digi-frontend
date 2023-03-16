import React, {
   Fragment,
   FunctionComponent,
   useCallback,
   useEffect,
   useMemo,
   useState
} from 'react';
import {
   RouterProps,
   withRouter
} from 'react-router';
import { compose } from 'redux';
import {
   connect,
   MapDispatchToPropsFunction
} from 'react-redux';
import {
   Combobox,
   Transition
} from '@headlessui/react';
import {
   Button,
   InputGroup,
   LayoutProfile,
   Portal,
   ProfileSidebar,
   TableBeneficiary,
   Listbox,
   Decimal,
   Label,
   InputOtp,
   Skeleton,
} from 'components';
import {
   useModal,
   useForm
} from 'hooks';
import { toast } from 'react-toastify';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';
import {
   copyToClipboard,
   renderCurrencyIcon,
   setDocumentTitle
} from 'helpers';
import {
   alertPush,
   beneficiariesActivate,
   BeneficiariesCreate,
   beneficiariesCreate,
   beneficiariesDelete,
   beneficiariesResendPin,
   BeneficiaryBank,
   MemberLevels,
   RootState,
   selectBeneficiariesFetchLoading,
   selectBeneficiariesCreateLoading,
   selectBeneficiariesCreateSuccess,
   selectBeneficiariesDeleteLoading,
   selectBeneficiariesDeleteSuccess,
   selectMemberLevels,
   selectUserInfo,
   selectWallets,
   User,
   Wallet,
   walletsFetch,
   Beneficiary,
   selectBeneficiariesCreate,
   selectBeneficiariesActivateLoading,
   selectBeneficiariesActivateSuccess,
   selectBeneficiariesResendPinLoading
} from 'modules';
import { DEFAULT_WALLET } from '../../constants';
// import { validateBeneficiaryAddress } from 'helpers/validateBeneficiaryAddress';

import { validate, getCurrencies } from 'multicoin-address-validator'

type ModalType = 'fiat' | 'coin' | '';

type State = {
   currency?: string;
   accountName: string;
   accountNumber: string;
   bank?: string;
   network?: string;
   address: string;
   label: string;
   description?: string;
   destinationTag?: string;
}

const people = [
   { id: 1, name: 'Durward Reynolds', unavailable: false },
   { id: 2, name: 'Kenton Towne', unavailable: false },
   { id: 3, name: 'Therese Wunsch', unavailable: false },
   { id: 4, name: 'Benedict Kessler', unavailable: true },
   { id: 5, name: 'Katelyn Rohan', unavailable: false },
];

type ReduxProps = {
   wallets: Wallet[];
   beneficiariesLoading: boolean;
   beneficiary: Beneficiary;
   beneficiariesCreateLoading: boolean;
   beneficiariesCreateSuccess: boolean;
   beneficiariesDeleteLoading: boolean;
   beneficiariesDeleteSuccess: boolean;
   beneficiariesActivateLoading: boolean;
   beneficiariesActivateSuccess: boolean;
   beneficiariesResendLoading: boolean;
   memberLevels?: MemberLevels;
   user: User;
}

type DispatchProps = {
   fecthWallets: typeof walletsFetch;
   createBeneficiary: typeof beneficiariesCreate;
   activateBeneficiary: typeof beneficiariesActivate;
   deleteBeneficiary: typeof beneficiariesDelete;
   resendPinBeneficiary: typeof beneficiariesResendPin;
   fetchSuccess: typeof alertPush;
}

type BeneficiariesProps = ReduxProps & DispatchProps & RouterProps & IntlProps;

const BeneficiariesFC = ({
   wallets,
   beneficiariesLoading,
   beneficiary,
   beneficiariesCreateLoading,
   beneficiariesCreateSuccess,
   beneficiariesDeleteLoading,
   beneficiariesDeleteSuccess,
   beneficiariesActivateLoading,
   beneficiariesActivateSuccess,
   beneficiariesResendLoading,
   memberLevels,
   user,
   fecthWallets,
   createBeneficiary,
   activateBeneficiary,
   deleteBeneficiary,
   resendPinBeneficiary,
   fetchSuccess,
   history,
   intl
}: BeneficiariesProps) => {
   const filteredWalletCoin = wallets.filter(wallet => wallet.type === 'coin');
   const defaultWallet: Wallet = wallets.find(wallet => wallet.currency === 'usdt') || filteredWalletCoin[0] || DEFAULT_WALLET;

   const { isShow, toggle } = useModal();
   // const [openCreate, setOpenCreate] = useState(false);
   // const [openActivate, setOpenActivate] = useState(false);
   const [isShow2, setIsShow2] = useState(false);
   const [modalType] = useState<ModalType>('coin');

   const [coinAddressValid, setCoinAddressValid] = useState(false);

   const [asset, setAsset] = useState(filteredWalletCoin)
   const [selectedAsset, setSelectedAsset] = useState<Wallet>(defaultWallet);
   const [searchAsset, setSearchAsset] = useState('');
   const [selectedNetwork, setSelectedNetwork] = useState<{ [key: string]: any }>(selectedAsset.networks[0]);
   const [selected, setSelected] = useState(people[0]);
   const [pin, setPin] = useState('');

   const assets = asset.filter(asset => asset.networks.length);

   const filteredWallets = searchAsset === ''
      ? assets
      : assets
         .filter(wallet =>
            wallet.name
               .toLowerCase()
               .replace(/\s+/g, '')
               .includes(searchAsset.toLowerCase().replace(/\s+/g, ''))
            ||
            wallet.currency
               .toLowerCase()
               .replace(/\s+/g, '')
               .includes(searchAsset.toLowerCase().replace(/\s+/g, ''))
         );

   const [{
      accountName,
      accountNumber,
      address,
      label,
      description,
      destinationTag
   }, setForm, setNewForm] = useForm<State>({
      accountName: '',
      accountNumber: '',
      bank: '',
      address: '',
      label: '',
      description: '',
      destinationTag: '',
   });

   // const formattedNetwork = modalType === 'coin' && wallets.find(wallet => wallet.type === modalType)?.networks.find(network => network)?.protocol;

   useEffect(() => {
      setDocumentTitle('Beneficiaries');
      setSelectedAsset(defaultWallet);
      setSelectedNetwork(selectedAsset.networks[0]);
   }, []);

   useEffect(() => {
      if (!wallets.length) {
         fecthWallets()
      }
   }, [wallets]);

   const toggle2 = () => setIsShow2(!isShow2);
   // const handleShowCreate = () => setOpenCreate(true);
   // const handleShowActivate = () => setOpenActivate(true);
   // const handleCloseCreate = () => setOpenCreate(false);
   // const handleCloseActivate = () => setOpenActivate(false);

   // const handleShowModalCreateBeneficiary = (type: ModalType) => {
   //    setModalType(type);
   //    toggle2();
   // }

   const handleShowModalCreateBeneficiary = () => {
      setAsset(filteredWalletCoin);
      setSelectedAsset(defaultWallet);
      setSelectedNetwork(defaultWallet.networks[0]);
      toggle();
   }

   const resetField = () => {
      setNewForm({
         address: '',
         label: '',
         description: ''
      });
      setCoinAddressValid(false);
   }

   const handleCopy = (url: string, type: string) => {
      copyToClipboard(url);
      toast.info(`${type} Copied`);
   };

   const renderIconCopied = (title: string) => (
      <button
         className="cursor-copy group"
         onClick={() => handleCopy(address, title)}
         title="Address referral"
      >
         <svg className="w-6 h-6 group-hover:scale-110 fill-neutral4 group-hover:fill-neutral3 dark:group-hover:fill-neutral5 transition-transform duration-200">
            <use xlinkHref="#icon-copy" />
         </svg>
      </button>
   );

   const validateCoinAddressFormat = useCallback((value: string) => {
      const networkType = selectedNetwork.blockchain_key ? selectedNetwork.blockchain_key.split('-').pop() : '';
      const currency = String(selectedAsset?.networks.find(e => e.blockchain_key === selectedNetwork.blockchain_key)?.parent_id);
      const availableNetwork = getCurrencies().some(({ symbol }) => symbol === currency);
      if (availableNetwork) {
         const valid = validate(value, currency, networkType);
         setCoinAddressValid(valid ? false : true);
      }
   }, [selectedNetwork]);

   // const renderSelectTypeBeneficiaryModal = () => (
   //    <div className="pt-10 space-y-8">
   //       <div className="space-y-3">
   //          <div className="font-dm text-2xl leading-9 text-center tracking-custom">
   //             Select asset type
   //          </div>
   //          <div className="max-w-82 mx-auto text-center text-xs text-neutral4 leading-5">
   //             Please select the type of asset you want to add the beneficiaries to
   //          </div>
   //       </div>
   //       <div className="flex space-x-4">
   //          <Button
   //             text="Coin"
   //             onClick={() => {
   //                handleShowModalCreateBeneficiary('coin');
   //                setSelectedAsset(defaultWallet);
   //                setSelectedNetwork(selectedAsset.networks[0]);
   //             }}
   //          />
   //          <Button
   //             text="Fiat"
   //             variant="outline"
   //             onClick={() => handleShowModalCreateBeneficiary('fiat')}
   //          />
   //       </div>
   //    </div>
   // );

   // const formatedWallet = wallets.length ? wallets.find(wallet => wallet.currency === selectedAsset?.currency) : DEFAULT_WALLET;

   const renderSelectAsset = () => (
      <Combobox
         value={selectedAsset}
         onChange={setSelectedAsset}
      >
         <div className="relative">
            <Label label="Select currency" />
            <div className="relative mt-2.5">
               <Combobox.Input
                  className={({ open }) => `px-3.5 rounded-xl font-medium leading-12 outline-none border-2 ${open ? 'text-primary1 border-neutral4 dark:border-neutral4' : 'border-neutral6 dark:border-neutral3'} bg-none bg-transparent shadow-none transition ease-in-out duration-300 pr-12 h-12 w-full truncate`}
                  displayValue={(currency: { name: string }) => `${currency && currency.name || 'Nothing found...'}`}
                  onChange={({ target: { value } }) => setSearchAsset(value)}
                  onFocus={(e: { target: { select: () => void; }; }) => e.target.select()}
               />
               <Combobox.Button className="group absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg className="h-5 w-5 fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral6 transition-colors duration-300">
                     <use xlinkHref="#icon-search" />
                  </svg>
               </Combobox.Button>
            </div>
            <Transition
               as={Fragment}
               enter="transition-all"
               enterFrom="opacity-0 scale-75 -translate-y-5"
               enterTo="opacity-100 scale-100 translate-y-0"
               leave="transition-transform duration-300"
               leaveFrom="opacity-100 scale-100 translate-y-0"
               leaveTo="opacity-0 scale-75 -translate-y-5"
               afterLeave={() => setSearchAsset('')}
            >
               <Combobox.Options className="absolute max-h-72 w-full overflow-auto z-[9] mt-0.5 rounded-xl outline-none bg-neutral8 dark:bg-neutral1 border-2 border-neutral6 dark:border-neutral3 shadow-dropdown-2 dark:shadow-dropdown-3">
                  {filteredWallets.length === 0 && searchAsset !== '' ? (
                     <div className="px-3.5 py-2.5 leading-[1.4] transition-all duration-200">
                        Nothing found...
                     </div>
                  ) : (
                     filteredWallets.map(wallet => (
                        <Combobox.Option
                           key={wallet.currency}
                           className={({ active }) => `relative ${active ? 'bg-neutral7 dark:bg-neutral2' : ''} px-3.5 py-2.5 leading-[1.4] font-medium transition-all duration-200`}
                           value={wallet}
                        >
                           {({ selected, active }) => (
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 overflow-hidden pointer-events-none">
                                       <img
                                          src={renderCurrencyIcon(wallet.currency, wallet?.iconUrl)}
                                          className={`w-full ${renderCurrencyIcon(wallet.currency, wallet?.iconUrl)?.includes('http') ? 'object-cover bg-neutral8 polygon' : ''}`}
                                          alt={wallet.name}
                                          title={wallet.name}
                                       />
                                    </div>
                                    <div className={`block truncate ${selected ? 'text-primary1 font-medium' : ''}`}>
                                       {wallet?.name} <span className="text-neutral4">{wallet.currency.toUpperCase()}</span>
                                    </div>
                                 </div>
                                 <div className="text-neutral4">
                                    {Decimal.format(wallet.balance || 0, wallet.fixed, ',')} {wallet.currency.toUpperCase()}
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
   );
   const renderCreateBeneficiaryModal = () => (
      <>
         {modalType === 'coin' ? (
            <>
               {renderSelectAsset()}
               {selectedAsset.networks.length ? selectedAsset.networks.filter(e => e.protocol !== '').length && (
                  <Listbox
                     label="Network"
                     objectKey="protocol"
                     list={selectedNetwork}
                     lists={selectedAsset.networks}
                     onChange={setSelectedNetwork}
                     info={!selectedNetwork?.withdrawal_enabled || !selectedAsset.networks.length ? 'This network disabled' : ''}
                  />
               ) : (
                  <div className="text-primary4 text-x leading-relaxed font-medium">
                     Network disabled
                  </div>
               )}
               <InputGroup
                  id="address"
                  label="Address"
                  placeholder="Enter address"
                  value={address}
                  onChange={validateCoinAddressFormat}
                  onChangeAlt={setForm}
                  icon={renderIconCopied('Address')}
                  className="truncate"
                  withError={coinAddressValid}
                  info={coinAddressValid && 'Invalid Address' || ''}
               />
            </>
         ) : (
            <>
               <InputGroup
                  id="accountName"
                  label="account name"
                  value={accountName}
                  onChangeAlt={setForm}
                  placeholder="Enter account name"
               />
               <Listbox
                  label="Bank"
                  objectKey={'name'}
                  list={selected}
                  lists={people}
                  onChange={setSelected}
               />
               <InputGroup
                  id="accountNumber"
                  label="account number"
                  placeholder="Enter account number"
                  value={accountNumber}
                  onChangeAlt={setForm}
                  icon={renderIconCopied('Acoount number')}
                  className="truncate"
               />
            </>
         )}
         <InputGroup
            id="label"
            label="Label"
            value={label}
            onChangeAlt={setForm}
            placeholder="Enter label"
         />
         {modalType === 'coin' && (
            <InputGroup
               id="description"
               label="Description"
               value={description}
               onChangeAlt={setForm}
               placeholder="Enter Description (optional)"
            />
         )}
         {(isRipple || isStellar) && (
            <InputGroup
               id="destinationTag"
               label={isRipple ? 'Destination tag' : 'Memo'}
               value={destinationTag}
               onChangeAlt={setForm}
               placeholder={`Enter ${isRipple ? 'destination tag' : 'memo'} (require)`}
            />
         )}
         <div className="bg-neutral7 dark:bg-neutral3 py-5 px-6 rounded text-center">
            <div className="text-base leading-normal font-medium">
               Attention
            </div>
            <div className="text-neutral4">
               Please note that transaction to wrong network and address will cause your asset to permanently lost, so fill correctly.
            </div>
         </div>
         <Button
            text="Add beneficiary"
            disabled={isDisabled()}
            withLoading={beneficiariesCreateLoading}
            onClick={handleCreateBeneficiary}
         />
      </>
   );

   const isDisabled = () => {
      const withdrawEnabled = selectedNetwork?.withdrawal_enabled;
      return !withdrawEnabled || !address || !label || coinAddressValid;
   }

   const isRipple = useMemo(() => selectedAsset.currency === 'xrp', [selectedAsset.currency]);
   const isStellar = useMemo(() => selectedAsset.currency === 'xlm', [selectedAsset.currency]);

   const handleCreateBeneficiary = () => {
      const payloadCoin: BeneficiariesCreate['payload'] = {
         currency: selectedAsset.currency,
         blockchain_key: selectedNetwork.blockchain_key || '',
         name: label,
         data: JSON.stringify({
            address: (((isRipple || isStellar) && destinationTag) ? `${address}?dt=${destinationTag}` : address)
         }),
         ...(description && { description })
      }
      const dataBeneficiary: BeneficiaryBank = {
         full_name: '',
         account_number: '',
         bank_name: '',
         bank_swift_code: '',
         intermediary_bank_name: '',
         intermediary_bank_swift_code: '',
      }
      const payloadFiat: BeneficiariesCreate['payload'] = {
         currency: selectedAsset.currency,
         name: label,
         data: JSON.stringify(dataBeneficiary),
         ...(description && { description })
      }

      createBeneficiary(modalType === 'coin' ? payloadCoin : payloadFiat);
   }

   const translate = (id: string) => intl.formatMessage({ id });

   const handleConfirmActivate = () => activateBeneficiary({ id: beneficiary.id, pin });

   useEffect(() => {
      if (beneficiariesCreateSuccess) {
         if (isShow) {
            toggle();
            toggle2();
            resetField();
            console.log('Created Successfully');
         }
      }
      if (beneficiariesActivateSuccess) {
         if (isShow2) {
            toggle2();
            resetField();
            setPin('');
            console.log('Activate Successfully');
         }
      }
      if (pin.length === 6) {
         handleConfirmActivate();
      }
   }, [beneficiariesCreateSuccess, beneficiariesActivateSuccess, pin]);
   useEffect(() => {
      setSelectedNetwork(selectedAsset.networks[0]);
      resetField();
   }, [selectedAsset]);

   const renderTableBeneficiaries = useCallback(() => (
      <TableBeneficiary withSearch />
   ), [])

   return (
      <>
         <LayoutProfile
            title="Beneficiaries"
            withBreadcrumbs={{
               display: 'Home',
               href: '/',
               active: 'Beneficiaries',
            }}
         >
            <ProfileSidebar />
            <div className="grow p-4 md:px-8 md:py-10 lg:p-10 shadow-card2 rounded-2xl bg-neutral8 dark:bg-shade1" style={{ animationDuration: '100ms' }}>
               <div className="space-y-12">
                  <div className="flex items-center justify-between">
                     <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
                        List of beneficiaries
                     </div>
                     <Button
                        text="Create beneficiary"
                        size="normal"
                        width="noFull"
                        disabled={memberLevels?.withdraw.minimum_level !== user.level}
                        onClick={handleShowModalCreateBeneficiary}
                     />
                  </div>
                  {renderTableBeneficiaries()}
               </div>
            </div>
         </LayoutProfile>

         {/* Modal Select Type Asset */}
         {/* <Portal
            show={isShow}
            close={toggle}
         >
            {renderSelectTypeBeneficiaryModal()}
         </Portal> */}
         {/* End Modal Select Type Asset */}

         {/* Modal Create Beneficiary */}
         <Portal
            show={isShow}
            close={toggle}
            zIndexBackdrop={1045}
            zIndexContent={1046}
            title={`${modalType === 'coin' ? 'Coin' : 'Fiat'} Beneficiary`}
            onClick={toggle}
         >
            {renderCreateBeneficiaryModal()}
         </Portal>
         {/* End Modal Create Beneficiary */}

         {/* Modal Confirm Beneficiary */}
         <Portal
            show={isShow2}
            close={toggle2}
            onClick={toggle2}
         >
            <div className="pt-10 space-y-8">
               <div className="space-y-3">
                  <div className="font-dm text-2xl leading-9 text-center tracking-custom">
                     Beneficiaries Activation
                  </div>
                  <div className="max-w-82 mx-auto text-center text-xs text-neutral4 leading-5">
                     Save the new address, Please enter the code that we sent to your email.
                  </div>
               </div>
               <InputOtp
                  length={6}
                  className="flex -mx-2"
                  onChangeOTP={setPin}
               />
               <div className="space-y-3 text-center">
                  <Button
                     text={translate('page.body.profile.apiKeys.modal.btn.create')}
                     disabled={pin.length !== 6}
                     onClick={handleConfirmActivate}
                     withLoading={beneficiariesActivateLoading || beneficiariesDeleteLoading}
                  />
                  <button
                     className={beneficiariesResendLoading ? '' : 'text-primary1 font-medium hover:underline hover:underline-offset-4'}
                     disabled={beneficiariesResendLoading}
                     onClick={() => resendPinBeneficiary({ id: beneficiary.id })}
                  >
                     {!beneficiariesResendLoading ? 'Resend code' : (
                        <Skeleton width={100} height={20} />
                     )}
                  </button>
               </div>
            </div>
         </Portal>
         {/* End Modal Create Beneficiary */}
      </>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   wallets: selectWallets(state),
   beneficiariesLoading: selectBeneficiariesFetchLoading(state),
   beneficiary: selectBeneficiariesCreate(state),
   beneficiariesCreateLoading: selectBeneficiariesCreateLoading(state),
   beneficiariesCreateSuccess: selectBeneficiariesCreateSuccess(state),
   beneficiariesDeleteLoading: selectBeneficiariesDeleteLoading(state),
   beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
   beneficiariesActivateLoading: selectBeneficiariesActivateLoading(state),
   beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
   beneficiariesResendLoading: selectBeneficiariesResendPinLoading(state),
   memberLevels: selectMemberLevels(state),
   user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   fecthWallets: () => dispatch(walletsFetch()),
   createBeneficiary: payload => dispatch(beneficiariesCreate(payload)),
   activateBeneficiary: payload => dispatch(beneficiariesActivate(payload)),
   deleteBeneficiary: ({ id }) => dispatch(beneficiariesDelete({ id })),
   resendPinBeneficiary: ({ id }) => dispatch(beneficiariesResendPin({ id })),
   fetchSuccess: payload => dispatch(alertPush(payload)),
});

export const Beneficiaries = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(BeneficiariesFC) as FunctionComponent;
