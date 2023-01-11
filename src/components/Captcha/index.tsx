import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { GeetestCaptcha } from 'containers';
import { useSetShouldGeetestReset } from 'hooks';
import {
   GeetestCaptchaResponse,
   // GeetestCaptchaV4Response,
   selectConfigs,
   selectShouldGeetestReset,
   setGeetestCaptchaSuccess,
   setRecaptchaSuccess,
} from 'modules';
// import { GeetestCaptchaV4 } from 'components/atoms/GeetestCaptchaV4';

export const CaptchaComponent = props => {
   const dispatch = useDispatch();
   const configs = useSelector(selectConfigs);
   const shouldGeetestReset = useSelector(selectShouldGeetestReset);

   let reCaptchaRef;

   reCaptchaRef = React.useRef();
   const geetestCaptchaRef = React.useRef(null);

   React.useEffect(() => {
      if (props.error || props.success) {
         if (reCaptchaRef.current) {
            reCaptchaRef.current.reset();
         }
      }
   }, [props.error, props.success, reCaptchaRef]);

   useSetShouldGeetestReset(props.error, props.success, geetestCaptchaRef);

   const handleRecaptchaChange = (value: string) => {
      dispatch(setRecaptchaSuccess({ captcha_response: value }));
   };

   const handleGeetestCaptchaChange = (value?: GeetestCaptchaResponse) => {
      dispatch(setGeetestCaptchaSuccess({ captcha_response: value }));
   };

   // const handleGeetestCaptchaV4Change = (value: GeetestCaptchaV4Response) => {
   //    dispatch(setGeetestCaptchaSuccess({ captcha_response: value }));
   // };

   const renderCaptcha = () => {
      switch (configs.captcha_type) {
         case 'recaptcha':
            return (
               <div className="pg-captcha--recaptcha">
                  <ReCAPTCHA
                     ref={reCaptchaRef}
                     sitekey={configs.captcha_id}
                     onChange={handleRecaptchaChange}
                  />
               </div>
            );
         // case 'geetest':
         //    return <GeetestCaptchaV4 onSuccess={handleGeetestCaptchaV4Change} />;
         case 'geetest':
            return (
               <GeetestCaptcha
                  ref={geetestCaptchaRef}
                  shouldCaptchaReset={shouldGeetestReset}
                  onSuccess={handleGeetestCaptchaChange}
               />
            );
         default:
            return null;
      }
   };

   return renderCaptcha();
};

export const Captcha = React.memo(CaptchaComponent);
