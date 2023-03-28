import { History } from 'history';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { LayoutAuth, InputOtp } from 'components';
import { EMAIL_REGEX, setDocumentTitle } from 'helpers';
import {
   emailVerificationFetch,
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
   resetCaptchaState,
   RootState,
   selectCaptchaResponse,
   selectCurrentLanguage,
   selectGeetestCaptchaSuccess,
   selectMobileDeviceState,
   selectRecaptchaSuccess,
   selectSendEmailVerificationError,
   selectSendEmailVerificationLoading,
   selectSendEmailVerificationSuccess,
   selectUserInfo,
   User,
} from 'modules';
import { CommonError } from 'modules/types';
import { captchaType } from 'api';
import { IntlProps } from '../../';

interface OwnProps {
   history: History;
   location: {
      state: {
         email: string;
      };
   };
   success: boolean;
   error?: CommonError;
}

interface DispatchProps {
   emailVerificationFetch: typeof emailVerificationFetch;
   resetCaptchaState: typeof resetCaptchaState;
}

interface ReduxProps {
   emailVerificationLoading: boolean;
   isMobileDevice: boolean;
   captcha_response?:
      | string
      | GeetestCaptchaResponse
      | GeetestCaptchaV4Response;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
   user: User;
}

type Props = DispatchProps & ReduxProps & OwnProps & IntlProps;

const EmailVerificationComponentOld = (props: Props) => {
   const initialMinute = 0;
   const initialSeconds = 3;
   const [minutes, setMinutes] = useState(initialMinute);
   const [seconds, setSeconds] = useState(initialSeconds);
   useEffect(() => {
      let myInterval = setInterval(() => {
         if (seconds > 0) {
            setSeconds(seconds - 1);
         }
         if (seconds === 0) {
            if (minutes === 0) {
               clearInterval(myInterval);
            } else {
               setMinutes(minutes - 1);
               setSeconds(59);
            }
         }
      }, 1000);
      return () => {
         clearInterval(myInterval);
      };
   });

   // <>
   //       {seconds !== 0 && minutes === 0 && seconds === 0
   //          ? null
   //          : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
   //       }
   //    </>

   useEffect(() => {
      setDocumentTitle('Email verification');
      if (!props.location.state) {
         props.history.push('/login');
      }
   }, []);

   // const translate = (id: string) => props.intl.formatMessage({ id });

   // const renderCaptcha = () => {
   //    const { error, success } = props;
   //    return <Captcha error={error} success={success} />;
   // };

   const handleClick = () => {
      const { captcha_response } = props;
      switch (captchaType()) {
         case 'recaptcha':
         case 'geetest':
            props.emailVerificationFetch({
               email: props.location.state.email,
               captcha_response,
            });
            break;
         default:
            props.emailVerificationFetch({
               email: props.location.state.email,
            });
            break;
      }
      props.resetCaptchaState();
   };

   const disableButton = (): boolean => {
      const { location, geetestCaptchaSuccess, reCaptchaSuccess } = props;
      if (
         location.state &&
         location.state.email &&
         !location.state.email.match(EMAIL_REGEX)
      ) {
         return true;
      }
      if (captchaType() === 'recaptcha' && !reCaptchaSuccess) {
         return true;
      }
      if (captchaType() === 'geetest' && !geetestCaptchaSuccess) {
         return true;
      }
      return false;
   };

   const title = props.intl.formatMessage({
      id: 'page.header.register.modal.header',
   });
   const text = props.intl.formatMessage({
      id: 'page.header.register.modal.body',
   });
   const button = props.intl.formatMessage({ id: 'page.resendConfirmation' });

   return (
      <LayoutAuth
         descLinkTo="Already have an account?"
         linkTo="/login"
         linkToTxt="Login"
         title={title}
         subTitle={text}>
         <InputOtp
            length={6}
            className="-mx-2 mb-8 flex bg-neutral8"
            onChangeOTP={otp => console.log(`OTP => : ${otp}`)}
         />
         <div className="login__btns">
            {minutes === 0 && seconds === 0 ? (
               <button
                  onClick={handleClick}
                  className="button-stroke button-small login__button"
                  disabled={disableButton()}>
                  {button || 'Resend Code'}
               </button>
            ) : (
               <div>
                  {' '}
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
               </div>
            )}
            <button className="button button-small login__button">
               Continue
            </button>
         </div>
      </LayoutAuth>
   );
};

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   emailVerificationLoading: selectSendEmailVerificationLoading(state),
   i18n: selectCurrentLanguage(state),
   isMobileDevice: selectMobileDeviceState(state),
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
};

export const EmailVerificationScreen = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(EmailVerificationComponentOld) as FunctionComponent;
