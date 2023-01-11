import React from 'react'
import { Button, Portal } from 'components'

interface ModalConfirmLogoutProps {
   show: boolean;
   close: () => void;
   handleLogout: () => void;
}

export const ModalConfirmLogout = ({ show, close, handleLogout }: ModalConfirmLogoutProps) => (
   <Portal
      title="Confirm Logout"
      show={show}
      close={close}
   >
      <div className="text-center text-base font-medium">
         Are you sure to logout ?
      </div>
      <div className="flex space-x-4">
         <Button
            text="Cancel"
            onClick={close}
            variant="outline"
         />
         <Button
            text="Ok"
            onClick={handleLogout}
         />
      </div>
   </Portal>
)
