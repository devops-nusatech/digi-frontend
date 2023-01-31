import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNews2, news2Fetch, selectNews2Loading } from 'modules';

export const useNews2Fetch = (limit?: number, tag?: string) => {
   const dispatch = useDispatch();
   const news = useSelector(selectNews2);
   const newsLoadig = useSelector(selectNews2Loading);

   useEffect(() => {
      if (navigator.onLine) {
         dispatch(news2Fetch({ limit, tag }))
      }
   }, [dispatch, navigator, tag]);

   return {
      newsLoadig,
      news
   }
}
