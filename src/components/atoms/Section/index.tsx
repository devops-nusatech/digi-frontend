import React from 'react';
import { classNames } from 'helpers';
import { TChildren } from '../types';

type SectionProps = TChildren & {
   withMb: boolean;
   id?: string;
};

export const Section = ({ className, children, withMb, id }: SectionProps) => (
   <section
      className={classNames(
         `relative ${withMb ? 'mb-16 lg:mb-28 lg2:mb-34' : ''} ${
            className || ''
         }`
      )}
      id={id}>
      {children}
   </section>
);

Section.defaultProps = {
   withMb: true,
};
