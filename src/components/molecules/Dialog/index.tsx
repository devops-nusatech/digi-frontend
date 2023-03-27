import * as React from 'react';
import { Transition, Dialog as Modal } from '@headlessui/react';

interface IDialogProps {
   isOpen: boolean;
   setIsOpen: (state?: any) => void;
   children: JSX.Element | React.ReactNode;
   title?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, IDialogProps>(
   ({ isOpen, setIsOpen, children, title }, ref) => {
      return (
         <Transition
            appear
            show={isOpen}
            as={React.Fragment}>
            <Modal
               ref={ref}
               as="div"
               onClose={setIsOpen}
               className="relative z-20">
               <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0 translate-y-4">
                  <div className="fixed inset-0 bg-neutral1 bg-opacity-40 backdrop-blur-sm" />
               </Transition.Child>
               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-12 text-center">
                     <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 scale-75 translate-y-9"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-75 translate-y-9">
                        <Modal.Panel className="sca w-full max-w-md transform space-y-8 rounded-2xl bg-neutral8 p-8 text-left align-middle shadow-xl transition-all duration-300 dark:bg-neutral2">
                           {title && (
                              <Modal.Title
                                 as="h3"
                                 className="font-dm text-3.5xl font-bold capitalize leading-tight tracking-custom1">
                                 {title}
                              </Modal.Title>
                           )}
                           <div
                              onClick={setIsOpen}
                              className="group absolute top-0 right-8 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral6 leading-none opacity-100 transition-all duration-300 dark:border-neutral3 dark:hover:border-neutral8">
                              <svg className="h-6 w-6 fill-neutral2 transition duration-300 ease-in-out group-hover:scale-110 dark:fill-neutral8">
                                 <use xlinkHref="#icon-close" />
                              </svg>
                           </div>
                           {children}
                        </Modal.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Modal>
         </Transition>
      );
   }
);
