import { Badge } from 'components/atoms';
import * as React from 'react';
import { RequestTypeItem } from './RequestTypeItem';

interface ItemInterface {
   item: any;
   title: string;
}
export const DocumentationEndpointsItem: React.FC<ItemInterface> = (
   props: ItemInterface
) => {
   const { title, item } = props;

   return (
      <div className="space-y-3">
         <Badge
            text={title}
            className="!lowercase"
         />
         {item && Object.keys(item).length
            ? Object.keys(item).map((key, index) => (
                 <RequestTypeItem
                    item={item[key]}
                    key={key}
                    title={key}
                 />
              ))
            : null}
      </div>
   );
};
