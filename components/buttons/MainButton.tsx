import React, { ReactElement, ReactNode } from 'react'

const MainButton = ({children, className, onClick, submit}: {children: ReactNode, className?: string, onClick?: () => void, submit: boolean}) => {
  return (
    <button className={"rounded-[5px] border-2 border-foreground min-w-[140px] px-2 p-1 box-border font-16-bold transition-all duration-200 cursor-pointer hover:bg-foreground hover:text-background active:text-background active:bg-foreground " + className}
      onClick={onClick}
      type={submit ? "submit" : "button"}
    >
        {children}
    </button>
  )
}

export default MainButton