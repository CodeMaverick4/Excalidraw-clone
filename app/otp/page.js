"use client";
import React from 'react'
import SecondaryButton from '../SecondaryButton'
import InputCom from '../InputCom'
import Link from 'next/link';                     
export default function pages() {
  return (
    <div className="h-full w-full flex justify-center items-center bg-[#D3CCE3] font-mono">
        <h1  className="absolute top-5 left-5 text-3xl">PROJECT NAME </h1>
      <form className="flex  items-center gap-10 h-[50%] justify-center  w-[40%] border-2 rounded-md border-[#F0F0F0] bg-[#FFFFFF] px-5 py-10">
        
          <h1 className="text-3xl text-[#2D3748]">Enter the OTP </h1>
        
          <div className='flex flex-col gap-3'>
          <InputCom />
          <span onClick={()=>console.log("resend otp clicked")} className='text-blue-400 cursor-pointer inline-block text-right underline'>Resend OTP? </span>
          
          <SecondaryButton 
          icon = {<i class="fa-solid fa-right-to-bracket"></i>}
          button_text = "Login"/>
          </div>
          
          
          
        
        
      </form>
    </div>
    
  )
}
