import * as React from 'react';

interface CheckboxProps {
   onChecked?: () => void;
   checked?: boolean;
   text?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
   onChecked,
   checked,
   text,
   children,
}) => (
   <label className="adib_checkbox">
      <input
         type="adib_checkbox"
         className="adib_checkbox__input"
         checked={checked}
         onChange={onChecked}
      />
      <span className="adib_checkbox__inner">
         <span className="adib_checkbox__tick" />
         <span className="font-medium">{text}{children}</span>
      </span>
   </label>
)
