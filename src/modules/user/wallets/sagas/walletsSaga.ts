import { call, put, select } from 'redux-saga/effects';
import { Balance, Currency, RootState, sendError, User } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { walletsData, walletsError, WalletsFetch } from '../actions';

const walletsOptions: RequestOptions = {
   apiVersion: 'peatio',
};

export const getUser = (state: RootState) => state.user.profile.userData.user;

export function* walletsSaga(action: WalletsFetch) {
   try {
      const accounts: Balance[] = yield call(API.get(walletsOptions), '/account/balances');
      const currencies: Currency[] = yield call(API.get(walletsOptions), '/public/currencies');
      const user: User = yield select(getUser);

      const accountsByCurrencies = currencies.map(currency => {
         let walletInfo;
         walletInfo = accounts.find(wallet => wallet.currency === currency.id);

         if (currency.status === 'hidden' && user.role !== 'admin' && user.role !== 'superadmin') {
            return null;
         }

         if (!walletInfo) {
            walletInfo = {
               currency: currency.id,
            };
         }

         return ({
            ...walletInfo,
            name: currency.name,
            networks: currency.networks,
            type: currency.type,
            fixed: currency.precision,
            iconUrl: currency.icon_url,
         });
      });
      const wallets = accountsByCurrencies.filter((item) => item && item.currency);
      yield put(walletsData(wallets));
   } catch (error) {
      yield put(sendError({
         error,
         processingType: 'alert',
         extraOptions: {
            actionError: walletsError,
         },
      }));
   }
}
