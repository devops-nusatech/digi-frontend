import React, { useRef } from 'react';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
   ChartData,
   ChartOptions,
   ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

type Theme = 'positive' | 'negative';

const options: ChartOptions<'line'> = {
   plugins: {
      title: {
         display: false,
         text: 'Price Chart',
         font: {
            size: 35,
         },
      },
      legend: {
         display: false,
      },
      subtitle: {
         display: false,
      },
      tooltip: {
         // enabled: false,
         // callbacks: {
         //    // title: () => koko,
         // },
         // displayColors: false,
         // padding: 10,
         // position: 'nearest',
         // caretSize: 10,
         // backgroundColor: 'rgba(255,255,255,.9)',
         // bodyFont: {
         //    size: 15,
         //    family: 'Poppins, sans-serif',
         // },
         // titleColor: '#FF6838',
         // bodyColor: '#FF6838',
         // borderColor: '#ff0343',
      },
   },
   layout: {
      padding: {
         left: 0,
         right: 0,
         top: 0,
         bottom: 0,
      },
   },
   scales: {
      x: {
         grid: {
            display: false,
         },
         display: false,
      },
      y: {
         grid: {
            display: false,
         },
         display: false,
      },
   },
};

const datas = (
   labels: number[],
   data: number[],
   borderColor: Theme,
   gradient?: CanvasGradient
): ChartData<'line', number[], number> => ({
   labels,
   datasets: [
      {
         label: '$',
         data,
         // backgroundColor: gradient,
         backgroundColor: (context: ScriptableContext<'line'>) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(0, 192, 118, .5)');
            gradient.addColorStop(0.425, 'rgba(255,193,119,0)');
            return gradient;
         },
         borderColor:
            borderColor === 'positive'
               ? 'rgba(0, 192, 118, 1)'
               : 'rgba(255, 104, 56, 1)',
         borderJoinStyle: 'round',
         borderCapStyle: 'round',
         borderWidth: 2,
         pointRadius: 0,
         pointHitRadius: 10,
         tension: 0.2,
      },
   ],
});

interface PriceChart2Props {
   id: string;
   theme: Theme;
   className?: string;
   labels: number[];
   data: number[];
}

export const PriceChart2 = ({ id, theme, labels, data }: PriceChart2Props) => {
   const lineRef =
      useRef<ChartJSOrUndefined<'line', Array<number>, number>>(null);
   const bgGradient2d = lineRef.current?.canvas.getContext('2d');
   let bgGradient: CanvasGradient | undefined;
   bgGradient = bgGradient2d?.createLinearGradient(0, 0, 0, 400);
   bgGradient?.addColorStop(
      0,
      theme === 'positive' ? 'rgba(0, 192, 118, .5)' : 'rgba(255, 104, 56, .5)'
   );
   bgGradient?.addColorStop(0.425, 'rgba(255,193,119,0)');

   return (
      <Line
         ref={lineRef}
         id={`${id}Chart`}
         options={options}
         data={datas(labels, data, theme, bgGradient)}
      />
   );
};
