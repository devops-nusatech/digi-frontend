import React, { FC, RefObject } from 'react';
import { PageTitle, ProfileSidebar } from 'components';
import type { PageTitleProps } from 'components';

type LayoutStepProps = PageTitleProps & {
   mainRef: RefObject<HTMLDivElement>;
};

export const LayoutProfile: FC<LayoutStepProps> = ({
   title,
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
         <ProfileSidebar />
         <div
            ref={mainRef}
            className="grow rounded-2xl bg-neutral8 p-4 shadow-card dark:bg-shade1 md:px-8 md:py-10 lg:p-10"
            style={{ animationDuration: '100ms' }}>
            {children}
         </div>
      </PageTitle>
   );
};
