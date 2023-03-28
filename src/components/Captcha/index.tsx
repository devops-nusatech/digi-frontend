import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch } from 'react-redux';
import {
   GeetestCaptchaResponse,
   setGeetestCaptchaSuccess,
   setRecaptchaSuccess,
} from 'modules';
import { GeetestCaptchaV3 } from 'components';
import { captchaId, captchaType } from 'api';

export const CaptchaComponent = props => {
   const dispatch = useDispatch();

   let reCaptchaRef;
   reCaptchaRef = React.useRef();

   const handleRecaptchaChange = (value: string) => {
      dispatch(setRecaptchaSuccess({ captcha_response: value }));
   };

   const handleGeetestCaptchaChange = (value?: GeetestCaptchaResponse) => {
      dispatch(setGeetestCaptchaSuccess({ captcha_response: value }));
   };

   const renderCaptcha = () => {
      switch (captchaType()) {
         case 'recaptcha':
            return (
               <div className="pg-captcha--recaptcha">
                  <ReCAPTCHA
                     ref={reCaptchaRef}
                     sitekey={captchaId()}
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
