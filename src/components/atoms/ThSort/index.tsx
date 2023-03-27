import React from 'react';
import { Direction, OnClick } from 'types';
import { classNames } from 'helpers';
import { SVG } from 'components';

interface ThSortProps extends OnClick {
   title: string;
   classNameFor: Direction;
}

export const ThSort = ({ title, classNameFor, onClick }: ThSortProps) => (
   <div
      onClick={onClick}
      className={classNames(
         `group select-none ${classNameFor} relative inline-flex cursor-pointer pr-4`
      )}>
      {title}
      <div className="absolute -right-1 -top-1.5 flex flex-col">
         <SVG
            className="group-[.ascending]:fill-neutral1 dark:group-[.ascending]:fill-neutral8 h-4 w-4 translate-y-1.25 rotate-180 fill-neutral4 transition-all duration-300"
            xlinkHref="arrow-down"
         />
         <SVG
            className="group-[.descending]:fill-neutral1 dark:group-[.descending]:fill-neutral8 h-4 w-4 -translate-y-1.25 fill-neutral4 transition-all duration-300"
            xlinkHref="arrow-down"
         />
      </div>
   </div>
);
