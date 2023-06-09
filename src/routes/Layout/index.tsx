import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { minutesUntilAutoLogout, sessionCheckInterval, showLanding } from 'api';
import { ModalExpiredSession, Loader } from 'components';
import { Redirect as RedirectMobile } from 'mobile';
import { WalletsFetch } from 'containers';
import { toggleColorTheme } from 'helpers';
import {
   configsFetch,
   logoutFetch,
   RootState,
   selectConfigsLoading,
   selectCurrentColorTheme,
   selectCurrentMarket,
   selectMobileDeviceState,
   selectPlatformAccessStatus,
   selectUserFetching,
   selectUserInfo,
   selectUserLoggedIn,
   toggleChartRebuild,
   userFetch,
   walletsReset,
   groupFetch,
   memberLevelsFetch,
   selectMarkets,
} from 'modules';
import {
   CustomizationDataInterface,
   customizationFetch,
   selectCustomizationData,
} from 'modules/public/customization';
import { rangerConnectFetch, selectRanger } from 'modules/public/ranger';
import {
   Home,
   Login,
   Register,
   ForgotPassword,
   MagicLink,
   MaintenanceScreen,
   RestrictedScreen,
   ChangeForgotPassword,
   EmailVerification,
   WalletOverview,
   WalletMargin,
   WalletFIatAndSpot,
   BuyCrypto,
   Profile,
   Activity,
   Referrals,
   ApiKeys,
   SessionsHistory,
   TwoFA,
   ChangePassword,
   Market,
   LearnCrypto,
   WalletDetails,
   SellCrypto,
   Trading,
   TradingChart,
   Transfer,
   WalletTrade,
   Withdrawal,
   Deposit,
   FAQ,
   Beneficiaries,
   WalletFinance,
   Exchange,
   WalletOrder,
   Geetest,
   Notifications,
   Membership,
   JoinAffiliate,
   Tier,
} from 'screens';
import { ApiDocs } from 'screens/ApiDocs';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import { DispatchProps, LayoutProps, LayoutState, ReduxProps } from '../types';
import { DEFAULT_MARKET } from '../../constants';

const STORE_KEY = 'lastAction';

class LayoutComponent extends React.Component<LayoutProps, LayoutState> {
   public static eventsListen = [
      'click',
      'keydown',
      'scroll',
      'resize',
      'mousemove',
      'TabSelect',
      'TabHide',
   ];

   public timer;

   public walletsFetchInterval;

   constructor(props: LayoutProps) {
      super(props);
      this.initListener();

      this.state = {
         isShownExpSessionModal: false,
      };
   }

   public componentDidMount() {
      const {
         history,
         isLoggedIn,
         location,
         platformAccessStatus,
         rangerState,
      } = this.props;

      this.props.fetchConfigs();
      if (
         !(
            location.pathname.includes('/magic-link') ||
            location.pathname.includes('/404') ||
            location.pathname.includes('/500')
         )
      ) {
         switch (platformAccessStatus) {
            case 'restricted':
               history.replace('/404');
               break;
            case 'maintenance':
               history.replace('/500');
               break;
            default:
               const token = localStorage.getItem('csrfToken');

               if (token) {
                  this.props.userFetch();
                  this.props.groupFetch();
                  this.props.fetchMemberLevel();
                  this.initInterval();
                  this.checkSession();
               }
         }
      }

      if (!rangerState.connected) {
         this.props.rangerConnect({ withAuth: isLoggedIn });
      }
   }

   public componentWillReceiveProps(nextProps: LayoutProps) {
      if (
         !(
            nextProps.location.pathname.includes('/magic-link') ||
            nextProps.location.pathname.includes('/404') ||
            nextProps.location.pathname.includes('/500')
         ) ||
         this.props.platformAccessStatus !== nextProps.platformAccessStatus
      ) {
         switch (nextProps.platformAccessStatus) {
            case 'restricted':
               this.props.history.replace('/404');
               break;
            case 'maintenance':
               this.props.history.replace('/500');
               break;
            default:
               break;
         }
      }

      if (!this.props.user?.email && nextProps.user?.email) {
         this.props.userFetch();
         this.props.groupFetch();
         this.props.fetchMemberLevel();
      }
   }

