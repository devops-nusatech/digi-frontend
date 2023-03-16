import React, {
   Fragment,
   FunctionComponent,
   useEffect,
   useMemo,
   useState,
} from 'react';
import { compose } from 'redux';
import { RouterProps, withRouter } from 'react-router';
import {
   connect,
   MapDispatchToPropsFunction,
   MapStateToProps,
} from 'react-redux';
import { injectIntl } from 'react-intl';
import { Combobox, Transition } from '@headlessui/react';
import {
   Badge,
   Button,
   Decimal,
   InputGroup,
   LayoutProfile,
   Portal,
} from 'components';
import {
   alertPush,
   currenciesFetch,
   Currency,
   RootState,
   selectCurrencies,
   selectTransferLoading,
   selectTransferIsSuccess,
   selectUserInfo,
   selectWallets,
   transferCreate,
   User,
   Wallet,
   walletsFetch,
   selectTransferIsError,
   selectDetailUserData,
   selectDetailUserLoading,
   detailUserCreate,
   selectDetailUserIsError,
   MemberLevels,
   selectMemberLevels,
} from 'modules';
import { IntlProps } from 'index';
import {
   arrayFilter,
   cleanPositiveFloatInput,
   precisionRegExp,
   renderCurrencyIcon,
   truncateMiddle,
} from 'helpers';
import { imgAvatar } from 'assets';

type TransferState = {
   username_or_uid: string;
   amount: string;
   otp: string;
   insufficientBalance: boolean;
};

interface ReduxProps {
   user: User;
   detailUserLoading: boolean;
   detailUserData: User;
   detailUserError: boolean;
   wallets: Wallet[];
   currencies: Currency[];
   transferLoading: boolean;
   transferSuccess: boolean;
   transferError: boolean;
   memberLevel?: MemberLevels;
}

interface DispatchProps {
   transfer: typeof transferCreate;
   getDetailUser: typeof detailUserCreate;
   fetchWallets: typeof walletsFetch;
   fetchCurrencies: typeof currenciesFetch;
   alertPush: typeof alertPush;
}

type OwnProps = {
   location: {
      state: Currency;
   };
};

type TransferProps = ReduxProps &
   DispatchProps &
   OwnProps &
   RouterProps &
   IntlProps;

