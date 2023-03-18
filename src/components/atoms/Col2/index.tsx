import React, { FC } from 'react';

export const Col2: FC = ({ children }) => (
   <div className="grid grid-cols-2 gap-x-4 gap-y-8">{children}</div>
);
