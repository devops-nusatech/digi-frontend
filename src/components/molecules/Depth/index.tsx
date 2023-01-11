import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Market, RootState, selectChartRebuildState, selectCurrentColorTheme, selectCurrentMarket, selectDepthAsks, selectDepthBids } from 'modules';

interface ReduxProps {
   asksItems: string[][];
   bidsItems: string[][];
   chartRebuild: boolean;
   colorTheme: string;
   currentMarket: Market | undefined;
}

// const asks = [
//    [
//        "19187.57",
//        "0.09108"
//    ],
//    [
//        "19186.49",
//        "0.02109"
//    ],
//    [
//        "19185.54",
//        "0.15"
//    ],
//    [
//        "19184.6",
//        "0.01179"
//    ],
//    [
//        "19184.34",
//        "0.15851"
//    ],
//    [
//        "19182.11",
//        "0.03353"
//    ],
//    [
//        "19182.06",
//        "0.04735"
//    ],
//    [
//        "19182.02",
//        "0.05135"
//    ],
//    [
//        "19181.97",
//        "0.07153"
//    ],
//    [
//        "19181.91",
//        "0.08373"
//    ],
//    [
//        "19181.84",
//        "0.0789"
//    ],
//    [
//        "19181.8",
//        "0.03608"
//    ],
//    [
//        "19181.77",
//        "0.04571"
//    ],
//    [
//        "19181.73",
//        "0.05138"
//    ],
//    [
//        "19181.68",
//        "0.07401"
//    ],
//    [
//        "19181.67",
//        "0.12376"
//    ],
//    [
//        "19181.62",
//        "0.084"
//    ],
//    [
//        "19181.57",
//        "0.12871"
//    ],
//    [
//        "19181.55",
//        "0.08427"
//    ],
//    [
//        "19181.38",
//        "0.12407"
//    ],
//    [
//        "19181.34",
//        "0.12157"
//    ],
//    [
//        "19181.28",
//        "0.13347"
//    ],
//    [
//        "19181.21",
//        "0.13655"
//    ],
//    [
//        "19181.17",
//        "0.12837"
//    ],
//    [
//        "19181.07",
//        "0.16655"
//    ],
//    [
//        "19181.05",
//        "0.16404"
//    ],
//    [
//        "19180.92",
//        "0.32696"
//    ]
// ];

type Props = ReduxProps;

const DepthFC = ({
   asksItems,
   bidsItems,
   chartRebuild,
   colorTheme,
   currentMarket
}: Props) => {
   const convertToDepthFormatAsks = () => {
      const asksItemsLength = asksItems.length;
      const bidsItemsLength = bidsItems.length;
      const resultLength = asksItemsLength > bidsItemsLength ? bidsItemsLength : asksItemsLength;
      const asks = asksItems.slice(0, resultLength);
      return asks;
   }
   const convertToDepthFormatBids = () => {
      const asksItemsLength = asksItems.length;
      const bidsItemsLength = bidsItems.length;
      const resultLength = asksItemsLength > bidsItemsLength ? bidsItemsLength : asksItemsLength;
      const bids = bidsItems.slice(0, resultLength);
      return bids;
   }

   const depthOptions = {
      chart: {
         type: 'area',
         zoomType: 'xy',
         height: '490px',
         backgroundColor: 'none'
      },
      title: {
         text: null
      },
      xAxis: {
         minPadding: 0,
         maxPadding: 0,
         plotLines: [{
            color: '#777E90',
            value: 0.1523,
            width: 1,
            label: {
               text: null,
               rotation: 90
            }
         }],
         title: {
            text: null
         }
      },
      yAxis: [{
         lineWidth: 1,
         gridLineWidth: 1,
         title: null,
         tickWidth: 1,
         tickLength: 5,
         tickPosition: 'inside',
         labels: {
            align: 'left',
            x: 8
         }
      }, {
         opposite: true,
         linkedTo: 0,
         lineWidth: 1,
         gridLineWidth: 0,
         title: null,
         tickWidth: 1,
         tickLength: 5,
         tickPosition: 'inside',
         labels: {
            align: 'right',
            x: -8
         }
      }],
      legend: false,
      credits: false,
      plotOptions: {
         area: {
            fillOpacity: 0.2,
            lineWidth: 1,
            step: 'center'
         }
      },
      tooltip: {
         headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
         valueDecimals: 2
      },
      series: [{
         name: 'Bids',
         // data: convertToDepthFormatAsks(),
         data: convertToDepthFormatAsks().map(e => e.map(i => Number(i))),
         // data: [[0.1524, 0.948665], [0.1539, 35.510715], [0.154, 39.883437], [0.1541, 40.499661], [0.1545, 43.262994000000006], [0.1547, 60.14799400000001], [0.1553, 60.30799400000001], [0.1558, 60.55018100000001], [0.1564, 68.381696], [0.1567, 69.46518400000001], [0.1569, 69.621464], [0.157, 70.398015], [0.1574, 70.400197], [0.1575, 73.199217], [0.158, 77.700017], [0.1583, 79.449017], [0.1588, 79.584064], [0.159, 80.584064], [0.16, 81.58156], [0.1608, 83.38156]],
         color: '#58BD7D'
      }, {
         name: 'Asks',
         // data: convertToDepthFormatBids(),
         data: convertToDepthFormatBids().map(e => e.map(i => Number(i))),
         // data: [[0.1435, 242.521842], [0.1436, 206.49862099999999], [0.1437, 205.823735], [0.1438, 197.33275], [0.1439, 153.677454], [0.144, 146.007722], [0.1442, 82.55212900000001], [0.1443, 59.152814000000006], [0.1444, 57.942260000000005], [0.1445, 57.483850000000004], [0.1446, 52.39210800000001], [0.1447, 51.867208000000005], [0.1448, 44.104697], [0.1449, 40.131217], [0.145, 31.878217], [0.1451, 22.794916999999998], [0.1453, 12.345828999999998], [0.1454, 10.035642], [0.148, 9.326642], [0.1522, 3.76317]],
         color: '#FF6838'
      }]
   }
   return (asksItems.length || bidsItems.length) && (
      <HighchartsReact
         highcharts={Highcharts}
         options={depthOptions}
      />
   );
};

const mapStateToProps = (state: RootState) => ({
   asksItems: selectDepthAsks(state),
   bidsItems: selectDepthBids(state),
   chartRebuild: selectChartRebuildState(state),
   colorTheme: selectCurrentColorTheme(state),
   currentMarket: selectCurrentMarket(state),
});

export const Depth = connect(mapStateToProps, null)(DepthFC as FunctionComponent);
