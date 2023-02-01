import React, {
   ChangeEvent,
   FC,
   Fragment,
   useCallback,
   useEffect,
   useState
} from 'react';
import {
   useDispatch,
   useSelector
} from 'react-redux';
import {
   Combobox,
   Transition
} from '@headlessui/react';
import {
   Wallet,
   selectSonic,
   selectWallets,
   walletsFetch
} from 'modules';
import {
   Label,
   Image,
   Decimal
} from 'components';
import { renderCurrencyIcon } from 'helpers';

type ComboboxCurrencyState = {
   currency: string;
   search: string;
   walletsData: Wallet[];
}

interface ComboboxCurrencyProps {
   /**
      * onChange(currency: string): void
      * @param currency string
      */
   onChange: (currency: string) => void;
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
   displayValue?: 'currency' | 'name';
   /**
      * defaultValue
      * @default null
      */
   defaultValue?: string;
}

export const ComboboxCurrency: FC<ComboboxCurrencyProps> = ({
   onChange,
   filterNetwork,
   withFiat,
   displayValue,
   defaultValue,
}) => {
   const dispatch = useDispatch();
   const sonic = useSelector(selectSonic);
   const wallets = useSelector(selectWallets);

   const [state, setState] = useState<ComboboxCurrencyState>({
      walletsData: wallets,
      currency: defaultValue?.length ? defaultValue : '',
      search: '',
   });
   const { walletsData, currency, search } = state;

   useEffect(() => {
      handleChangeCurrency(defaultValue?.length ? defaultValue : wallets.find(wallet => wallet.currency === sonic.peatio_platform_currency)?.currency || wallets[0]?.currency)
   }, []);

   useEffect(() => {
      if (wallets.length < 1) {
         dispatch(walletsFetch());
      }
      if (walletsData.length < 1) {
         handleChangeCurrency(wallets.find(wallet => wallet.currency === sonic.peatio_platform_currency)?.currency || wallets[0]?.currency)
      }
   }, [wallets, dispatch]);

   const handleChangeCurrency = useCallback((currency: string) => {
      setState({
         ...state,
         currency,
         ...(walletsData.length < 1 && { walletsData: wallets })
      });
      onChange(currency);
   }, [wallets, onChange]);

   const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => setState({
      ...state,
      search: e.target.value
   });

   const networkAvailable = walletsData.filter(wallet => wallet.networks.length && wallet.networks.find(e => e.blockchain_key !== null));
   const data = filterNetwork ? networkAvailable : walletsData;
   const filteredCurrency = () => {
      return search === ''
         ? data
         : data.filter(wallet =>
            wallet.name
               .toLowerCase()
               .replace(/\s+/g, '')
               .includes(search.toLowerCase().replace(/\s+/g, ''))
            ||
            wallet.currency
               .toLowerCase()
               .replace(/\s+/g, '')
               .includes(search.toLowerCase().replace(/\s+/g, ''))
         );
   }

   const renderDisplayValue = (currency: string): string => {
      return displayValue === 'currency'
         ? currency?.toUpperCase()
         : filteredCurrency().find(e => e.currency === currency)?.name
         || 'Loading...'
   }

   return (
      <Combobox
         value={currency}
         onChange={handleChangeCurrency}
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
                     filteredCurrency().map(wallet => (
                        <Combobox.Option
                           key={wallet.currency}
                           className={({ active }) => `relative ${active ? 'bg-neutral7 dark:bg-neutral2' : ''} px-3.5 py-2.5 leading-[1.4] font-medium transition-all duration-200`}
                           value={wallet.currency}
                        >
                           {({ selected }) => (
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 overflow-hidden pointer-events-none">
                                       <Image
                                          src={renderCurrencyIcon(wallet.currency, wallet?.iconUrl)}
                                          className={`w-full ${renderCurrencyIcon(wallet?.currency, wallet?.iconUrl)?.includes('http') ? 'object-cover bg-neutral8 polygon' : ''}`}
                                          alt={wallet.name}
                                          title={wallet.name}
                                          height={40}
                                          width={40}
                                       />
                                    </div>
                                    <div className={`block truncate ${selected ? 'text-primary1 font-medium' : ''}`}>
                                       {wallet?.name} <span className="text-neutral4">{wallet.currency.toUpperCase()}</span>
                                    </div>
                                 </div>
                                 <div className="text-neutral4">
                                    {Decimal.format(wallet.balance || 0, wallet.fixed, ',')} {wallet.currency.toUpperCase()}
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

ComboboxCurrency.defaultProps = {
   filterNetwork: true,
   displayValue: 'currency',
}
