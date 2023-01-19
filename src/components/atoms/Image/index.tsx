import React, {
   useCallback,
   useRef,
   useState
} from 'react';
import { useIntersection } from 'hooks';
import { Skeleton } from 'components';

type ImageProps = {
   src: string;
   srcSet?: string;
   alt: string;
   title: string;
   classNameParent?: string;
   className?: string;
   height?: number;
   width?: number;
}

export const Image = ({
   src,
   srcSet,
   alt,
   title,
   classNameParent,
   className,
   height,
   width
}: ImageProps) => {
   const [isInView, setIsInView] = useState(false);
   const ref = useRef<HTMLDivElement>(null);

   const callback = useCallback(() => {
      setIsInView(true);
   }, [setIsInView]);

   useIntersection(ref, callback);

   return (
      <div ref={ref} className={classNameParent}>
         {!isInView ? (
            <Skeleton height={height} width={width} />
         ) : (
            <img
               src={src}
               srcSet={srcSet}
               alt={alt}
               title={title}
               className={className}
            />
         )}
      </div>
   );
};
