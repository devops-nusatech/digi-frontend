import React, {
   RefObject,
   useEffect
} from 'react';
import {
   useDispatch,
   useSelector
} from 'react-redux';
import { initGeetest } from 'helpers/geetest';
import {
   GeetestCaptchaResponse,
   geetestCaptchaFetch,
   selectCaptchaKeys,
   selectCurrentLanguage
} from 'modules';

interface GeetestCaptchaV3Props {
   buttonRef: RefObject<HTMLButtonElement>;
   onSuccess: (e: GeetestCaptchaResponse) => void;
}

export const GeetestCaptchaV3 = ({
   buttonRef,
   onSuccess,
}: GeetestCaptchaV3Props) => {
   const dispatch = useDispatch();

   const lang = useSelector(selectCurrentLanguage);
   const geetestCaptchaKeys = useSelector(selectCaptchaKeys);

   useEffect(() => {
      dispatch(geetestCaptchaFetch())
   }, []);

   useEffect(() => {
      initGeetest({
         gt: geetestCaptchaKeys && geetestCaptchaKeys?.gt,
         challenge: geetestCaptchaKeys && geetestCaptchaKeys?.challenge,
         offline: false,
         new_captcha: false,
         product: 'bind',
         lang: lang,
         https: true,
      }, handlerForBind);
   }, [geetestCaptchaKeys]);

   const handlerForBind = async (c: any) => {
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

      c.onError(e => {
         console.log('err', e)
      });

   }

   return <></>
}
