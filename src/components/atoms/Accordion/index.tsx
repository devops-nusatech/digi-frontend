import React, { useCallback, useState } from 'react';
import { AccordionData } from '../types';
import { Item } from './Item';

type AccordionProps = {
   items: Array<AccordionData>;
   withNumber?: boolean;
};

export const Accordion = ({ items, withNumber }: AccordionProps) => {
   const [currentIndex, setCurrentIndex] = useState(-1);

   const handleOpen = useCallback((index: number) => {
      setCurrentIndex(currentValue => (currentValue !== index ? index : -1));
   }, []);

   return (
      <ul>
         {items.map((item, index) => (
            <Item
               key={index}
               data={item}
               no={index + 1}
               isOpen={index === currentIndex}
               onClick={() => handleOpen(index)}
               withNumber={withNumber}
            />
         ))}
      </ul>
   );
};

Accordion.defaultProps = {
   withNumber: true,
};
