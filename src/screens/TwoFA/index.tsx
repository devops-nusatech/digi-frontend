import React, {
   FunctionComponent,
   useEffect,
   useState
} from 'react';
import { withRouter } from 'react-router-dom';
import { Button, InputGroup, LayoutProfile, ProfileSidebar } from 'components';
import { injectIntl } from 'react-intl';
// import { RouterProps } from 'react-router';
import { compose } from 'redux';
import { copyToClipboard, setDocumentTitle } from '../../helpers';
import { alertPush, generate2faQRFetch, RootState, selectTwoFactorAuthBarcode, selectTwoFactorAuthQR, selectTwoFactorAuthSuccess, selectUserInfo, toggle2faFetch, User } from 'modules';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { IntlProps } from 'index';

interface RouterProps {
   history: History;
}

interface ReduxProps {
   user: User;
   barcode: string;
   qrUrl: string;
   success?: boolean;
}

interface DispatchProps {
   toggle2fa: typeof toggle2faFetch;
   generateQR: typeof generate2faQRFetch;
   fetchSuccess: typeof alertPush;
}

type Props = RouterProps & ReduxProps & DispatchProps & IntlProps;

const TwoFAFC = ({
   user,
   barcode,
   fetchSuccess,
   generateQR,
   history,
   intl,
   qrUrl,
   toggle2fa,
   success
}: Props) => {
   const [otpCode, setOtpCode] = useState<string>('');
   useEffect(() => {
      setDocumentTitle('Two factor authentication');
      if (!otp) {
         generateQR();
      }
   }, [user.otp]);

   const handleEnable2fa = () => {
      toggle2fa({
         code: otpCode,
         enable: true,
      });
      setOtpCode('');
   };

   const handleDisable2fa = () => {
      toggle2fa({
         code: otpCode,
         enable: false,
      });
      setOtpCode('');
   };

   const { otp } = user;

   const secretRegex = /secret=(\w+)/;
   const secretMatch = qrUrl.match(secretRegex);
   const secret = secretMatch ? secretMatch[1] : '';
   const submitHandler = !otp ? handleEnable2fa : handleDisable2fa;

   const renderTwoFactorAuthQR = (barcode: string) => {
      const src = `data:image/png;base64,${barcode}`;
      return barcode.length > 0 && <img className="w-full" src={src} alt="Qr code" title="Scan me" />;
   };

   const handleOnKeyPress = (e: React.KeyboardEvent) => {
      if (otpCode.length > 5) {
         if (e.key === 'Enter') {
            submitHandler();
         }
      }
   };

   const handleCopy = (url: string, type: string) => {
      copyToClipboard(url);
      fetchSuccess({ message: [`${type} Copied`], type: 'success' });
   }

   const renderIconCopied = (title: string) => (
      <button
         className="cursor-copy group"
         onClick={() => handleCopy(secret, title)}
         title="Copy referral"
      >
         <svg className="w-6 h-6 group-hover:scale-110 fill-neutral4 group-hover:fill-neutral3 dark:group-hover:fill-neutral5 transition-transform duration-200">
            <use xlinkHref="#icon-copy" />
         </svg>
      </button>
   );

   return (
      <LayoutProfile
         title="API keys"
         withBreadcrumbs={{
            display: 'Home',
            href: '/',
            active: 'TFA',
         }}
      >
         <ProfileSidebar />
         <div className="grow p-4 md:px-8 lg:p-10 shadow-card2 rounded-2xl bg-neutral8 dark:bg-shade1">
            <div className="mb-4 text-4.5xl leading-1.2 tracking-custom1 font-dm font-bold">
               2FA
               <span className={otp ? 'text-primary5' : 'text-primary4'}> {otp ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="mb-10 text-xs leading-custom4 text-neutral4">
               If you want to {!otp ? 'turn on' : 'turn off'} 2FA, input your the six-digit code provided by the Google Authenticator app below, then click <span className="font-semibold text-neutral3 dark:text-neutral5">" {!otp ? 'Enabled' : 'Disabled'} 2FA"</span>.
            </div>
            <div className="mb-2 text-2xl leading-custom2 font-semibold tracking-custom1">
               {!otp ? 'Enabled' : 'Disabled'} 2FA
            </div>
            <div className="mb-6 text-neutral3 dark:text-neutral5">
               {!otp ? 'Scan SQ code by the Google Authenticator app to Enable the 2FA verification.' : 'Enter your the six-digit code provided by the Google Authenticator app to Disable the 2FA verification'}
            </div>
            <div className="space-y-8" onKeyPress={handleOnKeyPress}>
               <div className="flex space-x-4">
                  {!otp && (
                     <InputGroup
                        label="mfa code"
                        placeholder="mfa code"
                        parentClassName="w-full"
                        className="truncate"
                        value={!otp && secret}
                        readOnly
                        icon={renderIconCopied('Referral code')}
                     />
                  )}
                  <InputGroup
                     autoFocus
                     label="2fa code"
                     placeholder="2fa code"
                     parentClassName="w-full"
                     value={otpCode}
                     onChange={setOtpCode}
                     maxLength={6}
                  />
               </div>
               {!otp && (
                  <div className="flex bg-neutral7 dark:bg-neutral2 rounded-2xl">
                     <div className="max-w-64 mt-16 mx-auto py-8 px-12 bg-neutral8 dark:bg-neutral3 rounded-t-5xl">
                        <div className="p-4 rounded-lg border-2 border-dashed border-primary1">
                           {!otp && renderTwoFactorAuthQR(barcode)}
                        </div>
                        <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" rel="noopener noreferrer" target="_blank">
                           <Button
                              text="Download app"
                              variant="outline"
                              className="mt-12"
                              width="noFull"
                           />
                        </a>
                     </div>
                  </div>
               )}
               <div className="text-center">
                  <Button
                     text={!otp ? 'Enabled 2FA' : 'Disabled 2FA'}
                     variant={otp ? 'orange' : 'green'}
                     onClick={submitHandler}
                     disabled={otpCode.length < 6}
                     width="noFull"
                  />
               </div>
            </div>
         </div>
      </LayoutProfile>
   )
}

const mapStateToProps: MapStateToProps<ReduxProps, Props, RootState> = state => ({
   user: selectUserInfo(state),
   qrUrl: selectTwoFactorAuthQR(state),
   barcode: selectTwoFactorAuthBarcode(state),
   success: selectTwoFactorAuthSuccess(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   generateQR: () => dispatch(generate2faQRFetch()),
   toggle2fa: ({ code, enable }) => dispatch(toggle2faFetch({ code, enable })),
   fetchSuccess: payload => dispatch(alertPush(payload)),
});

export const TwoFA = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(TwoFAFC) as FunctionComponent;