import React from 'react'
import { FaSpinner } from 'react-icons/fa'


const Loading = () => {
    return (
        <div className='mx-auto flex flex-col items-center gap-[20px]'>
            <FaSpinner className='loading-animation size-[50px]'/>

            <span className='font-20-bold'>
                Loading
            </span>
        </div>
    )
}

export default Loading