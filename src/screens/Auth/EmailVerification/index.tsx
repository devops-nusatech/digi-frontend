import { History } from 'history';
import React, { FC, FunctionComponent, useEffect, useState } from 'react';
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
} from 'modules';
import type { CommonError } from 'modules/types';

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
   captcha_response?: string | GeetestCaptchaResponse | GeetestCaptchaV4Response;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
   user: User;
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
}) => {
   const [code, setCode] = useState<string>('');

   const initialMinute = 0;
   const [initialSeconds, setInitialSeconds] = useState<number>(60);
   const [minutes, setMinutes] = useState(initialMinute);
   const [seconds, setSeconds] = useState(initialSeconds);
   useEffect(() => {
      let myInterval = setInterval(() => {
         if (seconds > 0) {
            setSeconds(seconds - 1);
         }
         if (seconds === 0) {
            if (minutes === 0) {
               clearInterval(myInterval)
            } else {
               setMinutes(minutes - 1);
               setSeconds(59);
            }
         }
      }, 1000)
      return () => clearInterval(myInterval);
   }, [minutes, seconds]);

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

   const translate = (id: string) => formatMessage({ id });

   const renderCaptcha = () => {
      return <Captcha error={error} success={success} />;
   };

   const handleResendCode = () => {
      const { email } = state;
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
      setInitialSeconds(60);
   };


   const handleVerification = () => {
      const { email } = state;
      verificationFetch({ email, code });
   }

   const disableButton = (): boolean => {
      if (state && state.email && !state.email.match(EMAIL_REGEX)) {
         return true;
      }
      if (captcha_type === 'recaptcha' && !reCaptchaSuccess) {
         return true;
      }
      if (captcha_type === 'geetest' && !geetestCaptchaSuccess) {
         return true;
      }
      return false;
   };

   const title = translate('page.header.signUp.modal.header');
   const text = translate('page.header.signUp.modal.body');
   const button = translate('page.resendConfirmation');

   return (
      <LayoutAuth
         linkTo="/login"
         linkToTxt="Login"
         descLinkTo="Already have an account?"
         title={title}
         subTitle={text}
      >
         <InputOtp
            length={6}
            className="flex mb-8 -mx-2"
            isNumberInput
            onChangeOTP={otp => setCode(otp)}
         />
         {renderCaptcha()}
         <div className="flex justify-between items-center">
            {
               minutes === 0 && seconds === 0
                  ? (
                     <Button
                        text={button || 'Resend Code'}
                        size="small"
                        variant="outline"
                        width="noFull"
                        onClick={handleResendCode}
                        disabled={disableButton()}
                        withLoading={emailVerificationLoading}
                     />
                  )
                  : (<div> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>)
            }
            <Button
               text={emailVerificationLoading ? 'Loading...' : 'Continue'}
               size="small"
               width="noFull"
               onClick={handleVerification}
               disabled={emailVerificationLoading}
               withLoading={emailVerificationLoading}
            />
         </div>
      </LayoutAuth>
   );
}

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
});

const mapDispatchToProps = {
   emailVerificationFetch,
   resetCaptchaState,
   verificationFetch,
};

export const EmailVerification = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(EmailVerificationComponent) as FunctionComponent;