   public componentDidUpdate(prevProps: LayoutProps) {
      const {
         customization,
         isLoggedIn,
         rangerState,
         userLoading,
         currentMarket,
         markets,
      } = this.props;

      if (!isLoggedIn && prevProps.isLoggedIn && !userLoading) {
         this.props.walletsReset();

         if (!this.props.location.pathname.includes('/trading')) {
            this.props.history.push(
               `/trading/${
                  currentMarket
                     ? currentMarket?.id
                     : markets.length > 0
                     ? markets[0]?.id
                     : DEFAULT_MARKET.id
               }`
            );
         }
      }

      if (customization && customization !== prevProps.customization) {
         this.handleApplyCustomization(customization);
      }

      if (
         isLoggedIn !== prevProps.isLoggedIn ||
         (!rangerState.connected && prevProps.rangerState.connected)
      ) {
         this.props.rangerConnect({ withAuth: isLoggedIn });
      }
   }

   public componentWillUnmount() {
      for (const type of LayoutComponent.eventsListen) {
         document.body.removeEventListener(type, this.reset);
      }

      clearInterval(this.timer);
      clearInterval(this.walletsFetchInterval);
   }

   public translate = (key: string) =>
      this.props.intl.formatMessage({ id: key });

   public render() {
      const {
         colorTheme,
         isLoggedIn,
         isMobileDevice,
         userLoading,
         configsLoading,
         platformAccessStatus,
         currentMarket,
         markets,
      } = this.props;
      const { isShownExpSessionModal } = this.state;
      toggleColorTheme(colorTheme);

      if (configsLoading && !platformAccessStatus.length) {
         return <Loader />;
      }

      if (isMobileDevice) {
         return (
            <main className="flex grow flex-col">
               <Switch>
                  {showLanding() && (
                     <Route
                        exact
                        path="/"
                        component={RedirectMobile}
                     />
                  )}
                  <Route path="**">
                     <Redirect to="/" />
                  </Route>
               </Switch>
               {isLoggedIn && <WalletsFetch />}
               {isShownExpSessionModal &&
                  this.handleRenderExpiredSessionModal()}
            </main>
         );
      }

      return (
         <>
            <Switch>
               <Route
                  exact
                  path="/magic-link"
                  component={MagicLink}
               />
               <PublicRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/login"
                  component={Login}
               />
               <PublicRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/register"
                  component={Register}
               />
               <PublicRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/forgot-password"
                  component={ForgotPassword}
               />
               <PublicRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/accounts/password_reset"
                  component={ChangeForgotPassword}
               />
               <PublicRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/email-verification"
                  component={EmailVerification}
               />
               <Route
                  path="/faq"
                  component={FAQ}
               />
               <Route
                  path="/404"
                  component={RestrictedScreen}
               />
               <Route
                  path="/500"
                  component={MaintenanceScreen}
               />
               <Route
                  exact
                  path="/trading/:market?"
                  component={Trading}
               />
               <Route
                  path="/chart/:market?"
                  component={TradingChart}
               />
               <Route
                  path="/markets"
                  component={Market}
               />
               <Route
                  path="/learn-crypto"
                  component={LearnCrypto}
               />
               <Route
                  path="/deposit"
                  component={Deposit}
               />
               <Route
                  path="/exchange"
                  component={Exchange}
               />
               <Route
                  path="/geetest"
                  component={Geetest}
               />
               <Route
                  path="/membership"
                  component={Membership}
               />
               <Route
                  path="/join-affiliate"
                  component={JoinAffiliate}
               />
               {showLanding() && (
                  <Route
                     exact
                     path="/"
                     component={Home}
                  />
               )}
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/orders"
                  component={WalletOrder}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/trades"
                  component={WalletTrade}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/profile"
                  component={Profile}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/referrals"
                  component={Referrals}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/api-keys"
                  component={ApiKeys}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/beneficiaries"
                  component={Beneficiaries}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/sessions-history"
                  component={SessionsHistory}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/2fa"
                  component={TwoFA}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/change-password"
                  component={ChangePassword}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/tier"
                  component={Tier}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/docs"
                  component={ApiDocs}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/wallets"
                  component={WalletOverview}>
                  <Switch>
                     <PrivateRoute
                        loading={userLoading}
                        isLogged={isLoggedIn}
                        exact
                        path="/wallets"
                        component={WalletOverview}
                     />
                     <PrivateRoute
                        loading={userLoading}
                        isLogged={isLoggedIn}
                        path="/wallets/deposit"
                        component={Deposit}
                     />
                     <PrivateRoute
                        loading={userLoading}
                        isLogged={isLoggedIn}
                        path="/wallets/withdraw"
                        component={Withdrawal}
                     />
                     <PrivateRoute
                        loading={userLoading}
                        isLogged={isLoggedIn}
                        path="/wallets/transfer"
                        component={Transfer}
                     />
                     <PrivateRoute
                        loading={userLoading}
                        isLogged={isLoggedIn}
                        path="/wallets/finances"
                        component={WalletFinance}
                     />
                     <PrivateRoute
                        loading={userLoading}
                        isLogged={isLoggedIn}
                        path="/wallets/:id"
                        component={WalletDetails}
                     />
                  </Switch>
               </PrivateRoute>
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/notifications"
                  component={Notifications}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/withdraw"
                  component={Withdrawal}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/wallet-margin"
                  component={WalletMargin}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/fiat-and-spot"
                  component={WalletFIatAndSpot}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/buy-crypto"
                  component={BuyCrypto}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/sell-crypto"
                  component={SellCrypto}
               />
               <PrivateRoute
                  loading={userLoading}
                  isLogged={isLoggedIn}
                  path="/activity"
                  component={Activity}
               />
               <Route path="**">
                  <Redirect
                     to={`/trading/${
                        currentMarket
                           ? currentMarket?.id
                           : markets
                           ? markets[0]?.id
                           : DEFAULT_MARKET.id
                     }`}
                  />
               </Route>
            </Switch>
            {isLoggedIn && <WalletsFetch />}
            {isShownExpSessionModal && this.handleRenderExpiredSessionModal()}
         </>
      );
   }

