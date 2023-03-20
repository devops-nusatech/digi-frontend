import { useCallback, useMemo } from 'react';

/**
 * useSound make audio play
 * @param {string} [src]
 */
export const useSound = (src: string) => {
   const audio = useMemo<HTMLAudioElement>(() => new Audio(src), [src]);
   const play = useCallback((): Promise<void> => audio.play(), [audio]);
   return play;
};
