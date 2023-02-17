import { useEffect } from 'react';
import {
   useDispatch,
   useSelector
} from 'react-redux';
import {
   airdropsFetch,
   selectAirdrops,
   selectAirdropsLoading,
   selectShouldFetchAirdrops
} from 'modules';

export const useAirdropsFetch = () => {
   const shouldDispatch = useSelector(selectShouldFetchAirdrops);
   const airdrops = useSelector(selectAirdrops);
   const airdropsLoading = useSelector(selectAirdropsLoading);
   const dispatch = useDispatch();

   useEffect(() => {
      if (shouldDispatch) {
         dispatch(airdropsFetch());
      }
   }, [dispatch, shouldDispatch]);
   return {
      airdrops,
      airdropsLoading,
   }
};
