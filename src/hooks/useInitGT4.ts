import { RefObject, useEffect, useState } from 'react';
import { GT4Init, removeElement } from 'helpers';
import { toast } from 'react-toastify';
import { GeetestCaptchaV4Response } from 'modules';

export const useInitGT4 = (buttonRef: RefObject<HTMLButtonElement>) => {
   const [response, setResponse] = useState<GeetestCaptchaV4Response>();

   useEffect(() => {
      GT4Init();

      //  @ts-ignore
      initGeetest4(
         {
            captchaId: 'c0034922a8c6cc91b2cf3afb30aeee40',
            product: 'bind',
            language: 'eng',
            protocol: 'https://',
            onError: (err: any) => toast.error(err.msg),
         },
         handlerForBind
      );
   }, []);

   const removeElements = () => {
      removeElement('geetest_footer_right');
      removeElement('geetest_feedback');
      removeElement('geetest_close');
   };

   const handlerForBind = async captchaObj => {
      const button = buttonRef.current;
      let isReady = false;

      captchaObj.onReady(() => {
         console.log('Ready to display');
         isReady = true;
         removeElements();
      });

      button?.addEventListener('click', () => {
         console.log('before ready: btn clicked');

         if (isReady) {
            captchaObj.showCaptcha();
         }
      });

      captchaObj.onSuccess(async () => {
         setResponse(captchaObj.getValidate());
      });

      captchaObj.onError(e => {
         toast.error(e.msg);
         captchaObj.reset();
      });

      captchaObj.onClose(() => {
         toast.error('Captcha Closed!');
         captchaObj.reset();
      });

      captchaObj.onFail(() => {
         toast.error('Captcha Failed!');
         captchaObj.reset();
      });
   };

   return {
      response,
   };
};
