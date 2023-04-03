import { CommonError } from '../../types';
import {
   AIRDROPS_DATA,
   AIRDROPS_ERROR,
   AIRDROPS_FETCH,
   AIRDROP_DATA,
   AIRDROP_ERROR,
   AIRDROP_FETCH
} from './constants';
import { Airdrop, AirdropDetail } from './types';

export interface AirdropsFetch {
   type: typeof AIRDROPS_FETCH;
}

export interface AirdropsData {
   type: typeof AIRDROPS_DATA;
   payload: Airdrop[];
}

export interface AirdropsError {
   type: typeof AIRDROPS_ERROR;
   error: CommonError;
}

export interface AirdropFetch {
   type: typeof AIRDROP_FETCH;
   payload: {
      id: string;
   }
}

export interface AirdropData {
   type: typeof AIRDROP_DATA;
   payload: AirdropDetail;
}

export interface AirdropError {
   type: typeof AIRDROP_ERROR;
   error: CommonError;
}

export type AirdropsAction =
   AirdropsFetch
   | AirdropsData
   | AirdropsError
   | AirdropFetch
   | AirdropData
   | AirdropError;

export const airdropsFetch = (): AirdropsFetch => ({
   type: AIRDROPS_FETCH,
});

export const airdropsData = (payload: AirdropsData['payload']): AirdropsData => ({
   type: AIRDROPS_DATA,
   payload,
});

export const airdropsError = (error: CommonError): AirdropsError => ({
   type: AIRDROPS_ERROR,
   error,
});

export const airdropFetch = (payload: AirdropFetch['payload']): AirdropFetch => ({
   type: AIRDROP_FETCH,
   payload
});

export const airdropData = (payload: AirdropData['payload']): AirdropData => ({
   type: AIRDROP_DATA,
   payload,
});

export const airdropError = (error: CommonError): AirdropError => ({
   type: AIRDROP_ERROR,
   error,
});
