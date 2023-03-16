import * as React from 'react';
import { PG_TITLE_PREFIX } from '../constants';

export const useDocumentTitle = (title: string) => {
   React.useEffect(() => {
      document.title = [PG_TITLE_PREFIX, title].join(': ');
   }, [title]);
};
