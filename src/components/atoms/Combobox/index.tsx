import React from 'react';

interface ComboboxProps<T> {
   items: T[];
   onChange: (e: T) => void;
}

export const Combobox = <T extends unknown>({
   items,
   onChange,
}: ComboboxProps<T>) => {
   return <div>Combobox</div>;
};
