import React, {
   Children,
   useEffect,
   useState,
   useRef,
   FC,
   ReactNode
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
   }
   useEffect(() => {
      window.addEventListener('mousedown', handleOutside);
      return () => window.removeEventListener('mousedown', handleOutside);
   }, []);
   const selected: any = items.find((item: any) => item.props.value === value)

   return (
      <div
         ref={selectWrapper}
         onClick={handleToggle}
         className={label ? 'space-y-3' : ''}
         key={name}
      >
         {label && (
            <div className="text-xs leading-none font-bold uppercase text-neutral5">
               {label}
            </div>
         )}
         <div className="relative">
            <div className={`clear-both cursor-pointer block outline-none relative transition ease-in-out duration-200 select-none whitespace-nowrap float-none w-full h-12 pl-4 pr-12 shadow-input dark:shadow-border-dark bg-neutral8 dark:bg-neutral2 rounded-xl border-none opacity-100 font-medium leading-12 before:content-[''] before:absolute before:top-1/2 before:right-2 before:h-8 before:w-8 before:-translate-y-1/2 before:rounded-full before:transition-transform before:duration-200 before:icon-arrow ${toggle && name ? 'before:rotate-180' : ''}`} tabIndex={0}>
               <span className={value === '' ? 'text-gray-500' : ''}>
                  {selected.props.children ?? placeholder}
               </span>
               <ul className={`absolute w-full left-0 right-0 ${toggle && name ? 'opacity-100 pointer-events-auto scale-100 translate-y-0' : 'opacity-0 pointer-events-none scale-75 -translate-y-5'} truncate transition-all duration-200 z-[9] mt-0.5 rounded-xl bg-neutral8 dark:bg-neutral1 border-2 border-neutral6 dark:border-neutral1 shadow-dropdown-2 dark:shadow-dropdown-3`} style={{ transformOrigin: '50% 0' }}>
                  {items.map((item: any, index) => (
                     <li
                        key={index}
                        onClick={() => onClick({ target: { name, value: item.props.value } })}
                        className="cursor-pointer min-h-auto px-3.5 py-2.5 leading-[1.4] font-medium hover:bg-neutral5 hover:dark:bg-neutral2 transition-all duration-200"
                     >
                        {item.props.children}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>
   )
}

Select.defaultProps = {
   width: 'w-[104px]'
}
