import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, Nav } from 'components';
import { icBitcoin, icEthereum, icMaid, IcShorting, illusLesson, illusLesson11, illusLesson12, illusLesson2, illusLesson21, illusLesson22, illusMarket, illusMarket2 } from 'assets';

const optionsPositive = {
   chart: {
      renderTo: null,
      defaultSeriesType: 'column',
      type: 'areaspline',
      height: 70,
      width: 100,
      backgroundColor: 'none'
   },
   title: {
      text: null
   },
   legend: false,
   credits: false,
   xAxis: {
      visible: false
   },
   yAxis: {
      visible: false
   },
   tooltip: {
      backgroundColor: '#a3a3a3',
      borderColor: 'none',
      borderWidth: 0,
      shadow: false,
      // crosshairs: false,
      // enabled: false,
      outside: 'none',
      borderRadius: 30,
      style: {
         color: '#fcfcf5',
         fontSize: 16,
         whiteSpace: 'nowrap',
      }
   },
   plotOptions: {
      areaspline: {
         lineWidth: 2,
         states: {
            hover: {
               lineWidth: 2
            }
         },
         marker: false,
         fillColor: {
            linearGradient: [0, 0, 0, '80%'],
            stops: [[0, Highcharts.color('#58BD7D').setOpacity(0.4).get('rgba')], [1, Highcharts.color('#58BD7D').setOpacity(0).get('rgba')]]
         }
      }
   },
   series: [{
      data: [3, 4, 3, 5, 4, 10, 12, 6, 3],
      color: '#58BD7D'
   }]
}

const optionsNegative = {
   chart: {
      renderTo: null,
      defaultSeriesType: 'column',
      type: 'areaspline',
      height: 70,
      width: 100,
      backgroundColor: 'none'
   },
   title: {
      text: null
   },
   legend: false,
   credits: false,
   xAxis: {
      visible: false
   },
   yAxis: {
      visible: false
   },
   tooltip: {
      backgroundColor: '#a3a3a3',
      borderColor: 'none',
      borderWidth: 0,
      shadow: false,
      // crosshairs: false,
      // enabled: false,
      outside: 'none',
      borderRadius: 30,
      style: {
         color: '#fcfcf5',
         fontSize: 16,
         whiteSpace: 'nowrap',
      }
   },
   plotOptions: {
      areaspline: {
         lineWidth: 2,
         states: {
            hover: {
               lineWidth: 2
            }
         },
         marker: false,
         fillColor: {
            linearGradient: [0, 0, 0, '80%'],
            stops: [[0, Highcharts.color('#FF6838').setOpacity(0.4).get('rgba')], [1, Highcharts.color('#FF6838').setOpacity(0).get('rgba')]]
         }
      }
   },
   series: [{
      data: [4, 5, 6, 3, 3, 4, 3, 5, 4],
      color: '#FF6838'
   }]
}

const rows = 3;

const newss = [
   {
      id: 1,
      name: 'Learn about BTC coin and earn an All-Access Pass',
      category: 'learn & earn',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson,
      img2: illusLesson2,
      isVideo: true,
      baseColor: 'indigo'
   },
   {
      id: 2,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson11,
      img2: illusLesson12,
      isVideo: false,
      baseColor: 'orange'
   },
   {
      id: 3,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson21,
      img2: illusLesson22,
      isVideo: true,
      baseColor: 'blue'
   },
   {
      id: 4,
      name: 'Learn about BTC coin and earn an All-Access Pass',
      category: 'learn & earn',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson,
      img2: illusLesson2,
      isVideo: true,
      baseColor: 'indigo'
   },
   {
      id: 5,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson11,
      img2: illusLesson12,
      isVideo: false,
      baseColor: 'orange'
   },
   {
      id: 6,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson21,
      img2: illusLesson22,
      isVideo: true,
      baseColor: 'blue'
   },
   {
      id: 7,
      name: 'Learn about BTC coin and earn an All-Access Pass',
      category: 'learn & earn',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson,
      img2: illusLesson2,
      isVideo: true,
      baseColor: 'indigo'
   },
   {
      id: 8,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson11,
      img2: illusLesson12,
      isVideo: false,
      baseColor: 'orange'
   },
   {
      id: 9,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson21,
      img2: illusLesson22,
      isVideo: true,
      baseColor: 'blue'
   },
   {
      id: 10,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson21,
      img2: illusLesson22,
      isVideo: true,
      baseColor: 'blue'
   },
   {
      id: 11,
      name: 'Learn about BTC coin and earn an All-Access Pass',
      category: 'learn & earn',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson,
      img2: illusLesson2,
      isVideo: true,
      baseColor: 'indigo'
   },
   {
      id: 12,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson11,
      img2: illusLesson12,
      isVideo: false,
      baseColor: 'orange'
   },
   {
      id: 13,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson21,
      img2: illusLesson22,
      isVideo: true,
      baseColor: 'blue'
   },
   {
      id: 14,
      name: 'Learn about BTC coin and earn an All-Access Pass',
      category: 'learn & earn',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson,
      img2: illusLesson2,
      isVideo: true,
      baseColor: 'indigo'
   },
   {
      id: 15,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson11,
      img2: illusLesson12,
      isVideo: false,
      baseColor: 'orange'
   },
   {
      id: 16,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson21,
      img2: illusLesson22,
      isVideo: true,
      baseColor: 'blue'
   },
   {
      id: 17,
      name: 'Learn about BTC coin and earn an All-Access Pass',
      category: 'learn & earn',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson,
      img2: illusLesson2,
      isVideo: true,
      baseColor: 'indigo'
   },
   {
      id: 18,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson11,
      img2: illusLesson12,
      isVideo: false,
      baseColor: 'orange'
   },
   {
      id: 19,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson21,
      img2: illusLesson22,
      isVideo: true,
      baseColor: 'blue'
   },
   {
      id: 20,
      name: 'Submit your watchlist and win USDT',
      category: 'weekly watchlist airdrop',
      author: 'Floyd Buckridge',
      date: 'Feb 03, 2021',
      img1: illusLesson21,
      img2: illusLesson22,
      isVideo: true,
      baseColor: 'blue'
   },
]

