import React, { KeyboardEvent, memo, useState } from 'react';
import { useIntl } from 'react-intl';
import { PasswordStrengthBar, Button } from 'components';
import {
   PASSWORD_REGEX,
   passwordErrorFirstSolution,
   passwordErrorSecondSolution,
   passwordErrorThirdSolution,
} from 'helpers';
import { InputGroup } from 'components';
import { IcEyeClose } from 'assets';

export const FormChangePassword = memo((props: any) => {
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmationPassword, setConfirmationPassword] = useState('');
   const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = useState(false);
   const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = useState(false);
   const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = useState(false);
   const [passwordPopUp, setPasswordPopUp] = useState(false);

   //  Update
   const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

   const intl = useIntl();

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

   const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         event.preventDefault();

         if (isValidForm()) {
            handleChangePassword();
         }
      }
   };

   const handleChangeNewPassword = (value: string) => {
      if (passwordErrorFirstSolution(value) && !passwordErrorFirstSolved) {
         setPasswordErrorFirstSolved(true);
      } else if (!passwordErrorFirstSolution(value) && passwordErrorFirstSolved) {
         setPasswordErrorFirstSolved(false);
      }

      if (passwordErrorSecondSolution(value) && !passwordErrorSecondSolved) {
         setPasswordErrorSecondSolved(true);
      } else if (!passwordErrorSecondSolution(value) && passwordErrorSecondSolved) {
         setPasswordErrorSecondSolved(false);
      }

      if (passwordErrorThirdSolution(value) && !passwordErrorThirdSolved) {
         setPasswordErrorThirdSolved(true);
      } else if (!passwordErrorThirdSolution(value) && passwordErrorThirdSolved) {
         setPasswordErrorThirdSolved(false);
      }

      setNewPassword(value);
      setTimeout(() => {
         props.fetchCurrentPasswordEntropy({ password: value });
      }, 500);
   };

   const translate = (key: string) => intl.formatMessage({ id: key });

   const isValidForm = () => {
      const isNewPasswordValid = newPassword.match(PASSWORD_REGEX);
      const isConfirmPasswordValid = newPassword === confirmationPassword;
      const isOldPasswordValid = (!props.hideOldPassword && oldPassword) || true;

      return isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid;
   };

   return (
      <div className="w-full sm:w-84 mx-auto space-y-8" onKeyPress={handleEnterPress}>
         {!props.showTitle && (
            <div className="text-center text-4.5xl leading-[1.2] tracking-custom1 font-dm font-bold">
               New password
            </div>
         )}
         {!props.hideOldPassword &&
            <InputGroup
               autoFocus
               type={showOldPassword ? 'text' : 'password'}
               label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.old' })}
               placeholder={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.old' })}
               onChange={setOldPassword}
               value={oldPassword}
               onClick={() => setShowOldPassword(!showOldPassword)}
               icon={
                  !showOldPassword ?
                     <svg className="w-6 h-6 fill-neutral5 group-hover:fill-neutral4 transition-all duration-300">
                        <use xlinkHref="#icon-eye" />
                     </svg> : <IcEyeClose className="w-6 h-6 fill-neutral5 group-hover:fill-neutral4 transition-all duration-300" />
               }
            />
         }
         <div>
            <InputGroup
               type={showPassword ? 'text' : 'password'}
               label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' })}
               placeholder={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' })}
               onChange={handleChangeNewPassword}
               value={newPassword}
               onFocus={() => setPasswordPopUp(!passwordPopUp)}
               onBlur={() => setPasswordPopUp(!passwordPopUp)}
               onClick={() => setShowPassword(!showPassword)}
               icon={
                  !showPassword ?
                     <svg className="w-6 h-6 fill-neutral5 group-hover:fill-neutral4 transition-all duration-300">
                        <use xlinkHref="#icon-eye" />
                     </svg> : <IcEyeClose className="w-6 h-6 fill-neutral5 group-hover:fill-neutral4 transition-all duration-300" />
               }
               autoFocus={props.hideOldPassword}
            />
            {newPassword ?
               <PasswordStrengthBar
                  minPasswordEntropy={props.configs.password_min_entropy}
                  currentPasswordEntropy={props.currentPasswordEntropy}
                  passwordExist={newPassword !== ''}
                  passwordErrorFirstSolved={passwordErrorFirstSolved}
                  passwordErrorSecondSolved={passwordErrorSecondSolved}
                  passwordErrorThirdSolved={passwordErrorThirdSolved}
                  passwordPopUp={passwordPopUp}
                  translate={translate}
               /> : null}
         </div>
         <InputGroup
            type={showConfirmPassword ? 'text' : 'password'}
            label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.conf' })}
            placeholder={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.conf' })}
            onChange={setConfirmationPassword}
            value={confirmationPassword}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            icon={
               !showConfirmPassword ?
                  <svg className="w-6 h-6 fill-neutral5 group-hover:fill-neutral4 transition-all duration-300">
                     <use xlinkHref="#icon-eye" />
                  </svg> : <IcEyeClose className="w-6 h-6 fill-neutral5 group-hover:fill-neutral4 transition-all duration-300" />
            }
         />
         <Button
            text={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.change' })}
            disabled={!isValidForm()}
            onClick={handleChangePassword}
            width="full"
         />
      </div>
   );
});
