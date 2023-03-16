import React from 'react';
interface Props {
   className?: string;
   onClick?: () => void;
}

export const IcCheck = ({ className, onClick }: Props) => (
   <svg
      className={className}
      onClick={onClick}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         d="M6 12.0039L10 16.0039L18 8.00391"
         stroke="#FCFCFD"
         stroke-width="2"
         stroke-miterlimit="10"
         stroke-linecap="round"
         stroke-linejoin="round"
      />
   </svg>
);
