import { useAuth, useToast } from '@/hooks/contextHooks';
import axios from '@/lib/axios';
import React from 'react'

const useRefreshToken = () => {

    const {setAccessToken} = useAuth();

    const refresh = async () => {
        const response = await axios.get("/api/auth/refresh");
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken)
        return newAccessToken;
    }

    return refresh;
}
export default useRefreshToken