import React from 'react';
import { withRouter } from 'react-router-dom';
import {
   Download,
   Hero,
   Learn,
   StaticticCurrency,
   Step,
   TableMarket,
} from 'components';
import { illusCard, illusCard2 } from 'assets';

export const Home = withRouter(({ history }) => (
   <>
      <Hero
         title={
            <>
               <span className="transition-all duration-300 hover:bg-gradient-to-tr hover:from-primary1 hover:to-primary5 hover:bg-clip-text hover:text-transparent">
                  Buy & sell
               </span>
               <br />
               crypto in minutes
            </>
         }
         subTitle="Trade Bitcoin, Ethereum, USDT, and the top altcoins on the legendary crypto asset exchange."
         path="/markets"
         src={illusCard}
         srcSet={illusCard2}>
         <StaticticCurrency />
      </Hero>
      <Learn />
      <TableMarket push={history && history?.push} />
      <Download />
      <Step />
   </>
));
