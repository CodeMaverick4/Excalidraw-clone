'use client';
import React from 'react'
import { useState } from 'react'
export default function Tooltip_icons({icon,span_text,span_pos,isClicked,handleClick=()=>{},icon_with_dropdown=false}) {
    const [isHover,setHover] = useState(false);
    

  return (
    <span onClick={()=>handleClick()} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} className={`relative ${isClicked ? 'bg-gray-700' : 'hover:bg-gray-700'} flex items-center justify-center w-12 h-12 rounded-md`}>
    
    {icon_with_dropdown ?     
      (
        <span className='flex justify-center items-center gap-1'>
          {icon} <i className="fa-solid fa-caret-down fa-xs"></i>
        </span>
      ) : (
        icon
      )
    }
     
    {isHover && 
            (span_pos==="top" ? 
                (<span className="absolute flex bg-slate-600 text-white p-2 rounded-md bottom-14"> {span_text}</span>)
                :
                (<span className="absolute  bg-slate-600 text-white p-2 rounded-md left-14"> {span_text}</span>) 
         )}
        
    </span>
  )
}
