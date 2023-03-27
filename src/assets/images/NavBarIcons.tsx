import * as React from 'react';

export const AvatarIcon = ({ fillColor }) => {
   return (
      <svg
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <path
            d="M12.1807 20.4697C9.30566 20.4697 6.76416 18.9977 5.28066 16.7897C5.31516 14.4897 9.88066 13.2247 12.1807 13.2247C14.4807 13.2247 19.0462 14.4897 19.0807 16.7897C17.5972 18.9977 15.0557 20.4697 12.1807 20.4697ZM12.1807 4.1397C13.0957 4.1397 13.9732 4.50318 14.6202 5.15018C15.2672 5.79718 15.6307 6.6747 15.6307 7.5897C15.6307 8.50469 15.2672 9.38222 14.6202 10.0292C13.9732 10.6762 13.0957 11.0397 12.1807 11.0397C11.2657 11.0397 10.3881 10.6762 9.74115 10.0292C9.09414 9.38222 8.73066 8.50469 8.73066 7.5897C8.73066 6.6747 9.09414 5.79718 9.74115 5.15018C10.3881 4.50318 11.2657 4.1397 12.1807 4.1397ZM12.1807 0.689697C10.6705 0.689697 9.17505 0.987154 7.7798 1.56508C6.38456 2.14301 5.11681 2.9901 4.04894 4.05797C1.89227 6.21464 0.680664 9.13971 0.680664 12.1897C0.680664 15.2397 1.89227 18.1648 4.04894 20.3214C5.11681 21.3893 6.38456 22.2364 7.7798 22.8143C9.17505 23.3922 10.6705 23.6897 12.1807 23.6897C15.2307 23.6897 18.1557 22.4781 20.3124 20.3214C22.4691 18.1648 23.6807 15.2397 23.6807 12.1897C23.6807 5.8302 18.5057 0.689697 12.1807 0.689697Z"
            fill={fillColor}
         />
      </svg>
   );
};

export const CloseIcon = ({ fillColor }) => {
   return (
      <svg
         width="10"
         height="6"
         viewBox="0 0 10 6"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <path
            d="M0.655151 1.34485L4.99998 5.34485L9.34481 1.34485"
            stroke={fillColor}
         />
      </svg>
   );
};

export const OpenIcon = ({ fillColor }) => {
   return (
      <svg
         width="10"
         height="6"
         viewBox="0 0 10 6"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <path
            d="M9.34479 5.34485L4.99996 1.34485L0.655132 5.34485"
            stroke={fillColor}
         />
      </svg>
   );
};
