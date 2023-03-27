import React, { memo, useMemo } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useIntl } from 'react-intl';
import { Cuk, Nav, Button, PriceChart3, Image } from 'components';
import { useCurrenciesFetch, useMarket } from 'hooks';
import { renderCurrencyIcon } from 'helpers';
import { useHistory } from 'react-router';
import { Market } from 'modules';

interface Props {
   currentBidUnit: string;
   currentBidUnitsList: string[];
   markets: Market[];
   redirectToTrading: (key: string) => void;
   setCurrentBidUnit: (key: string) => void;
}

export const NewTickerTable = memo(({ redirectToTrading }: Props) => {
   useCurrenciesFetch();
   const { formatMessage } = useIntl();
   const { push } = useHistory();

   const { markets, setCurrentBidUnit, currentBidUnit, currentBidUnitsList } =
      useMarket();

   const optionsPositive = (data?: [][]) => {
      return {
         chart: {
            renderTo: null,
            defaultSeriesType: 'column',
            type: 'areaspline',
            height: 70,
            width: 136,
            backgroundColor: 'none',
         },
         title: {
            text: null,
         },
         legend: false,
         credits: false,
         xAxis: {
            visible: false,
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
            valueSuffix: ' IDR',
         },
         plotOptions: {
            areaspline: {
               lineWidth: 2,
               states: {
                  hover: {
                     lineWidth: 2,
                  },
               },
               marker: false,
               fillColor: {
                  linearGradient: [0, 0, 0, '80%'],
                  stops: [
                     [
                        0,
                        Highcharts.color('#58BD7D').setOpacity(0.4).get('rgba'),
                     ],
                     [1, Highcharts.color('#58BD7D').setOpacity(0).get('rgba')],
                  ],
               },
            },
         },
         series: [
            {
               name: 'Price',
               data,
               // data: [
               //    30585667, 29810458, 30567910, 29674472, 29600151, 30376753, 30884272,
               //    30762805, 30843212, 304513943, 299087325, 298994255, 298310135, 295631850,
               //    294439030, 298346563, 304013500, 296696043, 298312120, 302018100, 302700015,
               //    298578170, 299001518, 298755002, 299167002, 304440501, 304311000, 315006000,
               //    324980500, 322590001,
               // ],
               color: '#58BD7D',
            },
         ],
      };
   };
   const optionsNegative = (data?: []) => {
      return {
         chart: {
            renderTo: null,
            defaultSeriesType: 'column',
            type: 'areaspline',
            height: 70,
            width: 136,
            backgroundColor: 'none',
         },
         title: {
            text: null,
         },
         legend: false,
         credits: false,
         xAxis: {
            visible: false,
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
            valueSuffix: ' IDR',
         },
         plotOptions: {
            areaspline: {
               lineWidth: 2,
               states: {
                  hover: {
                     lineWidth: 2,
                  },
               },
               marker: false,
               fillColor: {
                  linearGradient: [0, 0, 0, '80%'],
                  stops: [
                     [
                        0,
                        Highcharts.color('#FF6838').setOpacity(0.4).get('rgba'),
                     ],
                     [1, Highcharts.color('#FF6838').setOpacity(0).get('rgba')],
                  ],
               },
            },
         },
         series: [
            {
               data,
               // data: [4, 5, 6, 3, 3, 4, 3, 5, 4],
               color: '#FF6838',
            },
         ],
      };
   };

   const columns = useMemo(
      () => [
         {
            Header: '#',
            accessor: (markets, index) => index + 1,
         },
         {
            Header: formatMessage({ id: 'page.body.marketsTable.header.pair' }),
            accessor: ({ base_unit, curency_data, name }) => (
               <div className="flex items-center space-x-4 md:space-x-5">
                  <div className="w-10 shrink-0">
                     <Image
                        src={renderCurrencyIcon(
                           base_unit,
                           curency_data?.logo_url
                        )}
                        className={`w-full ${
                           renderCurrencyIcon(
                              base_unit,
                              curency_data?.logo_url
                           )?.includes('http')
                              ? 'polygon bg-neutral8'
                              : ''
                        }`}
                        alt={name?.split('/').shift()}
                        title={name?.split('/').shift()}
                        width={40}
                        height={40}
                     />
                  </div>
                  {/* <ImagePaletteProvider defaults image={logo_url ? logo_url : icRipple}>
                  {({ backgroundColor, color, alternativeColor }) => (
                     <div style={{ backgroundColor, color }}>
                     This div has been themed based on
                     <span style={{ color: alternativeColor }}>
                        {logo_url ? logo_url : icRipple}
                        <img className="max-w-full" src={logo_url ? logo_url : icRipple} alt={name.split('/').shift()} />
                     </span>
                     </div>
                  )}
               </ImagePaletteProvider> */}
                  <div className="flex space-x-3">
                     <div>{name?.split('/').shift()}</div>
                     <div className="text-neutral5">
                        {name?.split('/').pop()}
                     </div>
                  </div>
               </div>
            ),
         },
         {
            Header: formatMessage({
               id: 'page.body.marketsTable.header.lastPrice',
            }),
            accessor: ({ last }) => last,
         },
         {
            Header: formatMessage({
               id: 'page.body.marketsTable.header.change',
            }),
            accessor: ({ price_change_percent }) => (
               <span
                  className={`${
                     price_change_percent.includes('+')
                        ? 'text-primary5'
                        : 'text-primary4'
                  }`}>
                  {price_change_percent}
               </span>
            ),
         },
         {
            Header: formatMessage({ id: 'page.body.marketsTable.header.high' }),
            accessor: ({ high }) => high,
         },
         {
            Header: formatMessage({ id: 'page.body.marketsTable.header.low' }),
            accessor: ({ low }) => low,
         },
         {
            Header: formatMessage({
               id: 'page.body.marketsTable.header.volume',
            }),
            accessor: ({ volume }) => volume,
         },
         {
            Header: 'Chart',
            accessor: ({ price_change_percent, kline, base_unit }) => {
               const klinesData: number[] = kline;
               let labels: number[];
               let data: number[];
               labels = klinesData.map(e => e[0]);
               data = klinesData.map(e => e[2]);
               return (
                  <div className="-mx-6">
                     <div className="w-25">
                        <PriceChart3
                           id={base_unit}
                           theme={
                              price_change_percent.includes('+')
                                 ? 'positive'
                                 : 'negative'
                           }
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
               );
            },
         },
         {
            Header: 'Trade',
            accessor: ({ id }) => (
               <div
                  onClick={() => redirectToTrading(id)}
                  className="inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-20 bg-none py-0 px-4 font-dm shadow-border transition-all duration-300 hover:-translate-y-1 hover:bg-neutral2 hover:text-neutral8 hover:shadow-sm dark:border-2 dark:border-solid dark:border-neutral4 dark:text-neutral8 dark:shadow-none">
                  Trade
               </div>
            ),
         },
      ],
      []
   );

   // const [currentPage, setCurrentPage] = useState(1);
   // const lastPage = 20;

   return (
      <section className="relative lg:mb-28 lg2:mb-34">
         <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20">
            <div className="mb-10 flex justify-between">
               <div className="whitespace-normal font-dm text-4.5xl font-bold md:text-5xl">
                  Market trend
               </div>
               <Button
                  text="View more"
                  onClick={() => push('/markets')}
                  variant="outline"
                  width="noFull"
               />
            </div>
            <div className="mb-[70px] flex items-start space-x-6">
               {currentBidUnitsList
                  .splice(1, currentBidUnitsList.length)
                  .map((item, index) => (
                     <Nav
                        key={index}
                        title={
                           item
                              ? item.toUpperCase()
                              : formatMessage({
                                   id: 'page.body.marketsTable.filter.all',
                                })
                        }
                        onClick={() => setCurrentBidUnit(item)}
                        isActive={item === currentBidUnit}
                     />
                  ))}
            </div>
            <div className="block w-full overflow-x-auto whitespace-nowrap">
               <table className="hidden w-full table-auto border-collapse">
                  <thead className="shadow-header dark:shadow-none">
                     <tr>
                        <th className="group relative px-2 py-5 text-start align-middle font-normal text-neutral4">
                           #
                        </th>
                        <th className="group relative px-2 py-5 text-start align-middle font-normal text-neutral4">
                           Market
                        </th>
                        <th className="group relative px-2 py-5 text-start align-middle font-normal text-neutral4">
                           Last Price
                        </th>
                        <th className="group relative px-2 py-5 text-start align-middle font-normal text-neutral4">
                           24 Change
                        </th>
                        <th className="group relative px-2 py-5 text-start align-middle font-normal text-neutral4">
                           24 High
                        </th>
                        <th className="group relative px-2 py-5 text-start align-middle font-normal text-neutral4">
                           24 Low
                        </th>
                        <th className="group relative px-2 py-5 text-start align-middle font-normal text-neutral4">
                           24 Volume
                        </th>
                        <th className="group relative px-2 py-5 text-start align-middle font-normal text-neutral4">
                           Char
                        </th>
                        <th className="group relative px-2 py-5 text-start align-middle font-normal text-neutral4">
                           Trade
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {markets?.length > 0 ? (
                        markets.map(
                           (
                              {
                                 id,
                                 name,
                                 logo_url,
                                 last,
                                 high,
                                 low,
                                 volume,
                                 change,
                                 price_change_percent,
                                 kline,
                                 base_unit,
                              },
                              index
                           ) => {
                              return (
                                 <tr key={index}>
                                    <td className="px-2 align-middle text-base font-medium">
                                       {index + 1}
                                    </td>
                                    <td className="px-2 align-middle text-base font-medium">
                                       <div className="flex items-center space-x-5">
                                          <div className="w-10 shrink-0">
                                             <img
                                                src={renderCurrencyIcon(
                                                   base_unit,
                                                   logo_url
                                                )}
                                                className={`w-full ${
                                                   renderCurrencyIcon(
                                                      base_unit,
                                                      logo_url
                                                   )?.includes('http')
                                                      ? 'polygon bg-neutral8'
                                                      : ''
                                                }`}
                                                alt={name?.split('/').shift()}
                                                title={name?.split('/').shift()}
                                             />
                                          </div>
                                          <div className="flex space-x-3">
                                             <div>
                                                {name?.split('/').shift()}
                                             </div>
                                             <div className="text-neutral5">
                                                {name?.split('/').pop()}
                                             </div>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="px-2 align-middle text-base font-medium">
                                       {last}
                                    </td>
                                    <td className="px-2 align-middle text-base font-medium">
                                       <span
                                          className={
                                             +(change || 0) < 0
                                                ? 'text-primary4'
                                                : 'text-chart1'
                                          }>
                                          {price_change_percent}
                                       </span>
                                    </td>
                                    <td className="px-2 align-middle text-base font-medium">
                                       {high}
                                    </td>
                                    <td className="px-2 align-middle text-base font-medium">
                                       {low}
                                    </td>
                                    <td className="px-2 align-middle text-base font-medium">
                                       {volume}
                                    </td>
                                    <td className="px-2 align-middle text-base font-medium">
                                       <div className="-mx-6">
                                          <HighchartsReact
                                             highcharts={Highcharts}
                                             // options={+(change || 0) < 0 ? optionsNegative() : optionsPositive()}
                                             options={
                                                +(change || 0) < 0
                                                   ? optionsNegative(
                                                        kline as any
                                                     )
                                                   : optionsPositive(
                                                        kline as any
                                                     )
                                             }
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
                              );
                           }
                        )
                     ) : (
                        <tr>
                           <td
                              className="px-2 text-center align-middle text-base font-medium text-neutral4"
                              colSpan={12}>
                              <div>
                                 {formatMessage({ id: 'page.noDataToShow' })}
                              </div>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
               {/* <Paginations
                  currentPage={currentPage}
                  lastPage={lastPage}
                  maxLength={7}
                  setCurrentPage={setCurrentPage}
               /> */}
               <Cuk
                  columns={columns}
                  data={markets}
               />
            </div>
         </div>
      </section>
   );
});
