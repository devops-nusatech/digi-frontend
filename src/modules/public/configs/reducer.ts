import { CommonError, CommonState } from '../../types';
import { ConfigsAction } from './actions';
import {
    CONFIGS_DATA,
    CONFIGS_ERROR,
    CONFIGS_FETCH,
    SONIC_DATA,
    SONIC_ERROR,
    SONIC_FETCH,
} from './constants';
import { Configs, Sonic } from './types';

export interface ConfigsState extends CommonState {
    data: Configs;
    sonic: Sonic;
    loading: boolean;
    success: boolean;
    error?: CommonError;
}

const defaultConfigs: Configs = {
    captcha_type: 'none',
    password_min_entropy: 0,
};
const defaultSonic: Sonic = {
   allowedRoles: [],
   aml: '',
   balancesFetchInterval: '',
   captchaLogin: '',
   captcha_id: '',
   captcha_type: 'none',
   devMode: '',
   finex: '',
   gaTrackerKey: '',
   incrementalOrderBook: '',
   isDraggable: '',
   isResizable: '',
   kycSteps: [],
   labelSwitcher: [],
   languages: [],
   minutesBeforeWarningMessage: '',
   minutesUntilAutoLogout: '',
   msAlertDisplayTime: '',
   passwordEntropyStep: '',
   password_min_entropy: '',
   peatio_platform_currency: '',
   plugins: [],
   rangerReconnectPeriod: '',
   roleTypes: [],
   sentryEnabled: '',
   sessionCheckInterval: '',
   showLanding: '',
   tablePageLimit: '',
   uploadMaxSize: 0,
   uploadMinSize: 0,
   usernameEnabled: '',
   withCredentials: '',
   wizard_step: ''
 }

export const initialConfigsState: ConfigsState = {
    loading: false,
    success: false,
    data: defaultConfigs,
    sonic: defaultSonic
};

export const configsReducer = (state = initialConfigsState, action: ConfigsAction) => {
    switch (action.type) {
        case CONFIGS_FETCH:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case CONFIGS_DATA:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload,
            };
        case CONFIGS_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        case SONIC_FETCH:
            return {
                ...state,
                loading: true,
                success: false,
            };
        case SONIC_DATA:
            return {
                ...state,
                loading: false,
                success: true,
                sonic: action.payload,
            };
        case SONIC_ERROR:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};
