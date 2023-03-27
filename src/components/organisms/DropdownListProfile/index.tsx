import React from 'react';
import { DropdownMenu, ListDropdown } from 'components';

interface DropdownListProfileProps {
   isOpen: boolean;
   headerFull: boolean;
   handleSetShowModalConfirmLogout: () => void;
   translate: (id: string) => string;
}

export const DropdownListProfile = ({
   isOpen,
   headerFull,
   handleSetShowModalConfirmLogout,
   translate,
}: DropdownListProfileProps) => {
   return (
      <DropdownMenu
         isOpen={isOpen}
         className={`py-1 ${!headerFull ? '!-translate-x-60' : ''}`}>
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
            to="/beneficiaries"
            icon="beneficiary"
            title="Beneficiaries"
            subTitle="View additional beneficiaries"
         />
         <div
            onClick={handleSetShowModalConfirmLogout}
            className="flex items-center space-x-2 py-3 font-dm font-bold leading-custom3 transition-all duration-300 hover:text-primary1">
            <svg className="h-5 w-5 fill-neutral4 transition-colors duration-300">
               <use xlinkHref="#icon-exit" />
            </svg>
            <div>Logout</div>
         </div>
      </DropdownMenu>
   );
};
