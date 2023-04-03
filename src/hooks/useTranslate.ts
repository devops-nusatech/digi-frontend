import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { PrimitiveType } from 'intl-messageformat';

export const useTranslate = () => {
   const intl = useIntl();

   const translate = useCallback(
      (id: string, values?: Record<string, PrimitiveType>) =>
         intl.formatMessage({ id }, { ...values }),
      [intl]
   );
   return translate;
};
