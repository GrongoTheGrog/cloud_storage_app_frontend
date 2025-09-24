import Image from 'next/image'
import React, { ReactNode } from 'react'

const UserImage = ({className, src, height, width, children}: {className?: string, src: string | null | undefined, height?: number, width?: number, children?: ReactNode}) => {

    const image = (src == "" || !src) ? "/user.png" : src;

    return (
        <div className='relative'>
            <Image 
                className={`rounded-[1000px] object-cover content-center aspect-square ${className}`} 
                src={image} 
                alt="user image" 
                width={width} 
                height={height}
            />
            {children}
        </div>
        
    )
}

export default UserImage