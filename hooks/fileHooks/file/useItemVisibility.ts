import { useToast } from '@/hooks/contextHooks';
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { throwAxiosError } from '@/utils/forms';
import React from 'react'

const useItemVisibility = () => {

    const api = useAxiosPrivate();
    const toast = useToast();

    return async (itemId: number, isPublic: boolean) => {
        try{
            await api.patch("/api/items/visibility/" + itemId, {isPublic})
        }catch(err){
            throwAxiosError(err, toast);
            throw new Error();
        }

    }
}

export default useItemVisibility