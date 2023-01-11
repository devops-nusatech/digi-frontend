import { CommonError } from '../../types';
import { WalletsAction } from './actions';
import {
    SET_MOBILE_WALLET_UI,
    WALLETS_ADDRESS_DATA,
    WALLETS_ADDRESS_DATA_WS,
    WALLETS_ADDRESS_ERROR,
    WALLETS_ADDRESS_FETCH,
    WALLETS_DATA,
    WALLETS_DATA_WS,
    WALLETS_ERROR,
    WALLETS_FETCH,
    WALLETS_RESET,
    WALLETS_TRANSFER_FETCH,
    WALLETS_TRANSFER_DATA,
    WALLETS_TRANSFER_ERROR,
    WALLETS_TRANSFER_SUCCESS,
    WALLETS_WITHDRAW_CCY_DATA,
    WALLETS_WITHDRAW_CCY_ERROR,
    WALLETS_WITHDRAW_CCY_FETCH,
} from './constants';
import { Wallet, WalletAddress } from './types';

export interface WalletsState {
    wallets: {
        list: Wallet[];
        generateAddressLoading?: boolean;
        loading: boolean;
        withdrawSuccess: boolean;
        tranferSuccess: boolean;
        error?: CommonError;
        mobileWalletChosen: string;
        timestamp?: number;
    };
}

export const initialWalletsState: WalletsState = {
    wallets: {
        list: [],
        generateAddressLoading: false,
        loading: false,
        withdrawSuccess: false,
        tranferSuccess: false,
        mobileWalletChosen: '',
    },
};

const getUpdatedWalletsList = (list: Wallet[], payload: WalletAddress) => {
   if (list.length && payload.currencies?.length) {
       return list.map(wallet => {
           if (payload.currencies.includes(wallet.currency)) {
               let depositAddresses: WalletAddress[] = [];
               let depositAddress: WalletAddress;
               const walletDepositAddressExist = wallet.deposit_addresses?.findIndex(item => item.blockchain_key === payload.blockchain_key) !== -1;

               if (payload.blockchain_key && !walletDepositAddressExist) {
                   const newDepositAddress = [{
                       address: payload.address,
                       currencies: payload.currencies,
                       blockchain_key: payload.blockchain_key,
                   }];

                   depositAddresses = [ ...(wallet.deposit_addresses !== undefined ? wallet.deposit_addresses : []), ...newDepositAddress];
               } else if (wallet.deposit_addresses && wallet.deposit_addresses.length && walletDepositAddressExist) {
                   depositAddresses = wallet.deposit_addresses.map(address => {
                       if (address.blockchain_key === payload.blockchain_key) {
                           depositAddress = {
                               address: payload.address,
                               currencies: payload.currencies,
                               blockchain_key: payload.blockchain_key,
                           }

                           if (payload.state) {
                               depositAddress = {
                                   ...depositAddress,
                                   state: payload.state,
                               };
                           }

                           return depositAddress;
                       }

                       return address;
                   });
               } else {
                   depositAddresses = [{
                       address: payload.address,
                       currencies: payload.currencies,
                       blockchain_key: payload.blockchain_key,
                   }];
               }

               return {
                   ...wallet,
                   deposit_addresses: depositAddresses,
               };
           }

           return wallet;
       });
   }

   return list;
};

const updatedList = (wallets: Wallet[], balances: any) => {
   return wallets.map(wallet => {
       let updatedWallet = wallet;
       const payloadCurrencies = Object.keys(balances);

       if (payloadCurrencies.length) {
           payloadCurrencies.some(value => {
               const targetWallet = balances[value];

               if (value === wallet.currency && (targetWallet && targetWallet[2] === wallet.account_type)) {
                   updatedWallet = {
                       ...updatedWallet,
                       balance: targetWallet[0] ? targetWallet[0] : updatedWallet.balance,
                       locked: targetWallet[1] ? targetWallet[1] : updatedWallet.locked,
                   };

                   return true;
               }

               return false;
           });
       }

       return updatedWallet;
   });
};

