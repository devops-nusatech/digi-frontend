import React, {
   useState
} from 'react';
import { Accordion, AdibTooltip, Nav } from 'components';
import { useScrollUp } from 'hooks';
import {
   illusContact,
   illusContact2
} from 'assets';
import { openInNewTab } from 'helpers';

export const Contact = () => {
   useScrollUp();
   const [tab, setTab] = useState(0);
   const accordionItems = [
      {
         title: 'Accordion Item #1',
         content: (
            <div>
               <strong>This is the first item's accordion body.</strong> It is hidden
               by default, but shown when title is clicked. It will also be hidden if
               the title is clicked again or when another item is clicked. You can
               pass HTML tags in the content such as <u>underline tag</u>,{' '}
               <i>italic</i>, or even another list like this:
               <ul>
                  <li>Bread</li>
                  <li>Eggs</li>
                  <li>Milk</li>
               </ul>
            </div>
         ),
      },
      {
         title: 'Accordion Item #2',
         content: (
            <div>
               <strong>This is the second item's accordion body.</strong> It is
               hidden by default, but shown when title is clicked. It will also be
               hidden if the title is clicked again or when another item is clicked.
               You can pass HTML tags in the content such as <u>underline tag</u>,{' '}
               <i>italic</i>, or even another list like this:
               <ul>
                  <li>Bread</li>
                  <li>Eggs</li>
                  <li>Milk</li>
               </ul>
            </div>
         ),
      },
      {
         title: 'Accordion Item #3',
         content: (
            <div>
               <strong>This is the third item's accordion body.</strong> It is hidden
               by default, but shown when title is clicked. It will also be hidden if
               the title is clicked again or when another item is clicked. You can
               pass HTML tags in the content such as <u>underline tag</u>,{' '}
               <i>italic</i>, or even another list like this:
               <ul>
                  <li>Bread</li>
                  <li>Eggs</li>
                  <li>Milk</li>
               </ul>
            </div>
         ),
      },
   ];

   const renderSocialIcon = (name: string, url: string) => (
      <AdibTooltip
         content={
            <div className="flex flex-col space-y-3 py-3 px-2 font-pop text-xs leading-none">
               <div className="font-medium">
                  Click to jump to page
               </div>
               <div className="">
                  {url}
               </div>
            </div>
         }
         followCursorProps={false}
      >
         <svg onClick={() => openInNewTab(url)} className="cursor-pointer w-4 h-4 fill-neutral4 hover:fill-neutral2 dark:hover:fill-neutral8 transition-all duration-300">
            <use xlinkHref={`#icon-${name}`} />
         </svg>
      </AdibTooltip>
   )

   return (
      <>
         <section className="relative mb-16 md:mb-28 lg2:mb-34">
            <div className="block md:flex items-center min-h-auto md:min-h-740 pt-8 pb-4 md:pt-20 lg2:py-28 w-full max-w-7xl px-8 md:px-10 lg:px-20 mx-auto">
               <div className="relative z-3 w-full md:max-w-81.75 lg:max-w-545 mb-4 md:mb-0">
                  <div className="mb-3 text-base leading-none font-bold uppercase text-neutral4">
                     Build trust build connection
                  </div>
                  <div className="mb-5 text-5xl md:text-64 leading-custom1 md:leading-none tracking-custom font-dm">
                     How can we help
                  </div>
                  <div className="mb-6 text-base leading-normal text-neutral4">
                     Our social media contact list
                  </div>
                  <div className="flex space-x-6">
                     {renderSocialIcon('telegram', 'https://t.me/digiassetindo')}
                     {renderSocialIcon('whatsapp', 'https://wa.me/62882005439488')}
                     {renderSocialIcon('email', 'mailto:support@digiassetindo.com')}
                     {renderSocialIcon('instagram', 'https://www.instagram.com/digiassetindo/')}
                     {renderSocialIcon('twitter', 'https://twitter.com/Digiasset_indo')}
                     {renderSocialIcon('facebook', 'https://www.facebook.com/Digiassetindo')}
                     {renderSocialIcon('youtube', 'https://www.youtube.com/@digiassetindo2948')}
                  </div>
                  {/* <form className="relative w-full md:max-w-72.5">
                     <input type="email" className="w-full h-12 pl-3.5 pr-12 rounded-3xl bg-none dark:bg-transparent border-2 border-neutral6 dark:border-neutral3 dark:focus:border-neutral4 focus:border-neutral4 outline-none leading-custom dark:text-neutral8 transition-colors duration-300" placeholder="Enter your email" />
                     <button type="submit" onClick={e => e.preventDefault()} className="absolute inset-y-2 right-2 w-8 h-8 bg-primary1 rounded-full hover:bg-primary2 transition-all duration-300">
                        <IcArrowRight className="translate-x-1" />
                     </button>
                  </form> */}
               </div>
               <div className="static md:absolute top-3 right-c-1/2-670 md:right-c-1/2-700 lg2:right-c-1/2-730 pl-4 md:pl-0 w-full md:w-700 lg2:w-785 pointer-events-none">
                  <img srcSet={`${illusContact2} 2x`} src={illusContact} alt="Contac" title="Contact" />
               </div>
            </div>
         </section>
         <section className="mb-16 md:mb-28 lg2:mb-34">
            <div className="w-full max-w-7xl px-8 md:px-10 lg:px-20 mx-auto">
               <div>
                  <div className="text-4.5xl md:text-5xl leading-1.2 md:leading-custom1 tracking-custom1 md:tracking-custom font-dm mb-10 md:mb-12 text-center">
                     Frequently asked questions
                  </div>
                  <div className="hidden md:flex justify-center space-x-3 mb-10">
                     <Nav
                        title="General"
                        isActive={tab === 0}
                        onClick={() => setTab(0)}
                     />
                     <Nav
                        title="Louncpad"
                        isActive={tab === 1}
                        onClick={() => setTab(1)}
                     />
                     <Nav
                        title="Airdrop"
                        isActive={tab === 2}
                        onClick={() => setTab(2)}
                     />
                     <Nav
                        title="P2P"
                        isActive={tab === 3}
                        onClick={() => setTab(3)}
                     />
                  </div>
                  <div className="md:hidden">
                     <option value="">
                        <select name="" id="">general</select>
                     </option>
                  </div>
               </div>
               <div className="max-w-545 mx-auto">
                  <Accordion items={accordionItems} />
               </div>
            </div>
         </section>
      </>
   )
}
