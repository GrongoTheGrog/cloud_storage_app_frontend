"use client"

import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type Props = {
    className?: string, 
    password: boolean, 
    name: string, 
    error?: string, 
    placeholder: string | null | undefined
}

const FormTextInput = ({className, password, name, error, placeholder}: Props) => {
    const [view, setView] = useState(!password === true);
    const [input, setInput] = useState("");
    return (
        <div>
            <div className='relative w-full'>
                {password === true ? 
                <button className='absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer' onClick={() => setView(prev => !prev)} type='button'>
                    {view ? <FaEye/> : <FaEyeSlash/>}
                </button> : null}

                <input 
                    className={"input " + className} type={view ? "text" : "password"} name={name}
                    placeholder={placeholder ? placeholder : ""}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            <span className='error-line-form mt-3'>
                {error}
            </span>
        </div>
    )
}

export default FormTextInput