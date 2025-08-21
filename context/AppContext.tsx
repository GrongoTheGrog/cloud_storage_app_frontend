"use client"

import React, { useEffect } from 'react'
import AuthProvider from './AuthProvider'
import ToastProvider from './ToastProvider'
import axios from '@/lib/axios'
import PopupProvider from './PopupProvider'

const AppContext = ({children}: React.PropsWithChildren) => {

    return (
        <ToastProvider>
            <AuthProvider>
                <PopupProvider>
                    {children}
                </PopupProvider>
            </AuthProvider>
        </ToastProvider>
    )
}

export default AppContext