import {
   useCallback,
   useEffect
} from 'react';
import {
   useDispatch,
   useSelector
} from 'react-redux';
import {
   BeneficiariesActivate,
   BeneficiariesCreate,
   BeneficiariesDelete,
   BeneficiariesResendPin,
   beneficiariesActivate,
   beneficiariesCreate,
   beneficiariesDelete,
   beneficiariesFetch,
   beneficiariesResendPin,
   selectBeneficiaries,
   selectBeneficiariesActivateData,
   selectBeneficiariesActivateError,
   selectBeneficiariesActivateLoading,
   selectBeneficiariesActivateSuccess,
   selectBeneficiariesCreate,
   selectBeneficiariesCreateError,
   selectBeneficiariesCreateLoading,
   selectBeneficiariesCreateSuccess,
   selectBeneficiariesDeleteError,
   selectBeneficiariesDeleteLoading,
   selectBeneficiariesDeleteSuccess,
   selectBeneficiariesFetchError,
   selectBeneficiariesFetchLoading,
   selectBeneficiariesFetchSuccess,
   selectBeneficiariesResendPinError,
   selectBeneficiariesResendPinLoading,
   selectBeneficiariesResendPinSuccess
} from 'modules';

export const useBeneficiaries = (currency_id?: string) => {
   const dispatch = useDispatch();

   const beneficiaries = useSelector(selectBeneficiaries);
   const fetchLoading = useSelector(selectBeneficiariesFetchLoading);
   const fetchSuccess = useSelector(selectBeneficiariesFetchSuccess);
   const fetchError = useSelector(selectBeneficiariesFetchError);

   const createData = useSelector(selectBeneficiariesCreate);
   const createLoading = useSelector(selectBeneficiariesCreateLoading);
   const createSuccess = useSelector(selectBeneficiariesCreateSuccess);
   const createError = useSelector(selectBeneficiariesCreateError);

   const activateData = useSelector(selectBeneficiariesActivateData);
   const activateLoading = useSelector(selectBeneficiariesActivateLoading);
   const activateSuccess = useSelector(selectBeneficiariesActivateSuccess);
   const activateError = useSelector(selectBeneficiariesActivateError);

   const deleteLoading = useSelector(selectBeneficiariesDeleteLoading);
   const deleteSuccess = useSelector(selectBeneficiariesDeleteSuccess);
   const deleteError = useSelector(selectBeneficiariesDeleteError);

   const resendLoading = useSelector(selectBeneficiariesResendPinLoading);
   const resendSuccess = useSelector(selectBeneficiariesResendPinSuccess);
   const resendError = useSelector(selectBeneficiariesResendPinError);

   const createBeneficiary = useCallback(({
      currency,
      blockchain_key,
      name,
      data,
      description,
   }: BeneficiariesCreate['payload']) => {
      dispatch(beneficiariesCreate({
         currency,
         blockchain_key,
         name,
         data,
         description,
      }));
   }, [
      dispatch,
      beneficiariesCreate
   ]);

   const activateBeneficiary = useCallback(({
      id,
      pin
   }: BeneficiariesActivate['payload']) => {
      dispatch(beneficiariesActivate({ id, pin }));
   }, [
      dispatch,
      beneficiariesActivate
   ]);

   const resendBeneficiary = useCallback(({ id }: BeneficiariesResendPin['payload']) => {
      dispatch(beneficiariesResendPin({ id }));
   }, [
      dispatch,
      beneficiariesResendPin,
   ]);

   const deleteBeneficiary = useCallback(({ id }: BeneficiariesDelete['payload']) => {
      dispatch(beneficiariesDelete({ id }));
   }, [
      dispatch,
      beneficiariesDelete,
   ]);

   const fetchBeneficiaries = useCallback(() => {
      dispatch(
         currency_id
            ? beneficiariesFetch({ currency_id })
            : beneficiariesFetch()
      );
   }, [
      currency_id,
      dispatch,
      beneficiariesFetch
   ]);

   useEffect(() => {
      fetchBeneficiaries();
   }, [dispatch]);

   useEffect(() => {
      if (
         activateSuccess ||
         deleteSuccess
      ) {
         fetchBeneficiaries();
      }
   }, [
      dispatch,
      activateSuccess,
      deleteSuccess
   ]);


   return {
      beneficiaries,
      fetchLoading,
      fetchSuccess,
      fetchError,

      createData,
      createLoading,
      createSuccess,
      createError,

      activateData,
      activateLoading,
      activateSuccess,
      activateError,

      deleteLoading,
      deleteSuccess,
      deleteError,

      resendLoading,
      resendSuccess,
      resendError,

      createBeneficiary,
      activateBeneficiary,
      resendBeneficiary,
      deleteBeneficiary,
   };
};
