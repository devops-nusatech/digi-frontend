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
   children
}) => {
   const history = useHistory();

   const handleScroll = (e: any, id: string) => {
      e.preventDefault();
      let hero = document.getElementById(id);
      hero && hero.scrollIntoView({
         behavior: 'smooth',
      });
   }

   return (
      <section className="relative overflow-hidden pt-8 lg:pt-20 lg2:pt-40 mb-34" style={style}>
         <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="grid grid-cols-2">
               <div className="col-span-2 md:col-span-1 select-none">
                  <div className="mb-5 text-5xl md:text-64 tracking-custom font-dm font-bold">
                     {title}
                  </div>
                  <div className="mb-8 text-base text-neutral4 font-normal w-2/3 sm:w-3/4 md:w-full">
                     {subTitle}
                  </div>
                  <div className="flex flex-row md:flex-col items-start justify-between space-y-20">
                     <Button
                        text={textButton}
                        width="noFull"
                        onClick={() => history.push(path)}
                     />
                     <a href={`#${scrollTo}`} onClick={e => handleScroll(e, String(scrollTo))} className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-none border-2 border-solid border-neutral6 dark:border-neutral4 hover:border-neutral2 dark:hover:border-neutral6 transition-colors duration-300">
                        <div className="flex flex-col space-y-8 -translate-y-[27px] animate-down group">
                           <svg className="w-6 h-6 fill-neutral4 dark:fill-neutral6 group-hover:fill-neutral2 dark:group-hover:fill-neutral6 transition-all duration-300">
                              <use xlinkHref="#icon-arrow-bottom" />
                           </svg>
                           <svg className="w-6 h-6 fill-neutral4 dark:fill-neutral6 group-hover:fill-neutral2 dark:group-hover:fill-neutral6 transition-all duration-300">
                              <use xlinkHref="#icon-arrow-bottom" />
                           </svg>
                        </div>
                     </a>
                  </div>
               </div>
               {(src || srcSet) && (
                  <div className="col-span-2 md:col-span-1">
                     <div
                        className="absolute -top-20 lg2:-top-36 -right-6 pointer-events-none"
                     >
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
   scrollTo: 'learn'
}
