import React, { memo } from 'react';
import QRCodeGenerator from 'qrcode.react';

interface QRCodeProps {
   /**
    * Data which is used to generate QR code(e.g. wallet address).
    * @default Required
    */
   data: string;
   /**
    * Defines the size of QR code component.
    * @default 118x118
    */
   dimensions?: number;
}

/**
 * Component for displaying QR code.
 */
const QRCodeComponent = ({ data = '', dimensions }: QRCodeProps) => {
   return (
      <QRCodeGenerator
         value={data}
         size={dimensions}
      />
   );
};

export const QRCode = memo(QRCodeComponent);
