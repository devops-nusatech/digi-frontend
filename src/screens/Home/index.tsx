import React, { useCallback } from 'react';
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
import { injectIntl, useIntl } from 'react-intl';
import { PrimitiveType } from 'intl-messageformat';

export const Home = injectIntl(
   withRouter(({ history }) => {
      const { formatMessage } = useIntl();
      const translate = useCallback(
         (id: string, values?: Record<string, PrimitiveType>) =>
            formatMessage({ id }, { ...values }),
         [formatMessage]
      );
      return (
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
               srcSet={illusCard2}
               textButton="Get started now"
               scrollTo="learn">
               <StaticticCurrency />
            </Hero>
            <Learn />
            <TableMarket
               translate={translate}
               push={history && history?.push}
            />
            <Download />
            <Step />
         </>
      );
   })
);
