import React from 'react'
import { useAuth, useToast } from '../contextHooks';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '../useAxiosPrivate';
import { useCallback } from 'react';
import { SignonFormState } from '@/types/FormTypes';
import axios from 'axios';

const useSignOn = () => {

    const auth = useAuth();
    const toast = useToast();
    const router = useRouter();
    const api = useAxiosPrivate();

    const formAction = useCallback(async (prevState: SignonFormState, formData: FormData): Promise<SignonFormState> => {
        let newState = {email: "", password: "", confirmPassword: "", username: ""};

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
            let response = await api.post("/api/auth/signup", {
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
            }, null);

            localStorage.setItem("ACCESS_TOKEN", data.accessToken);
            toast.setToast({
                message: "Account created successfully.",
                status: response.status,
                type: "SUCCESS"
            });

            router.push("/");

        }catch(err: unknown){
            await err;
            if (axios.isAxiosError(err)){
                const data = err.response?.data;
                if (data?.isFields){
                    newState = data;
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

    return formAction;
}

export default useSignOn