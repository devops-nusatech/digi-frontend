import React from 'react';
import { icApple, icGp, illusDownloadApp11, illusDownloadApp12 } from 'assets';
import {
   Section,
   Container,
   Heading2,
   TextBase,
   Text2xl,
   Anchor,
} from 'components';

const dataDownload = [
   {
      icon: icApple,
      title: 'Download from',
      subTitle: 'Appstore',
      link: 'https://play.google.com/store/apps/details?id=mobile.digiassetindo.com',
   },
   {
      icon: icGp,
      title: 'Download from',
      subTitle: 'Google Play',
      link: 'https://play.google.com/store/apps/details?id=mobile.digiassetindo.com',
   },
   {
      icon: icApple,
      title: 'Download from',
      subTitle: 'Mac OS',
      link: 'https://play.google.com/store/apps/details?id=mobile.digiassetindo.com',
   },
];

export const Download = () => (
   <Section className="flex items-center py-16 md:min-h-908 lg:py-28 lg2:py-34">
      <Container className="relative">
         <div className="grid grid-cols-2">
            <div className="col-span-2 select-none md:col-span-1">
               <Heading2 text="Trade anywhere" />
               <TextBase
                  text="Anytime, anywhere. Trade crypto on your terms."
                  className="mt-4 mb-16 text-neutral4"
               />
               <div className="space-y-4 divide-y divide-neutral6 dark:divide-neutral3 md:space-y-8 lg:max-w-sm">
                  {dataDownload.map((e, i) => (
                     <div
                        key={i}
                        className="group relative flex cursor-pointer items-center space-x-6 pt-4 md:pt-8">
                        <div className="download__icon relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral2 group-hover:after:visible group-hover:after:opacity-100">
                           <img
                              className="max-w-6"
                              src={e.icon}
                              alt="Logo"
                           />
                        </div>
                        <div className="grow">
                           <div className="text-neutral4">{e.title}</div>
                           <Text2xl
                              font="normal"
                              text={e.subTitle}
                           />
                        </div>
                        <Anchor
                           href={e.link}
                           title="Download app"
                        />
                     </div>
                  ))}
               </div>
            </div>
            <div className="col-span-2 md:col-span-1">
               <div className="pointer-events-none absolute -right-6 lg:-top-56">
                  <img
                     className="hidden md:block md:w-[500px] lg:w-[700px] xl:w-auto"
                     srcSet={`${illusDownloadApp12} 2x`}
                     src={illusDownloadApp11}
                     alt="Hero"
                  />
               </div>
            </div>
         </div>
      </Container>
   </Section>
);
