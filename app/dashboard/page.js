'use client';
import React from 'react'
import Sidebar from './sidebar'

export default function page() {
  return (
  
  
    <div className='h-full w-full flex justify-center '>
      <div className='h-[80%] w-[80%] mt-5 overflow-y-auto scrollbar-thin'>
      <table className='w-full bg-white  '>
        <thead className='bg-gray-200 '>
          <tr className=''>

            <th className='p-3 '>Drawing Id</th>
            <th className=''>Drawing Name</th>
            <th className=''>Last Edited</th>
            <th>Created date</th>
            <th className=''>Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          <tr className='hover:bg-gray-300 border-t border-black text-center'>
            <td className='p-3 '>5023</td>
            <td className=''>next js project drawing</td>
            <td className=''>10/12/2024</td>
            <td className=''>10/12/2024</td>
            <td className='flex items-center gap-2 justify-center p-3'>
                <i class="fa-solid fa-trash-can"></i> 
                <div className=''>|</div> 
                <i class="fa-solid fa-pen-to-square"></i>
            </td>
          </tr>
          <tr className='  text-center border-t border-black'>
            <td className='p-3 '>10240</td>
            <td className=''>next js project drawing</td>
            <td className=''>10/12/2024</td>
            <td className=''>10/12/2024</td>
            <td className='flex items-center gap-2 justify-center p-3 '>
              <i class="fa-solid fa-trash-can"></i> 
              <div className=''>|</div> 
              <i class="fa-solid fa-pen-to-square"></i>
            </td>
          </tr>


        </tbody>
      </table>
      </div>
      
    </div>

    
  )
}
