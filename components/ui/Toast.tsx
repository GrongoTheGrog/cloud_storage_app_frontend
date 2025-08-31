import { ToastPossibleTypes, ToastType } from '@/types/ToastTypes'
import React, { ReactNode, Ref, RefObject } from 'react'
import { FaCheck, FaX } from 'react-icons/fa6';
import { FaInfo } from 'react-icons/fa';
import { FaV } from 'react-icons/fa6';
import { IconType } from 'react-icons';

type toastMeta = {
    color: string,
    textColor: string,
    Icon: IconType
}

const toasts: Record<ToastPossibleTypes, toastMeta> = {
    "ERROR": {
        color: "bg-red-500 ",
        textColor: "text-red-500 ",
        Icon: FaX
    },
    "SUCCESS": {
        color: "bg-green-500 ",
        textColor: "text-green-500 ",
        Icon: FaCheck
    },
    "WARNING": {
        color: "bg-blue-500 ",
        textColor: "text-blue-500 ",
        Icon: FaInfo
    }
}


const Toast = ({message, status, type, ref}: ToastType & {ref?: RefObject<HTMLDivElement | null>}) => {
    const {color, textColor, Icon} = toasts[type];
    if (!color) throw new Error("Toast type doesn't exists.");

    return (
        <div ref={ref} className={"bg-background leading-[20px] h-[70px] hidden items-center gap-3 z-20 font-14-medium rounded-[5px] min-w-[300px] fixed right-[50%] translate-[50%] bottom-[120px] transition-opacity duration-300 ease-in"}>
            <div className={color + "h-full w-[6px] rounded-bl-[10px] rounded-tl-[10px]"}>
            </div>

            <div className={color + "p-1.5 rounded-[50%]"}>
                {<Icon color='white'/>}
            </div>

            {message}

            {status != null ? <div className={textColor + 'absolute bottom-1 right-1 font-bold'}>
                {status}
            </div> : null}
        </div>
    )
}

export default Toast