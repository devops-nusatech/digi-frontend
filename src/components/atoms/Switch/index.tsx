import React from 'react';

interface SwitchProps {
   onClick?: (e?: any) => void;
   checked?: boolean;
   readOnly?: boolean;
}

export const Switch = ({ checked, onClick, readOnly }: SwitchProps) => (
   <label
      onClick={onClick}
      className="relative flex w-max cursor-pointer select-none items-center">
      <input
         type="checkbox"
         checked={checked}
         readOnly={readOnly}
         className="switch h-5 w-10 cursor-pointer appearance-none rounded-5xl bg-neutral6 transition-colors duration-500 checked:bg-primary1 focus:outline-none dark:bg-neutral3 dark:checked:bg-primary1"
      />
      <span className="absolute right-6 h-3 w-3 transform rounded-full bg-primary1 transition-transform" />
   </label>
);
