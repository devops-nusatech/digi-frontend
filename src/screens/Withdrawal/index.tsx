import React, {
   FunctionComponent,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from 'react';
import { compose } from 'redux';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps, withRouter } from 'react-router';
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
   Skeleton,
   Listbox,
   InputOtp,
   Image,
} from 'components';
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
   selectCurrentColorTheme,
   MemberLevels,
   selectMemberLevels,
   BeneficiariesCreate,
   BeneficiaryBank,
   selectBeneficiariesDeleteLoading,
   selectBeneficiariesDeleteSuccess,
   selectBeneficiariesCreateLoading,
   selectBeneficiariesCreateSuccess,
   selectBeneficiariesActivateLoading,
   selectBeneficiariesResendPinLoading,
   selectBeneficiariesActivateSuccess,
   selectBeneficiariesCreate,
   walletsWithdrawCcyFetch,
   WalletsWithdrawCcyFetch,
   withdrawLimitFetch,
   selectWithdrawLimit,
   WithdrawLimit,
   selectUserInfo,
   User,
   WithdrawLimits,
   selectWithdrawLimits,
   selectWithdrawSuccess,
   GroupMember,
} from 'modules';
import type { Beneficiary, RootState, Wallet } from 'modules';
import {
   arrayFilter,
   cleanPositiveFloatInput,
   copyToClipboard,
   precisionRegExp,
   renderCurrencyIcon,
   scrollTo,
   setDocumentTitle,
   truncateMiddle,
} from 'helpers';
import { IcEmty, IcShorting } from 'assets';
import { SearchIcon } from '@heroicons/react/outline';
import { IntlProps } from 'index';
import { useForm, useToggle } from 'hooks';
import { toast } from 'react-toastify';
import { getCurrencies, validate } from 'multicoin-address-validator';
import { defaultBeneficiary } from 'screens/WalletDetails/types';
import { selectGroupMember } from 'modules/user/groupMember/selectors';

type State = {
   accountName: string;
   accountNumber: string;
   bank?: string;
   address: string;
   label: string;
   description?: string;
   destinationTag?: string;
};

type ReduxProps = {
   user: User;
   groupMember: GroupMember;
   theme: string;
   wallets: Wallet[];
   beneficiary: Beneficiary;
   beneficiaries: Beneficiary[];
   beneficiariesLoading: boolean;
   beneficiariesCreateLoading: boolean;
   beneficiariesCreateSuccess: boolean;
   beneficiariesActivateLoading: boolean;
   beneficiariesActivateSuccess: boolean;
   beneficiariesDeleteLoading: boolean;
   beneficiariesDeleteSuccess: boolean;
   beneficiariesResendLoading: boolean;
   memberLevels?: MemberLevels;
   withdrawLimits: WithdrawLimits[];
   withdrawLimit: WithdrawLimit;
   withdrawSuccess: boolean;
};

type OwnProps = {
   location: {
      state: {
         wallet: Wallet;
      };
   };
};

interface DispatchProps {
   fecthWallets: typeof walletsFetch;
   fetchBeneficiaries: typeof beneficiariesFetch;
   createBeneficiary: typeof beneficiariesCreate;
   updateBeneficiary: typeof beneficiariesDataUpdate;
   activateBeneficiary: typeof beneficiariesActivate;
   deleteBeneficiary: typeof beneficiariesDelete;
   resendBeneficiary: typeof beneficiariesResendPin;
   withdrawCcy: typeof walletsWithdrawCcyFetch;
   withdrawLimitFetch: typeof withdrawLimitFetch;
   fetchSuccess: typeof alertPush;
}

type StateWithdraw = {
   amount: string;
   otp: string;
   total: string;
   amountError: boolean;
};

type WithdrawalProps = ReduxProps &
   OwnProps &
   DispatchProps &
   RouterProps &
   IntlProps;

