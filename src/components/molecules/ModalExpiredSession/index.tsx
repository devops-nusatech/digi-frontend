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
         close={close}
      >
         <div className="mt-10 space-y-8">
            <div className="text-5xl text-center font-dm font-bold leading-custom1 tracking-custom">Hufh! ⏰</div>
            <div className="max-w-71.25 mx-auto text-center text-base font-medium leading-normal">
               {title}
            </div>
            <Button
               text={buttonLabel}
               onClick={onClick}
               width="full"
            />
         </div>
      </Portal>
   )
};
