import React, { FC } from 'react';
import { PatternFormat, PatternFormatProps } from 'react-number-format';

interface InputAmountProps extends PatternFormatProps {}

export const InputAmount: FC<InputAmountProps> = ({ format, ...rest }) => {
   return (
      <PatternFormat
         {...rest}
         format={format}
      />
   );
};

InputAmount.defaultProps = {
   format: '#.########',
};
