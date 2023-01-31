import { CommonError } from 'modules/types';
import { NEWS2_FETCH, NEWS2_DATA, NEWS2_ERROR } from './constants';
import { News } from 'modules';


export interface News2Fetch {
   type: typeof NEWS2_FETCH;
   payload?: {
      tag?: string;
      limit?: number;
   }
}

export interface News2Data {
   type: typeof NEWS2_DATA;
   payload: News[];
}

export interface News2Error {
   type: typeof NEWS2_ERROR;
   error: CommonError;
}
