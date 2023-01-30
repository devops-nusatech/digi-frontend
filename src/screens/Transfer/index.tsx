import React, {
   Fragment,
   FunctionComponent,
   useEffect,
   useMemo,
   useState
} from 'react';
import { compose } from 'redux';
import {
   RouterProps,
   withRouter
} from 'react-router';
import {
   connect,
   MapDispatchToPropsFunction,
   MapStateToProps
} from 'react-redux';
import { injectIntl } from 'react-intl';
import {
   Combobox,
   Transition,
} from '@headlessui/react';
import {
   Badge,
   Button,
   Decimal,
   InputGroup,
   Portal
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
   selectMemberLevels
} from 'modules';
import { IntlProps } from 'index';
import {
   arrayFilter,
   cleanPositiveFloatInput,
   precisionRegExp,
   renderCurrencyIcon,
   truncateMiddle
} from 'helpers';
import { imgAvatar } from 'assets';

type TransferState = {
   username_or_uid: string;
   amount: string;
   otp: string;
   insufficientBalance: boolean;
}

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
}

type TransferProps = ReduxProps & DispatchProps & OwnProps & RouterProps & IntlProps;

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
   const [selected, setSelected] = useState<Currency>(location.state ? location.state : currencies[0]);
   const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
   const [isOpenSuccess, setIsOpenSuccess] = useState<boolean>(false);
   const [query, setQuery] = useState<string>('');
   const [asset, setAsset] = useState(currencies)
   const filteredCurrencies: Currency[] = query === '' ? asset : asset ? arrayFilter(asset, query) : [];

   const resendField = () => setState({
      username_or_uid: '',
      amount: '',
      otp: '',
      insufficientBalance: false,
   })

   useEffect(() => {
      if (user.level < Number(memberLevel && memberLevel?.withdraw && memberLevel?.withdraw?.minimum_level) || !user.otp) {
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

   const handleGetDetailUser = (uid: string) => detailUserData?.uid?.toUpperCase() !== uid && getDetailUser({
      token: 'a5144000-3271-11ed-a261-0242ac120002',
      uid: uid
   })

   const translate = (id: string) => intl.formatMessage({ id });

   const handleChangeReceiver = (username_or_uid: string) => {
      setState({
         ...state,
         username_or_uid
      });
   }
   const handleChangeAmount = (amount: string) => {
      const convertedValue = cleanPositiveFloatInput(amount)
      if (convertedValue.match(precisionRegExp(Number(myWallet?.fixed)))) {
         setState({
            ...state,
            amount: convertedValue,
            insufficientBalance: !convertedValue.length ? false : Number(myWallet?.balance) <= 0 ? true : false
         })
      };
   }
   const handleChangeOtp = (otp: string) => setState({
      ...state,
      otp: otp.replace(/\D/g, '')
   });

   const handleTranfer = () => {
      if (selected && selected?.status === 'enabled') {
         transfer({
            username_or_uid,
            currency: selected.id,
            amount,
            otp
         });
      }
   }

   const myWallet = wallets.find(wallet => wallet?.currency === selected?.id);

   const isDisabled = (): boolean => {
      return !selected || !username_or_uid || !amount || otp.length < 6 || Number(myWallet?.balance) <= 0 || !detailUserData?.username?.length;
   }

   const handleShowConfirm = () => setIsOpenConfirm(prev => !prev);
   const handleShowSuccess = () => {
      isOpenSuccess && resendField();
      setIsOpenSuccess(prev => !prev);
   }

   const renderModalDetail = useMemo(() => (
      <div className="mt-10 space-y-8">
         <div className="text-5xl text-center font-dm font-bold leading-custom1 tracking-custom">Yay! 🎉</div>
         <div className="max-w-71.25 mx-auto text-center text-base font-medium leading-normal">
            You successfully transferred <span className="text-primary5 dark:text-chart1">
               {Decimal.format(amount, Number(myWallet?.fixed), ',') || 0} {amount ? myWallet?.currency?.toUpperCase() : ''}</span> to {username_or_uid}
         </div>
         <div className="flex flex-wrap p-6 rounded-xl border border-neutral6 dark:border-neutral3">
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
   ), [myWallet]);

   return (
      <>
         <div>
            <div className="py-10">
               <div className="flex items-center w-full max-w-7xl my-0 mx-auto px-6 md:px-10 lg:px-20">
                  <div className="mr-auto text-5xl font-dm font-bold tracking-custom leading-custom1">
                     Transfer
                  </div>
               </div>
            </div>
            <div className="py-20 pb-34 bg-shade5 dark:bg-none dark:shadow-body dark:bg-neutral1">
               <div className="w-full max-w-7xl my-0 mx-auto px-6 md:px-10 lg:px-20">
                  <div className="flex -mx-5">
                     <div className="basis-c-4/6-5 w-c-4/6-5 mx-5">
                        <div className="bg-neutral8 dark:bg-shade1 shadow-card rounded-2xl p-10 space-y-8">
                           <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
                              {translate('transfer.title')}
                           </div>
                           <InputGroup
                              autoFocus
                              id="uid"
                              label="Enter UID"
                              placeholder="ID1234567890"
                              value={username_or_uid}
                              onChange={handleChangeReceiver}
                              iconClassName={detailUserData?.uid?.toUpperCase() !== username_or_uid && username_or_uid ? '!w-16' : ''}
                              icon={
                                 (detailUserData?.uid?.toUpperCase() !== username_or_uid && username_or_uid) ?
                                    <Badge
                                       text="Cek"
                                       rounded="3xl"
                                       variant="outline"
                                       onClick={() => handleGetDetailUser(username_or_uid)}
                                    /> : <></>
                              }
                           />
                           <div className="flex -mx-2">
                              <div className="grow-0 shrink-0 basis-c-1/3-4 w-c-1/3-4 mx-2">
                                 <Combobox
                                    value={selected}
                                    onChange={setSelected}
                                 >
                                    <div className="relative">
                                       <div className="leading-none mb-2.5">
                                          <Combobox.Label className="text-xs text-neutral5 leading-none font-bold uppercase">
                                             Currency
                                          </Combobox.Label>
                                       </div>
                                       <div className="relative">
                                          <Combobox.Input
                                             className={({ open }) => `${open ? 'text-primary1' : ''} w-full px-3.5 pr-12 h-12 rounded-xl font-medium leading-12 outline-none border-2 border-neutral6 dark:border-neutral3 focus:border-neutral4 dark:focus:border-neutral4 bg-none bg-transparent transition ease-in-out duration-300`}
                                             displayValue={(currency: { name: string }) => typeof currency?.name === 'undefined' ? '~ Select currency ~' : currency.name}
                                             onChange={e => setQuery(e.target.value)}
                                          />
                                          <Combobox.Button
                                             className="group absolute inset-y-0 right-0 flex items-center pr-2"
                                             onClick={() => !asset.length && setAsset(currencies)}
                                          >
                                             <svg className="h-5 w-5 fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral6 transition-colors duration-300">
                                                <use xlinkHref="#icon-search" />
                                             </svg>
                                          </Combobox.Button>
                                       </div>
                                       <Transition
                                          as={Fragment}
                                          leave="transition ease-in duration-100"
                                          leaveFrom="opacity-100"
                                          leaveTo="opacity-0"
                                          afterLeave={() => setQuery('')}
                                       >
                                          <Combobox.Options className="absolute max-h-60 w-full overflow-auto z-[9] mt-0.5 rounded-xl outline-none bg-neutral8 dark:bg-neutral1 border-2 border-neutral6 dark:border-neutral3 shadow-dropdown-2 dark:shadow-dropdown-3">
                                             {filteredCurrencies.length === 0 && query !== '' ? (
                                                <div className="relative cursor-default select-none py-2 px-4 text-neutral4">
                                                   Nothing found.
                                                </div>
                                             ) : (
                                                filteredCurrencies.map(currency => (
                                                   <Combobox.Option
                                                      key={currency.id}
                                                      className={({ active }) => `relative ${active ? 'bg-neutral7 dark:bg-neutral2' : ''} px-3.5 py-2.5 leading-[1.4] font-medium transition-all duration-200`}
                                                      value={currency}
                                                   >
                                                      {({ selected }) => (
                                                         <div className="group flex items-center space-x-3">
                                                            <div className="w-8 h-8 overflow-hidden">
                                                               <img
                                                                  src={renderCurrencyIcon(currency.id, currency?.icon_url)}
                                                                  className="object-cover bg-neutral8"
                                                                  alt={currency?.name}
                                                                  title={currency?.name}
                                                                  style={{
                                                                     clipPath: 'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                                                                  }}
                                                               />
                                                            </div>
                                                            <div className={`block truncate ${selected ? 'font-medium text-primary1' : 'font-normal'} group-hover:font-medium`}>
                                                               {currency?.name} <span className={`text-neutral4 font-normal`}>{currency?.id.toUpperCase()}</span>
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
                              <div className="grow-0 shrink-0 basis-c-4/6-4 w-c-4/6-4 mx-2">
                                 <InputGroup
                                    id="amount"
                                    name="amount"
                                    label="Enter transfer amount"
                                    placeholder="0.12345678"
                                    value={amount}
                                    onChange={handleChangeAmount}
                                    withError={insufficientBalance}
                                    info={insufficientBalance ? 'Insufficient balance' : ''}
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
                           <div className="bg-neutral7 dark:bg-neutral2 flex flex-col rounded-2xl px-6 py-4">
                              <div className="font-medium leading-6">
                                 {translate('transfer.intruction.title')}
                              </div>
                              <ul className="list-decimal list-outside text-xs pl-3 leading-normal">
                                 <li>{translate('transfer.intruction.list_1')}</li>
                                 <li>{translate('transfer.intruction.list_2')}</li>
                                 <li>{translate('transfer.intruction.list_3')}</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className="basis-c-1/3-5 w-c-1/3-5 mx-5">
                        <div className="flex flex-col space-y-10">
                           <div className="bg-neutral8 dark:bg-shade1 shadow-card rounded-2xl py-10 px-6">
                              <div className="space-y-3">
                                 <div className="text-base font-medium leading-normal">
                                    {translate('transfer.receiver.detail')}
                                 </div>
                                 <div className="mx-auto w-20 h-20 rounded-full overflow-hidden">
                                    <img
                                       src={
                                          typeof detailUserData?.email === 'undefined' || detailUserData?.email === ''
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
                                    <div className={`text-right font-medium truncate ${detailUserData?.uid ? '' : 'text-neutral4 '}`}>
                                       {detailUserData?.uid ? detailUserData?.uid?.toUpperCase() : 'ID123123123'}
                                    </div>
                                 </div>
                                 <div className="flex items-center justify-between space-x-3">
                                    <div>Username</div>
                                    <div className={`text-right font-medium truncate ${detailUserData?.username ? '' : 'text-neutral4 '}`}>
                                       {detailUserData?.username ? detailUserData?.username : 'digiusername'}
                                    </div>
                                 </div>
                                 <div className="flex items-center justify-between space-x-3">
                                    <div>Email</div>
                                    <div className="text-right font-medium truncate text-neutral4">
                                       {detailUserData?.email ? truncateMiddle(detailUserData?.email || '', 12, '***') : 'digiasset@mail.com'}
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="bg-neutral8 dark:bg-shade1 shadow-card rounded-2xl py-10 px-6">
                              <div className="space-y-3 mb-8">
                                 <div className="text-base font-medium leading-normal">
                                    Transfer amount
                                 </div>
                                 <div className={`${amount ? '' : 'text-neutral5'} font-semibold text-2xl leading-custom3`}>
                                    {Decimal.format(amount, Number(myWallet?.fixed), ',') || 0} {amount ? myWallet?.currency?.toUpperCase() : ''}
                                 </div>
                                 <div className="flex items-center">
                                    <div>Available asset</div>
                                    <div className={`text-right font-medium ml-auto ${selected ? '' : 'text-neutral4'}`}>
                                       {Decimal.format(myWallet?.balance, Number(myWallet?.fixed), ',') || 0} {myWallet?.currency?.toUpperCase()}
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
               </div>
            </div>
         </div>
         <Portal
            show={isOpenConfirm}
            close={handleShowConfirm}
            title="Confirmation"
            onClick={handleShowConfirm}
         >
            <div className="space-y-2">
               <div className="text-center font-medium leading-normal">
                  {translate('transfer')}
               </div>
               <div className="text-center font-dm font-bold text-3.5xl leading-tight tracking-custom1">
                  {Decimal.format(amount, Number(myWallet?.fixed), ',') || 0} {amount ? myWallet?.currency?.toUpperCase() : ''}
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
                  right={Decimal.format(myWallet?.balance, Number(myWallet?.fixed), ',') || '0'}
                  rightAlt={myWallet?.currency?.toUpperCase()}
               />
            </div>
            <div className="bg-neutral7 dark:bg-neutral3 p-4 rounded-2xl space-y-3">
               <div className="text-center text-base font-medium">
                  Attention
               </div>
               <div className="text-xs leading-custom4">
                  Please note to double check your receiver uid/ username before sending assets. Wrong uid/ username cause your asset to be lost.
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
            close={handleShowSuccess}
         >
            {renderModalDetail}
         </Portal>
      </>
   );
}

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

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   transfer: payload => dispatch(transferCreate(payload)),
   getDetailUser: payload => dispatch(detailUserCreate(payload)),
   fetchWallets: () => dispatch(walletsFetch()),
   fetchCurrencies: () => dispatch(currenciesFetch()),
   alertPush: payload => dispatch(alertPush(payload)),
})

export const Transfer = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(TransferFC) as FunctionComponent;

type ListProps = {
   left: string;
   right: string;
   rightAlt?: string;
}
const List = ({ left, right, rightAlt }: ListProps) => (
   <div className="flex items-center">
      <div className="text-neutral4">{left}</div>
      <div className={`text-right font-medium ml-auto`}>
         {right} <span className="text-neutral4">{rightAlt}</span>
      </div>
   </div>
);
