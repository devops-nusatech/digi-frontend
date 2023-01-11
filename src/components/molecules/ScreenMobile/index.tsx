import * as React from 'react';
import { Button, QRCode } from 'components';

export const ScreenMobile = () => (
   <div className="flex flex-1 flex-col items-center justify-center text-center py-10 px-4 space-y-8">
      <div className="text-4.5xl font-dm tracking-custom leading-custom1">
         Enjoy trading through the Digiasset app
      </div>
      <div className="text-7.5xl">
         🎉
      </div>
      <div className="space-y-2">
         <QRCode data='https://play.google.com/store/apps/details?id=mobile.digiassetindo.com' dimensions={200} />
         <div>
            Scan me
         </div>
      </div>
      <a href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com" rel="noopener noreferrer" target="_blank" className="w-full">
         <Button text="Download App" />
      </a>
   </div>
)
