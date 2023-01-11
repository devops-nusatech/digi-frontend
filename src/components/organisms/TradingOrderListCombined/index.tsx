import React, { ReactNode, PureComponent } from 'react';
import { OrderBook } from '../../';
import { CellData } from '../../Table';
import { TradingOrderListTable } from 'components'


export interface TradingOrderListCombinedProps {
   /**
    * Data which is used to render Asks Table.
    */
   dataAsks: CellData[][];
   /**
    * Data which is used to render Bids Table.
    */
   dataBids: CellData[][];
   /**
    * Max value of volume which is used to calculate width of background row
    */
   maxVolume?: number;
   /**
    * Data which is used to calculate width of each Asks background row
    */
   orderBookEntryAsks: number[];
   /**
    * Data which is used to calculate width of each Bids background row
    */
   orderBookEntryBids: number[];
   /**
    * Renders table header
    */
   headers: string[];
   /**
    * Sets Asks row background color
    */
   rowBackgroundColorAsks?: string;
   /**
    * Sets Bids row background color
    */
   rowBackgroundColorBids?: string;
   /**
    * Callback that is called when a Asks market is selected
    */
   onSelectAsks: (orderIndex: string) => void;
   /**
    * Callback that is called when Bids a market is selected
    */
   onSelectBids: (orderIndex: string) => void;
   /**
    * Sets component breakpoint
    */
   isLarge: boolean;
   /**
    * Sets last price
    */
   lastPrice: ReactNode;
}


export class TradingOrderListCombined extends PureComponent<TradingOrderListCombinedProps> {

   public componentDidMount() {
      const scroll = document.getElementsByClassName('cr-order-book')[0];
      if (!this.props.isLarge && scroll) {
         scroll.scrollTop = scroll.scrollHeight;
      }
   }

   public componentWillReceiveProps(next: TradingOrderListCombinedProps) {
      const scroll = document.getElementsByClassName('cr-order-book')[0];
      if (next.isLarge !== this.props.isLarge && !next.isLarge && scroll) {
         scroll.scrollTop = scroll.scrollHeight;
      }
   }

   public render() {
      const {
         isLarge,
      } = this.props;

      return (
         <>
            {isLarge ? this.orderBookLarge() : this.orderBookSmall()}
         </>
      );
   }

   private orderBookLarge = () => {
      const {
         dataAsks,
         dataBids,
         maxVolume,
         orderBookEntryAsks,
         orderBookEntryBids,
         headers,
         rowBackgroundColorAsks,
         rowBackgroundColorBids,
         onSelectAsks,
         onSelectBids,
         lastPrice,
      } = this.props;

      // const reverseHead = headers.slice(0).reverse();

      return (
         <>
            <TradingOrderListTable
               side={'right'}
               headers={headers}
               data={dataBids}
               rowBackgroundColor={rowBackgroundColorBids}
               maxVolume={maxVolume}
               orderBookEntry={orderBookEntryBids}
               onSelect={onSelectBids}
            />
            <TradingOrderListTable
               side={'left'}
               headers={headers}
               data={dataAsks}
               rowBackgroundColor={rowBackgroundColorAsks}
               maxVolume={maxVolume}
               orderBookEntry={orderBookEntryAsks}
               onSelect={onSelectAsks}
            />
            <div className="cr-combined-order-book__market cr-combined-order-book__large-market">
               {lastPrice}
            </div>
         </>
      );
   };

   private orderBookSmall = () => {
      const {
         dataAsks,
         dataBids,
         maxVolume,
         orderBookEntryAsks,
         orderBookEntryBids,
         headers,
         rowBackgroundColorAsks,
         rowBackgroundColorBids,
         onSelectAsks,
         onSelectBids,
         lastPrice,
      } = this.props;

      return (
         <>
            <div className="cr-combined-order-book__small">
               <OrderBook
                  side={'left'}
                  headers={headers}
                  data={dataAsks}
                  rowBackgroundColor={rowBackgroundColorAsks}
                  maxVolume={maxVolume}
                  orderBookEntry={orderBookEntryAsks}
                  onSelect={onSelectAsks}
               />
               <div className="cr-combined-order-book__market">
                  {lastPrice}
               </div>
               <OrderBook
                  side={'left'}
                  data={dataBids}
                  rowBackgroundColor={rowBackgroundColorBids}
                  maxVolume={maxVolume}
                  orderBookEntry={orderBookEntryBids}
                  onSelect={onSelectBids}
               />
            </div>
         </>
      );
   };
}
