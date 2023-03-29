import { combineReducers } from 'redux';
import { airdropsReducer } from './public/airdrops';
import { alertReducer } from './public/alert';
import { blockchainsReducer } from './public/blockchains';
import { blocklistAccessReducer } from './public/blocklistAccess';
import { configsReducer } from './public/configs';
import { currenciesReducer } from './public/currencies';
import { customizationReducer } from './public/customization';
import { errorHandlerReducer } from './public/errorHandler';
import { changeColorThemeReducer } from './public/globalSettings';
import { gridLayoutReducer } from './public/gridLayout';
import { changeLanguageReducer } from './public/i18n';
import { klineReducer } from './public/kline';
import { marketsReducer } from './public/markets';
import { memberLevelsReducer } from './public/memberLevels';
import { membershipsReducer } from './public/memberships';
import { newsReducer } from './public/news';
import { news2Reducer } from './public/news2';
import { depthReducer, incrementDepthReducer, orderBookReducer } from './public/orderBook';
import { rangerReducer } from './public/ranger/reducer';
import { recentTradesReducer } from './public/recentTrades';
import { tradingFeesReducer } from './public/tradingFees';
import { withdrawLimitsReducer } from './public/withdrawLimits';
import { apiKeysReducer } from './user/apiKeys';
import { authReducer } from './user/auth';
import { beneficiariesReducer } from './user/beneficiaries';
import { getGeetestCaptchaReducer } from './user/captcha';
import { customizationUpdateReducer } from './user/customization';
import { documentationReducer } from './user/documentation';
import { sendEmailVerificationReducer } from './user/emailVerification';
import { groupMemberReducer } from './user/groupMember';
import { historyReducer } from './user/history';
import {
   addressesReducer,
   documentsReducer,
   identityReducer,
   labelReducer,
   phoneReducer,
} from './user/kyc';
import { openOrdersReducer } from './user/openOrders';
import { ordersReducer } from './user/orders';
import { ordersHistoryReducer } from './user/ordersHistory';
import { passwordReducer } from './user/password';
import { profileReducer } from './user/profile';
import { tierReducer } from './user/tier';
import { transactionsReducer } from './user/transactions';
import { transferReducer } from './user/transfers';
import { userActivityReducer } from './user/userActivity';
import { walletsReducer } from './user/wallets';
import { withdrawLimitReducer } from './user/withdrawLimit';

export const publicReducer = combineReducers({
   airdrops: airdropsReducer,
   alerts: alertReducer,
   blockchains: blockchainsReducer,
   blocklistAccess: blocklistAccessReducer,
   colorTheme: changeColorThemeReducer,
   configs: configsReducer,
   currencies: currenciesReducer,
   customization: customizationReducer,
   errorHandler: errorHandlerReducer,
   rgl: gridLayoutReducer,
   i18n: changeLanguageReducer,
   kline: klineReducer,
   markets: marketsReducer,
   memberLevels: memberLevelsReducer,
   memberships: membershipsReducer,
   news: newsReducer,
   news2: news2Reducer,
   orderBook: orderBookReducer,
   depth: depthReducer,
   incrementDepth: incrementDepthReducer,
   ranger: rangerReducer,
   recentTrades: recentTradesReducer,
   tradingFees: tradingFeesReducer,
   withdrawLimits: withdrawLimitsReducer,
});

export const userReducer = combineReducers({
   addresses: addressesReducer,
   apiKeys: apiKeysReducer,
   auth: authReducer,
   beneficiaries: beneficiariesReducer,
   captcha: getGeetestCaptchaReducer,
   customizationUpdate: customizationUpdateReducer,
   documentation: documentationReducer,
   history: historyReducer,
   documents: documentsReducer,
   identity: identityReducer,
   label: labelReducer,
   phone: phoneReducer,
   openOrders: openOrdersReducer,
   orders: ordersReducer,
   ordersHistory: ordersHistoryReducer,
   password: passwordReducer,
   profile: profileReducer,
   tier: tierReducer,
   groupMember: groupMemberReducer,
   transactions: transactionsReducer,
   transfer: transferReducer,
   sendEmailVerification: sendEmailVerificationReducer,
   userActivity: userActivityReducer,
   wallets: walletsReducer,
   withdrawLimit: withdrawLimitReducer,
});
