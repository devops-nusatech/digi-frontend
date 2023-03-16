import React, { FC, FunctionComponent, memo, useMemo, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Button, Decimal, InputGroup, Portal } from 'components';
import { NumericFormat } from 'react-number-format';
import {
   useCurrenciesFetch,
   useMarketsFetch,
   useMarketsTickersFetch,
} from 'hooks';
import {
   RootState,
   selectCurrencies,
   selectMarkets,
   selectMarketTickers,
   selectUserInfo,
   selectUserLoggedIn,
   User,
   selectMarketsLoading,
   Market,
} from 'modules';
import { ICChevronRight, IcShorting } from 'assets';
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

const SellCryptoFC: FC<Props> = memo(({ userData, isLoggedIn, isLoading }) => {
   const { push } = useHistory();
   const [stepActive, setStepActive] = useState<number>(1);
   const [coinActive, setCoinActive] = useState<any>();
   const [showModalSuccessPurchased, setShowModalSuccessPurchased] =
      useState<boolean>(false);

   const handleStep = (e: any, i: number) => {
      setStepActive(i);
      setCoinActive(e);
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

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
      currentBidUnitsList = markets.reduce(
         formatFilteredMarkets,
         currentBidUnitsList
      );
   }

   let currentBidUnitMarkets = markets || markets;

   const formattedMarkets = currentBidUnitMarkets.length
      ? currentBidUnitMarkets
           .map(market => ({
              ...market,
              last: Decimal.format(
                 Number((marketTickers[market.id] || defaultTicker).last),
                 market.amount_precision
              ),
              open: Decimal.format(
                 Number((marketTickers[market.id] || defaultTicker).open),
                 market.price_precision
              ),
              price_change_percent: String(
                 (marketTickers[market.id] || defaultTicker)
                    .price_change_percent
              ),
              high: Decimal.format(
                 Number((marketTickers[market.id] || defaultTicker).high),
                 market.amount_precision
              ),
              low: Decimal.format(
                 Number((marketTickers[market.id] || defaultTicker).low),
                 market.amount_precision
              ),
              volume: Decimal.format(
                 Number((marketTickers[market.id] || defaultTicker).volume),
                 market.amount_precision
              ),
           }))
           .map(market => ({
              ...market,
              change: Decimal.format(
                 (+market.last - +market.open).toFixed(market.price_precision),
                 market.price_precision
              ),
           }))
      : [];

   const combainById = (a1, a2) =>
      a1.map(
         (
            {
               base_unit,
               amount,
               avg_price,
               high,
               last,
               low,
               open,
               price_change_percent,
               volume,
            },
            i
         ) => ({
            no: i + 1,
            ...a2.find(item => item.id === base_unit && item),
            amount,
            avg_price,
            high,
            last,
            low,
            open,
            price_change_percent,
            volume,
         })
      );
   const combineMarkets = combainById(formattedMarkets, currencies);

   // console.log('combineMarkets', combineMarkets);

   const handleSetShowModalSuccessPurchased = () =>
      setShowModalSuccessPurchased(!showModalSuccessPurchased);

   const renderCoin = useMemo(() => {
      return (
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
                  className="absolute top-0 right-0 flex h-12 w-12 items-center justify-center bg-none">
                  <SearchIcon className="h-5 w-5 stroke-neutral4 transition-all duration-300" />
               </button>
            </form>
            <div className="table w-full">
               <div className="table-row">
                  <div className="table-cell p-4 pt-0 pl-0 pb-6 text-xs font-medium leading-custom4 text-neutral4">
                     <div className="group flex cursor-pointer items-center space-x-1">
                        <div>#</div>
                        <IcShorting />
                     </div>
                  </div>
                  <div className="table-cell p-4 pt-0 pb-6 text-xs font-medium leading-custom4 text-neutral4">
                     <div className="group flex cursor-pointer items-center space-x-1">
                        <div>Name</div>
                        <IcShorting />
                     </div>
                  </div>
                  <div className="table-cell p-4 pt-0  pb-6 text-xs font-medium leading-custom4 text-neutral4">
                     <div className="group flex cursor-pointer items-center justify-end space-x-1">
                        <div>Price</div>
                        <IcShorting />
                     </div>
                  </div>
                  <div className="table-cell p-4 pt-0 pr-0 pb-6 text-right text-xs font-medium leading-custom4 text-neutral4">
                     <div className="group flex cursor-pointer items-center justify-end space-x-1">
                        <div>24h %</div>
                        <IcShorting />
                     </div>
                  </div>
               </div>
               {isLoading ? (
                  <>
                     <div className="">Loading</div>
                  </>
               ) : combineMarkets?.length > 0 ? (
                  combineMarkets
                     .filter(e =>
                        Object.keys(e)?.reduce(
                           (acc, curr) =>
                              acc ||
                              e[curr]
                                 ?.toString()
                                 ?.toLowerCase()
                                 ?.match(searchMarket?.toLowerCase())
                                 ?.includes(searchMarket?.toLowerCase()),
                           false
                        )
                     )
                     ?.map(
                        (
                           { id, name, icon_url, last, price_change_percent },
                           index
                        ) => (
                           <div
                              className="table-row cursor-pointer"
                              key={index}
                              onClick={() =>
                                 handleStep(
                                    {
                                       id,
                                       name,
                                       icon_url,
                                       last,
                                       price_change_percent,
                                    },
                                    2
                                 )
                              }>
                              <div className="table-cell border-t border-neutral6 p-4 pl-0 align-middle text-xs font-medium dark:border-neutral3">
                                 <div className="group inline-flex items-center">
                                    <button
                                       onClick={e => {
                                          e.stopPropagation();
                                          // handleAddToFavorite(market)
                                       }}
                                       type="button"
                                       className="group mr-2 h-4 w-4">
                                       <StarIcon className="h-4 w-4 stroke-neutral4 transition-all duration-200 group-hover:stroke-yellow-500" />
                                    </button>
                                    <div className="text-neutral4">
                                       {index + 1}
                                    </div>
                                 </div>
                              </div>
                              <div className="group table-cell border-t border-neutral6 p-4 align-middle font-medium dark:border-neutral3">
                                 <div className="flex items-center space-x-3">
                                    <div className="w-8 shrink-0">
                                       <img
                                          className="w-full"
                                          src={icon_url}
                                          alt={name}
                                          style={{
                                             clipPath:
                                                'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                                          }}
                                       />
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                       <div className="transition-colors duration-300 group-hover:text-primary1">
                                          {name}
                                       </div>
                                       <div className="font-normal uppercase text-neutral4">
                                          {id}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="table-cell border-t border-neutral6 p-4 text-right align-middle font-medium dark:border-neutral3">
                                 {Decimal.format(last, 0, ',')}
                              </div>
                              <div className="table-cell border-t border-neutral6 p-4 pr-0 text-right align-middle font-medium dark:border-neutral3">
                                 <div
                                    className={`${
                                       price_change_percent.includes('-')
                                          ? 'text-primary4'
                                          : 'text-primary5'
                                    }`}>
                                    {price_change_percent}
                                 </div>
                              </div>
                           </div>
                        )
                     )
               ) : (
                  <div className="">Null</div>
               )}
            </div>
         </>
      );
   }, [combineMarkets]);

   const renderEnterAmount = useMemo(() => {
      return (
         <>
            <div className="mb-16 flex items-center justify-between">
               <button
                  onClick={() => setStepActive(1)}
                  type="button"
                  className="group flex items-center text-2xl font-semibold leading-custom2 tracking-custom1">
                  <svg className="mr-4 h-3.5 w-3.5 fill-neutral4 transition-all duration-300 group-hover:-translate-x-1">
                     <use xlinkHref="#icon-arrow-prev"></use>
                  </svg>
                  Enter amount
               </button>
               <div className="flex items-center text-base font-medium">
                  Selling {coinActive?.name || ''}
                  <img
                     src={coinActive?.icon_url}
                     className="ml-3 w-6"
                     alt={coinActive?.name}
                     style={{
                        clipPath:
                           'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                     }}
                  />
               </div>
            </div>
            <div>
               <div className="flex items-center justify-center space-x-2">
                  <div className="relative">
                     <div className="min-h-24 min-w-72 max-w-4xl pr-1.25 text-right font-dm text-8xl font-bold tracking-custom opacity-0">
                        2,000,000
                     </div>
                     <NumericFormat
                        value="250000"
                        allowLeadingZeros
                        thousandSeparator=","
                        type="text"
                        className="absolute top-0 left-0 h-full w-full appearance-none border-none bg-transparent bg-none text-center text-right font-dm text-8xl font-bold tracking-custom shadow-none outline-none"
                     />
                  </div>
                  <div className="relative top-2 font-dm text-3.5xl font-bold leading-tight tracking-custom1">
                     {coinActive?.id?.toUpperCase()}
                  </div>
               </div>
               <div className="mb-3 flex items-center justify-center space-x-2 text-center text-base font-medium">
                  <div className="text-neutral4">You will get</div>
                  <div>1.345</div>
                  <div className="text-neutral4">USD</div>
               </div>
               <div className="mt-12 text-center">
                  <Button
                     text="Sell"
                     className="!min-w-184"
                     onClick={() => setStepActive(3)}
                  />
               </div>
            </div>
         </>
      );
   }, [coinActive]);

   const renderConfirmOrder = useMemo(() => {
      return (
         <>
            <div className="mb-16 flex items-center justify-between">
               <button
                  onClick={() => setStepActive(2)}
                  type="button"
                  className="group flex items-center text-2xl font-semibold leading-custom2 tracking-custom1">
                  <svg className="mr-4 h-3.5 w-3.5 fill-neutral4 transition-all duration-300 group-hover:-translate-x-1">
                     <use xlinkHref="#icon-arrow-prev"></use>
                  </svg>
                  Confirm order
               </button>
               <div className="flex items-center text-base font-medium">
                  Buying {coinActive?.name || ''}
                  <img
                     src={coinActive?.icon_url}
                     className="ml-3 w-6"
                     alt={coinActive?.name}
                     style={{
                        clipPath:
                           'polygon(50% 0, 5% 25%, 5% 75%, 50% 100%, 95% 75%, 95% 25%)',
                     }}
                  />
               </div>
            </div>
            <div className="space-y-12">
               <div className="flex justify-between rounded-2xl bg-neutral7 py-6 px-9 dark:bg-neutral2">
                  <div className="flex space-x-2.5">
                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary3">
                        <svg className="h-5 w-5 fill-neutral8">
                           <use xlinkHref="#icon-wallet"></use>
                        </svg>
                     </div>
                     <div>
                        <div className="text-xs leading-custom4 text-neutral4">
                           Spend
                        </div>
                        <div className="font-medium">200,000</div>
                     </div>
                  </div>
                  <div className="flex space-x-2.5">
                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary5">
                        <svg className="h-5 w-5 fill-neutral8">
                           <use xlinkHref="#icon-wallet"></use>
                        </svg>
                     </div>
                     <div>
                        <div className="text-xs leading-custom4 text-neutral4">
                           Get
                        </div>
                        <div className="font-medium">0.001499 BTC</div>
                     </div>
                  </div>
                  <div className="flex space-x-2.5">
                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral1">
                        <svg className="h-5 w-5 fill-neutral8">
                           <use xlinkHref="#icon-cloud"></use>
                        </svg>
                     </div>
                     <div>
                        <div className="text-xs leading-custom4 text-neutral4">
                           For
                        </div>
                        <div className="font-medium">Digiasset</div>
                     </div>
                  </div>
               </div>
               <div className="text-base">
                  You are about to buy 0.001499 BTC from Digiasset
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between border-b border-neutral6 pb-3 text-base font-medium dark:border-neutral3">
                     <div>0.001499</div>
                     <div className="uppercase">BTC</div>
                  </div>
                  <div className="flex justify-between">
                     <div className="text-neutral4">Service fee</div>
                     <div className="text-base font-medium uppercase">
                        0.000 BTC
                     </div>
                  </div>
                  <div className="flex justify-between">
                     <div className="text-neutral4">You will pay</div>
                     <div className="text-base font-medium uppercase">
                        200,000 IDR
                     </div>
                  </div>
               </div>
               <div className="mt-12 flex justify-between">
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
      );
   }, [coinActive]);

   return (
      <>
         <div>
            <div className="py-10">
               <div className="my-0 mx-auto flex w-full max-w-7xl items-center px-6 md:px-10 lg:px-20">
                  <div className="mr-auto font-dm text-5xl font-bold leading-custom1 tracking-custom">
                     Sell crypto
                  </div>
                  <div className="flex items-center text-xs font-medium leading-custom1 text-neutral4">
                     <div>How to buy crypto on Digiasset</div>
                     <Link
                        to="/"
                        className="group flex items-center">
                        <div className="ml-2 text-neutral2 transition-all duration-300 group-hover:text-primary1 dark:text-neutral6">
                           Learn now
                        </div>
                        <div className="flex h-5 w-5 items-center justify-center">
                           <ICChevronRight className="group-hover:fill-primary1" />
                        </div>
                     </Link>
                  </div>
               </div>
            </div>
            <div className="bg-shade5 py-20 pb-34 dark:bg-neutral1 dark:bg-none dark:shadow-body">
               <div className="my-0 mx-auto flex w-full max-w-7xl px-6 md:px-10 lg:px-20">
                  <div className="mr-auto w-54 shrink-0 space-y-6">
                     <div
                        className={`relative flex h-12 items-center space-x-4 rounded-3xl px-2 font-dm font-bold leading-custom3 transition-all duration-300 after:absolute after:top-full after:left-5.75 after:h-6 after:border-l-2 after:border-dashed after:border-neutral5 after:content-[''] ${
                           (stepActive === 2 || stepActive === 3) &&
                           'bg-neutral8 shadow-step dark:bg-neutral2 dark:after:border-neutral4'
                        }`}>
                        <div
                           className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary5 ${
                              (stepActive === 2 || stepActive === 3) &&
                              'bidding__number'
                           } transition-all duration-300 after:absolute after:top-0 after:left-0 after:h-full after:w-full after:rounded-full after:transition-opacity after:duration-200 after:content-['']`}>
                           1
                        </div>
                        <div>Select crypto</div>
                     </div>
                     <div
                        className={`relative flex h-12 items-center space-x-4 rounded-3xl px-2 font-dm font-bold leading-custom3 transition-all duration-300 after:absolute after:top-full after:left-5.75 after:h-6 after:border-l-2 after:border-dashed after:border-neutral5 after:content-[''] ${
                           stepActive === 1 && 'text-neutral4'
                        } ${
                           stepActive === 3 &&
                           'bg-neutral8 shadow-step dark:bg-neutral2 dark:after:border-neutral4'
                        }`}>
                        <div
                           className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                              stepActive === 2 || stepActive === 3
                                 ? 'border-primary5'
                                 : 'border-neutral6 dark:border-neutral4'
                           } ${
                              stepActive === 3 && 'bidding__number'
                           } transition-all duration-300 after:absolute after:top-0 after:left-0 after:h-full after:w-full after:rounded-full after:transition-opacity after:duration-200 after:content-['']`}>
                           2
                        </div>
                        <div>Enter amount</div>
                     </div>
                     <div
                        className={`relative flex h-12 items-center space-x-4 rounded-3xl px-2 font-dm font-bold ${
                           stepActive !== 3 && 'text-neutral4'
                        } leading-custom3 transition-all duration-300`}>
                        <div
                           className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                              stepActive === 3
                                 ? 'border-primary5'
                                 : 'border-neutral6 dark:border-neutral4'
                           } transition-all duration-300`}>
                           4
                        </div>
                        <div>Confirm order</div>
                     </div>
                  </div>
                  <div className="w-736 rounded-2xl bg-neutral8 p-10 shadow-card2 dark:bg-shade1">
                     {stepActive === 1
                        ? renderCoin
                        : stepActive === 2
                        ? renderEnterAmount
                        : renderConfirmOrder}
                  </div>
               </div>
            </div>
         </div>
         <Portal
            show={showModalSuccessPurchased}
            close={handleSetShowModalSuccessPurchased}>
            <div className="mt-10 space-y-8">
               <div className="text-center font-dm text-5xl font-bold leading-custom1 tracking-custom">
                  Yay! 🎉
               </div>
               <div className="mx-auto max-w-71.25 text-center text-base font-medium leading-normal">
                  You successfully purchased{' '}
                  <span className="text-primary5">0.020202 BTC</span> from
                  Digiasset
               </div>
               <div className="flex flex-wrap rounded-xl border border-neutral6 p-6">
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
                        push(`trading/${coinActive?.id || 'btcidr'}`)
                     }
                     variant="outline"
                  />
                  <Button
                     text="Wallets"
                     onClick={() => push('/wallets')}
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

export const SellCrypto = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps)
)(SellCryptoFC) as FunctionComponent;
