import React, {
   ChangeEvent,
   FC,
   Fragment,
   useCallback,
   useEffect,
   useState
} from 'react';
import {
   Combobox,
   Transition
} from '@headlessui/react';
import {
   Label,
   Image,
} from 'components';
import { renderCurrencyIcon } from 'helpers';
import { useMarket } from 'hooks';

type ComboboxMarketState = {
   market: string;
   search: string;
   markets: any[];
}

interface ComboboxMarketProps {
   /**
      * onChange(market: string): void
      * @param market string
      */
   onChange: (market: string) => void;
   /**
      * if true will return all wallets that have a network, if false will return all wallets
      * @default 'true'
      */
   filterNetwork?: boolean;
   /**
      * withFiat: if true will return all wallets, if false will return all wallets without fiat
      * @default 'false'
      */
   withFiat?: boolean;
   /**
      * displayValue
      * @default 'currency'
      */
   displayValue?: 'market' | 'name';
   /**
      * defaultValue
      * @default
      */
   defaultValue?: string;
}

export const ComboboxMarket: FC<ComboboxMarketProps> = ({
   onChange,
   filterNetwork,
   withFiat,
   displayValue,
   defaultValue,
}) => {
   const {
      marketsData
   } = useMarket();

   const [state, setState] = useState<ComboboxMarketState>({
      markets: marketsData,
      market: defaultValue?.length ? defaultValue : '',
      search: '',
   });
   const { markets, market, search } = state;

   useEffect(() => {
      handleChangeMarket(defaultValue?.length ? defaultValue : marketsData[0]?.id)
   }, []);

   useEffect(() => {
      if (markets.length < 1) {
         handleChangeMarket(marketsData[0]?.id)
      }
   }, [marketsData]);

   const handleChangeMarket = useCallback((market: string) => {
      setState({
         ...state,
         market,
         ...(markets.length < 1 && { markets: marketsData })
      });
      onChange(market);
      console.log('e :>> ', market);
   }, [marketsData, onChange]);

   const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setState({
      ...state,
      search: e.target.value
   });

   const filteredCurrency = () => {
      return search === ''
         ? markets
         : markets.filter(market =>
            market.id
               .toLowerCase()
               .replace(/\s+/g, '')
               .includes(search.toLowerCase().replace(/\s+/g, ''))
            ||
            market.name
               .toLowerCase()
               .replace(/\s+/g, '')
               .includes(search.toLowerCase().replace(/\s+/g, ''))
         );
   }

   const renderDisplayValue = (market: string): string => {
      return displayValue !== 'market'
         ? market?.toUpperCase()
         : filteredCurrency().find(e => e.id === market)?.name
         || 'Loading...'
   }

   return (
      <Combobox
         value={market}
         onChange={handleChangeMarket}
      >
         <div className="relative">
            <Label label="Select currency" />
            <div className="relative mt-2.5">
               <Combobox.Input
                  className={({ open }) => `px-3.5 rounded-xl font-medium leading-12 outline-none border-2 ${open ? 'text-primary1 border-neutral4 dark:border-neutral4' : 'border-neutral6 dark:border-neutral3'} bg-none bg-transparent shadow-none transition ease-in-out duration-300 pr-12 h-12 w-full truncate`}
                  displayValue={renderDisplayValue}
                  onChange={handleChangeSearch}
                  onFocus={(e: { target: { select(): void } }) => e.target.select()}
               />
               <Combobox.Button className="group absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg className="h-5 w-5 fill-neutral4 group-hover:fill-neutral2 dark:group-hover:fill-neutral6 transition-colors duration-300">
                     <use xlinkHref="#icon-search" />
                  </svg>
               </Combobox.Button>
            </div>
            <Transition
               as={Fragment}
               enter="transition-all"
               enterFrom="opacity-0 scale-75 -translate-y-5"
               enterTo="opacity-100 scale-100 translate-y-0"
               leave="transition-transform duration-300"
               leaveFrom="opacity-100 scale-100 translate-y-0"
               leaveTo="opacity-0 scale-75 -translate-y-5"
            >
               <Combobox.Options className="absolute max-h-72 w-full overflow-auto z-[9] mt-0.5 rounded-xl outline-none bg-neutral8 dark:bg-neutral1 border-2 border-neutral6 dark:border-neutral3 shadow-dropdown-2 dark:shadow-dropdown-3">
                  {filteredCurrency().length === 0 && search !== '' ? (
                     <div className="px-3.5 py-2.5 leading-[1.4] transition-all duration-200">
                        Nothing found...
                     </div>
                  ) : (
                     filteredCurrency().map(market => (
                        <Combobox.Option
                           key={market.id}
                           className={({ active }) => `relative ${active ? 'bg-neutral7 dark:bg-neutral2' : ''} px-3.5 py-2.5 leading-[1.4] font-medium transition-all duration-200`}
                           value={market.id}
                        >
                           {({ selected }) => (
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 overflow-hidden pointer-events-none">
                                       <Image
                                          src={renderCurrencyIcon(market.base_unit, market?.iconUrl)}
                                          className={`w-full ${renderCurrencyIcon(market?.base_unit, market?.iconUrl)?.includes('http') ? 'object-cover bg-neutral8 polygon' : ''}`}
                                          alt={market.name}
                                          title={market.name}
                                          height={40}
                                          width={40}
                                       />
                                    </div>
                                    <div className={`block truncate ${selected ? 'text-primary1 font-medium' : ''}`}>
                                       {market?.name}
                                    </div>
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
   )
}

ComboboxMarket.defaultProps = {
   filterNetwork: true,
   displayValue: 'market',
}
