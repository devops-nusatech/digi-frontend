import { Button } from 'components';
import { useShowGeetestCaptcha } from 'hooks';
import React from 'react';

export const Geetest = () => {
   return (
      <Button text="Adib" onClick={useShowGeetestCaptcha} />
   )
}
