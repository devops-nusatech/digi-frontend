import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { withdrawLimitFetch } from 'modules';

export const useWithdrawLimitFetch = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(withdrawLimitFetch());
   }, [dispatch]);
};
