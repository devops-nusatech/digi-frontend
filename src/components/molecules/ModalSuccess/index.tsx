import React, { ReactElement, ReactNode, memo } from 'react';
import { Button, Heading2, Paragraph, Portal } from 'components';

interface ModalSuccessProps {
   title: ReactNode;
   subTitle: ReactNode;
   toggle: boolean;
   setToggle: () => void;
}

export const ModalSuccess = memo(
   ({
      title,
      subTitle,
      toggle,
      setToggle,
   }: ModalSuccessProps): ReactElement => (
      <Portal
         close={setToggle}
         show={toggle}>
         <Heading2
            text="Yay! 🎉"
            className="text-center"
         />
         <div className="mx-auto max-w-70 text-center text-base font-medium">
            You successfully {title}
         </div>
         <div className="flex flex-wrap rounded-xl border border-neutral6 p-6 dark:border-neutral3 md-max:px-4">
            <Paragraph text={subTitle} />
         </div>
         <Button
            text="Continue"
            onClick={setToggle}
         />
      </Portal>
   )
);
