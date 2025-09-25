import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate';
import axios from 'axios';
import { useToast } from '../contextHooks';

const useFetchRefreshId = () => {

    const api = useAxiosPrivate();
    const toast = useToast();

    async function fetchCookie(code: string){
        await api.get("/api/auth/refreshToken?code=" + code);
    }

    return fetchCookie;
}

export default useFetchRefreshId