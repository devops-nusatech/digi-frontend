import React, {
   Fragment,
   FunctionComponent,
   useEffect,
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
   selectMemberLevels,
   selectWallets,
   Wallet,
   walletsFetch
} from 'modules';
import { DEFAULT_WALLET } from '../../constants';
// import { validateBeneficiaryAddress } from 'helpers/validateBeneficiaryAddress';

import { validate, getCurrencies } from 'multicoin-address-validator'

type ModalType = 'fiat' | 'coin' | ''

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
   memberLevels?: MemberLevels;
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
   memberLevels,
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
   const defaultWallet: Wallet = wallets.find(wallet => wallet.currency === 'matic') || filteredWalletCoin[0] || DEFAULT_WALLET;

   const { isShow, toggle } = useModal();
   const [isShow2, setisShow2] = useState(false);
   const [modalType, setModalType] = useState<ModalType>('');

   const [coinAddressValid, setCoinAddressValid] = useState(false);
   // const [coinAddressClear, setCoinAddressClear] = useState(false);

   const [selectedAsset, setSelectedAsset] = useState<Wallet>(defaultWallet);
   const [searchAsset, setSearchAsset] = useState('');
   const filteredWallets = searchAsset === ''
      ? filteredWalletCoin
      : filteredWalletCoin
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
   const [selectedNetwork, setSelectedNetwork] = useState<{ [key: string]: any }>(selectedAsset.networks[0]);

   const [selected, setSelected] = useState(people[0]);

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
      console.log('setNewForm :>> ', setNewForm);
   }, []);

   useEffect(() => {
      if (!wallets.length) {
         fecthWallets()
      }
   }, [wallets]);

   const toggle2 = () => setisShow2(!isShow2);
   const handleShowModalCreateBeneficiary = (type: ModalType) => {
      setModalType(type);
      toggle2();
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

   const validateCoinAddressFormat = (value: string) => {
      // const networkType = selectedNetwork.blockchain_key ? selectedNetwork.blockchain_key.split('-').pop() : '';
      if (getCurrencies().some(currency => currency.symbol === selectedAsset.currency)) {
         const valid = validate(value, selectedAsset.currency, 'testnet');
         setCoinAddressValid(valid ? false : true);
      }
   };

   const renderSelectTypeBeneficiaryModal = () => (
      <div className="pt-10 space-y-8">
         <div className="space-y-3">
            <div className="font-dm text-2xl leading-9 text-center tracking-custom">
               Select asset type
            </div>
            <div className="max-w-82 mx-auto text-center text-xs text-neutral4 leading-5">
               Please select the type of asset you want to add the beneficiaries to
            </div>
         </div>
         <div className="flex space-x-4">
            <Button
               text="Coin"
               onClick={() => {
                  handleShowModalCreateBeneficiary('coin');
                  setSelectedAsset(defaultWallet);
                  setSelectedNetwork(selectedAsset.networks[0]);
               }}
            />
            <Button
               text="Fiat"
               variant="outline"
               onClick={() => handleShowModalCreateBeneficiary('fiat')}
            />
         </div>
      </div>
   );

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
               <Combobox.Options className="absolute max-h-72 w-full overflow-auto z-[9] mt-0.5 rounded-xl outline-none bg-neutral8 dark:bg-neutral1 border-2 border-neutral6 dark:border-neutral1 shadow-dropdown-2 dark:shadow-dropdown-3">
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
                                          className={`w-full ${renderCurrencyIcon(wallet.currency, wallet?.iconUrl).includes('http') ? 'object-cover bg-neutral8 polygon' : ''}`}
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
               {selectedAsset.networks.filter(e => e.protocol !== '').length && (
                  <Listbox
                     label="Network"
                     objectKey="protocol"
                     list={selectedNetwork}
                     lists={selectedAsset.networks}
                     onChange={setSelectedNetwork}
                  />
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
         {isRipple && (
            <InputGroup
               id="destinationTag"
               label="Description"
               value={destinationTag}
               onChangeAlt={setForm}
               placeholder="Enter destination tag (optional)"
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
            onClick={handleCreateBeneficiary}
         />
      </>
   );

   const isRipple = selectedAsset.currency === 'xrp';

   const handleCreateBeneficiary = () => {
      const payloadCoin: BeneficiariesCreate['payload'] = {
         currency: selectedAsset.currency,
         blockchain_key: selectedNetwork.blockchain_key || '',
         name: label,
         data: JSON.stringify({
            address: ((isRipple && destinationTag) ? `${address}?dt=${destinationTag}` : address)
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
                        onClick={toggle}
                     />
                  </div>
                  <TableBeneficiary withSearch />
               </div>
            </div>
         </LayoutProfile>

         {/* Modal Select Type Asset */}
         <Portal
            show={isShow}
            close={toggle}
         >
            {renderSelectTypeBeneficiaryModal()}
         </Portal>
         {/* End Modal Select Type Asset */}

         {/* Modal Create Beneficiary */}
         <Portal
            show={isShow2}
            close={toggle2}
            zIndexBackdrop={1045}
            zIndexContent={1046}
            title={`${modalType === 'coin' ? 'Coin' : 'Fiat'} Beneficiary`}
            onClick={toggle2}
         >
            {renderCreateBeneficiaryModal()}
         </Portal>
         {/* End Modal Create Beneficiary */}
      </>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   wallets: selectWallets(state),
   beneficiariesLoading: selectBeneficiariesFetchLoading(state),
   memberLevels: selectMemberLevels(state),
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
