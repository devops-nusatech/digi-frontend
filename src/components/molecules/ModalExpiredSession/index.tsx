import React, { FC } from 'react';
import { Button, Portal } from 'components';

interface ModalExpiredSession {
   title: string;
   buttonLabel: string;
   show: boolean;
   close: () => void;
   onClick: () => void;
}

export const ModalExpiredSession: FC<ModalExpiredSession> = ({
   title,
   buttonLabel,
   show,
   close,
   onClick,
}) => {
   return (
      <Portal
         show={show}
         close={close}>
         <div className="mt-10 space-y-8">
            <div className="text-center font-dm text-5xl font-bold leading-custom1 tracking-custom">
               Hufh! ⏰
            </div>
            <div className="mx-auto max-w-71.25 text-center text-base font-medium leading-normal">
               {title}
            </div>
            <Button
               text={buttonLabel}
               onClick={onClick}
               width="full"
            />
         </div>
      </Portal>
   );
};
