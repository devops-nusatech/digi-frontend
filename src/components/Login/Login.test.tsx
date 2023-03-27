import * as React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-bootstrap';
import { captchaLogin } from '../../api';
import { LoginComponent, LoginProps } from '.';

const defaults: LoginProps = {
   onForgotPassword: jest.fn(),
   onregister: jest.fn(),
   onLogin: jest.fn(),
   email: '',
   emailError: '',
   password: '',
   passwordError: '',
   emailFocused: false,
   emailPlaceholder: '',
   passwordFocused: false,
   passwordPlaceholder: '',
   isFormValid: jest.fn(),
   refreshError: jest.fn(),
   handleChangeFocusField: jest.fn(),
   changePassword: jest.fn(),
   changeEmail: jest.fn(),
   captchaType: 'none',
   renderCaptcha: null,
   reCaptchaSuccess: false,
   geetestCaptchaSuccess: false,
   captcha_response: '',
};

const setup = (props: Partial<LoginProps> = {}) =>
   shallow(<LoginComponent {...{ ...defaults, ...props }} />);

// TODO: We need to rewrite tests in order to test hooks
describe.skip('Login component', () => {
   it('should render', () => {
      const wrapper = setup();
      expect(wrapper).toMatchSnapshot();
   });

   it('renders without crashing', () => {
      const wrapper = setup();
      expect(wrapper).toBeDefined();
   });

   it('render correct title', () => {
      const wrapper = setup();
      expect(wrapper.find('.__selected').text()).toBe('Sign In');
   });

   it('should render logo block', () => {
      let wrapper = setup();
      const firstState = wrapper
         .find('.cr-login-form__form-content')
         .children();
      expect(firstState).toHaveLength(4);
      wrapper = setup({ image: 'image' });
      const secondState = wrapper
         .find('.cr-login-form__form-content')
         .children();
      expect(secondState).toHaveLength(5);
   });

   it('should have correct labels', () => {
      const wrapper = setup({
         labelLogin: 'label sign in',
         labelregister: 'label sign up',
      });
      expect(wrapper.find('.__selected').text()).toBe('label sign in');
      expect(wrapper.find('.cr-login-form__tab-register').text()).toBe(
         'label sign up'
      );
   });

   it('should render error blocks', () => {
      const wrapper = setup({
         emailError: 'error email',
         passwordError: 'error password',
      });
      expect(wrapper.find('.cr-login-form__error').first().text()).toBe(
         'error email'
      );
      expect(wrapper.find('.cr-login-form__error').last().text()).toBe(
         'error password'
      );
   });

   it('should send request', () => {
      const spyOnValidateForm = jest.fn();
      const spyOnRefreshError = jest.fn();
      const spyOnLogin = jest.fn();
      const wrapper = setup({
         email: 'email@email.com',
         password: 'Qwerty123',
         isFormValid: spyOnValidateForm,
         refreshError: spyOnRefreshError,
         onLogin: spyOnLogin,
      });
      const button = wrapper.find(Button);
      button.simulate('click');
      expect(spyOnValidateForm).toHaveBeenCalledTimes(0);
      expect(spyOnRefreshError).toHaveBeenCalled();
      expect(spyOnLogin).toHaveBeenCalled();
      expect(spyOnRefreshError).toHaveBeenCalledTimes(1);
      expect(spyOnLogin).toHaveBeenCalledTimes(1);
   });

   it('should validate form', () => {
      const spyOnValidateForm = jest.fn();
      const spyOnRefreshError = jest.fn();
      const spyOnLogin = jest.fn();
      const wrapper = setup({
         email: 'email',
         password: 'Qwerty123',
         refreshError: spyOnRefreshError,
         onLogin: spyOnLogin,
         isFormValid: spyOnValidateForm,
      });
      const button = wrapper.find(Button);
      button.simulate('click');
      expect(spyOnValidateForm).toHaveBeenCalled();
      expect(spyOnValidateForm).toHaveBeenCalledTimes(1);
      expect(spyOnRefreshError).toHaveBeenCalledTimes(0);
      expect(spyOnLogin).toHaveBeenCalledTimes(0);
   });

   it('should have correct labels for input fields', () => {
      let wrapper = setup();
      expect(
         wrapper.find('.cr-login-form__bottom-section-password').text()
      ).toBe('Forgot your password?');
      wrapper = setup({ forgotPasswordLabel: 'label forgot password' });
      expect(
         wrapper.find('.cr-login-form__bottom-section-password').text()
      ).toBe('label forgot password');
   });

   it('should render captcha block', () => {
      let wrapper = setup({
         captchaType: 'recaptcha',
         renderCaptcha: <div className="cr-login-form__recaptcha">Content</div>,
      });
      captchaLogin()
         ? expect(wrapper.find('.cr-login-form__recaptcha').exists()).toBe(true)
         : expect(wrapper.find('.cr-login-form__recaptcha').exists()).toBe(
              false
           );
      wrapper = setup({
         captchaType: 'none',
         renderCaptcha: <div className="cr-login-form__recaptcha">Content</div>,
      });
      expect(wrapper.find('.cr-login-form__recaptcha').exists()).toBe(false);
   });
});
