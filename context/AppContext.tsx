import React from 'react'
import AuthProvider from './AuthProvider'
import ToastProvider from './ToastProvider'

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