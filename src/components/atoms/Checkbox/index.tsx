import React, { FC } from 'react'

interface CheckboxProps {
   checked: boolean;
   onChecked: () => void;
   text?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
   checked,
   onChecked,
   children,
   text
}) => (
   <div
      className="relative inline-block cursor-pointer select-none group"
      onClick={onChecked}
   >
      <input
         className="absolute top-0 left-0 opacity-0"
         type="checkbox"
         checked={checked}
      />
      <span className="flex space-x-3">
         <span className={`relative shrink-0 w-6 h-6 rounded border-2 border-neutral6 group-hover:border-primary1 ${checked ? 'bg-primary1 border-primary1 before:opacity-100 animate-jelly' : ''} transition-all duration-200 checkbox_icon`} />
         <span className="font-normal leading-[1.71429] text-neutral4 transition-all duration-200">
            {text || children}
         </span>
      </span>
   </div>
)
