import * as React from 'react';
import { RouterProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { IntlProps } from '../../';
import {
   icLogoLight,
   illusCard11,
   illusCard12,
   illusCard21,
   illusCard22,
   illusCard31,
   illusCard32,
   illusNews11,
   illusNews12,
   illusCard,
   illusCard2
} from 'assets';
import { Hero, Learn, Download, Step, MyMarketsTable, Button, StaticticCurrency } from 'components';
import { openInNewTab, toggleColorTheme } from 'helpers';
// import { LogoIcon } from '../../assets/images/LogoIcon';
// import { MarketsTable } from '../../containers';
import {
   RootState,
   selectCurrentColorTheme,
   selectUserLoggedIn,
} from 'modules';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const FeaturesExchangeIcon = require('../../assets/images/landing/features/Exchange.svg');
const FeaturesTypesIcon = require('../../assets/images/landing/features/Types.svg');
const FeaturesCustomizeIcon = require('../../assets/images/landing/features/Customize.svg');
const FeaturesSecurityIcon = require('../../assets/images/landing/features/Security.svg');
const FeaturesCommunityIcon = require('../../assets/images/landing/features/Community.svg');
const FeaturesAPIIcon = require('../../assets/images/landing/features/API.svg');

// const TelegramIcon = require('../../assets/images/landing/social/Telegram.svg');
// const LinkedInIcon = require('../../assets/images/landing/social/LinkedIn.svg');
// const TwitterIcon = require('../../assets/images/landing/social/Twitter.svg');
// const YouTubeIcon = require('../../assets/images/landing/social/YouTube.svg');
// const RedditIcon = require('../../assets/images/landing/social/Reddit.svg');
// const FacebookIcon = require('../../assets/images/landing/social/Facebook.svg');
// const MediumIcon = require('../../assets/images/landing/social/Medium.svg');
// const CoinMarketIcon = require('../../assets/images/landing/social/CoinMarket.svg');


interface ReduxProps {
   isLoggedIn: boolean;
   colorTheme: string;
}

type Props = ReduxProps & RouterProps & IntlProps;

class Landing extends React.Component<Props> {
   public componentDidMount() {
      if (this.props.colorTheme === 'light') {
         toggleColorTheme('dark');
      }
   }

   public componentWillReceiveProps(next: Props) {
      if (next.colorTheme === 'light') {
         toggleColorTheme('dark');
      }
   }

   public componentWillUnmount() {
      if (this.props.colorTheme === 'light') {
         toggleColorTheme(this.props.colorTheme);
      }
   }

   public renderMarketInfoBlock() {
      return (
         <div className="pg-landing-screen__market-info">
            <div className="pg-landing-screen__market-info__wrap">
               <div className="pg-landing-screen__market-info__wrap__title">
                  <h1>{this.translate('page.body.landing.marketInfo.title.text1')}</h1>
                  <h1>{this.translate('page.body.landing.marketInfo.title.text2')}</h1>
                  <Link to="/trading" className="landing-button">
                     {this.translate('page.body.landing.marketInfo.title.button')}
                  </Link>
               </div>
               {/* <MyMarketsTable /> */}
            </div>
         </div>
      );
   }

   public renderPlatformInfoBlock() {
      return (
         <div className="pg-landing-screen__platform-info">
            <div className="pg-landing-screen__platform-info__wrap">
               <div className="pg-landing-screen__platform-info__wrap__item">
                  <span>{this.translate('page.body.landing.platformInfo.item.first.value')}</span>
                  <span>{this.translate('page.body.landing.platformInfo.item.first.title')}</span>
               </div>
               <div className="pg-landing-screen__platform-info__wrap__item">
                  <span>{this.translate('page.body.landing.platformInfo.item.second.value')}</span>
                  <span>{this.translate('page.body.landing.platformInfo.item.second.title')}</span>
               </div>
               <div className="pg-landing-screen__platform-info__wrap__item">
                  <span>{this.translate('page.body.landing.platformInfo.item.third.value')}</span>
                  <span>{this.translate('page.body.landing.platformInfo.item.third.title')}</span>
               </div>
            </div>
         </div>
      );
   }

   public renderRegisterBlock() {
      return (
         <div className="pg-landing-screen__register">
            <div className="pg-landing-screen__register__wrap">
               <div className="pg-landing-screen__register__wrap__item">
                  <h1>{this.translate('page.body.landing.register.item.title')}</h1>
                  <h2>{this.translate('page.body.landing.register.item.text')}</h2>
                  <Link to="/signup" className="landing-button">
                     {this.translate('page.body.landing.register.item.button')}
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   public renderFeaturesBlock() {
      return (
         <div className="pg-landing-screen__features">
            <div className="pg-landing-screen__features__wrap">
               <h1>{this.translate('page.body.landing.features.title')}</h1>
               <div className="pg-landing-screen__features__content">
                  <div className="pg-landing-screen__features__content__row">
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesExchangeIcon}
                           alt={this.translate('page.body.landing.features.features.item1.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item1.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item1.text')}</span>
                     </div>
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesTypesIcon}
                           alt={this.translate('page.body.landing.features.features.item2.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item2.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item2.text')}</span>
                     </div>
                  </div>
                  <div className="pg-landing-screen__features__content__row">
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesCustomizeIcon}
                           alt={this.translate('page.body.landing.features.features.item3.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item3.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item3.text')}</span>
                     </div>
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesSecurityIcon}
                           alt={this.translate('page.body.landing.features.features.item4.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item4.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item4.text')}</span>
                     </div>
                  </div>
                  <div className="pg-landing-screen__features__content__row">
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesCommunityIcon}
                           alt={this.translate('page.body.landing.features.features.item5.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item5.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item5.text')}</span>
                     </div>
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesAPIIcon}
                           alt={this.translate('page.body.landing.features.features.item6.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item6.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item6.text')}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   public renderTradeOnTheGoBlock() {
      return (
         <div className="pg-landing-screen__trade-on-the-go">
            <div className="pg-landing-screen__trade-on-the-go__wrap">
               <div className="pg-landing-screen__trade-on-the-go__wrap__image" />
               <div className="pg-landing-screen__trade-on-the-go__wrap__content">
                  <h1>{this.translate('page.body.landing.tradeOnTheGo.item.title')}</h1>
                  <h2>{this.translate('page.body.landing.tradeOnTheGo.item.text1')}</h2>
                  <h2>{this.translate('page.body.landing.tradeOnTheGo.item.text2')}</h2>
                  <h2>{this.translate('page.body.landing.tradeOnTheGo.item.text3')}</h2>
                  <Link to="/trading/" className="landing-button">
                     {this.translate('page.body.landing.tradeOnTheGo.item.button')}
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   public renderStartTradingBlock() {
      return (
         <div className="pg-landing-screen__start-trading">
            <div className="pg-landing-screen__start-trading__wrap">
               <h1>{this.translate('page.body.landing.startTrading.title')}</h1>
               <div className="pg-landing-screen__start-trading__wrap__content">
                  <Link to="/signup" className="landing-button">
                     {this.translate('page.body.landing.startTrading.button1')}
                  </Link>
                  <Link to="/trading/" className="landing-button landing-button--secondary">
                     {this.translate('page.body.landing.startTrading.button2')}
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   public renderPopular() {
      const responsive = {
         superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
         },
         desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
         },
         tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 2
         },
         mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1
         }
      };
      return (
         <section className="relative bg-neutral7 dark:bg-shade1 py-16 lg:py-28 lg2:py-34 popular">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
               <div className="max-w-[455px] mt-0 mb-12 md:mb-16 mx-auto md:text-center">
                  <div className="mb-5 text-4.5xl md:text-5xl font-dm font-bold tracking-custom1 md:tracking-custom leading-[1.2] md:leading-custom1">
                     Become a crypto trader in seconds
                  </div>
                  <div className="text-base text-neutral4">We've got everything you need to start trading.</div>
               </div>
               <div className="-mx-3">
                  <Carousel responsive={responsive}>
                     <div className="flex flex-col items-center py-12 px-8 rounded-20 bg-neutral8 dark:bg-neutral2 text-center hover:border-[0.09375rem] hover:shadow-card dark:shadow-input-dark h-auto mx-3 transition-all duration-300">
                        <div className="flex justify-center items-center h-40 mt-0 mb-8 mx-auto">
                           <img className="max-w-full max-h-full block pointer-events-none" srcSet={`${illusCard12} 2x`} src={illusCard11} alt="" />
                        </div>
                        <div className="mb-4 text-base font-medium">Buy & Sell Crypto</div>
                        <div className="mb-4 text-neutral4">We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.</div>
                        <Button
                           text="Buy crypto"
                           variant="outline"
                           size="normal"
                           width="noFull"
                           onClick={() => this.props.history.push('/trading/')}
                        />
                     </div>
                     <div className="flex flex-col items-center py-12 px-8 rounded-20 bg-neutral8 dark:bg-neutral2 text-center hover:border-[0.09375rem] hover:shadow-card dark:shadow-input-dark h-auto mx-3 transition-all duration-300">
                        <div className="flex justify-center items-center h-40 mt-0 mb-8 mx-auto">
                           <img className="max-w-full max-h-full block pointer-events-none" srcSet={`${illusCard22} 2x`} src={illusCard21} alt="" />
                        </div>
                        <div className="mb-4 text-base font-medium">Trade Assets</div>
                        <div className="mb-4 text-neutral4">We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.</div>
                        <Button
                           text="Trade now"
                           variant="outline"
                           size="normal"
                           width="noFull"
                           onClick={() => this.props.history.push('/trading/')}
                        />
                     </div>
                     <div className="flex flex-col items-center py-12 px-8 rounded-20 bg-neutral8 dark:bg-neutral2 text-center hover:border-[0.09375rem] hover:shadow-card dark:shadow-input-dark h-auto mx-3 transition-all duration-300">
                        <div className="flex justify-center items-center h-40 mt-0 mb-8 mx-auto">
                           <img className="max-w-full max-h-full block pointer-events-none" srcSet={`${illusCard32} 2x`} src={illusCard31} alt="" />
                        </div>
                        <div className="mb-4 text-base font-medium">Learn Crypto</div>
                        <div className="mb-4 text-neutral4">We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.</div>
                        <Button
                           text="Learn now"
                           variant="outline"
                           size="normal"
                           width="noFull"
                           onClick={() => openInNewTab('https://www.digiassetindo.com/blog/')}
                        />
                     </div>
                  </Carousel>
               </div>
               <div className="text-center mt-10 lg:mt-17">
                  <Button
                     text="Contact us"
                     variant="outline"
                     className="md:w-2/6 lg:w-auto"
                     onClick={() => this.props.history.push('/faq')}
                  />
               </div>
            </div>
         </section>
      )
   }

   public renderNews() {
      const news = {
         superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
         },
         desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
         },
         tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 1
         },
         mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1
         },
      };
      return (
         <section className="relative bg-neutral7 dark:bg-shade1 py-16 lg:py-28 lg2:py-34 mb-16 lg:mb-28 lg2:mb-34">
            <div className="w-full max-w-5.5xl mx-auto px-6 md:px-10 lg:px-20">
               <div className="max-w-xl mt-0 mb-12 md:mb-16 lg:mb-20 mx-auto text-center">
                  <img className="mx-auto mb-4" src={icLogoLight} alt="Logo" />
                  <div className="mb-5 text-4.5xl md:text-5xl font-dm font-bold tracking-custom1 md:tracking-custom leading-[1.2] md:leading-custom1">
                     Stay in the know on crypto with Digiasset
                  </div>
                  <div className="text-base text-neutral4">
                     A creative agency that lead and inspire.
                  </div>
               </div>
               <Carousel responsive={news}>
                  <div className="relative flex flex-col lg:flex-row items-center min-h-[544px] lg:py-20 lg:px-24 lg:rounded-3xl lg:bg-neutral8 lg:dark:bg-neutral2 lg:shadow-card2">
                     <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <div className="text-xs mb-4 uppercase font-bold text-neutral4">
                           Crypto News
                        </div>
                        <div className="text-2xl mb-5 leading-custom2 tracking-custom1">
                           Be Part of our Global Community
                        </div>
                        <div className="mb-24 text-base text-neutral4">
                           Let’s stay in touch. Join our communities to keep up with the Digiasset team and our traders from across the world.
                        </div>
                        <Button
                           text="Join now"
                           variant="outline"
                           size="normal"
                           width="noFull"
                           onClick={() => this.props.isLoggedIn ? this.props.history.push('/wallets') : this.props.history.push('/register')}
                        />
                     </div>
                     <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="w-full overflow-visible">
                           <img className="pointer-events-none object-cover w-full h-full scale-[1.3] -translate-x-10 lg:translate-x-10" srcSet={`${illusNews12} 2x`} src={illusNews11} alt="" />
                        </div>
                     </div>
                  </div>
                  <div className="relative flex flex-col lg:flex-row items-center min-h-[544px] lg:py-20 lg:px-24 lg:rounded-3xl lg:bg-neutral8 lg:dark:bg-neutral2 lg:shadow-card2">
                     <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <div className="text-xs mb-4 uppercase font-bold text-neutral4">
                           Crypto News
                        </div>
                        <div className="text-2xl mb-5 leading-custom2 tracking-custom1">
                           Be Part of our Global Community
                        </div>
                        <div className="mb-24 text-base text-neutral4">
                           Let’s stay in touch. Join our communities to keep up with the Digiasset team and our traders from across the world.
                        </div>
                        <Button
                           text="Join now"
                           variant="outline"
                           size="normal"
                           width="noFull"
                           onClick={() => this.props.isLoggedIn ? this.props.history.push('/wallets') : this.props.history.push('/register')}
                        />
                     </div>
                     <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="w-full overflow-visible">
                           <img className="pointer-events-none object-cover w-full h-full scale-[1.3] -translate-x-10 lg:translate-x-10" srcSet={`${illusNews12} 2x`} src={illusNews11} alt="" />
                        </div>
                     </div>
                  </div>
                  <div className="relative flex flex-col lg:flex-row items-center min-h-[544px] lg:py-20 lg:px-24 lg:rounded-3xl lg:bg-neutral8 lg:dark:bg-neutral2 lg:shadow-card2">
                     <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <div className="text-xs mb-4 uppercase font-bold text-neutral4">
                           Crypto News
                        </div>
                        <div className="text-2xl mb-5 leading-custom2 tracking-custom1">
                           Be Part of our Global Community
                        </div>
                        <div className="mb-24 text-base text-neutral4">
                           Let’s stay in touch. Join our communities to keep up with the Digiasset team and our traders from across the world.
                        </div>
                        <Button
                           text="Join now"
                           variant="outline"
                           size="normal"
                           width="noFull"
                           onClick={() => this.props.isLoggedIn ? this.props.history.push('/wallets') : this.props.history.push('/register')}
                        />
                     </div>
                     <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="w-full overflow-visible">
                           <img className="pointer-events-none object-cover w-full h-full scale-[1.3] -translate-x-10 lg:translate-x-10" srcSet={`${illusNews12} 2x`} src={illusNews11} alt="" />
                        </div>
                     </div>
                  </div>
               </Carousel>
            </div>
         </section>
      )
   }

   public renderMain() {
      return (
         <>
            <Hero
               title={
                  <>
                     <span className="hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-tr hover:from-primary1 hover:to-primary5 transition-all duration-300">
                        Buy & sell
                     </span>
                     <br />
                     crypto in minutes
                  </>
               }
               subTitle="Trade Bitcoin, Ethereum, USDT, and the top altcoins on the legendary crypto asset exchange."
               path="/markets"
               src={illusCard}
               srcSet={illusCard2}
            >
               <StaticticCurrency />
            </Hero>
            <Learn />
            <MyMarketsTable />
            {this.renderPopular()}
            <Download />
            {this.renderNews()}
            <Step />
         </>
      )
   }

   public render() {
      return (
         <>
            {this.renderMain()}
            {/* {this.renderMarketInfoBlock()}
                {this.renderPlatformInfoBlock()}
                {this.renderRegisterBlock()}
                {this.renderFeaturesBlock()}
                {this.renderTradeOnTheGoBlock()}
                {this.renderStartTradingBlock()} */}
         </>
      );
   }

   // private handleScrollTop = () => {
   //    window.scrollTo({ top: 0, behavior: 'smooth' });
   // };

   private translate = (key: string) => this.props.intl.formatMessage({ id: key });
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   isLoggedIn: selectUserLoggedIn(state),
   colorTheme: selectCurrentColorTheme(state),
});

export const LandingScreen = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, null),
)(Landing) as React.ComponentClass;
