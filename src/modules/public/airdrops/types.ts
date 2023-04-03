export type Airdrop = {
   id: string;
   title: string;
   status: AirdropStatus;
   about: string;
   tier: string;
   social_media: SocialMedia;
   joined: number;
   price_pool: number;
   image: string;
   periods: Period[];
}

export type AirdropDetail = {
   amount_reward: number;
   reward_currency: string;
   verified_user: number;
   reff_status: boolean;
   reff_reward: number;
   reff_max: number;
   details: Details;
   id: string;
   title: string;
   status: string;
   user_joined: number;
   price_pool: number;
   user_max: number;
   image: string;
   requirement: Requirement;
   task: Task[];
   periods: Period[];
}

type Period = {
   phase: Phase;
   start: number;
   end: number;
   status: PeriodStatus;
}

export enum Phase {
   Airdrop = 'airdrop',
   Distribution = 'distribution',
   Listing = 'listing',
}

export enum PeriodStatus {
   Ended = 'ended',
   Runing = 'runing',
   Upcoming = 'upcoming',
}

type SocialMedia = {
   facebook: string;
   website: string;
   twitter: string;
   telegram: string;
}

enum AirdropStatus {
   Ended = 'ended',
   Running = 'running',
   Upcoming = 'upcoming',
}

type Details = {
   currency_id: string;
   about: string;
   facebook: string;
   twitter: string;
   website: string;
   white_paper: string;
   medium: string;
   telegram_group: string;
   instragam: string;
}

type Requirement = {
   tier: string;
   transaction: boolean;
   pair: string;
   vol: number;
}

type Task = {
   id_step: number;
   title: string;
   type: string;
   link: string;
   api_key: string;
   system_checking: string;
}
