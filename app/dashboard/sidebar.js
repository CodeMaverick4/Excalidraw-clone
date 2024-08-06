import React from 'react'

export default function Sidebar({sidebar,setSidebar}) {
  return (
    <nav className={`${sidebar ? 'w-[30%]' : 'sm:w-[30%]  hidden  sm:block'} h-full rounded-sm `}>
    hello
    </nav>
  )
}
