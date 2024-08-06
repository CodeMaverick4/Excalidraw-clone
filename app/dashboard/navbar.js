'use client';
import React from 'react'
import PrimaryButton from '../PrimaryButton'
import InputCom from '../InputCom';

export default function Navbar({sidebar,setSidebar,btn_txt, src_br=true}) {
    
  return (
    <nav className='py-2 px-4 flex items-center justify-between border-2 border-[#F0F0F0] rounded-md'>
        <span className={`sm:hidden transition-all duration-300 ${sidebar && 'rotate-45'}`} id="sidebar_btn" onClick={()=>setSidebar(true)}><i className="fa-solid fa-plus text-xl"></i></span>
        <h1 className='sm:block hidden'>PROJECT NAME</h1>
         <div className='flex items-center gap-3'>
            
            {src_br ? <InputCom /> : ''}
            <PrimaryButton padding={2} icon={<i className="fa-solid fa-right-from-bracket"></i>} button_text={btn_txt}/>
         </div>
    </nav>
  )
}
