import { shallow } from 'enzyme';
import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { IntlProps } from '../../';
import { rootReducer } from '../../modules';
import { RegisterScreen } from '../RegisterScreen';

const store = createStore(rootReducer);
const Register = connect()(RegisterScreen);

const setup = (props: Partial<IntlProps> = {}) =>
   shallow(
      <Provider store={store}>
         <Register />
      </Provider>
   );

describe('RegisterScreen', () => {
   const wrapper = setup();

   it('should render', () => {
      expect(wrapper).toMatchSnapshot();
   });
});
