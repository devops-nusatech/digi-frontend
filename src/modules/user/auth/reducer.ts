import { CommonError } from '../../types';
import { AuthAction } from './actions';
import {
   AUTH_ENTROPY_PASSWORD_DATA,
   AUTH_ENTROPY_PASSWORD_ERROR,
   AUTH_ENTROPY_PASSWORD_FETCH,
   AUTH_LOGOUT_FETCH,
   AUTH_LOGOUT_DATA,
   AUTH_LOGOUT_FAILURE,
   AUTH_LOGIN_DATA,
   AUTH_LOGIN_ERROR,
   AUTH_LOGIN_FETCH,
   AUTH_LOGIN_REQUIRE_2FA,
   AUTH_LOGIN_REQUIRE_2FA_RESET,
   AUTH_REGISTER_DATA,
   AUTH_REGISTER_ERROR,
   AUTH_REGISTER_FETCH,
   AUTH_REGISTER_REQUIRE_VERIFICATION,
   AUTH_VERIFICATION_FETCH,
   AUTH_VERIFICATION_SUCCESS,
} from './constants';

export interface AuthState {
   require2FA?: boolean;
   requireVerification?: boolean;
   emailVerified: boolean;
   authError?: CommonError;
   registerError?: CommonError;
   current_password_entropy: number;
   loginLoading: boolean;
   registerLoading: boolean;
   logoutError?: CommonError;
   logoutLoading: boolean;
}

export const initialStateAuth: AuthState = {
   require2FA: false,
   requireVerification: false,
   emailVerified: false,
   current_password_entropy: 0,
   loginLoading: false,
   registerLoading: false,
   logoutLoading: false,
};

export const authReducer = (state = initialStateAuth, action: AuthAction) => {
   switch (action.type) {
      case AUTH_LOGIN_REQUIRE_2FA:
         return {
            ...state,
            require2FA: action.payload.require2fa,
         };
      case AUTH_LOGIN_REQUIRE_2FA_RESET:
         return {
            ...state,
            require2FA: false,
            loginLoading: false,
         };
      case AUTH_REGISTER_REQUIRE_VERIFICATION:
         return {
            ...state,
            requireVerification: action.payload.requireVerification,
         };
      case AUTH_VERIFICATION_FETCH:
         return { ...state, emailVerified: false };
      case AUTH_VERIFICATION_SUCCESS:
         return { ...state, emailVerified: true };
      case AUTH_LOGIN_FETCH:
         return { ...state, loginLoading: true };
      case AUTH_LOGIN_DATA:
         return { ...state, loginLoading: false };
      case AUTH_LOGIN_ERROR:
         return { ...state, authError: action.error, loginLoading: false };
      case AUTH_REGISTER_FETCH:
         return { ...state, registerLoading: true };
      case AUTH_REGISTER_DATA:
         return { ...state, registerLoading: false };
      case AUTH_REGISTER_ERROR:
         return {
            ...state,
            registerError: action.error,
            registerLoading: false,
         };
      case AUTH_LOGOUT_FETCH:
         return { ...state, logoutLoading: true };
      case AUTH_LOGOUT_DATA:
         return { ...state, logoutLoading: false };
      case AUTH_LOGOUT_FAILURE:
         return { ...state, logoutError: action.error };
      case AUTH_ENTROPY_PASSWORD_FETCH:
         return { ...state };
      case AUTH_ENTROPY_PASSWORD_DATA:
         return { ...state, current_password_entropy: action.payload.entropy };
      case AUTH_ENTROPY_PASSWORD_ERROR:
         return { ...state };
      default:
         return state;
   }
};
