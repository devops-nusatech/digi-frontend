import { useEffect } from 'react';
import {
   selectTransactions,
   selectTransactionsError,
   selectTransactionsloading,
   transactionsFetch,
} from 'modules';
import { useDispatch, useSelector } from 'react-redux';

export const useTransactionsFetch = () => {
   const transactions = useSelector(selectTransactions);
   const transactionsLoading = useSelector(selectTransactionsloading);
   const transactionsError = useSelector(selectTransactionsError);

   const dispatch = useDispatch();

   useEffect(() => {
      if (!transactions.length) {
         dispatch(transactionsFetch());
      }
   }, [dispatch, transactions]);

   return {
      transactions,
      transactionsLoading,
      transactionsError,
   };
};
