import React, { useCallback, MouseEvent, useMemo } from 'react';
import { SVG } from 'components';

type ScrollLineProps = {
   target: string;
};

export const ScrollLine = ({ target }: ScrollLineProps) => {
   const handleScroll = useCallback(
      (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>, id: string) => {
         e.preventDefault();
         const hero = document.getElementById(id);
         hero &&
            hero.scrollIntoView({
               behavior: 'smooth',
            });
      },
      []
   );

   const renderIconArrowButtom = useMemo(
      () => (
         <SVG
            className="h-6 w-6 fill-neutral4 transition-all duration-300 group-hover:fill-neutral2 dark:fill-neutral6 dark:group-hover:fill-neutral6"
            xlinkHref="arrow-bottom"
         />
      ),
      []
   );

   return (
      <a
         href={`#${target}`}
         onClick={e => handleScroll(e, target)}
         className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-neutral6 transition-colors duration-300 hover:border-neutral2 dark:border-neutral3 dark:hover:border-neutral6">
         <div className="-translate-y-6.75 group flex animate-down flex-col space-y-8">
            {renderIconArrowButtom}
            {renderIconArrowButtom}
         </div>
      </a>
   );
};
