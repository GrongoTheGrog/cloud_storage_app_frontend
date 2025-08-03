"use client"

import MainButton from '@/components/buttons/MainButton'
import Oauth2Button from '@/components/buttons/Oauth2Button'
import FormTextInput from '@/components/input/FormTextInput'
import api from '@/lib/axios'
import Link from 'next/link'
import React, { useActionState, useCallback } from 'react'
import { LogInFormState } from '@/types/FormTypes'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import Toast from '@/components/ui/Toast'
import { useToast } from '@/context/ToastProvider'
import axios from 'axios'


const loginPage = () => {
    const authContext = useAuth();
    const router = useRouter();
    const toast = useToast();

    const loginAction = useCallback(async (prevState: LogInFormState, formData: FormData) => {
        const state: LogInFormState = {email: "", password: ""};
        const email = formData.get("email");
        const password = formData.get("password");
        if (!email || !password){
            if (!email) state.email = "Email required.";
            if (!password) state.password = "Password required.";
            return state;
        }
        
        try{
            const response = await api.post("/api/auth/login", {
                email,
                password
            });

            const data = response.data;
            authContext.setAuth(data);
            localStorage.setItem("ACCESS_TOKEN", data.accessToken);

            toast.setToast({
                message: "Logged in successfully.",
                status: response.status,
                type: "SUCCESS"
            });
            router.push("/");
        }catch(err: unknown){
            if (axios.isAxiosError(err)){
                const data = err.response?.data;
                if (data.isFields){
                    state.email = data.email;
                    state.password = data.password;
                }else{
                    toast.setToast({
                        message: err.response?.data.message,
                        status: err.response?.status,
                        type: "ERROR"
                    })
                }
            }else{
                toast.setToast({
                    status: null,
                    message: "Unexpected error happened.",
                    type: "ERROR"
                })
            }
            
        }finally{
            return state;
        }
    }, []);


    
    const [state, formAction, isPending] = useActionState(loginAction, {
        email: "",
        password: ""
    });

    return (
        <div className='mx-auto max-w-[600px] px-10 flex flex-col justify-center gap-2.5 start-rtl-animation'>
            <p className='font-bold text-[32px]'>
                Log in
            </p>

            <form className='box flex flex-col p-[20px] gap-1' action={formAction}>
                <label className='font-16-bold'>
                    Email
                </label>

                <FormTextInput password={false} className='w-full' name='email' error={state.email} placeholder="email@gmail.com"/>

                <label className='font-16-bold'>
                    Password
                </label>

                <FormTextInput password={true} className='w-full' name='password' error={state.password} placeholder="12345"/>


                <MainButton className='mt-[24px]'>
                    Send
                </MainButton>

                <Link href="/signon" className='font-14-bold text-center mt-2' prefetch>
                    Don't have an account? Click here
                </Link>
            </form>

            <p className='font-16-bold text-center'>
                or log in with
            </p>
            

            <Oauth2Button service='Google'/>
            <Oauth2Button service='Github'/>
        </div>
    )
}

export default loginPage