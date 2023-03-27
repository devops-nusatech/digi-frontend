import React, { useEffect, useRef, useState } from 'react';
import { getRefObject } from 'helpers';
import { AccordionData } from '../types';

interface ItemProps {
   data: AccordionData;
   isOpen: boolean;
   onClick: () => void;
   no: number;
   withNumber?: boolean;
}

export const Item = ({
   data: { title, content },
   isOpen,
   onClick,
   no,
   withNumber,
}: ItemProps) => {
   const contentRef = useRef<HTMLDivElement>(null);
   const [height, setHeight] = useState(0);

   useEffect(() => {
      if (isOpen) {
         const contentEl = getRefObject(contentRef);
         setHeight(contentEl.scrollHeight);
      } else {
         setHeight(0);
      }
   }, [isOpen]);

   return (
      <li className="group">
         <div
            onClick={onClick}
            className="relative flex cursor-pointer items-center border-b border-neutral6 py-6 text-base font-medium leading-normal transition-colors duration-200 hover:text-primary1 group-last:border-none dark:border-neutral3">
            {withNumber && (
               <div className="w-10 shrink-0 text-neutral4 transition-colors duration-300 group-hover:text-primary1">
                  0{no}
               </div>
            )}
            <div className="grow">{title}</div>
            <div className="ml-4 flex w-6 shrink-0 items-center justify-center">
               <svg
                  className={`h-6 w-6 fill-neutral4 transition-all duration-200 ${
                     isOpen ? 'rotate-180' : ''
                  }`}>
                  <use xlinkHref={`#icon-arrow-down`} />
               </svg>
            </div>
         </div>
         <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ height }}>
            <div
               ref={contentRef}
               className="pt-6 pl-10 text-neutral4">
               {content}
            </div>
         </div>
      </li>
   );
};
