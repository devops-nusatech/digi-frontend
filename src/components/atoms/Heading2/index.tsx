import React from 'react'

export const Heading2 = ({ text, className }: { text: string, className?: string }) => (
   <div className={`whitespace-normal text-4.5xl md:text-5xl font-dm font-bold ${className}`}>
      {text}
   </div>
)
