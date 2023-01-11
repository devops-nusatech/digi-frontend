import { useState, useRef, useEffect } from 'react';

export const useDropdown = () => {
   const [dropdown, setDropdown] = useState<boolean>(false);
   const refDropdwon = useRef<HTMLDivElement>(null);
   const handleSetDropdown = () => setDropdown(!dropdown);
   const handleOutsideDropdown = (e: any) => {
      if (refDropdwon && !refDropdwon?.current?.contains(e.target)) setDropdown(false);
   }
   useEffect(() => {
      document.addEventListener('mousedown', handleOutsideDropdown);
      return () => document.removeEventListener('mousedown', handleOutsideDropdown);
   }, []);
   return { dropdown, refDropdwon, handleSetDropdown };
};
