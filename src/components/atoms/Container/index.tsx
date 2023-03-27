import React from 'react';
import { classNames } from 'helpers';
import { TChildren } from '../types';

type ContainerProps = TChildren & {
   /**
    * If true it will return the container below the medium with a display block
    * @type {boolean}
    * @default false
    */
   mdBlock?: boolean;
};

export const Container = ({ className, children, mdBlock }: ContainerProps) => (
   <div
      className={classNames(
         `mx-auto ${
            mdBlock
               ? 'block w-full max-w-7xl px-6 md:flex'
               : 'w-full max-w-7xl px-6'
         } md:px-10 lg:px-20 ${className || ''}`
      )}>
      {children}
   </div>
);

Container.defaultProps = {
   mDBlock: false,
};
