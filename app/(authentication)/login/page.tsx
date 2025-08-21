"use client"

import MainButton from '@/components/buttons/MainButton'
import Oauth2Button from '@/components/buttons/Oauth2Button'
import FormTextInput from '@/components/input/FormTextInput'
import Link from 'next/link'
import React, { useActionState } from 'react'
import useLoginRequest from '@/hooks/authHooks/useLogin'


const loginPage = () => {
    const loginAction = useLoginRequest();

    const [state, formAction] = useActionState(loginAction, {
        email: "",
        password: ""
    });

    return (
        <div className='auth-page start-ltr-animation'>
            <p className='font-bold text-[32px]'>
                Log in
            </p>

            <form className='auth-form' action={formAction}>
                <label className='font-16-bold'>
                    Email
                </label>

                <FormTextInput password={false} className='w-full' name='email' error={state.email} placeholder="email@gmail.com"/>

                <label className='font-16-bold'>
                    Password
                </label>

                <FormTextInput password={true} className='w-full' name='password' error={state.password} placeholder="12345"/>

                <Link href="/resetPassword" className='font-14-bold hover:underline pl-1 mt-1' prefetch>
                    Forgot your password?
                </Link>


                <MainButton className='mt-[24px]' submit={true} centered>
                    Send
                </MainButton>

                <Link href="/signon" className='font-14-bold text-center mt-2 hover:underline' prefetch>
                    Don't have an account?
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