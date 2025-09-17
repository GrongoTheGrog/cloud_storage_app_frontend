import React from 'react'
import { useAuth, useToast } from '../contextHooks'
import useAxiosPrivate from '../useAxiosPrivate';
import { Tag } from '@/types/Entities';

const useUnbindTag = () => {

    const api = useAxiosPrivate();

    return async (itemId: number, tagId: number): Promise<void> => {
        await api.delete("/api/items/" + itemId + "/tag/" + tagId);
    }
}

export default useUnbindTag;