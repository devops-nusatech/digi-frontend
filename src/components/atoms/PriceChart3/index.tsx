import React, { ReactElement } from 'react';
import { Line } from 'react-chartjs-2';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
   Filler,
   ScriptableContext,
   ChartData,
   ChartOptions
} from 'chart.js';
import { numberFormat } from 'helpers';

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
   Filler
);
type Theme = 'positive' | 'negative';

interface PriceChart3Props {
   id: string;
   theme: Theme;
   className?: string;
   labels: number[];
   data: number[];
}

export const PriceChart3 = ({
   id,
   theme,
   className,
   labels,
   data
}: PriceChart3Props): ReactElement => {
   const chartData = (): ChartData<'line', Array<number>, number> => ({
      labels,
      datasets: [{
         label: '$',
         data,
         fill: 'start',
         backgroundColor: (context: ScriptableContext<'line'>) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, theme === 'positive' ? 'rgba(0, 192, 118, .3)' : 'rgba(255, 104, 56, .3)');
            gradient.addColorStop(.10, theme === 'positive' ? 'rgba(0, 192, 118, .05)' : 'rgba(255, 104, 56, .05)');
            return gradient;
         },
         borderColor: theme === 'positive' ? 'rgba(0, 192, 118, 1)' : 'rgba(255, 104, 56, 1)',
         borderJoinStyle: 'round',
         borderCapStyle: 'round',
         borderWidth: 1.5,
         pointRadius: 0,
         pointHitRadius: 10,
         tension: .2,
      }]
   });

   const options = (): ChartOptions<'line'> => ({
      plugins: {
         title: {
            display: false,
            text: 'Price Chart',
            font: {
               size: 35
            }
         },
         legend: {
            display: false,
         },
         subtitle: {
            display: false,
         },
         tooltip: {
            callbacks: {
               title: () => '',
               label: (ctx) => numberFormat(ctx.parsed.y).toString(),
            },
            displayColors: false,
            padding: 4,
            position: 'nearest',
            caretSize: 10,
            backgroundColor: 'rgba(255,255,255,.9)',
            bodyFont: {
               size: 12,
               family: 'urw-din-500, sans-serif',
            },
            borderWidth: 0.5,
            borderColor: theme === 'positive' ? 'rgba(0, 192, 118, 0.1)' : 'rgba(255, 104, 56, 0.1)',
            bodyColor: theme === 'positive' ? 'rgba(0, 192, 118, 1)' : 'rgba(255, 104, 56, 1)',
         }
      },
      layout: {
         padding: 0,
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
            display: false
         }
      },
      elements: {
         line: {
            tension: 0.35,
         },
      },
   });

   return (
      <Line
         id={id}
         className={className}
         data={chartData()}
         options={options()}
      />
   );
}
