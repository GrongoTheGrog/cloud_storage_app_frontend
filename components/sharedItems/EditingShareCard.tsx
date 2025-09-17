import { SharedItem } from '@/types/Entities'
import React, { Dispatch, SetStateAction } from 'react'
import UserImage from '../user/UserImage'
import SmallButton from '../buttons/SmallButton'
import { FaTrash } from 'react-icons/fa6'
import deleteSharedItem from '@/hooks/sharing/deleteSharedItem'

type Props = {
    sharedItem: SharedItem,
    setShared: Dispatch<SetStateAction<SharedItem[]>>
}

const EditingShareCard = ({sharedItem, setShared}: Props) => {

    const deleteShareItem = deleteSharedItem();

    return (
        <div className='share-editing-card relative'>
            <div className='flex gap-3 items-center hover:bg-border px-[10px] py-[10px] rounded-[5px] text-ellipsis line-clamp-1'>
                <UserImage src={sharedItem.user.picture} className='s' width={30} height={14}/>
                {sharedItem.user.username}
            </div>

            <button className='tag-delete-button p-1 rounded-[3px] bg-pdf' onClick={() => deleteShareItem(sharedItem.id, setShared)}>
                <FaTrash size={12} className='text-white'/>
            </button>
        </div>
    )
}

export default EditingShareCard