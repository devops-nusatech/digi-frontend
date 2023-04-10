import React, { DependencyList, useMemo } from 'react';

interface SkeletonsProps {
   count: number;
   deps?: DependencyList;
}

export const Skeletons = ({ count, deps }: SkeletonsProps): JSX.Element[] => {
   const renderSkeletons = useMemo(() => {
      const skeletons: JSX.Element[] = [];
      for (let i = 0; i < count; i++) {
         skeletons.push(<div>Kokom + {i}</div>);
      }
      return skeletons;
   }, [deps]);
   return renderSkeletons;
};
