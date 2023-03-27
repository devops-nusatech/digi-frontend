import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const PriceChart = (props: HighchartsReact.Props) => {
   const chartComponentRef = React.useRef(null);
   return (
      <HighchartsReact
         ref={chartComponentRef}
         highcharts={Highcharts}
         options={props.options}
         {...props}
      />
   );
};
