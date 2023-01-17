import React, {
   useCallback,
   useRef,
   useState
} from 'react';
import { useIntersection } from 'hooks';

type ImageProps = {
   src: string;
   alt: string;
   title: string;
   className: string;
}

export const Image = ({
   src,
   alt,
   title,
   className
}: ImageProps) => {
   const [isInView, setIsInView] = useState(false);
   const ref = useRef<HTMLDivElement>(null);

   const callback = useCallback(() => {
      setIsInView(true);
   }, [setIsInView]);

   useIntersection(ref, callback);

   return (
      <div ref={ref}>
         {isInView && (
            <img
               src={src}
               alt={alt}
               title={title}
               className={className}
            />
         )}
      </div>
   );
};
