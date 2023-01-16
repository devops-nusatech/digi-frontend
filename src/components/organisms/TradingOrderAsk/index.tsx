import React, { FC, FormEvent, useEffect, useState } from 'react';
import {
   Button,
   InputOrder,
   SliderPercent,
   Decimal,
   InputCurrency,
   IOrderProps,
   // InputAmount,
} from 'components';
import { IcWallet } from 'assets';
import { OrderType } from 'modules/types';
import { cleanPositiveFloatInput, getTotalPrice, precisionRegExp } from 'helpers';

type Ref = null | any;

interface TradingOrderAsksProps {
   to: string;
   from: string;
   availableBase: number;
   translate: (id: string) => string;
   pricePrecision: number;
   amountPrecision: number;
   disabled: boolean;
   orderPrice: string;
   orderType: OrderType;
   handleOrder: (e: FormEvent<HTMLFormElement>, order: IOrderProps) => void;
   minAmount: number;
   minPrice: number;
   priceMarket: string;
   amountVolume: string;
   market: string;
   bids: string[][];
}

export const TradingOrderAsk: FC<TradingOrderAsksProps> = ({
   to,
   from,
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
   bids,
}) => {
   const [listenPrice, setListenPrice] = useState<string>(orderPrice);
   const [orderVolume, setOrderVolume] = useState<string>(amountVolume);
   const [orderTotal, setOrderTotal] = useState<string>('');
   const [slide, setSlide] = useState<number>((0));

   const [ref, setRef] = useState<Ref>(null);

   const handleResetSlider = () => {
      if (ref && ref.noUiSlider) {
         ref.noUiSlider.set(0);
      }
   };

   useEffect(() => {
      return () => {
         resetState();
      };
   }, [market]);

   useEffect(() => {
      setListenPrice(orderPrice);
      setOrderVolume(amountVolume);
   }, [orderPrice, amountVolume]);

   useEffect(() => {
      const formatPrice = Number(typeof orderPrice === 'string' ? orderPrice.split(',').join('') : orderPrice);
      setOrderTotal(Decimal.format(formatPrice * Number(orderVolume), pricePrecision, ','));
      handleResetSlider();
   }, [orderPrice]);

   useEffect(() => {
      setOrderVolume(Decimal.format(availableBase * slide, amountPrecision, ','));
      setOrderTotal(Decimal.format(convertPrice() * (availableBase * slide), pricePrecision, ','))
   }, [slide]);

   const handleChangePrice = (value: string) => {
      const formatPrice = Number(value.split(',').join(''));
      setListenPrice(value);
      setOrderTotal(Decimal.format(formatPrice * Number(orderVolume), pricePrecision, ','));
   }

   const handleChangeAmount = (value: string) => {
      const convertedValue = cleanPositiveFloatInput(value)
      if (convertedValue.match(precisionRegExp(amountPrecision))) {
         setOrderVolume(convertedValue);
         setOrderTotal(Decimal.format(convertPrice() * Number(convertedValue), pricePrecision, ','));
         setSlide(0);
         handleResetSlider();
      };
   }

   const handleChangePercentage = (a, b, c) => setSlide(c[0] / 100);

   // const valueTotal = () => orderType === 'market'
   //    ? Decimal.format(Number(priceMarket) * Number(orderVolume), pricePrecision, ',')
   //    : Decimal.format(convertPrice() * Number(orderVolume), pricePrecision, ',');

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
         side: 'sell',
         price: typeof listenPrice === 'string' ? listenPrice.split(',').join('') : listenPrice,
         volume: orderVolume.includes(',') ? orderVolume.split(',').join('') : orderVolume,
      }
      handleOrder(e, value);
      resetState();
   }

   const isDisabled = (): boolean => {
      const invalidAmount = Number(orderVolume) <= 0;
      const invalidLimitPrice = orderType === 'limit' && (Number(listenPrice) <= 0);
      return disabled || !availableBase || invalidAmount || invalidLimitPrice || +Number(orderVolume) > +availableBase || +availableBase < +minAmount;
   }

   const totalPrice = () => getTotalPrice(orderVolume, Number(priceMarket), bids);
   const safePrice = () => totalPrice() / Number(orderVolume) || Number(priceMarket);
   // const handleSetValue = (value: string | number | undefined, defaultValue: string) => (
   //    value || defaultValue
   // );

   const convertPrice = (): number => Number(typeof listenPrice === 'string' ? listenPrice.split(',').join('') : listenPrice);

   const totalPriceMareket = () => orderType === 'market' && Decimal.format(totalPrice(), pricePrecision, ',')
   // const totalPriceMareket = () => orderType === 'market' && Decimal.format(Number(priceMarket) * Number(orderVolume), pricePrecision, ',')

   const safeAmount = Number(orderVolume) || 0;
   const total = orderType === 'market'
      ? totalPrice() : safeAmount * (convertPrice() || 0);

   console.log('safePrice() :>> ', safePrice());
   console.log('total :>> ', total);

   return (
      <div className="lg:block flex w-[calc(50%-32px)] shrink-0 grow-0 my-0 mx-4">
         <div className="flex items-center justify-between mb-4">
            <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
               Sell {to}
            </div>
            <div className="flex items-center space-x-1">
               <IcWallet className="w-4 h-4 fill-neutral2 dark:fill-neutral4 transition-colors duration-300" />
               <div className="text-xs font-semibold leading-custom1">
                  {Decimal.format(availableBase, amountPrecision, ',')} {to}
               </div>
            </div>
         </div>
         <form onSubmit={onSubmit} className="flex flex-col space-y-3">
            <InputCurrency
               titleLeft={translate('page.body.trade.header.newOrder.content.price')}
               titleRight={from}
               placeholder={orderType === 'market' ? 'Market' : ''}
               disabled={orderType === 'market'}
               className={orderType === 'market' ? '!bg-neutral7 dark:!bg-shade1' : ''}
               value={orderType === 'market' ? '' : listenPrice}
               onChange={handleChangePrice}
            />
            <InputOrder
               titleLeft={translate('page.body.trade.header.newOrder.content.amount')}
               titleRight={to}
               value={orderVolume}
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
                  max: 100,
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
               readOnly
            />
            {/* {orderType === 'market' ? <span>&asymp;</span> : null}
            {Decimal.format(Number(total), pricePrecision, ',')}
            {' - '}
            {handleSetValue(Decimal.format(safePrice(), pricePrecision, ','), '0')} */}
            <Button
               type="submit"
               text={`Sell ${to}`}
               disabled={isDisabled()}
               variant="orange"
            />
         </form>
      </div>
   );
};
