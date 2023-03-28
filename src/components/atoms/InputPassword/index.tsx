import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { InputGroup, PasswordStrengthBar } from 'components';
import {
   passwordErrorFirstSolution,
   passwordErrorSecondSolution,
   passwordErrorThirdSolution,
} from 'helpers';
import { entropyPasswordFetch, selectCurrentPasswordEntropy } from 'modules';
import { passwordMinEntropy } from 'api';

interface InputPasswordProps {
   /**
    * Autofocus cursor asign in input.
    * @default false
    */
   autoFocus?: boolean;
   /**
    * label input
    */
   label?: string;
   /**
    * This methode returns string
    */
   onChange: (password: string) => void;
}

export const InputPassword = ({
   autoFocus,
   label,
   onChange,
}: InputPasswordProps): ReactElement => {
   const intl = useIntl();
   const dispatch = useDispatch();
   const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);

   const [password, setPassword] = useState('');
   const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] =
      useState(false);
   const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] =
      useState(false);
   const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] =
      useState(false);
   const [passwordPopUp, setPasswordPopUp] = useState(false);

   const handleShowStrength = useCallback(
      () => setPasswordPopUp(!passwordPopUp),
      [passwordPopUp]
   );

   const handleChangePassword = useCallback(
      (password: string) => {
         if (
            passwordErrorFirstSolution(password) &&
            !passwordErrorFirstSolved
         ) {
            setPasswordErrorFirstSolved(true);
         } else if (
            !passwordErrorFirstSolution(password) &&
            passwordErrorFirstSolved
         ) {
            setPasswordErrorFirstSolved(false);
         }

         if (
            passwordErrorSecondSolution(password) &&
            !passwordErrorSecondSolved
         ) {
            setPasswordErrorSecondSolved(true);
         } else if (
            !passwordErrorSecondSolution(password) &&
            passwordErrorSecondSolved
         ) {
            setPasswordErrorSecondSolved(false);
         }

         if (
            passwordErrorThirdSolution(password) &&
            !passwordErrorThirdSolved
         ) {
            setPasswordErrorThirdSolved(true);
         } else if (
            !passwordErrorThirdSolution(password) &&
            passwordErrorThirdSolved
         ) {
            setPasswordErrorThirdSolved(false);
         }

         setPassword(password);
         onChange(password);
         setTimeout(() => {
            dispatch(entropyPasswordFetch({ password }));
         }, 500);
      },
      [
         dispatch,
         onChange,
         passwordErrorFirstSolved,
         passwordErrorSecondSolved,
         passwordErrorThirdSolved,
      ]
   );

   const translate = useCallback(
      (id: string) => intl.formatMessage({ id }),
      [intl]
   );

   const renderPasswordEntropy = useMemo(() => {
      return (
         password && (
            <PasswordStrengthBar
               minPasswordEntropy={passwordMinEntropy()}
               currentPasswordEntropy={currentPasswordEntropy}
               passwordExist={password !== ''}
               passwordErrorFirstSolved={passwordErrorFirstSolved}
               passwordErrorSecondSolved={passwordErrorSecondSolved}
               passwordErrorThirdSolved={passwordErrorThirdSolved}
               passwordPopUp={passwordPopUp}
               translate={translate}
            />
         )
      );
   }, [
      currentPasswordEntropy,
      password,
      passwordErrorFirstSolved,
      passwordErrorSecondSolved,
      passwordErrorThirdSolved,
      passwordPopUp,
      translate,
   ]);

   return (
      <div>
         <InputGroup
            id="password"
            autoFocus={autoFocus}
            label={
               label ||
               translate(
                  'page.body.profile.header.account.content.password.new'
               )
            }
            placeholder={
               label ||
               translate(
                  'page.body.profile.header.account.content.password.new'
               )
            }
            value={password}
            onChange={handleChangePassword}
            onFocus={handleShowStrength}
            onBlur={handleShowStrength}
            withIconPassword
         />
         {renderPasswordEntropy}
      </div>
   );
};
