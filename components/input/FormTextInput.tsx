"use client"

import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormTextInput = ({className, password}: {className?: string, password: boolean}) => {
  const [view, setView] = useState(!password === false);
  return (
    <div className='relative'>
      {password === true ? 
      <button className='absolute top-[50%] translate-y-[-50%] right-2' onClick={() => setView(prev => !prev)} type='button'>
        {view ? <FaEye/> : <FaEyeSlash/>}
      </button> : null}

      <input className={"rounded-[5px] py-1 bg-border px-5 font-16-medium " + className} type={view ? "text" : "password"}/>
    </div>
  )
}

export default FormTextInput