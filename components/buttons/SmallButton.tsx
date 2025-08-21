import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode,
    className?: string,
    onClick?: () => void,
    submit?: boolean
}

const SmallButton = ({children, className, onClick, submit}: Props) => {
    return (
        <button
            type={submit ? "submit" : "button"}
            onClick={onClick}
            className={`cursor-pointer flex justify-center items-center hover:bg-border p-1 rounded-[5px] ${className}`}
        >
            {children}
        </button>
    )
}

export default SmallButton