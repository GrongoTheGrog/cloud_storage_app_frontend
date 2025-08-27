"use client"

import React, { useEffect, useState } from 'react'
import UserImage from '../user/UserImage'
import { useAuth } from '@/hooks/contextHooks'
import UserSection from '../user/UserSection'
import { usePathname } from 'next/navigation'

const Header = () => {

    const auth = useAuth();

    const [showPanel, setShowPanel] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setShowPanel(false);
    }, [pathname])


    return (
        <div className='fixed left-0 right-0 top-0 h-fit p-[20px] flex items-end bg-background z-10' onClick={() => setShowPanel(prev => !prev)}>
            <div className='ml-auto flex h-fit gap-5 items-center cursor-pointer'>

                {auth.auth?.id && (
                    <>
                    <span className='font-20-bold'>
                        {auth.auth?.username}
                    </span>
                    <UserImage src={auth.auth?.picture} width={35} height={35}/>
                    </>
                )}
            </div>

            {showPanel && <UserSection setShow={setShowPanel}/>}
        </div>
    )
}

export default Header