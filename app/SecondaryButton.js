import React from 'react'

export default function SecondaryButton({icon,button_text}) {
  return (
    <button className="bg-gradient-to-r from-[#F3A6B0] to-[#FBBF24]
    hover:bg-gradient-to-l  transition-all duration-300 hover:scale-105 p-3 rounded-lg"> {icon} {button_text}</button>
  )
}
