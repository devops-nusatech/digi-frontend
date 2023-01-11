import { GeetestCaptchaV4Response } from 'modules';

export interface GeetestCaptchaV4Props {
   onSuccess: (res: GeetestCaptchaV4Response) => void;
}

type Products = 'float' | 'bind' | 'popup';
type Languages =
   'zho' // Chinese (Simplified)
   | 'eng' // English
   | 'zho-tw' // Chinese (Taiwan)
   | 'zho-hk' // Chinese (Hong Kong)
   | 'udm' // Uyghur
   | 'jpn' // Japanese
   | 'ind' // Indonesian
   | 'kor' // Korean
   | 'rus' // Russian
   | 'ara' // Arabic
   | 'spa' // Spanish
   | 'pon' // Portuguese (Brazil)
   | 'por' // Portuguese (Europe)
   | 'fra' // French
   | 'deu'; // German;

type Mask = {
   outSide?: boolean;
   bgColor?: string;
   color?: string;
}

export type GeetestCaptchaV4State = {
   config: {
      captchaId: string;
      product?: Products; // default: float
      bgColor?: string;
      nativeButton?: React.CSSProperties;
      rem?: number;
      language?: Languages;
      protocol?: string;
      outside?: boolean; // default: true
      timeout?: number;
      hideBar?: string[];
      mask?: Mask;
      apiServers?: string[];
      nextWidth?: string;
      riskType?: string;
      offlineCb?: () => void;
      onError?: () => void;
      hideSuccess?: boolean; // default: false
      userInfo?: string;
   },
   handler: (e: any) => void;
}
