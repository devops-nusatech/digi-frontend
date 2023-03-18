import { shallow } from 'enzyme';
import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { IntlProps } from '../../';
import { rootReducer } from '../../modules';
import { LoginScreen } from '../LoginScreen';

const store = createStore(rootReducer);
const Identity = connect()(LoginScreen);

const setup = (props: Partial<IntlProps> = {}) =>
   shallow(
      <Provider store={store}>
         <Identity />
      </Provider>
   );

describe('LoginScreen', () => {
   const wrapper = setup();

   it('should render', () => {
      expect(wrapper).toMatchSnapshot();
   });
});
