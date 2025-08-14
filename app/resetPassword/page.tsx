"use client"

import MainButton from '@/components/buttons/MainButton'
import FormTextInput from '@/components/input/FormTextInput'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useAuth, useToast } from '@/hooks/contextHooks';
import { throwAxiosError } from '@/utils/forms'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useActionState, useCallback } from 'react'
import useStartResetPassFlow from '@/hooks/authHooks/useStartResetPassFlow';
import { ResetPasswordFormState } from '@/types/FormTypes';

const page = () => {

    const toast = useToast();
    const router = useRouter();
    const api = useAxiosPrivate();

    const fetch = useStartResetPassFlow();

    const [formState, action] = useActionState<ResetPasswordFormState, FormData>(fetch, {
        email: ""
    });

        
    return (
        <div className='auth-page mt-[100px]'>
            <p className='font-bold text-[32px]'>
                Change Password
            </p>
            <form className='auth-form' action={action}>
                <p className='font-16-bold'>
                    Enter the account email:
                </p>

                <FormTextInput 
                    name='email' 
                    error={formState.email} 
                    password={false} 
                    placeholder='yourEmail@gmail.com' 
                    className='w-full'
                />

                <p className='font-16-medium mt-2.5 leading-5'>
                    An email will be sent to the given adress containing a verification code.
                </p>

                <MainButton className='mt-2' submit={true}>
                    Send code
                </MainButton>
            </form>

        </div>
    )
}

export default page