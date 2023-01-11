import React, { FC } from 'react';
import styels from './checkboxalt.module.css';

interface CheckboxAltProps {
   checked: boolean;
   onChange: () => void;
}

export const CheckboxAlt: FC<CheckboxAltProps> = ({ checked, onChange }) => (
   <div className="relative">
      <input
         id="cbx"
         type="checkbox"
         className="hidden"
         onChange={onChange}
         checked={checked}
      />
      <label
         htmlFor="cbx"
         className={styels.cbx}
      />
   </div>
);

CheckboxAlt.defaultProps = {
   checked: false,
}
