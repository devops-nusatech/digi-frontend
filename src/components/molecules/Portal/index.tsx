import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { IcClose } from 'assets';
import Bounce from 'react-reveal/Bounce';
import { classNames } from 'helpers';

const classes = {
   xs: 'max-w-xs',
   m: 'max-w-m',
   sm: 'max-w-sm,',
   md: 'max-w-md',
   lg: 'max-w-lg',
   xl: 'max-w-xl',
   '2xl': 'max-w-2xl',
   '3xl': 'max-w-3xl',
   '4xl': 'max-w-4xl',
   '5xl': 'max-w-5xl',
   '6xl': 'max-w-6xl',
   '7xl': 'max-w-7xl',
}

type With = 'xs' | 'm' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

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
   width
}) => {
   const modalRef = useRef<HTMLDivElement>(null);

   const handleOutside = (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && show) close();
   }

   useEffect(() => {
      const rootPortal = document.createElement('div');
      rootPortal.setAttribute('id', idPortal);
      !document.getElementById(idPortal) && document.body.appendChild(rootPortal);
      document.addEventListener('mousedown', handleOutside);
      return () => document.removeEventListener('mousedown', handleOutside);
   }, []);

   if (!show) return null;

   return (show && document && document.getElementById(idPortal)) && createPortal(
      <CSSTransition
         in={show}
         timeout={300}
         onExit={close}
         onExited={close}
         classNames="alert"
         unmountOnExit
      >
         <>
            <div className="alert fixed top-0 left-0 w-full h-full overflow-hidden bg-[#14141680] opacity-100 transition-all ease-out duration-200 select-none backdrop-blur-sm" style={{ zIndex: zIndexBackdrop }} />
            <Bounce bottom>
               <div onClick={close} className="alert fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto" style={{ zIndex: zIndexContent }} tabIndex={-1}>
                  <div className="alert absolute top-0 left-0 w-full h-full p-12 box-border text-center before:content-[''] before:inline-block before:h-full before:align-middle">
                     <div className="alert relative inline-block w-full align-middle my-0 mx-auto text-left cursor-auto">
                        <div
                           onClick={e => e.stopPropagation()}
                           className={classNames(`
                              alert w-full space-y-8 m-auto p-8 bg-neutral8 dark:bg-neutral2 rounded-20 shadow-modal dark:shadow-xl dark:shadow-neutral8/10 z-2 transition-all ease-in-out duration-200 opacity-100 scale-100 select-none
                              ${classes[String(width)]}
                           `)}
                        >
                           {(title || info === '' || info) && (<div>
                              {(title || info === '') && (
                                 <div className="flex items-center space-x-4 pr-14 pb-2">
                                    <svg
                                       onClick={onClick}
                                       className={`w-8 h-8 dark:fill-neutral8 ${!onClick ? '' : 'cursor-pointer hover:fill-primary1'} transition-all duration-300`}>
                                       <use xlinkHref="#icon-arrow-left" />
                                    </svg>
                                    <div className="font-dm font-bold text-3.5xl !leading-tight tracking-custom1">{title}</div>
                                 </div>
                              )}
                              {info && (
                                 <div className="pl-12 text-base leading-normal text-neutral4">{info}</div>
                              )}
                           </div>)}
                           {children}
                           <div className="group absolute top-0 right-8 w-10 h-10 flex items-center justify-center rounded-full leading-none opacity-100 border border-neutral6 dark:border-neutral3 dark:hover:border-neutral8 cursor-pointer transition-all duration-300" onClick={close}>
                              <IcClose className="group-hover:scale-110 fill-neutral2 dark:fill-neutral8 transition ease-in-out duration-300" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Bounce>
         </>
      </CSSTransition>,
      document.getElementById(idPortal) as HTMLElement
   );
};

Portal.defaultProps = {
   zIndexBackdrop: 1043,
   zIndexContent: 1044,
   width: 'md',
}
