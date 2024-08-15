'use client';
import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'
import { useState } from 'react';

export default function Dashboardlayout({children}) {
  const [sidebar,setSidebar] = useState(false)
  return (
    <>
    {/* <Navbar sidebar={sidebar} setSidebar={setSidebar} src_br={false} btn_txt={"Back to Dashboard"}/>     */}
    <p className='text-center'> Press ctrl + b to save </p>
    {/* sidebar */}
    <div className='relative flex h-full'>
      {/* <Sidebar sidebar={sidebar} setSidebar={setSidebar}/> */}
      
      {children} 
    </div>
    </>
  );
}
