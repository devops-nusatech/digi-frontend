import { RootState } from 'modules';

export const selectConfigsLoading = (state: RootState): boolean =>
   state.public.configs.loading;
