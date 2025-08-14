"use client"

import Toast from '@/components/ui/Toast';
import { ToastContextType, ToastType } from '@/types/ToastTypes';
import React, { useCallback, useContext, useRef, useState } from 'react'
import { createContext } from 'react'

export const ToastContext = createContext<ToastContextType>({
    toast: null,
    setToast: () => {}
});

const ToastProvider = ({children}: React.PropsWithChildren) => {

    const [toastState, setToastState] = useState<ToastType>({
        type: "WARNING",
        message: "The server is facing an error. Try again later",
        status: 401
    });
    const toastRef = useRef<HTMLDivElement | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
    
    const setToast = useCallback((toastInfo: ToastType) => {
        setToastState(toastInfo);
        const toast: HTMLDivElement | null = toastRef.current;
        if (toast == null) return;

        toast.classList.add("toast-in");

        if (intervalRef.current != null){
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            toast.classList.remove("toast-in");
        }, 5000)
        

    }, [toastRef.current])

    const context: ToastContextType = {
        toast: toastState,
        setToast
    }

    return (
        <ToastContext.Provider value={context}>
            <Toast type={toastState.type} message={toastState.message} status={toastState.status} ref={toastRef}/>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider