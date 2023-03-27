import React, { FC } from 'react';

type LabelAltProps = {
   label: string;
};

export const LabelAlt: FC<LabelAltProps> = ({ label, children }) => (
   <div className="font-medium">{label || children}</div>
);
