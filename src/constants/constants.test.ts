import { PG_TITLE_PREFIX, pgRoutes } from './';

describe('Constants', () => {
   const expectedRoutesForLoggedInUser = [
      ['page.header.navbar.trade', '/trading/', 'trade'],
      ['page.header.navbar.wallets', '/wallets', 'wallets'],
      ['page.header.navbar.openOrders', '/orders', 'orders'],
      ['page.header.navbar.history', '/history', 'history'],
      ['page.header.navbar.api', '/docs', 'api'],
   ];

   const expectedRoutesForNotLoggedInUser = [
      ['page.header.navbar.login', '/login', 'login'],
      ['page.header.register', '/register', 'register'],
      ['page.header.navbar.trade', '/trading/', 'trade'],
   ];

   it('Rendering correct title prefix', () => {
      expect(PG_TITLE_PREFIX).toBe('Cryptobase');
   });

   it('Rendering correct correct routes if user is not logged in', () => {
      expect(pgRoutes(false)).toEqual(expectedRoutesForNotLoggedInUser);
   });

   it('Rendering correct correct routes if user is not logged in', () => {
      expect(pgRoutes(true)).toEqual(expectedRoutesForLoggedInUser);
   });
});
