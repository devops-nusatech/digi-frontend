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
   onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
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
            className="relative shrink-0 w-0 lg:w-81.75 xl:w-97 1xl:w-99 min-h-auto lg:min-h-screen bg-none lg:bg-neutral2 bg-no-repeat bg-cover"
            style={{
               backgroundImage: `url(${illusLogin})`,
               backgroundPosition: '100% 50%'
            }}
         >
            <Link to="/" className="absolute top-10 md:top-12 1.5xl:top-16 left-1/2 md:left-16 1.5xl:left-20 w-38" tabIndex={-1}>
               <img className="lg:hidden" src={theme === 'dark' ? icLogoDark : icLogoLight} title="Digiasset" alt="Digiasset" />
               <img className="hidden lg:block" src={icLogoDark} title="Digiasset" alt="Digiasset" />
            </Link>
         </div>
         <div className="relative flex grow md:px-12 md:pt-30 md:pb-17 xl:px-16 xl:pt-37 xl:pb-33">
            <div className="absolute right-12 inset-x-16 top-12 lg:top-14 lg:inset-x-16 1.5xl:inset-x-20 1.5xl:top-20 font-dm text-sm font-bold leading-custom3 text-right">
               {descLinkTo}
               <Link
                  to={linkTo ?? ''}
                  tabIndex={-1}
                  className="ml-1.25 text-primary1 hover:text-primary2 transition-colors duration-300 items-baseline"
               >
                  &nbsp; {linkToTxt}
               </Link>
            </div>
            <div className="m-auto w-full sm:w-84" onKeyPress={onKeyPress}>
               <div className="space-y-8">
                  <div className={`space-y-8 ${(subTitle || withSubTitleOneOfBold || withDisplayLink) ? 'pb-8 border-b border-neutral6 dark:border-neutral3' : ''}`}>
                     <div className="text-center text-3.5xl md:text-4.5xl tracking-custom1 font-dm leading-tight md:leading-1.2">
                        {title}
                     </div>
                     {(subTitle || withSubTitleOneOfBold || withDisplayLink) && (
                        <div className="space-y-3">
                           <div className="text-xs text-center text-neutral4 leading-custom4">
                              {subTitle}
                              <span className="font-semibold">
                                 {withSubTitleOneOfBold}
                              </span>
                           </div>
                           {withDisplayLink && (
                              <div className="flex items-center justify-center space-x-1 h-10 px-6 bg-neutral7 dark:bg-neutral3 rounded-20 font-medium text-primary5">
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
