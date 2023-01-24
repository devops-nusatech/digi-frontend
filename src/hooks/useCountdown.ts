import { useState, useEffect } from 'react';

export const useCountdown = (initialSeconds: number) => {
   const [minutes, setMinutes] = useState(0);
   const [seconds, setSeconds] = useState(initialSeconds);
   useEffect(() => {
      let myInterval = setInterval(() => {
         if (seconds > 0) {
            setSeconds(seconds - 1);
         }
         if (seconds === 0) {
            if (minutes === 0) {
               clearInterval(myInterval)
            } else {
               setMinutes(minutes - 1);
               setSeconds(59);
            }
         }
      }, 1000)
      return () => {
         clearInterval(myInterval);
      };
   });

   return {
      minutes,
      seconds
   }
}
