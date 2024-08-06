'use client';
import React from 'react'
import { useState } from 'react';

import Tooltip from './tooltip'
import Canvas_cmp from './canvas_cmp';

export default function Page() {
  const [isClicked,setClicked] = useState(null);
  return (
    <>
    <Canvas_cmp isClicked={isClicked} setClicked={setClicked}/>
    <Tooltip isClicked={isClicked} setClicked={setClicked}/>      
    </>
  )
}
