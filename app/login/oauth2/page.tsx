"use client"

import { useAuth } from '@/context/AuthProvider';
import { useToast } from '@/context/ToastProvider';
import { AuthContextType } from '@/types/AuthTypes';
import { error } from 'console';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

    const router = useRouter();
    const toast = useToast();
    const authContext = useAuth();
    const searchParams = useSearchParams();

    useEffect(() => {
        const username = searchParams.get("username");
        const id = searchParams.get("id");
        const picture = searchParams.get("picture");
        const email = searchParams.get("email");
        const accessToken = searchParams.get("access_token");

        if (!accessToken || !email || !id || !picture) {
            toast.setToast({
                status: null,
                message: "Your provider's account doesn't have enough information. Try another method.",
                type: "ERROR"
            });
            router.push("/login");
            return;
        }



        const auth: AuthContextType = {
            email,
            id: Number(id),
            picture,
            username
        }

        authContext.setAuth(auth);
        localStorage.setItem("ACCESS_TOKEN", accessToken);

        toast.setToast({
            message: "Logged in successfully.",
            status: 200,
            type: "SUCCESS"
        });

        router.push("/");
    }, [])


    return (
        <div className='font-bold text-[34px] text-center mt-[200px]'>
            Redirecting...
        </div>
    )
}

export default page