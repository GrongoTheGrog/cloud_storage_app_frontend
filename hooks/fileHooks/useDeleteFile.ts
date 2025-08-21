import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate'
import { useToast } from '../contextHooks';
import { throwAxiosError } from '@/utils/forms';

const useDeleteFile = () => {

    const api = useAxiosPrivate();
    const toast = useToast();

    return async (selectedFiles: Set<number>) => {
        const urlParams = new URLSearchParams();
        selectedFiles.forEach(itemId => {
            urlParams.append("itemId", itemId.toString());
        })
        try{
            await api.delete("/api/items&" + urlParams.toString());
        }catch(err){
            throwAxiosError(err, toast);
        }
       
    }
}

export default useDeleteFile