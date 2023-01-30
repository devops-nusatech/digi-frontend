import {
   icBitcoinCash,
   icBitcoin,
   icBnb,
   icCardano,
   icChainlink,
   icDash,
   icDogecoin,
   icEos,
   icEthereum,
   icMaid,
   icMonero,
   icOntology,
   icPolkadot,
   icRipple,
   icTether,
   icTron,
   icUniswap,
   icUSDCoin,
   icLogo,
   icPolygon,
   icIdr,
   icJust,
   icETC,
   icSOL,
   icATOM,
   icXLM,
   icCAKE,
   icSUSHI,
   icSAND,
   icAXS,
   ic1INCH,
} from 'assets';
// import { imageIsExists } from 'helpers';

export const renderCurrencyIcon = (currency: string = '', iconUrl: string = ''): string => {
   switch (currency) {
      case 'btc':
         return icBitcoin
      case 'eth':
         return icEthereum
      case 'xrp':
         return icRipple
      case 'bnb':
         return icBnb
      case 'bch':
         return icBitcoinCash
      case 'usdt':
         return icTether
      case 'ada':
         return icCardano
      case 'link':
         return icChainlink
      case 'dash':
         return icDash
      case 'doge':
         return icDogecoin
      case 'eos':
         return icEos
      case 'maid':
         return icMaid
      case 'xmr':
      case 'xmc':
         return icMonero
      case 'ont':
         return icOntology
      case 'dot':
         return icPolkadot
      case 'trx':
         return icTron
      case 'uni':
         return icUniswap
      case 'usdc':
         return icUSDCoin
      case 'matic':
         return icPolygon
      case 'jst':
         return icJust
      case 'idr':
         return icIdr
      case 'etc':
         return icETC
      case 'sol':
         return icSOL
      case 'atom':
         return icATOM
      case 'xlm':
         return icXLM
      case 'cake':
         return icCAKE
      case 'sushi':
         return icSUSHI
      case 'sand':
         return icSAND
      case 'axs':
         return icAXS
      case '1inch':
         return ic1INCH

      default:
         return iconUrl || icLogo;
   }
}
