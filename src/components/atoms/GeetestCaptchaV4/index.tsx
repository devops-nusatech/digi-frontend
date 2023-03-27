import * as React from 'react';
import { removeElement } from 'helpers';
import {
   GeetestCaptchaV4Props as Props,
   GeetestCaptchaV4State as State,
} from './types';
import { GeetestCaptchaV4Response } from 'modules';
import { toast } from 'react-toastify';

const Geetest: React.FC = (props: any) => {
   React.useEffect(() => {
      if ((window as any).initGeetest4) {
         (window as any).initGeetest4(
            (props as any)['captcha-config'].config,
            (props as any)['captcha-config'].handler
         );
      }
   }, []);
   return <></>;
};

export class GeetestCaptchaV4 extends React.Component<Props, State> {
   protected readonly captchaConfig: Readonly<State>;
   public constructor(props: Readonly<Props>) {
      super(props);
      this.captchaConfig = {
         config: {
            captchaId: 'c0034922a8c6cc91b2cf3afb30aeee40',
            product: 'bind',
            language: 'eng',
            protocol: 'https://',
         },
         handler: this.captchaHandler.bind(this),
      };
      this.action = this.action.bind(this);
      this.validate = this.validate.bind(this);
   }
   public render() {
      return (
         <div
            id="geetestCaptcha"
            className={`${
               this.captchaConfig.config.product === 'bind' ? 'hidden' : null
            }`}>
            <Geetest captcha-config={this.captchaConfig} />
         </div>
      );
   }

   private action = () => {
      if (this.captchaConfig.config.product === 'bind') {
         if ((window as any).captchaObj) {
            (window as any).captchaObj.showCaptcha();
         } else {
            toast.error('Action Failed');
            return false;
         }
      } else {
         this.validate();
      }
      return false;
   };

   private validate = () => {
      const result: GeetestCaptchaV4Response = (
         window as any
      ).captchaObj.getValidate();
      if (!result) {
         console.log('Result is not valid');
         return;
      }
      this.props.onSuccess(result);
   };

   private captchaHandler = (captchaObj: any) => {
      (window as any).captchaObj = captchaObj;
      captchaObj
         .appendTo('#geetestCaptcha')
         .onReady(() => {
            console.log('Ready to display');
            removeElement('geetest_footer_right');
            removeElement('geetest_feedback');
            removeElement('geetest_close');
         })
         .onNextReady(() => {
            console.log('On Next Request');
            removeElement('geetest_footer_right');
            removeElement('geetest_feedback');
            removeElement('geetest_close');
         })
         .onBoxShow(() => {
            console.log('On Box Show');
            removeElement('geetest_footer_right');
            removeElement('geetest_feedback');
            removeElement('geetest_close');
         })
         .onError(() => {
            console.log('On Error');
         })
         .onSuccess(
            () => {
               if (this.captchaConfig.config.product === 'bind') {
                  this.validate();
               }
            },
            (data: { status: 'fail' }) => {
               if (data.status === 'fail') {
                  captchaObj.reset();
               }
            }
         );
   };
}
