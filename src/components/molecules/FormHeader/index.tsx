import React, { FC } from 'react';

interface FormHeaderProps {
   title: string;
   subTitle?: string;
}

export const FormHeader: FC<FormHeaderProps> = ({ title, subTitle, }) => {
   return (
      <div className="pb-4 mb-8 border-b border-solid border-neutral6 dark:border-neutral3">
         <div className="mb-8 text-center text-[40px] leading-[1.2] tracking-[-.01em] font-dm font-bold">
            {title}
         </div>
         {subTitle && (
            <div className="text-center text-xs leading-[1.66667] text-neutral4">
               {subTitle}
            </div>
         )}
      </div>
   )
}
