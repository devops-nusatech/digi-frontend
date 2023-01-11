import * as React from 'react';
import { Decimal, TradingOrderNewTabForm, Button, InputOrder, SliderPercent } from 'components';
import { FilterPrice } from 'filters';
import { getAmount, getTotalPrice } from 'helpers';
import { IcWallet } from 'assets';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
// import Nouislider from 'nouislider-react';
// import 'nouislider/distribute/nouislider.css';

export type FormTypeNew = 'buy' | 'sell';
type TOrderType = 'limit' | 'market';

export type DropdownElemNew = number | string | React.ReactNode;

export interface OrderPropsNew {
   type: FormTypeNew;
   orderType: string | React.ReactNode;
   price: number | string;
   amount: number | string;
   available: number;
}

export type OnSubmitCallbackNew = (order: OrderPropsNew) => void;

export interface OrderComponentPropsNew {
   /**
    * Amount of money in base currency wallet
    */
   availableBase: number;
   /**
    * Amount of money in quote currency wallet
    */
   availableQuote: number;
   /**
    * Callback which is called when a form is submitted
    */
   onSubmit: OnSubmitCallbackNew;
   /**
    * If orderType is 'Market' this value will be used as price for buy tab
    */
   priceMarketBuy: number;
   /**
    * If orderType is 'Market' this value will be used as price for sell tab
    */
   priceMarketSell: number;
   /**
    * If orderType is 'Limit' this value will be used as price
    */
   priceLimit?: number;
   /**
    * Name of currency for price field
    */
   from: string;
   /**
    * Name of currency for amount field
    */
   to: string;
   /**
    * Whether order is disabled to execute
    */
   disabled?: boolean;
   handleSendType?: (index: number, label: string) => void;
   /**
    * Index of tab to switch on
    */
   /**
    * Precision of amount, total, available, fee value
    */
   currentMarketAskPrecision: number;
   /**
    * Precision of price value
    */
   currentMarketBidPrecision: number;
   orderTypes?: DropdownElemNew[];
   orderTypesIndex?: DropdownElemNew[];
   /**
    *
    */
   /**
    * proposals for buy
    */
   bids: string[][];
   /**
    * proposals for sell
    */
   asks: string[][];
   /**
    * start handling change price
    */
   listenInputPrice?: () => void;
   /**
    * default tab index
    */
   defaultTabIndex?: number;
   isMobileDevice?: boolean;
   currentMarketFilters: FilterPrice[];
   translate: (id: string, value?: any) => string;
}

interface State {
   index: number;
   amountSell: string;
   amountBuy: string;
   orderType: TOrderType;
   price: number | string;
}

const defaultOrderTypes: DropdownElemNew[] = [
   'Limit',
   'Market',
];

export class TradingOrderNewTab extends React.Component<OrderComponentPropsNew, State> {
   constructor(props: OrderComponentPropsNew) {
      super(props);
      this.state = {
         index: 0,
         orderType: 'limit',
         price: '',
         amountSell: '',
         amountBuy: '',
      };
   }

   public componentDidMount() {
      const { defaultTabIndex } = this.props;

      if (defaultTabIndex !== undefined) {
         this.handleChangeTab(defaultTabIndex);
      }
   }

