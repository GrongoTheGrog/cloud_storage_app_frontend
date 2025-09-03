import React from 'react'
import useAxiosPrivate from '../../useAxiosPrivate'
import { useToast } from '../../contextHooks';
import { throwAxiosError } from '@/utils/forms';
import usePopup from '../../usePopup';

const useDeleteFile = () => {

    const api = useAxiosPrivate();
    const toast = useToast();

    return async (selectedFiles: Set<number>) => {

        try{
            const urlParams = new URLSearchParams();
            selectedFiles.forEach(itemId => {
                urlParams.append("itemId", itemId.toString());
            })

            toast.setToast({
                message: "Deleting files...",
                status: null,
                type: "WARNING"
            })

            await api.delete("/api/items?" + urlParams.toString());

            toast.setToast({
                message: "Items deleted successfully.",
                status: null,
                type: "SUCCESS"
            })
        }catch(err){
            throwAxiosError(err, toast);
        }
    }
}

export const useDeletePopup = () => {
    const popup = usePopup();

    return (func: () => void) => {
        popup.activate({
            type: "DELETE",
            title: "Delete file(s)",
            subtitle: "Are you sure you want to delete that?",
            mainText: "The selected files and folders will be permanently deleted, along with any data related to them.",
            action: func
        })
    }
}

export default useDeleteFile