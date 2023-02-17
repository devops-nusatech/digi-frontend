import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { airdropFetch, selectAirdrop, selectAirdropLoading } from '../modules';

export const useAirdropFetch = (id: string) => {
   const airdrop = useSelector(selectAirdrop);
   const airdropLoading = useSelector(selectAirdropLoading);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(airdropFetch({ id }));
   }, [dispatch]);
   return {
      airdrop,
      airdropLoading,
   }
};
