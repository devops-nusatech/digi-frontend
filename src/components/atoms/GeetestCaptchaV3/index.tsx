import React, { RefObject, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   GeetestCaptchaResponse,
   geetestCaptchaFetch,
   selectCaptchaKeys,
   selectCurrentLanguage,
} from 'modules';
import { captchaLogin } from 'api';
import { initGeetest } from '../../../helpers/geetest';

interface GeetestProps {
   buttonRef: RefObject<HTMLButtonElement>;
   onSuccess: (e: GeetestCaptchaResponse) => void;
}

export const GeetestCaptchaV3 = ({ buttonRef, onSuccess }: GeetestProps) => {
   const dispatch = useDispatch();

   const lang = useSelector(selectCurrentLanguage);
   const geetestCaptchaKeys = useSelector(selectCaptchaKeys);

   useEffect(() => {
      if (captchaLogin() === true) {
         dispatch(geetestCaptchaFetch());
      }
   }, [dispatch]);

   useEffect(() => {
      if (captchaLogin() === true) {
         initGeetest(
            {
               gt: geetestCaptchaKeys && geetestCaptchaKeys?.gt,
               challenge: geetestCaptchaKeys && geetestCaptchaKeys?.challenge,
               offline: false,
               new_captcha: false,
               product: 'bind',
               lang,
               https: true,
               hideClose: true,
            },
            handlerForBind
         );
      }
   }, [geetestCaptchaKeys]);

   const handlerForBind = useCallback(
      async (c: any) => {
         const button = buttonRef && buttonRef?.current;
         let isReady = false;

         c.onReady(() => {
            console.log('Ready to display');
            isReady = true;
         });

         button?.addEventListener('click', () => {
            console.log('before ready: btn clicked');
            if (isReady) {
               c.verify();
            }
         });

         c.onSuccess(async () => {
            onSuccess(c.getValidate());
         });

         c.onError(
            e => {
               console.log('err', e);
            },
            function () {
               c.reset();
            }
         );
      },
      [buttonRef, onSuccess]
   );

   return <></>;
};
