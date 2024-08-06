import React, { useState } from 'react'
import Tooltip_icons from '../tooltip_icons'

export default function Rect_tooltip() {
  const [isClicked,setClick] = useState(null)
  return (
    <>
    <div className='absolute bottom-16 left-1/2 transform -translate-x-1/2 p-1 rounded-md bg-black text-white flex gap-2 items-center justify-center'>
        <Tooltip_icons icon={<i class="fa-solid fa-circle inline-block"></i>} span_text={"Color"}  span_pos={"top"} icon_with_dropdown={true}/>
        <Tooltip_icons icon={<i class="fa-regular fa-square inline-block"></i>} span_text={"Line style"} span_pos={"top"}/>                
    </div>
    
    <div className='absolute flex flex-col gap-2 bottom-32 left-1/2 transform -translate-x-1/2 mt-2  rounded-md bg-gray-800 text-white'>
      <div className='flex py-3 px-3 border-b border-b-white'>
        <div className='p-4 hover:bg-gray-600 rounded-md '>
          <div className='p-2 rounded-full border border-white bg-black'></div>
        </div>
        <div className='p-4 hover:bg-gray-600 rounded-md '>
          <div className='p-2 rounded-full border border-white bg-black'></div>
        </div>
        <div className='p-4 hover:bg-gray-600 rounded-md '>
          <div className='p-2 rounded-full border border-white bg-black'></div>
        </div>
        <div className='p-4 hover:bg-gray-600 rounded-md '>
          <div className='p-2 rounded-full border border-white bg-black'></div>
        </div>
        <div className='p-4 hover:bg-gray-600 rounded-md '>
          <div className='p-2 rounded-full border border-white bg-black'></div>
        </div>

      </div>
      {/* <div className='border border-white'></div> */}
      
      <div className='grid grid-cols-5 grid-rows-2 gap-x-2 gap-y-3 py-5 px-5' >
          <div className='bg-yellow-400 px-2 py-4 hover:scale-105 hover:shadow-lg hover:shadow-black rounded-md border border-white'></div>
          <div className='bg-yellow-400 px-2 py-4 hover:scale-105 hover:shadow-lg hover:shadow-black rounded-md border border-white'></div>
          <div className='bg-yellow-400 px-2 py-4 hover:scale-105 hover:shadow-lg hover:shadow-black rounded-md border border-white'></div>
          <div className='bg-yellow-400 px-2 py-4 hover:scale-105 hover:shadow-lg hover:shadow-black rounded-md border border-white'></div>
          <div className='bg-yellow-400 px-2 py-4 hover:scale-105 hover:shadow-lg hover:shadow-black rounded-md border border-white'></div>
          <div className='bg-yellow-400 px-2 py-4 hover:scale-105 hover:shadow-lg hover:shadow-black rounded-md border border-white'></div>
          <div className='bg-yellow-400 px-2 py-4 hover:scale-105 hover:shadow-lg hover:shadow-black rounded-md border border-white'></div>
          <div className='bg-yellow-400 px-2 py-4 hover:scale-105 hover:shadow-lg hover:shadow-black rounded-md border border-white'></div>
          <div className='bg-yellow-400 px-2 py-4 hover:scale-105 hover:shadow-lg hover:shadow-black rounded-md border border-white'></div>
          <div className='bg-yellow-400 px-2 py-4 hover:scale-105 hover:shadow-lg hover:shadow-black rounded-md border border-white'></div>
        


      </div>
    </div>
    
  </>    

  )
}
