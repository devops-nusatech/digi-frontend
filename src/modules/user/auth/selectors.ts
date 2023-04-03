import { RootState } from '../../';
import { CommonError } from '../../types';
import { AuthState } from './reducer';

export const selectLoginRequire2FA = (
   state: RootState
): AuthState['require2FA'] => state.user.auth.require2FA;

export const selectregisterRequireVerification = (
   state: RootState
): AuthState['requireVerification'] => state.user.auth.requireVerification;

export const selectregisterError = (
   state: RootState
): CommonError | undefined => state.user.auth.registerError;

export const selectEmailVerified = (
   state: RootState
): AuthState['emailVerified'] => state.user.auth.emailVerified;

export const selectCurrentPasswordEntropy = (
   state: RootState
): AuthState['current_password_entropy'] =>
   state.user.auth.current_password_entropy;

export const selectLoginLoading = (
   state: RootState
): AuthState['loginLoading'] => state.user.auth.loginLoading;

export const selectLoginError = (state: RootState): AuthState['authError'] =>
   state.user.auth.authError;

export const selectregisterLoading = (
   state: RootState
): AuthState['registerLoading'] => state.user.auth.registerLoading;

export const selectLogoutLoading = (
   state: RootState
): AuthState['logoutLoading'] => state.user.auth.logoutLoading;
