// import React, { FC, useState } from 'react';
// import { CSSTransition } from 'react-transition-group';
// import { useClickOutside } from 'hooks';
// import './dropdown.css';

// type AdibDropdownProps = {
//    value: any[];
//    initialValue: string | number;
// }

// export const AdibDropdown: FC<AdibDropdownProps> = ({ value, initialValue, children }) => {
//    const [isDropdownVisibile, setIsDropdownVisible] = useState(false);
//    const [textValue, setTextValue] = useState(initialValue);
//    const closeDropdown = () => setIsDropdownVisible(false);
//    const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisibile);
//    const dropdownRef = useClickOutside(closeDropdown);

//    return (
//       <>
//          <div className="dropdown-container" ref={dropdownRef}>
//             <button className="drp-btn" onClick={toggleDropdown}>
//                <span className="main-text">{textValue}</span>
//                <CSSTransition
//                   classNames={"arrow-down-anim"}
//                   timeout={400}
//                   // appear={true}
//                   in={isDropdownVisibile}
//                >
//                   <svg className="w-5 h-5 fill-neutral4 transition-transform duration-300">
//                      <use xlinkHref="#icon-arrow-down" />
//                   </svg>
//                </CSSTransition>
//             </button>
//             {isDropdownVisibile && (
//                <div className="dropdown-content">
//                   {value.map((item) => {
//                      return (
//                         <button
//                            className="dropdown-item"
//                            onClick={() => {
//                               setTextValue(item);
//                               closeDropdown();
//                            }}
//                            key={item}
//                         >
//                            {item}
//                         </button>
//                      );
//                   })}
//                </div>
//             )}
//          </div>
//       </>
//    )
// }
// AdibDropdown.defaultProps = {
//    value: ["25 L", "26 L", "27 L", "28 L", "29 L", "30 L"],
//    initialValue: "35 L"
// };

import React, { FC, useEffect, useState } from 'react';

type AdibDropDownProps = {
   values: any[];
   showDropDown: boolean;
   toggleDropDown: Function;
   citySelection: Function;
};

export const AdibDropDown: FC<AdibDropDownProps> = ({
   values,
   citySelection,
}: AdibDropDownProps): JSX.Element => {
   const [showDropDown, setShowDropDown] = useState<boolean>(false);

   /**
    * Handle passing the city name
    * back to the parent component
    *
    * @param city  The selected city
    */
   const onClickHandler = (city: string): void => {
      citySelection(city);
   };

   useEffect(() => {
      setShowDropDown(showDropDown);
   }, [showDropDown]);

   return (
      <>
         <ul className="z-2 absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-neutral8 dark:bg-neutral2 border-2 border-primary1 py-1 shadow-lg ring-1 ring-primary1 ring-opacity-5 focus:outline-none">
            {values && values.map((value, index) => (
               <li
                  className="relative cursor-default select-none py-2 pl-10 pr-4 "
                  key={index}
                  onClick={() => onClickHandler(value)}
               >
                  <span className="block truncate font-normal">{value}</span>
               </li>
            )
            )}
         </ul>
      </>
   );
};
