import React from 'react';
import { Button, QRCode } from 'components';

export const Redirect = () => (
   <div className="flex flex-1 flex-col items-center justify-center space-y-8 py-10 px-4 text-center">
      <div className="font-dm text-4.5xl leading-custom1 tracking-custom">
         Enjoy trading through the Digiasset app
      </div>
      <div className="text-7.5xl">🎉</div>
      <div className="space-y-2">
         <QRCode
            data="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
            dimensions={200}
         />
         <div>Scan me</div>
      </div>
      <a
         href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
         rel="noopener noreferrer"
         target="_blank"
         className="w-full">
         <Button text="Download App" />
      </a>
   </div>
);
