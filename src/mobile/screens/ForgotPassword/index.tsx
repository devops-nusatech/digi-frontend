import * as React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { ForgotPasswordScreen } from '../../../screens/ForgotPassword';
import { Modal } from '../../components';

const ForgotPasswordMobileScreen: React.FC = () => {
   const history = useHistory();
   const intl = useIntl();

   return (
      <div>
         <Modal
            isOpen
            onClose={() => history.push('/trading')}
            onBack={() => history.push('/login')}
            backTitle={intl.formatMessage({
               id: 'page.body.landing.header.button2',
            })}
            title={intl.formatMessage({ id: 'page.forgotPassword' })}>
            <ForgotPasswordScreen />
         </Modal>
      </div>
   );
};

export { ForgotPasswordMobileScreen };
