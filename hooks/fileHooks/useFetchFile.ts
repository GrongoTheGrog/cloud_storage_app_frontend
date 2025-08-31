import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate'
import { useToast } from '../contextHooks';

const useFetchFile = () => {

    const api = useAxiosPrivate();
    const toast = useToast();

    return async (fileId: number) => {
        const response = await api.get("/api/files/" + fileId);
        return response.data;
    }
}

export default useFetchFile