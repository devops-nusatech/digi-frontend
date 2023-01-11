import React, { useEffect, useRef, useState } from 'react';
import { getRefObject } from 'helpers';
import { AccordionData } from '../types';
import './AccordionItem.css';

interface AccordionItemProps {
   data: AccordionData;
   isOpen: boolean;
   onClick: () => void;
}

export const AccordionItem = ({
   data: { title, content },
   isOpen,
   onClick
}: AccordionItemProps) => {
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
      <li className="border border-neutral7 [&:not(:first-of-type)]:border-t-0">
         <div className="w-full">
            <button
               className={`flex items-center w-full border-none outline-none text-lg after:content-[''] after:shrink-0 after:w-4.5 after:h-4.5 after:ml-auto after:icon-dropdown after:transition-transform after:ease-in-out after:duration-200 ${isOpen ? 'after:-rotate-180' : ''}`}
               onClick={onClick}
            >
               {title}
            </button>
         </div>
         <div className="accordion-item-container overflow-hidden" style={{ height }}>
            <div ref={contentRef} className="border-t border-neutral7 py-3.5 px-5">
               {content}
            </div>
         </div>
      </li>
   )
}
