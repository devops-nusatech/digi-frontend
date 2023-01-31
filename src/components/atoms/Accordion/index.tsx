import React, { useState } from 'react';
import { AccordionData } from '../types';
import { Item } from './Item';

type AccordionProps = {
   items: Array<AccordionData>
};

export const Accordion = ({ items }: AccordionProps) => {
   const [currentIndex, setCurrentIndex] = useState(-1);
   const handleOpen = (index: number) => setCurrentIndex(currentValue => currentValue !== index ? index : -1);

   return (
      <ul>
         {items.map((item, index) => (
            <Item
               key={index}
               data={item}
               no={index + 1}
               isOpen={index === currentIndex}
               onClick={() => handleOpen(index)}
            />
         ))}
      </ul>
   )
}
