import React from 'react'
import { useAuth, useToast } from '../contextHooks'
import useAxiosPrivate from '../useAxiosPrivate';
import { error } from 'console';
import { throwAxiosError } from '@/utils/forms';

const useChangePicture = () => {

    const auth = useAuth();
    const api = useAxiosPrivate();
    const toast = useToast();
    
    return async (files: FileList | null) => {
        if (!files){
            toast.setToast({
                message: "Missing file.",
                status: null,
                type: "ERROR"
            })
            return;
        }
        const file = files.item(0);
        if (!file) {
            toast.setToast({
                message: "Missing file.",
                status: null,
                type: "ERROR"
            })
            return;
        }

        const form = new FormData();
        form.append("file", file);

        try{
            const response = await api.patch(`/api/user/${auth.auth?.id}/updatePicture`, form);
            auth.setAuth(response.data);
            toast.setToast({
                message: "Image updated.",
                status: null,
                type: "SUCCESS"
            })
        }catch(err){
            throwAxiosError(err, toast);
        }
        
    }
}

export default useChangePicture