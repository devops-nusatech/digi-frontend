import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNews, newsFetch, selectNewsLoading } from 'modules';

export const useNewsFetch = (limit?: number, tag?: string) => {
   const dispatch = useDispatch();
   const news = useSelector(selectNews);
   const newsLoadig = useSelector(selectNewsLoading);

   useEffect(() => {
      if (navigator.onLine) {
         if (!news.length) dispatch(newsFetch({ limit, tag }));
      }
   }, [news, dispatch, navigator, tag]);

   return {
      newsLoadig,
      news
   }
}
