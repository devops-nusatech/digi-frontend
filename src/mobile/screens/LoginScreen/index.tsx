import classnames from 'classnames';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectLoginRequire2FA } from '../../../modules/user/auth';
import { LoginScreen } from '../../../screens/LoginScreen';
import { Modal } from '../../components';

const LoginMobileScreen: React.FC = () => {
   const require2FA = useSelector(selectLoginRequire2FA);
   const history = useHistory();
   const intl = useIntl();
   const title = require2FA
      ? { id: 'page.mobile.login.kyc.header' }
      : { id: 'page.body.landing.header.button2' };
   const className = classnames({
      'cr-mobile-login': !require2FA,
      'cr-mobile-kyc': require2FA,
   });

   return (
      <div className={className}>
         <Modal
            isOpen={true}
            onClose={() => history.push('/trading')}
            onBack={() => !require2FA && history.push('/register')}
            backTitle={intl.formatMessage({
               id: 'page.body.landing.header.button3',
            })}
            title={intl.formatMessage(title)}>
            <LoginScreen />
         </Modal>
      </div>
   );
};

export { LoginMobileScreen };
