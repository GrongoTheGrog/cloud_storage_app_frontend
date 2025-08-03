"use client"

import MainButton from '@/components/buttons/MainButton'
import Oauth2Button from '@/components/buttons/Oauth2Button'
import FormTextInput from '@/components/input/FormTextInput'
import { useAuth } from '@/context/AuthProvider'
import { useToast } from '@/context/ToastProvider'
import api from '@/lib/axios'
import { SignonFormState } from '@/types/FormTypes'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useActionState, useCallback } from 'react'

const loginPage = () => {

    const auth = useAuth();
    const toast = useToast();
    const router = useRouter();

    const formAction = useCallback(async (prevState: SignonFormState, formData: FormData): Promise<SignonFormState> => {
        const newState = {email: "", password: "", confirmPassword: "", username: ""};

        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const username = formData.get("username");
        let missing = false;

        if (!email) { newState.email = "Email is required."; missing = true; }
        if (!password) { newState.password = "Password is required."; missing = true }
        if (!confirmPassword) { newState.confirmPassword = "Confirming the password is required."; missing = true }
        if (!username) { newState.username = "Username is required."; missing = true }
        if (password != confirmPassword) {newState.password = "Passwords must match."; missing = true }

        if (missing) return newState;

        try{
            const response = await api.post("/api/auth/signup", {
                email, 
                password,
                confirmPassword,
                username
            });

            const data = response.data;

            auth.setAuth({
                username: data.username,
                email: data.email,
                id: data.id,
                picture: data.picture
            });

            localStorage.setItem("ACCESS_TOKEN", data.accessToken);
            toast.setToast({
                message: "Account created successfully.",
                status: response.status,
                type: "SUCCESS"
            });

            router.push("/");

        }catch(err: unknown){
            if (axios.isAxiosError(err)){
                const data = err.response?.data;
                if (data.isFields){
                    newState.email = data.email;
                    newState.confirmPassword = data.confirmPassword;
                    newState.password = data.password;
                    newState.username = data.username;
                }else{
                    toast.setToast({
                        message: err.response?.data.message,
                        status: err.response?.status,
                        type: "ERROR"
                    })
                }
            }else{
                toast.setToast({
                    message: "An unknown error happened.",
                    status: 500,
                    type: "ERROR"
                })
            }
        }finally{
            return newState;
        }
    }, []);

    const [formState, action] = useActionState<SignonFormState, FormData>(formAction, {
        email: "",
        password: "",
        confirmPassword: "",
        username: ""
    });

    return (
        <div className='mx-auto max-w-[600px] px-10 flex flex-col justify-center gap-2.5 start-ltr-animation'>
            <p className='font-bold text-[32px]'>
                Sign in
            </p>

            <form className='box flex flex-col p-[20px] gap-1' action={action}>
                <label className='font-16-bold'>
                    Username
                </label>
                <FormTextInput password={false} className='w-full mb-1.5' name='username' error={formState.username} placeholder='my_username_124'/>

                <label className='font-16-bold'>
                    Password
                </label>
                <FormTextInput password={true} className='w-full' name='password' error={formState.password} placeholder='12345'/>

                <label className='font-16-bold'>
                    Confirm password
                </label>
                <FormTextInput password={true} className='w-full' name='confirmPassword' error={formState.confirmPassword} placeholder='12345'/>

                <label className='font-16-bold'>
                    Email
                </label>
                <FormTextInput password={false} className='w-full' name='email' error={formState.email} placeholder='email@gmail.com'/>


                <MainButton className='mt-[24px]'>
                    Send
                </MainButton>

                <Link href="/login" className='font-14-bold text-center mt-2' prefetch>
                    Already have an account? Click here
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