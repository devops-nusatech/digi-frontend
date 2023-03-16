import * as React from 'react';

export const Moon = ({ fillColor }) => {
   return (
      <svg
         width="12"
         height="12"
         viewBox="0 0 12 12"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.924 8.38284C11.849 8.308 11.724 8.28306 11.624 8.33295C10.7741 8.80692 9.79917 9.05638 8.79926 9.05638C5.54953 9.05638 2.92475 6.43706 2.92475 3.19409C2.92475 2.2212 3.17473 1.24831 3.64969 0.375199C3.69969 0.275416 3.67469 0.150686 3.5997 0.0758482C3.5247 0.00101041 3.39971 -0.023935 3.29972 0.0259568C1.27489 1.17347 0 3.31882 0 5.63879C0 9.15616 2.84976 12 6.37446 12C8.69927 12 10.8491 10.7278 11.974 8.68219C12.024 8.58241 11.999 8.45768 11.924 8.38284Z"
            fill={fillColor}
         />
      </svg>
   );
};