   public render() {
      const {
         priceLimit,
         availableQuote,
         availableBase,
         currentMarketAskPrecision,
         currentMarketBidPrecision,
         from,
         to,
         translate,
      } = this.props;
      const { orderType, amountBuy, amountSell } = this.state;
      return (
         <>
            <div className="relative mt-1 rounded p-4 bg-neutral8 dark:bg-shade2">
               <div className="flex items-center mb-6 justify-between">
                  <div className="flex items-center space-x-4">
                     <div
                        onClick={() => this.handleGetOrderType('limit')}
                        className={`flex py-1.5 px-3 rounded-1xl font-dm font-bold leading-custom3 ${orderType === 'limit' ? 'bg-neutral6 dark:bg-neutral3' : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'} cursor-pointer transition ease-in-out duration-300`}
                     >
                        {translate('page.body.trade.header.newOrder.content.orderType.limit')}
                     </div>
                     <div
                        onClick={() => this.handleGetOrderType('market')}
                        className={`flex py-1.5 px-3 rounded-1xl font-dm font-bold leading-custom3 cursor-pointer ${orderType === 'market' ? 'bg-neutral6 dark:bg-neutral3' : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'} transition ease-in-out duration-300`}
                     >
                        {translate('page.body.trade.header.newOrder.content.orderType.market')}
                     </div>
                  </div>
                  <div className="flex items-center text-xs text-neutral4 font-medium leading-custom1">
                     <div className="">
                        Crypto trading tutorial
                     </div>
                     <Link to="/" className="flex items-center group">
                        <div className="ml-2 text-neutral2 dark:text-neutral6 group-hover:text-primary1 transition-all duration-300">
                           Learn now
                        </div>
                        <div className="w-5 h-5 flex items-center justify-center">
                           <ChevronRightIcon className="w-4 h-4 stroke-neutral2 dark:stroke-neutral6 fill-neutral2 dark:fill-neutral6 group-hover:stroke-primary1 transition-all duration-300" />
                        </div>
                     </Link>
                  </div>
               </div>
               <div className="flex my-0 -mx-4">
                  <div className="lg:block flex w-[calc(50%-32px)] shrink-0 grow-0 my-0 mx-4">
                     <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
                           Buy {to.toUpperCase()}
                        </div>
                        <div className="flex items-center space-x-1">
                           <IcWallet />
                           <div className="text-xs font-semibold leading-custom1">
                              {Decimal.format(availableQuote, currentMarketBidPrecision, ',')} {from.toUpperCase()}
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col space-y-3">
                        <InputOrder
                           titleLeft={translate('page.body.trade.header.newOrder.content.price')}
                           titleRight={from.toUpperCase()}
                           value={orderType === 'market' ? '' : priceLimit}
                           placeholder={orderType === 'market' ? 'Market' : ''}
                           disabled={orderType === 'market'}
                        />
                        <InputOrder
                           titleLeft={translate('page.body.trade.header.newOrder.content.amount')}
                           titleRight={to.toUpperCase()}
                           value={amountBuy}
                           readOnly={orderType === 'limit'}
                        />
                        <SliderPercent
                           range={{
                              min: 0,
                              max: 100
                           }}
                           start={20}
                           onSlide={() => { }}
                        />
                        <InputOrder
                           titleLeft={translate('page.body.trade.header.newOrder.content.total')}
                           titleRight={from.toUpperCase()}
                           value={amountBuy}
                           readOnly
                        />
                        <Button
                           onClick={() => { }}
                           text={`Buy ${from.toUpperCase()}`}
                           className="bg-primary5 hover:bg-primary5 hover:contrast-75"
                        />
                     </div>
                  </div>
                  <div className="lg:block flex w-[calc(50%-32px)] shrink-0 grow-0 my-0 mx-4">
                     <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl leading-custom2 font-semibold tracking-custom1">
                           Sell {to.toUpperCase()}
                        </div>
                        <div className="flex items-center space-x-1">
                           <IcWallet />
                           <div className="text-xs font-semibold leading-custom1">
                              {Decimal.format(availableBase, currentMarketAskPrecision, ',')} {to.toUpperCase()}
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col space-y-3">
                        <InputOrder
                           titleLeft={translate('page.body.trade.header.newOrder.content.price')}
                           titleRight={from.toUpperCase()}
                           value={orderType === 'limit' ? priceLimit : ''}
                           placeholder={orderType === 'market' ? 'Market' : ''}
                           disabled={orderType === 'market'}
                        />
                        <InputOrder
                           titleLeft={translate('page.body.trade.header.newOrder.content.amount')}
                           titleRight={to.toUpperCase()}
                           value={amountSell}
                           readOnly={orderType === 'market'}
                        />
                        <SliderPercent
                           range={{
                              min: 0,
                              max: 100
                           }}
                           start={20}
                           onSlide={() => { }}
                        />
                        <InputOrder
                           titleLeft={translate('page.body.trade.header.newOrder.content.total')}
                           titleRight={from.toUpperCase()}
                           value={amountSell}
                        />
                        <Button
                           text={`Sell ${from.toUpperCase()}`}
                           disabled={availableBase === 0}
                           className="bg-primary4 hover:bg-primary4 hover:contrast-75 disabled:bg-primary4 disabled:bg-opacity-40"
                        />
                     </div>
                  </div>
               </div>
            </div>
            {this.getPanel('buy')}{this.getPanel('sell')}
         </>
      );
   }

