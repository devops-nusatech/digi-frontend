import { RefObject, useEffect } from 'react';

export const useOnHoverOutside = (
   ref: RefObject<HTMLDivElement>,
   handler: (e?: any) => void
) => {
   useEffect(() => {
      const listener = (e: any) => {
         if (!ref.current || ref.current.contains(e.target)) return;
         handler(e);
      };
      document.addEventListener('mouseover', listener);
      return () => document.removeEventListener('mouseout', listener);
   }, [ref, handler]);
};
