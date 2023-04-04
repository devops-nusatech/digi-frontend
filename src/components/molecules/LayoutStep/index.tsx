import React, { FC, RefObject } from 'react';
import { PageTitle, StepLine } from 'components';
import type { PageTitleProps, StepLineProps } from 'components';

type LayoutStepProps = PageTitleProps &
   StepLineProps & {
      mainRef: RefObject<HTMLDivElement>;
   };

export const LayoutStep: FC<LayoutStepProps> = ({
   currentStep,
   title,
   titles,
   className,
   isVertical,
   withBreadcrumbs,
   withLinkMore,
   mainRef,
   children,
}) => {
   return (
      <PageTitle
         title={title}
         withBreadcrumbs={withBreadcrumbs}
         withLinkMore={withLinkMore}>
         <StepLine
            titles={titles}
            currentStep={currentStep}
            className={className}
            isVertical={isVertical}
         />
         <div
            ref={mainRef}
            className="w-auto rounded-none bg-none p-0 shadow-none dark:bg-none md:rounded-2xl md:bg-neutral8 md:p-10 md:shadow-card md:dark:bg-shade1 lg:p-8 lg2:w-736 lg2:p-10 lg-max:!ml-0 lg2-max:ml-16 lg2-max:grow">
            {children}
         </div>
      </PageTitle>
   );
};
