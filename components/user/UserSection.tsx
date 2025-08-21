"use client"

import { useAuth, useToast } from '@/hooks/contextHooks'
import React, { ChangeEvent, useState } from 'react'
import UserImage from './UserImage'
import MainButton from '../buttons/MainButton'
import { FaCamera, FaCheck, FaKey, FaPhotoFilm, FaTrash } from 'react-icons/fa6'
import { FaEdit, FaPhotoVideo, FaSignOutAlt, FaTimes, FaUserEdit } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import useChangeUsername from '@/hooks/userHooks/useChangeUsername'
import useChangePicture from '@/hooks/userHooks/useChangePicture'
import FormTextInput from '../input/FormTextInput'
import SmallButton from '../buttons/SmallButton'
import { Dispatch, SetStateAction } from 'react'
import usePopup from '@/hooks/usePopup'
import useDeleteUser from '@/hooks/userHooks/useDeleteUser'

type Props = {
    className?: string,
    setShow: Dispatch<SetStateAction<boolean>>
}

const UserSection = ({className, setShow}: Props) => {

    const auth = useAuth();
    const toast = useToast();
    const router = useRouter();
    const popup = usePopup();

    const changeUsername = useChangeUsername();
    const changePicture = useChangePicture();
    const deleteAccount = useDeleteUser();

    const [changeNameState, setChangeNameState] = useState(false);



    const updatePictureAction = (e: ChangeEvent<HTMLInputElement>) => {
        changePicture(e.target.files);
    }

    const changeUsernameAction = (data: FormData) => {
        
        if (changeNameState){
            let name = data.get("newUsername");
            if (!name) {
                toast.setToast({
                    message: "Must enter a user.",
                    status: null,
                    type: "ERROR"
                })
                return;
            }
            name = name.toString().trim();

            changeUsername(name);
        }

        setChangeNameState(prev => !prev);
    }

    const resetPasswordAction = () => {
        router.push("/resetPassword")
    }

    const deleteUserAction = () => {
        const userId = auth.auth?.id;
        if (!userId) return;

        popup.activate({
            type: "DELETE",
            title: "Delete account",
            subtitle: "Are you sure you want to delete your account?",
            mainText: "All resources, including folders and files, owned by this user will be deleted, along with any data related to the account.",
            action: () => deleteAccount(userId)
        })
    }

    const logoutAction = () => {
        setShow(false);
        auth.logout();
    }

    return (
        <div className={`flex flex-col gap-1 absolute top-[100%] sm:min-w-[340px] min-w-[240px] right-[20px] p-[15px] light-shadow rounded-[10px] z-10 bg-background ${className}`} onClick={(e) => e.stopPropagation()}>
            <div className='flex gap-4 items-center mb-4'>
                <UserImage src={auth.auth?.picture} height={40} width={40}>
                    <div className='absolute bottom-[-4px] right-[-4px]'>
                        <label htmlFor='file' className='p-[5px] text-background rounded-[100px] bg-foreground flex justify-center align-center cursor-pointer'>
                            <FaCamera size={12} className='cursor-pointer'/>
                        </label>
                        <input type='file' id='file' hidden onChange={updatePictureAction}/>
                    </div>
                </UserImage>
                <div className='flex flex-col justify-center w-full'>
                    <form className='flex justify-between items-center gap-1 w-full' action={changeUsernameAction}>
                        {!changeNameState ?
                        <span className='font-16-bold m-0'>
                            {auth.auth?.username}
                        </span> :
                        <FormTextInput 
                            password={false} 
                            placeholder={auth.auth?.username} 
                            name="newUsername"
                            className='!py-0.5'
                            />
                        }
                        
                        <div className='flex'>
                            {changeNameState && 
                                <SmallButton onClick={() => setChangeNameState(false) }>
                                    <FaTimes/>
                                </SmallButton>
                            }

                            <SmallButton submit>
                                {changeNameState ? <FaCheck/> : <FaEdit/>}
                            </SmallButton>
                        </div>
                    </form>

                    <span className='font-14-medium text-accent'>
                        {auth.auth?.email}
                    </span>
                </div>
            </div>

            <MainButton submit={false} size='SMALL'  onClick={resetPasswordAction}>
                <FaKey/>
                Change Password
            </MainButton>

            <MainButton submit={false} size='SMALL' onClick={logoutAction}>
                <FaSignOutAlt/>
                Log out
            </MainButton>

            <MainButton submit={false} size='SMALL' color='RED' onClick={deleteUserAction}>
                <FaTrash/>
                Delete account
            </MainButton>
        </div>
    )
}

export default UserSection