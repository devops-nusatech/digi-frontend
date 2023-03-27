import React, { FC } from 'react';
import { SVG, TextBase, Variant } from 'components';
import { classNames } from 'helpers';

const classes = {
   variant: {
      primary: 'bg-primary1',
      green: 'bg-primary5 dark:bg-chart1',
      orange: 'bg-primary4',
      outline:
         'shadow-border hover:shadow-input-dark hover:bg-neutral2 dark:hover:bg-neutral3 dark:hover:border-none dark:shadow-border-dark',
      ungu: 'bg-primary3',
      yellow: 'bg-secondary3',
   },
};

interface PickProps {
   title: string;
   xlinkHref: string;
   onChange: () => void;
   isActive: boolean;
   variant?: Variant;
}

export const Pick: FC<PickProps> = ({
   title,
   xlinkHref,
   onChange,
   isActive,
   variant,
}) => {
   return (
      <label className="group relative mx-2.5 w-c-1/2-5 shrink-0 grow-0 basis-c-1/2-5 cursor-pointer select-none">
         <input
            onChange={onChange}
            className="peer absolute top-0 left-0 opacity-0"
            type="radio"
            name="topic"
            checked={isActive}
         />
         <span className="flex h-12 items-center justify-center space-x-3.5 rounded-lg bg-neutral8 p-3 transition-all duration-300 group-hover:shadow-border peer-checked:shadow-dropdown-primary dark:bg-neutral2 dark:group-hover:shadow-border-dark md:h-20">
            <span
               className={classNames(
                  `hidden h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                     classes.variant[variant!]
                  } md:flex`
               )}>
               <SVG
                  className="2-5 h-5 fill-neutral8"
                  xlinkHref={xlinkHref}
               />
            </span>
            <TextBase
               font="normal"
               text={title}
               className="font-dm"
            />
         </span>
      </label>
   );
};

Pick.defaultProps = {
   variant: 'primary',
};
