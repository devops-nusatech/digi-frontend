import React, { CSSProperties, FC, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'components';

interface HeroProps {
   title: ReactNode | string;
   subTitle: string;
   path: string;
   textButton?: string;
   src?: string;
   srcSet?: string;
   style?: CSSProperties;
   scrollTo?: string;
}

export const Hero: FC<HeroProps> = ({
   title,
   subTitle,
   path,
   textButton,
   src,
   srcSet,
   style,
   scrollTo,
   children,
}) => {
   const history = useHistory();

   const handleScroll = (e: any, id: string) => {
      e.preventDefault();
      let hero = document.getElementById(id);
      hero &&
         hero.scrollIntoView({
            behavior: 'smooth',
         });
   };

   return (
      <section
         className="relative mb-34 overflow-hidden pt-8 lg:pt-20 lg2:pt-40"
         style={style}>
         <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-2">
               <div className="col-span-2 select-none md:col-span-1">
                  <div className="mb-5 font-dm text-5xl font-bold tracking-custom md:text-64">
                     {title}
                  </div>
                  <div className="mb-8 w-2/3 text-base font-normal text-neutral4 sm:w-3/4 md:w-full">
                     {subTitle}
                  </div>
                  <div className="flex flex-row items-start justify-between space-y-20 md:flex-col">
                     <Button
                        text={textButton}
                        width="noFull"
                        onClick={() => history.push(path)}
                     />
                     <a
                        href={`#${scrollTo}`}
                        onClick={e => handleScroll(e, String(scrollTo))}
                        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-solid border-neutral6 bg-none transition-colors duration-300 hover:border-neutral2 dark:border-neutral4 dark:hover:border-neutral6">
                        <div className="group flex -translate-y-[27px] animate-down flex-col space-y-8">
                           <svg className="h-6 w-6 fill-neutral4 transition-all duration-300 group-hover:fill-neutral2 dark:fill-neutral6 dark:group-hover:fill-neutral6">
                              <use xlinkHref="#icon-arrow-bottom" />
                           </svg>
                           <svg className="h-6 w-6 fill-neutral4 transition-all duration-300 group-hover:fill-neutral2 dark:fill-neutral6 dark:group-hover:fill-neutral6">
                              <use xlinkHref="#icon-arrow-bottom" />
                           </svg>
                        </div>
                     </a>
                  </div>
               </div>
               {(src || srcSet) && (
                  <div className="col-span-2 md:col-span-1">
                     <div className="pointer-events-none absolute -right-6 -top-20 lg2:-top-36">
                        <img
                           className="hidden md:block md:w-[500px] lg:w-[700px] xl:w-auto"
                           srcSet={`${srcSet} 2x`}
                           src={src}
                           alt="Hero"
                           title="Hero"
                        />
                     </div>
                  </div>
               )}
            </div>
            {children}
         </div>
      </section>
   );
};

Hero.defaultProps = {
   textButton: 'Get started now',
   scrollTo: 'learn',
};
