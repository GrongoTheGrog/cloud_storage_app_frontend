import React, { ReactElement, ReactNode } from 'react'

const MainButton = ({children, className, onClick}: {children: ReactNode, className?: string, onClick?: () => void}) => {
  return (
    <button className={"rounded-[5px] border-2 border-foreground min-w-[140px] px-2 p-1 box-border font-16-bold transition-all duration-200 cursor-pointer hover:bg-foreground hover:text-background " + className}
      onClick={onClick}
    >
        {children}
    </button>
  )
}

export default MainButton