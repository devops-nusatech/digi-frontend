import React from 'react';

interface Props {
   className?: string;
   onClick?: () => void;
}

export const IcMasterCard = ({ className, onClick }: Props) => (
   <svg
      className={className}
      onClick={onClick}
      width="64"
      height="16"
      viewBox="0 0 64 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
         d="M28.4453 1.71094H35.4453V14.2887H28.4453V1.71094Z"
         fill="#FF5F00"
      />
      <path
         d="M28.8889 8C28.8889 5.44444 30.0889 3.17778 31.9333 1.71111C30.5778 0.644447 28.8667 0 27 0C22.5778 0 19 3.57778 19 8C19 12.4222 22.5778 16 27 16C28.8667 16 30.5778 15.3556 31.9333 14.2889C30.0889 12.8444 28.8889 10.5556 28.8889 8Z"
         fill="#EB001B"
      />
      <path
         d="M44.8904 8C44.8904 12.4222 41.3126 16 36.8904 16C35.0237 16 33.3126 15.3556 31.957 14.2889C33.8237 12.8222 35.0015 10.5556 35.0015 8C35.0015 5.44444 33.8015 3.17778 31.957 1.71111C33.3126 0.644447 35.0237 0 36.8904 0C41.3126 0 44.8904 3.6 44.8904 8Z"
         fill="#F79E1B"
      />
   </svg>
);
