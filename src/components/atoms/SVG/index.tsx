import React, { SVGProps } from 'react';

export const SVG = (props: SVGProps<SVGSVGElement>) => (
   <svg
      className={props.className}
      {...props}>
      <use xlinkHref={`#icon-${props.xlinkHref}`} />
   </svg>
);
