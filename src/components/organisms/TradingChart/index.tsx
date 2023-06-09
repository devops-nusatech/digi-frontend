import React, { ReactElement, memo, useState } from 'react';
import { MarketDepthsComponent, TradingChart as Chart } from 'containers';
import { icLogoLight } from 'assets';
import { Nav } from 'components';
import { useDispatch } from 'react-redux';
import { klineFetch, klineUpdatePeriod, klineUpdateTimeRange } from 'modules';
import { CurrentMarket, IsDisplay } from 'types';

type ChartPeriode = '1M' | '5M' | '15M' | '30M';
type Resolution = 1 | 5 | 15 | 30;

interface TradingChartProps extends CurrentMarket, IsDisplay {}

export const TradingChart = memo(function TradingChart({
   currentMarket,
   display,
}: TradingChartProps): ReactElement {
   const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
   const [chartPeriode, setChartPeriode] = useState<ChartPeriode>('15M');

   const dispatch = useDispatch();

   const handleUpdateKlineToChart = (resolution: Resolution) => {
      const date = new Date();
      const market = String(currentMarket?.id);
      const from = Math.floor(
         new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - resolution
         ).getTime() / 1000
      );
      const to = Math.floor(Date.now() / 1000);

      dispatch(
         klineFetch({
            market,
            resolution,
            from: from.toString(),
            to: to.toString(),
         })
      );
      dispatch(klineUpdateTimeRange({ from, to }));
      dispatch(klineUpdatePeriod(resolution.toString()));
      setChartPeriode(
         resolution === 1
            ? '1M'
            : resolution === 5
            ? '5M'
            : resolution === 15
            ? '15M'
            : '30M'
      );
   };

   return (
      <div
         className={`relative z-2 rounded shadow-card2 lg:!block ${
            display ? '' : 'lg-max:hidden'
         }`}>
         <div className="flex items-center justify-between rounded border-b border-neutral6 bg-neutral8 p-4 dark:border-0 dark:bg-shade2">
            {currentTabIndex !== 0 ? (
               <div className="font-dm text-base font-bold text-neutral3 dark:text-neutral8">
                  Chart Depth
               </div>
            ) : (
               <div className="flex items-center space-x-2">
                  <Nav
                     title="Time"
                     theme="grey"
                     className="pointer-events-none !text-neutral3 dark:!text-neutral8"
                  />
                  <Nav
                     title="1M"
                     isActive={chartPeriode === '1M'}
                     onClick={() => handleUpdateKlineToChart(1)}
                     theme="grey"
                  />
                  <Nav
                     title="5M"
                     isActive={chartPeriode === '5M'}
                     onClick={() => handleUpdateKlineToChart(5)}
                     theme="grey"
                  />
                  <Nav
                     title="15M"
                     isActive={chartPeriode === '15M'}
                     onClick={() => handleUpdateKlineToChart(15)}
                     theme="grey"
                  />
                  <Nav
                     title="30M"
                     isActive={chartPeriode === '30M'}
                     onClick={() => handleUpdateKlineToChart(30)}
                     theme="grey"
                  />
               </div>
            )}
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
               {/* <Nav
                  title="Highcharts"
                  isActive={currentTabIndex === 2}
                  onClick={() => setCurrentTabIndex(2)}
                  theme="grey"
               /> */}
            </div>
         </div>
         <div className="relative block">
            <div className="overflow-hidden rounded bg-neutral8 dark:bg-shade2">
               <div className={currentTabIndex !== 0 ? 'hidden' : ''}>
                  <Chart />
               </div>
               <div
                  className={`-m-px !h-[492px] ${
                     currentTabIndex !== 1 ? 'hidden' : ''
                  }`}>
                  <MarketDepthsComponent />
               </div>
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
               <img
                  className="opacity-25"
                  src={icLogoLight}
                  alt="Logo"
               />
            </div>
         </div>
      </div>
   );
});
