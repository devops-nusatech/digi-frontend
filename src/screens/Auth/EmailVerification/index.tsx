import { History } from 'history';
import React, {
   FC,
   FunctionComponent,
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState,
} from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from 'index';
import { Button, LayoutAuth, InputOtp, Captcha } from 'components';
import { EMAIL_REGEX, setDocumentTitle } from 'helpers';
import {
   Configs,
   verificationFetch,
   emailVerificationFetch,
   GeetestCaptchaResponse,
   resetCaptchaState,
   RootState,
   selectCaptchaResponse,
   selectConfigs,
   selectCurrentLanguage,
   selectGeetestCaptchaSuccess,
   selectMobileDeviceState,
   selectRecaptchaSuccess,
   selectSendEmailVerificationError,
   selectSendEmailVerificationLoading,
   selectSendEmailVerificationSuccess,
   selectUserInfo,
   User,
   selectEmailVerified,
   GeetestCaptchaV4Response,
   selectCaptchaDataObjectLoading,
} from 'modules';
import type { CommonError } from 'modules/types';
import { useCounter } from 'hooks';

interface OwnProps {
   history: History;
   location: {
      state: {
         email: string;
         password: string;
      };
   };
   success: boolean;
   error?: CommonError;
}

interface DispatchProps {
   verificationFetch: typeof verificationFetch;
   emailVerificationFetch: typeof emailVerificationFetch;
   resetCaptchaState: typeof resetCaptchaState;
}

interface ReduxProps {
   emailVerificationLoading: boolean;
   emailVerified: boolean;
   isMobileDevice: boolean;
   configs: Configs;
   captcha_response?:
      | string
      | GeetestCaptchaResponse
      | GeetestCaptchaV4Response;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
   user: User;
   captchaLoading: boolean;
   generateCodeLoading: boolean;
   generateCodeSucccess: boolean;
}

type Props = DispatchProps & ReduxProps & OwnProps & IntlProps;

const EmailVerificationComponent: FC<Props> = ({
   history: { push },
   location: { state },
   success,
   error,

   emailVerificationLoading,
   emailVerified,
   isMobileDevice,
   configs: { captcha_type },
   captcha_response,
   reCaptchaSuccess,
   geetestCaptchaSuccess,
   user,

   verificationFetch,
   emailVerificationFetch,
   resetCaptchaState,

   intl: { formatMessage },
   captchaLoading,
   generateCodeLoading,
   generateCodeSucccess,
}) => {
   const { email } = state;
   const geetestCaptchaRef = useRef<HTMLButtonElement>(null);
   const [code, setCode] = useState('');
   const { counter, setCounter } = useCounter();

   useEffect(() => {
      setDocumentTitle('Email verification');
      if (!state) {
         push('/login');
      }
   }, []);

   useEffect(() => {
      const { email, password } = state;
      if (emailVerified === true) {
         push('/login', { email, password });
      }
   }, [emailVerified]);

   useEffect(() => {
      if (code.length === 6) {
         handleVerification();
      }
   }, [code]);

   const translate = useCallback(
      (id: string) => formatMessage({ id }),
      [formatMessage]
   );

   const renderCaptcha = useMemo(
      () => <Captcha geetestCaptchaRef={geetestCaptchaRef} />,
      []
   );

   const handleResendCode = useCallback(() => {
      switch (captcha_type) {
         case 'recaptcha':
         case 'geetest':
            emailVerificationFetch({
               email,
               captcha_response,
            });
            break;
         default:
            emailVerificationFetch({ email });
            break;
      }
      resetCaptchaState();
      setCounter(3);
   }, [
      captcha_response,
      email,
      emailVerificationFetch,
      resetCaptchaState,
      setCounter,
   ]);

   useEffect(() => {
      captcha_response && handleResendCode();
   }, [captcha_response]);

   const handleClick = useCallback(
      (e: any) => captcha_type === 'none' && handleResendCode(),
      [handleResendCode, captcha_type]
   );

   const handleVerification = useCallback(() => {
      verificationFetch({ email, code });
   }, [code, verificationFetch, email]);

   const disableButton = useMemo(() => {
      if (state && state.email && !state.email.match(EMAIL_REGEX)) {
         return true;
      }
      return false;
   }, [state]);

   const isReady = useMemo(() => counter < 1, [counter]);

   const title = translate('page.header.register.modal.header');
   const text = translate('page.header.register.modal.body');
   const button = translate('page.resendConfirmation');

   return (
      <LayoutAuth
         linkTo="/login"
         linkToTxt="Login"
         descLinkTo="Already have an account?"
         title={title}
         subTitle={text}>
         <InputOtp
            length={6}
            className="-mx-2 mb-8 flex"
            onChangeOTP={setCode}
         />
         {renderCaptcha}
         <div className="flex items-center justify-between">
            <Button
               ref={geetestCaptchaRef}
               text={button || 'Resend Code'}
               size="small"
               variant="outline"
               width="noFull"
               onClick={handleClick}
               disabled={disableButton}
               withLoading={generateCodeLoading || captchaLoading}
               className={isReady ? '' : 'hidden'}
            />
            {!isReady && <div>00:{counter < 10 ? `0${counter}` : counter}</div>}
            <Button
               text={emailVerificationLoading ? 'Loading...' : 'Continue'}
               size="small"
               width="noFull"
               onClick={handleVerification}
               disabled={emailVerificationLoading || code.length < 6}
               withLoading={emailVerificationLoading}
            />
         </div>
      </LayoutAuth>
   );
};

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   emailVerificationLoading: selectSendEmailVerificationLoading(state),
   emailVerified: selectEmailVerified(state),
   i18n: selectCurrentLanguage(state),
   isMobileDevice: selectMobileDeviceState(state),
   configs: selectConfigs(state),
   error: selectSendEmailVerificationError(state),
   success: selectSendEmailVerificationSuccess(state),
   captcha_response: selectCaptchaResponse(state),
   reCaptchaSuccess: selectRecaptchaSuccess(state),
   geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
   user: selectUserInfo(state),
   captchaLoading: selectCaptchaDataObjectLoading(state),
   generateCodeLoading: selectSendEmailVerificationLoading(state),
   generateCodeSucccess: selectSendEmailVerificationSuccess(state),
});

const mapDispatchToProps = {
   emailVerificationFetch,
   resetCaptchaState,
   verificationFetch,
};

export const EmailVerification = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(EmailVerificationComponent) as FunctionComponent;
