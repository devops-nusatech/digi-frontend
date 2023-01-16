export const useShowGeetestCaptcha = () => {
   const captchaObj = (window as any).captchaObj;
   if (captchaObj) {
      captchaObj.showCaptcha();
      captchaObj.verify();
   }
   return captchaObj
}
