import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate'

const useFetchUserByEmail = () => {

    const api = useAxiosPrivate();

    return async (email: string) => {
        const response = await api.get("/api/user?email=" + email);

        return response.data;
    }
}

export default useFetchUserByEmail