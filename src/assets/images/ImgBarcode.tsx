import { ImageProps } from 'assets/types';
import React from 'react';

export const ImgBarcode = ({ className, onClick }: ImageProps) => (
   <svg className={className} onClick={onClick} width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="128" height="128" rx="8" fill="#E6E8EC" />
      <rect x="40" y="40" width="48" height="48" fill="url(#pattern0)" />
      <rect x="21.5" y="15.5" width="4" height="4" fill="#23262F" />
      <rect x="15.5" y="15.5" width="4" height="8" fill="#23262F" />
      <rect width="4" height="4" transform="matrix(-1 0 0 1 106.5 15.5)" fill="#23262F" />
      <rect width="4" height="8" transform="matrix(-1 0 0 1 112.5 15.5)" fill="#23262F" />
      <rect x="106.5" y="111.5" width="4" height="4" transform="rotate(-180 106.5 111.5)" fill="#23262F" />
      <rect x="112.5" y="111.5" width="4" height="8" transform="rotate(-180 112.5 111.5)" fill="#23262F" />
      <rect width="4" height="4" transform="matrix(1 0 0 -1 21.5 111.5)" fill="#23262F" />
      <rect width="4" height="8" transform="matrix(1 0 0 -1 15.5 111.5)" fill="#23262F" />
      <defs>
         <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_4949_40899" transform="scale(0.00389105)" />
         </pattern>
         <image id="image0_4949_40899" width="257" height="257" xlinkHref="data:image/png;base64,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" />
      </defs>
   </svg>

)