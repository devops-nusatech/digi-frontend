import React, { FC } from 'react'

type LabelAltProps = {
   label: string;
}

export const LabelAlt: FC<LabelAltProps> = ({
   label,
   children,
}) => (
   <div className="text-base font-medium leading-6" >
      {label || children}
   </div>
)
