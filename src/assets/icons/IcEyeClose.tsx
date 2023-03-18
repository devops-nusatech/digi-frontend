import React, { FC } from 'react';

interface Props {
   className?: string;
   onClick?: () => void;
}

export const IcEyeClose: FC<Props> = (props: Props) => {
   return (
      <svg
         className={props.className}
         onClick={props.onClick}
         width="24"
         height="25"
         viewBox="0 0 24 25"
         fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.0001 18.0039C16.1256 18.0039 19.0593 15.4115 20.7773 13.2526C21.3732 12.5037 21.3732 11.5041 20.7773 10.7553C19.0593 8.59629 16.1256 6.00391 12.0001 6.00391C7.87457 6.00391 4.94086 8.59629 3.2228 10.7553C2.6269 11.5041 2.6269 12.5037 3.2228 13.2526C4.94086 15.4115 7.87457 18.0039 12.0001 18.0039ZM22.3423 14.4979C23.5182 13.0202 23.5182 10.9877 22.3423 9.50991C20.474 7.16216 17.0266 4.00391 12.0001 4.00391C6.97353 4.00391 3.52612 7.16216 1.65785 9.50991C0.481891 10.9876 0.48189 13.0202 1.65784 14.4979C3.52612 16.8456 6.97353 20.0039 12.0001 20.0039C17.0266 20.0039 20.474 16.8456 22.3423 14.4979Z"
         />
         <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 12.0039C14 13.1085 13.1046 14.0039 12 14.0039C10.8954 14.0039 10 13.1085 10 12.0039C10 11.9755 10.0006 11.9473 10.0018 11.9192C10.1577 11.9741 10.3253 12.0039 10.5 12.0039C11.3284 12.0039 12 11.3323 12 10.5039C12 10.3292 11.9701 10.1616 11.9153 10.0057C11.9434 10.0045 11.9716 10.0039 12 10.0039C13.1046 10.0039 14 10.8993 14 12.0039ZM16 12.0039C16 14.213 14.2091 16.0039 12 16.0039C9.79086 16.0039 8 14.213 8 12.0039C8 9.79477 9.79086 8.00391 12 8.00391C14.2091 8.00391 16 9.79477 16 12.0039Z"
         />
         <rect
            x="20.8282"
            y="3"
            width="2"
            height="26"
            rx="1"
            transform="rotate(46.3992 20.8282 3)"
         />
      </svg>
   );
};
