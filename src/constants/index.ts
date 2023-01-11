import type { Wallet } from "modules";

export const PG_TITLE_PREFIX = 'Cryptobase';

export const pgRoutes = (isLoggedIn: boolean, isLight?: boolean): string[][] => {
    const routes = [
        ['page.header.navbar.trade', '/trading/', `trade${isLight ? 'Light' : ''}`],
        ['page.header.navbar.wallets', '/wallets', `wallets${isLight ? 'Light' : ''}`],
        ['page.header.navbar.openOrders', '/orders', `orders${isLight ? 'Light' : ''}`],
        ['page.header.navbar.history', '/history', `history${isLight ? 'Light' : ''}`],
        ['page.header.navbar.api', '/docs', `api${isLight ? 'Light' : ''}`],
    ];
    const routesUnloggedIn = [
        ['page.header.navbar.signIn', '/signin', `signin${isLight ? 'Light' : ''}`],
        ['page.header.signUp', '/signup', `signup${isLight ? 'Light' : ''}`],
        ['page.header.navbar.trade', '/trading/', `trade${isLight ? 'Light' : ''}`],
    ];

    return isLoggedIn ? routes : routesUnloggedIn;
};

export const DEFAULT_WALLET: Wallet = {
   name: '',
   currency: '',
   balance: '',
   type: 'coin',
   fixed: 0,
   networks: [{
      blockchain_key: '',
      withdraw_fee: '',
      protocol: '',
   }
   ],
   account_type: '',
};

export const DEFAULT_CCY_PRECISION = 4;
export const DEFAULT_TRADING_VIEW_INTERVAL = '15';
export const VALUATION_PRIMARY_CURRENCY = 'USD';
export const VALUATION_SECONDARY_CURRENCY = 'ETH';

export const PASSWORD_ENTROPY_STEP = 6;

export const colors = {
   light: {
      chart: {
         primary: '#FCFCFD',
         up: '#58BD7D',
         down: '#FF6838',
      },
      navbar: {
         sun: 'var(--icons)',
         moon: 'var(--primary-text-color)',
      },
      orderBook: {
         asks: 'var(--asks-level-4)',
         bids: 'var(--bids-level-4)',
      },
      depth: {
         fillAreaAsk: '#FF6838',
         fillAreaBid: '#58BD7D',
         gridBackgroundStart: '#1a243b',
         gridBackgroundEnd: '#1a243b',
         strokeAreaAsk: '#FF6838',
         strokeAreaBid: '#58BD7D',
         strokeGrid: '#E6E8EC',
         strokeAxis: '#B1B5C4',
      },
   },
    dark: {
        chart: {
            primary: 'var(--rgb-body-background-color)',
            up: 'var(--rgb-bids)',
            down: 'var(--rgb-asks)',
        },
        navbar: {
            sun: 'var(--primary-text-color)',
            moon: 'var(--icons)',
        },
        orderBook: {
            asks: 'var(--asks-level-4)',
            bids: 'var(--bids-level-4)',
        },
        depth: {
            fillAreaAsk: 'var(--rgb-asks)',
            fillAreaBid: 'var(--rgb-bids)',
            gridBackgroundStart: 'var(--rgb-asks)',
            gridBackgroundEnd: 'var(--rgb-asks)',
            strokeAreaAsk: 'var(--rgb-asks)',
            strokeAreaBid: 'var(--rgb-bids)',
            strokeGrid: 'var(--rgb-secondary-contrast-cta-color)',
            strokeAxis: 'var(--rgb-primary-text-color)',
        },
    },
};
