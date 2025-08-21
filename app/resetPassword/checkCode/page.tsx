"use client"

import MainButton from '@/components/buttons/MainButton';
import FormTextInput from '@/components/input/FormTextInput'
import { useAuth, useToast } from '@/hooks/contextHooks';
import { throwAxiosError } from '@/utils/forms';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import axios from 'axios';
import { useRouter} from 'next/navigation'
import React, { useActionState, useCallback, useEffect, useState } from 'react'

type FormStateType = {
    code: string
}

const page = () => {

    const router = useRouter();
    const toast = useToast();
    const api = useAxiosPrivate();

    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("resetEmail");
        if (!storedEmail) {
            toast.setToast({
                message: "Missing email as search param.",
                status: null,
                type: "ERROR"
            });
            router.push("/login");
            return;
        }

        setEmail(String(storedEmail));
    }, [])

    const requestAnotherCode = useCallback(async () => {
        try{
            await api.post("/api/auth/resetCode", {
                email
            })

            toast.setToast({
                message: "Code requested successfully.",
                status: null,
                type: "SUCCESS"
            });
        }catch(err){
            if (axios.isAxiosError(err) && err.response?.data.isFields){
                toast.setToast({
                    message: "Incorrect email format.",
                    status: 400,
                    type: "ERROR"
                });
            }
            throwAxiosError(err, toast);
        }
    }, [email]);

    const checkCode = useCallback(async (prevState: FormStateType, formData: FormData): Promise<FormStateType> => {
        const newState = {code: ""};
        const code = formData.get("code");

        if (!code){
            prevState.code = "Please enter the code.";
            return newState;
        }
        try{
            const response = await api.post("/api/auth/resetCode/check", {
                email,
                code
            })

            router.push("/resetPassword/change?code=" + code);
        }catch(err){
            if (axios.isAxiosError(err) && err.response?.data.isFields){
                newState.code = err.response.data.code;
            }
            throwAxiosError(err, toast);
        }finally{
            return newState;
        }
        

        
    }, [email])


    const [formState, action] = useActionState(checkCode, {code: ""});

    return (
        <section className='auth-page mt-[100px]'>

            <p className='font-bold text-[32px]'>
                Check code
            </p>

            <form className='auth-form' action={action}>
                <label className='font-16-bold'>
                    Enter the code:
                </label>

                <div className='flex w-full gap-2 justify-between'>
                    <FormTextInput 
                        placeholder='0000000000'
                        className='flex-10'
                        error={formState.code}
                        name='code'
                        password={false}
                    />

                    <button className='font-16-bold flex items-center box-border flex-1 justify-center text-white bg-foreground rounded-[5px] cursor-pointer'>
                        Send
                    </button>
                </div>

                <p className='auth-text'>
                    A code has been sent to your email and will expire in <strong>10 minutes</strong>. You have to wait until then to request another one.
                </p>

                <MainButton className='mt-[10px]' submit={false} onClick={requestAnotherCode}>
                    Request new code
                </MainButton>
            </form>

        </section>
  )
}

export default page