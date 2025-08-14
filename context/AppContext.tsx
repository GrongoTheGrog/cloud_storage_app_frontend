"use client"

import React, { useEffect } from 'react'
import AuthProvider from './AuthProvider'
import ToastProvider from './ToastProvider'
import axios from '@/lib/axios'

const AppContext = ({children}: React.PropsWithChildren) => {

    return (
        <ToastProvider>
            <AuthProvider>
                    {children}
            </AuthProvider>
        </ToastProvider>
    )
}

export default AppContext