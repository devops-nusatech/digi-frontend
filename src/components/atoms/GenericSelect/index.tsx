import React from 'react'

type Base = {
   id: string;
   title: string;
}

type GenericSelectProps<T> = {
   value?: T;
   options: T[];
   onChange: (value: T) => void;
}

export const GenericSelect = <T extends Base>({
   value,
   options,
   onChange,
}: GenericSelectProps<T>) => {
   const handleSelectChange = (event: { target: { value: string; }; }) => {
      const val = options.find(key => key.id === event.target.value);
      if (val) onChange(val);
   }
   return (
      <select
         onChange={handleSelectChange}
      >
         {options.map(option => (
            <option key={option.id} value={option.title}>
               {option.title}
            </option>
         ))}
      </select>
   )
}
