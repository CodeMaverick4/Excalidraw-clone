import React from 'react'

export default function InputCom({padding=2}) {
  return (
    <input type="text" className={`border-2 border-[#CCCCCC] text-[#333333] placeholder:text-[#888888] 
    outline-none py-${padding} px-3 rounded-md focus:border-[#007BFF] shadow-sm`} />
  )
}
