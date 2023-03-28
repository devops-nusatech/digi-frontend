import React from 'react';
import { withRouter } from 'react-router-dom';
import { Download, Hero, Learn, Step, TableMarket } from 'components';

export const Home = withRouter(({ history }) => (
   <>
      <Hero />
      <Learn />
      <TableMarket push={history && history?.push} />
      <Download />
      <Step />
   </>
));
