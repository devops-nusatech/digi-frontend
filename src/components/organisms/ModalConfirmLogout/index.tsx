import React from 'react'
import { Button, Portal } from 'components'

interface ModalConfirmLogoutProps {
   show: boolean;
   close: () => void;
   handleLogout: () => void;
   isLoading: boolean;
}

export const ModalConfirmLogout = ({ show, close, handleLogout, isLoading }: ModalConfirmLogoutProps) => (
   <Portal
      title="Confirm Logout"
      show={show}
      close={close}
   >
      <div className="text-center text-base font-medium">
         Are you sure to logout ?
      </div>
      <Button
         text="Continue"
         onClick={handleLogout}
         withLoading={isLoading}
      />
   </Portal>
)
