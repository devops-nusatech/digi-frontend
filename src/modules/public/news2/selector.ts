import { RootState, News } from 'modules';
import { News2State } from './reducer';

const selectNews2State = (state: RootState): News2State => state.public.news2;
export const selectNews2 = (state: RootState): News[] => selectNews2State(state).list;
export const selectNews2Loading = (state: RootState): boolean | undefined => selectNews2State(state).loading;
export const selectNews2Timestamp = (state: RootState): number | undefined => selectNews2State(state).timestamp;
export const selectShouldFetchNews2 = (state: RootState): boolean => !selectNews2Timestamp(state) && !selectNews2Loading(state);
