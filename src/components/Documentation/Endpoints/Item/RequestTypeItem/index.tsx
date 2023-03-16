import { Badge } from 'components/atoms';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { ParametersItem } from './ParametersItem';
import { ResponsesItem } from './ResponsesItem';

interface ItemInterface {
   item: any;
   title: string;
}

export const RequestTypeItem: React.FC<ItemInterface> = (
   props: ItemInterface
) => {
   const { title, item } = props;
   const intl = useIntl();

   return (
      <div className="space-y-3">
         <div className="flex space-x-2">
            <div className="w-1/6">
               <div className="flex justify-between">
                  <div className="font-medium">Method</div>
                  <div>:</div>
               </div>
               <div className="flex justify-between">
                  <div className="font-medium">
                     {intl.formatMessage({
                        id: 'page.documentation.endpoints.requestTypeItem.description.title',
                     })}
                  </div>
                  <div>:</div>
               </div>
            </div>
            <div className="w-auto">
               <Badge text={title} />
               <div className="">{item.description}</div>
            </div>
         </div>
         <ParametersItem item={item} />
         <ResponsesItem item={item} />
      </div>
   );
};
