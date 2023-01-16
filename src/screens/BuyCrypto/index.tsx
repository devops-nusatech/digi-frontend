import React, { FC, FunctionComponent, memo, useMemo, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Button, Decimal, InputGroup, Portal } from 'components';
import { NumericFormat } from 'react-number-format';
import { useCurrenciesFetch, useMarketsFetch, useMarketsTickersFetch } from 'hooks';
import { RootState, selectCurrencies, selectMarkets, selectMarketTickers, selectUserInfo, selectUserLoggedIn, User, selectMarketsLoading, Market } from 'modules';
import { ICChevronRight, IcMasterCard, IcShorting, IcVisa } from 'assets';
import { SearchIcon, StarIcon } from '@heroicons/react/outline';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

const defaultTicker = {
   amount: '0.0',
   last: '0.0',
   high: '0.0',
   open: '0.0',
   low: '0.0',
   price_change_percent: '+0.00%',
   volume: '0.0',
};

interface Props {
   userData: User;
   isLoggedIn: boolean;
   isLoading?: boolean;
}

const BuyCryptoFC: FC<Props> = memo(({ userData, isLoggedIn, isLoading }) => {
   const { push } = useHistory();
   const [stepActive, setStepActive] = useState<number>(1);
   const [coinActive, setCoinActive] = useState<any>();
   const [showModalSuccessPurchased, setShowModalSuccessPurchased] = useState<boolean>(false);

   const handleStep = (e: any, i: number) => {
      setStepActive(i);
      setCoinActive(e);
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   }

   const [searchMarket, setSearchMarket] = useState<string>('');
   useMarketsFetch();
   useMarketsTickersFetch();
   useCurrenciesFetch();
   const markets = useSelector(selectMarkets);
   const marketTickers = useSelector(selectMarketTickers);
   const currencies = useSelector(selectCurrencies);
   // console.log('markets', markets)
   // console.log('marketTickers', marketTickers)
   // console.log('currencies', currencies)

   const formatFilteredMarkets = (list: string[], market: Market) => {
      if (!list?.includes(market.quote_unit)) {
         list.push(market.quote_unit);
      }
      return list;
   };

   let currentBidUnitsList: string[] = [''];

   if (markets.length > 0) {
      currentBidUnitsList = markets.reduce(formatFilteredMarkets, currentBidUnitsList);
   }

   let currentBidUnitMarkets = markets || markets;

   const formattedMarkets = currentBidUnitMarkets.length ? currentBidUnitMarkets.map(market =>
   ({
      ...market,
      last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
      open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
      price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
      high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), market.amount_precision),
      low: Decimal.format(Number((marketTickers[market.id] || defaultTicker).low), market.amount_precision),
      volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.amount_precision),
   }),
   ).map(market =>
   ({
      ...market,
      change: Decimal.format((+market.last - +market.open)
         .toFixed(market.price_precision), market.price_precision),
   }),
   ) : [];

   const combainById = (a1, a2) =>
      a1.map(({
         base_unit,
         amount,
         avg_price,
         high,
         last,
         low,
         open,
         price_change_percent,
         volume,
      }, i) => ({
         no: i + 1,
         ...a2.find(item => (item.id === base_unit) && item),
         amount,
         avg_price,
         high,
         last,
         low,
         open,
         price_change_percent,
         volume,
      }));
   const combineMarkets = combainById(formattedMarkets, currencies);

   // console.log('combineMarkets', combineMarkets);

   const handleSetShowModalSuccessPurchased = () => setShowModalSuccessPurchased(!showModalSuccessPurchased);

   const renderCoin = useMemo(() => {
      return (
         <>
            <div className="mb-5 text-2xl leading-custom2 font-semibold tracking-custom1">Select crypto</div>
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
            <div className="table w-full">
               <div className="table-row">
                  <div className="table-cell p-4 pt-0 pl-0 pb-6 text-xs leading-custom4 font-medium text-neutral4">
                     <div className="group flex items-center space-x-1 cursor-pointer">
                        <div>#</div>
                        <IcShorting />
                     </div>
                  </div>
                  <div className="table-cell p-4 pt-0 pb-6 text-xs leading-custom4 font-medium text-neutral4">
                     <div className="group flex items-center space-x-1 cursor-pointer">
                        <div>Name</div>
                        <IcShorting />
                     </div>
                  </div>
                  <div className="table-cell p-4 pt-0  pb-6 text-xs leading-custom4 font-medium text-neutral4">
                     <div className="group flex items-center justify-end space-x-1 cursor-pointer">
                        <div>Price</div>
                        <IcShorting />
                     </div>
                  </div>
                  <div className="table-cell p-4 pt-0 pr-0 pb-6 text-xs leading-custom4 font-medium text-neutral4 text-right">
                     <div className="group flex items-center justify-end space-x-1 cursor-pointer">
                        <div>24h %</div>
                        <IcShorting />
                     </div>
                  </div>
               </div>
               {
                  isLoading ? <>
                     <div className="">Loading</div>
                  </> : combineMarkets?.length > 0 ? combineMarkets.filter(e => Object.keys(e)
                     ?.reduce((acc, curr) => acc || e[curr]?.toString()?.toLowerCase()
                        ?.match(searchMarket?.toLowerCase())
                        ?.includes(searchMarket?.toLowerCase()), false))?.map(({ id, name, icon_url, last, price_change_percent }, index) => (
                           <div className="table-row cursor-pointer" key={index} onClick={() => handleStep({ id, name, icon_url, last, price_change_percent }, 2)}>
                              <div className="table-cell p-4 pl-0 text-xs font-medium align-middle border-t border-neutral6 dark:border-neutral3">
                                 <div className="group inline-flex items-center">
                                    <button
                                       onClick={e => {
                                          e.stopPropagation();
                                          // handleAddToFavorite(market)
                                       }}
                                       type="button"
                                       className="w-4 h-4 mr-2 group"
                                    >
                                       <StarIcon className="w-4 h-4 stroke-neutral4 group-hover:stroke-yellow-500 transition-all duration-200" />
                                    </button>
                                    <div className="text-neutral4">{index + 1}</div>
                                 </div>
                              </div>
                              <div className="group table-cell p-4 font-medium align-middle border-t border-neutral6 dark:border-neutral3">
                                 <div className="flex items-center space-x-3">
                                    <div className="shrink-0 w-8">
                                       <img className="w-full" src={icon_url} alt={name} style={{
                                          clipPath: 'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                                       }} />
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                       <div className="group-hover:text-primary1 transition-colors duration-300">{name}</div>
                                       <div className="font-normal text-neutral4 uppercase">{id}</div>
                                    </div>
                                 </div>
                              </div>
                              <div className="table-cell p-4 font-medium align-middle border-t border-neutral6 dark:border-neutral3 text-right">
                                 {Decimal.format(last, 0, ',')}
                              </div>
                              <div className="table-cell p-4 pr-0 font-medium align-middle border-t border-neutral6 dark:border-neutral3 text-right">
                                 <div className={`${price_change_percent.includes('-') ? 'text-primary4' : 'text-primary5'}`}>{price_change_percent}</div>
                              </div>
                           </div>
                        )) : (
                     <div className="">Null</div>
                  )
               }
            </div>
         </>
      )
   }, [combineMarkets]);

   const renderEnterAmount = useMemo(() => {
      return (
         <>
            <div className="flex items-center justify-between mb-16">
               <button onClick={() => setStepActive(1)} type="button" className="group flex items-center text-2xl font-semibold leading-custom2 tracking-custom1">
                  <svg className="w-3.5 h-3.5 mr-4 fill-neutral4 group-hover:-translate-x-1 transition-all duration-300">
                     <use xlinkHref="#icon-arrow-prev"></use>
                  </svg>
                  Enter amount
               </button>
               <div className="flex items-center text-base font-medium">
                  Buying {coinActive?.name || ''}
                  <img src={coinActive?.icon_url} className="w-6 ml-3" alt={coinActive?.name} style={{
                     clipPath: 'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                  }} />
               </div>
            </div>
            <div>
               <div className="flex justify-center items-center space-x-2">
                  <div className="relative top-2 text-3.5xl leading-tight tracking-custom1 font-dm font-bold">IDR</div>
                  <div className="relative">
                     <div className="min-w-72 max-w-4xl min-h-96 pr-1.25 opacity-0 font-dm font-bold text-8xl tracking-custom">2,000,000</div>
                     <NumericFormat value="250000" allowLeadingZeros thousandSeparator="," type="text" className="absolute text-center top-0 left-0 w-full h-full border-none bg-none shadow-none bg-transparent appearance-none outline-none font-dm font-bold text-8xl tracking-custom" />
                  </div>
               </div>
               <div className="mb-3 text-center text-base font-medium flex items-center justify-center space-x-2">
                  <div>9000</div>
                  <div className="text-neutral4">BTC</div>
               </div>
               <div className="flex flex-wrap justify-center space-x-2">
                  <Button
                     text="250,000"
                     variant="outline"
                     width="noFull"
                     size="normal"
                     className="text-neutral4"
                  />
                  <Button
                     text="500,000"
                     variant="outline"
                     width="noFull"
                     size="normal"
                     className="text-neutral4"
                  />
                  <Button
                     text="1,000,000"
                     variant="outline"
                     width="noFull"
                     size="normal"
                     className="text-neutral4"
                  />
                  <Button
                     text="2,000,000"
                     variant="outline"
                     width="noFull"
                     size="normal"
                     className="text-neutral4"
                  />
               </div>
               <div className="text-center mt-12">
                  <Button
                     width="noFull"
                     text="Continue"
                     className="!min-w-184"
                     onClick={() => setStepActive(3)}
                  />
               </div>
            </div>
         </>
      )
   }, [coinActive]);

   const renderPaymentInfo = useMemo(() => {
      return (
         <>
            <div className="flex items-center justify-between mb-16">
               <button onClick={() => setStepActive(2)} type="button" className="group flex items-center text-2xl font-semibold leading-custom2 tracking-custom1">
                  <svg className="w-3.5 h-3.5 mr-4 fill-neutral4 group-hover:-translate-x-1 transition-all duration-300">
                     <use xlinkHref="#icon-arrow-prev"></use>
                  </svg>
                  Payment info
               </button>
               <div className="flex items-center text-base font-medium">
                  Buying {coinActive?.name || ''}
                  <img src={coinActive?.icon_url} className="w-6 ml-3" alt={coinActive?.name} style={{
                     clipPath: 'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                  }} />
               </div>
            </div>
            <div className="space-y-12">
               <div className="flex justify-between py-6 px-9 rounded-2xl bg-neutral7 dark:bg-neutral2">
                  <div className="flex space-x-2.5">
                     <div className="flex justify-center items-center shrink-0 w-10 h-10 rounded-full bg-primary3">
                        <svg className="w-5 h-5 fill-neutral8">
                           <use xlinkHref="#icon-wallet"></use>
                        </svg>
                     </div>
                     <div>
                        <div className="text-xs text-neutral4 leading-custom4">
                           Spend
                        </div>
                        <div className="font-medium">
                           200,000
                        </div>
                     </div>
                  </div>
                  <div className="flex space-x-2.5">
                     <div className="flex justify-center items-center shrink-0 w-10 h-10 rounded-full bg-primary5">
                        <svg className="w-5 h-5 fill-neutral8">
                           <use xlinkHref="#icon-wallet"></use>
                        </svg>
                     </div>
                     <div>
                        <div className="text-xs text-neutral4 leading-custom4">
                           Get
                        </div>
                        <div className="font-medium">
                           0.001499 BTC
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex justify-between items-center">
                  <div className="text-2xl font-semibold leading-custom2 tracking-custom1">Credit Card</div>
                  <div className="flex items-center">
                     <IcVisa />
                     <IcMasterCard />
                  </div>
               </div>
               <div className="space-y-8">
                  <InputGroup
                     label="card number"
                     placeholder="XXXX XXXX XXXX XXXX"
                  />
                  <InputGroup
                     label="card holder"
                     placeholder="TRAN MAU TRI TRAM"
                  />
                  <div className="flex space-x-4 justify-between">
                     <InputGroup
                        label="expiration date"
                        placeholder="MM / YY"
                        parentClassName="w-full"
                     />
                     <InputGroup
                        label="cvc"
                        placeholder="CVC"
                        parentClassName="w-full"
                     />
                  </div>
                  <label className="relative inline-block select-none cursor-pointer group">
                     <input type="checkbox" checked className="checkbox__input absolute top-0 left-0 opacity-0" />
                     <span className="flex space-x-3">
                        <span className="checkbox__tick relative shrink-0 w-6 h-6 rounded border-2 border-neutral6 transition-all duration-200 group-hover:border-primary1 dark:border-neutral3"></span>
                        <span className="font-medium leading-custom">Save Card</span>
                     </span>
                  </label>
               </div>
               <div className="text-right mt-12">
                  <Button
                     width="noFull"
                     text="Continue"
                     onClick={() => setStepActive(4)}
                  />
               </div>
            </div>
         </>
      )
   }, [coinActive]);

   const renderConfirmOrder = useMemo(() => {
      return (
         <>
            <div className="flex items-center justify-between mb-16">
               <button onClick={() => setStepActive(3)} type="button" className="group flex items-center text-2xl font-semibold leading-custom2 tracking-custom1">
                  <svg className="w-3.5 h-3.5 mr-4 fill-neutral4 group-hover:-translate-x-1 transition-all duration-300">
                     <use xlinkHref="#icon-arrow-prev"></use>
                  </svg>
                  Confirm order
               </button>
               <div className="flex items-center text-base font-medium">
                  Buying {coinActive?.name || ''}
                  <img src={coinActive?.icon_url} className="w-6 ml-3" alt={coinActive?.name} style={{
                     clipPath: 'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                  }} />
               </div>
            </div>
            <div className="space-y-12">
               <div className="flex justify-between py-6 px-9 rounded-2xl bg-neutral7 dark:bg-neutral2">
                  <div className="flex space-x-2.5">
                     <div className="flex justify-center items-center shrink-0 w-10 h-10 rounded-full bg-primary3">
                        <svg className="w-5 h-5 fill-neutral8">
                           <use xlinkHref="#icon-wallet"></use>
                        </svg>
                     </div>
                     <div>
                        <div className="text-xs text-neutral4 leading-custom4">
                           Spend
                        </div>
                        <div className="font-medium">
                           200,000
                        </div>
                     </div>
                  </div>
                  <div className="flex space-x-2.5">
                     <div className="flex justify-center items-center shrink-0 w-10 h-10 rounded-full bg-primary5">
                        <svg className="w-5 h-5 fill-neutral8">
                           <use xlinkHref="#icon-wallet"></use>
                        </svg>
                     </div>
                     <div>
                        <div className="text-xs text-neutral4 leading-custom4">
                           Get
                        </div>
                        <div className="font-medium">
                           0.001499 BTC
                        </div>
                     </div>
                  </div>
                  <div className="flex space-x-2.5">
                     <div className="flex justify-center items-center shrink-0 w-10 h-10 rounded-full bg-secondary1">
                        <svg className="w-5 h-5 fill-neutral8">
                           <use xlinkHref="#icon-wallet"></use>
                        </svg>
                     </div>
                     <div>
                        <div className="text-xs text-neutral4 leading-custom4">
                           Method
                        </div>
                        <div className="font-medium">
                           Credit card
                        </div>
                     </div>
                  </div>
               </div>
               <div className="text-base">You are about to buy 0.001499 BTC from Digiasset</div>
               <div className="space-y-3">
                  <div className="flex justify-between pb-3 border-b border-neutral6 text-base font-medium dark:border-neutral3">
                     <div>0.001499</div>
                     <div className="uppercase">BTC</div>
                  </div>
                  <div className="flex justify-between">
                     <div className="text-neutral4">Service fee</div>
                     <div className="text-base font-medium uppercase">0.000 BTC</div>
                  </div>
                  <div className="flex justify-between">
                     <div className="text-neutral4">You will pay</div>
                     <div className="text-base font-medium uppercase">200,000 IDR</div>
                  </div>
               </div>
               <div className="flex justify-between mt-12">
                  <Button
                     width="noFull"
                     text="Cancel"
                     variant="outline"
                     onClick={() => setStepActive(1)}
                  />
                  <Button
                     width="noFull"
                     text="I understand, continue"
                     onClick={handleSetShowModalSuccessPurchased}
                  />
               </div>
            </div>
         </>
      )
   }, [coinActive]);

   return (
      <>
         <div>
            <div className="py-10">
               <div className="flex items-center w-full max-w-7xl my-0 mx-auto px-6 md:px-10 lg:px-20">
                  <div className="mr-auto text-5xl font-dm font-bold tracking-custom leading-custom1">
                     Buy crypto
                  </div>
                  <div className="flex items-center text-xs text-neutral4 font-medium leading-custom1">
                     <div>
                        How to buy crypto on Digiasset
                     </div>
                     <Link to="/" className="flex items-center group">
                        <div className="ml-2 text-neutral2 dark:text-neutral6 group-hover:text-primary1 transition-all duration-300">
                           Learn now
                        </div>
                        <div className="w-5 h-5 flex items-center justify-center">
                           <ICChevronRight className="group-hover:fill-primary1" />
                        </div>
                     </Link>
                  </div>
               </div>
            </div>
            <div className="py-20 pb-34 bg-shade5 dark:bg-none dark:shadow-body dark:bg-neutral1">
               <div className="flex w-full max-w-7xl my-0 mx-auto px-6 md:px-10 lg:px-20">
                  <div className="shrink-0 mr-auto w-54 space-y-6">
                     <div className={`relative flex items-center space-x-4 h-12 px-2 rounded-3xl font-dm font-bold leading-custom3 transition-all duration-300 after:absolute after:content-[''] after:top-full after:left-5.75 after:h-6 after:border-l-2 after:border-dashed after:border-neutral5 ${(stepActive === 2 || stepActive === 3 || stepActive === 4) && 'bg-neutral8 dark:bg-neutral2 dark:after:border-neutral4 shadow-step'}`}>
                        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary5 ${(stepActive === 2 || stepActive === 3 || stepActive === 4) && 'bidding__number'} after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:transition-opacity after:duration-200 transition-all duration-300`}>1</div>
                        <div>Select crypto</div>
                     </div>
                     <div className={`relative flex items-center space-x-4 h-12 px-2 rounded-3xl font-dm font-bold leading-custom3 transition-all duration-300 after:absolute after:content-[''] after:top-full after:left-5.75 after:h-6 after:border-l-2 after:border-dashed after:border-neutral5 ${(stepActive === 1) && 'text-neutral4'} ${(stepActive === 3 || stepActive === 4) && 'bg-neutral8 dark:bg-neutral2 dark:after:border-neutral4 shadow-step'}`}>
                        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${(stepActive === 2 || stepActive === 3 || stepActive === 4) ? 'border-primary5' : 'border-neutral6 dark:border-neutral4'} ${(stepActive === 3 || stepActive === 4) && 'bidding__number'} after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:transition-opacity after:duration-200 transition-all duration-300`}>2</div>
                        <div>Enter amount</div>
                     </div>
                     <div className={`relative flex items-center space-x-4 h-12 px-2 rounded-3xl font-dm font-bold leading-custom3 transition-all duration-300 after:absolute after:content-[''] after:top-full after:left-5.75 after:h-6 after:border-l-2 after:border-dashed after:border-neutral5 ${(stepActive === 1 || stepActive === 2) && 'text-neutral4'} ${stepActive === 4 && 'bg-neutral8 dark:bg-neutral2 dark:after:border-neutral4 shadow-step'}`}>
                        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${(stepActive === 3 || stepActive === 4) ? 'border-primary5' : 'border-neutral6 dark:border-neutral4'} ${stepActive === 4 && 'bidding__number'} after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:transition-opacity after:duration-200 transition-all duration-300`}>3</div>
                        <div>Payment info</div>
                     </div>
                     <div className={`relative flex items-center space-x-4 h-12 px-2 rounded-3xl font-dm font-bold ${stepActive !== 4 && 'text-neutral4'} leading-custom3 transition-all duration-300`}>
                        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 ${stepActive === 4 ? 'border-primary5' : 'border-neutral6 dark:border-neutral4'} transition-all duration-300`}>4</div>
                        <div>Confirm order</div>
                     </div>
                  </div>
                  <div className="w-736 p-10 shadow-card2 rounded-2xl bg-neutral8 dark:bg-shade1">
                     {
                        stepActive === 1 ? renderCoin :
                           stepActive === 2 ? renderEnterAmount :
                              stepActive === 3 ? renderPaymentInfo :
                                 renderConfirmOrder
                     }
                  </div>
               </div>
            </div>
         </div>
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
                     onClick={() => push(`trading/${coinActive?.id || 'btcidr'}`)}
                     variant="outline"
                     width="full"
                  />
                  <Button
                     text="Wallets"
                     onClick={() => push('/wallet-overview')}
                     width="full"
                  />
               </div>
            </div>
         </Portal>
      </>
   );
});

const mapStateToProps = (state: RootState): Props => ({
   userData: selectUserInfo(state),
   isLoggedIn: selectUserLoggedIn(state),
   isLoading: selectMarketsLoading(state),
});

export const BuyCrypto = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps)
)(BuyCryptoFC) as FunctionComponent;
