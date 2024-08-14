'use client';
import React from 'react'
import Tooltip_icons from './tooltip_icons';

import { useState } from 'react'
export default function Tooltip({isClicked,setClicked}) {
    
  return (
    <>
    <div className='absolute left-3 top-1/2 -translate-y-2/3 p-1 rounded-md w-13 bg-[#111828] text-white flex flex-col gap-1 items-center'>
        <Tooltip_icons icon={<i className="fa-solid fa-location-arrow inline-block"></i>} span_text={"Selector"}  isClicked={isClicked == "selector"} handleClick={()=>setClicked("selector")}/>
        <Tooltip_icons icon={<i className="fa-regular fa-square inline-block"></i>} span_text={"Rectangle"} isClicked={isClicked == "rectangle"} handleClick={()=>setClicked("rectangle")}/>
        <Tooltip_icons icon={<i className="fa-regular fa-circle inline-block"></i>} span_text={"circle"} isClicked={isClicked == "circle"} handleClick={()=>setClicked("circle")}/>
        <Tooltip_icons icon={<i className="fa-solid fa-arrow-up-long transform rotate-45 inline-block"></i>} span_text={"Arrow"} isClicked={isClicked == "arrow"} handleClick={()=>setClicked("arrow")}/>
        <Tooltip_icons icon={<i className='font-bold transform rotate-45 inline-block'>|</i>} span_text={"Line"} isClicked={isClicked == "line"} handleClick={()=>setClicked("line")}/>
        <Tooltip_icons icon={<i className="fa-solid fa-pen inline-block"></i>} span_text={"Pen"} isClicked={isClicked == "pen"} handleClick={()=>setClicked("pen")}/>
        <Tooltip_icons icon={<i className="fa-solid fa-t inline-block"></i>} span_text={"Text"} isClicked={isClicked == "text"} handleClick={()=>setClicked("text")}/>            
        <Tooltip_icons icon={<i class="fa-solid fa-eraser"></i>} span_text={"Eraser"} isClicked={isClicked == "eraser"} handleClick={()=>setClicked("eraser")}/>            
    </div>
    
    {/* {isClicked === "rectangle" && (<Rect_tooltip  />) }
    {isClicked === "circle" && (<Circle_tooltip />) }
    {isClicked === "arrow" && (<Rect_tooltip />) }
    {isClicked === "line" && (<Rect_tooltip />) }
    {isClicked === "pen" && (<Rect_tooltip />) }
    {isClicked === "text" && (<Rect_tooltip />) } */}
    </>
  );
}
