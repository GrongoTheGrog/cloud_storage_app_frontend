"use client"

import MainButton from '@/components/buttons/MainButton';
import FormTextInput from '@/components/input/FormTextInput';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useAuth, useToast } from '@/hooks/contextHooks';
import { throwAxiosError } from '@/utils/forms';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useActionState, useCallback, useEffect, useState } from 'react'
import { ChangePasswordFormState } from '@/types/FormTypes';
import useChangePassword from '@/hooks/authHooks/useChangePassword';

const page = () => {

    const toast = useToast();
    const router = useRouter();
    const api = useAxiosPrivate();

    const [email, setEmail] = useState("");

    const changePasswordRequest = useChangePassword(email);

    const [formState, action] = useActionState(changePasswordRequest, {
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const email = sessionStorage.getItem("resetEmail");

        if (!email) {
            toast.setToast({
                message: "Could not find the reset email in storage.",
                status: null,
                type: "ERROR"
            })
            router.push("/login");
            return;
        }

        setEmail(String(email));
    }, [])

    return (
        <div className='auth-page mt-[100px]'>
            
            <p className='auth-title'>
                Change Password
            </p>
            <form className='auth-form' action={action}>
                <label className='font-16-bold' htmlFor='password'>
                    New password:
                </label>

                <FormTextInput 
                    password={true}
                    placeholder='your_password'
                    className='w-full'
                    error={formState.password}
                    name='password'
                />

                <label className='font-16-bold' htmlFor='confirmPassword'>
                    Confirm password:
                </label>

                <FormTextInput 
                    password={true}
                    placeholder='your_password'
                    className='w-full'
                    error={formState.confirmPassword}
                    name='confirmPassword'
                />

                <p className='auth-text'>
                    You have now <strong>10 minutes</strong> to change your password before the code expires.
                </p>

                <MainButton submit={true} className='mt-4'>
                    Change password
                </MainButton>
            </form>
        </div>
    )
}

export default page