import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { marketsFetch, selectShouldFetchMarkets } from 'modules';

export const useMarketsFetch = () => {
   const shouldDispatch = useSelector(selectShouldFetchMarkets);
   const dispatch = useDispatch();

   useEffect(() => {
      if (shouldDispatch) dispatch(marketsFetch());
   }, [dispatch, shouldDispatch]);
};
