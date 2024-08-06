import React from 'react'
import Tooltip_icons from '../tooltip_icons'

export default function Circle_tooltip() {
  return (
    <div className='absolute bottom-16 left-1/2 transform -translate-x-1/2 p-1 rounded-md bg-black text-white flex gap-2 items-center justify-center'>
        <Tooltip_icons icon={<i class="fa-solid fa-ban inline-block"></i>} span_text={"Color"}  span_pos={"top"} />
        <Tooltip_icons icon={<i class="fa-regular fa-square inline-block"></i>} span_text={"Line style"} span_pos={"top"}/>        
        
    </div>
  )
}
