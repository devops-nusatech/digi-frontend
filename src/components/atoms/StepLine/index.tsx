import React, { FC } from 'react';
import { classNames } from 'helpers';
import { TClassName } from '../types';

type StepLineProps = TClassName & {
   titles: string[];
   currentStep: number;
   /**
    * Render vertically
    * @default true;
    */
   isVertical?: boolean;
};

/**
 * @example const [currentStep, setCurrentStep] = useState(0);
 */
export const StepLine: FC<StepLineProps> = ({
   currentStep,
   titles,
   isVertical,
   className,
}) => {
   return (
      <div
         className={classNames(
            `lg-max:hidden ${
               isVertical
                  ? 'mr-auto w-54 shrink-0 space-y-6'
                  : 'flex flex-wrap space-x-6'
            }`
         )}>
         {titles.map((title, index) => (
            <div
               key={`StepLine-${index}`}
               className={classNames(
                  `relative flex h-12 ${
                     isVertical ? '' : 'w-54'
                  } items-center space-x-4 rounded-3xl px-2 font-dm leading-custom3 ${
                     index <= currentStep ? '' : 'text-neutral4'
                  } transition-all duration-300 [&:not(:last-child)]:after:absolute ${
                     isVertical
                        ? '[&:not(:last-child)]:after:left-5.75 [&:not(:last-child)]:after:top-full [&:not(:last-child)]:after:h-6 [&:not(:last-child)]:after:border-l-2'
                        : '[&:not(:last-child)]:after:-right-6 [&:not(:last-child)]:after:top-1/2 [&:not(:last-child)]:after:w-6 [&:not(:last-child)]:after:border-t-2'
                  } [&:not(:last-child)]:after:border-dashed [&:not(:last-child)]:after:border-neutral5 ${
                     index < currentStep
                        ? 'dark:[&:not(:last-child)]:after:border-neutral4'
                        : ''
                  } [&:not(:last-child)]:after:content-[''] ${
                     index < currentStep
                        ? 'bg-neutral8 shadow-step dark:bg-neutral2 dark:after:border-neutral4'
                        : ''
                  } ${className || ''}`
               )}>
               <div
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                     index <= currentStep
                        ? 'border-primary5 dark:border-chart1'
                        : 'border-neutral6 dark:border-neutral4'
                  } ${
                     index < currentStep
                        ? 'after:bidding__number after:bidding__number_dark'
                        : ''
                  } transition-all duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-full after:transition-opacity after:duration-200 after:content-['']`}>
                  {index + 1}
               </div>
               <div>{title}</div>
            </div>
         ))}
      </div>
   );
};

StepLine.defaultProps = {
   isVertical: true,
};
