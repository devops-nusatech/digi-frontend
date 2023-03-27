import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
   Accordion,
   AccordionData,
   AdibDropdown,
   AdibTooltip,
   Button,
   InputGroup,
   Label,
   Nav,
   Pick,
   Skeleton,
   TextArea,
} from 'components';
import { useNews2Fetch, useScrollUp } from 'hooks';
import { illusContact, illusContact2 } from 'assets';
import { getRefObject, openInNewTab } from 'helpers';

type Tag = 'general' | 'launchpad' | 'airdrop' | 'p2p';
type Topic = 'wallet' | 'exchange';
type State = {
   topic: Topic;
   issue: string;
   issue2: string;
   full: boolean;
};

export const Contact = () => {
   useScrollUp();

   const emailRef = useRef<HTMLInputElement>(null);
   const subjectRef = useRef<HTMLInputElement>(null);
   const messageRef = useRef<HTMLTextAreaElement>(null);
   const [state, setState] = useState<State>({
      topic: 'wallet',
      issue: '',
      issue2: '',
      full: false,
   });
   const { topic, issue, issue2, full } = state;

   const handleChangeTopic = (topic: Topic) =>
      setState({
         ...state,
         topic,
      });
   const handleChangeIssue = (issue: string) =>
      setState({
         ...state,
         issue,
      });
   const handleChangeIssue2 = useCallback(
      (issue2: string) =>
         setState({
            ...state,
            issue2,
         }),
      [issue2, state, setState]
   );
   const handleChangeFull = () =>
      setState({
         ...state,
         full: !full,
      });

   const [tag, setTag] = useState<Tag>('general');

   const { news, newsLoadig } = useNews2Fetch(25, tag);

   const accordionItems: AccordionData[] = news.map(e => ({
      title: e.meta_title,
      content: <div dangerouslySetInnerHTML={{ __html: e.html }} />,
   }));

   useEffect(() => {
      console.log('issue :>> ', issue);
      console.log('issue2 :>> ', issue2);
   }, [issue, issue2]);

   const formatMessage = useCallback(() => {
      const email = encodeURIComponent(getRefObject(emailRef)?.value);
      const subject = encodeURIComponent(getRefObject(subjectRef)?.value);
      const message = encodeURIComponent(getRefObject(messageRef)?.value);
      const link = 'https://wa.me/62882005439488?text=';
      return `${link}Format%20Quesion%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A1.%20Topic%20%3D%20${topic}%0A2.%20Issue%20%3D%20${issue}%0A3.%20Issue2%20%3D%20${issue2}%0A4.%20Email%20%3D%20${email}%0A5.%20Subject%20%3D%20${subject}%0A6.%20Message%20%3D%20${message}`;
   }, [topic, issue, issue2, emailRef, subjectRef, messageRef]);

   const renderSocialIcon = (name: string, url: string) => (
      <AdibTooltip
         content={
            <div className="flex flex-col space-y-3 py-3 px-2 font-pop text-xs leading-none">
               <div className="font-medium">Click to jump to page</div>
               <div className="">{url}</div>
            </div>
         }
         followCursorProps={false}>
         <svg
            onClick={() => openInNewTab(url)}
            className="h-4 w-4 cursor-pointer fill-neutral4 transition-all duration-300 hover:fill-neutral2 dark:hover:fill-neutral8">
            <use xlinkHref={`#icon-${name}`} />
         </svg>
      </AdibTooltip>
   );

   return (
      <>
         <section className="relative mb-16 md:mb-28 lg2:mb-34">
            <div className="mx-auto block min-h-auto w-full max-w-7xl items-center px-8 pt-8 pb-4 md:flex md:min-h-740 md:px-10 md:pt-20 lg:px-20 lg2:py-28">
               <div className="relative z-3 mb-4 w-full md:mb-0 md:max-w-81.75 lg:max-w-546">
                  <div className="mb-3 text-base font-bold uppercase leading-none text-neutral4">
                     Build trust build connection
                  </div>
                  <div className="mb-5 font-dm text-5xl leading-custom1 tracking-custom md:text-64 md:leading-none">
                     How can we help
                  </div>
                  <div className="mb-6 text-base leading-normal text-neutral4">
                     Our social media contact list
                  </div>
                  <div className="flex space-x-6">
                     {renderSocialIcon(
                        'telegram',
                        'https://t.me/digiassetindo'
                     )}
                     {renderSocialIcon(
                        'whatsapp',
                        'https://wa.me/62882005439488'
                     )}
                     {renderSocialIcon(
                        'email',
                        'mailto:support@digiassetindo.com'
                     )}
                     {renderSocialIcon(
                        'instagram',
                        'https://www.instagram.com/digiassetindo'
                     )}
                     {renderSocialIcon(
                        'twitter',
                        'https://twitter.com/Digiasset_indo'
                     )}
                     {renderSocialIcon(
                        'facebook',
                        'https://www.facebook.com/Digiassetindo'
                     )}
                     {renderSocialIcon(
                        'youtube',
                        'https://www.youtube.com/@digiassetindo2948'
                     )}
                  </div>
                  {/* <form className="relative w-full md:max-w-72.5">
                     <input type="email" className="w-full h-12 pl-3.5 pr-12 rounded-3xl bg-none dark:bg-transparent border-2 border-neutral6 dark:border-neutral3 dark:focus:border-neutral4 focus:border-neutral4 outline-none leading-custom dark:text-neutral8 transition-colors duration-300" placeholder="Enter your email" />
                     <button type="submit" onClick={e => e.preventDefault()} className="absolute inset-y-2 right-2 w-8 h-8 bg-primary1 rounded-full hover:bg-primary2 transition-all duration-300">
                        <IcArrowRight className="translate-x-1" />
                     </button>
                  </form> */}
               </div>
               <div className="pointer-events-none static top-3 right-c-1/2-670 w-full pl-4 md:absolute md:right-c-1/2-700 md:w-700 md:pl-0 lg2:right-c-1/2-730 lg2:w-785">
                  <img
                     srcSet={`${illusContact2} 2x`}
                     src={illusContact}
                     alt="Contac"
                     title="Contact"
                  />
               </div>
            </div>
         </section>
         <section className="mb-16 md:mb-28 lg2:mb-34">
            <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg:px-20">
               <div>
                  <div className="mb-10 text-center font-dm text-4.5xl leading-1.2 tracking-custom1 md:mb-12 md:text-5xl md:leading-custom1 md:tracking-custom">
                     Frequently asked questions
                  </div>
                  <div className="relative mb-10 hidden justify-center space-x-3 md:flex">
                     <Nav
                        title="General"
                        isActive={tag === 'general'}
                        onClick={() => setTag('general')}
                     />
                     <Nav
                        title="Louncpad"
                        isActive={tag === 'launchpad'}
                        onClick={() => setTag('launchpad')}
                     />
                     <Nav
                        title="Airdrop"
                        isActive={tag === 'airdrop'}
                        onClick={() => setTag('airdrop')}
                     />
                     <Nav
                        title="P2P"
                        isActive={tag === 'p2p'}
                        onClick={() => setTag('p2p')}
                     />
                     <AdibTooltip
                        content={
                           <div className="py-3 px-2 font-pop text-xs font-medium leading-none">
                              {full ? 'Click to expand' : 'Click to narrow'}
                           </div>
                        }
                        followCursorProps={false}>
                        <svg
                           onClick={handleChangeFull}
                           className="absolute bottom-0 right-0 h-6 w-6 cursor-pointer fill-neutral4 outline-none transition-all duration-300 hover:fill-neutral2 dark:hover:fill-neutral8">
                           <use xlinkHref="#icon-full-screen" />
                        </svg>
                     </AdibTooltip>
                  </div>
               </div>
               <div
                  className={`${
                     full ? 'max-w-full' : 'max-w-546'
                  } mx-auto transition-all duration-700`}>
                  {newsLoadig ? (
                     <ul className="space-y-4">
                        <li>
                           <Skeleton
                              height={73}
                              isWithFull
                           />
                        </li>
                        <li>
                           <Skeleton
                              height={73}
                              isWithFull
                           />
                        </li>
                        <li>
                           <Skeleton
                              height={73}
                              isWithFull
                           />
                        </li>
                     </ul>
                  ) : news.length ? (
                     <Accordion items={accordionItems} />
                  ) : (
                     <div className="text-center">No result funds</div>
                  )}
               </div>
            </div>
         </section>
         <section className="bg-neutral7 py-16 dark:bg-shade1 md:py-28 lg2:py-34">
            <div className="mx-auto w-full max-w-7xl px-8 md:px-10 lg:px-20">
               <form className="mx-auto max-w-546 space-y-10">
                  <div className="space-y-8">
                     <div className="space-y-6">
                        <div className="text-xs font-bold uppercase leading-none text-neutral5">
                           Select a topic
                        </div>
                        <div className="-mx-2.5 flex">
                           <Pick
                              title="Wallet"
                              xlinkHref="wallet"
                              onChange={() => handleChangeTopic('wallet')}
                              isActive={topic === 'wallet'}
                           />
                           <Pick
                              title="Exchange"
                              xlinkHref="candlesticks"
                              onChange={() => handleChangeTopic('exchange')}
                              isActive={topic === 'exchange'}
                              variant="ungu"
                           />
                        </div>
                     </div>
                     <AdibDropdown
                        label="WHAT IS YOUR ISSUE ABOUT?"
                        data={[
                           'Have a question about Digiasset fees',
                           'Have a question about Ethereum fees',
                           'Have a question about Dogcoin fees',
                        ]}
                        onChange={handleChangeIssue}
                        defaultValue="Have a question about Digiasset fees"
                     />
                     <AdibDropdown
                        label="WHAT IS YOUR ISSUE ABOUT?"
                        data={[
                           'Transactions and spending',
                           'Transactions',
                           'Spending',
                        ]}
                        onChange={handleChangeIssue2}
                        defaultValue="Transactions and spending"
                     />
                     <InputGroup
                        label="email"
                        className="!bg-neutral8 dark:!bg-neutral2"
                        type="email"
                        ref={emailRef}
                        required
                     />
                     <InputGroup
                        label="subject"
                        className="!bg-neutral8 dark:!bg-neutral2"
                        ref={subjectRef}
                        required
                     />
                     <TextArea
                        ref={messageRef}
                        label="Message"
                     />
                  </div>
                  <div className="text-right">
                     <Button
                        text="Send message"
                        size="normal"
                        width="noFull"
                        onClick={() => {
                           console.log('issue', issue);
                           openInNewTab(formatMessage());
                        }}
                     />
                  </div>
               </form>
            </div>
         </section>
      </>
   );
};
