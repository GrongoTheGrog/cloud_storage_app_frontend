import React, { useContext } from 'react'
import { PopupContextProvider } from '@/context/PopupProvider'
import { PopupContext } from '@/types/PopupTypes';


const usePopup = (): PopupContext => {
    return useContext(PopupContextProvider);
}

export default usePopup