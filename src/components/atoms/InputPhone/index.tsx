import React, { FC } from 'react'
import PhoneInput, { PhoneInputProps, CountryData } from 'react-phone-input-2'
import 'react-phone-input-2/lib/plain.css'

interface InputPhoneProps extends PhoneInputProps, CountryData { }

export const InputPhone: FC<InputPhoneProps> = ({
   value,
   country,
   onChange
}) => {
   return (
      <PhoneInput
         country={country}
         searchPlaceholder="Search for..."
         enableSearch
         searchStyle={{ color: 'red' }}
         value={value}
         onChange={onChange}
      />
   )
}
