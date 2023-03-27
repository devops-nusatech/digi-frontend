import React, { FC, memo } from 'react';

export interface PasswordStrengthInfoProps {
   passwordErrorFirstSolved: boolean;
   passwordErrorSecondSolved: boolean;
   passwordErrorThirdSolved: boolean;
   passwordPopUp: boolean;
   translate: (id: string) => string;
}

const PasswordStrengthInfoMemo: FC<PasswordStrengthInfoProps> = ({
   passwordErrorFirstSolved,
   passwordErrorSecondSolved,
   passwordErrorThirdSolved,
   translate,
}) =>
   !(
      passwordErrorFirstSolved &&
      passwordErrorSecondSolved &&
      passwordErrorThirdSolved
   ) ? (
      <div className="flex flex-col pt-4">
         <span className="pb-1.5 text-xs font-normal text-[#b1b5c3]">
            {translate('password.strength.tip.influence')}
         </span>
         {!passwordErrorFirstSolved && (
            <span className="pb-[2px] font-medium text-gray-500">
               {translate('password.strength.tip.number.characters')}
            </span>
         )}
         {!passwordErrorSecondSolved && (
            <span className="pb-[2px] font-medium text-gray-500">
               {translate('password.strength.tip.letter')}
            </span>
         )}
         {!passwordErrorThirdSolved && (
            <span className="pb-[2px] font-medium text-gray-500">
               {translate('password.strength.tip.digit')}
            </span>
         )}
      </div>
   ) : null;

export const PasswordStrengthInfo = memo(PasswordStrengthInfoMemo);
