import * as React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { RegisterScreen } from '../../../screens/RegisterScreen';
import { Modal } from '../../components';

const RegisterMobileScreen: React.FC = () => {
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
            title={intl.formatMessage({
               id: 'page.body.landing.header.button3',
            })}>
            <RegisterScreen />
         </Modal>
      </div>
   );
};

export { RegisterMobileScreen };
