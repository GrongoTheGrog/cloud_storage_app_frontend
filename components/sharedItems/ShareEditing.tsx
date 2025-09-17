import { SharedItem, User } from '@/types/Entities'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import UserImage from '../user/UserImage'
import MainButton from '../buttons/MainButton'
import { FaPlus, FaShare } from 'react-icons/fa6'
import postSharedItem from '@/hooks/sharing/postSharedItem'
import { throwAxiosError } from '@/utils/forms'
import { useToast } from '@/hooks/contextHooks'
import EditingShareCard from './EditingShareCard'

type Props = {
    setShared: Dispatch<SetStateAction<SharedItem[]>>,
    shared: SharedItem[],
    setAlreadySharing: Dispatch<SetStateAction<User[]>>,
    alreadySharing: User[]
}

const ShareEditing = ({setShared, shared, setAlreadySharing, alreadySharing}: Props) => {

    const [emailInput, setEmailInput] = useState("");
    const [sharingHistory, setSharingHistory] = useState<User[]>([]);
    
    const postShared = postSharedItem();
    const toast = useToast();

    useEffect(() => {
        setSharingHistory(() => {
            if (emailInput === "") return [];
            return alreadySharing.filter(user => user.email.includes(emailInput));
        })
    }, [emailInput])


    const postSharedItemAction = (email: string) => {
        if (email === "") {
            toast.setToast({
                message: "Must enter an email.",
                type: "ERROR",
                status: null
            })
            return;
        }

        postShared(email)
        .then(shared => {
            if (!shared) return;
            setShared(prev => [...prev, shared]);
        })
        .catch(err => {
            throwAxiosError(err, toast);
        })
        .finally(() => {
            setEmailInput("");
        })
    }

    return (
        <div className='flex flex-col gap-2 bordered !py-[10px]'>
            <div className='relative flex justify-between gap-3 mb-[20px]'>
                <input 
                    className='input !w-full !py-[3px] !text-[14px]' 
                    placeholder='Enter the email to share'
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                />
                <div className='absolute top-[100%] left-0 w-full flex flex-col gap-1 mt-1'>
                    {sharingHistory.map(user => {
                        return (
                            <button 
                                className='flex items-center gap-3 bg-border px-2 py-1 rounded-[5px] cursor-pointer light-shadow z-20' 
                                key={user.id} 
                                onClick={() => postSharedItemAction(user.email)}
                                >
                                <UserImage src={user.picture} width={15} height={16}/>
                                {user.email}
                            </button>
                        )
                    })}
                </div>

                <MainButton centered background className='!w-fit !px-2 !min-w-0 !aspect-square' size='SMALL' onClick={() => postSharedItemAction(emailInput)}>
                    <FaShare/>
                </MainButton>
            </div>


            {shared.map(sharedItem => (
                <EditingShareCard setShared={setShared} sharedItem={sharedItem} key={sharedItem.id}/>
            ))}
        </div>
    )
}

export default ShareEditing