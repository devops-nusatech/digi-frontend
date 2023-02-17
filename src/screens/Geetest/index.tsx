import { Button, ComboboxCurrency, GeetestCaptchaV3, InputGroup } from 'components';
// import { getRefObject } from 'helpers';
import { useInitGT4 } from 'hooks/useInitGT4';
import { GeetestCaptchaResponse, setGeetestCaptchaSuccess } from 'modules';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export const Geetest = () => {
   const dispatch = useDispatch();

   const handleGeetestResponse = (captcha_response: GeetestCaptchaResponse) => {
      dispatch(setGeetestCaptchaSuccess({ captcha_response }))
   }

   const buttonRef = useRef<HTMLButtonElement>(null);
   const gt3Ref = useRef<HTMLButtonElement>(null);
   const { response } = useInitGT4(buttonRef);

   useEffect(() => {
      console.log('response :>> ', response);
   }, [response]);
   return (
      <>
         <WithRef />
         <WithState />
         <div className="flex items-center justify-between h-screen">
            {/* <div className="overflow-x-auto w-1/3 space-y-5">
               <div className="text-2xl font-bold">Geetest V4 Response</div>
               <table className="table-auto w-full lg2:w-69 divide-y divide-primary5 dark:divide-chart1">
                  <tr className="align-top">
                     <th className="p-4 whitespace-nowrap text-left">Captcha id </th>
                     <td className="p-4"> : {response?.captcha_id}</td>
                  </tr>
                  <tr className="align-top">
                     <th className="p-4 whitespace-nowrap text-left">Captcha output </th>
                     <td className="p-4"> : {response?.captcha_output}</td>
                  </tr>
                  <tr className="align-top">
                     <th className="p-4 whitespace-nowrap text-left">Get time </th>
                     <td className="p-4"> : {response?.gen_time}</td>
                  </tr>
                  <tr className="align-top">
                     <th className="p-4 whitespace-nowrap text-left">Lot number </th>
                     <td className="p-4"> : {response?.lot_number}</td>
                  </tr>
                  <tr className="align-top">
                     <th className="p-4 whitespace-nowrap text-left">Pass token </th>
                     <td className="p-4"> : {response?.pass_token}</td>
                  </tr>
                  <tr className="align-top">
                     <th className="p-4 whitespace-nowrap text-left">Sign token </th>
                     <td className="p-4"> : {response?.sign_token}</td>
                  </tr>
               </table>
               <Button ref={buttonRef} text="Show geetest v4" />
            </div> */}
            <GeetestCaptchaV3
               buttonRef={gt3Ref}
               onSuccess={handleGeetestResponse}
            />
            <Button text="GT 3" ref={gt3Ref} />

         </div>
         <ComboboxCurrency
            onChange={currency => console.log('currency', currency)}
            filterNetwork={false}
         />
      </>
   )
}

const WithRef = () => {
   const emailRef = useRef<HTMLInputElement>(null);

   return (
      <>
         <InputGroup ref={emailRef} />
         <Button
            text="Ref"
            onClick={() => console.log('email', emailRef.current?.value)}
         />
      </>
   );
};

const WithState = () => {
   const [email, setEmail] = useState('');

   const handleChangeEmail = useCallback((email: string) => {
      setEmail(email);
   }, [email]);

   return (
      <>
         <InputGroup
            value={email}
            onChange={handleChangeEmail} />
         <Button
            text="State"
            onClick={() => console.log('email', email)}
         />
      </>
   );
};
