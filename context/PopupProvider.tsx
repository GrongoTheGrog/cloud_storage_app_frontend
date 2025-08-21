"use client"

import Popup from '@/components/ui/Popup';
import { PopupInterface, PopupContext } from '@/types/PopupTypes';
import { usePathname } from 'next/navigation';
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'react'

const INITIAL_POPUP: PopupInterface = {
    type: "DELETE",
    mainText: "",
    subtitle: "",
    title: "",
    action: () => {}
}

export const PopupContextProvider = createContext<PopupContext>({
    activate: (popup) => {},
    popup: INITIAL_POPUP
});

type Props = {
    children: ReactNode
}


const PopupProvider = ({children}: Props) => {

    const [showPopup, setShowPopup] = useState(false);
    const [popup, setPopup] = useState<PopupInterface>(INITIAL_POPUP);
    const pathname = usePathname();

    const activate = useCallback((popup: PopupInterface) => {
        console.log(popup);
        setPopup(popup);
        setShowPopup(true);
    }, [])

    const context: PopupContext = {
        activate, 
        popup
    }

    useEffect(() => {
        setShowPopup(false);
    }, [pathname])


    return (
        <PopupContextProvider.Provider value={context}>
            {showPopup && <Popup setShowPopup={setShowPopup} popup={popup}/>}
            {children}
        </PopupContextProvider.Provider>
    )

}

export default PopupProvider