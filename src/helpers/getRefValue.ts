import { RefObject } from 'react';

export const getRefObject = <C>(ref: RefObject<C>) => ref.current as C;
