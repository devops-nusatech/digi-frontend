import React, {
   FC,
   FunctionComponent,
   useEffect,
   useState,
   KeyboardEvent
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
import { IntlProps } from '../../..';
import {
   Captcha,
   FormChangeNewPassword,
   LayoutAuth
} from 'components';
import {
   setDocumentTitle,
   truncateMiddle
} from 'helpers';
import {
   changeForgotPasswordFetch,
   CommonError,
   Configs,
   entropyPasswordFetch,
   forgotPassword,
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
   resetCaptchaState,
   RootState,
   selectCaptchaResponse,
   selectChangeForgotPasswordLoading,
   selectChangeForgotPasswordSuccess,
   selectConfigs,
   selectCurrentPasswordEntropy,
   selectForgotPasswordError,
   selectForgotPasswordSuccess,
   selectGeetestCaptchaSuccess,
   selectMobileDeviceState,
   selectRecaptchaSuccess,
} from 'modules';
import { useShowGeetestCaptcha } from 'hooks';

type State = {
   isRendered: 0 | 1;
   otpCode: string;
}

interface ReduxProps {
   forgotPasswordRequested: boolean;
   forgotPasswordChanged: boolean;
   isMobileDevice: boolean;
   configs: Configs;
   currentPasswordEntropy: number;
   captcha_response?: string | GeetestCaptchaResponse | GeetestCaptchaV4Response;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
   success: boolean;
   error?: CommonError;
   isLoading?: boolean;
}

interface DispatchProps {
   changeForgotPasswordFetch: typeof changeForgotPasswordFetch;
   fetchCurrentPasswordEntropy: typeof entropyPasswordFetch;
   fetchForgotPassword: typeof forgotPassword;
   resetCaptchaState: typeof resetCaptchaState;
}

type OwnProps = {
   location: {
      state: {
         email: string;
      };
   };
}

type Props = RouterProps & DispatchProps & OwnProps & ReduxProps & IntlProps;


const ChangeForgotPasswordFC: FC<Props> = ({
   forgotPasswordRequested,
   forgotPasswordChanged,
   isMobileDevice,
   configs,
   currentPasswordEntropy,
   captcha_response,
   history,
   location,
   intl,
   changeForgotPasswordFetch,
   fetchCurrentPasswordEntropy,
   fetchForgotPassword,
   resetCaptchaState,
   reCaptchaSuccess,
   geetestCaptchaSuccess,
   success,
   error,
   isLoading,
}) => {
   const [state, setState] = useState<State>({
      isRendered: 0,
      otpCode: '',
   });
   const { isRendered, otpCode } = state;

   useEffect(() => {
      setDocumentTitle('Change forgotten password');
   }, []);

   useEffect(() => {
      forgotPasswordChanged && history.push('/login');
   }, [forgotPasswordChanged]);

   const translate = (id: string) => intl.formatMessage({ id });

   const handleChangeOTP = (otpCode: string) => {
      setState({
         ...state,
         otpCode
      });
   }

   const handleChangeRendered = () => {
      setState({
         ...state,
         isRendered: isRendered == 1 ? 0 : 1
      });
   }

   const handleSendNewPassword = ({ password, confirm_password }: { password: string, confirm_password: string }) => {
      changeForgotPasswordFetch({
         password,
         confirm_password,
         reset_password_token: otpCode,
         email: location.state.email
      });
   };

   const handleResendGenerateCode = () => {
      if (location.state.email && isRendered === 0) {
         switch (configs.captcha_type) {
            case 'recaptcha':
            case 'geetest':
               fetchForgotPassword({ email: location.state.email, captcha_response });
               break;
            default:
               fetchForgotPassword({ email: location.state.email });
               break;
         }
         resetCaptchaState();
      } else {
         history.push('/forgot_password');
      }
   }

   useEffect(() => {
      if (configs.captcha_type !== 'none') {
         if (reCaptchaSuccess || geetestCaptchaSuccess) {
            handleResendGenerateCode();
         }
      }
   }, [reCaptchaSuccess, geetestCaptchaSuccess]);

   const renderCaptcha = () => <Captcha error={error} success={success} />;

   const handleOnKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
         switch (isRendered) {
            case 0:
               return handleChangeRendered()
            case 1:
               return handleResendGenerateCode()
            default:
               return;
         }
      }
   }

   const isDisabled = () => {
      if (isRendered === 0 && otpCode.length < 6) {
         return true;
      }
      if (isRendered === 1) {
         return true;
      }
      return false;
   }

   return (
      <LayoutAuth
         linkTo="/register"
         linkToTxt={translate('page.body.landing.header.button3')}
         descLinkTo="Don’t have an account?"
         title={`${isRendered === 0 ? 'PIN forgot password' : translate('page.header.signIn.resetPassword.newPassword')}`}
         subTitle={`${isRendered === 0 ? 'To reset your password, please complete the following verification. Enter the 6 digit code received by ' : ''}`}
         withSubTitleOneOfBold={`${isRendered === 0 ? (location?.state && (truncateMiddle(location?.state?.email ?? '', 12, '***'))) : ''}`}
         onKeyPress={handleOnKeyPress}
      >
         <FormChangeNewPassword
            isRendered={isRendered}
            otpCode={otpCode}
            forgotPasswordRequested={forgotPasswordRequested}
            handleChangeOTP={handleChangeOTP}
            handleChangeRendered={handleChangeRendered}
            changeForgotPasswordFetch={handleSendNewPassword}
            isDisabled={isDisabled()}
            isLoading={isLoading}
            translate={translate}
            currentPasswordEntropy={currentPasswordEntropy}
            renderCaptcha={renderCaptcha()}
            handleResendGenerateCode={configs.captcha_type !== 'none' ? useShowGeetestCaptcha : handleResendGenerateCode}
            fetchCurrentPasswordEntropy={fetchCurrentPasswordEntropy}
            configs={configs}
         />
      </LayoutAuth>
   )
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   forgotPasswordRequested: selectForgotPasswordSuccess(state),
   forgotPasswordChanged: selectChangeForgotPasswordSuccess(state),
   isMobileDevice: selectMobileDeviceState(state),
   currentPasswordEntropy: selectCurrentPasswordEntropy(state),
   configs: selectConfigs(state),
   captcha_response: selectCaptchaResponse(state),
   reCaptchaSuccess: selectRecaptchaSuccess(state),
   geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
   success: selectForgotPasswordSuccess(state),
   error: selectForgotPasswordError(state),
   isLoading: selectChangeForgotPasswordLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   changeForgotPasswordFetch: credentials => dispatch(changeForgotPasswordFetch(credentials)),
   fetchCurrentPasswordEntropy: payload => dispatch(entropyPasswordFetch(payload)),
   fetchForgotPassword: credentials => dispatch(forgotPassword(credentials)),
   resetCaptchaState: () => dispatch(resetCaptchaState())
});

export const ChangeForgotPassword = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(ChangeForgotPasswordFC) as FunctionComponent;