   public getPanel = (type: FormTypeNew) => {
      const {
         availableBase,
         availableQuote,
         disabled,
         priceMarketBuy,
         priceMarketSell,
         priceLimit,
         from,
         to,
         currentMarketAskPrecision,
         currentMarketBidPrecision,
         orderTypes,
         orderTypesIndex,
         asks,
         bids,
         currentMarketFilters,
         isMobileDevice,
         listenInputPrice,
         translate,
      } = this.props;
      const { amountSell, amountBuy } = this.state;

      const proposals = this.isTypeSell(type) ? bids : asks;
      const available = this.isTypeSell(type) ? availableBase : availableQuote;
      const priceMarket = this.isTypeSell(type) ? priceMarketSell : priceMarketBuy;
      const disabledData = this.isTypeSell(type) ? {} : { disabled };
      const amount = this.isTypeSell(type) ? amountSell : amountBuy;
      // const preLabel = this.isTypeSell(type) ? (
      //    translate('page.body.trade.header.newOrder.content.tabs.sell')
      // ) : (
      //    translate('page.body.trade.header.newOrder.content.tabs.buy')
      // );
      // const label = this.isTypeSell(type) ? 'Sell' : 'Buy';

      return <TradingOrderNewTabForm
         type={type}
         from={from}
         {...disabledData}
         to={to}
         available={available}
         priceMarket={priceMarket}
         priceLimit={priceLimit}
         onSubmit={this.props.onSubmit}
         orderTypes={orderTypes || defaultOrderTypes}
         orderTypesIndex={orderTypesIndex || defaultOrderTypes}
         currentMarketAskPrecision={currentMarketAskPrecision}
         currentMarketBidPrecision={currentMarketBidPrecision}
         totalPrice={getTotalPrice(amount, priceMarket, proposals)}
         amount={amount}
         listenInputPrice={listenInputPrice}
         handleAmountChange={this.handleAmountChange}
         handleChangeAmountByButton={this.handleChangeAmountByButton}
         currentMarketFilters={currentMarketFilters}
         isMobileDevice={isMobileDevice}
         translate={translate}
      />
   };

   //
   private handleGetOrderType = (type: TOrderType) => this.setState({ orderType: type });
   //

   private handleChangeTab = (index: number, label?: string) => {
      if (this.props.handleSendType && label) {
         this.props.handleSendType(index, label);
      }

      this.setState({
         index: index,
      });
   };

   private handleAmountChange = (amount, type) => {
      if (type === 'sell') {
         this.setState({ amountSell: amount });
      } else {
         this.setState({ amountBuy: amount });
      }
   };

   private handleChangeAmountByButton = (value, orderType, price, type) => {
      const { bids, asks, availableBase, availableQuote } = this.props;
      const proposals = this.isTypeSell(type) ? bids : asks;
      const available = this.isTypeSell(type) ? availableBase : availableQuote;
      let newAmount = '';

      switch (type) {
         case 'buy':
            switch (orderType) {
               case 'Limit':
                  newAmount = available && +price ? (
                     Decimal.format(available / +price * value, this.props.currentMarketAskPrecision)
                  ) : '';

                  break;
               case 'Market':
                  newAmount = available ? (
                     Decimal.format(getAmount(Number(available), proposals, value), this.props.currentMarketAskPrecision)
                  ) : '';

                  break;
               default:
                  break;
            }
            break;
         case 'sell':
            newAmount = available ? (
               Decimal.format(available * value, this.props.currentMarketAskPrecision)
            ) : '';

            break;
         default:
            break;
      }

      if (type === 'sell') {
         this.setState({ amountSell: newAmount });
      } else {
         this.setState({ amountBuy: newAmount });
      }
   };

   private isTypeSell = (type: string) => type === 'sell';
}
