import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNews, newsFetch } from 'modules';

export const useNewsFetch = () => {
   const news = useSelector(selectNews);
   const dispatch = useDispatch();

   useEffect(() => {
      if (navigator.onLine) {
         if (!news.length) dispatch(newsFetch());
      }
   }, [news, dispatch, navigator]);
}
