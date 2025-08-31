import React from 'react'
import { useToast } from '../contextHooks'
import useAxiosPrivate from '../useAxiosPrivate';

const usePreviewLink = () => {

    const api = useAxiosPrivate();

    return async (fileId: number) => {
        const response = await api.get("/api/files/preview/" + fileId);
        return response.data;
    }
}

export default usePreviewLink