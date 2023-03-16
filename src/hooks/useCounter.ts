import { useEffect, useState } from 'react';

export const useCounter = (initial = 60) => {
   const [counter, setCounter] = useState(initial);

   useEffect(() => {
      const timer = counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : 0;
      return () => clearInterval(timer as NodeJS.Timeout);
   }, [counter]);

   return { counter, setCounter };
};
