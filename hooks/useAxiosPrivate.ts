
import { useAuth, useToast } from '@/hooks/contextHooks';
import axios, { axiosPrivate } from '@/lib/axios';
import React, { useEffect } from 'react'
import useRefreshToken from './authHooks/useRefreshToken';
import { useRouter } from 'next/navigation';

const useAxiosPrivate = () => {
    
    const {auth, setAuth, setAccessToken, logout} = useAuth();
    const refresh = useRefreshToken();
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {

        const requestInterceptor = axiosPrivate.interceptors.request.use(
            async config => {
                const accessToken = auth?.accessToken;

                const cookie = await window.cookieStore.get("XSRF-TOKEN");
                const csrf = cookie;
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }

                config.headers["X-XSRF-TOKEN"] = csrf?.value;


                return config;
            },
            error => error
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            request => request,
            async error => {
                const prevRequest = error.config;
                console.log(error)
                if ((error.status == 403 || error.status == 401) && !prevRequest?.sent ){
                    try{
                        prevRequest.sent = true;
                        if (error.response.data.refreshNeeded){
                            const newAccessToken = await refresh();
                            setAccessToken(newAccessToken);
                            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        }

                        return axiosPrivate(prevRequest);

                    }catch(err){
                        toast.setToast({
                            message: "Your session expired.",
                            status: 403,
                            type: "WARNING"
                        })

                        console.log("Logout due to invalid token.")

                        logout();
                        return Promise.resolve(error);
                    }
                }

                

                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseInterceptor);
            axiosPrivate.interceptors.request.eject(requestInterceptor);
        }
    }, [auth])

    return axiosPrivate;
}

export default useAxiosPrivate