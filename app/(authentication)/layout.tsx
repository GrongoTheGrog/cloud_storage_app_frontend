"use client"

import { useAuth, useToast } from '@/hooks/contextHooks'
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react'

const Layout = ({children}: PropsWithChildren) => {

    const auth = useAuth();
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        console.log(auth.auth);
        if (auth.auth?.id !== null){
            toast.setToast({
                message: "You are already logged in.",
                status: null,
                type: "WARNING"
            })
            router.push("/");
        }
    }, [auth.auth?.id])

    return (
        <>
            {children}
        </>
    )
}

export default Layout