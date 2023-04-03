import { useReduxSelector } from 'hooks';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
   beneficiariesFetch,
   selectBeneficiariesActivateSuccess,
   selectBeneficiariesDeleteSuccess,
   selectUserInfo,
} from 'modules';

export const useBeneficiariesFetch = () => {
   const dispatch = useDispatch();
   const user = useReduxSelector(selectUserInfo);
   const beneficiariesActivateSuccess = useReduxSelector(
      selectBeneficiariesActivateSuccess
   );
   const beneficiariesDeleteSuccess = useReduxSelector(
      selectBeneficiariesDeleteSuccess
   );

   React.useEffect(() => {
      if (user.myTier?.benefit.withdraw_access === true) {
         dispatch(beneficiariesFetch());
      }
   }, [dispatch, user]);

   React.useEffect(() => {
      if (beneficiariesActivateSuccess || beneficiariesDeleteSuccess) {
         dispatch(beneficiariesFetch());
      }
   }, [dispatch, beneficiariesActivateSuccess, beneficiariesDeleteSuccess]);
};
