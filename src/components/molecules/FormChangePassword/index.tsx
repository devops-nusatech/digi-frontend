import React, {
   KeyboardEvent,
   memo,
   useState
} from 'react';
import { useIntl } from 'react-intl';
import {
   Button,
   InputGroup,
   InputPassword,
} from 'components';
import {
   PASSWORD_REGEX,
} from 'helpers';

export const FormChangePassword = memo((props: any) => {
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmationPassword, setConfirmationPassword] = useState('');

   const intl = useIntl();

   const translate = (id: string) => intl.formatMessage({ id });

   const handleChangePassword = () => {
      const payload = props.hideOldPassword
         ? {
            password: newPassword,
            confirm_password: confirmationPassword,
         } : {
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmationPassword,
         };

      props.handleChangePassword(payload);

      setOldPassword('');
      setNewPassword('');
      setConfirmationPassword('');
   };

   const handleEnterPress = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault();

         if (isValidForm()) {
            handleChangePassword();
         }
      }
   };

   const isValidForm = () => {
      const isNewPasswordValid = newPassword.match(PASSWORD_REGEX);
      const isConfirmPasswordValid = newPassword === confirmationPassword;
      const isOldPasswordValid = (!props.hideOldPassword && oldPassword) || true;

      return isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid;
   };

   return (
      <form
         onKeyPress={handleEnterPress}
         className="w-full sm:w-84 mx-auto space-y-8"
      >
         {props.title && (
            <div className="text-center text-4.5xl leading-[1.2] tracking-custom1 font-dm font-bold">
               {props.title}
            </div>
         )}
         {!props.hideOldPassword &&
            <InputGroup
               autoFocus={!props.hideOldPassword}
               label={translate('page.body.profile.header.account.content.password.old')}
               placeholder={translate('page.body.profile.header.account.content.password.old')}
               onChange={setOldPassword}
               value={oldPassword}
               withIconPassword
            />
         }
         <InputPassword
            autoFocus={props.hideOldPassword}
            onChange={setNewPassword}
         />
         <InputGroup
            label={translate('page.body.profile.header.account.content.password.conf')}
            placeholder={translate('page.body.profile.header.account.content.password.conf')}
            onChange={setConfirmationPassword}
            value={confirmationPassword}
            withIconPassword
         />
         <Button
            text={translate('page.body.profile.header.account.content.password.button.change')}
            disabled={!isValidForm()}
            onClick={handleChangePassword}
            withLoading={props.isLoading}
         />
      </form>
   );
});
