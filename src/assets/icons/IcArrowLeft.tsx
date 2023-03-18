import React from 'react';

interface Props {
   className?: string;
   onClick?: (e?: any) => void;
}

export const IcArrowLeft = ({ className, onClick }: Props) => (
   <svg
      className={className}
      onClick={onClick}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
         fillRule="evenodd"
         clipRule="evenodd"
         d="M18.9428 10.3905C19.4635 10.9112 19.4635 11.7554 18.9428 12.2761L15.219 16L18.9428 19.7239C19.4635 20.2446 19.4635 21.0888 18.9428 21.6095C18.4221 22.1302 17.5779 22.1302 17.0572 21.6095L12.3905 16.9428C11.8698 16.4221 11.8698 15.5779 12.3905 15.0572L17.0572 10.3905C17.5779 9.86983 18.4221 9.86983 18.9428 10.3905Z"
         fill="#23262F"
      />
   </svg>
);
