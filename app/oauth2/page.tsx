"use client"

import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useAuth, useToast } from '@/hooks/contextHooks';
import { AuthContextType, AuthType } from '@/types/AuthTypes';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import useFetchRefreshId from '@/hooks/authHooks/useFetchRefreshId';

const page = () => {

    const router = useRouter();
    const api = useAxiosPrivate();
    const toast = useToast();
    const authContext = useAuth();
    const fetchCookie = useFetchRefreshId();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const username = searchParams.get("username");
        const id = searchParams.get("id");
        const picture = searchParams.get("picture");
        const email = searchParams.get("email");
        const accessToken = searchParams.get("accessToken");
        const code = searchParams.get("code");

        console.log(accessToken);

        if (!code){
            toast.setToast({
                type: "ERROR",
                message: "Missing response code."
            })
            router.push("/login");
            return;
        }

        if (!accessToken || !email || !id) {
            toast.setToast({
                status: null,
                message: "Your provider's account doesn't have enough information. Try another method.",
                type: "ERROR"
            });
            router.push("/login");
            return;
        }

        router.push("/");
        
        try{
            fetchCookie(code);

            const auth: AuthType = {
                email,
                id: Number(id),
                picture,
                username
            }

            authContext.setAuth(auth);

            toast.setToast({
                message: "Logged in successfully.",
                status: 200,
                type: "SUCCESS"
            });
        }catch(error){
            if(axios.isAxiosError(error)){
                toast.setToast({
                    message: error.response?.data.message,
                    status: error.response?.data.status,
                    type: "ERROR"
                })
            }else{
                toast.setToast({
                    message: "Unknown error",
                    status: null,
                    type: "ERROR"
                })
            }
        }
        
    }, [])

    return (
        <div className='font-bold text-[34px] text-center mt-[200px]'>
            Redirecting...
        </div>
    )
}

export default page