import React, { useRef } from 'react';
import {
   DocumentationEndpoints,
   DocumentationModels,
   LayoutProfile,
} from 'components';
import { useDocumentationFetch } from 'hooks';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectDocumentationData } from 'modules';

export const ApiDocs = () => {
   useDocumentationFetch();
   const mainRef = useRef<HTMLDivElement>(null);
   const intl = useIntl();
   const documentation = useSelector(selectDocumentationData);
   return (
      <LayoutProfile
         mainRef={mainRef}
         title="API docs"
         withBreadcrumbs={{
            display: 'Home',
            href: '/',
            active: 'API docs',
         }}>
         <div className="space-y-4">
            <div>
               <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                  {documentation?.info?.title}{' '}
                  <small className="text-x text-neutral4">
                     {intl.formatMessage({
                        id: 'page.documentation.header.version.title',
                     })}
                     &nbsp;
                     {documentation?.info?.version}
                  </small>
               </div>
               <div className="text-neutral4">
                  {documentation?.info?.description}
               </div>
            </div>
            <div className="flex flex-col">
               <div className="font-medium">
                  {intl.formatMessage({
                     id: 'page.documentation.header.contactInfo.title',
                  })}
               </div>
               <a
                  href={documentation?.info?.contact?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral4 transition-colors duration-500 hover:text-primary1 hover:underline">
                  {documentation?.info?.contact?.name}
               </a>
               <a
                  href={`mailto: ${documentation?.info?.contact?.email}`}
                  className="text-neutral4 transition-colors duration-500 hover:text-primary1 hover:underline">
                  {documentation?.info?.contact?.email}
               </a>
            </div>
            <div className="flex flex-col">
               <div className="font-medium">
                  {intl.formatMessage({
                     id: 'page.documentation.header.license.title',
                  })}
               </div>
               <a
                  href={documentation?.info?.license?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral4 transition-colors duration-500 hover:text-primary1 hover:underline">
                  {documentation?.info?.license?.url}
               </a>
            </div>
         </div>
         <div>
            <DocumentationEndpoints />
            <DocumentationModels />
         </div>
      </LayoutProfile>
   );
};
