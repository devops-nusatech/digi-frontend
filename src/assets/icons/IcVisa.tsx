import React from 'react';

interface Props {
   className?: string;
   onClick?: () => void;
}

export const IcVisa = ({ className, onClick }: Props) => (
   <svg className={className} onClick={onClick} width="64" height="16" viewBox="0 0 64 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
         <path d="M29.896 13.072H27.2109L28.8904 2.6875H31.5754L29.896 13.072Z" fill="#00579F" />
         <path d="M39.6288 2.94211C39.0992 2.73199 38.2592 2.5 37.2205 2.5C34.5688 2.5 32.7016 3.91399 32.6901 5.93556C32.6681 7.42707 34.027 8.25549 35.0434 8.75281C36.0822 9.26099 36.4354 9.59269 36.4354 10.0457C36.4248 10.7413 35.5959 11.062 34.8229 11.062C33.7508 11.062 33.1764 10.8967 32.3035 10.5096L31.95 10.3437L31.5742 12.6748C32.204 12.9617 33.3642 13.2163 34.5688 13.2275C37.3862 13.2275 39.2205 11.8354 39.2422 9.68108C39.2529 8.49894 38.5353 7.59314 36.9883 6.85296C36.0492 6.37782 35.4741 6.05743 35.4741 5.57127C35.4851 5.12931 35.9605 4.67663 37.0206 4.67663C37.8935 4.65446 38.5349 4.86428 39.0208 5.07425L39.2636 5.18452L39.6288 2.94211Z" fill="#00579F" />
         <path d="M43.1973 9.39314C43.4184 8.79656 44.2693 6.48764 44.2693 6.48764C44.2581 6.50981 44.49 5.88005 44.6226 5.49345L44.8102 6.38824C44.8102 6.38824 45.3187 8.87394 45.4291 9.39314H43.1973ZM46.5117 2.6875H44.4348C43.7943 2.6875 43.3077 2.87515 43.0313 3.54911L39.043 13.0719H41.8604C41.8604 13.0719 42.3242 11.7902 42.4239 11.5141H45.8714C45.9484 11.8787 46.1917 13.0719 46.1917 13.0719H48.6779L46.5117 2.6875Z" fill="#00579F" />
         <path d="M24.9652 2.6875L22.3356 9.76873L22.0483 8.33258C21.5621 6.67544 20.0374 4.87499 18.3359 3.97976L20.7446 13.061H23.584L27.8045 2.6875H24.9652Z" fill="#00579F" />
         <path d="M19.8955 2.6875H15.5754L15.5312 2.89732C18.9012 3.75907 21.133 5.8363 22.05 8.33302L21.1108 3.56041C20.9562 2.89718 20.4811 2.70938 19.8955 2.6875Z" fill="#FAA61A" />
      </g>
      <defs>
         <clipPath id="clip0">
            <rect width="33.2121" height="10.7275" fill="white" transform="translate(15.5 2.5)" />
         </clipPath>
      </defs>
   </svg>

)
