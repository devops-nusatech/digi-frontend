import React from 'react';

interface SwitchProps {
   onClick?: (e?: any) => void;
   checked?: boolean;
   readOnly?: boolean;
}

export const Switch = ({ checked, onClick, readOnly }: SwitchProps) => (
   <label onClick={onClick} className="flex items-center relative w-max cursor-pointer select-none">
      <input type="checkbox" checked={checked} readOnly={readOnly} className="switch appearance-none transition-colors duration-500 cursor-pointer w-10 h-5 rounded-5xl focus:outline-none bg-neutral6 dark:bg-neutral3 dark:checked:bg-primary1 checked:bg-primary1" />
      <span className="w-3 h-3 right-6 absolute rounded-full transform transition-transform bg-primary1" />
   </label>
)
