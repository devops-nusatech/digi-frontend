import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { memberLevelsFetch } from 'modules';

export const useMemberLevelFetch = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(memberLevelsFetch());
   }, [dispatch]);
};
