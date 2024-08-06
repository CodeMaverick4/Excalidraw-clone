import React from 'react'

export default function PrimaryButton({icon,button_text,padding=3}) {
  return (
    <button className={` bg-gradient-to-r from-[#6D28D9] to-[#C026D3] hover:bg-gradient-to-l transition-all duration-300 hover:scale-105  p-${padding} rounded-lg`}>{icon} {button_text}</button>
    // <button className={`bg-gradient-to-r from-[#6c28d993] to-[#bf26d380] hover:bg-gradient-to-l transition-all duration-300 hover:scale-105  p-${padding} rounded-lg`}>{icon} {button_text}</button>
  )
}
