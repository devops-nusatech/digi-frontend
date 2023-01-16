import React, {
   FunctionComponent,
   memo,
   useEffect,
   useMemo,
   useRef,
   useState
} from 'react';
import { compose } from 'redux';
import {
   connect,
   MapDispatchToPropsFunction
} from 'react-redux';
import {
   RouterProps,
   withRouter
} from 'react-router';
import { injectIntl } from 'react-intl';
import {
   Button,
   CellDetail,
   Decimal,
   Dialog,
   InputGroup,
   LayoutProfile,
   ModalRequired,
   Nav,
   Portal,
   Skeleton
} from 'components';
import { Listbox } from '@headlessui/react'
import {
   alertPush,
   beneficiariesFetch,
   beneficiariesCreate,
   beneficiariesDelete,
   beneficiariesResendPin,
   beneficiariesActivate,
   beneficiariesDataUpdate,
   selectBeneficiaries,
   selectBeneficiariesFetchLoading,
   selectWallets,
   walletsFetch,
   memberLevelsFetch,
   selectCurrentColorTheme,
   MemberLevels,
   selectMemberLevels,
   BeneficiariesCreate,
   BeneficiaryBank,
} from 'modules';
import type {
   Beneficiary,
   RootState,
   Wallet,
} from 'modules';
import {
   arrayFilter,
   copyToClipboard,
   renderCurrencyIcon,
   setDocumentTitle,
   truncateMiddle
} from 'helpers';
import {
   IcEmty,
   IcShorting
} from 'assets';
import { SearchIcon } from '@heroicons/react/outline';
import { IntlProps } from 'index';
import { useForm, useModal, useStep } from 'hooks';
import { toast } from 'react-toastify';
import { getCurrencies, validate } from 'multicoin-address-validator';

type State = {
   accountName: string;
   accountNumber: string;
   bank?: string;
   address: string;
   label: string;
   description?: string;
   destinationTag?: string;
}

type ReduxProps = {
   theme: string;
   wallets: Wallet[];
   beneficiaries: Beneficiary[];
   beneficiariesLoading: boolean;
   memberLevels?: MemberLevels;
}

type OwnProps = {
   location: {
      state: {
         wallet: Wallet;
      };
   };
}

interface DispatchProps {
   fecthWallets: typeof walletsFetch;
   fetchMemberLevel: typeof memberLevelsFetch;
   fetchBeneficiaries: typeof beneficiariesFetch;
   createBeneficiary: typeof beneficiariesCreate;
   updateBeneficiary: typeof beneficiariesDataUpdate;
   activateBeneficiary: typeof beneficiariesActivate;
   deleteBeneficiary: typeof beneficiariesDelete;
   resendPinBeneficiary: typeof beneficiariesResendPin;
   fetchSuccess: typeof alertPush;
}

type WithdrawalProps = ReduxProps & OwnProps & DispatchProps & RouterProps & IntlProps;

