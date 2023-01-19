import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShouldFetchNews, newsFetch } from 'modules';

export const useNewsFetch = () => {
   const shouldDispatch = useSelector(selectShouldFetchNews);
   const dispatch = useDispatch();

   useEffect(() => {
      if (navigator.onLine) {
         if (shouldDispatch) dispatch(newsFetch());
      }
   }, [shouldDispatch, dispatch, navigator]);
}
