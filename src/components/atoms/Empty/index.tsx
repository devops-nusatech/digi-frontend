import React from 'react';
import { IcEmpty } from 'assets';
import { FlexCenter, TextXs } from 'components';
import { useTranslate } from 'hooks';

export const Empty = () => {
   const translate = useTranslate();
   return (
      <FlexCenter className="h-full w-full flex-col justify-center gap-3">
         <IcEmpty />
         <TextXs
            font="semibold"
            text={translate('noResultFound')}
         />
      </FlexCenter>
   );
};
