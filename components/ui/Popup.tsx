import { PopupInterface, PopupTypes } from '@/types/PopupTypes'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { IconType } from 'react-icons'
import { FaTimes } from 'react-icons/fa'
import { FaInfo } from 'react-icons/fa6'
import MainButton from '../buttons/MainButton'
import { usePathname } from 'next/navigation'

type Props = {
    setShowPopup: Dispatch<SetStateAction<boolean>>,
    popup: PopupInterface
}

const popups: Record<PopupTypes, {color: string, icon: IconType}> = {
    "DELETE": {
        color: "pdf",
        icon: FaTimes
    },
    "WARNING": {
        color: "jpg",
        icon: FaInfo
    }
}

const Popup = ({setShowPopup, popup}: Props) => {

    const path = usePathname();

    const color = popups[popup.type].color;
    const Icon = popups[popup.type].icon;

    return (
        <>
            <div className='flex flex-col gap-1 z-30 fixed centered-position px-[20px] py-[20px] bg-background rounded-[5px] min-w-[340px]'>
                <div className='flex gap-4 items-center'>
                    <Icon className={`text-${color} size-[30px]`}/>
                    <div className='flex flex-col justify-center'>
                        <span className='font-20-bold'>{popup.title}</span>
                        <span className='font-16-medium text-accent'>{popup.subtitle}</span>
                    </div>
                </div>

                <span className='font-14-medium text-accent mt-[20px] mb-[25px]'>{popup.mainText}</span>


                <div className='flex ml-auto gap-2'>
                    <MainButton onClick={() => setShowPopup(false)} className='w-fit' size='SMALL' submit={false} centered>
                        Cancel
                    </MainButton>

                    <MainButton onClick={() => popup.action()} size="SMALL" submit={false} centered color={popup.type == "DELETE" ? "RED" : "BLUE"}>
                        {popup.type == "DELETE" ? "Delete" : "Proceed"}
                    </MainButton>
                </div>
            </div>

            <div className='z-20 fixed top-0 bottom-0 left-0 right-0 faded'>

            </div>
        </>
    )
}

export default Popup