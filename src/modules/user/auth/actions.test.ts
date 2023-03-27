import { CommonError } from '../../types';
import * as actions from './actions';

describe('Auth actions', () => {
    it('should check logoutFetch action creator', () => {
        const expectedAction = { type: 'auth/LOGOUT_FETCH' };
        expect(actions.logoutFetch()).toEqual(expectedAction);
    });

    it('should check logoutError action creator', () => {
        const error: CommonError = {
            code: 401,
            message: ['Invalid Session'],
        };
        const expectedAction = { type: 'auth/LOGOUT_FAILURE', error };
        expect(actions.logoutError(error)).toEqual(expectedAction);
    });

    it('should check login action creator', () => {
        const payload = {
            email: 'john.barong@gmail.com',
            password: '123123',
        };
        const expectedAction = { type: 'auth/LOGIN_FETCH', payload };
        expect(actions.login(payload)).toEqual(expectedAction);
    });

    it('should check loginError action creator', () => {
        const error: CommonError = {
            code: 500,
            message: ['Server error'],
        };
        const expectedAction = { type: 'auth/LOGIN_ERROR', error };
        expect(actions.loginError(error)).toEqual(expectedAction);
    });

    it('should check registerError action creator', () => {
        const error: CommonError = {
            code: 500,
            message: ['Server error'],
        };
        const expectedAction = { type: 'auth/REGISTER_ERROR', error };
        expect(actions.registerError(error)).toEqual(expectedAction);
    });

    it('should check loginRequire2FA action creator', () => {
        const payload = { require2fa: true };
        const expectedAction = { type: 'auth/LOGIN_REQUIRE_2FA', payload };
        expect(actions.loginRequire2FA(payload)).toEqual(expectedAction);
    });
});
