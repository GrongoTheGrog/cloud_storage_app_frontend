import React from 'react'
import { useAuth, useToast } from '../contextHooks'
import useAxiosPrivate from '../useAxiosPrivate';
import { Tag } from '@/types/Entities';

const useDeleteTag = () => {

    const toast = useToast();
    const api = useAxiosPrivate();

    return async (tagId: number): Promise<void> => {

        toast.setToast({
            message: "Deleting tag...",
            status: null,
            type: "WARNING"
        });

        await api.delete("/api/tags/" + tagId);

        toast.setToast({
            message: "Tag deleted successfully.",
            status: null,
            type: "SUCCESS"
        });
    }
}

export default useDeleteTag;