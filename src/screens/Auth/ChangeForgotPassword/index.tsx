import React, {
   FunctionComponent,
   useEffect,
   useState,
   KeyboardEvent,
   useRef,
} from 'react';
import { injectIntl } from 'react-intl';
import {
   connect,
   MapDispatchToPropsFunction,
   MapStateToProps,
} from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from 'index';
import { Captcha, FormChangeNewPassword, LayoutAuth } from 'components';
import { truncateMiddle } from 'helpers';
import {
   changeForgotPasswordFetch,
   CommonError,
   forgotPassword,
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
   resetCaptchaState,
   RootState,
   selectCaptchaResponse,
   selectChangeForgotPasswordLoading,
   selectChangeForgotPasswordSuccess,
   selectForgotPasswordError,
   selectForgotPasswordSuccess,
   selectGeetestCaptchaSuccess,
   selectRecaptchaSuccess,
} from 'modules';
import { useDocumentTitle, useShowGeetestCaptcha } from 'hooks';
import { captchaType } from 'api';

type State = {
   isRendered: 0 | 1;
   otpCode: string;
   password: string;
};

interface ReduxProps {
   forgotPasswordRequested: boolean;
   forgotPasswordChanged: boolean;
   captcha_response?:
      | string
      | GeetestCaptchaResponse
      | GeetestCaptchaV4Response;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
   success: boolean;
   error?: CommonError;
   isLoading?: boolean;
}

interface DispatchProps {
   changeForgotPasswordFetch: typeof changeForgotPasswordFetch;
   fetchForgotPassword: typeof forgotPassword;
   resetCaptchaState: typeof resetCaptchaState;
}

type OwnProps = {
   location: {
      state: {
         email: string;
      };
   };
};

type PasswordProps = {
   password: string;
   confirm_password: string;
};

type Props = RouterProps & DispatchProps & OwnProps & ReduxProps & IntlProps;

const ChangeForgotPasswordFC = ({
   forgotPasswordRequested,
   forgotPasswordChanged,
   captcha_response,
   history,
   location,
   intl,
   changeForgotPasswordFetch,
   fetchForgotPassword,
   resetCaptchaState,
   reCaptchaSuccess,
   geetestCaptchaSuccess,
   success,
   error,
   isLoading,
}: Props) => {
   const geetestCaptchaRef = useRef<HTMLButtonElement>(null);
   const [state, setState] = useState<State>({
      isRendered: 0,
      otpCode: '',
      password: '',
   });
   const { isRendered, otpCode, password } = state;

   useDocumentTitle('Change forgotten password');
   useEffect(() => {
      forgotPasswordChanged &&
         history.push('/login', { email: location.state?.email, password });
   }, [forgotPasswordChanged]);
   useEffect(() => {
      if (captchaType() !== 'none') {
         if (reCaptchaSuccess || geetestCaptchaSuccess) {
            handleResendGenerateCode();
         }
      }
   }, [reCaptchaSuccess, geetestCaptchaSuccess]);

   const translate = (id: string) => intl.formatMessage({ id });

   const handleChangeOTP = (otpCode: string) =>
      setState({
         ...state,
         otpCode,
      });

   const handleChangeRendered = () =>
      setState({
         ...state,
         isRendered: isRendered == 1 ? 0 : 1,
      });

   const handleSendNewPassword = ({
      password,
      confirm_password,
   }: PasswordProps) => {
      changeForgotPasswordFetch({
         password,
         confirm_password,
         reset_password_token: otpCode,
         email: location.state?.email,
      });
      setState({
         ...state,
         password,
      });
   };

   const handleResendGenerateCode = () => {
      if (location.state?.email && isRendered === 0) {
         switch (captchaType()) {
            case 'recaptcha':
            case 'geetest':
               fetchForgotPassword({
                  email: location.state?.email,
                  captcha_response,
               });
               break;
            default:
               fetchForgotPassword({ email: location.state?.email });
               break;
         }
         resetCaptchaState();
      } else {
         history.push('/forgot-password');
      }
   };

   const renderCaptcha = () => (
      <Captcha geetestCaptchaRef={geetestCaptchaRef} />
   );

   const handleOnKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
         switch (isRendered) {
            case 0:
               return handleChangeRendered();
            case 1:
               return handleResendGenerateCode();
            default:
               return;
         }
      }
   };

   const isDisabled = () => {
      if (isRendered === 0 && otpCode.length < 6) {
         return true;
      }
      if (isRendered === 1) {
         return true;
      }
      return false;
   };

   return (
      <LayoutAuth
         linkTo="/register"
         linkToTxt={translate('page.body.landing.header.button3')}
         descLinkTo="Don’t have an account?"
         title={`${
            isRendered === 0
               ? 'PIN forgot password'
               : translate('page.header.login.resetPassword.newPassword')
         }`}
         subTitle={`${
            isRendered === 0
               ? 'To reset your password, please complete the following verification. Enter the 6 digit code received by '
               : ''
         }`}
         withSubTitleOneOfBold={`${
            isRendered === 0
               ? location?.state &&
                 truncateMiddle(location?.state?.email ?? '', 12, '***')
               : ''
         }`}
         onKeyPress={handleOnKeyPress}>
         <FormChangeNewPassword
            geetestCaptchaRef={geetestCaptchaRef}
            isRendered={isRendered}
            otpCode={otpCode}
            forgotPasswordRequested={forgotPasswordRequested}
            handleChangeOTP={handleChangeOTP}
            handleChangeRendered={handleChangeRendered}
            changeForgotPasswordFetch={handleSendNewPassword}
            isDisabled={isDisabled()}
            isLoading={isLoading}
            translate={translate}
            renderCaptcha={renderCaptcha()}
            handleResendGenerateCode={
               captchaType() !== 'none'
                  ? useShowGeetestCaptcha
                  : handleResendGenerateCode
            }
            captcha_response={captcha_response}
         />
      </LayoutAuth>
   );
};

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   forgotPasswordRequested: selectForgotPasswordSuccess(state),
   forgotPasswordChanged: selectChangeForgotPasswordSuccess(state),
   captcha_response: selectCaptchaResponse(state),
   reCaptchaSuccess: selectRecaptchaSuccess(state),
   geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
   success: selectForgotPasswordSuccess(state),
   error: selectForgotPasswordError(state),
   isLoading: selectChangeForgotPasswordLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   changeForgotPasswordFetch: credentials =>
      dispatch(changeForgotPasswordFetch(credentials)),
   fetchForgotPassword: credentials => dispatch(forgotPassword(credentials)),
   resetCaptchaState: () => dispatch(resetCaptchaState()),
});

export const ChangeForgotPassword = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ChangeForgotPasswordFC) as FunctionComponent;
