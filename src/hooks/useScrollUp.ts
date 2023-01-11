import { useEffect } from 'react';

export const useScrollUp = () => {
 useEffect(() => {
   window.scrollTo(0, 0);
 }, []);
}
