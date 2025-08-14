import React from 'react'
import { ResetPasswordFormState } from '@/types/FormTypes'
import { useCallback } from 'react'
import useAxiosPrivate from '../useAxiosPrivate'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { throwAxiosError } from '@/utils/forms'
import { useToast } from '../contextHooks'

const useStartResetPassFlow = () => {

    const api = useAxiosPrivate();
    const router = useRouter();
    const toast = useToast();


    const fetch = useCallback(async (prevState: ResetPasswordFormState, formData: FormData): Promise<ResetPasswordFormState> => {
        const newState = {
            email: ""
        }
        const email = formData.get("email");
        if (!email) {
            newState.email = "The email is required.";
            return newState;
        }
        
        try{
            await api.post("/api/auth/resetCode", {
                email 
            });

            sessionStorage.setItem("resetEmail", String(email))
            router.push("/resetPassword/checkCode");
            return newState;

        }catch(err){
            if (axios.isAxiosError(err) && err.response?.data.isFields){
                newState.email = err.response.data.email;
            }
            throwAxiosError(err, toast);
            return newState;
        }
    }, [])

    return fetch;
}

export default useStartResetPassFlow