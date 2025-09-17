import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Error = ({message = "Something went wrong, try again later."}: {message?: string}) => {

    return (
        <div className='flex flex-col gap-3 items-center text-center mx-auto justify-center mt-[100px] text-[20px] '>
            <span className='flex items-center gap-4 font-bold text-pdf text-[40px]'>
                <FaTimes size={40}/> 
                Error
            </span>
            {message}
        </div>
    )
}

export default Error