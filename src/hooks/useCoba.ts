import { useState, useEffect } from 'react'

export const useCoba = () => {
  const [state, setState] = useState<string>('');
  useEffect(() => {
   setState('wkwk')
  }, []);
  return state;
}
