import { ActionFiles, useItem } from '@/app/(items)/layout'
import { useToast } from '@/hooks/contextHooks';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Item } from '@/types/Entities';
import { FileRoles } from '@/types/Permissions';
import { throwAxiosError } from '@/utils/forms';
import { isAxiosError } from 'axios';
import React, { ActionDispatch, useActionState, useEffect } from 'react'

const useGetFile = (itemId: string) => {

    const api = useAxiosPrivate();
    const toast = useToast();
    const {dispatch} = useItem();

    useEffect(() => {
        const fetch = async () => {
            try{
                const response = await api.get("/api/files/" + itemId);
                const item: Item = response.data.file;
                const fileRole: FileRoles = response.data.fileRole;

                dispatch({type: "SET_ITEM", payload: item});
                dispatch({type: "SET_FILE_ROLE", payload: fileRole});
            }catch(err){
                throwAxiosError(err, toast);
                if(isAxiosError(err)){
                    dispatch({type: "SET_ERROR", payload: err.response?.data.message || "Something went wrong, try again later."})
                }
            }
        }

        fetch();
    }, [])

}

export default useGetFile