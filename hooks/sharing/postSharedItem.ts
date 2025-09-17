import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate'
import { useItem } from '@/app/(items)/layout';
import { SharedItem } from '@/types/Entities';
import { useToast } from '../contextHooks';

const postSharedItem = () => {

    const api = useAxiosPrivate();
    const toast = useToast();
    const {item} = useItem();

    return async (email: string): Promise<void | SharedItem> => {
        if (!item) return;

        toast.setToast({
            message: "Sharing with " + email + "...",
            status: null,
            type: "WARNING"
        })

        const response = await api.post("/api/sharedItems", {
            email, 
            itemId: item.id,
            fileRole: "EDIT_ROLE" 
        });

        toast.setToast({
            message: "Item successfully shared with " + email,
            status: null,
            type: "WARNING"
        })

        return response.data;

    }
}

export default postSharedItem