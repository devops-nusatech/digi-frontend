import { Button } from 'components/atoms';
import React, { useState } from 'react';
import Bounce from 'react-reveal/Bounce';

export const FormChat = () => {
   const [openchat, setOpenChat] = useState(false);
   const handleToggleChat = () => setOpenChat(!openchat);

   return (
      <>
         {
            openchat && (
               <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-[#14141680] opacity-100 z-[9999999999999] transition-all ease-out duration-200" />
            )
         }
         <div className="fixed bottom-5 right-5 z-[99999999999999]">
            <div className="flex flex-col space-y-6 justify-end items-end">
               <Bounce>
                  <div className={`${!openchat && 'hidden'} mx-auto w-full max-w-[550px] rounded-lg bg-neutral8 shadow-card2`}>
                     <div className="flex items-center justify-between rounded-t-lg bg-primary1 py-4 px-6">
                        <h3 className="text-xl font-bold text-white">Let's chat? - Online</h3>
                        <button onClick={handleToggleChat}>
                           <svg className="w-6 h-6 fill-neutral8 group-hover:fill-primary1 stroke-neutral8 group-hover:stroke-primary1 transition-all duration-300">
                              <use xlinkHref="#icon-close" />
                           </svg>
                        </button>
                     </div>
                     <form
                        action="https://formbold.com/s/FORM_ID"
                        method="POST"
                        className="py-6 px-6"
                     >
                        <div className="mb-5">
                           <label
                              htmlFor="name"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                           >
                              Your Name
                           </label>
                           <input
                              type="text"
                              name="name"
                              id="name"
                              placeholder="ENter your name"
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-primary1 focus:shadow-md"
                           />
                        </div>
                        <div className="mb-5">
                           <label
                              htmlFor="email"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                           >
                              Email Address
                           </label>
                           <input
                              type="email"
                              name="email"
                              id="email"
                              placeholder="example@domain.com"
                              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-primary1 focus:shadow-md"
                           />
                        </div>
                        <div className="mb-5">
                           <label
                              htmlFor="message"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                           >
                              Message
                           </label>
                           <textarea
                              rows={3}
                              name="message"
                              id="message"
                              placeholder="Explain your queries"
                              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-2.5 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-primary1 focus:shadow-md"
                           ></textarea>
                        </div>
                        <Button
                           text="Send"
                           width="full"
                        />
                     </form>
                  </div>
               </Bounce>
               <button
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-primary1 hover:bg-neutral6"
                  onClick={handleToggleChat}
               >
                  <span className={`${!openchat && 'hidden'}`}>
                     <svg className={`${openchat && 'w-6 h-6 fill-neutral8 group-hover:fill-primary1 stroke-neutral8 group-hover:stroke-primary1 transition-all duration-300'}`}>
                        <use xlinkHref="#icon-close" />
                     </svg>
                  </span>
                  <span className={`${openchat && 'hidden'}`}>
                     <svg className="w-6 h-6 fill-neutral8 group-hover:fill-primary1 transition-all duration-300">
                        <use xlinkHref="#icon-chat" />
                     </svg>
                  </span>
               </button>
            </div>
         </div>
      </>
   );
};
