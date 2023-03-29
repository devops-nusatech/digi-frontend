import React, { RefObject } from 'react';
import { Label } from 'components';

type TextAreaPros = {
   label: string;
   ref: RefObject<HTMLTextAreaElement>;
};

export const TextArea = ({ label, ref }: TextAreaPros) => {
   return (
      <div className="space-y-2.5">
         <Label label={label} />
         <div className="relative">
            <textarea
               ref={ref}
               required
               placeholder="Say something"
               className="h-38 w-full overflow-auto rounded-xl border-2 border-neutral6 bg-neutral8 bg-none px-3.5 py-2.5 font-medium shadow-none outline-none transition-colors duration-200 focus:border-neutral4 dark:border-neutral3 dark:bg-neutral2 focus:dark:border-neutral4"
            />
         </div>
      </div>
   );
};