   private getLastAction = () => {
      if (localStorage.getItem(STORE_KEY) !== null) {
         return parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
      }

      return 0;
   };

   private setLastAction = (lastAction: number) =>
      localStorage.setItem(STORE_KEY, lastAction.toString());

   private initListener = () => {
      this.reset();
      for (const type of LayoutComponent.eventsListen) {
         document.body.addEventListener(type, this.reset);
      }
   };

   private reset = () => this.setLastAction(Date.now());

   private initInterval = () => {
      this.timer = setInterval(() => {
         this.checkSession();
      }, parseFloat(sessionCheckInterval()));
   };

   private checkSession = () => {
      const { user } = this.props;
      const now = Date.now();
      const timeleft =
         this.getLastAction() +
         parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
      const diff = timeleft - now;
      const isTimeout = diff < 0;
      if (isTimeout && user.email) {
         if (user.state === 'active') {
            this.handleChangeExpSessionModalState();
         }

         this.props.logout();
      }
   };

   private handleSubmitExpSessionModal = () => {
      this.handleChangeExpSessionModalState();
      this.props.history.push('/login');
   };

   private handleRenderExpiredSessionModal = () => (
      <ModalExpiredSession
         title={this.translate('page.modal.expired.title')}
         buttonLabel={this.translate('page.modal.expired.submit')}
         show={this.state.isShownExpSessionModal}
         close={this.handleChangeExpSessionModalState}
         onClick={this.handleSubmitExpSessionModal}
      />
   );

   private handleChangeExpSessionModalState = () => {
      this.setState({
         isShownExpSessionModal: !this.state.isShownExpSessionModal,
      });
   };

   private handleApplyCustomization = (
      customization: CustomizationDataInterface
   ) => {
      const rootElement = document.documentElement;
      const parsedSettings =
         customization && customization.settings
            ? JSON.parse(customization.settings)
            : null;

      if (rootElement && parsedSettings && parsedSettings.theme_colors) {
         parsedSettings.theme_colors.reduce((result, item) => {
            const newItemColor = item.value;

            if (newItemColor) {
               rootElement.style.setProperty(item.key, item.value);
            }

            return result;
         }, {});

         this.props.toggleChartRebuild();
      }
   };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   colorTheme: selectCurrentColorTheme(state),
   configsLoading: selectConfigsLoading(state),
   currentMarket: selectCurrentMarket(state),
   customization: selectCustomizationData(state),
   isLoggedIn: selectUserLoggedIn(state),
   isMobileDevice: selectMobileDeviceState(state),
   platformAccessStatus: selectPlatformAccessStatus(state),
   rangerState: selectRanger(state),
   user: selectUserInfo(state),
   userLoading: selectUserFetching(state),
   markets: selectMarkets(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   fetchConfigs: () => dispatch(configsFetch()),
   userFetch: () => dispatch(userFetch()),
   fetchMemberLevel: () => dispatch(memberLevelsFetch()),
   fetchCustomization: () => dispatch(customizationFetch()),
   logout: () => dispatch(logoutFetch()),
   toggleChartRebuild: () => dispatch(toggleChartRebuild()),
   rangerConnect: payload => dispatch(rangerConnectFetch(payload)),
   groupFetch: () => dispatch(groupFetch()),
   walletsReset: () => dispatch(walletsReset()),
});

export const Layout = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(LayoutComponent) as React.FunctionComponent;
