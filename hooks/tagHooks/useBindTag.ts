import React from 'react'
import { useAuth, useToast } from '../contextHooks'
import useAxiosPrivate from '../useAxiosPrivate';
import { Tag } from '@/types/Entities';

const useBindTag = () => {
    const api = useAxiosPrivate();

    return async (itemId: number, tagId: number): Promise<void> => {
        await api.patch("/api/items/" + itemId + "/tag/" + tagId);
    }
}

export default useBindTag;