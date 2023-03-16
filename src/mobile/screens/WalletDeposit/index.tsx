// import { DEFAULT_WALLET } from 'constants';
// import * as React from 'react';
// import { useIntl } from 'react-intl';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useParams } from 'react-router';
// import {
//     useCurrenciesFetch,
//     useWalletsFetch,
// } from '../../../hooks';
// import {
//     selectWallets,
//     Wallet,
//     walletsAddressFetch,
//     walletsFetch,
// } from '../../../modules/user/wallets';
// import { Subheader, WalletDepositBody, WalletHeader } from '../../components';

// const WalletDeposit: React.FC = () => {
//     const dispatch = useDispatch();
//     const intl = useIntl();
//     const history = useHistory();
//     const { currency = '' } = useParams<{ currency?: string }>();
//     const wallets = useSelector(selectWallets) || [];

//     useCurrenciesFetch();
//     useWalletsFetch();

//     const wallet: Wallet = wallets.find(item => item.currency === currency) || DEFAULT_WALLET;

//    //  const handleGenerateAddress = () => {
//    //      if (!wallet.deposit_address && wallets.length && wallet.type !== 'fiat') {
//    //          dispatch(walletsAddressFetch({ currency }));
//    //          dispatch(walletsFetch());
//    //      }
//    //  };

//     return (
//         <React.Fragment>
//             <Subheader
//                 title={intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' })}
//                 backTitle={intl.formatMessage({ id: 'page.body.wallets.balance' })}
//                 onGoBack={() => history.push(`/wallets/${currency}/history`)}
//             />
//             <WalletHeader currency={wallet.currency} name={wallet.name}/>
//             <WalletDepositBody
//                 wallet={wallet}
//                 handleGenerateAddress={handleGenerateAddress}
//             />
//         </React.Fragment>
//     );
// };

// export {
//     WalletDeposit,
// };

import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useWalletsFetch } from '../../../hooks';
import { selectWallets, Wallet } from '../../../modules/user/wallets';
import { Subheader, WalletDepositBody, WalletHeader } from '../../components';
import { DEFAULT_WALLET } from '../../../constants';

const WalletDeposit: React.FC = () => {
   const intl = useIntl();
   const history = useHistory();
   const { currency = '' } = useParams<{ currency?: string }>();
   const wallets = useSelector(selectWallets) || [];

   useWalletsFetch();

   const wallet: Wallet =
      wallets.find(item => item.currency === currency) || DEFAULT_WALLET;

   return (
      <React.Fragment>
         <Subheader
            title={intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' })}
            backTitle={intl.formatMessage({ id: 'page.body.wallets.balance' })}
            onGoBack={() => history.push(`/wallets/${currency}/history`)}
         />
         <WalletHeader
            currency={wallet.currency}
            name={wallet.name}
         />
         <WalletDepositBody wallet={wallet} />
      </React.Fragment>
   );
};

export { WalletDeposit };
