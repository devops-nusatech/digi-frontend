import React from 'react';

interface Props {
   className?: string;
   onClick?: () => void;
}

export const Logo = ({ className, onClick }: Props) => {
   return (
      <svg
         className={className}
         onClick={onClick}
         xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink"
         width="150"
         height="32"
         viewBox="0 0 150 32"
         fill="none"
      >
         <rect
            width="32"
            height="32"
            fill="url(#pattern0)"
         />
         <path
            d="M47.512 7.248C49.272 7.248 50.816 7.592 52.144 8.28C53.488 8.968 54.52 9.952 55.24 11.232C55.976 12.496 56.344 13.968 56.344 15.648C56.344 17.328 55.976 18.8 55.24 20.064C54.52 21.312 53.488 22.28 52.144 22.968C50.816 23.656 49.272 24 47.512 24H41.656V7.248H47.512ZM47.392 21.144C49.152 21.144 50.512 20.664 51.472 19.704C52.432 18.744 52.912 17.392 52.912 15.648C52.912 13.904 52.432 12.544 51.472 11.568C50.512 10.576 49.152 10.08 47.392 10.08H45.016V21.144H47.392ZM60.0831 9.12C59.4911 9.12 58.9951 8.936 58.5951 8.568C58.2111 8.184 58.0191 7.712 58.0191 7.152C58.0191 6.592 58.2111 6.128 58.5951 5.76C58.9951 5.376 59.4911 5.184 60.0831 5.184C60.6751 5.184 61.1631 5.376 61.5471 5.76C61.9471 6.128 62.1471 6.592 62.1471 7.152C62.1471 7.712 61.9471 8.184 61.5471 8.568C61.1631 8.936 60.6751 9.12 60.0831 9.12ZM61.7391 10.704V24H58.3791V10.704H61.7391ZM69.7868 10.488C70.7788 10.488 71.6508 10.688 72.4028 11.088C73.1548 11.472 73.7468 11.976 74.1788 12.6V10.704H77.5628V24.096C77.5628 25.328 77.3148 26.424 76.8188 27.384C76.3228 28.36 75.5788 29.128 74.5868 29.688C73.5948 30.264 72.3948 30.552 70.9868 30.552C69.0988 30.552 67.5468 30.112 66.3308 29.232C65.1308 28.352 64.4508 27.152 64.2908 25.632H67.6268C67.8028 26.24 68.1788 26.72 68.7548 27.072C69.3468 27.44 70.0588 27.624 70.8908 27.624C71.8668 27.624 72.6588 27.328 73.2668 26.736C73.8748 26.16 74.1788 25.28 74.1788 24.096V22.032C73.7468 22.656 73.1468 23.176 72.3788 23.592C71.6268 24.008 70.7628 24.216 69.7868 24.216C68.6668 24.216 67.6428 23.928 66.7148 23.352C65.7868 22.776 65.0508 21.968 64.5068 20.928C63.9788 19.872 63.7148 18.664 63.7148 17.304C63.7148 15.96 63.9788 14.768 64.5068 13.728C65.0508 12.688 65.7788 11.888 66.6908 11.328C67.6188 10.768 68.6508 10.488 69.7868 10.488ZM74.1788 17.352C74.1788 16.536 74.0188 15.84 73.6988 15.264C73.3788 14.672 72.9468 14.224 72.4028 13.92C71.8588 13.6 71.2748 13.44 70.6508 13.44C70.0268 13.44 69.4508 13.592 68.9228 13.896C68.3948 14.2 67.9628 14.648 67.6268 15.24C67.3068 15.816 67.1468 16.504 67.1468 17.304C67.1468 18.104 67.3068 18.808 67.6268 19.416C67.9628 20.008 68.3948 20.464 68.9228 20.784C69.4668 21.104 70.0428 21.264 70.6508 21.264C71.2748 21.264 71.8588 21.112 72.4028 20.808C72.9468 20.488 73.3788 20.04 73.6988 19.464C74.0188 18.872 74.1788 18.168 74.1788 17.352ZM82.0684 9.12C81.4764 9.12 80.9804 8.936 80.5804 8.568C80.1964 8.184 80.0044 7.712 80.0044 7.152C80.0044 6.592 80.1964 6.128 80.5804 5.76C80.9804 5.376 81.4764 5.184 82.0684 5.184C82.6604 5.184 83.1484 5.376 83.5324 5.76C83.9324 6.128 84.1324 6.592 84.1324 7.152C84.1324 7.712 83.9324 8.184 83.5324 8.568C83.1484 8.936 82.6604 9.12 82.0684 9.12ZM83.7244 10.704V24H80.3644V10.704H83.7244ZM85.7001 17.304C85.7001 15.96 85.9641 14.768 86.4921 13.728C87.0361 12.688 87.7641 11.888 88.6761 11.328C89.6041 10.768 90.6361 10.488 91.7721 10.488C92.7641 10.488 93.6281 10.688 94.3641 11.088C95.1161 11.488 95.7161 11.992 96.1641 12.6V10.704H99.5481V24H96.1641V22.056C95.7321 22.68 95.1321 23.2 94.3641 23.616C93.6121 24.016 92.7401 24.216 91.7481 24.216C90.6281 24.216 89.6041 23.928 88.6761 23.352C87.7641 22.776 87.0361 21.968 86.4921 20.928C85.9641 19.872 85.7001 18.664 85.7001 17.304ZM96.1641 17.352C96.1641 16.536 96.0041 15.84 95.6841 15.264C95.3641 14.672 94.9321 14.224 94.3881 13.92C93.8441 13.6 93.2601 13.44 92.6361 13.44C92.0121 13.44 91.4361 13.592 90.9081 13.896C90.3801 14.2 89.9481 14.648 89.6121 15.24C89.2921 15.816 89.1321 16.504 89.1321 17.304C89.1321 18.104 89.2921 18.808 89.6121 19.416C89.9481 20.008 90.3801 20.464 90.9081 20.784C91.4521 21.104 92.0281 21.264 92.6361 21.264C93.2601 21.264 93.8441 21.112 94.3881 20.808C94.9321 20.488 95.3641 20.04 95.6841 19.464C96.0041 18.872 96.1641 18.168 96.1641 17.352ZM107.438 24.216C106.35 24.216 105.374 24.024 104.51 23.64C103.646 23.24 102.958 22.704 102.446 22.032C101.95 21.36 101.678 20.616 101.63 19.8H105.014C105.078 20.312 105.326 20.736 105.758 21.072C106.206 21.408 106.758 21.576 107.414 21.576C108.054 21.576 108.55 21.448 108.902 21.192C109.27 20.936 109.454 20.608 109.454 20.208C109.454 19.776 109.23 19.456 108.782 19.248C108.35 19.024 107.654 18.784 106.694 18.528C105.702 18.288 104.886 18.04 104.246 17.784C103.622 17.528 103.078 17.136 102.614 16.608C102.166 16.08 101.942 15.368 101.942 14.472C101.942 13.736 102.15 13.064 102.566 12.456C102.998 11.848 103.606 11.368 104.39 11.016C105.19 10.664 106.126 10.488 107.198 10.488C108.782 10.488 110.046 10.888 110.99 11.688C111.934 12.472 112.454 13.536 112.55 14.88H109.334C109.286 14.352 109.062 13.936 108.662 13.632C108.278 13.312 107.758 13.152 107.102 13.152C106.494 13.152 106.022 13.264 105.686 13.488C105.366 13.712 105.206 14.024 105.206 14.424C105.206 14.872 105.43 15.216 105.878 15.456C106.326 15.68 107.022 15.912 107.966 16.152C108.926 16.392 109.718 16.64 110.342 16.896C110.966 17.152 111.502 17.552 111.95 18.096C112.414 18.624 112.654 19.328 112.67 20.208C112.67 20.976 112.454 21.664 112.022 22.272C111.606 22.88 110.998 23.36 110.198 23.712C109.414 24.048 108.494 24.216 107.438 24.216ZM120.036 24.216C118.948 24.216 117.972 24.024 117.108 23.64C116.244 23.24 115.556 22.704 115.044 22.032C114.548 21.36 114.276 20.616 114.228 19.8H117.612C117.676 20.312 117.924 20.736 118.356 21.072C118.804 21.408 119.356 21.576 120.012 21.576C120.652 21.576 121.148 21.448 121.5 21.192C121.868 20.936 122.052 20.608 122.052 20.208C122.052 19.776 121.828 19.456 121.38 19.248C120.948 19.024 120.252 18.784 119.292 18.528C118.3 18.288 117.484 18.04 116.844 17.784C116.22 17.528 115.676 17.136 115.212 16.608C114.764 16.08 114.54 15.368 114.54 14.472C114.54 13.736 114.748 13.064 115.164 12.456C115.596 11.848 116.204 11.368 116.988 11.016C117.788 10.664 118.724 10.488 119.796 10.488C121.38 10.488 122.644 10.888 123.588 11.688C124.532 12.472 125.052 13.536 125.148 14.88H121.932C121.884 14.352 121.66 13.936 121.26 13.632C120.876 13.312 120.356 13.152 119.7 13.152C119.092 13.152 118.62 13.264 118.284 13.488C117.964 13.712 117.804 14.024 117.804 14.424C117.804 14.872 118.028 15.216 118.476 15.456C118.924 15.68 119.62 15.912 120.564 16.152C121.524 16.392 122.316 16.64 122.94 16.896C123.564 17.152 124.1 17.552 124.548 18.096C125.012 18.624 125.252 19.328 125.268 20.208C125.268 20.976 125.052 21.664 124.62 22.272C124.204 22.88 123.596 23.36 122.796 23.712C122.012 24.048 121.092 24.216 120.036 24.216ZM139.906 17.064C139.906 17.544 139.874 17.976 139.81 18.36H130.09C130.17 19.32 130.506 20.072 131.098 20.616C131.69 21.16 132.418 21.432 133.282 21.432C134.53 21.432 135.418 20.896 135.946 19.824H139.57C139.186 21.104 138.45 22.16 137.362 22.992C136.274 23.808 134.938 24.216 133.354 24.216C132.074 24.216 130.922 23.936 129.898 23.376C128.89 22.8 128.098 21.992 127.522 20.952C126.962 19.912 126.682 18.712 126.682 17.352C126.682 15.976 126.962 14.768 127.522 13.728C128.082 12.688 128.866 11.888 129.874 11.328C130.882 10.768 132.042 10.488 133.354 10.488C134.618 10.488 135.746 10.76 136.738 11.304C137.746 11.848 138.522 12.624 139.066 13.632C139.626 14.624 139.906 15.768 139.906 17.064ZM136.426 16.104C136.41 15.24 136.098 14.552 135.49 14.04C134.882 13.512 134.138 13.248 133.258 13.248C132.426 13.248 131.722 13.504 131.146 14.016C130.586 14.512 130.242 15.208 130.114 16.104H136.426ZM145.791 13.464V19.896C145.791 20.344 145.895 20.672 146.103 20.88C146.327 21.072 146.695 21.168 147.207 21.168H148.767V24H146.655C143.823 24 142.407 22.624 142.407 19.872V13.464H140.823V10.704H142.407V7.416H145.791V10.704H148.767V13.464H145.791Z"
            fill="#23262F"
         />
         <defs>
            <pattern
               id="pattern0"
               patternContentUnits="objectBoundingBox"
               width="1"
               height="1"
            >
               <use
                  xlinkHref="#image0_3345_34210"
                  transform="scale(0.00389105)"
               />
            </pattern>
            <image
               id="image0_3345_34210"
               width="257"
               height="257"
               xlinkHref="data:image/png;base64,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"
            />
         </defs>
      </svg>
   );
};
