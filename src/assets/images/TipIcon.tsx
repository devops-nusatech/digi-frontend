import React, { FC } from 'react';
interface TipIconProps {
   className?: string;
   onClick?: (e?: any) => void;
   onMouseOver?: (e?: any) => void;
   onMouseOut?: (e?: any) => void;
}

export const TipIcon: FC<TipIconProps> = ({
   className,
   onClick,
   onMouseOver,
   onMouseOut,
}) => (
   <svg onClick={onClick} onMouseOver={onMouseOver} onMouseOut={onMouseOut} className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1C3.6916 1 1 3.69164 1 7.00004C1 10.3084 3.6916 13 7 13C10.3084 13 13 10.3084 13 7.00004C13 3.69164 10.3084 1 7 1ZM7 11.9091C4.29309 11.9091 2.09091 9.70691 2.09091 7.00004C2.09091 4.29316 4.29309 2.09091 7 2.09091C9.70691 2.09091 11.9091 4.29316 11.9091 7.00004C11.9091 9.70691 9.70687 11.9091 7 11.9091Z" strokeWidth="0.4" />
      <path d="M7.00008 3.54541C6.59913 3.54541 6.27295 3.87181 6.27295 4.27301C6.27295 4.67385 6.59913 4.99996 7.00008 4.99996C7.40102 4.99996 7.7272 4.67385 7.7272 4.27301C7.7272 3.87181 7.40102 3.54541 7.00008 3.54541Z" strokeWidth="0.4" />
      <path d="M6.9998 6.09082C6.69856 6.09082 6.45435 6.33504 6.45435 6.63627V9.909C6.45435 10.2102 6.69856 10.4545 6.9998 10.4545C7.30104 10.4545 7.54526 10.2102 7.54526 9.909V6.63627C7.54526 6.33504 7.30104 6.09082 6.9998 6.09082Z" strokeWidth="0.4" />
   </svg>
);
