"use client"

import MainButton from '@/components/buttons/MainButton'
import Oauth2Button from '@/components/buttons/Oauth2Button'
import FormTextInput from '@/components/input/FormTextInput'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useAuth, useToast } from '@/hooks/contextHooks';
import { SignonFormState } from '@/types/FormTypes'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useActionState, useCallback } from 'react'
import useSignOn from '@/hooks/authHooks/useSignOn'

const loginPage = () => {

    const formAction = useSignOn();

    const [formState, action] = useActionState<SignonFormState, FormData>(formAction, {
        email: "",
        password: "",
        confirmPassword: "",
        username: ""
    });

    return (
        <div className='auth-page start-rtl-animation'>
            <p className='font-bold text-[32px]'>
                Sign in
            </p>

            <form className='auth-form' action={action}>
                <label className='font-16-bold'>
                    Username
                </label>
                <FormTextInput password={false} className='w-full' name='username' error={formState.username} placeholder='my_username_124'/>

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


                <MainButton className='mt-[24px]' submit={true}>
                    Send
                </MainButton>

                <Link href="/login" className='font-14-bold text-center mt-2 hover:underline' prefetch>
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