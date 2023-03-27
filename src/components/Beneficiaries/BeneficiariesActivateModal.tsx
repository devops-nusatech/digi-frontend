import classnames from 'classnames';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { LetterIcon } from '../../assets/images/LetterIcon';
import { Modal } from '../../mobile/components/Modal';
import { InputGroup, Button, Portal } from 'components';
import {
   beneficiariesActivate,
   beneficiariesResendPin,
   Beneficiary,
   selectMobileDeviceState,
} from 'modules';

interface Props {
   beneficiariesAddData: Beneficiary;
   handleToggleConfirmationModal: () => void;
   isOpenConfirmationModal: boolean;
}

const BeneficiariesActivateModalComponent: React.FC<Props> = (props: Props) => {
   const [confirmationModalCode, setConfirmationModalCode] = React.useState('');
   const [confirmationModalCodeFocused, setConfirmationModalCodeFocused] =
      React.useState(false);

   const { formatMessage } = useIntl();
   const dispatch = useDispatch();

   const isMobileDevice = useSelector(selectMobileDeviceState);

   const { handleToggleConfirmationModal, beneficiariesAddData } = props;

   const handleChangeFieldValue = React.useCallback(
      (key: string, value: string) => {
         setConfirmationModalCode(value);
      },
      []
   );

   const handleChangeFieldFocus = React.useCallback((key: string) => {
      setConfirmationModalCodeFocused(v => !v);
   }, []);

   const handleClearModalsInputs = React.useCallback(() => {
      setConfirmationModalCode('');
      setConfirmationModalCodeFocused(false);
   }, []);

   const handleClickToggleConfirmationModal = React.useCallback(
      (clear?: boolean) => () => {
         handleToggleConfirmationModal();

         if (clear) {
            handleClearModalsInputs();
         }
      },
      [handleToggleConfirmationModal, handleClearModalsInputs]
   );

   const handleSubmitConfirmationModal = React.useCallback(() => {
      if (beneficiariesAddData) {
         const payload = {
            pin: confirmationModalCode,
            id: beneficiariesAddData.id,
         };

         dispatch(beneficiariesActivate(payload));
      }

      handleClearModalsInputs();
   }, [
      confirmationModalCode,
      dispatch,
      beneficiariesAddData,
      handleClearModalsInputs,
   ]);

   const handleResendConfirmationCode = React.useCallback(() => {
      if (beneficiariesAddData) {
         const payload = {
            id: beneficiariesAddData.id,
         };

         dispatch(beneficiariesResendPin(payload));
      }
   }, [beneficiariesAddData, dispatch]);

   const renderConfirmationModalBodyItem = React.useCallback(
      (field: string, optional?: boolean) => {
         const focusedClass = classnames('cr-email-form__group', {
            'cr-email-form__group--focused': confirmationModalCodeFocused,
            'cr-email-form__group--optional': optional,
         });

         return (
            <div
               key={field}
               className={focusedClass}>
               <InputGroup
                  type="text"
                  autoFocus={true}
                  label={formatMessage({
                     id: `page.body.wallets.beneficiaries.confirmationModal.body.${field}`,
                  })}
                  onChange={value => handleChangeFieldValue(field, value)}
                  value={confirmationModalCode}
                  onFocus={() => handleChangeFieldFocus(`${field}Focused`)}
               />
            </div>
         );
      },
      [
         confirmationModalCodeFocused,
         confirmationModalCode,
         formatMessage,
         handleChangeFieldFocus,
         handleChangeFieldValue,
      ]
   );

   const renderConfirmationModalBody = React.useCallback(() => {
      const isDisabled = confirmationModalCode.length < 6;

      return (
         <div className="space-y-8">
            <div className="mx-auto flex flex-col items-center justify-center text-center">
               <LetterIcon className="h-20 w-20 fill-primary1 transition-colors duration-300" />
            </div>
            <div className="space-y-3 text-center">
               <div className="text-base font-medium leading-normal">
                  {formatMessage({
                     id: 'page.body.wallets.beneficiaries.confirmationModal.header',
                  })}
               </div>
               <div className="text-xs leading-custom4 text-neutral4">
                  {formatMessage({
                     id: 'page.body.wallets.beneficiaries.confirmationModal.body.text',
                  })}
               </div>
            </div>
            {renderConfirmationModalBodyItem('confirmationModalCode')}
            <div className="flex space-x-4">
               <Button
                  text={formatMessage({
                     id: 'page.body.wallets.beneficiaries.confirmationModal.body.resendButton',
                  })}
                  onClick={handleResendConfirmationCode}
                  variant="outline"
                  width="full"
               />
               <Button
                  text={formatMessage({
                     id: 'page.body.wallets.beneficiaries.confirmationModal.body.button',
                  })}
                  onClick={handleSubmitConfirmationModal}
                  disabled={isDisabled}
                  width="full"
               />
            </div>
         </div>
      );
   }, [
      confirmationModalCode,
      formatMessage,
      handleResendConfirmationCode,
      handleSubmitConfirmationModal,
      renderConfirmationModalBodyItem,
   ]);

   const renderContent = React.useCallback(() => {
      return (
         <Portal
            show={props.isOpenConfirmationModal}
            close={handleClickToggleConfirmationModal(true)}
            zIndexBackdrop={1045}
            zIndexContent={1046}>
            {renderConfirmationModalBody()}
         </Portal>
      );
   }, [renderConfirmationModalBody]);

   return isMobileDevice ? (
      <Modal
         onClose={props.handleToggleConfirmationModal}
         title={formatMessage({
            id: 'page.mobile.wallet.withdraw.modal.new.account',
         })}
         isOpen>
         {renderContent()}
      </Modal>
   ) : (
      renderContent()
   );
};

export const BeneficiariesActivateModal = React.memo(
   BeneficiariesActivateModalComponent
);
