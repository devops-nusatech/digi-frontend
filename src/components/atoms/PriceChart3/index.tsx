import React, { FC, ReactElement } from 'react';
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
   ChartOptions,
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
   /**
    * Id Canvas.
    */
   id: string;
   /**
    * Theme for this positive for color green negative for color orange.
    * @default 'positive'
    */
   theme: Theme;
   /**
    * Custom classname.
    */
   className?: string;
   /**
    * The labels object that is passed into the Chart.js chart
    * @see https://www.chartjs.org/docs/latest/getting-started/
    */
   labels: number[];
   /**
    * The data object that is passed into the Chart.js chart
    * @see https://www.chartjs.org/docs/latest/getting-started/
    */
   data: number[];
   /**
    * Maintain the original canvas aspect ratio (width / height) when resizing.
    * @default true
    */
   maintainAspectRatio?: boolean;
   /**
    * Gradient opacity color position top.
    * @default .3
    */
   gradientOpacityTop?: number;
   /**
    * Gradient opacity color position bottom.
    * @default .05
    */
   gradientOpacityBottom?: number;
}

export const PriceChart3: FC<PriceChart3Props> = ({
   id,
   theme,
   className,
   labels,
   data,
   maintainAspectRatio,
   gradientOpacityTop,
   gradientOpacityBottom,
}): ReactElement<HTMLCanvasElement> => {
   const chartData = (): ChartData<'line', Array<number>, number> => ({
      labels,
      datasets: [
         {
            label: '$',
            data,
            fill: 'start',
            backgroundColor: (context: ScriptableContext<'line'>) => {
               const ctx = context.chart.ctx;
               const gradient = ctx.createLinearGradient(0, 0, 0, 400);
               gradient.addColorStop(
                  0,
                  theme === 'positive'
                     ? `rgba(0, 192, 118, ${gradientOpacityTop})`
                     : `rgba(255, 104, 56, ${gradientOpacityTop})`
               );
               gradient.addColorStop(
                  0.1,
                  theme === 'positive'
                     ? `rgba(0, 192, 118, ${gradientOpacityBottom})`
                     : `rgba(255, 104, 56, ${gradientOpacityBottom})`
               );
               return gradient;
            },
            borderColor:
               theme === 'positive'
                  ? 'rgba(0, 192, 118, 1)'
                  : 'rgba(255, 104, 56, 1)',
            borderJoinStyle: 'round',
            borderCapStyle: 'round',
            borderWidth: 1.5,
            pointRadius: 0,
            pointHitRadius: 10,
            tension: 0.2,
         },
      ],
   });
   const options = (): ChartOptions<'line'> => ({
      maintainAspectRatio: maintainAspectRatio,
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
            callbacks: {
               title: () => '',
               label: ctx => numberFormat(ctx.parsed.y).toString(),
            },
            displayColors: false,
            padding: 4,
            position: 'nearest',
            caretSize: 5,
            backgroundColor: 'rgba(255,255,255,.9)',
            bodyFont: {
               size: 12,
               family: 'urw-din-500, sans-serif',
            },
            borderWidth: 0.5,
            borderColor:
               theme === 'positive'
                  ? 'rgba(0, 192, 118, 0.1)'
                  : 'rgba(255, 104, 56, 0.1)',
            bodyColor:
               theme === 'positive'
                  ? 'rgba(0, 192, 118, 1)'
                  : 'rgba(255, 104, 56, 1)',
         },
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
            display: false,
         },
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
};

PriceChart3.defaultProps = {
   theme: 'positive',
   gradientOpacityTop: 0.3,
   gradientOpacityBottom: 0.05,
};
