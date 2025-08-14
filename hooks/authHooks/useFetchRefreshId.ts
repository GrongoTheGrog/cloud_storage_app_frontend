import React from 'react'
import useAxiosPrivate from '../useAxiosPrivate';
import axios from 'axios';
import { useToast } from '../contextHooks';

const useFetchRefreshId = () => {

    const api = useAxiosPrivate();
    const toast = useToast();

    async function fetchCookie(code: string){
        try{
            await api.get("/api/auth/refreshToken?code=" + code);
        }catch(error){
            if(axios.isAxiosError(error)){
                toast.setToast({
                    message: error.response?.data.message,
                    status: error.response?.data.status,
                    type: "ERROR"
                })
            }else{
                toast.setToast({
                    message: "Unknown error",
                    status: null,
                    type: "ERROR"
                })
            }
        }
    }

    return fetchCookie;
}

export default useFetchRefreshId