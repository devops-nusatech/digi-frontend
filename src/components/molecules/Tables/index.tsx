import React, { useCallback } from 'react';

/** Helpers */

// helper to get an array containing the object values with
// the correct type infered.
function objectValues<T extends {}>(obj: T) {
   return Object.keys(obj).map(objKey => obj[objKey as keyof T]);
}

function objectKeys<T extends {}>(obj: T) {
   return Object.keys(obj).map(objKey => objKey as keyof T);
}

type PrimitiveType = string | Symbol | number | boolean;

// Type guard for the primitive types which will support printing
// out of the box
function isPrimitive(value: any): value is PrimitiveType {
   return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      typeof value === 'symbol'
   );
}

/** Component */

interface MinTableItem {
   id: PrimitiveType;
}

type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<
   Record<keyof T, (it: T) => React.ReactNode>
>;

interface TableProps<T extends MinTableItem> {
   items: T[];
   headers: TableHeaders<T>;
   customRenderers?: CustomRenderers<T>;
}

export const Tables = <T extends MinTableItem>({
   headers,
   items,
   customRenderers,
}: TableProps<T>) => {
   const renderRow = useCallback(
      (item: T) => {
         return (
            <tr>
               {objectKeys(item).map((itemProperty, index) => {
                  const customRenderer = customRenderers?.[itemProperty];

                  if (customRenderer) {
                     return <td key={index}>{customRenderer(item)}</td>;
                  }

                  return (
                     <td key={index}>
                        {isPrimitive(item[itemProperty])
                           ? item[itemProperty]
                           : ''}
                     </td>
                  );
               })}
            </tr>
         );
      },
      [customRenderers]
   );

   return (
      <table>
         <thead>
            {objectValues(headers).map((headerValue, index) => (
               <th key={index}>{headerValue}</th>
            ))}
         </thead>
         <tbody>{items.map(renderRow)}</tbody>
      </table>
   );
};
