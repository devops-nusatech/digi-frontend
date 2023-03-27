import React from 'react';
import { getPaginationItems } from 'helpers';
import { PageLink } from '../PageLink';

export type PaginationsProps = {
   currentPage: number;
   lastPage: number;
   maxLength: number;
   setCurrentPage: (page: number) => void;
};

export const Paginations = ({
   currentPage,
   lastPage,
   maxLength,
   setCurrentPage,
}: PaginationsProps) => {
   const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

   return (
      <nav
         className="flex flex-wrap"
         aria-label="Pagination">
         <PageLink
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}>
            &lt;
         </PageLink>
         {pageNums.map((pageNum, index) => (
            <PageLink
               key={index}
               active={currentPage === pageNum}
               disabled={isNaN(pageNum)}
               onClick={() => setCurrentPage(pageNum)}>
               {!isNaN(pageNum) ? pageNum : '...'}
            </PageLink>
         ))}
         <PageLink
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage(currentPage + 1)}>
            &lt;
         </PageLink>
      </nav>
   );
};
