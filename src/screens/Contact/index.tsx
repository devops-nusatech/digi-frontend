import React, {
   useCallback,
   useEffect,
   useRef,
   useState
} from 'react';
import {
   Accordion,
   AccordionData,
   AdibDropdown,
   AdibTooltip,
   Button,
   InputGroup,
   Label,
   Nav,
   Skeleton
} from 'components';
import {
   useNews2Fetch,
   useScrollUp
} from 'hooks';
import {
   illusContact,
   illusContact2
} from 'assets';
import {
   getRefObject,
   openInNewTab
} from 'helpers';

type Tag = 'general' | 'launchpad' | 'airdrop' | 'p2p';
type Topic = 'wallet' | 'exchange';
type State = {
   topic: Topic;
   issue: string;
   issue2: string;
   full: boolean;
}

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

   const handleChangeTopic = (topic: Topic) => setState({
      ...state,
      topic
   });
   const handleChangeIssue = (issue: string) => setState({
      ...state,
      issue
   });
   const handleChangeIssue2 = useCallback((issue2: string) => setState({
      ...state,
      issue2
   }), [issue2, state, setState]);
   const handleChangeFull = () => setState({
      ...state,
      full: !full
   });

   const [tag, setTag] = useState<Tag>('general');

   const {
      news,
      newsLoadig,
   } = useNews2Fetch(25, tag);

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
      return `${link}Format%20Quesion%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0A1.%20Topic%20%3D%20${topic}%0A2.%20Issue%20%3D%20${issue}%0A3.%20Issue2%20%3D%20${issue2}%0A4.%20Email%20%3D%20${email}%0A5.%20Subject%20%3D%20${subject}%0A6.%20Message%20%3D%20${message}`
   }, [
      topic,
      issue,
      issue2,
      emailRef,
      subjectRef,
      messageRef,
      getRefObject,
      setState,
   ]);

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
         <svg
            onClick={() => openInNewTab(url)}
            className="cursor-pointer w-4 h-4 fill-neutral4 hover:fill-neutral2 dark:hover:fill-neutral8 transition-all duration-300"
         >
            <use xlinkHref={`#icon-${name}`} />
         </svg>
      </AdibTooltip>
   );

   return (
      <>
         <section className="relative mb-16 md:mb-28 lg2:mb-34">
            <div className="block md:flex items-center min-h-auto md:min-h-740 pt-8 pb-4 md:pt-20 lg2:py-28 w-full max-w-7xl px-8 md:px-10 lg:px-20 mx-auto">
               <div className="relative z-3 w-full md:max-w-81.75 lg:max-w-546 mb-4 md:mb-0">
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
                     {renderSocialIcon('instagram', 'https://www.instagram.com/digiassetindo')}
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
            <div className="w-full max-w-7xl px-8 md:px-10 lg:px-20 mx-auto">
               <div>
                  <div className="text-4.5xl md:text-5xl leading-1.2 md:leading-custom1 tracking-custom1 md:tracking-custom font-dm mb-10 md:mb-12 text-center">
                     Frequently asked questions
                  </div>
                  <div className="hidden md:flex justify-center space-x-3 mb-10 relative">
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
                           <div className="py-3 px-2 font-pop text-xs leading-none font-medium">
                              {full ? 'Click to expand' : 'Click to narrow'}
                           </div>
                        }
                        followCursorProps={false}
                     >
                        <svg
                           onClick={handleChangeFull}
                           className="absolute bottom-0 right-0 w-6 h-6 fill-neutral4 hover:fill-neutral2 dark:hover:fill-neutral8 cursor-pointer outline-none transition-all duration-300"
                        >
                           <use xlinkHref="#icon-full-screen" />
                        </svg>
                     </AdibTooltip>
                  </div>
               </div>
               <div className={`${full ? 'max-w-full' : 'max-w-546'} transition-all duration-700 mx-auto`}>
                  {newsLoadig ? (
                     <ul className="space-y-4">
                        <li><Skeleton height={73} isWithFull /></li>
                        <li><Skeleton height={73} isWithFull /></li>
                        <li><Skeleton height={73} isWithFull /></li>
                     </ul>
                  ) : news.length ? (
                     <Accordion items={accordionItems} />
                  ) : (
                     <div className="text-center">
                        No result funds
                     </div>
                  )}
               </div>
            </div>
         </section>
         <section className="bg-neutral7 dark:bg-shade1 py-16 md:py-28 lg2:py-34">
            <div className="w-full max-w-7xl px-8 md:px-10 lg:px-20 mx-auto">
               <form className="max-w-546 mx-auto space-y-10">
                  <div className="space-y-8">
                     <div className="space-y-6">
                        <div className="text-xs leading-none font-bold uppercase text-neutral5">
                           Select a topic
                        </div>
                        <div className="flex -mx-2.5">
                           <label className="relative grow-0 shrink-0 basis-c-1/2-5 w-c-1/2-5 mx-2.5 select-none cursor-pointer">
                              <input onChange={() => handleChangeTopic('wallet')} className="peer absolute top-0 left-0 opacity-0" type="radio" name="topic" checked={topic === 'wallet'} />
                              <span className="flex items-center justify-center space-x-3.5 h-12 md:h-20 p-3 rounded-lg bg-neutral8 dark:bg-neutral2 peer-checked:shadow-dropdown-primary transition-all duration-300">
                                 <span className="hidden md:flex justify-center items-center shrink-0 w-11 h-11 rounded-full bg-primary1">
                                    <svg className="h-5 2-5 fill-neutral8">
                                       <use xlinkHref="#icon-wallet"></use>
                                    </svg>
                                 </span>
                                 <span className="font-dm text-base leading-none font-bold">
                                    Wallet
                                 </span>
                              </span>
                           </label>
                           <label className="relative grow-0 shrink-0 basis-c-1/2-5 w-c-1/2-5 mx-2.5 select-none cursor-pointer">
                              <input onChange={() => handleChangeTopic('exchange')} className="peer absolute top-0 left-0 opacity-0" type="radio" name="topic" checked={topic === 'exchange'} />
                              <span className="flex items-center justify-center space-x-3.5 h-12 md:h-20 p-3 rounded-lg bg-neutral8 dark:bg-neutral2 peer-checked:shadow-dropdown-primary transition-all duration-300">
                                 <span className="hidden md:flex justify-center items-center shrink-0 w-11 h-11 rounded-full bg-primary3">
                                    <svg className="h-5 2-5 fill-neutral8">
                                       <use xlinkHref="#icon-candlesticks"></use>
                                    </svg>
                                 </span>
                                 <span className="font-dm text-base leading-none font-bold">
                                    Exchange
                                 </span>
                              </span>
                           </label>
                        </div>
                     </div>
                     <AdibDropdown
                        label="WHAT IS YOUR ISSUE ABOUT?"
                        data={['Have a question about Digiasset fees', 'Have a question about Ethereum fees', 'Have a question about Dogcoin fees']}
                        onChange={handleChangeIssue}
                        defaultValue='Have a question about Digiasset fees'
                     />
                     <AdibDropdown
                        label="WHAT IS YOUR ISSUE ABOUT?"
                        data={['Transactions and spending', 'Transactions', 'Spending']}
                        onChange={handleChangeIssue2}
                        defaultValue='Transactions and spending'
                     />
                     <InputGroup label="email" className="!bg-neutral8 dark:!bg-neutral2" type="email" ref={emailRef} required />
                     <InputGroup label="subject" className="!bg-neutral8 dark:!bg-neutral2" ref={subjectRef} required />
                     <div className="space-y-2.5">
                        <Label label="Message" />
                        <div className="relative">
                           <textarea required placeholder="Say something" className="overflow-auto w-full rounded-xl border-2 border-neutral6 dark:border-neutral3 focus:border-neutral4 focus:dark:border-neutral4 bg-none shadow-none outline-none font-medium h-38 px-3.5 py-2.5 bg-neutral8 dark:bg-neutral2 transition-colors duration-200" ref={messageRef} />
                        </div>
                     </div>
                  </div>
                  <div className="text-right">
                     <Button
                        text="Send message"
                        size="normal"
                        width="noFull"
                        onClick={() => {
                           console.log('issue', issue)
                           openInNewTab(formatMessage())
                        }}
                     />
                  </div>
               </form>
            </div>
         </section>
      </>
   )
}
