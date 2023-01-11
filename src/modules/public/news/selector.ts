import { RootState } from 'modules';
import { NewsState } from './reducer';
import { News } from './types';

const selectNewsState = (state: RootState): NewsState => state.public.news;
export const selectNews = (state: RootState): News[] => selectNewsState(state).list;
export const selectNewsLoading = (state: RootState): boolean | undefined => selectNewsState(state).loading;
export const selectNewsTimestamp = (state: RootState): number | undefined => selectNewsState(state).timestamp;
export const selectShouldFetchNews = (state: RootState): boolean => !selectNewsTimestamp(state) && !selectNewsLoading(state);