const WithdrawalFC = memo(({
   theme,
   wallets,
   beneficiaries,
   beneficiariesLoading,
   memberLevels,
   location,
   fecthWallets,
   fetchMemberLevel,
   fetchBeneficiaries,
   createBeneficiary,
   updateBeneficiary,
   activateBeneficiary,
   deleteBeneficiary,
   resendPinBeneficiary,
   fetchSuccess,
   history: { push },
   intl
}: WithdrawalProps) => {
   let userWallets = wallets.length ? wallets : [];

   const { isShow, toggle } = useModal();
   const [stepActive, setStepActive] = useState(1);
   const [walletActive, setWalletActive] = useState<Wallet['currency']>('');
   const [networkActive, setNetworkActive] = useState(0);
   const [searchMarket, setSearchMarket] = useState('');

   const [selectedNetwork, setSelectedNetwork] = useState(userWallets[0]?.networks[0]);
   const [listNetwork, setListNetwork] = useState(userWallets[0]?.networks);
   const [coinAddressValid, setCoinAddressValid] = useState(false);

   const [isOpenBeneficiary, setIsOpenBeneficiary] = useState(false);
   const [showModalSuccessPurchased, setShowModalSuccessPurchased] = useState(false);

   const [{ address, label, description, destinationTag }, setField] = useForm<State>({
      accountName: '',
      accountNumber: '',
      bank: '',
      address: '',
      label: '',
      description: '',
      destinationTag: '',
   });

   const mainRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      setDocumentTitle('Withdrawal')
      fetchMemberLevel();
   }, []);

   useEffect(() => {
      if (location.state?.wallet) {
         setStepActive(2);
         setWalletActive(location.state?.wallet && location.state?.wallet?.currency);
         window.scrollTo({
            top: mainRef.current?.offsetTop,
            behavior: 'smooth'
         });
      }
   }, [location.state]);

   useEffect(() => {
      if (!beneficiaries.length) {
         if (stepActive === 2) {
            fetchBeneficiaries();
         }
      }
      if (stepActive === 2) {
         setSelectedNetwork(userWallets[0]?.networks[0]);
         setListNetwork(userWallets[0]?.networks);
      }
   }, [stepActive]);

   useEffect(() => {
      if (listNetwork) {
         if (address) {
            validateCoinAddressFormat(address);
         }
      }
   }, [listNetwork]);

   useEffect(() => {
      if (!wallets.length) {
         fecthWallets()
      }
   }, [wallets]);

   const translate = (id: string) => intl.formatMessage({ id });

   if (searchMarket) {
      userWallets = userWallets.length ? arrayFilter(userWallets, searchMarket) : [];
   }

   if (walletActive) {
      userWallets = userWallets.length ? userWallets.filter(wallet => wallet.currency === walletActive) : [];
   }

   const handleStep = (currency: Wallet['currency'], i: number) => {
      setStepActive(i);
      setWalletActive(currency);
      window.scrollTo({
         top: mainRef.current?.offsetTop,
         behavior: 'smooth'
      });
   }
   const handleStepStep = (currency: Wallet['currency'], i: number) => {
      nextStep();
      setWalletActive(currency);
      window.scrollTo({
         top: mainRef.current?.offsetTop,
         behavior: 'smooth'
      });
   }

   const handleSetShowModalSuccessPurchased = () => setShowModalSuccessPurchased(!showModalSuccessPurchased);
   const handleShowBeneficiary = () => setIsOpenBeneficiary(prev => !prev);

   const renderAsset = useMemo(() => (
      <>
         <div className="mb-5 text-2xl leading-custom2 font-semibold tracking-custom1">
            Select crypto
         </div>
         <form className="relative shrink-0 mb-10">
            <InputGroup
               placeholder="Search coin"
               onChange={setSearchMarket}
               autoFocus
               icon={
                  <SearchIcon className="w-5 h-5 stroke-neutral4 transition-all duration-300" />
               }
            />
            <button
               type="button"
               className="absolute top-0 right-0 h-12 w-12 bg-none flex items-center justify-center"
            >
               <SearchIcon className="w-5 h-5 stroke-neutral4 transition-all duration-300" />
            </button>
         </form>
         <div className="overflow-x-auto">
            <table className="w-full table-auto">
               <thead>
                  <tr>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                        <div className="flex items-center space-x-1 cursor-pointer">
                           <div>#</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                        <div className="flex items-center space-x-1 cursor-pointer">
                           <div>Name</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                        <div className="flex items-center space-x-1 cursor-pointer justify-end">
                           <div>Balance</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {userWallets.length ? userWallets.map((userWallet, index) => (
                     <tr
                        key={userWallet.currency}
                        style={{ transition: 'background .2s' }}
                        className="group"
                        onClick={() => {
                           if ((userWallet.type === 'fiat' && Number(memberLevels?.withdraw.minimum_level) < 4)) {
                              toggle();
                           } else {
                              handleStep(userWallet.currency, 2);
                           }
                        }}
                     >
                        <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs p-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                           <div className="flex space-x-2 items-center">
                              <svg className="w-4 h-4 fill-neutral4 hover:fill-secondary3 transition-all duration-300">
                                 <use xlinkHref="#icon-star-outline"></use>
                              </svg>
                              <div>{index + 1}</div>
                           </div>
                        </td>
                        <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                           <div className="flex space-x-3 items-center">
                              <div className="shrink-0 w-8">
                                 <img
                                    className={`w-full ${renderCurrencyIcon(userWallet.currency, userWallet.iconUrl).includes('http') ? 'polygon' : ''}`}
                                    src={renderCurrencyIcon(userWallet.currency, userWallet.iconUrl)}
                                    alt={userWallet.name}
                                    title={userWallet.name}
                                 />
                              </div>
                              <div className="flex items-center space-x-1">
                                 <div>{userWallet.name}</div>
                                 <div className="font-normal text-neutral4 uppercase">{userWallet.currency}</div>
                              </div>
                           </div>
                        </td>
                        <td className="rounded-r-xl p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                           <div>{Decimal.format(userWallet.balance, userWallet.fixed, ',')}</div>
                        </td>
                     </tr>
                  )) : (
                     <tr>
                        <td colSpan={3}>
                           <div className="min-h-96 flex flex-col items-center justify-center space-y-3 transition-transform duration-1000">
                              <IcEmty className={theme === 'dark' ? 'brightness-75' : ''} />
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
      </>
   ), [userWallets, setSearchMarket, searchMarket]);
   const renderAssetStep = useMemo(() => (
      <>
         <div className="mb-5 text-2xl leading-custom2 font-semibold tracking-custom1">
            Select crypto
         </div>
         <form className="relative shrink-0 mb-10">
            <InputGroup
               placeholder="Search coin"
               onChange={setSearchMarket}
               autoFocus
               icon={
                  <SearchIcon className="w-5 h-5 stroke-neutral4 transition-all duration-300" />
               }
            />
            <button
               type="button"
               className="absolute top-0 right-0 h-12 w-12 bg-none flex items-center justify-center"
            >
               <SearchIcon className="w-5 h-5 stroke-neutral4 transition-all duration-300" />
            </button>
         </form>
         <div className="overflow-x-auto">
            <table className="w-full table-auto">
               <thead>
                  <tr>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                        <div className="flex items-center space-x-1 cursor-pointer">
                           <div>#</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                        <div className="flex items-center space-x-1 cursor-pointer">
                           <div>Name</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                        <div className="flex items-center space-x-1 cursor-pointer justify-end">
                           <div>Balance</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {userWallets.length ? userWallets.map((userWallet, index) => (
                     <tr
                        key={userWallet.currency}
                        style={{ transition: 'background .2s' }}
                        className="group"
                        onClick={() => {
                           if ((userWallet.type === 'fiat' && Number(memberLevels?.withdraw.minimum_level) < 4)) {
                              toggle();
                           } else {
                              handleStepStep(userWallet.currency, 2);
                           }
                        }}
                     >
                        <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs p-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                           <div className="flex space-x-2 items-center">
                              <svg className="w-4 h-4 fill-neutral4 hover:fill-secondary3 transition-all duration-300">
                                 <use xlinkHref="#icon-star-outline"></use>
                              </svg>
                              <div>{index + 1}</div>
                           </div>
                        </td>
                        <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                           <div className="flex space-x-3 items-center">
                              <div className="shrink-0 w-8">
                                 <img
                                    className={`w-full ${renderCurrencyIcon(userWallet.currency, userWallet.iconUrl).includes('http') ? 'polygon' : ''}`}
                                    src={renderCurrencyIcon(userWallet.currency, userWallet.iconUrl)}
                                    alt={userWallet.name}
                                    title={userWallet.name}
                                 />
                              </div>
                              <div className="flex items-center space-x-1">
                                 <div>{userWallet.name}</div>
                                 <div className="font-normal text-neutral4 uppercase">{userWallet.currency}</div>
                              </div>
                           </div>
                        </td>
                        <td className="rounded-r-xl p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                           <div>{Decimal.format(userWallet.balance, userWallet.fixed, ',')}</div>
                        </td>
                     </tr>
                  )) : (
                     <tr>
                        <td colSpan={3}>
                           <div className="min-h-96 flex flex-col items-center justify-center space-y-3 transition-transform duration-1000">
                              <IcEmty className={theme === 'dark' ? 'brightness-75' : ''} />
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
      </>
   ), [userWallets, setSearchMarket, searchMarket]);

   const renderBeneficiary = useMemo(() => (
      <div className="space-y-8">
         <div className="flex items-center justify-between">
            <button
               type="button"
               onClick={() => {
                  setStepActive(1);
                  setNetworkActive(0);
                  setWalletActive('');
               }}
               className="group flex items-center text-2xl font-semibold leading-custom2 tracking-custom1"
            >
               <svg className="w-3.5 h-3.5 mr-4 fill-neutral4 group-hover:-translate-x-1 transition-all duration-300">
                  <use xlinkHref="#icon-arrow-prev" />
               </svg>
               List of beneficiaries
            </button>
            <div className="flex items-center text-base font-medium">
               {userWallets[0]?.name || ''}
               <img
                  src={renderCurrencyIcon(userWallets[0]?.currency, userWallets[0]?.iconUrl)}
                  className={`w-6 ml-3 ${renderCurrencyIcon(userWallets[0]?.currency, userWallets[0]?.iconUrl).includes('http') ? 'polygon' : ''}`}
                  alt={userWallets[0]?.name}
                  title={userWallets[0]?.name}
               />
            </div>
         </div>
         <div className="space-x-4 hidden">
            {userWallets[0]?.networks.map((network, index) => (
               <Button
                  key={network.blockchain_key}
                  text={network.protocol}
                  size="small"
                  width="noFull"
                  rounded="lg"
                  fontDM={false}
                  variant={networkActive === index ? "primary" : "outline"}
                  onClick={() => setNetworkActive(index)}
               />
            ))}
         </div>
         <div className="">
            <div className="flex space-x-4">
               {userWallets[0]?.networks.map((network, index) => (
                  <Nav
                     key={network.blockchain_key}
                     title={network.protocol}
                     onClick={() => setNetworkActive(index)}
                     theme="grey"
                     className="px-5"
                     isActive={networkActive === index ? true : false}
                  />
               ))}
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full table-auto">
               <thead>
                  <tr>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                        <div className="flex items-center space-x-1 cursor-pointer">
                           <div>#</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                        <div className="flex items-center space-x-1 cursor-pointer">
                           <div>Label</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                        <div className="flex items-center space-x-1 cursor-pointer">
                           <div onClick={() => setStepActive(3)}>Address</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                        <div className="flex items-center space-x-1 cursor-pointer">
                           <div>Status</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                     <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                        <div className="flex items-center space-x-1 cursor-pointer justify-end">
                           <div>Action</div>
                           <IcShorting className="fill-neutral4" />
                        </div>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {beneficiariesLoading ? (
                     <>
                        <tr>
                           <td colSpan={5} className="px-4 py-3 last:pb-0">
                              <Skeleton height={20} isWithFull rounded="md" />
                           </td>
                        </tr>
                        <tr>
                           <td colSpan={5} className="px-4 py-3 last:pb-0">
                              <Skeleton height={20} isWithFull rounded="md" />
                           </td>
                        </tr>
                        <tr>
                           <td colSpan={5} className="px-4 py-3 last:pb-0">
                              <Skeleton height={20} isWithFull rounded="md" />
                           </td>
                        </tr>
                     </>
                  ) : beneficiaries.length ? beneficiaries.map(({ id, name, data: { address }, state, currency }, index) => (
                     <tr
                        key={index}
                        style={{ transition: 'background .2s' }}
                        className="group"
                     // onClick={() => handleStep({ name, currency, balance, iconUrl, fixed, active }, 2)}
                     >
                        <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs p-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                           <div>{index + 1}</div>
                        </td>
                        <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                           <div>{name}</div>
                        </td>
                        <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                           <div>{truncateMiddle(String(address), 20)}</div>
                        </td>
                        <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                           <div>{state}</div>
                        </td>
                        <td className="rounded-r-xl p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                           <svg className="w-6 h-6 fill-primary4 transition-colors duration-300">
                              <use xlinkHref="#icon-close-circle" />
                           </svg>
                        </td>
                     </tr>
                  )) : (
                     <tr>
                        <td colSpan={5}>
                           <div className="min-h-96 flex flex-col items-center justify-center space-y-3">
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
         <div className="text-center">
            <Button
               text="Create beneficiary"
               width="noFull"
               onClick={handleShowBeneficiary}
            />
         </div>
      </div >
   ), [setStepActive, setNetworkActive, setWalletActive, userWallets, networkActive, beneficiaries, beneficiariesLoading, handleShowBeneficiary]);

   const renderWithdrawInfo = useMemo(() => (
      <>
         <div className="flex items-center justify-between mb-16">
            <button onClick={() => setStepActive(2)} type="button" className="group flex items-center text-2xl font-semibold leading-custom2 tracking-custom1">
               <svg className="w-3.5 h-3.5 mr-4 fill-neutral4 group-hover:-translate-x-1 transition-all duration-300">
                  <use xlinkHref="#icon-arrow-prev"></use>
               </svg>
               Withdraw info
            </button>
            <div className="flex items-center text-base font-medium">
               {userWallets[0]?.name || ''}
               <img
                  src={renderCurrencyIcon(userWallets[0]?.currency, userWallets[0]?.iconUrl)}
                  className={`w-6 ml-3 ${renderCurrencyIcon(userWallets[0]?.currency, userWallets[0]?.iconUrl).includes('http') ? 'polygon' : ''}`}
                  alt={userWallets[0]?.name}
               />
            </div>
         </div>
         <div className="space-y-12">
            <div className="flex py-6 px-9 rounded-2xl bg-neutral7 dark:bg-neutral2">
               <div className="w-1/2">
                  <div className="flex space-x-2.5">
                     <div className="flex justify-center items-center shrink-0 w-10 h-10 rounded-full bg-primary3">
                        <svg className="w-5 h-5 fill-neutral8">
                           <use xlinkHref="#icon-wallet"></use>
                        </svg>
                     </div>
                     <div>
                        <div className="text-xs text-neutral4 leading-custom4">
                           Available balance
                        </div>
                        <div className="font-medium uppercase">
                           {Decimal.format(userWallets[0]?.balance, userWallets[0]?.fixed, ',')} {userWallets[0]?.currency}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="w-1/2">
                  <div className="flex space-x-2.5">
                     <div className="flex justify-center items-center shrink-0 w-10 h-10 rounded-full bg-primary5 dark:bg-chart1">
                        <svg className="w-5 h-5 fill-neutral8">
                           <use xlinkHref="#icon-lock"></use>
                        </svg>
                     </div>
                     <div>
                        <div className="text-xs text-neutral4 leading-custom4">
                           Locked
                        </div>
                        <div className="font-medium uppercase">
                           {Decimal.format(userWallets[0]?.locked, userWallets[0]?.fixed, ',')} {userWallets[0]?.currency}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="space-y-8">
               <InputGroup
                  id="withdraw-address"
                  label="Withdraw address"
                  placeholder="xxxx xxxx xxxx xxxx"
                  disabled
               />
               <div className="flex space-x-4 justify-between">
                  <InputGroup
                     id="withdraw-amount"
                     label="Withdraw amount"
                     placeholder="0.0"
                     parentClassName="w-full"
                     autoFocus
                  />
                  <InputGroup
                     id="2fa-code"
                     label="2fa code"
                     placeholder="123456"
                     parentClassName="w-full"
                  />
               </div>
            </div>
            {/* <div className="space-y-4 py-6 px-9 rounded-2xl bg-neutral7 dark:bg-neutral2">
               <div className="flex flex-col md:flex-row justify-between space-x-4">
                  <div className="space-y-2">
                     <div className="text-base">
                        Available balance
                     </div>
                     <div className="text-2xl font-semibold leading-custom2 tracking-custom1 uppercase">
                        {Decimal.format(userWallets[0]?.balance, userWallets[0]?.fixed, ',')} {userWallets[0]?.currency}
                     </div>
                  </div>
                  <div className="md:text-right space-y-2">
                     <div className="text-base">
                        Total withdraw
                     </div>
                     <div className="text-2xl font-semibold leading-custom2 tracking-custom1 uppercase">
                        {Decimal.format(0, userWallets[0]?.fixed, ',')} {userWallets[0]?.currency}
                     </div>
                  </div>
               </div>
               <div className="h-0.5 w-full bg-dashed-b" />
               <div className="flex space-x-3 justify-between">
                  <div className="space-y-1">
                     <div className="text-neutral4">
                        Withdraw fee
                     </div>
                     <div className="text-base font-medium uppercase">
                        0,00000000 {userWallets[0]?.currency}
                     </div>
                  </div>
                  <div className="space-y-1">
                     <div className="text-neutral4">
                        Minimum withdraw
                     </div>
                     <div className="text-base font-medium uppercase">
                        0,00000000 {userWallets[0]?.currency}
                     </div>
                  </div>
                  <div className="space-y-1">
                     <div className="text-neutral4">
                        Daily limit
                     </div>
                     <div className="text-base font-medium uppercase">
                        0,00000000 {userWallets[0]?.currency}
                     </div>
                  </div>
               </div>
            </div> */}
            {/* <div className="text-base">You are about to withdraw 0.001499 {userWallets[0]?.currency.toUpperCase()} from Digiasset</div> */}
            <div className="space-y-3">
               <div className="flex justify-between pb-3 border-b border-neutral6 text-base font-medium dark:border-neutral3">
                  <div>Total</div>
                  <div className="uppercase">0,00000000 {userWallets[0]?.currency}</div>
               </div>
               <CellDetail
                  title="Fee"
                  value={`0.00050000 ${userWallets[0]?.currency}`}
               />
               <CellDetail
                  title="Minimum withdraw"
                  value={`200,000 ${userWallets[0]?.currency}`}
               />
               <CellDetail
                  title="Daily limit"
                  value={`200,000 ${userWallets[0]?.currency}`}
               />
            </div>
            <div className="flex justify-between mt-12">
               <Button
                  width="noFull"
                  text="Cancel"
                  variant="outline"
                  onClick={() => {
                     setStepActive(1)
                     setNetworkActive(0);
                     setWalletActive('');
                  }}
               />
               <Button
                  width="noFull"
                  text="I understand, continue"
                  onClick={handleSetShowModalSuccessPurchased}
               />
            </div>
         </div>
      </>
   ), [userWallets]);

   const isRipple = userWallets[0]?.currency === 'xrp';
   const handleCreateBeneficiary = () => {
      const payloadCoin: BeneficiariesCreate['payload'] = {
         currency: userWallets[0]?.currency,
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
         currency: userWallets[0]?.currency,
         name: label,
         data: JSON.stringify(dataBeneficiary),
         ...(description && { description })
      }

      createBeneficiary(userWallets[0]?.type === 'coin' ? payloadCoin : payloadFiat);
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
      if (getCurrencies().some(currency => currency.symbol === userWallets[0]?.currency)) {
         const valid = validate(value, userWallets[0]?.currency, 'testnet');
         setCoinAddressValid(valid ? false : true);
      }
   };
   const renderModalBeneficiary = useMemo(() => (
      <>
         {userWallets[0]?.type === 'coin' && (
            <>
               <Listbox
                  value={selectedNetwork}
                  onChange={setSelectedNetwork}
               >
                  <div className="relative">
                     <div className="space-y-2.5">
                        <div className="text-xs text-neutral5 leading-none font-bold uppercase">
                           Currency
                        </div>
                        <Listbox.Button className={({ open }) => `relative w-full h-12 pl-4 pr-12 shadow-input outline-none ${open ? 'shadow-dropdown-1' : 'dark:shadow-border-dark'} bg-neutral8 dark:bg-neutral2 rounded-xl border-none font-medium leading-12 text-left transition-shadow duration-200 before:content-[''] before:absolute before:top-1/2 before:right-2 before:h-6 before:w-6 before:-translate-y-1/2 before:rounded-full before:transition-transform before:duration-200 before:icon-arrow ${open ? 'before:rotate-180' : ''}`}>
                           <span className="block truncate font-medium">
                              {selectedNetwork?.protocol}
                           </span>
                        </Listbox.Button>
                     </div>
                     <Listbox.Options className={({ open }) => `absolute max-h-40 w-full overflow-auto z-[9] mt-0.5 rounded-xl outline-none bg-neutral8 dark:bg-neutral1 border-2 border-neutral6 dark:border-neutral1 shadow-dropdown-2 dark:shadow-dropdown-3 ${open ? 'opacity-100 visible scale-100 translate-y-0' : 'opacity-0 invisible scale-75 -translate-y-20'} transition-all duration-200`} style={{ transformOrigin: '50% 0' }}>
                        {listNetwork?.map((wallet, index) => (
                           <Listbox.Option
                              key={index}
                              className={({ active }) => `px-3.5 py-2.5 leading-[1.4] font-medium ${active ? 'bg-neutral7 dark:bg-neutral2' : ''} transition-all duration-200`}
                              value={wallet}
                           >
                              {({ selected }) => (
                                 <span className={`block truncate ${selected ? 'text-primary1' : ''}`}>
                                    {wallet.protocol}
                                 </span>
                              )}
                           </Listbox.Option>
                        ))}
                     </Listbox.Options>
                  </div>
               </Listbox>
               <InputGroup
                  id="address"
                  label="Address"
                  placeholder="1AF44SoxqtS5o4dLCzzwwJ9Js6AfknFvHb"
                  value={address}
                  onChange={validateCoinAddressFormat}
                  onChangeAlt={setField}
                  icon={renderIconCopied('Address')}
                  className="truncate"
                  withError={coinAddressValid}
                  info={coinAddressValid && 'Invalid Address' || ''}
               />
            </>
         )}
         <InputGroup
            id="label"
            label="Label"
            placeholder="Beneficiary name"
            value={label}
            onChangeAlt={setField}
         />
         {userWallets[0]?.type === 'coin' && (
            <InputGroup
               id="description"
               label="Description"
               placeholder="Description"
               value={description}
               onChangeAlt={setField}
            />
         )}
         {isRipple && (
            <InputGroup
               id="destinationTag"
               label="Description"
               value={destinationTag}
               onChangeAlt={setField}
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
            text="Create"
            onClick={handleCreateBeneficiary}
         />
      </>
   ), [selectedNetwork, setSelectedNetwork, userWallets, listNetwork, address, label, description, destinationTag, setField, handleCreateBeneficiary])

   const render = () => {
      switch (stepActive) {
         case 2:
            return renderBeneficiary;
         case 3:
            return renderWithdrawInfo;
         default:
            return renderAsset;
      }
   }

   const {
      currentStep,
      step,
      nextStep,
      prevStep,
      goToStep,
   } = useStep([
      renderAssetStep,
      <div>Step Kalih</div>,
      <div>Step Tigo</div>,
   ])

   return (
      <>
         <LayoutProfile
            title="Withdraw"
            withBreadcrumbs={{
               display: 'Wallets',
               href: '/wallets',
               active: 'Withdraw',
            }}
         >
            <div className="shrink-0 md-max:mb-6 lg-max:mb-8 mr-8 lg2:mr-12 1xl:mr-20 w-full lg:w-56 lg2:w-72 space-y-6 lg-max:hidden">
               <div className={`relative flex items-center space-x-4 h-12 px-2 rounded-3xl font-dm font-bold leading-custom3 transition-all duration-300 after:absolute after:content-[''] after:top-full after:left-5.75 after:h-6 after:border-l-2 after:border-dashed after:border-neutral5 ${(stepActive === 2 || stepActive === 3) && 'bg-neutral8 dark:bg-neutral2 dark:after:border-neutral4 shadow-step'}`}>
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary5 dark:border-chart1 ${(stepActive === 2 || stepActive === 3) && 'bidding__number bidding__number_dark'} after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:transition-opacity after:duration-200 transition-all duration-300`}>1</div>
                  <div>Select asset</div>
               </div>
               <div className={`relative flex items-center space-x-4 h-12 px-2 rounded-3xl font-dm font-bold leading-custom3 transition-all duration-300 after:absolute after:content-[''] after:top-full after:left-5.75 after:h-6 after:border-l-2 after:border-dashed after:border-neutral5 ${(stepActive === 1) && 'text-neutral4'} ${(stepActive === 3) && 'bg-neutral8 dark:bg-neutral2 dark:after:border-neutral4 shadow-step'}`}>
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${(stepActive === 2 || stepActive === 3) ? 'border-primary5 dark:border-chart1' : 'border-neutral6 dark:border-neutral4'} ${(stepActive === 3) && 'bidding__number bidding__number_dark'} after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:transition-opacity after:duration-200 transition-all duration-300`}>2</div>
                  <div>Select beneficiary</div>
               </div>
               <div className={`relative flex items-center space-x-4 h-12 px-2 rounded-3xl font-dm font-bold ${stepActive !== 3 && 'text-neutral4'} leading-custom3 transition-all duration-300`}>
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${stepActive === 3 ? 'border-primary5 dark:border-chart1' : 'border-neutral6 dark:border-neutral4'} transition-all duration-300`}>4</div>
                  <div>Withdraw info</div>
               </div>
            </div>
            <div
               ref={mainRef}
               className="grow p-4 md:px-8 md:py-10 lg:p-10 shadow-card2 rounded-2xl bg-neutral8 dark:bg-shade1"
               style={{ animationDuration: '100ms' }}
            >
               <div className="step">
                  <div className="">Ini {currentStep}</div>
                  {step}
                  <div className="flex space-x-4">
                     <Button text="Prev" onClick={prevStep} />
                     <InputGroup onChange={e => goToStep(Number(e))} />
                     <Button text="Next" onClick={nextStep} />
                  </div>
               </div>
               {render()}
            </div>
         </LayoutProfile>
         <ModalRequired
            show={isShow}
            close={toggle}
            push={push}
         />
         <Portal
            show={showModalSuccessPurchased}
            close={handleSetShowModalSuccessPurchased}
         >
            <div className="mt-10 space-y-8">
               <div className="text-5xl text-center font-dm font-bold leading-custom1 tracking-custom">Yay! 🎉</div>
               <div className="max-w-71.25 mx-auto text-center text-base font-medium leading-normal">
                  You successfully purchased <span className="text-primary5">0.020202 BTC</span>  from Digiasset
               </div>
               <div className="flex flex-wrap p-6 rounded-xl border border-neutral6">
                  <div className="mr-auto space-y-2.5">
                     <div className="text-neutral4">Status</div>
                     <div className="font-medium text-primary5">Completed</div>
                  </div>
                  <div className="space-y-2.5">
                     <div className="text-neutral4">Transaction ID</div>
                     <div className="font-medium">0msx836930...87r398</div>
                  </div>
               </div>
               <div className="flex space-x-4">
                  <Button
                     text="Trade"
                     onClick={() => push(`trading/${userWallets[0]?.currency || 'btcidr'}`)}
                     variant="outline"
                  />
                  <Button
                     text="Wallets"
                     onClick={() => push('/wallets')}
                  />
               </div>
            </div>
         </Portal>
         <Dialog
            isOpen={isOpenBeneficiary}
            setIsOpen={handleShowBeneficiary}
            title="Create Beneficiary"
         >
            {renderModalBeneficiary}
         </Dialog>
      </>
   );
});

const mapStateToProps = (state: RootState): ReduxProps => ({
   theme: selectCurrentColorTheme(state),
   wallets: selectWallets(state),
   beneficiaries: selectBeneficiaries(state),
   beneficiariesLoading: selectBeneficiariesFetchLoading(state),
   memberLevels: selectMemberLevels(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   fecthWallets: () => dispatch(walletsFetch()),
   fetchMemberLevel: () => dispatch(memberLevelsFetch()),
   fetchBeneficiaries: params => dispatch(beneficiariesFetch(params)),
   createBeneficiary: payload => dispatch(beneficiariesCreate(payload)),
   updateBeneficiary: payload => dispatch(beneficiariesDataUpdate(payload)),
   activateBeneficiary: payload => dispatch(beneficiariesActivate(payload)),
   deleteBeneficiary: id => dispatch(beneficiariesDelete(id)),
   resendPinBeneficiary: id => dispatch(beneficiariesResendPin(id)),
   fetchSuccess: payload => dispatch(alertPush(payload)),
});

export const WithdrawalStep = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(WithdrawalFC) as FunctionComponent;
