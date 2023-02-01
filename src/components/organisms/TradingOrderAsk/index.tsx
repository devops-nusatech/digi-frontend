import React, {
   FC,
   useEffect,
   useState
} from 'react';
import {
   Button,
   InputOrder,
   SliderPercent,
   Decimal,
   InputCurrency,
   IOrderProps,
   Dialog,
   // InputAmount,
} from 'components';
import { IcWallet } from 'assets';
import { OrderType } from 'modules/types';
import {
   cleanPositiveFloatInput,
   getTotalPrice,
   precisionRegExp
} from 'helpers';

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
   handleOrder: (order: IOrderProps) => void;
   minAmount: number;
   minPrice: string;
   maxPrice: number;
   priceMarket: string;
   amountVolume: string;
   market: string;
   bids: string[][];
   executeLoading: boolean;
   taker: number;
   maker: number;
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
   maxPrice,
   priceMarket,
   amountVolume,
   market,
   bids,
   executeLoading,
   taker,
   maker,
}) => {
   const [listenPrice, setListenPrice] = useState<string>(orderPrice);
   const [orderVolume, setOrderVolume] = useState<string>(amountVolume);
   const [orderTotal, setOrderTotal] = useState<string>('');
   const [slide, setSlide] = useState<number>((0));
   const [ref, setRef] = useState<Ref>(null);

   const [priceError, setPriceError] = useState('');
   const [amountError, setAmountError] = useState('');

   const [modalConfirmOrder, setModalConfirmOrder] = useState(false);
   const handleOrderConfirm = () => setModalConfirmOrder(!modalConfirmOrder);

   const handleResetSlider = () => {
      if (ref && ref.noUiSlider) {
         ref.noUiSlider.set(0);
      }
   };

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
      const formatPrice = Number(typeof orderPrice === 'string' ? orderPrice.split(',').join('') : orderPrice);
      setOrderTotal(Decimal.format(formatPrice * Number(orderVolume.includes(',') ? orderVolume?.split(',')?.join('') : orderVolume), pricePrecision, ','));
      handleResetSlider();
   }, [orderPrice]);

   useEffect(() => {
      setOrderVolume(Decimal.format(availableBase * slide, amountPrecision, ','));
      setOrderTotal(Decimal.format(convertPrice() * (availableBase * slide), pricePrecision, ','))
   }, [slide]);

   const handleChangePrice = (value: string) => {
      const formatPrice = value.split(',').join('');
      setListenPrice(value);
      setOrderTotal(Decimal.format(+formatPrice * Number(orderVolume), pricePrecision, ','));
      ((+formatPrice < +minPrice) && value.length) ? setPriceError(`Minimum price ${Decimal.format(minPrice, pricePrecision, ',')} ${from}`) : ((+formatPrice > maxPrice) && value.length) ? setPriceError(`Maximum price ${Decimal.format(maxPrice, pricePrecision, ',')} ${from}`) : setPriceError('');
   }

   const handleChangeAmount = (value: string) => {
      ((+value < minAmount) && value.length) ? setAmountError(`Minimum amount ${Decimal.format(minAmount, amountPrecision, ',')} ${from}`) : +value > availableBase ? setAmountError('Balance is insufficient') : setAmountError('');
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

   const onSubmit = () => {
      const value: IOrderProps = {
         side: 'sell',
         price: typeof listenPrice === 'string' ? listenPrice.split(',').join('') : listenPrice,
         volume: orderVolume.includes(',') ? orderVolume.split(',').join('') : orderVolume,
      }
      handleOrder(value);
      resetState();
      handleOrderConfirm();
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

   const totalPriceMarket = () => orderType === 'market' && Decimal.format(totalPrice(), pricePrecision, ',')
   // const totalPriceMarket = () => orderType === 'market' && Decimal.format(Number(priceMarket) * Number(orderVolume), pricePrecision, ',')

   const safeAmount = Number(orderVolume) || 0;
   const total = orderType === 'market'
      ? totalPrice() : safeAmount * (convertPrice() || 0);

   console.log('safePrice() :>> ', safePrice());
   console.log('total :>> ', total);

   return (
      <>
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
            <form className="flex flex-col space-y-3">
               <InputCurrency
                  titleLeft={translate('page.body.trade.header.newOrder.content.price')}
                  titleRight={from}
                  placeholder={orderType === 'market' ? 'Market' : ''}
                  disabled={orderType === 'market'}
                  className={orderType === 'market' ? '!bg-neutral7 dark:!bg-shade1' : ''}
                  value={orderType === 'market' ? '' : listenPrice}
                  onChange={handleChangePrice}
                  withError={!!priceError.length}
                  info={priceError}
               />
               <InputOrder
                  titleLeft={translate('page.body.trade.header.newOrder.content.amount')}
                  titleRight={to}
                  value={orderVolume}
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
                  titleLeft={translate('page.body.trade.header.newOrder.content.total')}
                  titleRight={from}
                  value={
                     orderType === 'market' ? totalPriceMarket()
                        : orderTotal === 'NaN' ? 'Total is too long...' : orderTotal}
                  readOnly
               />
               {/* {orderType === 'market' ? <span>&asymp;</span> : null}
            {Decimal.format(Number(total), pricePrecision, ',')}
            {' - '}
            {handleSetValue(Decimal.format(safePrice(), pricePrecision, ','), '0')} */}
               <Button
                  text={`Sell ${to}`}
                  disabled={isDisabled()}
                  variant="orange"
                  onClick={handleOrderConfirm}
               />
            </form>
         </div>
         <Dialog
            isOpen={modalConfirmOrder}
            setIsOpen={handleOrderConfirm}
            title="Confirm Order"
         >
            <div className="space-y-2">
               <div className="text-center font-medium leading-normal">
                  You get
               </div>
               <div className="text-center font-dm font-bold text-3.5xl leading-tight tracking-custom1 uppercase">
                  &asymp; {Decimal.format(
                     orderType === 'market'
                        ? String(totalPriceMarket())?.includes(',')
                           ? String(totalPriceMarket())?.split(',')?.join('')
                           : String(totalPriceMarket())
                        : orderTotal?.includes(',')
                           ? (Number(orderTotal?.split(',')?.join('')) - (taker * Number(orderTotal?.split(',')?.join(''))))
                           : Number(orderTotal) - (taker * Number(orderTotal)),
                     pricePrecision, ',') || 0} {from}
               </div>
            </div>
            <div className="space-y-3">
               <List
                  left="Price"
                  right={orderType === 'market' ? 'Market' : Decimal.format(typeof listenPrice === 'string' && listenPrice?.includes(',') ? listenPrice?.split(',')?.join('') : listenPrice, pricePrecision, ',')}
                  rightAlt={from}
               />
               <List
                  left="Order type"
                  right={orderType}
               />
               <List
                  left="Fee processing"
                  right={`${taker}% - ${maker}%`}
                  classNameRight="text-primary4"
               />
               <List
                  left="Side"
                  right="Sell"
                  classNameRight="text-primary4"
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
   classNameRight?: string
}
const List = ({ left, right, rightAlt, classNameRight }: ListProps) => (
   <div className="flex items-center">
      <div className="text-neutral4">{left}</div>
      <div className={`text-right font-medium ml-auto capitalize ${classNameRight}`}>
         {right} <span className="text-neutral4">{rightAlt}</span>
      </div>
   </div>
);
