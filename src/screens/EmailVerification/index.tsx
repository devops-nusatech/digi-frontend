import { History } from 'history';
import React, { FunctionComponent, useEffect, useState } from 'react';
// import { Button, Spinner } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../';
import { LayoutAuth, InputOtp } from 'components';
import { EMAIL_REGEX, setDocumentTitle } from 'helpers';
import {
   Configs,
   emailVerificationFetch,
   GeetestCaptchaResponse,
   GeetestCaptchaV4Response,
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
} from 'modules';
import { CommonError } from 'modules/types';

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
   configs: Configs;
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
   const initialMinute = 0,
      initialSeconds = 3;
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
      const { configs, captcha_response } = props;
      switch (configs.captcha_type) {
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
      const { configs, location, geetestCaptchaSuccess, reCaptchaSuccess } =
         props;
      if (
         location.state &&
         location.state.email &&
         !location.state.email.match(EMAIL_REGEX)
      ) {
         return true;
      }
      if (configs.captcha_type === 'recaptcha' && !reCaptchaSuccess) {
         return true;
      }
      if (configs.captcha_type === 'geetest' && !geetestCaptchaSuccess) {
         return true;
      }
      return false;
   };

   const {
      // emailVerificationLoading,
      // isMobileDevice
   } = props;

   const title = props.intl.formatMessage({
      id: 'page.header.register.modal.header',
   });
   const text = props.intl.formatMessage({
      id: 'page.header.register.modal.body',
   });
   const button = props.intl.formatMessage({ id: 'page.resendConfirmation' });

   return (
      <>
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
         <>
            {/* {!isMobileDevice && <div className="pg-emailverification-title">{title}</div>}
                     <div className="pg-emailverification-body">
                        <div className="pg-emailverification-body-text">{text}</div>
                        {this.renderCaptcha()}
                        {
                           !isMobileDevice && (
                              <div className="pg-emailverification-body-container">
                                 {emailVerificationLoading ? <Spinner animation="border" variant="primary" /> :
                                    <button className="pg-emailverification-body-container-button"
                                       onClick={this.handleClick}
                                       disabled={this.disableButton()}>{button}</button>}
                              </div>)
                        }
                        {isMobileDevice &&
                           (<div className="pg-emailverification-body-container">
                              <Button
                                 block={true}
                                 type="button"
                                 onClick={this.handleClick}
                                 size="lg"
                                 variant="primary"
                              >
                                 {this.props.intl.formatMessage({ id: 'page.mobile.reset.header' })}
                              </Button>
                           </div>)
                        }
                     </div> */}
         </>
      </>
   );
};

// class EmailVerificationComponentOld extends Component<Props> {
//    public componentDidMount() {
//       setDocumentTitle('Email verification');
//       if (!this.props.location.state) {
//          this.props.history.push('/login');
//       }
//    }

//    public translate = (id: string) => this.props.intl.formatMessage({ id });

//    public renderCaptcha = () => {
//       const { error, success } = this.props;
//       return <Captcha error={error} success={success} />;
//    };

//    public render() {
//       const {
//          // emailVerificationLoading,
//          // isMobileDevice
//       } = this.props;

//       const title = this.props.intl.formatMessage({ id: 'page.header.register.modal.header' });
//       const text = this.props.intl.formatMessage({ id: 'page.header.register.modal.body' });
//       const button = this.props.intl.formatMessage({ id: 'page.resendConfirmation' });

//       return (
//          <>
//             <LayoutAuth
//                txtHeader="Already have an account?"
//                to="/login" toTxt="Login"
//             >
//                <FormHeader
//                   title={title}
//                   subTitle={text}
//                />
//                <OTPInput
//                   className="flex mb-8 -mx-2 bg-neutral8"
//                   onChangeOTP={otp => console.log(`OTP => : ${otp}`)}
//                />
//                <div className="login__btns">
//                   <CountDown initialSeconds={5} />
//                   <button onClick={this.handleClick} className="button-stroke button-small login__button" disabled={this.disableButton()}>{button || 'Resend Code'}</button>
//                   <button className="button button-small login__button">Continue</button>
//                </div>
//             </LayoutAuth>
//             <>
//                {/* {!isMobileDevice && <div className="pg-emailverification-title">{title}</div>}
//                <div className="pg-emailverification-body">
//                   <div className="pg-emailverification-body-text">{text}</div>
//                   {this.renderCaptcha()}
//                   {
//                      !isMobileDevice && (
//                         <div className="pg-emailverification-body-container">
//                            {emailVerificationLoading ? <Spinner animation="border" variant="primary" /> :
//                               <button className="pg-emailverification-body-container-button"
//                                  onClick={this.handleClick}
//                                  disabled={this.disableButton()}>{button}</button>}
//                         </div>)
//                   }
//                   {isMobileDevice &&
//                      (<div className="pg-emailverification-body-container">
//                         <Button
//                            block={true}
//                            type="button"
//                            onClick={this.handleClick}
//                            size="lg"
//                            variant="primary"
//                         >
//                            {this.props.intl.formatMessage({ id: 'page.mobile.reset.header' })}
//                         </Button>
//                      </div>)
//                   }
//                </div> */}
//             </>
//          </>
//       );
//    }

//    private handleClick = () => {
//       const { configs, captcha_response } = this.props;

//       switch (configs.captcha_type) {
//          case 'recaptcha':
//          case 'geetest':
//             this.props.emailVerificationFetch({
//                email: this.props.location.state.email,
//                captcha_response,
//             });
//             break;
//          default:
//             this.props.emailVerificationFetch({
//                email: this.props.location.state.email,
//             });
//             break;
//       }

//       this.props.resetCaptchaState();
//    };

//    private disableButton = (): boolean => {
//       const {
//          configs,
//          location,
//          geetestCaptchaSuccess,
//          reCaptchaSuccess,
//       } = this.props;

//       if (location.state && location.state.email && !location.state.email.match(EMAIL_REGEX)) {
//          return true;
//       }

//       if (configs.captcha_type === 'recaptcha' && !reCaptchaSuccess) {
//          return true;
//       }

//       if (configs.captcha_type === 'geetest' && !geetestCaptchaSuccess) {
//          return true;
//       }

//       return false;
//    };
// }

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   emailVerificationLoading: selectSendEmailVerificationLoading(state),
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
};

export const EmailVerificationScreen = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(EmailVerificationComponentOld) as FunctionComponent;
