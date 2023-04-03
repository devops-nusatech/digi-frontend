import { useCallback, useState } from 'react';

/**
 * @param boolean inititalValue (optional)
 * @default false
 * @example  const [toggle, setToggle] = useToggle(false);
 */
export const useToggle = (inititalValue = false): [boolean, () => void] => {
   const [value, setValue] = useState<boolean>(inititalValue);
   const setToggle = useCallback(() => {
      setValue(!value);
   }, [value]);
   return [value, setToggle];
};
