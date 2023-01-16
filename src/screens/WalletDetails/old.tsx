import React, {
   useEffect,
   useState,
   FunctionComponent,
   useLayoutEffect,
   useRef,
} from 'react';
import {
   Link,
   useParams,
   withRouter,
} from 'react-router-dom';
import { RouterProps } from 'react-router';
import { compose } from 'redux';
import {
   connect,
   MapDispatchToProps,
} from 'react-redux';
import { injectIntl } from 'react-intl';
import {
   Badge,
   Button,
   Decimal,
   ModalDeposit,
   ModalTransfer,
   ModalWithdraw,
   ModalWithdrawConfirm,
   ModalWithdrawDone,
   Portal,
   PriceChart3,
   TableFinance,
   WalletSidebar
} from 'components';
// import {
//    illusFaq,
//    illusFaq11,
//    illusFaq12,
//    illusFaq2
// } from 'assets';
import {
   currenciesFetch,
   Currency,
   RootState,
   selectCurrencies,
   Wallet,
   walletsFetch,
   selectWallets,
   selectWalletsLoading,
   Market,
   marketsFetch,
   selectMarkets,
   Ticker,
   selectMarketTickers,
   User,
   selectUserInfo,
   WalletHistoryList,
   alertPush,
   walletsWithdrawCcyFetch,
   walletsAddressFetch,
   beneficiariesFetch,
   selectWithdrawSuccess,
   selectHistory,
   selectBeneficiariesActivateSuccess,
   selectBeneficiariesDeleteSuccess,
   selectBeneficiariesCreateSuccess,
   walletsData,
   Beneficiary,
   walletsTransferFetch,
   selectTransferSuccess,
   walletsTransferData,
   transferCreate,
   selectTransferLoading,
} from 'modules';
import { copyToClipboard, setDocumentTitle } from 'helpers';
import { IntlProps } from 'index';
import { defaultBeneficiary, Params } from './types';
import { DEFAULT_CCY_PRECISION, DEFAULT_WALLET } from '../../constants';
import { useMarket } from 'hooks';

export interface WithdrawProps {
   amount: string;
   total: string;
   beneficiary_id: Beneficiary;
   otp: string;
}

interface ReduxProps {
   user: User;
   wallets: Wallet[];
   currencies: Currency[];
   markets: Market[]
   marketTickers: {
      [key: string]: Ticker
   }
   withdrawSuccess: boolean;
   transferSuccess: boolean;
   transferLoading: boolean;
   walletsLoading?: boolean;
   historyList: WalletHistoryList;
   beneficiariesActivateSuccess: boolean;
   beneficiariesDeleteSuccess: boolean;
   beneficiariesAddSuccess: boolean;
}

interface DispatchProps {
   fetchBeneficiaries: typeof beneficiariesFetch;
   fetchAddress: typeof walletsAddressFetch;
   fetchWallets: typeof walletsFetch;
   clearWallets: () => void;
   walletsWithdrawCcy: typeof walletsWithdrawCcyFetch;
   walletsTransfer: typeof walletsTransferFetch;
   transfer: typeof transferCreate;
   walletsTransferData: typeof walletsTransferData;
   fetchCurrencies: typeof currenciesFetch;
   fetchMarkets: typeof marketsFetch;
   fetchSuccess: typeof alertPush;
}

interface OwnProps {
   walletsError: {
      message: string;
   };
}

interface WalletDetailsFCState {
   otpCode: string;
   amount: string;
   beneficiary: Beneficiary;
   isModalSuccess: boolean;
   withdrawConfirmModal: boolean;
   withdrawDone: boolean;
   total: string;
   network: string;
   bchAddress?: string;
   filteredWallets?: Wallet[] | null;
   displayAddress: number;
   displayAddressShow: boolean;
}

type Props = ReduxProps & DispatchProps & OwnProps & IntlProps & RouterProps;

