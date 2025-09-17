import React, { Dispatch, SetStateAction } from 'react'
import useAxiosPrivate from '../useAxiosPrivate'
import { useToast } from '../contextHooks';
import usePopup from '../usePopup';
import { throwAxiosError } from '@/utils/forms';
import { SharedItem } from '@/types/Entities';

const deleteSharedItem = () => {

    const api = useAxiosPrivate();
    const toast = useToast();
    const popup = usePopup();

    return (id: number, setShare: Dispatch<SetStateAction<SharedItem[]>>) => {
        const popupFunction = async () => {
            try{
                toast.setToast({
                    message: "Deleting user access...",
                    status: null,
                    type: "WARNING"
                })

                await api.delete("/api/sharedItems/" + id);

                setShare(prev => prev.filter(si => si.id != id));

                toast.setToast({
                    message: "That user has no longer access to your document.",
                    status: null,
                    type: "SUCCESS"
                });
            }catch(err){
                throwAxiosError(err, toast);
            }
            
        }

        popup.activate({
            title: "Delete user access",
            subtitle: "Are you sure you want to delete that user's access?",
            mainText: "After that, the user will no longer be able to access and edit the current document.",
            type: "DELETE",
            action: popupFunction
        })

    }
}

export default deleteSharedItem