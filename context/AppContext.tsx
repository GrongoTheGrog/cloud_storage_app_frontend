"use client"

import React, { useEffect } from 'react'
import AuthProvider from './AuthProvider'
import ToastProvider from './ToastProvider'
import axios from '@/lib/axios'
import PopupProvider from './PopupProvider'
import FilterContextProvider from './FilterContext'

const AppContext = ({children}: React.PropsWithChildren) => {

    return (
        <ToastProvider>
            <AuthProvider>
                <PopupProvider>
                    <FilterContextProvider>
                        {children}
                    </FilterContextProvider>
                </PopupProvider>
            </AuthProvider>
        </ToastProvider>
    )
}

export default AppContext