import { CommonError } from '../../types';
import {
   AUTH_ENTROPY_PASSWORD_DATA,
   AUTH_ENTROPY_PASSWORD_ERROR,
   AUTH_ENTROPY_PASSWORD_FETCH,
   AUTH_LOGOUT_DATA,
   AUTH_LOGOUT_FAILURE,
   AUTH_LOGOUT_FETCH,
   AUTH_LOGIN_DATA,
   AUTH_LOGIN_ERROR,
   AUTH_LOGIN_FETCH,
   AUTH_LOGIN_REQUIRE_2FA,
   AUTH_LOGIN_REQUIRE_2FA_RESET,
   AUTH_REGISTER_DATA,
   AUTH_REGISTER_ERROR,
   AUTH_REGISTER_FETCH,
   AUTH_REGISTER_REQUIRE_VERIFICATION,
   AUTH_TEST_STATE,
   AUTH_VERIFICATION_FETCH,
   AUTH_VERIFICATION_SUCCESS,
} from './constants';

export interface GeetestCaptchaResponse {
   geetest_challenge: string;
   geetest_validate: string;
   geetest_seccode: string;
}

export interface GeetestCaptchaV4Response {
   captcha_id: string;
   captcha_output: string;
   gen_time: string;
   lot_number: string;
   pass_token: string;
   sign_token?: string;
}

export interface EntropyPasswordFetch {
   type: typeof AUTH_ENTROPY_PASSWORD_FETCH;
   payload: {
      password: string,
   };
}

export interface EntropyPasswordError {
   type: typeof AUTH_ENTROPY_PASSWORD_ERROR;
   error: CommonError;
}

export interface EntropyPasswordData {
   type: typeof AUTH_ENTROPY_PASSWORD_DATA;
   payload: {
      entropy: number;
   };
}
export interface LoginFetch {
   type: typeof AUTH_LOGIN_FETCH;
   payload: {
      email: string;
      password: string;
      data?: string;
      otp_code?: string;
      captcha_response?: string | GeetestCaptchaResponse | GeetestCaptchaV4Response;
   };
}

export interface LoginError {
   type: typeof AUTH_LOGIN_ERROR;
   error: CommonError;
}

export interface LoginRequire2FA {
   type: typeof AUTH_LOGIN_REQUIRE_2FA;
   payload: {
      require2fa: boolean;
   };
}

export interface LoginData {
   type: typeof AUTH_LOGIN_DATA;
}

export interface registerFetch {
   type: typeof AUTH_REGISTER_FETCH;
   payload: {
      username?: string;
      email: string;
      password: string;
      data: string;
      captcha_response?: string | GeetestCaptchaResponse | GeetestCaptchaV4Response;
      refid?: string;
   };
}

export interface registerData {
   type: typeof AUTH_REGISTER_DATA;
}

export interface registerError {
   type: typeof AUTH_REGISTER_ERROR;
   error: CommonError;
}

export interface registerRequireVerification {
   type: typeof AUTH_REGISTER_REQUIRE_VERIFICATION;
   payload: {
      requireVerification: boolean;
   };
}

export interface VerificationFetch {
   type: typeof AUTH_VERIFICATION_FETCH;
   payload: {
      email: string;
      code: string;
   };
}

export interface VerificationSuccess {
   type: typeof AUTH_VERIFICATION_SUCCESS;
}

export interface LogoutFetch {
   type: typeof AUTH_LOGOUT_FETCH;
}

export interface LogoutData {
   type: typeof AUTH_LOGOUT_DATA;
}

export interface LogoutFailed {
   type: typeof AUTH_LOGOUT_FAILURE;
   error: CommonError;
}

export interface TestAuthState {
   type: typeof AUTH_TEST_STATE;
}

export interface AuthLoginRequire2FAReset {
   type: typeof AUTH_LOGIN_REQUIRE_2FA_RESET;
}

export type AuthAction =
   | LoginFetch
   | LoginData
   | LoginError
   | LoginRequire2FA
   | registerData
   | registerFetch
   | registerError
   | registerRequireVerification
   | VerificationFetch
   | VerificationSuccess
   | LogoutFetch
   | LogoutData
   | LogoutFailed
   | TestAuthState
   | EntropyPasswordFetch
   | EntropyPasswordData
   | EntropyPasswordError
   | AuthLoginRequire2FAReset;

export const entropyPasswordFetch = (payload: EntropyPasswordFetch['payload']): EntropyPasswordFetch => ({
   type: AUTH_ENTROPY_PASSWORD_FETCH,
   payload,
});

export const entropyPasswordData = (payload: EntropyPasswordData['payload']): EntropyPasswordData => ({
   type: AUTH_ENTROPY_PASSWORD_DATA,
   payload,
});

export const entropyPasswordError = (error: CommonError): EntropyPasswordError => ({
   type: AUTH_ENTROPY_PASSWORD_ERROR,
   error,
});

export const login = (payload: LoginFetch['payload']): LoginFetch => ({
   type: AUTH_LOGIN_FETCH,
   payload,
});

export const loginData = (): LoginData => ({
   type: AUTH_LOGIN_DATA,
});

export const loginError = (error: CommonError): LoginError => ({
   type: AUTH_LOGIN_ERROR,
   error,
});

export const loginRequire2FA = (payload: LoginRequire2FA['payload']): LoginRequire2FA => ({
   type: AUTH_LOGIN_REQUIRE_2FA,
   payload,
});

export const register = (payload: registerFetch['payload']): registerFetch => ({
   type: AUTH_REGISTER_FETCH,
   payload,
});

export const registerData = (): registerData => ({
   type: AUTH_REGISTER_DATA,
});

export const registerError = (error: CommonError): registerError => ({
   type: AUTH_REGISTER_ERROR,
   error,
});

export const registerRequireVerification = (payload: registerRequireVerification['payload']): registerRequireVerification => ({
   type: AUTH_REGISTER_REQUIRE_VERIFICATION,
   payload,
});

export const verificationFetch = (payload: VerificationFetch['payload']): VerificationFetch => ({
   type: AUTH_VERIFICATION_FETCH,
   payload,
});

export const verificationSuccess = (): VerificationSuccess => ({
   type: AUTH_VERIFICATION_SUCCESS,
});

export const logoutFetch = (): LogoutFetch => ({
   type: AUTH_LOGOUT_FETCH,
});
export const logoutData = (): LogoutData => ({
   type: AUTH_LOGOUT_DATA,
});

export const logoutError = (error: CommonError): LogoutFailed => ({
   type: AUTH_LOGOUT_FAILURE,
   error,
});

export const require2FAReset = (): AuthLoginRequire2FAReset => ({
   type: AUTH_LOGIN_REQUIRE_2FA_RESET,
});
