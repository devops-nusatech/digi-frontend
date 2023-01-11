import React, { useState } from 'react';
import { AccordionItem } from 'components';
import { AccordionData } from '../types';

type AccordionProps = {
   items: Array<AccordionData>
};

export const Accordion = ({ items }: AccordionProps) => {
   const [currentIndex, setCurrentIndex] = useState(-1);
   const handleOpen = (index: number) => setCurrentIndex(currentValue => currentValue !== index ? index : -1);

   return (
      <ul>
         {items.map((item, index) => (
            <AccordionItem
               key={index}
               data={item}
               isOpen={index === currentIndex}
               onClick={() => handleOpen(index)}
            />
         ))}
      </ul>
   )
}
