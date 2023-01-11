// import React from 'react';

// interface ICountdown {
//    minutes: number;
//    seconds: number;
// }

// export const CountDown = ({ minutes = 0, seconds = 60 }: ICountdown) => {
//    const [time, setTime] = React.useState<ICountdown>({ minutes, seconds });

//    const tick = () => {

//       if (time.minutes === 0 && time.seconds === 0)
//          reset()
//       else if (time.seconds === 0) {
//          setTime({ minutes: 59, seconds: 59 });
//       } else if (time.seconds === 0) {
//          setTime({ minutes: time.minutes - 1, seconds: 59 });
//       } else {
//          setTime({ minutes: time.minutes, seconds: time.seconds - 1 });
//       }
//    };

//    const reset = () => setTime({ minutes: time.minutes, seconds: time.seconds });

//    React.useEffect(() => {
//       const timerId = setInterval(() => tick(), 1000);
//       return () => clearInterval(timerId);
//    });

//    return (
//       <div className="text-blue font-bold text-sm">
//          {`${time.minutes
//             .toString()
//             .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}
//       </div>
//    );
// }


import React from 'react'
import { useState, useEffect } from 'react';

export const CountDown = (props: any) => {
   const { initialMinute = 0, initialSeconds = 0 } = props;
   const [minutes, setMinutes] = useState(initialMinute);
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

   return (
      <>
         {seconds !== 0 && minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
         }
      </>
   )
}
