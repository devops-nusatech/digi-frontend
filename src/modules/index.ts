import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import { publicReducer, userReducer } from './app';
import { AirdropsState, rootAirdropsSaga } from './public/airdrops';
import { AlertState, rootHandleAlertSaga } from './public/alert';
import { BlockchainsState } from './public/blockchains';
import {
   BlocklistAccessState,
   rootBlocklistAccessSaga,
} from './public/blocklistAccess';
import { ConfigsState, rootConfigsSaga } from './public/configs';
import { CurrenciesState, rootCurrenciesSaga } from './public/currencies';
import {
   CustomizationState,
   rootCustomizationSaga,
} from './public/customization';
import { ErrorHandlerState, rootErrorHandlerSaga } from './public/errorHandler';
import { ColorThemeState } from './public/globalSettings';
import { GridLayoutState } from './public/gridLayout';
import { LanguageState } from './public/i18n';
import { KlineState, rootKlineFetchSaga } from './public/kline';
import { MarketsState, rootMarketsSaga } from './public/markets';
import { MemberLevelsState, rootMemberLevelsSaga } from './public/memberLevels';
import { MembershipsState } from './public/memberships';
import { NewsState, rootNewsSaga } from './public/news';
import { News2State, rootNews2Saga } from './public/news2';
import {
   DepthIncrementState,
   DepthState,
   OrderBookState,
   rootOrderBookSaga,
} from './public/orderBook';
import { RangerState } from './public/ranger/reducer';
import { RecentTradesState, rootRecentTradesSaga } from './public/recentTrades';
import { TradingFeesState } from './public/tradingFees';
import { WithdrawLimitsState } from './public/withdrawLimits';
import { ApiKeysState } from './user/apiKeys';
import { rootApiKeysSaga } from './user/apiKeys/sagas';
import { AuthState, rootAuthSaga } from './user/auth';
import {
   BeneficiariesState,
   rootBeneficiariesSaga,
} from './user/beneficiaries';
import { GeetestCaptchaState, rootGeetestCaptchaSaga } from './user/captcha';
import {
   CustomizationUpdateState,
   rootCustomizationUpdateSaga,
} from './user/customization';
import {
   DocumentationState,
   rootDocumentationSaga,
} from './user/documentation';
import {
   EmailVerificationState,
   rootEmailVerificationSaga,
} from './user/emailVerification';
import { GroupMemberState, rootMemberGroupSaga } from './user/groupMember';
import { HistoryState, rootHistorySaga } from './user/history';
import { AddressesState, rootSendAddressesSaga } from './user/kyc/addresses';
import { DocumentsState, rootSendDocumentsSaga } from './user/kyc/documents';
import { IdentityState, rootSendIdentitySaga } from './user/kyc/identity';
import { LabelState, rootLabelSaga } from './user/kyc/label';
import { PhoneState, rootSendCodeSaga } from './user/kyc/phone';
import { OpenOrdersState, rootOpenOrdersSaga } from './user/openOrders';
import { OrdersState, rootOrdersSaga } from './user/orders';
import {
   OrdersHistoryState,
   rootOrdersHistorySaga,
} from './user/ordersHistory';
import { PasswordState, rootPasswordSaga } from './user/password';
import { ProfileState, rootProfileSaga } from './user/profile';
import { TierState, rootTierSaga } from './user/tier';
import { TransactionsState, rootTransactionsSaga } from './user/transactions';
import { TransferState, rootTransferSaga } from './user/transfers';
import { rootUserActivitySaga, UserActivityState } from './user/userActivity';
import { rootWalletsSaga, WalletsState } from './user/wallets';
import {
   rootWithdrawLimitSaga,
   WithdrawLimitState,
} from './user/withdrawLimit';

