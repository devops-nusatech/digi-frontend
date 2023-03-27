export interface Notification {
   date: number;
   read: boolean;
   type: Type;
   detail: string;
   id_notif: string;
}

type Type =
   | 'security'
   | 'deposit'
   | 'withdrawal'
   | 'trade'
   | 'transfer'
   | 'alert'
   | 'news';
