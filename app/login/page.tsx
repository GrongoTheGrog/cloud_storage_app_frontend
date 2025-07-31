import MainButton from '@/components/buttons/MainButton'
import FormTextInput from '@/components/input/FormTextInput'
import React from 'react'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { FaGoogle } from 'react-icons/fa'

const loginPage = () => {

    function formAction(formData: FormData){
        
    }

    return (
        <div className='px-10 flex flex-col justify-center gap-2.5'>
            <p className='font-bold text-[32px]'>
                Log in
            </p>

            <form className='box flex flex-col p-[20px] gap-1'>
                <label className='font-16-bold'>
                    Email
                </label>

                <FormTextInput password={false} className='w-full mb-1.5'/>

                <label className='font-16-bold'>
                    Password
                </label>

                <FormTextInput password={true} className='w-full'/>


                <MainButton className='mt-[24px]'>
                    Send
                </MainButton>
            </form>

            <p className='font-16-bold text-center'>
                or log in with
            </p>

            <MainButton className='light-shadow font-20-bold flex justify-center items-center gap-2 py-2'>
                <BsGithub/>
                Github
            </MainButton>

            <MainButton className='light-shadow font-20-bold flex justify-center items-center gap-2 py-2'>
                <FaGoogle />
                Google
            </MainButton>
        </div>
    )
}

export default loginPage