import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import {
   GeetestCaptchaResponse,
   selectConfigs,
   setGeetestCaptchaSuccess,
   setRecaptchaSuccess,
} from 'modules';
import { GeetestCaptchaV3 } from 'components';

export const CaptchaComponent = props => {
   const dispatch = useDispatch();
   const configs = useSelector(selectConfigs);

   let reCaptchaRef;
   reCaptchaRef = React.useRef();

   const handleRecaptchaChange = (value: string) => {
      dispatch(setRecaptchaSuccess({ captcha_response: value }));
   };

   const handleGeetestCaptchaChange = (value?: GeetestCaptchaResponse) => {
      dispatch(setGeetestCaptchaSuccess({ captcha_response: value }));
   };

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
         case 'geetest':
            return (
               <GeetestCaptchaV3
                  buttonRef={props.geetestCaptchaRef}
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
