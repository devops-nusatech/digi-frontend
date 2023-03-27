import { ReactElement, useState } from 'react';

export const useStep = (steps: ReactElement[]) => {
   const [currentStep, setCurrentStep] = useState(0);

   const nextStep = () =>
      setCurrentStep(index => {
         if (index >= steps.length - 1) return index;
         return index + 1;
      });

   const prevStep = () =>
      setCurrentStep(index => {
         if (index <= 0) return index;
         return index - 1;
      });

   const goToStep = (index: number) => setCurrentStep(index);

   return {
      currentStep,
      step: steps[currentStep],
      steps,
      isFirstStep: currentStep === 0,
      isLastStep: currentStep === steps.length - 1,
      nextStep,
      prevStep,
      goToStep,
   };
};

/**
 * Examples for
 *
 * const { steps, currentStep, step, isFirstStep, isLastStep, goToStep, nextStep, prevStep } = useStep([
 *    <Step1 />,
 *    <Step2 />,
 *    <Step3 />,
 * ])
 */
