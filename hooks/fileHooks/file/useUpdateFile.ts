import React from 'react'

import useAxiosPrivate from '../../useAxiosPrivate'
import { useToast } from '../../contextHooks'
import { throwAxiosError } from '@/utils/forms'
import { File } from '@/types/Entities'

const useUpdateFile = () => {
    const api = useAxiosPrivate();
    const toast = useToast();
    
    return async (fileList: FileList | null, fileId: number) => {
        if (!fileList || fileList.length === 0) {
            toast.setToast({
                message: "User must select a file",
                status: null,
                type: "ERROR"
            })
            return;
        }

        const file = fileList.item(0);

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try{
            toast.setToast({
                message: "Updating file...",
                status: null,
                type: "WARNING"
            })

            await api.put("/api/files/" + fileId, formData, {headers: {"Content-Type": "multipart/form-data"}})
            
            toast.setToast({
                message: "File updated. It might take some time for the update to be displayed.",
                status: null,
                type: "SUCCESS"
            })

        }catch(err){
            throwAxiosError(err, toast);
        }
    }

    
}

export default useUpdateFile