const WithdrawalFC = memo(
   ({
      user,
      groupMember,
      theme,
      wallets,
      beneficiary,
      beneficiaries,
      beneficiariesLoading,
      beneficiariesCreateLoading,
      beneficiariesCreateSuccess,
      beneficiariesActivateLoading,
      beneficiariesActivateSuccess,
      beneficiariesDeleteLoading,
      beneficiariesDeleteSuccess,
      beneficiariesResendLoading,
      memberLevels,
      withdrawLimits,
      withdrawLimit,
      withdrawSuccess,
      location,
      fecthWallets,
      fetchBeneficiaries,
      createBeneficiary,
      updateBeneficiary,
      activateBeneficiary,
      deleteBeneficiary,
      resendBeneficiary,
      withdrawCcy,
      withdrawLimitFetch,
      fetchSuccess,
      history,
      intl,
   }: WithdrawalProps) => {
      let userWallets = useMemo(
         () =>
            wallets.length
               ? wallets.filter(wallet => wallet.networks.length)
               : [],
         [wallets]
      );

      const [toggle, setToggle] = useToggle(false);
      const [stepActive, setStepActive] = useState(1);
      const [walletActive, setWalletActive] = useState<Wallet['currency']>('');
      const [networkActive, setNetworkActive] = useState('');
      const [searchMarket, setSearchMarket] = useState('');
      const [pin, setPin] = useState('');

      const [selectedNetwork, setSelectedNetwork] = useState(
         userWallets[0]?.networks[0]
      );
      const [listNetwork, setListNetwork] = useState(userWallets[0]?.networks);
      const [coinAddressValid, setCoinAddressValid] = useState(false);

      const [id, setId] = useState(0);
      const [modalDelete, setModalDelete] = useState(false);
      const [modalConfirm, setModalConfirm] = useState(false);
      const [modalConfirmWD, setModalConfirmWD] = useState(false);
      const [isOpenBeneficiary, setIsOpenBeneficiary] = useState(false);
      const [showModalSuccessPurchased, setShowModalSuccessPurchased] =
         useState(false);

      const [
         { address, label, description, destinationTag },
         setField,
         setNewField,
      ] = useForm<State>({
         accountName: '',
         accountNumber: '',
         bank: '',
         address: '',
         label: '',
         description: '',
         destinationTag: '',
      });
      const [state, setState] = useState<StateWithdraw>({
         amount: '',
         otp: '',
         total: '',
         amountError: false,
      });

      const { amount, otp } = state;

      const mainRef = useRef<HTMLDivElement>(null);

      const resetField = () => {
         setNewField({
            address: '',
            label: '',
            description: '',
         });
         setCoinAddressValid(false);
      };

      const resetFieldWD = () => {
         setState({
            amount: '',
            otp: '',
            total: '',
            amountError: false,
         });
      };

      useEffect(() => {
         setDocumentTitle(
            `Withdrawal ${
               stepActive === 1 ? '' : userWallets[0]?.name.toUpperCase()
            }`
         );
         if (location.state?.wallet) {
            setStepActive(2);
            setSelectedNetwork(location.state?.wallet.networks[0]);
            setListNetwork(location.state?.wallet.networks);
            setWalletActive(location.state?.wallet.currency);
            scrollTo(mainRef.current?.offsetTop);
         }
         if (
            user.level <
               Number(
                  memberLevels &&
                     memberLevels?.withdraw &&
                     memberLevels?.withdraw?.minimum_level
               ) ||
            !user.otp ||
            user?.myTier?.benefit?.withdraw_access === false
         ) {
            history.push('/wallets', { isOpenPortal: true });
         }
      }, []);

      useEffect(() => {
         if (!wallets.length) {
            fecthWallets();
         }
      }, [wallets]);

      useEffect(() => {
         if (stepActive === 2) {
            fetchBeneficiary();
            setSelectedNetwork(userWallets[0]?.networks[0]);
            setListNetwork(userWallets[0]?.networks);
         }
      }, [stepActive]);

      useEffect(() => {
         if (beneficiaries) {
            setNetworkActive(beneficiaries[0]?.blockchain_key);
         }
      }, [beneficiaries]);

      useEffect(() => {
         if (listNetwork) {
            if (address) {
               validateCoinAddressFormat(address);
            }
         }
      }, [listNetwork]);

      useEffect(() => {
         if (beneficiariesDeleteSuccess) {
            if (modalDelete) {
               fetchBeneficiary();
               setModalDelete(!modalDelete);
            }
         }
      }, [beneficiariesDeleteSuccess]);

      useEffect(() => {
         if (beneficiariesCreateSuccess) {
            if (isOpenBeneficiary) {
               handleShowBeneficiary();
               resetField();
               handleShowModalConfirm();
            }
         }
         if (beneficiariesActivateSuccess) {
            if (modalConfirm) {
               handleShowModalConfirm();
               resetField();
               setPin('');
            }
         }
         if (pin.length === 6) {
            handleConfirmActivate();
         }

         if (!isOpenBeneficiary) {
            resetField();
         }
      }, [
         beneficiariesCreateSuccess,
         beneficiariesActivateSuccess,
         isOpenBeneficiary,
         pin,
      ]);

      useEffect(() => {
         if (withdrawSuccess) {
            handleShowModalConfirmWD();
            handleSetShowModalSuccessPurchased();
            resetFieldWD();
         }
      }, [withdrawSuccess]);

      const fetchBeneficiary = useCallback(() => {
         if (user.myTier?.benefit.withdraw_access === true) {
            fetchBeneficiaries({
               currency_id: userWallets[0]?.currency
                  ? userWallets[0]?.currency
                  : location.state?.wallet.currency,
            });
         }
      }, [
         fetchBeneficiaries,
         location.state?.wallet.currency,
         user.myTier?.benefit.withdraw_access,
         userWallets,
      ]);

      const handleConfirmActivate = () =>
         activateBeneficiary({ id: id || beneficiary.id, pin });

      const translate = (id: string) => intl.formatMessage({ id });

      const handleWithdraw = () => {
         const payload: WalletsWithdrawCcyFetch['payload'] = {
            beneficiary_id: String(beneficiaries.find(e => e.id === id)?.id),
            amount,
            currency: userWallets[0]?.currency,
            otp,
         };
         console.log('payload :>> ', payload);
         withdrawCcy(payload);
      };

      if (searchMarket) {
         userWallets = userWallets.length
            ? arrayFilter(userWallets, searchMarket)
            : [];
      }

      if (walletActive) {
         userWallets = userWallets.length
            ? userWallets.filter(wallet => wallet.currency === walletActive)
            : [];
      }

      let filteredBeneficiary = beneficiaries || [defaultBeneficiary];

      if (networkActive) {
         filteredBeneficiary = filteredBeneficiary.length
            ? filteredBeneficiary.filter(
                 e => e.blockchain_key === networkActive
              )
            : [];
      }

      const handleToStepBeneficiary = (currency: Wallet['currency']) => {
         setStepActive(2);
         setWalletActive(currency);
         scrollTo(mainRef.current?.offsetTop);
      };
      const handleToStepInfo = (id: number) => {
         if (beneficiaries.find(e => e.id === id && e.state === 'pending')) {
            handleShowModalConfirm();
         } else {
            setStepActive(3);
            scrollTo(mainRef.current?.offsetTop);
            withdrawLimitFetch();
         }
         setId(id);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const defaultWithdrawLimited: WithdrawLimits = {
         id: 0,
         group: '',
         kyc_level: '',
         limit_24_hour: '',
         limit_1_month: '',
      };

      const withdrawLimited =
         useMemo(
            () =>
               withdrawLimits?.find(e => e.group === groupMember?.group)
                  ? withdrawLimits?.find(e => e.group === groupMember?.group)
                  : withdrawLimits?.shift() || defaultWithdrawLimited,
            [defaultWithdrawLimited, groupMember?.group, withdrawLimits]
         ) || defaultWithdrawLimited;

      const network = userWallets[0]?.networks?.find(
         e =>
            e.blockchain_key ===
            filteredBeneficiary?.find(e => e.id === id)?.blockchain_key
      );
      const currency = userWallets[0]?.currency;
      const withdrawFee = Decimal.format(
         network?.withdraw_fee,
         userWallets[0]?.fixed,
         ','
      );
      const withdrawMinAmount = Decimal.format(
         network?.min_withdraw_amount,
         userWallets[0]?.fixed,
         ','
      );
      const withdrawLimit24H = Decimal.format(
         Number(withdrawLimited?.limit_24_hour) -
            Number(withdrawLimit?.last_24_hours),
         userWallets[0]?.fixed,
         ','
      );
      const withdrawLimit1M = Decimal.format(
         Number(withdrawLimited?.limit_1_month) -
            Number(withdrawLimit?.last_1_month),
         userWallets[0]?.fixed,
         ','
      );

      const handleChangeAmount = (value: string) => {
         const convertedValue = cleanPositiveFloatInput(value);
         const fixed = userWallets[0]?.fixed;
         const balance = userWallets[0]?.balance;
         if (convertedValue.match(precisionRegExp(fixed))) {
            const amount =
               convertedValue !== ''
                  ? Number(parseFloat(convertedValue).toFixed(fixed))
                  : '';
            const total =
               amount !== ''
                  ? (amount - Number(withdrawFee)).toFixed(fixed)
                  : '';
            console.log('convertedValue :>> ', convertedValue);
            console.log('balance :>> ', userWallets[0]?.balance);
            setState({
               ...state,
               amount: convertedValue,
               amountError: Number(balance) < Number(convertedValue),
               total: Number(total) > 0 ? total : (0).toFixed(fixed),
            });
         }
      };
      const handleChangeOtp = (otp: string) =>
         setState({
            ...state,
            otp: otp.replace(/\D/g, ''),
         });

      const handleSetShowModalSuccessPurchased = () =>
         setShowModalSuccessPurchased(!showModalSuccessPurchased);
      const handleShowBeneficiary = () => setIsOpenBeneficiary(prev => !prev);
      const handleShowModalDelete = (id: number) => {
         setModalDelete(!modalDelete);
         setId(id);
      };

      const handleShowModalConfirm = () => setModalConfirm(!modalConfirm);
      const handleShowModalConfirmWD = () => setModalConfirmWD(!modalConfirmWD);

      const isDisabled = () => {
         const withdrawEnabled = selectedNetwork?.withdrawal_enabled;
         return !withdrawEnabled || !address || !label || coinAddressValid;
      };
      const isDisbaledWithdraw = () => {
         const limit =
            Number(withdrawLimited?.limit_24_hour) -
            Number(withdrawLimit?.last_24_hours);
         const tax =
            Number(network?.withdraw_fee) +
            Number(network?.min_withdraw_amount);
         const balance = Number(userWallets[0]?.balance);
         return (
            limit < tax ||
            !amount ||
            otp.length < 6 ||
            balance < +amount ||
            balance > +withdrawLimit24H
         );
      };

      const renderAsset = useMemo(
         () => (
            <>
               <div className="mb-5 text-2xl font-semibold leading-custom2 tracking-custom1">
                  Select crypto
               </div>
               <form className="relative mb-10 shrink-0">
                  <InputGroup
                     placeholder="Search coin"
                     onChange={setSearchMarket}
                     autoFocus
                     icon={
                        <SearchIcon className="h-5 w-5 stroke-neutral4 transition-all duration-300" />
                     }
                  />
                  <button
                     type="button"
                     className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center bg-none">
                     <SearchIcon className="h-5 w-5 stroke-neutral4 transition-all duration-300" />
                  </button>
               </form>
               <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                     <thead>
                        <tr>
                           <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center space-x-1">
                                 <div>#</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center space-x-1">
                                 <div>Name</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center justify-end space-x-1">
                                 <div>Balance</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {userWallets.length ? (
                           userWallets.map((userWallet, index) => (
                              <tr
                                 key={userWallet.currency}
                                 style={{ transition: 'background .2s' }}
                                 className="group"
                                 onClick={() =>
                                    handleToStepBeneficiary(userWallet.currency)
                                 }>
                                 <td className="rounded-l-xl p-4 align-middle text-xs font-semibold leading-custom4 text-neutral4 transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                    <div className="flex items-center space-x-2">
                                       <svg className="h-4 w-4 fill-neutral4 transition-all duration-300 hover:fill-secondary3">
                                          <use xlinkHref="#icon-star-outline" />
                                       </svg>
                                       <div>{index + 1}</div>
                                    </div>
                                 </td>
                                 <td className="p-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                    <div className="flex items-center space-x-3">
                                       <div className="w-8 shrink-0">
                                          <Image
                                             className={`w-full ${
                                                renderCurrencyIcon(
                                                   userWallet.currency,
                                                   userWallet.iconUrl
                                                )?.includes('http')
                                                   ? 'polygon'
                                                   : ''
                                             }`}
                                             src={renderCurrencyIcon(
                                                userWallet.currency,
                                                userWallet.iconUrl
                                             )}
                                             alt={userWallet.name}
                                             title={userWallet.name}
                                             height={40}
                                             width={40}
                                          />
                                       </div>
                                       <div className="flex items-center space-x-1">
                                          <div>{userWallet.name}</div>
                                          <div className="font-normal uppercase text-neutral4">
                                             {userWallet.currency}
                                          </div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="rounded-r-xl p-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                    <div>
                                       {Decimal.format(
                                          userWallet.balance,
                                          userWallet.fixed,
                                          ','
                                       )}
                                    </div>
                                 </td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td colSpan={3}>
                                 <div className="flex min-h-96 flex-col items-center justify-center space-y-3 transition-transform duration-1000">
                                    <IcEmty
                                       className={
                                          theme === 'dark'
                                             ? 'brightness-75'
                                             : ''
                                       }
                                    />
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
         ),
         [userWallets, setSearchMarket, searchMarket]
      );

      const renderBeneficiary = useMemo(
         () => (
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <button
                     type="button"
                     onClick={() => {
                        setStepActive(1);
                        setNetworkActive('');
                        setWalletActive('');
                     }}
                     className="group flex items-center text-2xl font-semibold leading-custom2 tracking-custom1">
                     <svg className="mr-4 h-3.5 w-3.5 fill-neutral4 transition-all duration-300 group-hover:-translate-x-1">
                        <use xlinkHref="#icon-arrow-prev" />
                     </svg>
                     Select beneficiaries
                  </button>
                  <div className="flex items-center text-base font-medium">
                     {userWallets[0]?.name || ''}
                     <img
                        src={renderCurrencyIcon(
                           userWallets[0]?.currency,
                           userWallets[0]?.iconUrl
                        )}
                        className={`ml-3 w-6 ${
                           renderCurrencyIcon(
                              userWallets[0]?.currency,
                              userWallets[0]?.iconUrl
                           )?.includes('http')
                              ? 'polygon'
                              : ''
                        }`}
                        alt={userWallets[0]?.name}
                        title={userWallets[0]?.name}
                     />
                  </div>
               </div>
               <div className="hidden space-x-4">
                  {userWallets[0]?.networks.map(network => (
                     <Button
                        key={network.blockchain_key}
                        text={network.protocol}
                        size="small"
                        width="noFull"
                        rounded="lg"
                        fontDM={false}
                        variant={
                           networkActive === network.blockchain_key
                              ? 'primary'
                              : 'outline'
                        }
                        onClick={() => setNetworkActive(network.blockchain_key)}
                     />
                  ))}
               </div>
               <div className="">
                  <div className="flex space-x-4">
                     {userWallets[0]?.networks.map(network => (
                        <Nav
                           key={network.blockchain_key}
                           title={network.protocol}
                           onClick={() =>
                              setNetworkActive(network.blockchain_key)
                           }
                           theme="grey"
                           className="px-5"
                           isActive={networkActive === network.blockchain_key}
                        />
                     ))}
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                     <thead>
                        <tr>
                           <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center space-x-1">
                                 <div>#</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center space-x-1">
                                 <div>Label</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center space-x-1">
                                 <div>Address</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center space-x-1">
                                 <div>Status</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="border-b border-neutral6 px-4 pb-8 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                              <div className="flex cursor-pointer items-center justify-end space-x-1">
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
                                 <td
                                    colSpan={5}
                                    className="px-4 py-3 last:pb-0">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                       rounded="md"
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td
                                    colSpan={5}
                                    className="px-4 py-3 last:pb-0">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                       rounded="md"
                                    />
                                 </td>
                              </tr>
                              <tr>
                                 <td
                                    colSpan={5}
                                    className="px-4 py-3 last:pb-0">
                                    <Skeleton
                                       height={20}
                                       isWithFull
                                       rounded="md"
                                    />
                                 </td>
                              </tr>
                           </>
                        ) : filteredBeneficiary.length ? (
                           filteredBeneficiary.map(
                              (
                                 {
                                    id,
                                    name,
                                    data: { address },
                                    state,
                                    currency,
                                 },
                                 index
                              ) => (
                                 <tr
                                    key={index}
                                    style={{ transition: 'background .2s' }}
                                    className="group">
                                    <td
                                       onClick={() => handleToStepInfo(id)}
                                       className="rounded-l-xl p-4 align-middle text-xs font-semibold leading-custom4 text-neutral4 transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div>{index + 1}</div>
                                    </td>
                                    <td
                                       onClick={() => handleToStepInfo(id)}
                                       className="p-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div>{name}</div>
                                    </td>
                                    <td
                                       onClick={() => handleToStepInfo(id)}
                                       className="p-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div>
                                          {truncateMiddle(String(address), 20)}
                                       </div>
                                    </td>
                                    <td
                                       onClick={() => handleToStepInfo(id)}
                                       className="p-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div
                                          className={
                                             state === 'active'
                                                ? 'text-primary5 dark:text-chart1'
                                                : 'text-primary4'
                                          }>
                                          {state}
                                       </div>
                                    </td>
                                    <td className="rounded-r-xl p-4 text-right align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                                       <div className="flex items-center justify-end">
                                          <svg
                                             onClick={() =>
                                                handleShowModalDelete(id)
                                             }
                                             className="h-6 w-6 cursor-pointer fill-primary4 transition-colors duration-300">
                                             <use xlinkHref="#icon-close-circle" />
                                          </svg>
                                       </div>
                                    </td>
                                 </tr>
                              )
                           )
                        ) : (
                           <tr>
                              <td colSpan={5}>
                                 <div className="flex min-h-96 flex-col items-center justify-center space-y-3">
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
            </div>
         ),
         [
            setStepActive,
            setNetworkActive,
            setWalletActive,
            userWallets,
            networkActive,
            filteredBeneficiary,
            beneficiariesLoading,
            handleShowBeneficiary,
            handleShowModalDelete,
            handleToStepInfo,
         ]
      );

      const renderWithdrawInfo = useMemo(
         () => (
            <>
               <div className="mb-16 flex items-center justify-between">
                  <button
                     onClick={() => {
                        setStepActive(2);
                        setState({
                           amount: '',
                           amountError: false,
                           otp: '',
                           total: '',
                        });
                     }}
                     type="button"
                     className="group flex items-center text-2xl font-semibold leading-custom2 tracking-custom1">
                     <svg className="mr-4 h-3.5 w-3.5 fill-neutral4 transition-all duration-300 group-hover:-translate-x-1">
                        <use xlinkHref="#icon-arrow-prev" />
                     </svg>
                     Withdraw info
                  </button>
                  <div className="flex items-center text-base font-medium">
                     {userWallets[0]?.name || ''}
                     <Image
                        src={renderCurrencyIcon(
                           userWallets[0]?.currency,
                           userWallets[0]?.iconUrl
                        )}
                        className={`ml-3 w-6 ${
                           renderCurrencyIcon(
                              userWallets[0]?.currency,
                              userWallets[0]?.iconUrl
                           )?.includes('http')
                              ? 'polygon'
                              : ''
                        }`}
                        alt={userWallets[0]?.name}
                        title={userWallets[0]?.name}
                        height={40}
                        width={40}
                     />
                  </div>
               </div>
               <div className="space-y-12">
                  <div className="flex rounded-2xl bg-neutral7 px-9 py-6 dark:bg-neutral2">
                     <div className="w-1/2">
                        <div className="flex space-x-2.5">
                           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary3">
                              <svg className="h-5 w-5 fill-neutral8">
                                 <use xlinkHref="#icon-wallet" />
                              </svg>
                           </div>
                           <div>
                              <div className="text-xs leading-custom4 text-neutral4">
                                 Available balance
                              </div>
                              <div className="font-medium uppercase">
                                 {Decimal.format(
                                    userWallets[0]?.balance,
                                    userWallets[0]?.fixed,
                                    ','
                                 )}{' '}
                                 {userWallets[0]?.currency}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="w-1/2">
                        <div className="flex space-x-2.5">
                           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary5 dark:bg-chart1">
                              <svg className="h-5 w-5 fill-neutral8">
                                 <use xlinkHref="#icon-lock" />
                              </svg>
                           </div>
                           <div>
                              <div className="text-xs leading-custom4 text-neutral4">
                                 Locked
                              </div>
                              <div className="font-medium uppercase">
                                 {Decimal.format(
                                    userWallets[0]?.locked,
                                    userWallets[0]?.fixed,
                                    ','
                                 )}{' '}
                                 {userWallets[0]?.currency}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-8">
                     <InputGroup
                        id="withdraw-address"
                        label="Withdraw address"
                        placeholder={
                           filteredBeneficiary?.find(e => e.id === id)?.data
                              ?.address
                        }
                        disabled
                     />
                     <div className="flex justify-between space-x-4">
                        <InputGroup
                           id="withdraw-amount"
                           label="Withdraw amount"
                           placeholder="0.0"
                           value={state.amount}
                           onChange={handleChangeAmount}
                           withError={state.amountError}
                           info={
                              state.amountError
                                 ? translate(
                                      'account.withdraw.insufficient_balance'
                                   )
                                 : Number(userWallets[0]?.balance) >
                                   +withdrawLimit24H
                                 ? 'amount exceeds daily'
                                 : ''
                           }
                           parentClassName="w-full"
                           autoFocus
                        />
                        <InputGroup
                           id="2fa-code"
                           label="2fa code"
                           placeholder="123456"
                           value={state.otp}
                           onChange={handleChangeOtp}
                           maxLength={6}
                           parentClassName="w-full"
                        />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between border-b border-neutral6 pb-3 text-base font-medium dark:border-neutral3">
                        <div onClick={handleWithdraw}>Total</div>
                        <div className="uppercase">
                           {Decimal.format(
                              state.total,
                              userWallets[0]?.fixed,
                              ''
                           )}{' '}
                           {currency}
                        </div>
                     </div>
                     <CellDetail
                        title="Fee"
                        value={`${withdrawFee} ${currency}`}
                     />
                     <CellDetail
                        title="Minimum withdraw"
                        value={`${withdrawMinAmount} ${currency}`}
                     />
                     <CellDetail
                        title="Daily limit"
                        value={`${withdrawLimit24H} ${currency}`}
                     />
                     <CellDetail
                        title="Monthly limit"
                        value={`${withdrawLimit1M} ${currency}`}
                     />
                  </div>
                  <div className="mt-12 flex justify-between">
                     <Button
                        width="noFull"
                        text="Cancel"
                        variant="outline"
                        onClick={() => {
                           setStepActive(1);
                           setNetworkActive('');
                           setWalletActive('');
                        }}
                     />
                     <Button
                        width="noFull"
                        text="I understand, continue"
                        disabled={isDisbaledWithdraw()}
                        onClick={handleShowModalConfirmWD}
                     />
                  </div>
               </div>
            </>
         ),
         [
            userWallets,
            state,
            handleChangeAmount,
            handleChangeOtp,
            id,
            withdrawLimit,
         ]
      );

      const isRipple = useMemo(
         () => userWallets[0]?.currency === 'xrp',
         [userWallets[0]?.currency]
      );
      const isStellar = useMemo(
         () => userWallets[0]?.currency === 'xlm',
         [userWallets[0]?.currency]
      );

      const handleCreateBeneficiary = () => {
         const payloadCoin: BeneficiariesCreate['payload'] = {
            currency: userWallets[0]?.currency,
            blockchain_key: selectedNetwork.blockchain_key || '',
            name: label,
            data: JSON.stringify({
               address:
                  (isRipple || isStellar) && destinationTag
                     ? `${address}?dt=${destinationTag}`
                     : address,
            }),
            ...(description && { description }),
         };
         const dataBeneficiary: BeneficiaryBank = {
            full_name: '',
            account_number: '',
            bank_name: '',
            bank_swift_code: '',
            intermediary_bank_name: '',
            intermediary_bank_swift_code: '',
         };
         const payloadFiat: BeneficiariesCreate['payload'] = {
            currency: userWallets[0]?.currency,
            name: label,
            data: JSON.stringify(dataBeneficiary),
            ...(description && { description }),
         };

         createBeneficiary(
            userWallets[0]?.type === 'coin' ? payloadCoin : payloadFiat
         );
      };
      const handleCopy = (url: string, type: string) => {
         copyToClipboard(url);
         toast.info(`${type} Copied`);
      };
      const renderIconCopied = (title: string) => (
         <button
            className="group cursor-copy"
            onClick={() => handleCopy(address, title)}
            title="Address referral">
            <svg className="h-6 w-6 fill-neutral4 transition-transform duration-200 group-hover:scale-110 group-hover:fill-neutral3 dark:group-hover:fill-neutral5">
               <use xlinkHref="#icon-copy" />
            </svg>
         </button>
      );
      const validateCoinAddressFormat = useCallback(
         (value: string) => {
            const networkType = selectedNetwork.blockchain_key
               ? selectedNetwork.blockchain_key.split('-').pop()
               : '';
            const currency = String(
               userWallets[0]?.networks.find(
                  e => e.blockchain_key === selectedNetwork.blockchain_key
               )?.parent_id
            );
            const availableNetwork = getCurrencies().some(
               ({ symbol }) => symbol === currency
            );
            if (availableNetwork) {
               const valid = validate(value, currency, networkType);
               setCoinAddressValid(!valid);
            }
         },
         [selectedNetwork]
      );
      const renderModalBeneficiary = useMemo(
         () => (
            <>
               {userWallets[0]?.type === 'coin' && (
                  <>
                     {userWallets[0]?.networks.filter(e => e?.protocol !== '')
                        .length && (
                        <Listbox
                           label="Network"
                           objectKey="protocol"
                           list={selectedNetwork}
                           lists={userWallets[0]?.networks}
                           onChange={setSelectedNetwork}
                           info={
                              !selectedNetwork?.withdrawal_enabled
                                 ? 'This network disabled'
                                 : ''
                           }
                        />
                     )}
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
                        info={(coinAddressValid && 'Invalid Address') || ''}
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
               {(isRipple || isStellar) && (
                  <InputGroup
                     id="destinationTag"
                     label={isRipple ? 'Destination tag' : 'Memo'}
                     value={destinationTag}
                     onChangeAlt={setField}
                     placeholder={`Enter ${
                        isRipple ? 'destination tag' : 'memo'
                     } (require)`}
                  />
               )}
               <div className="rounded bg-neutral7 px-6 py-5 text-center dark:bg-neutral3">
                  <div className="text-base font-medium leading-normal">
                     Attention
                  </div>
                  <div className="text-neutral4">
                     Please note that transaction to wrong network and address
                     will cause your asset to permanently lost, so fill
                     correctly.
                  </div>
               </div>
               <Button
                  text="Create"
                  onClick={handleCreateBeneficiary}
                  disabled={isDisabled()}
                  withLoading={beneficiariesCreateLoading}
               />
            </>
         ),
         [
            selectedNetwork,
            setSelectedNetwork,
            userWallets,
            listNetwork,
            address,
            label,
            description,
            destinationTag,
            setField,
            handleCreateBeneficiary,
            isRipple,
            isStellar,
         ]
      );

      useEffect(() => {
         resetField();
      }, [selectedNetwork]);

      const renderModalDetail = () => (
         <div className="mt-10 space-y-8">
            <div className="text-center font-dm text-5xl leading-custom1 tracking-custom">
               Yay! 🎉
            </div>
            <div className="mx-auto max-w-71.25 text-center text-base font-medium leading-normal">
               You successfully purchased{' '}
               <span className="text-primary5">0.020202 BTC</span> from
               Digiasset
            </div>
            <div className="flex flex-wrap rounded-xl border border-neutral6 p-6 dark:border-neutral3">
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
                  onClick={() =>
                     history.push(
                        `trading/${userWallets[0]?.currency || 'btcidr'}`
                     )
                  }
                  variant="outline"
               />
               <Button
                  text="Wallets"
                  onClick={() => history.push('/wallets')}
               />
            </div>
         </div>
      );

      const renderContentDeleted = () => (
         <div className="space-y-8 pt-10">
            <div className="space-y-3">
               <div className="text-center font-dm text-2xl leading-9 tracking-custom">
                  Sure delete?
               </div>
               <div className="mx-auto max-w-82 text-center text-xs leading-5 text-neutral4">
                  you will remove the beneficiary by name{' '}
                  <span className="font-semibold text-primary4">
                     {beneficiaries.find(e => e.id === id)?.name}
                  </span>
               </div>
            </div>
            <Button
               text="Confirm"
               withLoading={beneficiariesDeleteLoading}
               onClick={() => deleteBeneficiary({ id })}
            />
         </div>
      );
      const handleActivate = () => activateBeneficiary({ id, pin });

      const renderContentActivate = () => (
         <div className="space-y-8 pt-10">
            <div className="space-y-3">
               <div className="text-center font-dm text-2xl leading-9 tracking-custom">
                  Beneficiaries Activation
               </div>
               <div className="mx-auto max-w-82 text-center text-xs leading-5 text-neutral4">
                  Save the new address, Please enter the code that we sent to
                  your email.
               </div>
            </div>
            <InputOtp
               length={6}
               className="-mx-2 flex"
               onChangeOTP={setPin}
            />
            <div className="space-y-3 text-center">
               <Button
                  text="Confirm"
                  disabled={pin.length !== 6}
                  onClick={handleActivate}
                  withLoading={beneficiariesActivateLoading}
               />
               <button
                  className={
                     beneficiariesResendLoading
                        ? ''
                        : 'font-medium text-primary1 hover:underline hover:underline-offset-4'
                  }
                  disabled={beneficiariesResendLoading}
                  onClick={() => resendBeneficiary({ id })}>
                  {!beneficiariesResendLoading ? (
                     'Resend code'
                  ) : (
                     <Skeleton
                        width={100}
                        height={20}
                     />
                  )}
               </button>
            </div>
         </div>
      );

      const render = () => {
         switch (stepActive) {
            case 2:
               return renderBeneficiary;
            case 3:
               return renderWithdrawInfo;
            default:
               return renderAsset;
         }
      };

      return (
         <>
            <LayoutProfile
               title="Withdraw"
               withBreadcrumbs={{
                  display: 'Wallets',
                  href: '/wallets',
                  active: 'Withdraw',
               }}>
               <div className="mr-8 w-full shrink-0 space-y-6 lg:w-56 lg2:mr-12 lg2:w-72 1xl:mr-20 md-max:mb-6 lg-max:mb-8 lg-max:hidden">
                  <div
                     className={`relative flex h-12 items-center space-x-4 rounded-3xl px-2 font-dm leading-custom3 transition-all duration-300 after:absolute after:left-5.75 after:top-full after:h-6 after:border-l-2 after:border-dashed after:border-neutral5 after:content-[''] ${
                        (stepActive === 2 || stepActive === 3) &&
                        'bg-neutral8 shadow-step dark:bg-neutral2 dark:after:border-neutral4'
                     }`}>
                     <div
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary5 dark:border-chart1 ${
                           (stepActive === 2 || stepActive === 3) &&
                           'after:bidding__number after:bidding__number_dark'
                        } transition-all duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-full after:transition-opacity after:duration-200 after:content-['']`}>
                        1
                     </div>
                     <div>Select asset</div>
                  </div>
                  <div
                     className={`relative flex h-12 items-center space-x-4 rounded-3xl px-2 font-dm leading-custom3 transition-all duration-300 after:absolute after:left-5.75 after:top-full after:h-6 after:border-l-2 after:border-dashed after:border-neutral5 after:content-[''] ${
                        stepActive === 1 && 'text-neutral4'
                     } ${
                        stepActive === 3 &&
                        'bg-neutral8 shadow-step dark:bg-neutral2 dark:after:border-neutral4'
                     }`}>
                     <div
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                           stepActive === 2 || stepActive === 3
                              ? 'border-primary5 dark:border-chart1'
                              : 'border-neutral6 dark:border-neutral4'
                        } ${
                           stepActive === 3 &&
                           'after:bidding__number after:bidding__number_dark'
                        } transition-all duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-full after:transition-opacity after:duration-200 after:content-['']`}>
                        2
                     </div>
                     <div>Select beneficiary</div>
                  </div>
                  <div
                     className={`relative flex h-12 items-center space-x-4 rounded-3xl px-2 font-dm ${
                        stepActive !== 3 && 'text-neutral4'
                     } leading-custom3 transition-all duration-300`}>
                     <div
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                           stepActive === 3
                              ? 'border-primary5 dark:border-chart1'
                              : 'border-neutral6 dark:border-neutral4'
                        } transition-all duration-300`}>
                        4
                     </div>
                     <div>Withdraw info</div>
                  </div>
               </div>
               <div
                  ref={mainRef}
                  className="grow rounded-2xl bg-neutral8 p-4 shadow-card2 dark:bg-shade1 md:px-8 md:py-10 lg:p-10"
                  style={{ animationDuration: '100ms' }}>
                  {render()}
               </div>
            </LayoutProfile>
            <ModalRequired
               show={toggle}
               close={setToggle}
               push={history.push}
            />
            <Dialog
               isOpen={isOpenBeneficiary}
               setIsOpen={handleShowBeneficiary}
               title="Create Beneficiary">
               {renderModalBeneficiary}
            </Dialog>

            <Portal
               show={modalDelete}
               close={handleShowModalDelete}>
               {renderContentDeleted()}
            </Portal>
            <Portal
               show={modalConfirm}
               close={handleShowModalConfirm}>
               {renderContentActivate()}
            </Portal>

            <Portal
               show={modalConfirmWD}
               close={handleShowModalConfirmWD}
               title="Confirmation">
               <div className="space-y-2">
                  <div className="text-center font-medium leading-normal">
                     Receive amount
                  </div>
                  <div className="text-center font-dm text-3.5xl leading-tight tracking-custom1">
                     {Decimal.format(state.total, userWallets[0]?.fixed, '')}{' '}
                     {state.total
                        ? userWallets[0]?.currency?.toUpperCase()
                        : ''}
                  </div>
               </div>
               <div className="space-y-3">
                  <CellDetail
                     title="Balance"
                     value={Decimal.format(
                        userWallets[0]?.balance,
                        userWallets[0]?.fixed,
                        ','
                     )}
                     rightAlt={userWallets[0]?.currency?.toUpperCase()}
                  />
                  <CellDetail
                     title="Withdraw"
                     value={Decimal.format(
                        state.amount,
                        userWallets[0]?.fixed,
                        ''
                     )}
                     rightAlt={userWallets[0]?.currency?.toUpperCase()}
                  />
                  <CellDetail
                     title="Fee"
                     value={withdrawFee}
                     rightAlt={userWallets[0]?.currency?.toUpperCase()}
                  />
                  <CellDetail
                     title="Currencies"
                     value={userWallets[0]?.name}
                  />
                  <CellDetail
                     title="Address"
                     value={truncateMiddle(
                        String(
                           filteredBeneficiary?.find(e => e.id === id)?.data
                              ?.address
                        ),
                        20
                     )}
                  />
               </div>
               <div className="space-y-3 rounded-2xl bg-neutral7 p-4 dark:bg-neutral3">
                  <div className="text-center text-base font-medium">
                     Attention
                  </div>
                  <div className="text-xs leading-custom4">
                     Please note that withdrawing tokens to the wrong address
                     will cause your asset to be permanently lost
                  </div>
               </div>
               <Button
                  text={translate('transfer')}
                  onClick={handleWithdraw}
               />
            </Portal>

            <Portal
               show={showModalSuccessPurchased}
               close={handleSetShowModalSuccessPurchased}>
               {renderModalDetail()}
            </Portal>
         </>
      );
   }
);

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   groupMember: selectGroupMember(state),
   theme: selectCurrentColorTheme(state),
   wallets: selectWallets(state),
   beneficiary: selectBeneficiariesCreate(state),
   beneficiaries: selectBeneficiaries(state),
   beneficiariesLoading: selectBeneficiariesFetchLoading(state),
   beneficiariesCreateLoading: selectBeneficiariesCreateLoading(state),
   beneficiariesCreateSuccess: selectBeneficiariesCreateSuccess(state),
   beneficiariesActivateLoading: selectBeneficiariesActivateLoading(state),
   beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
   beneficiariesDeleteLoading: selectBeneficiariesDeleteLoading(state),
   beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
   beneficiariesResendLoading: selectBeneficiariesResendPinLoading(state),
   memberLevels: selectMemberLevels(state),
   withdrawLimits: selectWithdrawLimits(state),
   withdrawLimit: selectWithdrawLimit(state),
   withdrawSuccess: selectWithdrawSuccess(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   fecthWallets: () => dispatch(walletsFetch()),
   fetchBeneficiaries: params => dispatch(beneficiariesFetch(params)),
   createBeneficiary: payload => dispatch(beneficiariesCreate(payload)),
   updateBeneficiary: payload => dispatch(beneficiariesDataUpdate(payload)),
   activateBeneficiary: payload => dispatch(beneficiariesActivate(payload)),
   deleteBeneficiary: id => dispatch(beneficiariesDelete(id)),
   resendBeneficiary: id => dispatch(beneficiariesResendPin(id)),
   withdrawCcy: payload => dispatch(walletsWithdrawCcyFetch(payload)),
   withdrawLimitFetch: () => dispatch(withdrawLimitFetch()),
   fetchSuccess: payload => dispatch(alertPush(payload)),
});

export const Withdrawal = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(WithdrawalFC) as FunctionComponent;
