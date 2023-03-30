import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   membershipsFetch,
   selectMemberships,
   selectMembershipsLoading,
   selectShouldFetchMemberships,
} from '../modules';

export const useMembershipsFetch = () => {
   const shouldDispatch = useSelector(selectShouldFetchMemberships);
   const memberships = useSelector(selectMemberships);
   const membershipsLoading = useSelector(selectMembershipsLoading);
   const dispatch = useDispatch();

   React.useEffect(() => {
      if (shouldDispatch) {
         dispatch(membershipsFetch());
      }
   }, [dispatch, shouldDispatch]);
   return {
      memberships,
      membershipsLoading,
   };
};
