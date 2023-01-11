export interface Configs {
   captcha_type: 'recaptcha' | 'geetest' | 'none';
   captcha_id?: string;
   password_min_entropy: number;
}

export interface Sonic {
   allowedRoles: string[];
   aml: string;
   balancesFetchInterval: string;
   captchaLogin: string | boolean;
   captcha_id: string;
   captcha_type: 'recaptcha' | 'geetest' | 'none';
   devMode: string | boolean;
   finex: string | boolean;
   gaTrackerKey: string;
   incrementalOrderBook: string | boolean;
   isDraggable: string | boolean;
   isResizable: string | boolean;
   kycSteps: string[];
   labelSwitcher: LabelSwitcher[];
   languages: string[];
   minutesBeforeWarningMessage: string;
   minutesUntilAutoLogout: string;
   msAlertDisplayTime: string;
   passwordEntropyStep: string | number;
   password_min_entropy: string | boolean;
   peatio_platform_currency: string;
   plugins: any[];
   rangerReconnectPeriod: string;
   roleTypes: RoleType[];
   sentryEnabled: string | boolean;
   sessionCheckInterval: string;
   showLanding: string | boolean;
   tablePageLimit: string;
   uploadMaxSize: number;
   uploadMinSize: number;
   usernameEnabled: string | boolean;
   withCredentials: string | boolean;
   wizard_step: string | boolean;
}

export interface LabelSwitcher {
   label: SonicLabel[];
   name: string;
   require_doc?: string;
}

export interface SonicLabel {
   email?: string;
   phone?: string;
   document?: string;
}

export interface RoleType {
   key: string;
   value: string;
}
