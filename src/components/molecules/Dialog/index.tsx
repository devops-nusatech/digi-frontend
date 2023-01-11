import * as React from 'react';
import { Transition, Dialog as Modal } from '@headlessui/react'

interface IDialogProps {
   isOpen: boolean;
   setIsOpen: (state?: any) => void;
   children: JSX.Element | React.ReactNode;
   title?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, IDialogProps>(({
   isOpen,
   setIsOpen,
   children,
   title,
}, ref) => {
   return (
      <Transition
         appear
         show={isOpen}
         as={React.Fragment}
      >
         <Modal
            ref={ref}
            as="div"
            onClose={setIsOpen}
            className="relative z-10"
         >
            <Transition.Child
               as={React.Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0 translate-y-4"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0 translate-y-4"
            >
               <div className="fixed inset-0 bg-neutral1 bg-opacity-40 backdrop-blur-sm" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
               <div className="flex min-h-full items-center justify-center p-12 text-center">
                  <Transition.Child
                     as={React.Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 scale-95 translate-y-5"
                     enterTo="opacity-100 scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 scale-100"
                     leaveTo="opacity-0 scale-95 translate-y-5"
                  >
                     <Modal.Panel className="w-full max-w-md space-y-8 transform overflow-hidden rounded-2xl bg-neutral8 dark:bg-neutral2 p-8 text-left align-middle shadow-xl transition-all duration-300">
                        {
                           title && (
                              <Modal.Title
                                 as="h3"
                                 className="font-dm font-bold text-3.5xl leading-tight tracking-custom1 capitalize"
                              >
                                 {title}
                              </Modal.Title>
                           )
                        }
                        {children}
                        <div onClick={setIsOpen} className="group absolute top-0 right-8 w-10 h-10 flex items-center justify-center rounded-full leading-none opacity-100 border border-neutral6 dark:border-neutral3 dark:hover:border-neutral8 cursor-pointer transition-all duration-300">
                           <svg className="group-hover:scale-110 w-6 h-6 fill-neutral2 dark:fill-neutral8 transition ease-in-out duration-300">
                              <use xlinkHref="#icon-close" />
                           </svg>
                        </div>
                     </Modal.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Modal>
      </Transition>
   )
})