const walletsListReducer = (state: WalletsState['wallets'], action: WalletsAction): WalletsState['wallets'] => {
    switch (action.type) {
        case WALLETS_ADDRESS_FETCH:
            return {
                ...state,
                generateAddressLoading: true,
                timestamp: Math.floor(Date.now() / 1000)
            }
        case WALLETS_FETCH:
            return {
                ...state,
                loading: true,
                timestamp: Math.floor(Date.now() / 1000),
            };
        case WALLETS_WITHDRAW_CCY_FETCH:
            return {
                ...state,
                loading: true,
                withdrawSuccess: false,
            };
        case WALLETS_DATA: {
            return {
                ...state,
                loading: false,
                list: action.payload,
            };
        }
        case WALLETS_DATA_WS: {

            return {
                ...state,
                loading: false,
                list: updatedList(state.list, action.payload.balances),
            };
        }
        case WALLETS_ADDRESS_DATA: {
            return {
                ...state,
                list: getUpdatedWalletsList(state.list, action.payload),
                generateAddressLoading: false,
            };
        }
        case WALLETS_WITHDRAW_CCY_DATA:
            return {
                ...state,
                loading: false,
                withdrawSuccess: true,
            };
        case WALLETS_ADDRESS_DATA_WS: {
            return {
                ...state,
                list: getUpdatedWalletsList(state.list, action.payload),
                generateAddressLoading: false,
            };
        }
        case WALLETS_WITHDRAW_CCY_ERROR:
            return {
                ...state,
                loading: false,
                withdrawSuccess: false,
                error: action.error,
            };
        case WALLETS_ADDRESS_ERROR:
            return {
                ...state,
                generateAddressLoading: false,
                error: action.error,
            };
        case WALLETS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

         case WALLETS_TRANSFER_FETCH:
         return {
               ...state,
               loading: true,
               tranferSuccess: false,
         };
         case WALLETS_TRANSFER_DATA:
            return {
                ...state,
                loading: false,
                tranferSuccess: true,
            };
         case WALLETS_TRANSFER_ERROR:
         return {
               ...state,
               loading: false,
               tranferSuccess: false,
               error: action.error,
         };
         case WALLETS_TRANSFER_SUCCESS:
         return {
               ...state,
               loading: false,
               tranferSuccess: true,
         };

        case SET_MOBILE_WALLET_UI:
            return { ...state, mobileWalletChosen: action.payload };
        default:
            return state;
    }
};

export const walletsReducer = (state = initialWalletsState, action: WalletsAction): WalletsState => {
    switch (action.type) {
        case WALLETS_FETCH:
        case WALLETS_DATA:
        case WALLETS_DATA_WS:
        case WALLETS_ERROR:
        case WALLETS_ADDRESS_FETCH:
        case WALLETS_ADDRESS_DATA:
        case WALLETS_ADDRESS_DATA_WS:
        case WALLETS_ADDRESS_ERROR:
        case WALLETS_WITHDRAW_CCY_FETCH:
        case WALLETS_WITHDRAW_CCY_DATA:
        case SET_MOBILE_WALLET_UI:
        case WALLETS_WITHDRAW_CCY_ERROR:
        case WALLETS_TRANSFER_ERROR:
         case WALLETS_TRANSFER_FETCH:
        case WALLETS_TRANSFER_DATA:
        case WALLETS_TRANSFER_SUCCESS:
            const walletsListState = { ...state.wallets };

            return {
                ...state,
                wallets: walletsListReducer(walletsListState, action),
            };
        case WALLETS_RESET:
            return {
                ...state,
                wallets: {
                    list: [],
                    loading: false,
                    generateAddressLoading: false,
                    withdrawSuccess: false,
                    tranferSuccess: false,
                    mobileWalletChosen: '',
                },
            };
        default:
            return state;
    }
};
