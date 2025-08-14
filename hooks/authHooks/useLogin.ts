import React from 'react'
import { useRouter } from 'next/navigation';
import { useToast, useAuth } from '../contextHooks';
import useAxiosPrivate from '../useAxiosPrivate';
import { LogInFormState } from '@/types/FormTypes';
import { useCallback } from 'react';
import axios from 'axios';

export default () => {    
    const authContext = useAuth();
    const router = useRouter();
    const toast = useToast();
    const api = useAxiosPrivate();

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

            console.log(response.data)

            const data = response.data;
            authContext.setAuth({
                username: data.username,
                email: data.email,
                picture: data.picture, 
                id: data.id
            }, data.accessToken);

            toast.setToast({
                message: "Logged in successfully.",
                status: response.status,
                type: "SUCCESS"
            });
            router.push("/");
        }catch(err: unknown){
            console.log(err);
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


  return loginAction;
}
