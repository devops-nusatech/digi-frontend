import React, { useCallback, useEffect, useRef } from 'react';
import { FlexCenter, SVG } from 'components';
import { Membership } from 'modules';

interface TierCardProps {
   tier: Membership['tier'];
   memberships: Membership[];
}

const handler = (
   entries: IntersectionObserverEntry[],
   observer: IntersectionObserver
) => {
   for (const entry of entries) {
      if (entry.intersectionRatio >= 1) {
         console.log('i Am visible', entry.target.textContent);
      }
   }
};

const options: IntersectionObserverInit = {
   root: null,
   rootMargin: '0px',
   threshold: 1.0,
};

const getObserver = (
   ref: React.MutableRefObject<IntersectionObserver | null>
) => {
   let observer = ref.current;
   if (observer !== null) {
      return observer;
   }
   let newObserver = new IntersectionObserver(handler, options);
   ref.current = newObserver;
   return newObserver;
};

export const TierCard = ({ tier, memberships }: TierCardProps) => {
   const refs = useRef<HTMLDivElement[]>([]);
   const observer = useRef<IntersectionObserver>(null);
   const addNode = useCallback((node: HTMLDivElement) => {
      refs.current.push(node);
   }, []);

   useEffect(() => {
      if (observer.current) observer.current.disconnect();
      const newObserver = getObserver(observer);

      for (const node of refs.current) {
         newObserver.observe(node);
      }

      return () => newObserver.disconnect();
   }, []);

   return (
      <>
         <div className="hide-scroll relative flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-14">
            {memberships
               .filter(e => e.tier !== 'influencer')
               .map(member => (
                  <div
                     key={member.id}
                     ref={addNode}
                     className={`h-40 w-[calc(100%-3rem)] shrink-0 snap-start scroll-mr-6 rounded-lg bg-gradient-to-br ${
                        member.tier === tier
                           ? 'from-neutral3 to-neutral4'
                           : 'from-neutral4 to-neutral5'
                     } px-4 shadow-xl`}>
                     <FlexCenter>
                        <SVG
                           className="h-10 w-10 fill-secondary3 transition duration-300"
                           xlinkHref="diamond"
                        />
                        <img
                           className="ml-auto"
                           src={`/images/tier/${member.tier}.svg`}
                           alt={member.tier}
                        />
                     </FlexCenter>
                  </div>
               ))}
         </div>
      </>
   );
};
