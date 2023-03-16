import React from 'react';

interface Props {
   className?: string;
   onClick?: () => void;
}

export const IllusChart = ({ className, onClick }: Props) => (
   <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="81"
      height="40"
      viewBox="0 0 81 40"
   >
      <g
         fill="none"
         transform="translate(.5)"
      >
         <path
            fill="#FF6838"
            d="M0,40.0000169 C0,34.7471169 1.03463,29.5457169 3.04482,24.6927169 C5.055,19.8396169 8.0014,15.4301169 11.7157,11.7157169 C15.4301,8.00139694 19.8396,5.05501694 24.6927,3.04482694 C29.5457,1.03464694 34.7471,1.693818e-05 40,1.693818e-05 C45.2529,1.693818e-05 50.4543,1.03464694 55.3074,3.04484694 C60.1604,5.05503694 64.5699,8.00141694 68.2843,11.7157169 C71.9986,15.4301169 74.945,19.8397169 76.9552,24.6927169 C78.9654,29.5457169 80,34.7472169 80,40.0000169 L72,40.0000169 C72,35.7977169 71.1723,31.6366169 69.5642,27.7541169 C67.956,23.8717169 65.5989,20.3441169 62.6274,17.3726169 C59.656,14.4011169 56.1283,12.0440169 52.2459,10.4359169 C48.3635,8.82772694 44.2023,8.00001694 40,8.00001694 C35.7977,8.00001694 31.6366,8.82771694 27.7541,10.4359169 C23.8717,12.0440169 20.3441,14.4011169 17.3726,17.3726169 C14.4011,20.3441169 12.044,23.8717169 10.4359,27.7541169 C8.8277,31.6365169 8,35.7977169 8,40.0000169 L0,40.0000169 Z"
         />
         <path
            fill="#FFB45D"
            d="M0,40.0000169 C0,32.6133169 2.04543,25.3708169 5.9096,19.0753169 C9.7737,12.7799169 15.3056,7.67742694 21.8921,4.33346694 C28.4786,0.989496938 35.8624,-0.465329062 43.2251,0.130243938 C50.5878,0.725815938 57.6418,3.34852694 63.6052,7.70765694 L58.8841,14.1661169 C54.1134,10.6788169 48.4702,8.58065694 42.5801,8.10419694 C36.6899,7.62773694 30.7829,8.79159694 25.5137,11.4668169 C20.2445,14.1419169 15.8189,18.2239169 12.7276,23.2603169 C9.6363,28.2966169 8,34.0906169 8,40.0000169 L0,40.0000169 Z"
         />
         <path
            fill="#58BD7D"
            d="M0,40.0000169 C0,32.1930169 2.2846,24.5566169 6.5722,18.0323169 C10.8597,11.5080169 16.9628,6.38104694 24.1289,3.28340694 L27.3032,10.6267169 C21.5702,13.1048169 16.6878,17.2064169 13.2577,22.4259169 C9.8277,27.6453169 8,33.7544169 8,40.0000169 L0,40.0000169 Z"
         />
         <circle
            cx="6.25"
            cy="27.5"
            r="2.5"
            fill="#FCFCFD"
         />
      </g>
   </svg>
);
