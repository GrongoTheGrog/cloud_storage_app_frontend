import React from 'react'
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useToast } from '@/hooks/contextHooks';
import { throwAxiosError } from '@/utils/forms';
import { Folder } from '@/types/Entities';

const useFetchFolder = () => {
    const api = useAxiosPrivate();
    const toast = useToast();

    return async (folderId: string): Promise<Folder | void> => {
        try {
            const folder = await api.get("/api/folders/" + folderId);               
            return folder.data;
        }catch(err){
            throwAxiosError(err, toast);
        }
    }
}

export default useFetchFolder