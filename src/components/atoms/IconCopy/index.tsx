import React, { memo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { copyToClipboard } from 'helpers';

type IconCopyProps = {
   value: string;
   title: string;
};

export const IconCopy = memo(({ value, title }: IconCopyProps) => {
   const handleCopy = useCallback((url: string, type: string) => {
      copyToClipboard(url);
      toast.success(`${type} Copied`);
   }, []);

   return (
      <svg
         onClick={() => handleCopy(value || '', title)}
         className="h-6 w-6 -translate-x-0.5 cursor-copy fill-neutral4 group-hover:fill-neutral2">
         <use xlinkHref="#icon-copy" />
      </svg>
   );
});
