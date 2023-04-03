import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'modules';

export const useReduxSelector = <T>(selector: (state: RootState) => T): T =>
   useSelector(selector, shallowEqual);
