import * as React from 'react';
import { NumberFormatBase } from 'react-number-format';

export const InputNumber = props => {
   const format = numStr => {
      if (numStr === '') return '';
      return new Intl.NumberFormat('id-ID', {
         style: 'currency',
         currency: 'IDR',
         maximumFractionDigits: 0,
      }).format(numStr);
   };

   return (
      <NumberFormatBase
         {...props}
         format={format}
      />
   );
};
