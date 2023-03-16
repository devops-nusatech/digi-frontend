import React, { FC } from 'react';

type LabelProps = {
   label: string;
   className?: string;
};

export const Label: FC<LabelProps> = ({ label, className, children }) => (
   <div className="leading-none">
      <label
         className={`text-xs text-neutral5 ${className} font-bold uppercase leading-none`}>
         {label} {children}
      </label>
   </div>
);
