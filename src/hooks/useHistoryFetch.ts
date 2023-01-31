import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchHistory } from '../modules';

export const useHistoryFetch = ({ core, currency, limit = 6, page = 0 }) => {
   const dispatch = useDispatch();

   React.useEffect(() => {
      dispatch(fetchHistory({ core, limit, currency, page }));
   }, [dispatch, core, currency, limit, page]);
};