export * from './public/airdrops';
export * from './public/alert';
export * from './public/blockchains';
export * from './public/blocklistAccess';
export * from './public/configs';
export * from './public/currencies';
export * from './public/customization';
export * from './public/errorHandler';
export * from './public/globalSettings';
export * from './public/i18n';
export * from './public/kline';
export * from './public/markets';
export * from './public/memberLevels';
export * from './public/memberships';
export * from './public/news';
export * from './public/news2';
export * from './public/orderBook';
export * from './public/recentTrades';
export * from './public/tradingFees';
export * from './public/withdrawLimits';
export * from './user/apiKeys';
export * from './user/auth';
export * from './user/beneficiaries';
export * from './user/captcha';
export * from './user/customization';
export * from './user/documentation';
export * from './user/emailVerification';
export * from './user/groupMember';
export * from './user/history';
export * from './user/kyc';
export * from './user/openOrders';
export * from './user/orders';
export * from './user/ordersHistory';
export * from './user/password';
export * from './user/profile';
export * from './user/tier';
export * from './user/transactions';
export * from './user/transfers';
export * from './user/userActivity';
export * from './user/wallets';
export * from './user/withdrawLimit';

export * from './types';

export interface RootState {
   public: {
      airdrops: AirdropsState;
      alerts: AlertState;
      blockchains: BlockchainsState;
      blocklistAccess: BlocklistAccessState;
      colorTheme: ColorThemeState;
      configs: ConfigsState;
      currencies: CurrenciesState;
      customization: CustomizationState;
      rgl: GridLayoutState;
      i18n: LanguageState;
      kline: KlineState;
      errorHandler: ErrorHandlerState;
      markets: MarketsState;
      memberLevels: MemberLevelsState;
      memberships: MembershipsState;
      news: NewsState;
      news2: News2State;
      orderBook: OrderBookState;
      ranger: RangerState;
      recentTrades: RecentTradesState;
      depth: DepthState;
      incrementDepth: DepthIncrementState;
      tradingFees: TradingFeesState;
      withdrawLimits: WithdrawLimitsState;
   };
   user: {
      apiKeys: ApiKeysState;
      auth: AuthState;
      beneficiaries: BeneficiariesState;
      captcha: GeetestCaptchaState;
      customizationUpdate: CustomizationUpdateState;
      documentation: DocumentationState;
      history: HistoryState;
      documents: DocumentsState;
      addresses: AddressesState;
      identity: IdentityState;
      label: LabelState;
      phone: PhoneState;
      openOrders: OpenOrdersState;
      orders: OrdersState;
      ordersHistory: OrdersHistoryState;
      password: PasswordState;
      profile: ProfileState;
      tier: TierState;
      groupMember: GroupMemberState;
      transactions: TransactionsState;
      transfer: TransferState;
      sendEmailVerification: EmailVerificationState;
      userActivity: UserActivityState;
      wallets: WalletsState;
      withdrawLimit: WithdrawLimitState;
   };
}

export const rootReducer = combineReducers({
   public: publicReducer,
   user: userReducer,
});

export function* rootSaga() {
   yield all([
      call(rootApiKeysSaga),
      call(rootAuthSaga),
      call(rootBeneficiariesSaga),
      call(rootBlocklistAccessSaga),
      call(rootConfigsSaga),
      call(rootCurrenciesSaga),
      call(rootCustomizationSaga),
      call(rootCustomizationUpdateSaga),
      call(rootDocumentationSaga),
      call(rootErrorHandlerSaga),
      call(rootEmailVerificationSaga),
      call(rootGeetestCaptchaSaga),
      call(rootAirdropsSaga),
      call(rootHandleAlertSaga),
      call(rootHistorySaga),
      call(rootKlineFetchSaga),
      call(rootLabelSaga),
      call(rootMarketsSaga),
      call(rootMemberLevelsSaga),
      call(rootNewsSaga),
      call(rootNews2Saga),
      call(rootOpenOrdersSaga),
      call(rootOrderBookSaga),
      call(rootOrdersHistorySaga),
      call(rootOrdersSaga),
      call(rootPasswordSaga),
      call(rootProfileSaga),
      call(rootTierSaga),
      call(rootMemberGroupSaga),
      call(rootTransactionsSaga),
      call(rootTransferSaga),
      call(rootRecentTradesSaga),
      call(rootSendCodeSaga),
      call(rootSendAddressesSaga),
      call(rootSendDocumentsSaga),
      call(rootSendIdentitySaga),
      call(rootUserActivitySaga),
      call(rootWalletsSaga),
      call(rootWithdrawLimitSaga),
   ]);
}
