import React from 'react';
import { DropdownMenu, ListDropdown, Switch } from 'components';

interface DropdownListProfileProps {
   isOpen: boolean;
   isDarkMode: boolean;
   handleSwithTheme: () => void;
   handleSetShowModalConfirmLogout: () => void;
   translate: (id: string) => string;
}

export const DropdownListProfile = ({ isOpen, isDarkMode, handleSwithTheme, handleSetShowModalConfirmLogout, translate }: DropdownListProfileProps) => {
   return (
      <DropdownMenu isOpen={isOpen} className="py-1">
         <ListDropdown
            to="/profile"
            icon="user"
            title="Profile"
            subTitle="Important account details"
         />
         <ListDropdown
            to="/referrals"
            icon="share"
            title="Referrals"
            subTitle="Invite your friends and earn rewards"
         />
         <ListDropdown
            to="/2fa"
            icon="lock"
            title="2FA security"
            subTitle="Setup 2FA for more security"
         />
         <ListDropdown
            to="/api-keys"
            icon="cog"
            title="Settings"
            subTitle="View additional settings"
         />
         <ListDropdown
            icon="theme-dark"
            title="Dark mode"
            subTitle="Switch dark/light mode"
            children={
               <Switch
                  checked={isDarkMode}
                  onClick={handleSwithTheme}
               />
            }
         />
         <div
            onClick={handleSetShowModalConfirmLogout}
            className="space-x-2 flex items-center py-3 font-dm font-bold hover:text-primary1 leading-custom3 transition-all duration-300"
         >
            <svg className="h-5 w-5 fill-neutral4 transition-colors duration-300">
               <use xlinkHref="#icon-exit" />
            </svg>
            <div>Logout</div>
         </div>
      </DropdownMenu>
   )
}
