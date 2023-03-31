import { ComponentType } from 'react';
import { RouteProps as RProps } from 'react-router-dom';
import { RouterProps } from 'react-router';
import { IntlProps } from 'index';
import {
   configsFetch,
   groupFetch,
   logoutFetch,
   Market,
   memberLevelsFetch,
   toggleChartRebuild,
   User,
   userFetch,
   walletsReset,
} from 'modules';
import { rangerConnectFetch, RangerState } from 'modules/public/ranger';
import {
   CustomizationDataInterface,
   customizationFetch,
} from 'modules/public/customization';

export interface RouteProps extends RProps {
   component: ComponentType<any>;
   loading?: boolean;
   isLogged?: boolean;
}

export interface ReduxProps {
   colorTheme: string;
   configsLoading: boolean;
   currentMarket?: Market;
   customization?: CustomizationDataInterface;
   isLoggedIn: boolean;
   isMobileDevice: boolean;
   platformAccessStatus: string;
   rangerState: RangerState;
   user: User;
   userLoading?: boolean;
}

export interface DispatchProps {
   fetchConfigs: typeof configsFetch;
   userFetch: typeof userFetch;
   fetchMemberLevel: typeof memberLevelsFetch;
   fetchCustomization: typeof customizationFetch;
   logout: typeof logoutFetch;
   rangerConnect: typeof rangerConnectFetch;
   groupFetch: typeof groupFetch;
   walletsReset: typeof walletsReset;
}

export interface LocationProps extends RouterProps {
   location: {
      pathname: string;
   };
}

export interface LayoutState {
   isShownExpSessionModal: boolean;
}

export interface OwnProps {
   toggleChartRebuild: typeof toggleChartRebuild;
}

export type LayoutProps = ReduxProps &
   DispatchProps &
   LocationProps &
   IntlProps &
   OwnProps;
