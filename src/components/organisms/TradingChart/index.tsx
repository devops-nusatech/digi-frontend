import React, { FC, ReactElement, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useIntl } from 'react-intl';
// import { selectCurrentMarket } from 'modules';
import { MarketDepthsComponent, TradingChart as Chart } from 'containers';
import { icLogoLight } from 'assets';
import { Depth, Nav } from 'components';
// import { TabPanel, MyTab } from 'components';

type ChartPeriode = '1M' | '5M' | '15M' | '30M';

export const TradingChart: FC = (): ReactElement => {
   // const intl = useIntl();
   // const currentMarket = useSelector(selectCurrentMarket);
   const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
   const [chartPeriode, setChartPeriode] = useState<ChartPeriode>('15M');

   // const renderTabs = () => [
   //    {
   //       content: currentTabIndex === 0 && <Chart />,
   //       label: intl.formatMessage({ id: 'page.body.charts.tabs.chart' })
   //    },
   //    {
   //       content: currentTabIndex === 1 && <MarketDepthsComponent />,
   //       label: intl.formatMessage({ id: 'page.body.charts.tabs.depth' })
   //    }
   // ]

   return (
      <div className="lg:block relative z-3 shadow-card2 rounded">
         <div className="flex items-center justify-between p-4 rounded bg-neutral8 border-b border-neutral6 dark:bg-shade2 dark:border-0">
            {
               currentTabIndex !== 0 ? (
                  <div className="font-dm font-bold text-base text-neutral3 dark:text-neutral8">
                     Chart Depth
                  </div>
               ) : (
                  <div>
                     <div className="flex items-center space-x-2">
                        <Nav
                           title="Time"
                           theme="grey"
                           className="!text-neutral3 dark:!text-neutral8 pointer-events-none"
                        />
                        <Nav
                           title="1M"
                           isActive={chartPeriode === '1M'}
                           onClick={() => setChartPeriode('1M')}
                           theme="grey"
                        />
                        <Nav
                           title="5M"
                           isActive={chartPeriode === '5M'}
                           onClick={() => setChartPeriode('5M')}
                           theme="grey"
                        />
                        <Nav
                           title="15M"
                           isActive={chartPeriode === '15M'}
                           onClick={() => setChartPeriode('15M')}
                           theme="grey"
                        />
                        <Nav
                           title="30M"
                           isActive={chartPeriode === '30M'}
                           onClick={() => setChartPeriode('30M')}
                           theme="grey"
                        />
                     </div>
                  </div>
               )
            }
            <div className="flex items-center space-x-2">
               <Nav
                  title="Trading view"
                  isActive={currentTabIndex === 0}
                  onClick={() => setCurrentTabIndex(0)}
                  theme="grey"
               />
               <Nav
                  title="Depth"
                  isActive={currentTabIndex === 1}
                  onClick={() => setCurrentTabIndex(1)}
                  theme="grey"
               />
               <Nav
                  title="Highcharts"
                  isActive={currentTabIndex === 2}
                  onClick={() => setCurrentTabIndex(2)}
                  theme="grey"
               />
            </div>
         </div>
         <div className="block relative">
            <div className="overflow-hidden rounded bg-neutral8 dark:bg-shade2">
               <div className={currentTabIndex !== 0 ? 'hidden' : ''}>
                  <Chart />
               </div>
               <div className={`!h-[492px] -m-px ${currentTabIndex !== 1 ? 'hidden' : ''}`}>
                  <MarketDepthsComponent />
               </div>
               <div className={`!h-[492px] -m-px ${currentTabIndex !== 2 ? 'hidden' : ''}`}>
                  <Depth />
               </div>
            </div>
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
               <img className="opacity-25" src={icLogoLight} alt="Logo" />
            </div>
         </div>
      </div>
   )
}