export const TransferFC = ({
   user,
   wallets,
   currencies,
   transfer,
   getDetailUser,
   detailUserLoading,
   detailUserData,
   detailUserError,
   transferLoading,
   transferSuccess,
   transferError,
   memberLevel,
   fetchWallets,
   fetchCurrencies,
   history: { push },
   intl,
   location,
}: TransferProps) => {
   const [state, setState] = useState<TransferState>({
      username_or_uid: '',
      amount: '',
      otp: '',
      insufficientBalance: false,
   });
   const { username_or_uid, amount, otp, insufficientBalance } = state;
   const [selected, setSelected] = useState<Currency>(
      location.state ? location.state : currencies[0]
   );
   const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
   const [isOpenSuccess, setIsOpenSuccess] = useState<boolean>(false);
   const [query, setQuery] = useState<string>('');
   const [asset, setAsset] = useState(currencies);
   const filteredCurrencies: Currency[] =
      query === '' ? asset : asset ? arrayFilter(asset, query) : [];

   const resendField = () =>
      setState({
         username_or_uid: '',
         amount: '',
         otp: '',
         insufficientBalance: false,
      });

   useEffect(() => {
      if (
         user.level <
            Number(
               memberLevel &&
                  memberLevel?.withdraw &&
                  memberLevel?.withdraw?.minimum_level
            ) ||
         !user.otp
      ) {
         push('/wallets', { isOpenPortal: true });
      }
   }, []);

   useEffect(() => {
      if (!wallets.length || !currencies.length) {
         fetchWallets();
         fetchCurrencies();
      }
   }, [wallets, currencies]);

   useEffect(() => {
      if (transferSuccess) {
         setIsOpenConfirm(false);
         setIsOpenSuccess(true);
      }
   }, [transferSuccess]);

   useEffect(() => {
      if (transferError) {
         setIsOpenConfirm(false);
      }
   }, [transferError]);

   const handleGetDetailUser = (uid: string) =>
      detailUserData?.uid?.toUpperCase() !== uid &&
      getDetailUser({
         token: 'a5144000-3271-11ed-a261-0242ac120002',
         uid: uid,
      });

   const translate = (id: string) => intl.formatMessage({ id });

   const handleChangeReceiver = (username_or_uid: string) => {
      setState({
         ...state,
         username_or_uid,
      });
   };
   const handleChangeAmount = (amount: string) => {
      const convertedValue = cleanPositiveFloatInput(amount);
      if (convertedValue.match(precisionRegExp(Number(myWallet?.fixed)))) {
         setState({
            ...state,
            amount: convertedValue,
            insufficientBalance: !convertedValue.length
               ? false
               : Number(myWallet?.balance) <= 0
               ? true
               : false,
         });
      }
   };
   const handleChangeOtp = (otp: string) =>
      setState({
         ...state,
         otp: otp.replace(/\D/g, ''),
      });

   const handleTranfer = () => {
      if (selected && selected?.status === 'enabled') {
         transfer({
            username_or_uid,
            currency: selected.id,
            amount,
            otp,
         });
      }
   };

   const myWallet = wallets.find(wallet => wallet?.currency === selected?.id);

   const isDisabled = (): boolean => {
      return (
         !selected ||
         !username_or_uid ||
         !amount ||
         otp.length < 6 ||
         Number(myWallet?.balance) <= 0 ||
         !detailUserData?.username?.length
      );
   };

   const handleShowConfirm = () => setIsOpenConfirm(prev => !prev);
   const handleShowSuccess = () => {
      isOpenSuccess && resendField();
      setIsOpenSuccess(prev => !prev);
   };

   const renderModalDetail = useMemo(
      () => (
         <div className="mt-10 space-y-8">
            <div className="text-center font-dm text-5xl font-bold leading-custom1 tracking-custom">
               Yay! 🎉
            </div>
            <div className="mx-auto max-w-71.25 text-center text-base font-medium leading-normal">
               You successfully transferred{' '}
               <span className="text-primary5 dark:text-chart1">
                  {Decimal.format(amount, Number(myWallet?.fixed), ',') || 0}{' '}
                  {amount ? myWallet?.currency?.toUpperCase() : ''}
               </span>{' '}
               to {username_or_uid}
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
            <Button
               text="Wallets"
               onClick={() => push('/wallets')}
            />
         </div>
      ),
      [myWallet]
   );

   return (
      <>
         <LayoutProfile
            title="Transfer"
            withBreadcrumbs={{
               display: 'Wallets',
               href: '/transfer',
               active: 'Transfer',
            }}>
            <div className="-mx-5 flex">
               <div className="mx-5 w-c-4/6-5 basis-c-4/6-5">
                  <div className="space-y-8 rounded-2xl bg-neutral8 p-10 shadow-card dark:bg-shade1">
                     <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                        {translate('transfer.title')}
                     </div>
                     <InputGroup
                        autoFocus
                        id="uid"
                        label="Enter UID"
                        placeholder="ID1234567890"
                        value={username_or_uid}
                        onChange={handleChangeReceiver}
                        iconClassName={
                           detailUserData?.uid?.toUpperCase() !==
                              username_or_uid && username_or_uid
                              ? '!w-16'
                              : ''
                        }
                        icon={
                           detailUserData?.uid?.toUpperCase() !==
                              username_or_uid && username_or_uid ? (
                              <Badge
                                 text="Cek"
                                 rounded="3xl"
                                 variant="outline"
                                 onClick={() =>
                                    handleGetDetailUser(username_or_uid)
                                 }
                              />
                           ) : (
                              <></>
                           )
                        }
                     />
                     <div className="-mx-2 flex">
                        <div className="mx-2 w-c-1/3-4 shrink-0 grow-0 basis-c-1/3-4">
                           <Combobox
                              value={selected}
                              onChange={setSelected}>
                              <div className="relative">
                                 <div className="mb-2.5 leading-none">
                                    <Combobox.Label className="text-xs font-bold uppercase leading-none text-neutral5">
                                       Currency
                                    </Combobox.Label>
                                 </div>
                                 <div className="relative">
                                    <Combobox.Input
                                       className={({ open }) =>
                                          `${
                                             open ? 'text-primary1' : ''
                                          } h-12 w-full rounded-xl border-2 border-neutral6 bg-transparent bg-none px-3.5 pr-12 font-medium leading-12 outline-none transition duration-300 ease-in-out focus:border-neutral4 dark:border-neutral3 dark:focus:border-neutral4`
                                       }
                                       displayValue={(currency: {
                                          name: string;
                                       }) =>
                                          typeof currency?.name === 'undefined'
                                             ? '~ Select currency ~'
                                             : currency.name
                                       }
                                       onChange={e => setQuery(e.target.value)}
                                    />
                                    <Combobox.Button
                                       className="group absolute inset-y-0 right-0 flex items-center pr-2"
                                       onClick={() =>
                                          !asset.length && setAsset(currencies)
                                       }>
                                       <svg className="h-5 w-5 fill-neutral4 transition-colors duration-300 group-hover:fill-neutral2 dark:group-hover:fill-neutral6">
                                          <use xlinkHref="#icon-search" />
                                       </svg>
                                    </Combobox.Button>
                                 </div>
                                 <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    afterLeave={() => setQuery('')}>
                                    <Combobox.Options className="absolute z-[9] mt-0.5 max-h-60 w-full overflow-auto rounded-xl border-2 border-neutral6 bg-neutral8 shadow-dropdown-2 outline-none dark:border-neutral3 dark:bg-neutral1 dark:shadow-dropdown-3">
                                       {filteredCurrencies.length === 0 &&
                                       query !== '' ? (
                                          <div className="relative cursor-default select-none py-2 px-4 text-neutral4">
                                             Nothing found.
                                          </div>
                                       ) : (
                                          filteredCurrencies.map(currency => (
                                             <Combobox.Option
                                                key={currency.id}
                                                className={({ active }) =>
                                                   `relative ${
                                                      active
                                                         ? 'bg-neutral7 dark:bg-neutral2'
                                                         : ''
                                                   } px-3.5 py-2.5 font-medium leading-[1.4] transition-all duration-200`
                                                }
                                                value={currency}>
                                                {({ selected }) => (
                                                   <div className="group flex items-center space-x-3">
                                                      <div className="h-8 w-8 overflow-hidden">
                                                         <img
                                                            src={renderCurrencyIcon(
                                                               currency.id,
                                                               currency?.icon_url
                                                            )}
                                                            className="bg-neutral8 object-cover"
                                                            alt={currency?.name}
                                                            title={
                                                               currency?.name
                                                            }
                                                            style={{
                                                               clipPath:
                                                                  'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                                                            }}
                                                         />
                                                      </div>
                                                      <div
                                                         className={`block truncate ${
                                                            selected
                                                               ? 'font-medium text-primary1'
                                                               : 'font-normal'
                                                         } group-hover:font-medium`}>
                                                         {currency?.name}{' '}
                                                         <span
                                                            className={`font-normal text-neutral4`}>
                                                            {currency?.id.toUpperCase()}
                                                         </span>
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
                        </div>
                        <div className="mx-2 w-c-4/6-4 shrink-0 grow-0 basis-c-4/6-4">
                           <InputGroup
                              id="amount"
                              name="amount"
                              label="Enter transfer amount"
                              placeholder="0.12345678"
                              value={amount}
                              onChange={handleChangeAmount}
                              withError={insufficientBalance}
                              info={
                                 insufficientBalance
                                    ? 'Insufficient balance'
                                    : ''
                              }
                              className="!px-3.5"
                           />
                        </div>
                     </div>
                     <InputGroup
                        id="otpCode"
                        name="otpCode"
                        label="Enter 2FA code"
                        placeholder="123456"
                        value={otp}
                        onChange={handleChangeOtp}
                        maxLength={6}
                     />
                     <div className="flex flex-col rounded-2xl bg-neutral7 px-6 py-4 dark:bg-neutral2">
                        <div className="font-medium leading-6">
                           {translate('transfer.intruction.title')}
                        </div>
                        <ul className="list-outside list-decimal pl-3 text-xs leading-normal">
                           <li>{translate('transfer.intruction.list_1')}</li>
                           <li>{translate('transfer.intruction.list_2')}</li>
                           <li>{translate('transfer.intruction.list_3')}</li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="mx-5 w-c-1/3-5 basis-c-1/3-5">
                  <div className="flex flex-col space-y-10">
                     <div className="rounded-2xl bg-neutral8 py-10 px-6 shadow-card dark:bg-shade1">
                        <div className="space-y-3">
                           <div className="text-base font-medium leading-normal">
                              {translate('transfer.receiver.detail')}
                           </div>
                           <div className="mx-auto h-20 w-20 overflow-hidden rounded-full">
                              <img
                                 src={
                                    typeof detailUserData?.email ===
                                       'undefined' ||
                                    detailUserData?.email === ''
                                       ? imgAvatar
                                       : `https://api.dicebear.com/5.x/fun-emoji/svg?seed=${detailUserData?.email}`
                                 }
                                 className="object-cover"
                                 alt="Avatar receiver"
                                 title="Avatar receiver"
                              />
                           </div>
                           <div className="flex items-center justify-between space-x-3">
                              <div>UID</div>
                              <div
                                 className={`truncate text-right font-medium ${
                                    detailUserData?.uid ? '' : 'text-neutral4 '
                                 }`}>
                                 {detailUserData?.uid
                                    ? detailUserData?.uid?.toUpperCase()
                                    : 'ID123123123'}
                              </div>
                           </div>
                           <div className="flex items-center justify-between space-x-3">
                              <div>Username</div>
                              <div
                                 className={`truncate text-right font-medium ${
                                    detailUserData?.username
                                       ? ''
                                       : 'text-neutral4 '
                                 }`}>
                                 {detailUserData?.username
                                    ? detailUserData?.username
                                    : 'digiusername'}
                              </div>
                           </div>
                           <div className="flex items-center justify-between space-x-3">
                              <div>Email</div>
                              <div className="truncate text-right font-medium text-neutral4">
                                 {detailUserData?.email
                                    ? truncateMiddle(
                                         detailUserData?.email || '',
                                         12,
                                         '***'
                                      )
                                    : 'digiasset@mail.com'}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="rounded-2xl bg-neutral8 py-10 px-6 shadow-card dark:bg-shade1">
                        <div className="mb-8 space-y-3">
                           <div className="text-base font-medium leading-normal">
                              Transfer amount
                           </div>
                           <div
                              className={`${
                                 amount ? '' : 'text-neutral5'
                              } text-2xl font-semibold leading-custom3`}>
                              {Decimal.format(
                                 amount,
                                 Number(myWallet?.fixed),
                                 ','
                              ) || 0}{' '}
                              {amount ? myWallet?.currency?.toUpperCase() : ''}
                           </div>
                           <div className="flex items-center">
                              <div>Available asset</div>
                              <div
                                 className={`ml-auto text-right font-medium ${
                                    selected ? '' : 'text-neutral4'
                                 }`}>
                                 {Decimal.format(
                                    myWallet?.balance,
                                    Number(myWallet?.fixed),
                                    ','
                                 ) || 0}{' '}
                                 {myWallet?.currency?.toUpperCase()}
                              </div>
                           </div>
                        </div>
                        <Button
                           text="Transfer"
                           onClick={handleShowConfirm}
                           disabled={isDisabled()}
                           withLoading={transferLoading}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </LayoutProfile>
         <Portal
            show={isOpenConfirm}
            close={handleShowConfirm}
            title="Confirmation"
            onClick={handleShowConfirm}>
            <div className="space-y-2">
               <div className="text-center font-medium leading-normal">
                  {translate('transfer')}
               </div>
               <div className="text-center font-dm text-3.5xl font-bold leading-tight tracking-custom1">
                  {Decimal.format(amount, Number(myWallet?.fixed), ',') || 0}{' '}
                  {amount ? myWallet?.currency?.toUpperCase() : ''}
               </div>
            </div>
            <div className="space-y-3">
               <List
                  left="To"
                  right={String(detailUserData?.username)}
               />
               <List
                  left="UID"
                  right={detailUserData?.uid?.toUpperCase()}
               />
               <List
                  left="Currencies"
                  right={selected && selected.name}
                  rightAlt={selected && selected.id.toUpperCase()}
               />
               <List
                  left="From"
                  right={String(user.username)}
               />
               <List
                  left="Balance"
                  right={
                     Decimal.format(
                        myWallet?.balance,
                        Number(myWallet?.fixed),
                        ','
                     ) || '0'
                  }
                  rightAlt={myWallet?.currency?.toUpperCase()}
               />
            </div>
            <div className="space-y-3 rounded-2xl bg-neutral7 p-4 dark:bg-neutral3">
               <div className="text-center text-base font-medium">
                  Attention
               </div>
               <div className="text-xs leading-custom4">
                  Please note to double check your receiver uid/ username before
                  sending assets. Wrong uid/ username cause your asset to be
                  lost.
               </div>
            </div>
            <Button
               text={translate('transfer')}
               onClick={handleTranfer}
               withLoading={transferLoading}
            />
         </Portal>
         <Portal
            show={isOpenSuccess}
            close={handleShowSuccess}>
            {renderModalDetail}
         </Portal>
      </>
   );
};

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   user: selectUserInfo(state),
   detailUserLoading: selectDetailUserLoading(state),
   detailUserData: selectDetailUserData(state),
   detailUserError: selectDetailUserIsError(state),
   wallets: selectWallets(state),
   currencies: selectCurrencies(state),
   transferLoading: selectTransferLoading(state),
   transferSuccess: selectTransferIsSuccess(state),
   transferError: selectTransferIsError(state),
   memberLevel: selectMemberLevels(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   transfer: payload => dispatch(transferCreate(payload)),
   getDetailUser: payload => dispatch(detailUserCreate(payload)),
   fetchWallets: () => dispatch(walletsFetch()),
   fetchCurrencies: () => dispatch(currenciesFetch()),
   alertPush: payload => dispatch(alertPush(payload)),
});

export const Transfer = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(TransferFC) as FunctionComponent;

type ListProps = {
   left: string;
   right: string;
   rightAlt?: string;
};
const List = ({ left, right, rightAlt }: ListProps) => (
   <div className="flex items-center">
      <div className="text-neutral4">{left}</div>
      <div className={`ml-auto text-right font-medium`}>
         {right} <span className="text-neutral4">{rightAlt}</span>
      </div>
   </div>
);
