import { useState } from 'react';

export const useModal = () => {
   const [isShow, setIsShow] = useState<boolean>(false);
   const toggle = () => setIsShow(!isShow);
   return { isShow, toggle };
};
