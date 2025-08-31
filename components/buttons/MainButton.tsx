import React, { ReactNode, useMemo } from 'react'

type Props = {
  children: ReactNode
  className?: string
  onClick?: () => void
  submit?: boolean
  size?: 'MEDIUM' | 'SMALL' | 'BIG'
  color?: 'RED' | 'NORMAL' | 'BLUE'
  background?: boolean,
  centered?: boolean 
}

const MainButton = ({
  children,
  className = '',
  onClick,
  submit,
  size = 'MEDIUM',
  color = 'NORMAL',
  background = false,
  centered = false
}: Props) => {
  const computedClass = useMemo(() => {
    let sizeClass = "";
    let colorClass = "";
    let bgClass = "";
    let center = "";

    switch (size) {
      case 'SMALL':
        sizeClass = 'text-[14px] py-[3px] px-[14px]'
        break
      case 'MEDIUM':
        sizeClass = 'text-[16px] py-[6px] px-[12px]'
        break
      case 'BIG':
        sizeClass = 'text-[20px] py-[8px] px-[16px]'
        break
    }

    switch (color) {
      case 'RED':
        colorClass = 'text-pdf border-pdf hover:bg-pdf hover:text-background active:bg-pdf'
        bgClass = background ? "bg-pdf text-white hover:text-pdf hover:bg-white" : ""
        break
      case 'BLUE':
        colorClass = 'text-jpg border-jpg hover:bg-jpg hover:text-background active:jpg'
        bgClass = background ? "bg-jpg text-white hover:text-jpg hover:bg-white" : "" 
        break
      case 'NORMAL':
      default:
        colorClass = 'text-foreground border-foreground hover:bg-foreground hover:text-background active:bg-foreground'
        bgClass = background ? "bg-foreground text-white hover:text-foreground hover:bg-white" : "" 
        break
    }

    bgClass = !background ? "bg-background" : bgClass;

    center = centered ? 'justify-center' : ''

    return `rounded-[5px] border-1 min-w-[140px] h-fit box-border font-bold transition-all duration-200 cursor-pointer flex items-center gap-3 ${sizeClass} ${colorClass} ${bgClass} ${center} ${className}`
  }, [size, color, background, className])

  return (
    <button
      className={computedClass}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  )
}

export default MainButton