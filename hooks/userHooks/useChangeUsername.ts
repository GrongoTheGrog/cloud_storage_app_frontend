import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate'
import { useAuth, useToast } from '../contextHooks';
import { throwAxiosError } from '@/utils/forms';

const useChangeUsername = () => {

    const api = useAxiosPrivate();
    const toast = useToast();
    const auth = useAuth();

    return async (newUsername: string) => {
        try{
            const formData = new FormData();
            formData.append("username", newUsername);

            const response = await api.patch(`/api/user/${auth.auth?.id}/rename`, formData);
            const user = response.data;
            console.log(user);
            auth.setAuth(user);
            toast.setToast({
                message: "Username changed successfully.",
                status: null,
                type: "SUCCESS"
            })
        }catch(err){
            throwAxiosError(err, toast);
        }
        
    }
}

export default useChangeUsername