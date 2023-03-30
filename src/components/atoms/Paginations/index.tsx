/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-globals */
import React, { useMemo } from 'react';
import { getPaginationItems } from 'helpers';
import { SVG } from 'components';
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
   const pageNums = useMemo(
      () => getPaginationItems(currentPage, lastPage, maxLength),
      [currentPage, lastPage, maxLength]
   );

   return (
      <ul
         className="flex items-center justify-center gap-1 px-2"
         aria-label="Pagination">
         <PageLink
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="hover:-translate-x-2">
            <SVG
               className="h-4 w-4 fill-neutral4"
               xlinkHref="arrow-prev"
            />
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
            onClick={() => setCurrentPage(currentPage + 1)}
            className="hover:translate-x-2">
            <SVG
               className="h-4 w-4 fill-neutral4"
               xlinkHref="arrow-next"
            />
         </PageLink>
      </ul>
   );
};

Paginations.defaultProps = {
   maxLength: 7,
};
