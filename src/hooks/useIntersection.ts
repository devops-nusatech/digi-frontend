import { RefObject, useEffect } from 'react';

const listenerCallbacks = new WeakMap();

let observer: IntersectionObserver;

const handleIntersections = (entries: IntersectionObserverEntry[]) => {
   entries.forEach(entry => {
      if (listenerCallbacks.has(entry.target)) {
         const callback = listenerCallbacks.get(entry.target);

         if (entry.isIntersecting || entry.intersectionRatio > 0) {
            observer.unobserve(entry.target);
            listenerCallbacks.delete(entry.target);
            callback();
         }
      }
   });
};

const getIntersectionObserver = () => {
   if (observer === undefined) {
      observer = new IntersectionObserver(handleIntersections, {
         rootMargin: '100px',
         threshold: 0.15,
      });
   }
   return observer;
};

export const useIntersection = (ref: RefObject<any>, callback: () => void) => {
   useEffect(() => {
      const target = ref.current;
      const observer = getIntersectionObserver();
      listenerCallbacks.set(target, callback);
      observer.observe(target);

      return () => {
         listenerCallbacks.delete(target);
         observer.unobserve(target);
      };
   }, [ref, callback]);
};
