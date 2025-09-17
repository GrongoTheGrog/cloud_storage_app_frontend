import React from 'react'
import { useAuth, useToast } from '../contextHooks'
import useAxiosPrivate from '../useAxiosPrivate';
import { Tag } from '@/types/Entities';

const useFetchTags = () => {

    const api = useAxiosPrivate();

    return async (): Promise<Tag[]> => {
        const response = await api.get("/api/tags");
        return response.data;
    }
}

export default useFetchTags