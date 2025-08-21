import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate'
import { useToast } from '../contextHooks';
import { throwAxiosError } from '@/utils/forms';
import { Folder } from '@/types/Entities';

const useFetchFolder = () => {
    const api = useAxiosPrivate();
    const toast = useToast();

    return async (folderId: string) => {
        try {
            const folder = await api.get("/api/folders/" + folderId);               
            return folder.data;
        }catch(err){
            throwAxiosError(err, toast);
        }
    }
}

export default useFetchFolder