import { ChangeEvent, useState } from 'react';

export const useForm = <T>(initialValue: T): T[] | any => {
   const [value, setValue] = useState<T>(initialValue);
   return [
      value,
      (e: ChangeEvent<HTMLInputElement>) =>
         setValue({
            ...value,
            [e.target.id]: e.target.value,
         }),
      (newValue: T) =>
         setValue({
            ...value,
            ...newValue,
         }),
   ];
};
