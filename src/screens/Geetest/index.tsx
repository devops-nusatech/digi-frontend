import {
   Button,
   Col2,
   ComboboxCurrency,
   GeetestCaptchaV3,
   StepLine,
} from 'components';
import { AdibTable } from 'components/molecules/AdibTable';
import { useInitGT4 } from 'hooks/useInitGT4';
import { GeetestCaptchaResponse, setGeetestCaptchaSuccess } from 'modules';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export const Geetest = () => {
   const dispatch = useDispatch();

   const handleGeetestResponse = (captcha_response: GeetestCaptchaResponse) => {
      dispatch(setGeetestCaptchaSuccess({ captcha_response }));
   };

   const buttonRef = useRef<HTMLButtonElement>(null);
   const gt3Ref = useRef<HTMLButtonElement>(null);
   const { response } = useInitGT4(buttonRef);

   useEffect(() => {
      console.log('response :>> ', response);
   }, [response]);

   const data = [
      {
         name: 'Adib',
         umur: '20',
      },
      {
         name: 'Zazuk',
         umur: '19',
      },
   ];

   const [currentStep, setCurrentStep] = useState(0);

   return (
      <>
         <div className="bg-shade4">
            <StepLine
               titles={['One', 'Two', 'Three', 'Four']}
               currentStep={currentStep}
               // prevActive={false}
               // isActive={false}
               // nextActive
            />
            <Col2>
               <Button
                  text="Prev"
                  onClick={() =>
                     setCurrentStep(currentStep > 0 ? currentStep - 1 : 0)
                  }
               />
               <Button
                  text="Next"
                  onClick={() => setCurrentStep(currentStep + 1)}
               />
            </Col2>
         </div>
         <div className="mt-10" />
         <AdibTable
            columns={['name', 'umur']}
            data={data}
         />
         <div className="flex h-screen items-center justify-between">
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
            <Button
               text="GT 3"
               ref={gt3Ref}
            />
         </div>
         <ComboboxCurrency
            onChange={currency => console.log('currency', currency)}
            filterNetwork={false}
         />
      </>
   );
};