export const Market = () => {
   const { push } = useHistory();
   const [tabMarket, setTabMarket] = useState<number>(0);
   const [news] = useState(newss);
   const [more, setMore] = useState<number>(rows);

   return (
      <>
         <div className="relative pt-16 md:pt-[156px] md:pb-28 min-h-auto md:min-h-[692px] bg-secondary5 dark:bg-shade1">
            <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
               <div className="relative z-3 max-w-[545px] mb-[143px]">
                  <div className="mb-4 md:mb-8 text-4.5xl leading-12 md:text-64 tracking-custom font-dm font-bold">
                     Today’s Cryptocurrency prices
                  </div>
                  <div className="text-base md:text-2xl leading-custom2 tracking-custom1 text-neutral3 dark:text-neutral5">
                     The global crypto market cap is
                     <strong className="font-semibold">$1.86T</strong>
                  </div>
               </div>
               <div className="static md:absolute top-0 right-[calc(50%-820px)] lg2:right-[calc(50%-760px)] w-auto md:w-[780px] -mr-17 mb-6 -ml-7.5 md:m-0 pointer-events-none">
                  <img className="w-full" srcSet={`${illusMarket2} 2x`} src={illusMarket} alt="Card" />
               </div>
            </div>
         </div>
         <div className="relative -mt-[137px] mb-[72px]">
            <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
               <div className="rounded-3xl shadow-card2 bg-neutral8 dark:bg-shade1 border border-neutral7 dark:border-neutral2 -mx-4 mb-8 md:m-0">
                  <div className="flex space-x-4.5">
                     <Link to="/market" className="group flex w-1/3 p-6">
                        <div className="shrink-0 w-10 mr-4">
                           <img src={icBitcoin} alt="Bitcoin" />
                        </div>
                        <div className="space-y-1">
                           <div className="flex items-center space-x-3">
                              <div className="text-xs font-semibold text-neutral4 leading-custom4">
                                 BTC/USDT
                              </div>
                              <div className="inline-block py-0.5 px-2 rounded-xl leading-custom4 text-xs font-semibold text-neutral8 bg-primary5">
                                 +0.79%
                              </div>
                           </div>
                           <div className="text-2xl leading-custom2 font-semibold tracking-custom1 group-hover:text-primary1 transition-colors duration-300">
                              36,641.20
                           </div>
                           <div>36,641.20</div>
                        </div>
                        <div className="w-[6.25rem] -mt-4 m-1.5 hidden lg2:block">
                           <HighchartsReact
                              highcharts={Highcharts}
                              options={optionsPositive}
                           />
                        </div>
                     </Link>
                     <Link to="/market" className="group flex w-1/3 p-6">
                        <div className="shrink-0 w-10 mr-4">
                           <img src={icEthereum} alt="Bitcoin" />
                        </div>
                        <div className="space-y-1">
                           <div className="flex items-center space-x-3">
                              <div className="text-xs font-semibold text-neutral4 leading-custom4">
                                 ETH/USDT
                              </div>
                              <div className="inline-block py-0.5 px-2 rounded-xl leading-custom4 text-xs font-semibold text-neutral8 bg-primary5">
                                 +0.79%
                              </div>
                           </div>
                           <div className="text-2xl leading-custom2 font-semibold tracking-custom1 group-hover:text-primary1 transition-colors duration-300">
                              36,641.20
                           </div>
                           <div>36,641.20</div>
                        </div>
                        <div className="w-[6.25rem] -mt-4 m-1.5 hidden lg2:block">
                           <HighchartsReact
                              highcharts={Highcharts}
                              options={optionsPositive}
                           />
                        </div>
                     </Link>
                     <Link to="/market" className="group flex w-1/3 p-6">
                        <div className="shrink-0 w-10 mr-4">
                           <img src={icMaid} alt="Bitcoin" />
                        </div>
                        <div className="space-y-1">
                           <div className="flex items-center space-x-3">
                              <div className="text-xs font-semibold text-neutral4 leading-custom4">
                                 ATC/USDT
                              </div>
                              <div className="inline-block py-0.5 px-2 rounded-xl leading-custom4 text-xs font-semibold text-neutral8 bg-primary5">
                                 +0.79%
                              </div>
                           </div>
                           <div className="text-2xl leading-custom2 font-semibold tracking-custom1 group-hover:text-primary1 transition-colors duration-300">
                              6,641.20
                           </div>
                           <div>36,641.20</div>
                        </div>
                        <div className="w-[6.25rem] -mt-4 m-1.5 hidden lg2:block">
                           <HighchartsReact
                              highcharts={Highcharts}
                              options={optionsNegative}
                           />
                        </div>
                     </Link>
                  </div>
                  <div className="block md:flex justify-between items-center py-8.5 px-8 border-t border-neutral6 dark:border-neutral2">
                     <div className="flex space-x-3">
                        <Nav
                           title="Cryptocurrencies"
                           isActive={tabMarket === 0}
                           onClick={() => setTabMarket(0)}
                        />
                        <Nav
                           title="DeFi"
                           isActive={tabMarket === 1}
                           onClick={() => setTabMarket(1)}
                        />
                        <Nav
                           title="Innovation"
                           isActive={tabMarket === 2}
                           onClick={() => setTabMarket(2)}
                        />
                        <Nav
                           title="POS"
                           isActive={tabMarket === 3}
                           onClick={() => setTabMarket(3)}
                        />
                        <Nav
                           title="NFT"
                           isActive={tabMarket === 4}
                           onClick={() => setTabMarket(4)}
                        />
                        <Nav
                           title="POW"
                           isActive={tabMarket === 5}
                           onClick={() => setTabMarket(5)}
                        />
                     </div>
                     <Button
                        text="Trade"
                        variant="outline"
                        size="normal"
                        width="noFull"
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="relative mb-16 md:mb-28 lg2:mb-34">
            <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
               <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                     <thead>
                        <tr>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                              <div className="flex items-center space-x-1 cursor-pointer">
                                 <div>#</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                              <div className="flex items-center space-x-1 cursor-pointer">
                                 <div>Name</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                              <div className="flex items-center space-x-1 cursor-pointer justify-end">
                                 <div>Price</div>
                                 <IcShorting className="fill-neutral4" />
                              </div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                              <div>24h %</div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                              <div>7d %</div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                              <div className="flex items-center space-x-1 cursor-pointer justify-end">
                                 <div>Marketcap</div>
                                 <svg className="w-5 h-5 fill-neutral4">
                                    <use xlinkHref="#icon-coin" />
                                 </svg>
                              </div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                              <div className="flex items-center space-x-1 cursor-pointer justify-end">
                                 <div>Volume (24h)</div>
                                 <svg className="w-5 h-5 fill-neutral4">
                                    <use xlinkHref="#icon-chart" />
                                 </svg>
                              </div>
                           </th>
                           <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                              <div>Chart</div>
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr style={{ transition: 'background .2s' }} className="group">
                           <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs p-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                              <div className="flex space-x-2 items-center">
                                 <svg className="w-4 h-4 fill-neutral4 hover:fill-secondary3 transition-all duration-300">
                                    <use xlinkHref="#icon-star-outline"></use>
                                 </svg>
                                 <div>1</div>
                              </div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                              <div className="flex space-x-3 items-center">
                                 <div className="shrink-0 w-8">
                                    <img className="max-w-full" src={icBitcoin} alt="" />
                                 </div>
                                 <div className="flex items-center space-x-1">
                                    <div>Bitcoin</div>
                                    <div className="font-normal text-neutral4">BTC</div>
                                 </div>
                              </div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div>$36,201.34</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div className="text-primary5">+6.04%</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div className="text-primary4">-2.02%</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div>$328,564,656,654</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div>$328,564,656,654</div>
                           </td>
                           <td className="rounded-r-xl p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div className="w-24 -my-[15px] ml-auto group-hover:hidden">
                                 <HighchartsReact
                                    highcharts={Highcharts}
                                    options={optionsPositive}
                                 />
                              </div>
                              <div className="w-24 ml-auto hidden group-hover:block">
                                 <Button
                                    text="Buy"
                                    size="normal"
                                    onClick={() => push('/trading/btcidr')}
                                 />
                              </div>
                           </td>
                        </tr>
                        <tr style={{ transition: 'background .2s' }} className="group">
                           <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs p-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                              <div className="flex space-x-2 items-center">
                                 <svg className="w-4 h-4 fill-neutral4 hover:fill-secondary3 transition-all duration-300">
                                    <use xlinkHref="#icon-star-outline"></use>
                                 </svg>
                                 <div>2</div>
                              </div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                              <div className="flex space-x-3 items-center">
                                 <div className="shrink-0 w-8">
                                    <img className="max-w-full" src={icEthereum} alt="" />
                                 </div>
                                 <div className="flex items-center space-x-1">
                                    <div>Etherium</div>
                                    <div className="font-normal text-neutral4">ETH</div>
                                 </div>
                              </div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div>$36,201.34</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div className="text-primary5">+6.04%</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div className="text-primary4">-2.02%</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div>$328,564,656,654</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div>$328,564,656,654</div>
                           </td>
                           <td className="rounded-r-xl p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <div className="w-24 -my-[15px] ml-auto group-hover:hidden">
                                 <HighchartsReact
                                    highcharts={Highcharts}
                                    options={optionsPositive}
                                 />
                              </div>
                              <div className="w-24 ml-auto hidden group-hover:block">
                                 <Button
                                    text="Buy"
                                    size="normal"
                                    onClick={() => push('/trading/btcidr')}
                                 />
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <div className="relative mb-16 md:mb-28 lg2:mb-34">
            <div className="w-full max-w-7xl mx-auto px-8 md:px-10 lg:px-20">
               <div className="max-w-[455px] mx-auto mb-12 lg2:mb-16 text-center">
                  <div className="mb-5 text-5xl leading-custom1 tracking-custom font-dm font-bold">
                     Learn and earn
                  </div>
                  <div className="text-base text-neutral3 dark:text-neutral5">
                     Stacks is a production-ready library of stackable content blocks built in React Native
                  </div>
               </div>
               <div className="block md:flex flex-wrap md:-mx-4 md:-mt-4 space-y-8 md:space-y-0">
                  {
                     news.slice(0, more).map(({
                        id,
                        name,
                        category,
                        author,
                        date,
                        img1,
                        img2,
                        isVideo,
                        baseColor,
                     }) => (
                        <Link to="/market" key={id} className="group p-4 w-full md:w-1/2 lg:w-1/3 flex flex-col items-start transition-colors duration-300">
                           <div className="relative overflow-hidden w-full mb-8 md:mb-12 rounded-xl before:content-[''] before:pb-[75%] lg2:before:pb-[57%] before:block">
                              <img className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" srcSet={`${img2} 2x`} src={img1} alt="Lesson" />
                              {
                                 isVideo && (
                                    <button className="group flex justify-center items-center w-12 h-12 absolute top-1/2 left-1/2 z-3 rounded-full bg-neutral8 shadow-play -translate-x-1/2 -translate-y-1/2">
                                       <svg className="w-3 h-3 fill-neutral4 group-hover:fill-primary1 group-hover:scale-125 transition-all duration-300">
                                          <use xlinkHref="#icon-play" />
                                       </svg>
                                    </button>
                                 )
                              }
                           </div>
                           <div className={`inline-block pt-2 pb-1.5 px-2 rounded text-xs leading-none font-bold uppercase text-neutral8 ${baseColor === 'indigo' ? 'bg-primary3' : baseColor === 'orange' ? 'bg-primary4' : 'bg-primary1'} mb-4`}>
                              {category}
                           </div>
                           <div className="mb-8 md:mb-12 text-2xl leading-custom2 font-semibold tracking-custom1 group-hover:text-primary1 transition-all duration-300">
                              {name}
                           </div>
                           <div className="flex flex-wrap justify-between w-full mt-auto font-medium text-neutral4">
                              <div className="flex space-x-3 items-center mr-4">
                                 <div className="shrink-0 w-6 h-6 rounded-full overflow-hidden bg-primary5" />
                                 <div>{author}</div>
                              </div>
                              <div>{date}</div>
                           </div>
                           <div className="mt-0 md:mt-12 bg-none rounded-md md:bg-neutral6 dark:md:bg-neutral3 h-0.5 w-full" />
                        </Link>
                     ))
                  }
               </div>
            </div>
            {
               more < news?.length && (
                  <div className="mt-9 md:mt-12 text-center">
                     <Button
                        text="Load more"
                        variant="outline"
                        size="normal"
                        icLeft={
                           <div className="mr-4 ml-[5px] scale-[0.8] w-[1em] h-[1em] rounded-full text-[4px] -indent-[9999em] animate-loader dark:animate-loader-white" />
                        }
                        onClick={() => setMore(more + rows)}
                        width="noFull"
                     />
                  </div>
               )
            }
         </div>
      </>
   )
}
