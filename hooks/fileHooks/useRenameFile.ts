import React from 'react'
import { useToast } from '../contextHooks'
import useAxiosPrivate from '../useAxiosPrivate';
import usePopup from '../usePopup';

const useRenameFile = () => {
    const toast = useToast();
    const api = useAxiosPrivate();
    
    return async (itemId: number | null | undefined, newName: string): Promise<void> => {
        if (!newName) {
            toast.setToast({
                message: "You must enter a name.",
                status: null,
                type: "ERROR"
            })
        }

        if (!itemId) {
            toast.setToast({
                message: "Select an item first.",
                type: "ERROR",
                status: null
            })
            return;
        }


        toast.setToast({
            message: "Updating name...",
            status: null,
            type: "WARNING"
        })

        await api.patch("/api/items/rename/" + itemId, {
            newName
        })

        toast.setToast({
            message: "Item renamed successfully!",
            status: null,
            type: "SUCCESS"
        })
    }
}

export const useRenameFilePopup = () => {

    const popup = usePopup();

    return (func: (newName: string) => void) => {
        popup.activate({
            type: "WARNING",
            title: "Rename file",
            subtitle: "Rename your file",
            mainText: "Type the new name in the following input box: ",
            format: "INPUT",
            action: func
        })
    }
}

export default useRenameFile