import React, { memo, useCallback } from 'react'
import { toast } from 'react-toastify';
import { copyToClipboard } from 'helpers';

type IconCopyProps = {
   value: string;
   title: string;
}

export const IconCopy = memo(({ value, title }: IconCopyProps) => {
   const handleCopy = useCallback(
      (url: string, type: string) => {
         copyToClipboard(url);
         toast.success(`${type} Copied`);
      },
      [copyToClipboard, toast.success]
   );

   return (
      <svg
         onClick={() => handleCopy(value || '', title)}
         className="cursor-copy -translate-x-0.5 w-6 h-6 fill-neutral4 group-hover:fill-neutral2"
      >
         <use xlinkHref="#icon-copy" />
      </svg>
   );
});
