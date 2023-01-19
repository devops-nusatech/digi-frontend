import React, {
   FC,
   memo,
   useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useIntl } from 'react-intl';
import { Market, selectCurrencies } from 'modules';
import { Decimal, Cuk, Nav, Button, PriceChart3 } from 'components';
import { useCurrenciesFetch } from 'hooks';
import { renderCurrencyIcon } from 'helpers';
import { useHistory } from 'react-router';

interface Props {
   currentBidUnit: string;
   currentBidUnitsList: string[];
   markets: Market[];
   redirectToTrading: (key: string) => void;
   setCurrentBidUnit: (key: string) => void;
}

export const NewTickerTable: FC<Props> = memo(({
   currentBidUnit,
   markets,
   setCurrentBidUnit,
   currentBidUnitsList,
   redirectToTrading,
}) => {
   useCurrenciesFetch();
   const currencies = useSelector(selectCurrencies);
   const { formatMessage } = useIntl();
   const { push } = useHistory();

   const combainById = (a1, a2) =>
      a1.map((itm, i) => ({
         no: i + 1,
         ...a2.find(item => (item.id === itm.base_unit) && item),
         ...itm
      }));
   const combineMarkets = combainById(markets, currencies);

   const optionsPositive = (data?: []) => {
      return {
         chart: {
            renderTo: null,
            defaultSeriesType: 'column',
            type: 'areaspline',
            height: 70,
            width: 136,
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
            visible: false,
         },
         tooltip: {
            backgroundColor: '#a3a3a3',
            borderColor: 'none',
            borderWidth: 0,
            shadow: false,
            // crosshairs: true,
            // shared: true,
            outside: 'none',
            borderRadius: 12,
            style: {
               width: 500,
               color: '#fcfcf5',
               fontSize: 10,
               whiteSpace: 'nowrap',
            },
            valueSuffix: ' IDR'
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
            name: 'Price',
            data,
            // data: [
            //    30585667, 29810458, 30567910, 29674472, 29600151, 30376753, 30884272,
            //    30762805, 30843212, 304513943, 299087325, 298994255, 298310135, 295631850,
            //    294439030, 298346563, 304013500, 296696043, 298312120, 302018100, 302700015,
            //    298578170, 299001518, 298755002, 299167002, 304440501, 304311000, 315006000,
            //    324980500, 322590001,
            // ],
            color: '#58BD7D'
         }]

      }
   }
   const optionsNegative = (data?: []) => {
      return {
         chart: {
            renderTo: null,
            defaultSeriesType: 'column',
            type: 'areaspline',
            height: 70,
            width: 136,
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
            // crosshairs: true,
            // shared: true,
            outside: 'none',
            borderRadius: 12,
            style: {
               width: 500,
               color: '#fcfcf5',
               fontSize: 10,
               whiteSpace: 'nowrap',
            },
            valueSuffix: ' IDR'
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
            data,
            // data: [4, 5, 6, 3, 3, 4, 3, 5, 4],
            color: '#FF6838'
         }]
      }
   }

   const columns = useMemo(() => [
      {
         Header: '#',
         accessor: (markets, index) => index + 1,
      },
      {
         Header: formatMessage({ id: 'page.body.marketsTable.header.pair' }),
         accessor: ({ base_unit, name, icon_url }) => (
            <div className="flex space-x-4 md:space-x-5 items-center">
               <div className="shrink-0 w-10">
                  <img
                     src={renderCurrencyIcon(base_unit, icon_url)}
                     className={`w-full ${renderCurrencyIcon(base_unit, icon_url).includes('http') ? 'polygon bg-neutral8' : ''}`}
                     alt={name?.split('/').shift()}
                     title={name?.split('/').shift()}
                  />
               </div>
               {/* <ImagePaletteProvider defaults image={icon_url ? icon_url : icRipple}>
                  {({ backgroundColor, color, alternativeColor }) => (
                     <div style={{ backgroundColor, color }}>
                     This div has been themed based on
                     <span style={{ color: alternativeColor }}>
                        {icon_url ? icon_url : icRipple}
                        <img className="max-w-full" src={icon_url ? icon_url : icRipple} alt={name.split('/').shift()} />
                     </span>
                     </div>
                  )}
               </ImagePaletteProvider> */}
               <div className="flex space-x-3">
                  <div>{name?.split('/').shift()}</div>
                  <div className="text-neutral5">{name?.split('/').pop()}</div>
               </div>
            </div>
         ),
      },
      {
         Header: formatMessage({ id: 'page.body.marketsTable.header.lastPrice' }),
         accessor: ({ last, price_precision }) => Decimal.format(last, price_precision, ','),
      },
      {
         Header: formatMessage({ id: 'page.body.marketsTable.header.change' }),
         accessor: ({ change, price_change_percent }) => (
            <span className={`${price_change_percent.includes('+') ? 'text-primary5' : 'text-primary4'}`}>
               {price_change_percent}
            </span>
         ),
      },
      {
         Header: formatMessage({ id: 'page.body.marketsTable.header.high' }),
         accessor: ({ high, price_precision }) => Decimal.format(high, price_precision, ','),
      },
      {
         Header: formatMessage({ id: 'page.body.marketsTable.header.low' }),
         accessor: ({ low, price_precision }) => Decimal.format(low, price_precision, ','),
      },
      {
         Header: formatMessage({ id: 'page.body.marketsTable.header.volume' }),
         accessor: ({ volume, price_precision }) => Decimal.format(volume, price_precision, ','),
      },
      {
         Header: 'Chart',
         accessor: ({ change, price_change_percent, kline, base_unit }) => {
            const klinesData: number[] = kline;
            let labels: number[], data: number[];
            labels = klinesData.map(e => e[0]);
            data = klinesData.map(e => e[2]);
            return (
               <div className="-mx-6">
                  <div className="w-25">
                     <PriceChart3
                        id={base_unit}
                        theme={price_change_percent.includes('+') ? 'positive' : 'negative'}
                        labels={labels}
                        data={data}
                     />
                     {/* <PriceChart2
                        id={base_unit}
                        theme={price_change_percent.includes('+') ? 'positive' : 'negative'}
                        labels={labels}
                        data={data}
                     /> */}
                  </div>
                  {/* <HighchartsReact
                     ref={chartRef}
                     highcharts={Highcharts}
                     // options={+(change || 0) < 0 ? optionsNegative() : optionsPositive()}
                     options={+(change || 0) < 0 ? optionsNegative(klines) : optionsPositive(klines)}
                  /> */}
               </div>
            )
         },
      },
      {
         Header: 'Trade',
         accessor: ({ id }) => (
            <div
               onClick={() => redirectToTrading(id)}
               className="inline-flex font-dm justify-center items-center h-10 rounded-20 py-0 px-4 whitespace-nowrap bg-none shadow-border dark:shadow-none dark:border-2 dark:border-solid dark:border-neutral4 hover:bg-neutral2 hover:-translate-y-1 hover:shadow-sm hover:text-neutral8 dark:text-neutral8 transition-all duration-300 cursor-pointer"
            >
               Trade
            </div>
         ),
      },
   ], []);

   // const [currentPage, setCurrentPage] = useState(1);
   // const lastPage = 20;

   return (
      <section className="relative lg:mb-28 lg2:mb-34">
         <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
            <div className="flex justify-between mb-10">
               <div className="whitespace-normal text-4.5xl md:text-5xl font-dm font-bold">
                  Market trend
               </div>
               <Button
                  text="View more"
                  onClick={() => push('/markets')}
                  variant="outline"
                  width="noFull"
               />
            </div>
            <div className="flex space-x-6 items-start mb-[70px]">
               {currentBidUnitsList.map((item, index) => (
                  <Nav
                     key={index}
                     title={item ? item.toUpperCase() : formatMessage({ id: 'page.body.marketsTable.filter.all' })}
                     onClick={() => setCurrentBidUnit(item)}
                     isActive={item === currentBidUnit}
                  />
               ))}
            </div>
            <div className="block w-full overflow-x-auto whitespace-nowrap">
               <table className="table-auto w-full border-collapse hidden">
                  <thead className="shadow-header dark:shadow-none">
                     <tr>
                        <th className="group relative px-2 py-5 font-normal text-start text-neutral4 align-middle">#</th>
                        <th className="group relative px-2 py-5 font-normal text-start text-neutral4 align-middle">Market</th>
                        <th className="group relative px-2 py-5 font-normal text-start text-neutral4 align-middle">Last Price</th>
                        <th className="group relative px-2 py-5 font-normal text-start text-neutral4 align-middle">24 Change</th>
                        <th className="group relative px-2 py-5 font-normal text-start text-neutral4 align-middle">24 High</th>
                        <th className="group relative px-2 py-5 font-normal text-start text-neutral4 align-middle">24 Low</th>
                        <th className="group relative px-2 py-5 font-normal text-start text-neutral4 align-middle">24 Volume</th>
                        <th className="group relative px-2 py-5 font-normal text-start text-neutral4 align-middle">Char</th>
                        <th className="group relative px-2 py-5 font-normal text-start text-neutral4 align-middle">Trade</th>
                     </tr>
                  </thead>
                  <tbody>
                     {combineMarkets?.length > 0 ? combineMarkets.map(({ id, name, icon_url, last, high, low, volume, price_precision, change, price_change_percent, kline, base_unit }, index) => {
                        return (
                           <tr key={index}>
                              <td className="px-2 align-middle text-base font-medium">{index + 1}</td>
                              <td className="px-2 align-middle text-base font-medium">
                                 <div className="flex space-x-5 items-center">
                                    <div className="shrink-0 w-10">
                                       <img
                                          src={renderCurrencyIcon(base_unit, icon_url)}
                                          className={`w-full ${renderCurrencyIcon(base_unit, icon_url).includes('http') ? 'polygon bg-neutral8' : ''}`}
                                          alt={name?.split('/').shift()}
                                          title={name?.split('/').shift()}
                                       />
                                    </div>
                                    <div className="flex space-x-3">
                                       <div>{name?.split('/').shift()}</div>
                                       <div className="text-neutral5">{name?.split('/').pop()}</div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-2 align-middle text-base font-medium">
                                 {Decimal.format(last, price_precision, ',')}
                              </td>
                              <td className="px-2 align-middle text-base font-medium">
                                 <span className={+(change || 0) < 0 ? 'text-primary4' : 'text-chart1'}>
                                    {price_change_percent}
                                 </span>
                              </td>
                              <td className="px-2 align-middle text-base font-medium">
                                 {Decimal.format(high, price_precision, ',')}
                              </td>
                              <td className="px-2 align-middle text-base font-medium">
                                 {Decimal.format(low, price_precision, ',')}
                              </td>
                              <td className="px-2 align-middle text-base font-medium">
                                 {Decimal.format(volume, price_precision, ',')}
                              </td>
                              <td className="px-2 align-middle text-base font-medium">
                                 <div className="-mx-6">
                                    <HighchartsReact
                                       highcharts={Highcharts}
                                       // options={+(change || 0) < 0 ? optionsNegative() : optionsPositive()}
                                       options={+(change || 0) < 0 ? optionsNegative(kline) : optionsPositive(kline)}
                                    />
                                 </div>
                              </td>
                              <td className="px-2 align-middle text-base font-medium">
                                 <Button
                                    onClick={() => redirectToTrading(id)}
                                    text="Trade"
                                    size="normal"
                                    variant="outline"
                                 />
                              </td>
                           </tr>
                        )
                     }) : (
                        <div className="">Null</div>
                     )
                     }
                  </tbody>
               </table>
               {/* <Paginations
                  currentPage={currentPage}
                  lastPage={lastPage}
                  maxLength={7}
                  setCurrentPage={setCurrentPage}
               /> */}
               <Cuk columns={columns} data={combineMarkets} />
            </div>
         </div>
      </section>
   );
});
