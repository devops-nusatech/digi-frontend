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
         <div onClick={onClick} className="border-b border-neutral6 dark:border-neutral3 group-last:border-none relative flex items-center py-6 hover:text-primary1 text-base leading-normal font-medium cursor-pointer transition-colors duration-200">
            {withNumber && (
               <div className="shrink-0 w-10 text-neutral4 group-hover:text-primary1 transition-colors duration-300">
                  0{no}
               </div>
            )}
            <div className="grow">
               {title}
            </div>
            <div className="flex shrink-0 justify-center items-center w-6 ml-4">
               <svg className={`w-6 h-6 fill-neutral4 transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                  <use xlinkHref={`#icon-arrow-down`} />
               </svg>
            </div>
         </div>
         <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ height }}>
            <div ref={contentRef} className="pt-6 pl-10 text-neutral4">
               {content}
            </div>
         </div>
      </li>
   )
}
