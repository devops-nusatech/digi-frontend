export const useShowGeetestCaptcha = () => {
   const captchaObj = (window as any).captchaObj;
   if (captchaObj) {
      captchaObj.showCaptcha();
   }
   return captchaObj;
};
