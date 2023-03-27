import { useEffect, useRef } from 'react';

export const useClickOutside = (handler: () => void) => {
   const domNode = useRef<HTMLDivElement>(null);
   const eventHandler = (e: any) => {
      if (domNode && !domNode.current?.contains(e.target)) handler();
   };
   useEffect(() => {
      document.addEventListener('mousedown', eventHandler);
      return () => document.removeEventListener('mousedown', eventHandler);
   }, []);

   return domNode;
};
