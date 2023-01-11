import React, { FC } from 'react'

type LabelProps = {
   label: string;
   className?: string;
}

export const Label: FC<LabelProps> = ({
   label,
   className,
   children,
}) => (
   <div className="leading-none">
      <label className={`text-xs text-neutral5 ${className} leading-none font-bold uppercase`}>
         {label} {children}
      </label>
   </div>
)
