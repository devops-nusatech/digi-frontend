import React from 'react';
import { classNames } from 'helpers';
import { TChildren } from '../types';

type SectionProps = TChildren & {
   withMb: boolean;
};

export const Section = ({ className, children, withMb }: SectionProps) => (
   <section
      className={classNames(
         `relative ${withMb ? 'mb-16 lg:mb-28 lg2:mb-34' : ''} ${
            className || ''
         }`
      )}>
      {children}
   </section>
);

Section.defaultProps = {
   withMb: true,
};
