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
      <div className="relative h-6 z-20">
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
            className="!cursor-pointer !absolute !top-[12px] !inset-x-0 !border-none !bg-neutral6 dark:!bg-neutral3 !shadow-none !h-0.5"
         />
         <div className="absolute top-[10px] inset-x-0 flex justify-between pointer-events-none">
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
            <span className="w-0.5 h-1.5 bg-neutral6 dark:bg-neutral3 rounded-[2px]" />
         </div>
      </div>
   )
};

SliderPercent.defaultProps = {
   range: {
      min: 0,
      max: 100
   },
   start: 0,
   step: 10,
   tooltips: true,
   connect: [true, false],
   format: {
      to: (val) => `${val}%`,
      from: (val) => Number(val)
   }
}
