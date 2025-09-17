import { SharedItem } from '@/types/Entities'
import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate'
import { useToast } from '../contextHooks';
import { useItem } from '@/app/(items)/layout';

const useItemSharingUsers = () => {

    const api = useAxiosPrivate();
    const toast = useToast();
    const {item} = useItem();

    return async (): Promise<SharedItem[]> => {
        if (!item) return [];
        const response = await api.get("/api/items/" + item.id + "/sharedUsers");
        return response.data;
    }
}

export default useItemSharingUsers