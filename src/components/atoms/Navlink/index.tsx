import React from 'react';
import { Link, useHistory } from 'react-router-dom';

type NavlinkProps = {
   text: string;
   to: string;
   pathActive?: string;
};

export const Navlink = ({ text, to, pathActive }: NavlinkProps) => {
   const { location } = useHistory();
   return (
      <Link
         to={to}
         className={`cursor-pointer ${
            location.pathname.includes(pathActive || to)
               ? 'text-neutral2 dark:text-neutral8'
               : 'hover:text-neutral2 dark:hover:text-neutral8'
         } transition-colors duration-300`}>
         {text}
      </Link>
   );
};
