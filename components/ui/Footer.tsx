import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='fixed bottom-0 border-t-2 font-16-bold w-[100vw] flex justify-center gap-4 py-1 items-center'>
        Bruno Hugo, 2025
        <Link href={"https://github.com/GrongoTheGrog"} target='#'>
            <FaGithub size={24}/>
        </Link>
    </div>
  )
}

export default Footer