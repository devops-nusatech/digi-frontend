import React, { useEffect, useState } from 'react';
import {
   Button,
   InputOrder,
   SliderPercent,
   Decimal,
   InputCurrency,
   IOrderProps,
   Dialog,
   Text2xl,
   FlexCenter,
} from 'components';
import { OrderType } from 'modules/types';
import {
   cleanPositiveFloatInput,
   getTotalPrice,
   precisionRegExp,
} from 'helpers';
import { IsDisplay } from 'types';

type Ref = null | any;
interface TradingOrderBidProps extends IsDisplay {
   setShowOrder: (e: '' | 'buy' | 'sell') => void;
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
   handleOrder: (order: IOrderProps) => void;
   minAmount: number;
   minPrice: string;
   maxPrice: number;
   priceMarket: string;
   amountVolume: string;
   market: string;
   asks: string[][];
   executeLoading: boolean;
   taker: number;
   maker: number;
}

export const TradingOrderBid = ({
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
   maxPrice,
   priceMarket,
   amountVolume,
   market,
   asks,
   executeLoading,
   maker,
   taker,
   display,
   setShowOrder,
}: TradingOrderBidProps) => {
   const [listenPrice, setListenPrice] = useState<string>('');
   const [orderVolume, setOrderVolume] = useState<string>('');
   const [orderTotal, setOrderTotal] = useState<string>('');
   const [slide, setSlide] = useState<number>(0);
   const [ref, setRef] = useState<Ref>(null);

   const [priceError, setPriceError] = useState('');
   const [amountError, setAmountError] = useState('');

   const [modalConfirmOrder, setModalConfirmOrder] = useState(false);
   const handleOrderConfirm = () => setModalConfirmOrder(!modalConfirmOrder);

   useEffect(() => {
      setListenPrice(orderPrice);
      setOrderVolume(amountVolume);
   }, [orderPrice, amountVolume]);

   useEffect(() => {
      if (market) {
         setPriceError('');
         setListenPrice('');
      }
      return () => {
         resetState();
      };
   }, [market]);

   useEffect(() => {
      const formatPrice = Number(
         typeof orderPrice === 'string'
            ? orderPrice.split(',').join('')
            : orderPrice
      );
      setOrderTotal(
         Decimal.format(
            formatPrice *
               Number(
                  orderVolume.includes(',')
                     ? orderVolume?.split(',')?.join('')
                     : orderVolume
               ),
            pricePrecision,
            ','
         )
      );
      handleResetSlider();
      console.log('effect :>> ', 3);
   }, [orderPrice]);

   useEffect(() => {
      if (slide > 0 && convertPrice()) {
         setOrderVolume(
            Decimal.format(
               (availableQuote * slide) / convertPrice(),
               amountPrecision,
               ','
            )
         );
         const formatVolume = (availableQuote * slide) / convertPrice();
         setOrderTotal(
            Decimal.format(convertPrice() * formatVolume, pricePrecision, ',')
         );
         console.log('effect :>> ', 4);
         console.log(slide);
      }
   }, [slide]);

   const handleChangePrice = (value: string) => {
      const formatPrice = value.split(',').join('');
      setListenPrice(value);
      setOrderTotal(
         Decimal.format(+formatPrice * Number(orderVolume), pricePrecision, ',')
      );
      +formatPrice < +minPrice && value.length
         ? setPriceError(
              `Minimum price ${Decimal.format(
                 minPrice,
                 pricePrecision,
                 ','
              )} ${from}`
           )
         : +formatPrice > maxPrice && value.length
         ? setPriceError(
              `Maximum price ${Decimal.format(
                 maxPrice,
                 pricePrecision,
                 ','
              )} ${from}`
           )
         : setPriceError('');
   };

   const handleChangeAmount = (value: string) => {
      +value < minAmount && value.length
         ? setAmountError(
              `Minimum amount ${Decimal.format(
                 minAmount,
                 amountPrecision,
                 ','
              )} ${from}`
           )
         : +value * convertPrice() > availableQuote
         ? setAmountError('Balance is insufficient')
         : setAmountError('');
      const convertedValue = cleanPositiveFloatInput(value);
      if (convertedValue.match(precisionRegExp(amountPrecision))) {
         setOrderVolume(convertedValue);
         setOrderTotal(
            Decimal.format(
               convertPrice() * Number(convertedValue),
               pricePrecision,
               ','
            )
         );
         setSlide(0);
         handleResetSlider();
      }
      // if (value === '') {
      //    setOrderVolume(amountVolume);
      // } else {
      //    const convertedValue = cleanPositiveFloatInput(value)
      //    if (convertedValue.match(precisionRegExp(amountPrecision))) {
      //       setOrderVolume(convertedValue);
      //       setOrderTotal(Decimal.format(convertPrice() * Number(convertedValue), pricePrecision, ','));
      //       setSlide(0);
      //       handleResetSlider();
      //    };
      // }
   };

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
   };

   const onSubmit = () => {
      const value: IOrderProps = {
         side: 'buy',
         price:
            typeof listenPrice === 'string'
               ? listenPrice.split(',').join('')
               : listenPrice,
         volume: orderVolume,
      };
      handleOrder(value);
      resetState();
      handleOrderConfirm();
   };

   const isDisabled = (): boolean => {
      const invalidAmount = Number(orderVolume) <= 0;
      const invalidLimitPrice =
         orderType === 'limit' && Number(listenPrice) <= 0;
      return (
         disabled ||
         !availableQuote ||
         invalidAmount ||
         invalidLimitPrice ||
         +Number(listenPrice) > +availableQuote ||
         +availableQuote < +minPrice ||
         +orderVolume < +minAmount ||
         (orderType === 'limit' &&
            +availableQuote < +orderVolume * +convertPrice())
      );
   };

   const convertPrice = () =>
      Number(
         typeof listenPrice === 'string'
            ? listenPrice.split(',').join('')
            : listenPrice
      );

   const totalPriceMarket = () =>
      orderType === 'market' &&
      Decimal.format(totalPrice(), pricePrecision, ',');

   const totalPrice = () =>
      getTotalPrice(orderVolume, Number(priceMarket), asks);
   const safePrice = () =>
      totalPrice() / Number(orderVolume) || Number(priceMarket);
   // const handleSetValue = (value: string | number | undefined, defaultValue: string) => (
   //    value || defaultValue
   // );

   const safeAmount = Number(orderVolume) || 0;
   const total =
      orderType === 'market'
         ? totalPrice()
         : safeAmount * (convertPrice() || 0);

   console.log('safePrice() :>> ', safePrice());
   console.log('total :>> ', total);

   return (
      <>
         <div
            className={`mx-4 w-c-1/2-8 shrink-0 grow-0 basis-c-1/2-8 lg:!block lg-max:m-0 ${
               display
                  ? 'lg-max:visible lg-max:h-full lg-max:opacity-100'
                  : 'lg-max:invisible lg-max:h-0 lg-max:opacity-0'
            } lg-max:w-full lg-max:transition-all lg-max:duration-500 lg-max:ease-in`}>
            <div className="hidden lg-max:mb-4 lg-max:flex lg-max:items-center">
               <div className="mr-auto text-base font-medium leading-normal text-neutral4">
                  Place order
               </div>
               <svg
                  className="h-6 w-6 cursor-pointer fill-neutral4"
                  onClick={() => setShowOrder('')}>
                  <use xlinkHref="#icon-close-circle" />
               </svg>
            </div>
            <div className="mb-4 flex items-center justify-between">
               <Text2xl
                  text={`Buy ${to}`}
                  className="leading-custom2"
               />
               <FlexCenter className="text-xs font-semibold">
                  <svg className="mr-1 h-4 w-4 fill-neutral4">
                     <use xlinkHref="#icon-wallet" />
                  </svg>
                  <span>
                     {Decimal.format(availableQuote, pricePrecision, ',')}{' '}
                     {from}
                  </span>
               </FlexCenter>
            </div>
            <form className="space-y-3">
               <InputCurrency
                  titleLeft={translate(
                     'page.body.trade.header.newOrder.content.price'
                  )}
                  titleRight={from}
                  placeholder={orderType === 'market' ? 'Market' : ''}
                  disabled={orderType === 'market'}
                  value={orderType === 'market' ? '' : listenPrice}
                  onChange={handleChangePrice}
                  className={
                     orderType === 'market'
                        ? '!bg-neutral7 dark:!bg-shade1'
                        : ''
                  }
                  withError={!!priceError.length}
                  info={priceError}
               />
               <InputOrder
                  titleLeft={translate(
                     'page.body.trade.header.newOrder.content.amount'
                  )}
                  titleRight={to}
                  value={orderVolume === '' ? '' : orderVolume}
                  onChange={handleChangeAmount}
                  className="caret-primary1"
                  withError={!!amountError.length}
                  info={amountError}
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
                  titleLeft={translate(
                     'page.body.trade.header.newOrder.content.total'
                  )}
                  titleRight={from}
                  value={
                     orderType === 'market'
                        ? totalPriceMarket()
                        : orderTotal === 'NaN'
                        ? 'Total is too long...'
                        : orderTotal
                  }
                  // value={
                  //    orderType === 'market' ? totalPriceMarket()
                  //       : (orderTotal === '' || orderTotal === '0' || orderTotal === '0.00') ? ''
                  //          : orderTotal}
                  readOnly
               />
               {/* {orderType === 'market' ? <span>&asymp;</span> : null}
            {Decimal.format(Number(total), pricePrecision, ',')}
            {' - '}
            {handleSetValue(Decimal.format(safePrice(), pricePrecision, ','), '0')} */}
               <Button
                  text={`Buy ${to}`}
                  disabled={isDisabled()}
                  variant="green"
                  onClick={handleOrderConfirm}
               />
            </form>
         </div>
         <Dialog
            isOpen={modalConfirmOrder}
            setIsOpen={handleOrderConfirm}
            title="Confirm Order">
            <div className="space-y-2">
               <div className="text-center font-medium leading-normal">
                  You get
               </div>
               <div className="text-center font-dm text-3.5xl uppercase leading-tight tracking-custom1">
                  &asymp;{' '}
                  {Decimal.format(
                     orderType === 'market'
                        ? String(totalPriceMarket())?.includes(',')
                           ? String(totalPriceMarket())?.split(',')?.join('')
                           : String(totalPriceMarket())
                        : orderTotal?.includes(',')
                        ? Number(orderTotal?.split(',')?.join('')) -
                          taker * Number(orderTotal?.split(',')?.join(''))
                        : Number(orderTotal) - taker * Number(orderTotal),
                     pricePrecision,
                     ','
                  ) || 0}{' '}
                  {from}
               </div>
            </div>
            <div className="space-y-3">
               <List
                  left="Price"
                  right={
                     orderType === 'market'
                        ? 'Market'
                        : Decimal.format(
                             typeof listenPrice === 'string' &&
                                listenPrice?.includes(',')
                                ? listenPrice?.split(',')?.join('')
                                : listenPrice,
                             pricePrecision,
                             ','
                          )
                  }
                  rightAlt={from}
               />
               <List
                  left="Order type"
                  right={orderType}
               />
               <List
                  left="Fee processing"
                  right={`${maker}% - ${taker}%`}
                  classNameRight="text-primary4"
               />
               <List
                  left="Side"
                  right="Buy"
                  classNameRight="text-primary5 dark:text-chart1"
               />
            </div>
            <Button
               withLoading={executeLoading}
               text="Confirm"
               onClick={onSubmit}
            />
         </Dialog>
      </>
   );
};

type ListProps = {
   left: string;
   right: string;
   rightAlt?: string;
   classNameRight?: string;
};
const List = ({ left, right, rightAlt, classNameRight }: ListProps) => (
   <div className="flex items-center">
      <div className="text-neutral4">{left}</div>
      <div
         className={`ml-auto text-right font-medium capitalize ${classNameRight}`}>
         {right} <span className="text-neutral4">{rightAlt}</span>
      </div>
   </div>
);
