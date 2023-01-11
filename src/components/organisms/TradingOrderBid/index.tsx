import React, { FC, FormEvent, useEffect, useState } from 'react';
import {
   Button,
   InputOrder,
   SliderPercent,
   Decimal,
   InputCurrency,
   IOrderProps,
} from 'components';
import { IcWallet } from 'assets';
import { OrderType } from 'modules/types';
import { cleanPositiveFloatInput, getTotalPrice, precisionRegExp } from 'helpers';

type Ref = null | any;
interface TradingOrderBidProps {
   to: string;
   from: string;
   availableQuote: number;
   availableBase: number;
   translate: (id: string) => string;
   pricePrecision: number;
   amountPrecision: number;
   disabled?: boolean;
   orderPrice: string;
   orderType: OrderType;
   handleOrder: (e: FormEvent<HTMLFormElement>, order: IOrderProps) => void;
   minAmount: number;
   minPrice: number;
   priceMarket: string;
   amountVolume: string;
   market: string;
   asks: string[][];
}

export const TradingOrderBid: FC<TradingOrderBidProps> = ({
   to,
   from,
   availableQuote,
   availableBase,
   translate,
   pricePrecision,
   amountPrecision,
   disabled,
   orderPrice,
   orderType,
   handleOrder,
   minAmount,
   minPrice,
   priceMarket,
   amountVolume,
   market,
   asks,
}) => {
   const [listenPrice, setListenPrice] = useState<string>('');
   const [orderVolume, setOrderVolume] = useState<string>('');
   const [orderTotal, setOrderTotal] = useState<string>('');
   const [slide, setSlide] = useState<number>(0);
   const [ref, setRef] = useState<Ref>(null);

   useEffect(() => {
      return () => {
         resetState();
         console.log('effect :>> ', 1);
      };
   }, [market]);

   useEffect(() => {
      setListenPrice(orderPrice);
      setOrderVolume(amountVolume);
      console.log('effect :>> ', 2);
   }, [orderPrice, amountVolume]);

   useEffect(() => {
      const formatPrice = Number(typeof orderPrice === 'string' ? orderPrice.split(',').join('') : orderPrice);
      setOrderTotal(Decimal.format(formatPrice * Number(orderVolume), pricePrecision, ','));
      handleResetSlider();
      console.log('effect :>> ', 3);
   }, [orderPrice]);

   useEffect(() => {
      if (slide > 0 && convertPrice()) {
         setOrderVolume(Decimal.format((availableQuote * slide) / convertPrice(), amountPrecision, ','));
         const formatVolume = (availableQuote * slide) / convertPrice();
         setOrderTotal(Decimal.format(convertPrice() * formatVolume, pricePrecision, ','));
         console.log('effect :>> ', 4);
         console.log(slide);
      }
   }, [slide]);

   const handleChangePrice = (value: string) => {
      const formatPrice = Number(value.split(',').join(''));
      setListenPrice(value);
      setOrderTotal(Decimal.format(formatPrice * Number(orderVolume), pricePrecision, ','));
   }

   const handleChangeAmount = (value: string) => {
      if (value === '') {
         setOrderVolume(amountVolume);
      } else {
         const convertedValue = cleanPositiveFloatInput(value)
         if (convertedValue.match(precisionRegExp(amountPrecision))) {
            setOrderVolume(convertedValue);
            setOrderTotal(Decimal.format(convertPrice() * Number(convertedValue), pricePrecision, ','));
            setSlide(0);
            handleResetSlider();
         };
      }
   }

   const handleChangePercentage = (a, b, c) => setSlide(c[0] / 100);

   const handleResetSlider = () => {
      if (ref && ref.noUiSlider) {
         ref.noUiSlider.set(0);
      }
   };

   const resetState = () => {
      setSlide(0);
      setListenPrice('');
      setOrderVolume('');
      setOrderTotal('');
      handleResetSlider();
   }

   const onSubmit = e => {
      e.preventDefault();
      e.persist();
      const value: IOrderProps = {
         side: 'buy',
         price: typeof listenPrice === 'string' ? listenPrice.split(',').join('') : listenPrice,
         volume: orderVolume,
      }
      handleOrder(e, value);
      resetState();
   }

   const isDisabled = (): boolean => {
      const invalidAmount = Number(orderVolume) <= 0;
      const invalidLimitPrice = orderType === 'limit' && (Number(listenPrice) <= 0);
      return disabled || !availableQuote || invalidAmount || invalidLimitPrice || +Number(listenPrice) > +availableQuote
         || +availableQuote < +minPrice || +orderVolume < +minAmount || (orderType === 'limit' && +availableQuote < (+orderVolume * + convertPrice()));
   }

   const convertPrice = () => Number(typeof listenPrice === 'string' ? listenPrice.split(',').join('') : listenPrice);

   const totalPriceMareket = () => orderType === 'market' && Decimal.format(totalPrice(), pricePrecision, ',')

   const totalPrice = () => getTotalPrice(orderVolume, Number(priceMarket), asks);
   const safePrice = () => totalPrice() / Number(orderVolume) || Number(priceMarket);
   // const handleSetValue = (value: string | number | undefined, defaultValue: string) => (
   //    value || defaultValue
   // );

   const safeAmount = Number(orderVolume) || 0;
   const total = orderType === 'market'
      ? totalPrice() : safeAmount * (convertPrice() || 0);

   console.log('safePrice() :>> ', safePrice());
   console.log('total :>> ', total);

   return (
      <div className="lg:block flex w-[calc(50%-32px)] shrink-0 grow-0 my-0 mx-4">
         <div className="flex items-center justify-between mb-4">
            <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
               Buy {to}
            </div>
            <div className="flex items-center space-x-1">
               <IcWallet className="w-4 h-4 fill-neutral2 dark:fill-neutral4 transition-colors duration-300" />
               <div className="text-xs font-semibold leading-custom1">
                  {Decimal.format(availableQuote, pricePrecision, ',')} {from}
               </div>
            </div>
         </div>
         {/* <pre>
            <code>
               <div className="flex flex-col space-y-3">
                  <div className="flex space-x-2">
                     <div className="">orderPrice : </div>
                     <div className="font-urw-din-500 tracking-widest">{orderPrice} {typeof orderPrice}</div>
                  </div>
                  <div className="flex space-x-2">
                     <div className="">listenPrice : </div>
                     <div className="font-urw-din-500 tracking-widest">{listenPrice} {typeof listenPrice}</div>
                  </div>
                  <div className="flex space-x-2">
                     <div className="">orderTotal : </div>
                     <div className="font-urw-din-500 tracking-widest">{orderTotal} {typeof orderTotal}</div>
                  </div>
                  <div className="flex space-x-2">
                     <div className="">priceMarket : </div>
                     <div className="font-urw-din-500 tracking-widest">{priceMarket} {typeof priceMarket}</div>
                  </div>
                  <div className="flex space-x-2">
                     <div className="">orderVolume : </div>
                     <div className="font-urw-din-500 tracking-widest">{orderVolume} {typeof orderVolume}</div>
                  </div>
               </div>
            </code>
         </pre> */}
         <form onSubmit={onSubmit} className="flex flex-col space-y-3">
            <InputCurrency
               titleLeft={translate('page.body.trade.header.newOrder.content.price')}
               titleRight={from}
               placeholder={orderType === 'market' ? 'Market' : ''}
               disabled={orderType === 'market'}
               value={orderType === 'market' ? '' : listenPrice}
               onChange={handleChangePrice}
               className={orderType === 'market' ? '!bg-neutral7 dark:!bg-shade1' : ''}
            />
            <InputOrder
               titleLeft={translate('page.body.trade.header.newOrder.content.amount')}
               titleRight={to}
               value={orderVolume === '' ? '' : orderVolume}
               onChange={handleChangeAmount}
               className="caret-primary1"
            />
            <SliderPercent
               instanceRef={instance => {
                  if (instance && !ref) {
                     setRef(instance);
                  }
               }}
               range={{
                  min: 0,
                  max: 100
               }}
               start={0}
               onSlide={handleChangePercentage}
            />
            <InputOrder
               titleLeft={translate('page.body.trade.header.newOrder.content.total')}
               titleRight={from}
               value={
                  orderType === 'market' ? totalPriceMareket()
                     : orderTotal === 'NaN' ? 'Total is too long...' : orderTotal}
               // value={
               //    orderType === 'market' ? totalPriceMareket()
               //       : (orderTotal === '' || orderTotal === '0' || orderTotal === '0.00') ? ''
               //          : orderTotal}
               readOnly
            />
            {/* {orderType === 'market' ? <span>&asymp;</span> : null}
            {Decimal.format(Number(total), pricePrecision, ',')}
            {' - '}
            {handleSetValue(Decimal.format(safePrice(), pricePrecision, ','), '0')} */}
            <Button
               type="submit"
               text={`Buy ${to}`}
               disabled={isDisabled()}
               variant="green"
            />
         </form>
      </div>
   )
}
