/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, {
   Children,
   useEffect,
   useState,
   useRef,
   FC,
   ReactNode,
} from 'react';

interface SelectProps {
   label?: string;
   id?: string;
   name?: string;
   placeholder?: string;
   className?: string;
   value?: string | number;
   onClick: (e: any) => void;
   children?: ReactNode | JSX.Element;
   width?: string;
}

export const Select: FC<SelectProps> = ({
   label,
   id,
   name,
   placeholder,
   className,
   value,
   onClick,
   children,
   width,
}) => {
   const [toggle, setToggle] = useState(false);
   const selectWrapper = useRef<HTMLDivElement>(null);
   const items = Children.toArray(children);
   const handleToggle = () => setToggle(!toggle);
   const handleOutside = e => {
      if (selectWrapper && !selectWrapper.current?.contains(e.target)) {
         setToggle(!toggle);
      }
   };
   useEffect(() => {
      window.addEventListener('mousedown', handleOutside);
      return () => window.removeEventListener('mousedown', handleOutside);
   }, []);
   const selected: any = items.find((item: any) => item.props.value === value);

   return (
      <div
         ref={selectWrapper}
         onClick={handleToggle}
         className={label ? 'space-y-3' : ''}
         key={name}>
         {label && (
            <div className="text-xs font-bold uppercase leading-none text-neutral5">
               {label}
            </div>
         )}
         <div className="relative">
            <div
               className={`before:icon-arrow relative float-none clear-both block h-12 w-full cursor-pointer select-none whitespace-nowrap rounded-xl border-none bg-neutral8 pl-4 pr-12 font-medium leading-12 opacity-100 shadow-input outline-none transition duration-200 ease-in-out before:absolute before:right-2 before:top-1/2 before:h-8 before:w-8 before:-translate-y-1/2 before:rounded-full before:transition-transform before:duration-200 before:content-[''] dark:bg-neutral2 dark:shadow-border-dark ${
                  toggle && name ? 'before:rotate-180' : ''
               }`}
               tabIndex={0}>
               <span className={value === '' ? 'text-gray-500' : ''}>
                  {selected.props.children ?? placeholder}
               </span>
               <ul
                  className={`absolute left-0 right-0 w-full ${
                     toggle && name
                        ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                        : 'pointer-events-none -translate-y-5 scale-75 opacity-0'
                  } z-[9] mt-0.5 truncate rounded-xl border-2 border-neutral6 bg-neutral8 shadow-dropdown-2 transition-all duration-200 dark:border-neutral1 dark:bg-neutral1 dark:shadow-dropdown-3`}
                  style={{ transformOrigin: '50% 0' }}>
                  {items.map((item: any, index) => (
                     <li
                        key={index}
                        onClick={() =>
                           onClick({
                              target: { name, value: item.props.value },
                           })
                        }
                        className="min-h-auto cursor-pointer px-3.5 py-2.5 font-medium leading-[1.4] transition-all duration-200 hover:bg-neutral5 hover:dark:bg-neutral2">
                        {item.props.children}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   );
};

Select.defaultProps = {
   width: 'w-[104px]',
};
