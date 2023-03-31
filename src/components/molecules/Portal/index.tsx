import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { IcClose } from 'assets';
import Bounce from 'react-reveal/Bounce';
import { classNames } from 'helpers';

const classes = {
   'xs': 'max-w-xs',
   'm': 'max-w-m',
   'sm': 'max-w-sm,',
   'md': 'max-w-md',
   'lg': 'max-w-lg',
   'xl': 'max-w-xl',
   '2xl': 'max-w-2xl',
   '3xl': 'max-w-3xl',
   '4xl': 'max-w-4xl',
   '5xl': 'max-w-5xl',
   '6xl': 'max-w-6xl',
   '7xl': 'max-w-7xl',
};

type With =
   | 'xs'
   | 'm'
   | 'sm'
   | 'md'
   | 'lg'
   | 'xl'
   | '2xl'
   | '3xl'
   | '4xl'
   | '5xl'
   | '6xl'
   | '7xl';

interface PortalProps {
   show: boolean;
   close: (e?: any) => void;
   onClick?: (e?: any) => void;
   title?: string;
   info?: string;
   children: JSX.Element | ReactNode;
   zIndexBackdrop?: number;
   zIndexContent?: number;
   width?: With;
}

const idPortal = 'portal';

export const Portal: FC<PortalProps> = ({
   show,
   close,
   onClick,
   title,
   info,
   children,
   zIndexBackdrop,
   zIndexContent,
   width,
}) => {
   const modalRef = useRef<HTMLDivElement>(null);

   const handleOutside = (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && show)
         close();
   };

   useEffect(() => {
      const rootPortal = document.createElement('div');
      rootPortal.setAttribute('id', idPortal);
      !document.getElementById(idPortal) &&
         document.body.appendChild(rootPortal);
      document.addEventListener('mousedown', handleOutside);
      return () => document.removeEventListener('mousedown', handleOutside);
   }, []);

   if (!show) return null;

   return (
      show &&
      document &&
      document.getElementById(idPortal) &&
      createPortal(
         <CSSTransition
            in={show}
            timeout={300}
            onExit={close}
            onExited={close}
            classNames="alert"
            unmountOnExit>
            <>
               <div
                  className="alert fixed left-0 top-0 h-full w-full select-none overflow-hidden bg-[#14141680] opacity-100 backdrop-blur-sm transition-all duration-200 ease-out"
                  style={{ zIndex: zIndexBackdrop }}
               />
               <Bounce bottom>
                  <div
                     onClick={close}
                     className="alert fixed left-0 top-0 h-full w-full overflow-y-auto overflow-x-hidden"
                     style={{ zIndex: zIndexContent }}
                     tabIndex={-1}>
                     <div className="alert absolute left-0 top-0 box-border h-full w-full p-12 text-center before:inline-block before:h-full before:align-middle before:content-['']">
                        <div className="alert relative mx-auto my-0 inline-block w-full cursor-auto text-left align-middle">
                           <div
                              onClick={e => e.stopPropagation()}
                              className={classNames(`
                              alert z-2 m-auto w-full scale-100 select-none space-y-8 rounded-20 bg-neutral8 p-8 opacity-100 shadow-modal transition-all duration-200 ease-in-out dark:bg-neutral2 dark:shadow-xl dark:shadow-neutral8/10
                              ${classes[String(width)]}
                           `)}>
                              {(title || info === '' || info) && (
                                 <div>
                                    {(title || info === '') && (
                                       <div className="flex items-center space-x-4 pb-2 pr-14">
                                          <svg
                                             onClick={onClick}
                                             className={`h-8 w-8 dark:fill-neutral8 ${
                                                !onClick
                                                   ? ''
                                                   : 'cursor-pointer hover:fill-primary1'
                                             } transition-all duration-300`}>
                                             <use xlinkHref="#icon-arrow-left" />
                                          </svg>
                                          <div className="font-dm text-3.5xl !leading-tight tracking-custom1">
                                             {title}
                                          </div>
                                       </div>
                                    )}
                                    {info && (
                                       <div className="pl-12 text-base leading-normal text-neutral4">
                                          {info}
                                       </div>
                                    )}
                                 </div>
                              )}
                              {children}
                              <div
                                 className="group absolute right-8 top-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral6 leading-none opacity-100 transition-all duration-300 dark:border-neutral3 dark:hover:border-neutral8"
                                 onClick={close}>
                                 <IcClose className="fill-neutral2 transition duration-300 ease-in-out group-hover:scale-110 dark:fill-neutral8" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </Bounce>
            </>
         </CSSTransition>,
         document.getElementById(idPortal) as HTMLElement
      )
   );
};

Portal.defaultProps = {
   zIndexBackdrop: 1043,
   zIndexContent: 1044,
   width: 'md',
};