const WalletDetailsFC = ({
   user,
   wallets,
   currencies,
   markets,
   marketTickers,
   withdrawSuccess,
   transferSuccess,
   transferLoading,
   walletsLoading,
   historyList,
   beneficiariesActivateSuccess,
   beneficiariesDeleteSuccess,
   beneficiariesAddSuccess,

   fetchBeneficiaries,
   fetchAddress,
   fetchWallets,
   clearWallets,
   walletsWithdrawCcy,
   walletsTransfer,
   walletsTransferData,
   transfer,
   fetchCurrencies,
   fetchMarkets,
   fetchSuccess,

   walletsError,

   history,
   intl,

}: Props) => {
   const { id = '' } = useParams<Params>() || DEFAULT_WALLET.currency;
   const { push } = history;
   const SliderRef = useRef<HTMLDivElement>(null);
   // const translate = (id: string) => intl.formatMessage({ id });

   const [showDeposit, setShowDeposit] = useState<boolean>(false);
   const [showWithdraw, setShowWithdraw] = useState<boolean>(false);
   const [showTransfer, setShowTransfer] = useState<boolean>(false);
   const [myState, setState] = useState<WalletDetailsFCState>({
      otpCode: '',
      amount: '',
      beneficiary: defaultBeneficiary,
      isModalSuccess: false,
      withdrawConfirmModal: false,
      withdrawDone: false,
      total: '',
      network: '',
      displayAddress: 0,
      displayAddressShow: false,
   });

   useEffect(() => {
      setDocumentTitle(`${name} wallet details`);
      if (!currencies.length || !wallets.length) {
         fetchWallets();
         fetchCurrencies();
      }
      if (currency) {
         fetchBeneficiaries({ currency_id: id });
      };
   }, []);

   // useEffect(() => {
   //    toggleModalSuccess();
   // }, [withdrawSuccess]);

   useEffect(() => {
      fetchBeneficiaries({ currency_id: id });
   }, [beneficiariesActivateSuccess, beneficiariesDeleteSuccess, beneficiariesAddSuccess]);

   useLayoutEffect(() => {
      return () => clearWallets();
   }, []);

   const combainBalances = (wallets: Array<object | any>, currencies: Array<object | any>) =>
      wallets.map((wallet, i) => ({
         no: i + 1,
         ...currencies.find(item => (item?.id === wallet?.currency) && item),
         ...wallet
      }));
   const balances = combainBalances(wallets, currencies);
   const myBalance = balances.find(e => id === e.currency) || { min_confirmations: 6, deposit_enabled: false };
   const {
      currency,
      name,
      balance,
      locked,
      fixed,
      deposit_address,
      deposit_enabled,
      withdrawal_enabled,
      type,
      min_withdraw_amount,
      min_deposit_amount,
      // min_confirmations,
      fee,
      deposit_addresses,
      icon_url
   } = myBalance;

   const addressPending = deposit_address?.state;

   // const filterMarket = markets.filter(market => market.base_unit === id);
   // const getTickerValue = (id: string, tickers: { [key: string]: Ticker }) => tickers[id].last || defaultTicker.last
   // const lastPrice = getTickerValue(filterMarket[0]?.id || 'idr', marketTickers);

   const { state } = user;

   // const showWithdraw = type === 'fiat' || balance;

   // const walletAddress = deposit_address && deposit_address.address ? formatCCYAddress(currency, deposit_address.address) : '';

   const handleAction = () => {
      if (!deposit_address && deposit_enabled && wallets.length && type !== 'fiat') {
         fetchAddress({ currency });
         fetchCurrencies();
      }
   };

   const handleCopy = (url: string, type: string) => {
      copyToClipboard(url);
      fetchSuccess({ message: [`${type} Copied`], type: 'success' });
   }

   const handleShowAddress = (index: number) => setState({ ...myState, displayAddress: index, displayAddressShow: true });

   const renderAvatarModal = () => {
      return (
         <div className="flex justify-center">
            <img
               src={icon_url}
               className="w-20 h-20 text-center"
               alt={name}
               title={name}
               style={{
                  clipPath: 'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
               }}
            />
         </div>
      )
   }

   const renderContentModalDeposit = () => {
      if (state === 'pending') {
         return (
            <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary1">
               <svg className="w-6 h-6 fill-neutral8 transition-colors duration-300">
                  <use xlinkHref="#icon-wallet"></use>
               </svg>
            </div>
         )
      }
      if (!deposit_address || addressPending === 'pending') {
         return (
            <>
               {renderAvatarModal()}
               <div className="text-center text-base font-medium leading-normal">
                  You need to generate a deposit address to make deposit {id.toUpperCase()}
               </div>
               <Button
                  text={
                     state === 'pending' ? 'Go to verification'
                        : !deposit_enabled ? 'Deposite SIDR'
                           : !deposit_address ? 'Generate'
                              : 'Processing...'
                  }
                  disabled={addressPending === 'pending'}
                  withLoading={addressPending === 'pending'}
                  onClick={handleAction}
               />
            </>
         )
      }
      if (deposit_addresses && deposit_addresses.length) {
         return (
            <>
               <div className="pt-10">
                  {renderAvatarModal()}
               </div>
               <div className="text-center text-base leading-normal font-medium">
                  Select a protocol to see the corresponding address.
               </div>
               <div className="space-y-2">
                  {
                     deposit_addresses && deposit_addresses.length && deposit_addresses.map(({ address, network }, index) => (
                        <Button
                           key={address}
                           text={`Deposit On ${network && network.name || 'Protocol name'}`}
                           onClick={() => handleShowAddress(index)}
                        />
                     ))
                  }
               </div>
            </>
         )
      }
      return;
   }

   const renderContentModalTFA = () => {
      if (user.state === 'pending') {
         return (
            <>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary4">
                  <svg className="w-8 h-8 fill-neutral8 transition-colors duration-300">
                     <use xlinkHref="#icon-lock"></use>
                  </svg>
               </div>
               <div className="text-center text-base font-medium leading-normal">
                  Please verify your profile before make {showWithdraw && 'withdraw'} {showTransfer && 'transfer internal'} {id.toUpperCase()}
               </div>
               <Button
                  text="Go to verification"
                  onClick={handleWithdraw}
               />
            </>
         )
      }
      return !user?.otp && (
         <>
            <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary4">
               <svg className="w-8 h-8 fill-neutral8 transition-colors duration-300">
                  <use xlinkHref="#icon-lock"></use>
               </svg>
            </div>
            <div className="text-center text-base font-medium leading-normal">
               To {showWithdraw && 'withdraw'} {showTransfer && 'transfer internal'} {id.toUpperCase()} you have to enable 2FA
            </div>
            <Button
               text="Enabled 2FA"
               onClick={handleWithdraw}
            />
         </>
      )
   }

   const renderContentModalWithdrawal = () => (user && user.otp) && (
      <ModalWithdraw
         type={type}
         name={name}
         currency={currency}
         locked={Decimal.format(locked, currency === 'idr' ? 0 : fixed, ',')}
         minimum={Decimal.format(min_withdraw_amount, currency === 'idr' ? 0 : fixed, ',')}
         fee={fee}
         balance={Decimal.format(balance, currency === 'idr' ? 0 : fixed, ',')}
         fixed={currency === 'idr' ? 0 : precision}
         onClick={handleWithdraw}
         twoFactorAuthRequired={isTwoFactorAuthRequired(user.level, user.otp)}
      />
   )

   // const renderWithdrawContent = () => {

   // }

   const handleWithdraw = (amount?: string, total?: string, beneficiary?: Beneficiary, otpCode?: string) => {
      if (user.state === 'pending') {
         return push('/email-verification')
      } else {
         if (user && !user.otp) {
            return push('/2fa');
         }
      }
      if (user.level !== 3) {
         return push('/email-verification');
      }
      return setState((state: WalletDetailsFCState) => ({
         ...state,
         amount: amount || '',
         beneficiary: beneficiary ? beneficiary : defaultBeneficiary,
         otpCode: otpCode ? otpCode : '',
         withdrawConfirmModal: !state.withdrawConfirmModal,
         total: total || '',
         withdrawDone: false,
      }));
   };

   // ADD state
   const toggleModalSuccess = () => {
      setState((state: WalletDetailsFCState) => ({
         ...myState,
         isModalSuccess: !state.isModalSuccess,
         withdrawDone: true,
      }));
   };

   const toggleConfirmModal = (amount?: string, total?: string, beneficiary?: Beneficiary, otpCode?: string) => {
      setState((state: WalletDetailsFCState) => ({
         ...myState,
         amount: amount || '',
         beneficiary: beneficiary ? beneficiary : defaultBeneficiary,
         otpCode: otpCode ? otpCode : '',
         withdrawConfirmModal: !state.withdrawConfirmModal,
         total: total || '',
         withdrawDone: false,
      }));
   };

   const { amount, otpCode, beneficiary, withdrawConfirmModal, isModalSuccess, total, withdrawDone } = myState;

   const handleWithdrawOK = () => {
      const withdrawRequest = {
         amount,
         currency: currency.toLowerCase(),
         otp: otpCode,
         beneficiary_id: String(beneficiary.id),
      };
      walletsWithdrawCcy(withdrawRequest);
      toggleConfirmModal();
      if (withdrawDone) {
         setShowWithdraw(!showWithdraw);
      }
   };

   const isTwoFactorAuthRequired = (level: number, is2faEnabled: boolean) => level > 1 || (level === 1 && is2faEnabled);

   let confirmationAddress = '';
   let precision = DEFAULT_CCY_PRECISION;
   if (myBalance) {
      precision = fixed;
      confirmationAddress = type === 'fiat' ? (
         beneficiary.name
      ) : (
         beneficiary.data ? (beneficiary.data.address as string) : ''
      );
   }

   // const title: string = translate('page.body.wallets.tabs.deposit.fiat.message1');
   // const description: string = translate('page.body.wallets.tabs.deposit.fiat.message2');

   const renderContentTransfer = () => (user && user.otp) && (
      <ModalTransfer
         fixed={currency === 'idr' ? 0 : precision}
         currency={currency}
         balance={Decimal.format(balance, currency === 'idr' ? 0 : fixed, ',')}
         handleTransfer={handleTransfer}
      />
   );

   const handleTransfer = (receiver: string, amount: string, otp: string) => {
      const sendRequest = {
         amount,
         currency,
         otp,
         username_or_uid: receiver
      }
      // walletsTransfer(sendRequest);
      transfer(sendRequest);
      // walletsTransferData();
      if (transferLoading) {
         setShowTransfer(!showTransfer);
      }
   }

   const handleSlideRight = () => {
      if (SliderRef.current) {
         let scrollAmount = 0;
         const clientWidth = Math.max(scrollAmount += SliderRef.current.clientWidth / 2);
         SliderRef.current.scrollBy({
            top: 0,
            left: clientWidth,
            behavior: 'smooth'
         });
      }
   }

   const { marketsData } = useMarket();
   const friendsMarket = marketsData.filter(market => market.quote_unit === 'usdt')

   return (
      <>
         <div className="block lg:flex pt-8 pb-4 px-4 lg:!p-1 bg-neutral7 dark:bg-neutral1">
            <WalletSidebar />
            <div className="grow h-auto lg:h-[calc(100vh-88px)] pl-0 lg:pl-1 overflow-auto">
               <div className="p-8 pb-0 rounded bg-neutral8 dark:bg-shade2">
                  <div className="flex items-center mb-5">
                     <div className="flex items-center mr-auto">
                        <Link
                           className="mr-3 group"
                           to="/wallets"
                           title="Back to Wallets"
                        >
                           <svg className="w-8 h-8 fill-neutral4 group-hover:fill-neutral1 group-hover:-translate-x-3 group-hover:scale-105 transition-transform duration-300">
                              <use xlinkHref="#icon-arrow-left" />
                           </svg>
                        </Link>
                        <div className="mr-auto text-3.5xl font-dm font-bold leading-tight tracking-custom1">
                           {currency?.toUpperCase()}
                           <span className="ml-3 text-neutral5"> {name}</span>
                        </div>
                     </div>
                     <div className="flex items-center space-x-3">
                        <Button
                           text="Deposit"
                           size="normal"
                           onClick={() => setShowDeposit(!showDeposit)}
                           disabled={!deposit_enabled}
                        // disabled={currency === 'idr' ? false : !deposit_enabled}
                        />
                        <Button
                           text="Withdraw"
                           size="normal"
                           variant="outline"
                           onClick={() => setShowWithdraw(!showWithdraw)}
                           disabled={!withdrawal_enabled}
                        />
                        <Button
                           text="Transfer"
                           size="normal"
                           variant="outline"
                           // onClick={() => setShowTransfer(!showTransfer)}
                           onClick={() => push('/transfer', currencies.find(e => e.id === currency))}
                        // disabled={Number(balance) < Number(min_withdraw_amount)}
                        />
                     </div>
                  </div>
                  <div className="relative">
                     <div className="flex gap-10 justify-between">
                        <div>
                           <div className="mb-1 font-medium">Total balance</div>
                           <div className="flex items-center space-x-2">
                              <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
                                 {Decimal.format(balance, currency === 'idr' ? 0 : fixed, ',')}
                              </div>
                              <Badge
                                 variant="green"
                                 text={currency}
                              />
                           </div>
                           <div className="text-base text-neutral4">
                              {Decimal.format((Number(balance) * Number(5353)), 0, ',')}
                           </div>
                        </div>
                        <div ref={SliderRef} className={`relative w-[668px] flex ${friendsMarket.length === 1 ? 'justify-end' : ''} gap-10 lg:gap-20 snap-x snap-mandatory overflow-x-auto pb-8 transition-transform duration-500`}>
                           {friendsMarket.length ? friendsMarket.map(market => {
                              const klinesData: number[] = market.kline;
                              let labels: number[], data: number[];
                              labels = klinesData.map(e => e[0]);
                              data = klinesData.map(e => e[2]);

                              const change = market.price_change_percent.includes('+')
                              return (
                                 <div key={market.id} className="snap-end shrink-0 first:pl-3 last:pr-3">
                                    <div className="rounded-xl hover:shadow-lg dark:hover:bg-neutral2 p-6 cursor-pointer transition-all duration-200">
                                       <div className="flex items-center gap-3">
                                          <div className="text-xs leading-custom4 text-neutral4 font-semibold uppercase">
                                             {market.name}
                                          </div>
                                          <Badge rounded="2xl" variant={change ? 'green' : 'orange'} text={market.price_change_percent} />
                                       </div>
                                       <div className="text-2xl font-semibold tracking-custom1 leading-custom2 mt-1 mb-4 uppercase">
                                          {Decimal.format(market.last.includes(',') ? market?.last?.split(',')?.join('') : market.last, market.price_precision, ',')} {market.base_unit}
                                       </div>
                                       <div className="w-60 h-14">
                                          <PriceChart3
                                             id={market.id}
                                             theme={change ? 'positive' : 'negative'}
                                             labels={labels}
                                             data={data}
                                             maintainAspectRatio={false}
                                             gradientOpacityTop={.5}
                                             gradientOpacityBottom={.07}
                                          />
                                       </div>
                                    </div>
                                 </div>
                              )
                           }) : (
                              <div className="">
                                 Kosong
                              </div>
                           )

                           }
                           {/* <div className="snap-end shrink-0 first:pl-3 last:pr-3">
                              <div className="rounded-xl hover:shadow-lg dark:hover:bg-neutral2 p-6 cursor-pointer transition-all duration-200">
                                 <div className="flex items-center gap-3">
                                    <div className="text-xs leading-custom4 text-neutral4 font-semibold">
                                       USDT/USDC
                                    </div>
                                    <Badge rounded="2xl" variant="orange" text="-6.96%" />
                                 </div>
                                 <div className="text-2xl font-semibold tracking-custom1 leading-custom2 mt-1 mb-4">
                                    1.00069787 USDC
                                 </div>
                                 <div className="w-60 h-14">
                                    <PriceChart3
                                       id={'kokom'}
                                       theme={'negative'}
                                       labels={labels}
                                       data={data}
                                       maintainAspectRatio={false}
                                       gradientOpacityTop={.5}
                                       gradientOpacityBottom={.07}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="snap-end shrink-0 first:pl-3 last:pr-3">
                              <div className="rounded-xl hover:shadow-lg dark:hover:bg-neutral2 p-6 cursor-pointer transition-all duration-200">
                                 <div className="flex items-center gap-3">
                                    <div className="text-xs leading-custom4 text-neutral4 font-semibold">
                                       USDT/USDC
                                    </div>
                                    <Badge rounded="2xl" variant="green" text="+12.96%" />
                                 </div>
                                 <div className="text-2xl font-semibold tracking-custom1 leading-custom2 mt-1 mb-4">
                                    1.00069787 USDC
                                 </div>
                                 <div className="w-60 h-14">
                                    <PriceChart3
                                       id={'kokom'}
                                       theme={'positive'}
                                       labels={labels}
                                       data={data}
                                       maintainAspectRatio={false}
                                       gradientOpacityTop={.5}
                                       gradientOpacityBottom={.07}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="snap-end shrink-0 first:pl-3 last:pr-3">
                              <div className="rounded-xl hover:shadow-lg dark:hover:bg-neutral2 p-6 cursor-pointer transition-all duration-200">
                                 <div className="flex items-center gap-3">
                                    <div className="text-xs leading-custom4 text-neutral4 font-semibold">
                                       USDT/USDC
                                    </div>
                                    <Badge rounded="2xl" variant="orange" text="+12.96%" />
                                 </div>
                                 <div className="text-2xl font-semibold tracking-custom1 leading-custom2 mt-1 mb-4">
                                    1.00069787 USDC
                                 </div>
                                 <div className="w-60 h-14">
                                    <PriceChart3
                                       id={'kokom'}
                                       theme={'negative'}
                                       labels={labels}
                                       data={data}
                                       maintainAspectRatio={false}
                                       gradientOpacityTop={.5}
                                       gradientOpacityBottom={.07}
                                    />
                                 </div>
                              </div>
                           </div> */}
                        </div>
                     </div>
                     {friendsMarket.length > 2 && (
                        <div className="absolute top-[36%] right-0">
                           <div
                              onClick={handleSlideRight}
                              className="group flex items-center justify-center bg-shade5 hover:bg-neutral6 dark:bg-neutral2 animate-right hover:animate-none shadow-card rounded-full w-10 h-10 cursor-pointer hover:scale-110 transition-all duration-300"
                           >
                              <svg className="w-6 h-6 fill-neutral4 group-hover:w-7 group-hover:h-7 transition-colors duration-300">
                                 <use xlinkHref="#icon-arrow-right" />
                              </svg>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
               <div className="mt-1 bg-neutral8 dark:bg-shade2 p-8 rounded">
                  <TableFinance
                     title="Finances"
                     hiddenCategory={[0, 4]}
                  />
               </div>
               {/* <div>
                  <div>
                     <div className="pt-5 pb-2 px-8 text-xs text-neutral4 font-medium leading-relaxed">Account Balances</div>
                     <div className="bg-neutral8 dark:bg-shade1 rounded overflow-hidden">
                        <div>
                           <div className="block md:flex bg-neutral7 dark:bg-neutral1">
                              <div className="grow md:mr-1">
                                 <div className="flex flex-wrap -m-0.5">
                                    <div className="flex items-start grow-0 shrink-0 basis-c-full-1 1xl:basis-c-1/2-1 w-c-full-1 1xl:w-c-1/2-1 m-0.5 py-5 px-6 md:px-8 rounded bg-neutral8 dark:bg-shade1">
                                       <div className="flex items-center mr-auto font-medium text-neutral3 dark:text-neutral7">
                                          <div className="bg-primary3 shrink-0 w-3 h-3 mr-2 rounded" />
                                          Exchange
                                       </div>
                                       <div className="text-right">
                                          <div className="text-base font-medium">0.2785689852 BTC</div>
                                          <div className="text-neutral4">$10,098.36</div>
                                       </div>
                                    </div>
                                    <div className="flex items-start grow-0 shrink-0 basis-c-full-1 1xl:basis-c-1/2-1 w-c-full-1 1xl:w-c-1/2-1 m-0.5 py-5 px-6 md:px-8 rounded bg-neutral8 dark:bg-shade1">
                                       <div className="flex items-center mr-auto font-medium text-neutral3 dark:text-neutral7">
                                          <div className="bg-secondary3 shrink-0 w-3 h-3 mr-2 rounded" />
                                          Fiat and Spot
                                       </div>
                                       <div className="text-right">
                                          <div className="text-base font-medium">0.2785689852 BTC</div>
                                          <div className="text-neutral4">$10,098.36</div>
                                       </div>
                                    </div>
                                    <div className="flex items-start grow-0 shrink-0 basis-c-full-1  w-c-full-1 m-0.5 py-5 px-6 md:px-8 rounded bg-neutral8 dark:bg-shade1">
                                       <div className="flex items-center mr-auto font-medium text-neutral3 dark:text-neutral7">
                                          <div className="bg-secondary1 shrink-0 w-3 h-3 mr-2 rounded" />
                                          Available
                                       </div>
                                       <div className="text-right">
                                          <div className="text-base font-medium">0.2785689852 BTC</div>
                                          <div className="text-neutral4">$10,098.36</div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex flex-col shrink-0 w-full md:w-71.25 p-6 bg-neutral8 dark:bg-shade1 rounded mt-1 md:mt-0">
                                 <div className="flex items-center space-x-3 mb-1">
                                    <div className="text-xs leading-custom4 font-semibold text-neutral4">USDT/USDC</div>
                                    <Badge
                                       text="+65%"
                                       variant="green"
                                       className="!rounded-xl"
                                    />
                                 </div>
                                 <div className="mb-4 text-2xl leading-custom2 font-semibold tracking-custom1">
                                    1.00069787 USDC
                                 </div>
                                 <div className="w-full -mt-2 -mb-4">
                                    This is a Chart
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <div className="pt-5 pb-2 px-8 text-xs text-neutral4 font-medium leading-relaxed">FAQ</div>
                     <div className="bg-neutral8 dark:bg-shade1 rounded overflow-hidden">
                        <div className="p-6 md:p-8">
                           <div className="block md:flex flex-wrap -mt-5 md:-mt-8">
                              <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
                                 <div className="shrink-0 w-32">
                                    <img className="w-full rounded-lg" srcSet={`${illusFaq2} 2x`} src={illusFaq} alt="Img" />
                                 </div>
                                 <div className="grow">
                                    <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
                                    <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
                                 </div>
                              </Link>
                              <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
                                 <div className="shrink-0 w-32">
                                    <img className="w-full rounded-lg" srcSet={`${illusFaq12} 2x`} src={illusFaq11} alt="Img" />
                                 </div>
                                 <div className="grow">
                                    <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
                                    <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
                                 </div>
                              </Link>
                              <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
                                 <div className="shrink-0 w-32">
                                    <img className="w-full rounded-lg" srcSet={`${illusFaq2} 2x`} src={illusFaq} alt="Img" />
                                 </div>
                                 <div className="grow">
                                    <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
                                    <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
                                 </div>
                              </Link>
                              <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
                                 <div className="shrink-0 w-32">
                                    <img className="w-full rounded-lg" srcSet={`${illusFaq12} 2x`} src={illusFaq11} alt="Img" />
                                 </div>
                                 <div className="grow">
                                    <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
                                    <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
                                 </div>
                              </Link>
                              <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
                                 <div className="shrink-0 w-32">
                                    <img className="w-full rounded-lg" srcSet={`${illusFaq2} 2x`} src={illusFaq} alt="Img" />
                                 </div>
                                 <div className="grow">
                                    <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
                                    <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
                                 </div>
                              </Link>
                              <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
                                 <div className="shrink-0 w-32">
                                    <img className="w-full rounded-lg" srcSet={`${illusFaq12} 2x`} src={illusFaq11} alt="Img" />
                                 </div>
                                 <div className="grow">
                                    <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
                                    <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
                                 </div>
                              </Link>
                           </div>
                           <Link to="/learn-crypto">
                              <Button
                                 text="View all"
                                 variant="outline"
                                 size="normal"
                                 className="mt-8"
                                 width="noFull"
                              />
                           </Link>
                        </div>
                     </div>
                  </div>
               </div> */}
            </div>
         </div>

         {/* Modal Deposite */}
         <Portal
            title={state === 'pending' ? 'Deposit Locked' :
               !deposit_enabled ? 'Deposit Disabled' :
                  !deposit_address ? 'Generate Address' : ''
            }
            // info={`${(deposit_address && deposit_address?.address) ? `on ${name}` : ''}`}
            close={() => setShowDeposit(!showDeposit)}
            show={showDeposit}
         >
            {
               // JSON.stringify(deposit_address)
            }
            {/* <div className="flex flex-col items-center justify-center text-center mx-auto">
               <img src={myBalance.icon_url} className="w-20 h-20" alt={name} title={name} style={{
                  clipPath: 'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
               }} />
               {
                  !deposit_address && (
                     <div className="text-base">
                        You need to generate a deposit address to make deposit {name}
                     </div>
                  )
               }
            </div> */}
            {/* {
               (deposit_address && deposit_address?.address) && (
                  <>
                     <div className="text-center space-y-3">
                        <div className="font-medium text-base leading-normal">
                           {
                              state === 'pending' ? 'Please verify your profile before make IDR deposits'
                                 : !deposit_enabled ? 'Please deposite via SIDR'
                                    : !deposit_address ? `You need to generate a deposit address to make deposit ${name}`
                                       : 'Address'
                              // : 'Select a protocol to see the corresponding address.'
                           }
                        </div>
                        <div className="text-xs text-neutral4 leading-custom4">
                           Only send {id?.toUpperCase()} to this address. Sending any other asset to this address may result in the loss of your deposit!
                        </div>
                     </div>
                     <InputGroup
                        label="Payment Address"
                        value={!deposit_address?.address ? 'Loading...' : deposit_address?.address}
                        icon={
                           <svg
                              onClick={() => handleCopy(((deposit_address && deposit_address?.address) || ''), 'Address')}
                              className="-translate-x-0.5 w-6 h-6 fill-neutral4 group-hover:fill-neutral2"
                           >
                              <use xlinkHref="#icon-copy" />
                           </svg>
                        }
                        readOnly
                        info={`Minimum deposit ${Decimal.format(min_deposit_amount, currency === 'idr' ? 0 : fixed, ',')} ${currency?.toUpperCase()}`}
                        infoAlt={`Confirmations ${min_confirmations}`}
                        className="!bg-neutral7"
                     />
                     <div className="flex justify-center items-center">
                        <div className="p-4 rounded-lg border-2 border-dashed border-primary1">
                           <QRCodeGenerator
                              value={walletAddress}
                              size={128}
                              renderAs="svg"
                           />
                        </div>
                     </div>
                     <div className="text-x text-center leading-[1.6] font-medium text-neutral4">Please be sure that the contract address is related to the tokens that you are depositing.</div>
                  </>
               )
            } */}
            {renderContentModalDeposit()}
         </Portal>

         {/* Modal Withdraw */}
         <Portal
            title={user.otp ? `Withdrawal ${id?.toUpperCase()}` : 'Withdraw Locked'}
            close={() => setShowWithdraw(!showWithdraw)}
            show={showWithdraw}
         >
            {renderContentModalTFA()}
            {renderContentModalWithdrawal()}
         </Portal>

         {/* Modal Transfer */}
         <Portal
            title={user.otp ? 'Transfer Internal' : 'Transfer Locked'}
            close={() => setShowTransfer(!showTransfer)}
            show={showTransfer}
         >
            {renderContentModalTFA()}
            {renderContentTransfer()}
         </Portal>
         <ModalDeposit
            show={myState.displayAddressShow}
            close={() => setState({ ...myState, displayAddressShow: false })}
            protocol={String(deposit_addresses && deposit_addresses.length && deposit_addresses[myState.displayAddress].network?.name)}
            name={name}
            icon={renderAvatarModal()}
            address={String(deposit_addresses && deposit_addresses.length && deposit_addresses[myState.displayAddress].address)}
            handleCopy={handleCopy}
            min_confirmations={Number(deposit_addresses && deposit_addresses.length && deposit_addresses[myState.displayAddress].network?.min_confirmations)}
            min_deposit_amount={min_deposit_amount}
         />
         <ModalWithdrawConfirm
            show={withdrawConfirmModal}
            total={Decimal.format(total, precision, ',')}
            currency={currency}
            rid={confirmationAddress}
            onSubmit={handleWithdrawOK}
            close={toggleConfirmModal}
         />
         <ModalWithdrawDone show={isModalSuccess} close={toggleModalSuccess} />
      </>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   user: selectUserInfo(state),
   wallets: selectWallets(state),
   currencies: selectCurrencies(state),
   markets: selectMarkets(state),
   marketTickers: selectMarketTickers(state),
   withdrawSuccess: selectWithdrawSuccess(state),
   transferSuccess: selectTransferSuccess(state),
   transferLoading: selectTransferLoading(state),
   walletsLoading: selectWalletsLoading(state),
   historyList: selectHistory(state),
   beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
   beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
   beneficiariesAddSuccess: selectBeneficiariesCreateSuccess(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   fetchBeneficiaries: params => dispatch(beneficiariesFetch(params)),
   fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
   fetchWallets: () => dispatch(walletsFetch()),
   clearWallets: () => dispatch(walletsData([])),
   walletsWithdrawCcy: params => dispatch(walletsWithdrawCcyFetch(params)),
   walletsTransfer: params => dispatch(walletsTransferFetch(params)),
   transfer: params => dispatch(transferCreate(params)),
   walletsTransferData: () => dispatch(walletsTransferData()),
   fetchCurrencies: () => dispatch(currenciesFetch()),
   fetchMarkets: () => dispatch(marketsFetch()),
   fetchSuccess: payload => dispatch(alertPush(payload)),
});

export const WalletDetails = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(WalletDetailsFC) as FunctionComponent;



// import React, {
//    useEffect,
//    useState,
//    FunctionComponent,
//    useLayoutEffect,
// } from 'react';
// import {
//    Link,
//    useParams,
//    withRouter,
// } from 'react-router-dom';
// import { RouterProps } from 'react-router';
// import { compose } from 'redux';
// import {
//    connect,
//    MapDispatchToProps,
// } from 'react-redux';
// import { injectIntl } from 'react-intl';
// import {
//    Badge,
//    Button,
//    Decimal,
//    ModalDeposit,
//    ModalTransfer,
//    ModalWithdraw,
//    ModalWithdrawConfirm,
//    ModalWithdrawDone,
//    Portal,
//    WalletSidebar
// } from 'components';
// import {
//    illusFaq,
//    illusFaq11,
//    illusFaq12,
//    illusFaq2
// } from 'assets';
// import {
//    currenciesFetch,
//    Currency,
//    RootState,
//    selectCurrencies,
//    Wallet,
//    walletsFetch,
//    selectWallets,
//    selectWalletsLoading,
//    Market,
//    marketsFetch,
//    selectMarkets,
//    Ticker,
//    selectMarketTickers,
//    User,
//    selectUserInfo,
//    WalletHistoryList,
//    alertPush,
//    walletsWithdrawCcyFetch,
//    walletsAddressFetch,
//    beneficiariesFetch,
//    selectWithdrawSuccess,
//    selectHistory,
//    selectBeneficiariesActivateSuccess,
//    selectBeneficiariesDeleteSuccess,
//    selectBeneficiariesCreateSuccess,
//    walletsData,
//    Beneficiary,
//    walletsTransferFetch,
//    selectTransferSuccess,
//    walletsTransferData,
//    transferCreate,
//    selectTransferLoading,
// } from 'modules';
// import { copyToClipboard, setDocumentTitle } from 'helpers';
// import { IntlProps } from 'index';
// import { defaultBeneficiary, Params } from './types';
// import { DEFAULT_CCY_PRECISION, DEFAULT_WALLET } from '../../constants';

// export interface WithdrawProps {
//    amount: string;
//    total: string;
//    beneficiary_id: Beneficiary;
//    otp: string;
// }

// interface ReduxProps {
//    user: User;
//    wallets: Wallet[];
//    currencies: Currency[];
//    markets: Market[]
//    marketTickers: {
//       [key: string]: Ticker
//    }
//    withdrawSuccess: boolean;
//    transferSuccess: boolean;
//    transferLoading: boolean;
//    walletsLoading?: boolean;
//    historyList: WalletHistoryList;
//    beneficiariesActivateSuccess: boolean;
//    beneficiariesDeleteSuccess: boolean;
//    beneficiariesAddSuccess: boolean;
// }

// interface DispatchProps {
//    fetchBeneficiaries: typeof beneficiariesFetch;
//    fetchAddress: typeof walletsAddressFetch;
//    fetchWallets: typeof walletsFetch;
//    clearWallets: () => void;
//    walletsWithdrawCcy: typeof walletsWithdrawCcyFetch;
//    walletsTransfer: typeof walletsTransferFetch;
//    transfer: typeof transferCreate;
//    walletsTransferData: typeof walletsTransferData;
//    fetchCurrencies: typeof currenciesFetch;
//    fetchMarkets: typeof marketsFetch;
//    fetchSuccess: typeof alertPush;
// }

// interface OwnProps {
//    walletsError: {
//       message: string;
//    };
// }

// interface WalletDetailsFCState {
//    otpCode: string;
//    amount: string;
//    beneficiary: Beneficiary;
//    isModalSuccess: boolean;
//    withdrawConfirmModal: boolean;
//    withdrawDone: boolean;
//    total: string;
//    network: string;
//    bchAddress?: string;
//    filteredWallets?: Wallet[] | null;
//    displayAddress: number;
//    displayAddressShow: boolean;
// }

// type Props = ReduxProps & DispatchProps & OwnProps & IntlProps & RouterProps;

// const WalletDetailsFC = ({
//    user,
//    wallets,
//    currencies,
//    markets,
//    marketTickers,
//    withdrawSuccess,
//    transferSuccess,
//    transferLoading,
//    walletsLoading,
//    historyList,
//    beneficiariesActivateSuccess,
//    beneficiariesDeleteSuccess,
//    beneficiariesAddSuccess,

//    fetchBeneficiaries,
//    fetchAddress,
//    fetchWallets,
//    clearWallets,
//    walletsWithdrawCcy,
//    walletsTransfer,
//    walletsTransferData,
//    transfer,
//    fetchCurrencies,
//    fetchMarkets,
//    fetchSuccess,

//    walletsError,

//    history,
//    intl,

// }: Props) => {
//    const { id = '' } = useParams<Params>() || DEFAULT_WALLET.currency;
//    const { push } = history;
//    // const translate = (id: string) => intl.formatMessage({ id });

//    const [showDeposit, setShowDeposit] = useState<boolean>(false);
//    const [showWithdraw, setShowWithdraw] = useState<boolean>(false);
//    const [showTransfer, setShowTransfer] = useState<boolean>(false);
//    const [myState, setState] = useState<WalletDetailsFCState>({
//       otpCode: '',
//       amount: '',
//       beneficiary: defaultBeneficiary,
//       isModalSuccess: false,
//       withdrawConfirmModal: false,
//       withdrawDone: false,
//       total: '',
//       network: '',
//       displayAddress: 0,
//       displayAddressShow: false,
//    });

//    useEffect(() => {
//       setDocumentTitle(`${name} wallet details`);
//       if (!currencies.length || !wallets.length) {
//          fetchWallets();
//          fetchCurrencies();
//       }
//       if (currency) {
//          fetchBeneficiaries({ currency_id: id });
//       };
//    }, []);

//    // useEffect(() => {
//    //    toggleModalSuccess();
//    // }, [withdrawSuccess]);

//    useEffect(() => {
//       fetchBeneficiaries({ currency_id: id });
//    }, [beneficiariesActivateSuccess, beneficiariesDeleteSuccess, beneficiariesAddSuccess]);

//    useLayoutEffect(() => {
//       return () => clearWallets();
//    }, []);
//    const myBalance: Wallet = (wallets && wallets.find(item => item.currency === id)) || DEFAULT_WALLET;
//    // const myBalance = balances.find(e => id === e.currency) || { min_confirmations: 6, deposit_enabled: false };
//    // const {
//    //    currency,
//    //    name,
//    //    balance,
//    //    locked,
//    //    fixed,
//    //    deposit_address,
//    //    deposit_enabled,
//    //    withdrawal_enabled,
//    //    type,
//    //    min_withdraw_amount,
//    //    min_deposit_amount,
//    //    // min_confirmations,
//    //    fee,
//    //    deposit_addresses,
//    //    icon_url
//    // } = myBalance;

//    const addressPending = deposit_address?.state;

//    // const filterMarket = markets.filter(market => market.base_unit === id);
//    // const getTickerValue = (id: string, tickers: { [key: string]: Ticker }) => tickers[id].last || defaultTicker.last
//    // const lastPrice = getTickerValue(filterMarket[0]?.id || 'idr', marketTickers);

//    const { state } = user;

//    // const showWithdraw = type === 'fiat' || balance;

//    // const walletAddress = deposit_address && deposit_address.address ? formatCCYAddress(currency, deposit_address.address) : '';

//    const handleAction = () => {
//       if (!deposit_address && deposit_enabled && wallets.length && type !== 'fiat') {
//          fetchAddress({ currency });
//          fetchCurrencies();
//       }
//    };

//    const handleCopy = (url: string, type: string) => {
//       copyToClipboard(url);
//       fetchSuccess({ message: [`${type} Copied`], type: 'success' });
//    }

//    const handleShowAddress = (index: number) => setState({ ...myState, displayAddress: index, displayAddressShow: true });

//    const renderAvatarModal = () => {
//       return (
//          <div className="flex justify-center">
//             <img
//                src={icon_url}
//                className="w-20 h-20 text-center"
//                alt={name}
//                title={name}
//                style={{
//                   clipPath: 'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
//                }}
//             />
//          </div>
//       )
//    }

//    const renderContentModalDeposit = () => {
//       if (state === 'pending') {
//          return (
//             <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary1">
//                <svg className="w-6 h-6 fill-neutral8 transition-colors duration-300">
//                   <use xlinkHref="#icon-wallet"></use>
//                </svg>
//             </div>
//          )
//       }
//       if (!deposit_address || addressPending === 'pending') {
//          return (
//             <>
//                {renderAvatarModal()}
//                <div className="text-center text-base font-medium leading-normal">
//                   You need to generate a deposit address to make deposit {id.toUpperCase()}
//                </div>
//                <Button
//                   text={
//                      state === 'pending' ? 'Go to verification'
//                         : !deposit_enabled ? 'Deposite SIDR'
//                            : !deposit_address ? 'Generate'
//                               : 'Processing...'
//                   }
//                   disabled={addressPending === 'pending'}
//                   withLoading={addressPending === 'pending'}
//                   onClick={handleAction}
//                />
//             </>
//          )
//       }
//       if (deposit_addresses && deposit_addresses.length) {
//          return (
//             <>
//                <div className="pt-10">
//                   {renderAvatarModal()}
//                </div>
//                <div className="text-center text-base leading-normal font-medium">
//                   Select a protocol to see the corresponding address.
//                </div>
//                <div className="space-y-2">
//                   {
//                      deposit_addresses && deposit_addresses.length && deposit_addresses.map(({ address, network }, index) => (
//                         <Button
//                            key={address}
//                            text={`Deposit On ${network && network.name || 'Protocol name'}`}
//                            onClick={() => handleShowAddress(index)}
//                         />
//                      ))
//                   }
//                </div>
//             </>
//          )
//       }
//       return;
//    }

//    const renderContentModalTFA = () => {
//       if (user.state === 'pending') {
//          return (
//             <>
//                <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary4">
//                   <svg className="w-8 h-8 fill-neutral8 transition-colors duration-300">
//                      <use xlinkHref="#icon-lock"></use>
//                   </svg>
//                </div>
//                <div className="text-center text-base font-medium leading-normal">
//                   Please verify your profile before make {showWithdraw && 'withdraw'} {showTransfer && 'transfer internal'} {id.toUpperCase()}
//                </div>
//                <Button
//                   text="Go to verification"
//                   onClick={handleWithdraw}
//                />
//             </>
//          )
//       }
//       return !user?.otp && (
//          <>
//             <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-primary4">
//                <svg className="w-8 h-8 fill-neutral8 transition-colors duration-300">
//                   <use xlinkHref="#icon-lock"></use>
//                </svg>
//             </div>
//             <div className="text-center text-base font-medium leading-normal">
//                To {showWithdraw && 'withdraw'} {showTransfer && 'transfer internal'} {id.toUpperCase()} you have to enable 2FA
//             </div>
//             <Button
//                text="Enabled 2FA"
//                onClick={handleWithdraw}
//             />
//          </>
//       )
//    }

//    const renderContentModalWithdrawal = () => (user && user.otp) && (
//       <ModalWithdraw
//          type={type}
//          name={name}
//          currency={currency}
//          locked={Decimal.format(locked, currency === 'idr' ? 0 : fixed, ',')}
//          minimum={Decimal.format(min_withdraw_amount, currency === 'idr' ? 0 : fixed, ',')}
//          fee={fee}
//          balance={Decimal.format(balance, currency === 'idr' ? 0 : fixed, ',')}
//          fixed={currency === 'idr' ? 0 : precision}
//          onClick={handleWithdraw}
//          twoFactorAuthRequired={isTwoFactorAuthRequired(user.level, user.otp)}
//       />
//    )

//    // const renderWithdrawContent = () => {

//    // }

//    const handleWithdraw = (amount?: string, total?: string, beneficiary?: Beneficiary, otpCode?: string) => {
//       if (user.state === 'pending') {
//          return push('/email-verification')
//       } else {
//          if (user && !user.otp) {
//             return push('/2fa');
//          }
//       }
//       if (user.level !== 3) {
//          return push('/email-verification');
//       }
//       return setState((state: WalletDetailsFCState) => ({
//          ...state,
//          amount: amount || '',
//          beneficiary: beneficiary ? beneficiary : defaultBeneficiary,
//          otpCode: otpCode ? otpCode : '',
//          withdrawConfirmModal: !state.withdrawConfirmModal,
//          total: total || '',
//          withdrawDone: false,
//       }));
//    };

//    // ADD state
//    const toggleModalSuccess = () => {
//       setState((state: WalletDetailsFCState) => ({
//          ...myState,
//          isModalSuccess: !state.isModalSuccess,
//          withdrawDone: true,
//       }));
//    };

//    const toggleConfirmModal = (amount?: string, total?: string, beneficiary?: Beneficiary, otpCode?: string) => {
//       setState((state: WalletDetailsFCState) => ({
//          ...myState,
//          amount: amount || '',
//          beneficiary: beneficiary ? beneficiary : defaultBeneficiary,
//          otpCode: otpCode ? otpCode : '',
//          withdrawConfirmModal: !state.withdrawConfirmModal,
//          total: total || '',
//          withdrawDone: false,
//       }));
//    };

//    const { amount, otpCode, beneficiary, withdrawConfirmModal, isModalSuccess, total, withdrawDone } = myState;

//    const handleWithdrawOK = () => {
//       const withdrawRequest = {
//          amount,
//          currency: currency.toLowerCase(),
//          otp: otpCode,
//          beneficiary_id: String(beneficiary.id),
//       };
//       walletsWithdrawCcy(withdrawRequest);
//       toggleConfirmModal();
//       if (withdrawDone) {
//          setShowWithdraw(!showWithdraw);
//       }
//    };

//    const isTwoFactorAuthRequired = (level: number, is2faEnabled: boolean) => level > 1 || (level === 1 && is2faEnabled);

//    let confirmationAddress = '';
//    let precision = DEFAULT_CCY_PRECISION;
//    if (myBalance) {
//       precision = fixed;
//       confirmationAddress = type === 'fiat' ? (
//          beneficiary.name
//       ) : (
//          beneficiary.data ? (beneficiary.data.address as string) : ''
//       );
//    }

//    // const title: string = translate('page.body.wallets.tabs.deposit.fiat.message1');
//    // const description: string = translate('page.body.wallets.tabs.deposit.fiat.message2');

//    const renderContentTransfer = () => (user && user.otp) && (
//       <ModalTransfer
//          fixed={currency === 'idr' ? 0 : precision}
//          currency={currency}
//          balance={Decimal.format(balance, currency === 'idr' ? 0 : fixed, ',')}
//          handleTransfer={handleTransfer}
//       />
//    );

//    const handleTransfer = (receiver: string, amount: string, otp: string) => {
//       const sendRequest = {
//          amount,
//          currency,
//          otp,
//          username_or_uid: receiver
//       }
//       // walletsTransfer(sendRequest);
//       transfer(sendRequest);
//       // walletsTransferData();
//       if (transferLoading) {
//          setShowTransfer(!showTransfer);
//       }
//    }

//    return (
//       <>
//          {/* {JSON.stringify(transferLoading)} */}
//          <div className="block lg:flex pt-8 pb-4 px-4 lg:!p-1 bg-neutral7 dark:bg-neutral1">
//             <WalletSidebar />
//             <div className="grow h-auto lg:h-[calc(100vh-88px)] pl-0 lg:pl-1 overflow-auto">
//                <div className="p-8 rounded bg-neutral8 dark:bg-shade2">
//                   <div className="flex items-center mb-5">
//                      <div className="flex items-center mr-auto">
//                         <Link
//                            className="mr-3"
//                            to="/wallet-overview"
//                         >
//                            <svg className="w-8 h-8 fill-neutral4 transition-all duration-300">
//                               <use xlinkHref="#icon-arrow-left" />
//                            </svg>
//                         </Link>
//                         <div className="mr-auto text-3.5xl font-dm font-bold leading-tight tracking-custom1">
//                            {currency?.toUpperCase()}
//                            <span className="ml-3 text-neutral5"> {name}</span>
//                         </div>
//                      </div>
//                      <div className="flex items-center space-x-3">
//                         <Button
//                            text="Deposit"
//                            size="normal"
//                            onClick={() => setShowDeposit(!showDeposit)}
//                            disabled={!deposit_enabled}
//                         // disabled={currency === 'idr' ? false : !deposit_enabled}
//                         />
//                         <Button
//                            text="Withdraw"
//                            size="normal"
//                            variant="outline"
//                            onClick={() => setShowWithdraw(!showWithdraw)}
//                            disabled={!withdrawal_enabled}
//                         />
//                         <Button
//                            text="Transfer"
//                            size="normal"
//                            variant="outline"
//                            // onClick={() => setShowTransfer(!showTransfer)}
//                            onClick={() => push('/transfer', currencies.find(e => e.id === currency))}
//                         // disabled={Number(balance) < Number(min_withdraw_amount)}
//                         />
//                      </div>
//                   </div>
//                   <div>
//                      <div className="mb-1 font-medium">Total balance</div>
//                      <div className="flex items-center space-x-2">
//                         <div className="text-2xl font-semibold tracking-custom1 leading-custom2">
//                            {Decimal.format(balance, currency === 'idr' ? 0 : fixed, ',')}
//                         </div>
//                         <Badge
//                            variant="green"
//                            text={currency}
//                         />
//                      </div>
//                      <div className="text-base text-neutral4">
//                         {Decimal.format((Number(balance) * Number(5353)), 0, ',')}
//                      </div>
//                   </div>
//                </div>
//                <div>
//                   <div>
//                      <div className="pt-5 pb-2 px-8 text-xs text-neutral4 font-medium leading-relaxed">Account Balances</div>
//                      <div className="bg-neutral8 dark:bg-shade1 rounded overflow-hidden">
//                         <div>
//                            <div className="block md:flex bg-neutral7 dark:bg-neutral1">
//                               <div className="grow md:mr-1">
//                                  <div className="flex flex-wrap -m-0.5">
//                                     <div className="flex items-start grow-0 shrink-0 basis-c-full-1 1xl:basis-c-1/2-1 w-c-full-1 1xl:w-c-1/2-1 m-0.5 py-5 px-6 md:px-8 rounded bg-neutral8 dark:bg-shade1">
//                                        <div className="flex items-center mr-auto font-medium text-neutral3 dark:text-neutral7">
//                                           <div className="bg-primary3 shrink-0 w-3 h-3 mr-2 rounded" />
//                                           Exchange
//                                        </div>
//                                        <div className="text-right">
//                                           <div className="text-base font-medium">0.2785689852 BTC</div>
//                                           <div className="text-neutral4">$10,098.36</div>
//                                        </div>
//                                     </div>
//                                     <div className="flex items-start grow-0 shrink-0 basis-c-full-1 1xl:basis-c-1/2-1 w-c-full-1 1xl:w-c-1/2-1 m-0.5 py-5 px-6 md:px-8 rounded bg-neutral8 dark:bg-shade1">
//                                        <div className="flex items-center mr-auto font-medium text-neutral3 dark:text-neutral7">
//                                           <div className="bg-secondary3 shrink-0 w-3 h-3 mr-2 rounded" />
//                                           Fiat and Spot
//                                        </div>
//                                        <div className="text-right">
//                                           <div className="text-base font-medium">0.2785689852 BTC</div>
//                                           <div className="text-neutral4">$10,098.36</div>
//                                        </div>
//                                     </div>
//                                     <div className="flex items-start grow-0 shrink-0 basis-c-full-1  w-c-full-1 m-0.5 py-5 px-6 md:px-8 rounded bg-neutral8 dark:bg-shade1">
//                                        <div className="flex items-center mr-auto font-medium text-neutral3 dark:text-neutral7">
//                                           <div className="bg-secondary1 shrink-0 w-3 h-3 mr-2 rounded" />
//                                           Available
//                                        </div>
//                                        <div className="text-right">
//                                           <div className="text-base font-medium">0.2785689852 BTC</div>
//                                           <div className="text-neutral4">$10,098.36</div>
//                                        </div>
//                                     </div>
//                                  </div>
//                               </div>
//                               <div className="flex flex-col shrink-0 w-full md:w-71.25 p-6 bg-neutral8 dark:bg-shade1 rounded mt-1 md:mt-0">
//                                  <div className="flex items-center space-x-3 mb-1">
//                                     <div className="text-xs leading-custom4 font-semibold text-neutral4">USDT/USDC</div>
//                                     <Badge
//                                        text="+65%"
//                                        variant="green"
//                                        className="!rounded-xl"
//                                     />
//                                  </div>
//                                  <div className="mb-4 text-2xl leading-custom2 font-semibold tracking-custom1">
//                                     1.00069787 USDC
//                                  </div>
//                                  <div className="w-full -mt-2 -mb-4">
//                                     This is a Chart
//                                  </div>
//                               </div>
//                            </div>
//                         </div>
//                      </div>
//                   </div>
//                   <div>
//                      <div className="pt-5 pb-2 px-8 text-xs text-neutral4 font-medium leading-relaxed">FAQ</div>
//                      <div className="bg-neutral8 dark:bg-shade1 rounded overflow-hidden">
//                         <div className="p-6 md:p-8">
//                            <div className="block md:flex flex-wrap -mt-5 md:-mt-8">
//                               <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
//                                  <div className="shrink-0 w-32">
//                                     <img className="w-full rounded-lg" srcSet={`${illusFaq2} 2x`} src={illusFaq} alt="Img" />
//                                  </div>
//                                  <div className="grow">
//                                     <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
//                                     <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
//                                  </div>
//                               </Link>
//                               <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
//                                  <div className="shrink-0 w-32">
//                                     <img className="w-full rounded-lg" srcSet={`${illusFaq12} 2x`} src={illusFaq11} alt="Img" />
//                                  </div>
//                                  <div className="grow">
//                                     <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
//                                     <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
//                                  </div>
//                               </Link>
//                               <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
//                                  <div className="shrink-0 w-32">
//                                     <img className="w-full rounded-lg" srcSet={`${illusFaq2} 2x`} src={illusFaq} alt="Img" />
//                                  </div>
//                                  <div className="grow">
//                                     <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
//                                     <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
//                                  </div>
//                               </Link>
//                               <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
//                                  <div className="shrink-0 w-32">
//                                     <img className="w-full rounded-lg" srcSet={`${illusFaq12} 2x`} src={illusFaq11} alt="Img" />
//                                  </div>
//                                  <div className="grow">
//                                     <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
//                                     <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
//                                  </div>
//                               </Link>
//                               <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
//                                  <div className="shrink-0 w-32">
//                                     <img className="w-full rounded-lg" srcSet={`${illusFaq2} 2x`} src={illusFaq} alt="Img" />
//                                  </div>
//                                  <div className="grow">
//                                     <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
//                                     <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
//                                  </div>
//                               </Link>
//                               <Link to="#" className="group flex items-center space-x-3 md:space-x-5 grow-0 shrink-0 basis-1/2 1xl:basis-1/3 w-full md:w-1/2 1xl:w-1/3 mt-5 md:mt-8 md:pr-5 transition-all duration-300">
//                                  <div className="shrink-0 w-32">
//                                     <img className="w-full rounded-lg" srcSet={`${illusFaq12} 2x`} src={illusFaq11} alt="Img" />
//                                  </div>
//                                  <div className="grow">
//                                     <div className="text-xs text-neutral4 leading-custom4">Blockchain</div>
//                                     <div className="font-medium transition-colors duration-500 group-hover:text-primary1">How to deposit/withdraw cryptocurrency on</div>
//                                  </div>
//                               </Link>
//                            </div>
//                            <Link to="/learn-crypto">
//                               <Button
//                                  text="View all"
//                                  variant="outline"
//                                  size='normal'
//                                  className="mt-8"
//                               />
//                            </Link>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </div>

//          {/* Modal Deposite */}
//          <Portal
//             title={state === 'pending' ? 'Deposit Locked' :
//                !deposit_enabled ? 'Deposit Disabled' :
//                   !deposit_address ? 'Generate Address' : ''
//             }
//             // info={`${(deposit_address && deposit_address?.address) ? `on ${name}` : ''}`}
//             close={() => setShowDeposit(!showDeposit)}
//             show={showDeposit}
//          >
//             {
//                // JSON.stringify(deposit_address)
//             }
//             {/* <div className="flex flex-col items-center justify-center text-center mx-auto">
//                <img src={myBalance.icon_url} className="w-20 h-20" alt={name} title={name} style={{
//                   clipPath: 'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
//                }} />
//                {
//                   !deposit_address && (
//                      <div className="text-base">
//                         You need to generate a deposit address to make deposit {name}
//                      </div>
//                   )
//                }
//             </div> */}
//             {/* {
//                (deposit_address && deposit_address?.address) && (
//                   <>
//                      <div className="text-center space-y-3">
//                         <div className="font-medium text-base leading-normal">
//                            {
//                               state === 'pending' ? 'Please verify your profile before make IDR deposits'
//                                  : !deposit_enabled ? 'Please deposite via SIDR'
//                                     : !deposit_address ? `You need to generate a deposit address to make deposit ${name}`
//                                        : 'Address'
//                               // : 'Select a protocol to see the corresponding address.'
//                            }
//                         </div>
//                         <div className="text-xs text-neutral4 leading-custom4">
//                            Only send {id?.toUpperCase()} to this address. Sending any other asset to this address may result in the loss of your deposit!
//                         </div>
//                      </div>
//                      <InputGroup
//                         label="Payment Address"
//                         value={!deposit_address?.address ? 'Loading...' : deposit_address?.address}
//                         icon={
//                            <svg
//                               onClick={() => handleCopy(((deposit_address && deposit_address?.address) || ''), 'Address')}
//                               className="-translate-x-0.5 w-6 h-6 fill-neutral4 group-hover:fill-neutral2"
//                            >
//                               <use xlinkHref="#icon-copy" />
//                            </svg>
//                         }
//                         readOnly
//                         info={`Minimum deposit ${Decimal.format(min_deposit_amount, currency === 'idr' ? 0 : fixed, ',')} ${currency?.toUpperCase()}`}
//                         infoAlt={`Confirmations ${min_confirmations}`}
//                         className="!bg-neutral7"
//                      />
//                      <div className="flex justify-center items-center">
//                         <div className="p-4 rounded-lg border-2 border-dashed border-primary1">
//                            <QRCodeGenerator
//                               value={walletAddress}
//                               size={128}
//                               renderAs="svg"
//                            />
//                         </div>
//                      </div>
//                      <div className="text-x text-center leading-[1.6] font-medium text-neutral4">Please be sure that the contract address is related to the tokens that you are depositing.</div>
//                   </>
//                )
//             } */}
//             {renderContentModalDeposit()}
//          </Portal>

//          {/* Modal Withdraw */}
//          <Portal
//             title={user.otp ? `Withdrawal ${id?.toUpperCase()}` : 'Withdraw Locked'}
//             close={() => setShowWithdraw(!showWithdraw)}
//             show={showWithdraw}
//          >
//             {renderContentModalTFA()}
//             {renderContentModalWithdrawal()}
//          </Portal>

//          {/* Modal Transfer */}
//          <Portal
//             title={user.otp ? 'Transfer Internal' : 'Transfer Locked'}
//             close={() => setShowTransfer(!showTransfer)}
//             show={showTransfer}
//          >
//             {renderContentModalTFA()}
//             {renderContentTransfer()}
//          </Portal>
//          <ModalDeposit
//             show={myState.displayAddressShow}
//             close={() => setState({ ...myState, displayAddressShow: false })}
//             protocol={String(deposit_addresses && deposit_addresses.length && deposit_addresses[myState.displayAddress].network?.name)}
//             name={name}
//             icon={renderAvatarModal()}
//             address={String(deposit_addresses && deposit_addresses.length && deposit_addresses[myState.displayAddress].address)}
//             handleCopy={handleCopy}
//             min_confirmations={Number(deposit_addresses && deposit_addresses.length && deposit_addresses[myState.displayAddress].network?.min_confirmations)}
//             min_deposit_amount={min_deposit_amount}
//          />
//          <ModalWithdrawConfirm
//             show={withdrawConfirmModal}
//             total={Decimal.format(total, precision, ',')}
//             currency={currency}
//             rid={confirmationAddress}
//             onSubmit={handleWithdrawOK}
//             close={toggleConfirmModal}
//          />
//          <ModalWithdrawDone show={isModalSuccess} close={toggleModalSuccess} />
//       </>
//    );
// };

// const mapStateToProps = (state: RootState): ReduxProps => ({
//    user: selectUserInfo(state),
//    wallets: selectWallets(state),
//    currencies: selectCurrencies(state),
//    markets: selectMarkets(state),
//    marketTickers: selectMarketTickers(state),
//    withdrawSuccess: selectWithdrawSuccess(state),
//    transferSuccess: selectTransferSuccess(state),
//    transferLoading: selectTransferLoading(state),
//    walletsLoading: selectWalletsLoading(state),
//    historyList: selectHistory(state),
//    beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
//    beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
//    beneficiariesAddSuccess: selectBeneficiariesCreateSuccess(state),
// });

// const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
//    fetchBeneficiaries: params => dispatch(beneficiariesFetch(params)),
//    fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
//    fetchWallets: () => dispatch(walletsFetch()),
//    clearWallets: () => dispatch(walletsData([])),
//    walletsWithdrawCcy: params => dispatch(walletsWithdrawCcyFetch(params)),
//    walletsTransfer: params => dispatch(walletsTransferFetch(params)),
//    transfer: params => dispatch(transferCreate(params)),
//    walletsTransferData: () => dispatch(walletsTransferData()),
//    fetchCurrencies: () => dispatch(currenciesFetch()),
//    fetchMarkets: () => dispatch(marketsFetch()),
//    fetchSuccess: payload => dispatch(alertPush(payload)),
// });

// export const WalletDetails = compose(
//    injectIntl,
//    withRouter,
//    connect(mapStateToProps, mapDispatchToProps),
// )(WalletDetailsFC) as FunctionComponent;
