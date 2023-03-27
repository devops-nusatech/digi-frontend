import React, { FC, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentColorTheme } from 'modules';
import { icLogoDark, icLogoLight, illusLogin } from 'assets';

interface LayoutAuthProps {
   descLinkTo?: string;
   linkTo?: string;
   linkToTxt?: string;
   title?: string;
   subTitle?: string;
   withSubTitleOneOfBold?: string;
   withDisplayLink?: boolean;
   onKeyPress?: (event: KeyboardEvent<HTMLDivElement>) => void;
}

export const LayoutAuth: FC<LayoutAuthProps> = ({
   descLinkTo,
   linkTo,
   linkToTxt,
   title,
   subTitle,
   withSubTitleOneOfBold,
   withDisplayLink,
   onKeyPress,
   children,
}) => {
   const theme = useSelector(selectCurrentColorTheme);

   return (
      <div className="block lg:flex">
         <div
            className="relative min-h-auto w-0 shrink-0 bg-none bg-cover bg-no-repeat lg:min-h-screen lg:w-81.75 lg:bg-neutral2 xl:w-97 1xl:w-99"
            style={{
               backgroundImage: `url(${illusLogin})`,
               backgroundPosition: '100% 50%',
            }}>
            <Link
               to="/"
               className="absolute top-10 left-1/2 w-38 md:top-12 md:left-16 1.5xl:top-16 1.5xl:left-20"
               tabIndex={-1}>
               <img
                  className="lg:hidden"
                  src={theme === 'dark' ? icLogoDark : icLogoLight}
                  title="Digiasset"
                  alt="Digiasset"
               />
               <img
                  className="hidden lg:block"
                  src={icLogoDark}
                  title="Digiasset"
                  alt="Digiasset"
               />
            </Link>
         </div>
         <div className="relative flex grow md:px-12 md:pt-30 md:pb-17 xl:px-16 xl:pt-37 xl:pb-33">
            <div className="absolute inset-x-16 right-12 top-12 text-right font-dm text-sm font-bold leading-custom3 lg:inset-x-16 lg:top-14 1.5xl:inset-x-20 1.5xl:top-20">
               {descLinkTo}
               <Link
                  to={linkTo ?? ''}
                  tabIndex={-1}
                  className="ml-1.25 items-baseline text-primary1 transition-colors duration-300 hover:text-primary2">
                  &nbsp; {linkToTxt}
               </Link>
            </div>
            <div
               className="m-auto w-full sm:w-84"
               onKeyPress={onKeyPress}>
               <div className="space-y-8">
                  <div
                     className={`space-y-8 ${
                        subTitle || withSubTitleOneOfBold || withDisplayLink
                           ? 'border-b border-neutral6 pb-8 dark:border-neutral3'
                           : ''
                     }`}>
                     <div className="text-center font-dm text-3.5xl leading-tight tracking-custom1 md:text-4.5xl md:leading-1.2">
                        {title}
                     </div>
                     {(subTitle ||
                        withSubTitleOneOfBold ||
                        withDisplayLink) && (
                        <div className="space-y-3">
                           <div className="text-center text-xs leading-custom4 text-neutral4">
                              {subTitle}
                              <span className="font-semibold">
                                 {withSubTitleOneOfBold}
                              </span>
                           </div>
                           {withDisplayLink && (
                              <div className="flex h-10 items-center justify-center space-x-1 rounded-20 bg-neutral7 px-6 font-medium text-primary5 dark:bg-neutral3">
                                 <svg className="h-6 w-6 fill-primary5">
                                    <use xlinkHref="#icon-lock" />
                                 </svg>
                                 <div>
                                    {window.location.protocol}//
                                    <span className="text-neutral2 dark:text-neutral8">
                                       {window.location.href.split('//').pop()}
                                    </span>
                                 </div>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
};
