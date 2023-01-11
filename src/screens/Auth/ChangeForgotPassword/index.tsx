import React, { FC, FunctionComponent, useEffect, createRef, useState, KeyboardEvent } from 'react';
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
import { Captcha, FormChangeNewPassword, LayoutAuth } from 'components';
import { passwordErrorFirstSolution, passwordErrorSecondSolution, passwordErrorThirdSolution, setDocumentTitle, truncateMiddle } from 'helpers';
import {
   changeForgotPasswordFetch,
   CommonError,
   Configs,
   entropyPasswordFetch,
   forgotPassword,
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
   resetCaptchaState,
   RootState, selectCaptchaResponse, selectChangeForgotPasswordLoading, selectChangeForgotPasswordSuccess,
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
   newPassword: string;
   confirmPassword: string;
   newPasswordShow: boolean;
   newPasswordFocus: boolean;
   confirmPasswordFocus: boolean;
   passwordErrorFirstSolved: boolean,
   passwordErrorSecondSolved: boolean,
   passwordErrorThirdSolved: boolean,
   typingTimeout: number
}

interface ReduxProps {
   changeForgotPassword?: boolean;
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
   changeForgotPassword,
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
      newPassword: '',
      confirmPassword: '',
      newPasswordFocus: false,
      confirmPasswordFocus: false,
      newPasswordShow: false,
      passwordErrorFirstSolved: false,
      passwordErrorSecondSolved: false,
      passwordErrorThirdSolved: false,
      typingTimeout: 0,
   });
   const { isRendered, otpCode, newPassword, confirmPassword, newPasswordFocus, confirmPasswordFocus, newPasswordShow, passwordErrorFirstSolved, passwordErrorSecondSolved, passwordErrorThirdSolved, typingTimeout } = state;

   const newPasswordWrapper = createRef<HTMLDivElement>();

   useEffect(() => {
      setDocumentTitle('Change forgotten password');
   }, []);

   useEffect(() => {
      document.addEventListener('mouseout', handleOutsideClick);
      return () => document.removeEventListener('mouseout', handleOutsideClick);
   }, [newPasswordWrapper]);

   useEffect(() => {
      changeForgotPassword && history.push('/login');
   }, [changeForgotPassword]);

   const translate = (id: string) => intl.formatMessage({ id });

   const handleChangeOTP = (otpCode: string) => {
      setState({
         ...state,
         otpCode
      });
   }
   const handleChangeNewPassword = (newPassword: string) => {
      if (passwordErrorFirstSolution(newPassword) && !passwordErrorFirstSolved) {
         setState({
            ...state,
            passwordErrorFirstSolved: true,
         });
      } else if (!passwordErrorFirstSolution(newPassword) && passwordErrorFirstSolved) {
         setState({
            ...state,
            passwordErrorFirstSolved: false,
         });
      }

      if (passwordErrorSecondSolution(newPassword) && !passwordErrorSecondSolved) {
         setState({
            ...state,
            passwordErrorSecondSolved: true,
         });
      } else if (!passwordErrorSecondSolution(newPassword) && passwordErrorSecondSolved) {
         setState({
            ...state,
            passwordErrorSecondSolved: false,
         });
      }

      if (passwordErrorThirdSolution(newPassword) && !passwordErrorThirdSolved) {
         setState({
            ...state,
            passwordErrorThirdSolved: true,
         });
      } else if (!passwordErrorThirdSolution(newPassword) && passwordErrorThirdSolved) {
         setState({
            ...state,
            passwordErrorThirdSolved: false,
         });
      }

      if (typingTimeout) {
         clearTimeout(typingTimeout);
      }

      setState({
         ...state,
         newPassword,
         newPasswordFocus: true,
         newPasswordShow: true,
         typingTimeout: Number(setTimeout(() => fetchCurrentPasswordEntropy({ password: newPassword }), 500)),
      });
   }
   const handleChangeConfirmPassword = (confirmPassword: string) => {
      setState({
         ...state,
         confirmPassword,
         newPasswordFocus: false,
         newPasswordShow: false,
         confirmPasswordFocus: true,
      });
   }

   const handleChangeRendered = () => {
      setState({
         ...state,
         isRendered: isRendered == 1 ? 0 : 1
      });
   }

   const handleSendNewPassword = () => {
      changeForgotPasswordFetch({
         password: newPassword,
         confirm_password: confirmPassword,
         reset_password_token: otpCode,
         email: location.state.email
      });
   };

   const handleOutsideClick = (e: any) => {
      const wrapperElement = newPasswordWrapper.current;
      if (wrapperElement && !wrapperElement.contains(e.target)) {
         setState({
            ...state,
            newPasswordShow: false,
            newPasswordFocus: false,
         });
      }
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

   const handleFocusNewPassword = () => setState({ ...state, newPasswordFocus: true });
   const handleFocusConfirmPassword = () => setState({ ...state, confirmPasswordFocus: true })

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
      if (isRendered === 1 && (!newPassword || !confirmPassword || (newPassword !== confirmPassword))) {
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
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            newPasswordLabel={translate('page.header.signIn.resetPassword.newPassword')}
            newPasswordFocus={newPasswordFocus}
            confirmPasswordFocus={confirmPasswordFocus}
            confirmPasswordLabel={translate('page.header.signUp.confirmPassword')}
            buttonLabel={translate('page.body.kyc.next')}
            placeholder={translate('page.header.signUp.password')}
            handleChangeOTP={handleChangeOTP}
            handleChangeNewPassword={handleChangeNewPassword}
            handleFocusNewPassword={handleFocusNewPassword}
            handleFocusConfirmPassword={handleFocusConfirmPassword}
            handleChangeConfirmPassword={handleChangeConfirmPassword}
            handleChangeRendered={handleChangeRendered}
            changeForgotPasswordFetch={handleSendNewPassword}
            isDisabled={isDisabled()}
            isLoading={isLoading}
            translate={translate}
            minPasswordEntropy={configs.password_min_entropy}
            currentPasswordEntropy={currentPasswordEntropy}
            passwordErrorFirstSolved={passwordErrorFirstSolved}
            passwordErrorSecondSolved={passwordErrorSecondSolved}
            passwordErrorThirdSolved={passwordErrorThirdSolved}
            newPasswordWrapper={newPasswordWrapper}
            newPasswordShow={newPasswordShow}
            renderCaptcha={renderCaptcha()}
            handleResendGenerateCode={configs.captcha_type !== 'none' ? useShowGeetestCaptcha : handleResendGenerateCode}
         />
      </LayoutAuth>
   )
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   changeForgotPassword: selectChangeForgotPasswordSuccess(state),
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
