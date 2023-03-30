import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTier, selectTierLoading, tierFetch } from '../modules';

export const useMyTierFetch = () => {
   const tier = useSelector(selectTier);
   const tierLoading = useSelector(selectTierLoading);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(tierFetch());
   }, [dispatch]);
   return {
      tier,
      tierLoading,
   };
};
