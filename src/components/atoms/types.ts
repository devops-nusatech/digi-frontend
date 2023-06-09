import { ReactNode } from 'react';
// base
export type Width = 'full' | 'noFull';
export type Size = 'large' | 'normal' | 'small';
export type Variant =
   | 'primary'
   | 'green'
   | 'orange'
   | 'outline'
   | 'dark'
   | 'ungu'
   | 'yellow';

// Button
export type ButtonType = 'submit' | 'button';
export type Color = 'orange' | 'yellow' | 'primary';

// Input
export type InputType =
   | 'button'
   | 'checkbox'
   | 'color'
   | 'date'
   | 'datetime-local'
   | 'email'
   | 'file'
   | 'hidden'
   | 'image'
   | 'month'
   | 'number'
   | 'password'
   | 'radio'
   | 'range'
   | 'reset'
   | 'search'
   | 'submit'
   | 'tel'
   | 'text'
   | 'time'
   | 'url'
   | 'week';

// Rounded
export type Rounded =
   | 'sm'
   | 'defualt'
   | 'md'
   | 'lg'
   | 'xl'
   | '1xl'
   | '2xl'
   | '3xl'
   | '4xl'
   | '5xl'
   | 'full'
   | '20';

export type Weight = 'normal' | 'medium' | 'semibold' | 'bold';

export type AccordionData = {
   title: string;
   content: ReactNode;
};

export type TextProps = {
   text: ReactNode;
   withDark?: boolean;
   className?: string;
};

export type TLabel = {
   label: string;
};
export type TClassName = {
   /**
    * add class name in tag
    * @type {string}
    */
   className?: string;
};

export type TChildren = {
   children?: ReactNode;
} & TClassName;

export type LabelProps = TLabel & TClassName & TChildren;
