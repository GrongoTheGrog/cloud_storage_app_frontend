import React from 'react'
import { useAuth, useToast } from '../contextHooks'
import useAxiosPrivate from '../useAxiosPrivate';
import { Tag } from '@/types/Entities';

const useCreateTag = () => {

    const toast = useToast();
    const api = useAxiosPrivate();

    return async (name: string, description: string, hex_color: string): Promise<Tag> => {

        toast.setToast({
            message: "Creating tag...",
            status: null,
            type: "WARNING"
        });

        const response = await api.post("/api/tags", {
            name,
            hex_color,
            description
        });

        toast.setToast({
            message: "Tag created successfully.",
            status: null,
            type: "SUCCESS"
        });

        return response.data;
    }
}

export default useCreateTag;