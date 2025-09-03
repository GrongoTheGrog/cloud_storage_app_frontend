import React from 'react'
import { useToast } from '../../contextHooks'
import useAxiosPrivate from '../../useAxiosPrivate';

const useDownloadLink = () => {

    const api = useAxiosPrivate();

    return async (fileId: number) => {
        const response = await api.get("/api/files/download/" + fileId);
        return response.data;
    }
}

export default useDownloadLink