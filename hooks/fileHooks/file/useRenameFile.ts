import React from 'react'
import { useToast } from '../../contextHooks'
import useAxiosPrivate from '../../useAxiosPrivate';
import usePopup from '../../usePopup';
import { throwAxiosError } from '@/utils/forms';
import { useItem } from '@/app/(items)/layout';

export const useRenameFilePopup = () => {
    return (itemId: number) => {
        const popup = usePopup();

        const useRenameFile = async (newName: string) => {
            const toast = useToast();
            const api = useAxiosPrivate();
            const {dispatch, item} = useItem();
            
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

            api.patch("/api/items/rename/" + itemId, {
                newName
            })
            .then(() => {
                if (itemId == item?.id){
                    dispatch({type: "SET_ITEM_NAME", payload: newName});
                }else{
                    dispatch({type: "RENAME_FROM_ITEMS", payload: {id: itemId, name: newName}})
                }
                toast.setToast({
                    message: "Item renamed successfully!",
                    status: null,
                    type: "SUCCESS"
                });
            })
            .catch(err => {
                throwAxiosError(err, toast);
            })
        }

        popup.activate({
            type: "WARNING",
            title: "Rename file",
            subtitle: "Rename your file",
            mainText: "Type the new name in the following input box: ",
            format: "INPUT",
            action: useRenameFile
        })
    }

    
}

export default useRenameFilePopup