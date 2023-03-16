import React, { FC } from 'react';
import Nouislider, { NouisliderProps } from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import '../../../assets/styles/nouislider.css';

export const SliderPercent: FC<NouisliderProps> = ({
   instanceRef,
   range,
   start,
   step,
   tooltips,
   connect,
   onSlide,
   onChange,
   onUpdate,
   onStart,
   onSet,
   onEnd,
   format,
}) => {
   return (
      <div className="relative z-20 h-6">
         <Nouislider
            instanceRef={instanceRef}
            range={range}
            start={start}
            step={step}
            tooltips={tooltips}
            connect={connect}
            onSlide={onSlide}
            onChange={onChange}
            onUpdate={onUpdate}
            onStart={onStart}
            onSet={onSet}
            onEnd={onEnd}
            format={format}
            className="!absolute !inset-x-0 !top-[12px] !h-0.5 !cursor-pointer !border-none !bg-neutral6 !shadow-none dark:!bg-neutral3"
         />
         <div className="pointer-events-none absolute inset-x-0 top-[10px] flex justify-between">
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
            <span className="h-1.5 w-0.5 rounded-[2px] bg-neutral6 dark:bg-neutral3" />
         </div>
      </div>
   );
};

SliderPercent.defaultProps = {
   range: {
      min: 0,
      max: 100,
   },
   start: 0,
   step: 10,
   tooltips: true,
   connect: [true, false],
   format: {
      to: val => `${val}%`,
      from: val => Number(val),
   },
};
