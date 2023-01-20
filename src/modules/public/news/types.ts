import { CommonError } from 'modules/types';
import { NEWS_FETCH, NEWS_DATA, NEWS_ERROR } from './constants';

export interface News {
   id: string;
   uuid: string;
   title: string;
   slug: string;
   html: string;
   comment_id: string;
   feature_image: string;
   featured: boolean;
   visibility: string;
   email_recipient_filter: string;
   created_at: string;
   updated_at: string;
   published_at: string;
   custom_excerpt: string;
   codeinjection_head: string;
   codeinjection_foot: string;
   custom_template: string;
   canonical_url: string;
   url: string;
   excerpt: string;
   reading_time: number;
   access: boolean;
   send_email_when_published: boolean;
   og_image: string;
   og_title: string;
   og_description: string;
   twitter_image: string;
   twitter_title: string;
   twitter_description: string;
   meta_title: string;
   meta_description: string;
   email_subject: string;
}

export interface NewsFetch {
   type: typeof NEWS_FETCH;
   payload?: {
      limit?: number;
      next?: number;
      page?: number;
      pages?: number;
      prev?: number | null;
      total?: number;
   }
}

export interface NewsData {
   type: typeof NEWS_DATA;
   payload: News[];
}

export interface NewsError {
   type: typeof NEWS_ERROR;
   error: CommonError;
}
