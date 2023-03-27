import { useEffect } from 'react';

let listenerCallbacks = new WeakMap();

const handleIntersections = (entries: any[]) => {
   entries.forEach(entry => {
      if (!listenerCallbacks.has(entry.target)) return;

      let callback = listenerCallbacks.get(entry.target);

      if (!entry.isIntersecting) return;

      observer.unobserve(entry.target);
      listenerCallbacks.delete(entry.target);
      callback();
   });
};

let observer = new IntersectionObserver(handleIntersections, {
   rootMargin: '0px',
   threshold: 0.15,
});

export const useIntersection = (ref, callback: () => void) => {
   useEffect(() => {
      if (ref.current) {
         listenerCallbacks.set(ref.current, callback);
         observer.observe(ref.current);
      }

      return () => {
         listenerCallbacks.delete(ref.current);
         observer.unobserve(ref.current);
      };
   }, [ref, callback]);
};
