import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { InputGroup, PasswordStrengthBar } from 'components';
import {
   passwordErrorFirstSolution,
   passwordErrorSecondSolution,
   passwordErrorThirdSolution,
} from 'helpers';
import {
   entropyPasswordFetch,
   selectConfigs,
   selectCurrentPasswordEntropy,
} from 'modules';

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
   const configs = useSelector(selectConfigs);
   const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);

   const [password, setPassword] = useState('');
   const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] =
      useState(false);
   const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] =
      useState(false);
   const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] =
      useState(false);
   const [passwordPopUp, setPasswordPopUp] = useState(false);

   const handleShowStrength = () => setPasswordPopUp(!passwordPopUp);

   const handleChangePassword = (password: string) => {
      if (passwordErrorFirstSolution(password) && !passwordErrorFirstSolved) {
         setPasswordErrorFirstSolved(true);
      } else if (
         !passwordErrorFirstSolution(password) &&
         passwordErrorFirstSolved
      ) {
         setPasswordErrorFirstSolved(false);
      }

      if (passwordErrorSecondSolution(password) && !passwordErrorSecondSolved) {
         setPasswordErrorSecondSolved(true);
      } else if (
         !passwordErrorSecondSolution(password) &&
         passwordErrorSecondSolved
      ) {
         setPasswordErrorSecondSolved(false);
      }

      if (passwordErrorThirdSolution(password) && !passwordErrorThirdSolved) {
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
   };

   const translate = (id: string) => intl.formatMessage({ id });

   return (
      <div>
         <InputGroup
            id="password"
            autoFocus={autoFocus}
            label={
               label
                  ? label
                  : translate(
                       'page.body.profile.header.account.content.password.new'
                    )
            }
            placeholder={
               label
                  ? label
                  : translate(
                       'page.body.profile.header.account.content.password.new'
                    )
            }
            value={password}
            onChange={handleChangePassword}
            onFocus={handleShowStrength}
            onBlur={handleShowStrength}
            withIconPassword
         />
         {password && (
            <PasswordStrengthBar
               minPasswordEntropy={configs.password_min_entropy}
               currentPasswordEntropy={currentPasswordEntropy}
               passwordExist={password !== ''}
               passwordErrorFirstSolved={passwordErrorFirstSolved}
               passwordErrorSecondSolved={passwordErrorSecondSolved}
               passwordErrorThirdSolved={passwordErrorThirdSolved}
               passwordPopUp={passwordPopUp}
               translate={translate}
            />
         )}
      </div>
   );
};
